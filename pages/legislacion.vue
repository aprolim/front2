<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-10">
        <div class="inline-flex items-center bg-white/10 rounded-full gap-2 px-3 py-1 mb-3">
          <Icon name="mdi:landmark" class="text-senado-gold text-lg" />
          <span class="text-white/80 tracking-wider font-medium text-xs uppercase">Módulo Legislativo</span>
        </div>

        <h1 class="font-bold leading-tight text-[8vw] sm:text-4xl md:text-5xl">
          Producción <span class="text-senado-gold">Legislativa</span>
        </h1>

        <p class="text-white/70 mt-3 max-w-2xl text-[2.7vw] sm:text-base">
          Consulta las leyes aprobadas y los documentos de fiscalización de la Cámara de Senadores.
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">
      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-[12vw] sm:py-20">
        <div class="inline-block w-[8vw] sm:w-12 h-[8vw] sm:h-12 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-4 text-gray-500 text-[3vw] sm:text-sm">Cargando documentos...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-[10vw] sm:py-16 bg-red-50 rounded-xl border border-red-200">
        <div class="text-[10vw] sm:text-4xl mb-3">⚠️</div>
        <p class="text-red-600 font-medium text-[3.6vw] sm:text-base">{{ error }}</p>
        <p class="text-red-400 text-[2.1vw] sm:text-xs mt-2">
          Verifica que el backend esté encendido y que CORS permita peticiones.
        </p>
        <button @click="recargar" class="mt-4 px-6 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition text-sm">
          Reintentar
        </button>
      </div>

      <!-- Contenido -->
      <template v-else>
        <!-- Buscador global -->
        <div class="max-w-3xl mx-auto mb-[5vw] sm:mb-8">
          <div class="relative">
            <input
              v-model="terminoBusqueda"
              type="text"
              placeholder="Buscar por título, número o palabra clave..."
              class="w-full px-[4vw] sm:px-4 py-[3vw] sm:py-3 pl-[10vw] sm:pl-11 pr-[10vw] sm:pr-11 border-2 border-senado-primary/30 rounded-xl text-[2.7vw] sm:text-base bg-white text-gray-700 focus:ring-2 focus:ring-senado-primary focus:border-senado-primary shadow-sm"
              @keyup.enter="ejecutarBusqueda"
            />
            <Icon
              name="mdi:magnify"
              class="absolute left-[3vw] sm:left-4 top-1/2 -translate-y-1/2 text-senado-primary text-[5vw] sm:text-xl"
            />
            <button
              v-if="terminoBusqueda"
              @click="limpiarBusqueda"
              class="absolute right-[3vw] sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[4vw] sm:text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Modo búsqueda activa -->
        <div v-if="modoBusqueda">
          <div class="mb-[3vw] sm:mb-4 flex items-center justify-between">
            <h2 class="font-bold text-senado-primary text-[4vw] sm:text-2xl">
              <Icon name="mdi:magnify" class="inline mr-2" />
              Resultados de búsqueda
            </h2>
            <button
              @click="limpiarBusqueda"
              class="text-[2.1vw] sm:text-sm text-senado-primary hover:text-senado-primary-dark font-medium"
            >
              ← Volver a las vitrinas
            </button>
          </div>

          <p class="text-gray-500 text-[2.4vw] sm:text-sm mb-[3vw] sm:mb-4">
            {{ resultadosBusqueda.length }} resultado(s) para "<strong>{{ busquedaEjecutada }}</strong>"
          </p>

          <div v-if="resultadosBusqueda.length > 0" class="space-y-[2.4vw] sm:space-y-3">
            <div
              v-for="doc in resultadosBusqueda"
              :key="doc.id"
              class="bg-white rounded-xl border border-gray-200 p-[3.6vw] sm:p-4 flex justify-between items-center hover:shadow-md hover:border-senado-primary/30 cursor-pointer transition-all group"
              @click="verDocumento(doc)"
            >
              <div class="flex-1 min-w-0 pr-[3vw] sm:pr-4">
                <div class="flex items-center gap-[1.8vw] sm:gap-2 mb-[1.5vw] sm:mb-1 flex-wrap">
                  <span
                    v-if="doc.estado"
                    class="text-[1.8vw] sm:text-xs px-2 py-0.5 rounded font-medium"
                    :class="colorEstado(doc.estado)"
                  >
                    {{ doc.estado }}
                  </span>
                  <span v-if="doc.tipo_documento" class="bg-blue-100 text-blue-700 text-[1.8vw] sm:text-xs px-2 py-0.5 rounded font-medium">
                    {{ doc.tipo_documento }}
                  </span>
                  <span v-if="doc.gestion" class="text-gray-500 text-[1.8vw] sm:text-xs">
                    <Icon name="mdi:folder" class="inline mr-1" />{{ doc.gestion }}
                  </span>
                </div>
                <h4 class="font-bold text-[3vw] sm:text-lg text-senado-primary-dark group-hover:text-senado-primary transition-colors leading-snug">
                  {{ doc.titulo }}
                </h4>
                <p v-if="doc.descripcion" class="text-gray-500 text-[2.1vw] sm:text-sm mt-[0.9vw] sm:mt-1 line-clamp-2">
                  {{ doc.descripcion }}
                </p>
              </div>
              <div class="flex-shrink-0">
                <div class="bg-gray-100 group-hover:bg-senado-primary group-hover:text-white text-gray-500 rounded-full p-[2.4vw] sm:p-2 transition-colors">
                  <Icon name="mdi:chevron-right" class="text-[3.6vw] sm:text-lg" />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-[10vw] sm:py-16 bg-white rounded-xl border border-gray-200">
            <div class="text-[10vw] sm:text-4xl mb-3">🔍</div>
            <p class="text-gray-600 font-medium text-[3vw] sm:text-base">
              No se encontraron documentos para "{{ busquedaEjecutada }}"
            </p>
          </div>
        </div>

        <!-- Modo normal (vitrinas) -->
        <template v-else>
          <!-- Tabs -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-[4.5vw] sm:mb-6">
            <div class="flex border-b border-gray-200 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="tabActivo = tab.key"
                class="px-[3.6vw] sm:px-6 py-[2.4vw] sm:py-3 font-semibold whitespace-nowrap transition-colors text-[2.55vw] sm:text-sm"
                :class="tabActivo === tab.key
                  ? 'bg-senado-gold-soft text-senado-primary border-b-2 border-senado-primary'
                  : 'text-gray-600 hover:bg-gray-50'"
              >
                <Icon :name="tab.icono" class="inline mr-2 text-[3.3vw] sm:text-base" />
                {{ tab.nombre }}
                <span
                  class="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  :class="tabActivo === tab.key
                    ? 'bg-senado-primary text-white'
                    : 'bg-gray-100 text-gray-500'"
                >
                  {{ obtenerItems(tab.key).length }}
                </span>
              </button>
            </div>
          </div>

          <!-- Lista de documentos del tab activo -->
          <div v-if="itemsActuales.length > 0" class="space-y-[2.4vw] sm:space-y-3">
            <div
              v-for="doc in itemsActuales"
              :key="doc.id"
              class="bg-white rounded-xl border border-gray-200 p-[3.6vw] sm:p-4 flex justify-between items-center hover:shadow-md hover:border-senado-primary/30 cursor-pointer transition-all group"
              @click="verDocumento(doc)"
            >
              <div class="flex-1 min-w-0 pr-[3vw] sm:pr-4">
                <!-- Badges -->
                <div class="flex items-center gap-[1.8vw] sm:gap-2 mb-[1.5vw] sm:mb-1 flex-wrap">
                  <span
                    v-if="doc.estado"
                    class="text-[1.8vw] sm:text-xs px-2 py-0.5 rounded font-medium"
                    :class="colorEstado(doc.estado)"
                  >
                    {{ doc.estado }}
                  </span>
                  <span v-if="doc.tipo_documento" class="bg-blue-100 text-blue-700 text-[1.8vw] sm:text-xs px-2 py-0.5 rounded font-medium">
                    {{ doc.tipo_documento }}
                  </span>
                  <span v-if="doc.peticionante" class="text-gray-500 text-[1.8vw] sm:text-xs">
                    <Icon name="mdi:account" class="inline mr-1" />{{ doc.peticionante }}
                  </span>
                  <span v-if="doc.fecha" class="text-gray-500 text-[1.8vw] sm:text-xs">
                    <Icon name="mdi:calendar" class="inline mr-1" />{{ formatearFecha(doc.fecha) }}
                  </span>
                </div>

                <!-- Título -->
                <h4 class="font-bold text-[3vw] sm:text-lg text-senado-primary-dark group-hover:text-senado-primary transition-colors leading-snug">
                  {{ doc.titulo }}
                </h4>

                <!-- ID como referencia secundaria -->
                <p class="text-gray-400 text-[1.8vw] sm:text-xs mt-[0.9vw] sm:mt-1 font-mono truncate">
                  {{ doc.id }}
                </p>
              </div>

              <div class="flex-shrink-0">
                <div class="bg-gray-100 group-hover:bg-senado-primary group-hover:text-white text-gray-500 rounded-full p-[2.4vw] sm:p-2 transition-colors">
                  <Icon name="mdi:chevron-right" class="text-[3.6vw] sm:text-lg" />
                </div>
              </div>
            </div>
          </div>

          <!-- Sin datos -->
          <div v-else class="text-center py-[10vw] sm:py-16 bg-white rounded-xl border border-gray-200">
            <div class="text-[10vw] sm:text-4xl mb-3">📭</div>
            <p class="text-gray-600 font-medium text-[3vw] sm:text-base">
              No hay documentos disponibles en esta sección
            </p>
          </div>
        </template>

        <!-- Nota informativa -->
        <div class="mt-[6vw] sm:mt-8 bg-blue-50 rounded-xl border border-blue-200 px-[3.6vw] sm:px-5 py-[3vw] sm:py-4">
          <div class="flex items-start gap-[2.4vw] sm:gap-3">
            <Icon name="mdi:information" class="text-blue-600 text-[5vw] sm:text-xl flex-shrink-0 mt-0.5" />
            <div class="text-[2.1vw] sm:text-sm text-blue-800">
              <p class="font-semibold mb-1">Sobre los documentos</p>
              <p>
                Esta sección muestra las leyes y documentos de fiscalización más recientes.
                Algunos títulos aparecen como "Sin título" porque el PDF aún no ha sido procesado por OCR.
              </p>
            </div>
          </div>
        </div>

        <!-- Botón volver -->
        <div class="mt-[8vw] sm:mt-10 text-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[2.7vw] sm:text-base font-medium"
          >
            <Icon name="mdi:arrow-left" />
            Volver al inicio
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// CONFIGURACIÓN
// ============================================
const API_BASE_URL = 'http://186.121.212.182:8005'

// ============================================
// ESTADO
// ============================================
const tabActivo = ref('leyes')
const leyes = ref([])
const fiscalizaciones = ref([])
const loading = ref(false)
const error = ref(null)

// Búsqueda
const terminoBusqueda = ref('')
const busquedaEjecutada = ref('')
const resultadosBusqueda = ref([])
const buscando = ref(false)
const modoBusqueda = ref(false)

// ============================================
// TABS
// ============================================
const tabs = [
  { key: 'leyes',          nombre: 'Leyes Recientes',    icono: 'mdi:file-check' },
  { key: 'fiscalizacion',  nombre: 'Fiscalización',      icono: 'mdi:file-search' }
]

const obtenerItems = (key) => {
  if (key === 'leyes') return leyes.value
  if (key === 'fiscalizacion') return fiscalizaciones.value
  return []
}

const itemsActuales = computed(() => obtenerItems(tabActivo.value))

// ============================================
// CARGAR DASHBOARD
// ============================================
const cargarDashboard = async () => {
  loading.value = true
  error.value = null

  const url = `${API_BASE_URL}/api/v1/dashboard`
  console.log('🔵 [legislacion] Dashboard:', url)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    clearTimeout(timeoutId)

    console.log('🟢 [legislacion] Status:', res.status)

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

    const data = await res.json()
    console.log('🟢 [legislacion] Data:', data)

    // El backend devuelve:
    // { leyes_recientes: [...], fiscalizacion_reciente: [...] }
    leyes.value = (data.leyes_recientes || []).map(normalizarDoc)
    fiscalizaciones.value = (data.fiscalizacion_reciente || []).map(normalizarDoc)
  } catch (err) {
    if (err.name === 'AbortError') {
      error.value = 'La solicitud tardó demasiado. Intente nuevamente.'
    } else {
      error.value = err.message
    }
    console.error('🔴 [legislacion] Error:', err)
  } finally {
    loading.value = false
  }
}

// ============================================
// NORMALIZAR DOCUMENTO
// ============================================
const normalizarDoc = (d) => ({
  id: d.id || '',
  titulo: d.titulo || 'Sin título',
  estado: d.estado || '',
  fecha: d.fecha || '',
  tipo_documento: d.tipo_documento || '',
  peticionante: d.peticionante || '',
  gestion: d.gestion || extraerGestionDeId(d.id) || '',
  descripcion: d.descripcion || ''
})

// Extrae la gestión del id si tiene un patrón como "06720242025"
const extraerGestionDeId = (id) => {
  if (!id) return ''
  const match = id.match(/(\d{4})(\d{4})/)
  if (match) return `${match[1]}-${match[2]}`
  return ''
}

// ============================================
// BÚSQUEDA
// ============================================
const ejecutarBusqueda = async () => {
  const q = terminoBusqueda.value.trim()
  if (!q) {
    limpiarBusqueda()
    return
  }

  buscando.value = true
  modoBusqueda.value = true
  busquedaEjecutada.value = q
  resultadosBusqueda.value = []

  // Probar varios nombres de parámetro hasta que uno funcione
  const params = ['q', 'search', 'query', 'termino']
  const urlBase = `${API_BASE_URL}/api/v1/buscar`

  for (const param of params) {
    const url = `${urlBase}?${param}=${encodeURIComponent(q)}`
    console.log(`🔵 [legislacion] Buscando con ?${param}=:`, url)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })
      clearTimeout(timeoutId)

      console.log(`🟢 [legislacion] ?${param}= status:`, res.status)

      if (res.status === 404) continue // probar siguiente parámetro
      if (!res.ok) continue

      const data = await res.json()
      console.log(`🟢 [legislacion] ?${param}= data:`, data)

      const lista = Array.isArray(data)
        ? data
        : data.resultados || data.data || data.documentos || data.items || []

      resultadosBusqueda.value = lista.map(normalizarDoc)
      break // éxito, salir del bucle
    } catch (err) {
      console.warn(`⚠️ [legislacion] Falló con ?${param}=:`, err.message)
      // continuar con el siguiente
    }
  }

  buscando.value = false
}

const limpiarBusqueda = () => {
  terminoBusqueda.value = ''
  busquedaEjecutada.value = ''
  resultadosBusqueda.value = []
  modoBusqueda.value = false
}

// ============================================
// MÉTODOS
// ============================================
const colorEstado = (estado) => {
  const e = (estado || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (e.includes('promulg')) return 'bg-green-100 text-green-700'
  if (e.includes('tratamiento') || e.includes('tramit')) return 'bg-orange-100 text-orange-700'
  if (e.includes('sancion')) return 'bg-purple-100 text-purple-700'
  if (e.includes('aprob')) return 'bg-blue-100 text-blue-700'
  if (e.includes('rechaz')) return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-600'
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  try {
    const d = new Date(fecha)
    if (isNaN(d.getTime())) return fecha
    return d.toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return fecha
  }
}

const verDocumento = (doc) => {
  navigateTo(`/documento/${encodeURIComponent(doc.id)}`)
}

const recargar = () => cargarDashboard()

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarDashboard()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>