<!-- pages/legislacion.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:scale-balance" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">LEGISLACIÓN</span>
            </div>
            
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              Normativa <span class="text-senado-gold">Ciudadana</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              Consulta pública de leyes, proyectos y normativa del Senado
            </p>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalDocumentos }}</span>
              <p class="text-white/60" style="font-size: 0.6vw;">DOCUMENTOS</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2vw 0;">
      <!-- BUSCADOR PRINCIPAL -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <label class="font-bold text-senado-primary text-[1.2vw] whitespace-nowrap flex items-center gap-2">
            <Icon name="mdi:magnify" class="text-[1.5vw]" />
            Buscar:
          </label>
          <input 
            v-model="terminoBusqueda"
            @keyup.enter="realizarBusqueda"
            type="text" 
            placeholder="Ej: ley 1651, agua potable, derechos..."
            class="flex-1 w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-[1vw] focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent transition"
          />
          <button 
            @click="realizarBusqueda"
            :disabled="cargando"
            class="bg-senado-primary text-white px-6 py-3 rounded-xl font-bold text-[1vw] hover:bg-senado-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            <Icon v-if="!cargando" name="mdi:search" class="text-[1.2vw]" />
            <span v-else class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ cargando ? 'Buscando...' : 'Consultar' }}
          </button>
        </div>
        
        <div class="mt-3 flex flex-wrap items-center gap-2 text-[0.8vw] text-gray-500">
          <span>💡 Escribe lo que buscas ·</span>
          <button @click="buscarEjemplo('ley 1651')" class="bg-senado-gold-lightest px-3 py-1 rounded-full text-senado-primary font-semibold hover:bg-senado-gold transition text-[0.7vw]">ley 1651</button>
          <button @click="buscarEjemplo('agua potable')" class="bg-senado-gold-lightest px-3 py-1 rounded-full text-senado-primary font-semibold hover:bg-senado-gold transition text-[0.7vw]">agua potable</button>
          <button @click="buscarEjemplo('derechos')" class="bg-senado-gold-lightest px-3 py-1 rounded-full text-senado-primary font-semibold hover:bg-senado-gold transition text-[0.7vw]">derechos</button>
          <button @click="buscarEjemplo('educación')" class="bg-senado-gold-lightest px-3 py-1 rounded-full text-senado-primary font-semibold hover:bg-senado-gold transition text-[0.7vw]">educación</button>
        </div>
      </div>

      <!-- ESTADÍSTICAS - CARD TOTAL -->
      <div v-if="estadisticas" class="bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white rounded-2xl p-6 mb-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div class="text-[3.5vw] font-bold leading-none">{{ (estadisticas.total || 0).toLocaleString('es-BO') }}</div>
          <div class="text-white/80 text-[0.9vw]">📄 Documentos en el repositorio</div>
        </div>
        <div class="text-right text-[0.8vw] text-white/60">
          Última actualización<br>
          <span class="font-medium">{{ formatearFecha(estadisticas.ultima_actualizacion) }}</span>
        </div>
      </div>

      <!-- GRILLA DE ESTADOS (secciones clickeables) -->
      <div v-if="estadisticas?.estados" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div 
          v-for="estado in estadosFiltrados" 
          :key="estado.slug"
          @click="filtrarPorEstado(estado)"
          class="bg-white rounded-xl p-4 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-senado-primary transition-all hover:-translate-y-1"
        >
          <div class="text-[2.5vw] font-bold text-senado-primary">{{ estado.cantidad || 0 }}</div>
          <div class="text-[0.6vw] text-gray-400">{{ estado.porcentaje || 0 }}% del total</div>
          <h3 class="text-[0.75vw] font-semibold text-gray-700 mt-1">{{ estado.label }}</h3>
        </div>
      </div>

      <!-- RESULTADOS DE BÚSQUEDA -->
      <div v-if="resultados.length > 0 || busquedaRealizada || terminoBusqueda" class="mt-4">
        <div class="flex items-center justify-between mb-4 pb-2 border-b-2 border-senado-gold-light">
          <h2 class="text-[1.5vw] font-bold text-senado-primary flex items-center gap-2">
            <Icon name="mdi:file-document" class="text-[1.8vw]" />
            Resultados
            <span class="bg-senado-primary text-white text-[0.8vw] px-3 py-0.5 rounded-full">{{ resultados.length }}</span>
          </h2>
          <button 
            v-if="resultados.length > 0 || busquedaRealizada"
            @click="limpiarBusqueda"
            class="text-[0.8vw] text-gray-400 hover:text-senado-primary transition flex items-center gap-1"
          >
            <Icon name="mdi:close" class="text-[1vw]" />
            Limpiar
          </button>
        </div>

        <!-- Estado de carga -->
        <div v-if="cargando" class="flex justify-center items-center py-12">
          <div class="inline-block w-10 h-10 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="ml-4 text-gray-500 text-[0.9vw]">Buscando documentos...</p>
        </div>

        <!-- Sin resultados -->
        <div v-else-if="resultados.length === 0 && busquedaRealizada" class="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-[1.5vw] font-bold text-gray-700">No se encontraron resultados</h3>
          <p class="text-[0.9vw] text-gray-500 mt-2">Intenta con otros términos de búsqueda</p>
          <button @click="limpiarBusqueda" class="mt-4 text-senado-primary hover:underline text-[0.9vw] font-medium">
            Limpiar búsqueda
          </button>
        </div>

        <!-- Lista de resultados -->
        <div v-else class="space-y-3">
          <div 
            v-for="item in resultados" 
            :key="item.id"
            @click="verDetalle(item)"
            class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-senado-primary transition-all cursor-pointer flex justify-between items-start gap-4"
          >
            <div class="flex-1 min-w-0">
              <div class="text-[1vw] font-bold text-gray-800 flex items-center gap-2 flex-wrap">
                {{ getTitulo(item) }}
                <span v-if="item.numero_ley" class="text-[0.8vw] text-gray-400 font-normal">· N° {{ item.numero_ley }}</span>
              </div>
              <p class="text-[0.85vw] text-gray-600 mt-1 line-clamp-2">{{ getDescripcion(item) }}</p>
              <div class="flex items-center gap-4 mt-2 text-[0.7vw] text-gray-400">
                <span v-if="getFecha(item)" class="flex items-center gap-1">
                  <Icon name="mdi:calendar" class="text-[0.8vw]" />
                  {{ formatearFecha(getFecha(item)) }}
                </span>
                <span class="bg-senado-gold-lightest text-senado-primary px-3 py-0.5 rounded-full font-semibold">{{ getEstado(item) }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="bg-gray-100 text-gray-600 text-[0.6vw] px-3 py-1 rounded-full font-semibold">{{ getEstado(item) }}</span>
              <span class="text-[0.6vw] text-gray-400 flex items-center gap-1">
                <Icon name="mdi:chevron-right" class="text-[0.8vw]" />
                Detalle
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje inicial -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-[1.8vw] font-bold text-gray-700">Explora la Legislación</h3>
        <p class="text-[0.9vw] text-gray-500 mt-2">Usa el buscador o haz clic en una categoría para comenzar</p>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL DE DETALLE                          -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div 
          v-if="modalAbierto"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          @click.self="cerrarModal"
        >
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <!-- Header del modal -->
            <div class="flex-shrink-0 bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-[1.5vw] font-bold">{{ modalData?.titulo || 'Documento' }}</h2>
                <button @click="cerrarModal" class="hover:bg-white/20 rounded-lg p-2 transition">
                  <Icon name="mdi:close" class="w-6 h-6" />
                </button>
              </div>
              <div class="text-[0.8vw] text-white/70 mt-1 flex items-center gap-3 flex-wrap">
                <span v-if="modalData?.numero">N° {{ modalData.numero }}</span>
                <span v-if="modalData?.estado">{{ modalData.estado }}</span>
                <span v-if="modalData?.fecha" class="flex items-center gap-1">
                  <Icon name="mdi:calendar" class="text-[0.9vw]" />
                  {{ formatearFecha(modalData.fecha) }}
                </span>
              </div>
            </div>
            
            <!-- Cuerpo del modal -->
            <div class="flex-1 overflow-y-auto p-6">
              <pre class="whitespace-pre-wrap font-sans text-[0.9vw] text-gray-700 leading-relaxed">{{ modalData?.texto || 'No hay contenido disponible' }}</pre>
            </div>
            
            <!-- Footer del modal -->
            <div class="flex-shrink-0 border-t border-gray-200 p-4 flex justify-end">
              <button 
                @click="cerrarModal"
                class="bg-senado-primary text-white px-6 py-2 rounded-lg hover:bg-senado-primary-dark transition font-medium text-[0.9vw]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Botón volver -->
    <div class="text-center pb-8">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[0.9vw] font-medium"
      >
        <Icon name="mdi:arrow-left" class="text-[1.2vw]" />
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ========================================== //
// CONFIGURACIÓN
// ========================================== //
const API = 'https://asistente.senado.gob.bo/ciudadana-api/api/v1'

// ========================================== //
// ESTADO
// ========================================== //
const terminoBusqueda = ref('')
const busquedaRealizada = ref(false)
const cargando = ref(false)
const resultados = ref([])
const estadisticas = ref(null)
const estadoSeleccionado = ref(null)
const modalAbierto = ref(false)
const modalData = ref(null)

// ========================================== //
// COMPUTED
// ========================================== //
const totalDocumentos = computed(() => {
  return estadisticas.value?.total || 0
})

const estadosFiltrados = computed(() => {
  if (!estadisticas.value?.estados) return []
  // Filtrar estados relevantes (excluir sin-clasificar si es necesario)
  return estadisticas.value.estados.filter(e => e.slug !== 'sin-clasificar')
})

// ========================================== //
// FUNCIONES
// ========================================== //
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  try {
    const d = new Date(fecha)
    return d.toLocaleDateString('es-BO', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return fecha
  }
}

const getTitulo = (item) => {
  if (item.numero_ley) return `Ley N° ${item.numero_ley}`
  if (item.etiqueta && item.etiqueta !== item.id) return item.etiqueta
  if (item.titulo) return item.titulo
  return item.id || 'Documento sin título'
}

const getEstado = (item) => {
  return item.estado || 'Sin estado'
}

const getFecha = (item) => {
  return item.fecha_ley || item.fecha || ''
}

const getDescripcion = (item) => {
  return item.descripcion || item.fragmento || item.texto || item.contenido || ''
}

// ========================================== //
// FUNCIONES API
// ========================================== //
const apiCall = async (path) => {
  try {
    const url = API + path
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000)
    })
    
    if (!res.ok) {
      let detalle = 'HTTP ' + res.status
      try {
        const j = await res.json()
        if (j.detail) detalle = j.detail
      } catch (e) {}
      throw new Error(detalle)
    }
    
    return await res.json()
  } catch (error) {
    console.warn('⚠️ Error en API:', error.message)
    throw error
  }
}

const cargarEstados = async () => {
  try {
    const data = await apiCall('/estados')
    estadisticas.value = data
    console.log('✅ Estados cargados:', data)
  } catch (error) {
    console.error('Error cargando estados:', error)
  }
}

const realizarBusqueda = async () => {
  const termino = terminoBusqueda.value.trim()
  if (!termino) {
    resultados.value = []
    busquedaRealizada.value = false
    return
  }

  cargando.value = true
  busquedaRealizada.value = true
  estadoSeleccionado.value = null

  try {
    const params = new URLSearchParams()
    params.set('q', termino)
    if (estadoSeleccionado.value) params.set('estado', estadoSeleccionado.value)
    params.set('limite', '20')

    const data = await apiCall('/buscar?' + params.toString())
    resultados.value = data.resultados || []
  } catch (error) {
    console.error('Error en búsqueda:', error)
    resultados.value = []
  } finally {
    cargando.value = false
  }
}

const filtrarPorEstado = (estado) => {
  terminoBusqueda.value = estado.label
  estadoSeleccionado.value = estado.slug
  realizarBusqueda()
}

const buscarEjemplo = (texto) => {
  terminoBusqueda.value = texto
  estadoSeleccionado.value = null
  realizarBusqueda()
}

const limpiarBusqueda = () => {
  terminoBusqueda.value = ''
  resultados.value = []
  busquedaRealizada.value = false
  estadoSeleccionado.value = null
}

const verDetalle = async (item) => {
  modalAbierto.value = true
  modalData.value = {
    titulo: getTitulo(item),
    numero: item.numero_ley || '',
    estado: getEstado(item),
    fecha: getFecha(item),
    texto: item.texto || item.contenido || item.descripcion || item.fragmento || JSON.stringify(item, null, 2)
  }
}

const cerrarModal = () => {
  modalAbierto.value = false
  modalData.value = null
}

// ========================================== //
// LIFECYCLE
// ========================================== //
onMounted(() => {
  cargarEstados()
})

// SEO
useHead({
  title: 'Legislación - Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Consulta pública de leyes, proyectos y normativa del Senado de Bolivia.' },
    { property: 'og:title', content: 'Legislación - Senado de Bolivia' },
    { property: 'og:description', content: 'Consulta pública de leyes, proyectos y normativa del Senado de Bolivia.' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiciones */
.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>