<template>
  <div class="min-h-screen bg-white">
    <!-- ============================================ -->
    <!-- TÍTULO CON ESTILO SENADO -->
    <!-- ============================================ -->
    <div class="relative w-full">
      <div class="relative w-full">
        <!-- Líneas animadas estilo Senado -->
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
        
        <div class="py-[0.8vw] text-center">
          <h1 class="text-[3vw] text-senado-primary font-semibold">
            Campañas y Actividades
          </h1>
        </div>
      </div>
      
      <p class="text-gray-600 text-lg text-center max-w-2xl mx-auto mt-6 px-4">
        Conoce las campañas y actividades institucionales del Senado de Bolivia
      </p>
    </div>

    <!-- ============================================ -->
    <!-- FILTROS POR CATEGORÍA                       -->
    <!-- ============================================ -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-wrap justify-center gap-2 md:gap-3">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          @click="filtroCategoria = categoria"
          class="px-4 py-2 md:px-6 md:py-2.5 rounded-full transition-all duration-300 text-sm md:text-base font-medium"
          :class="filtroCategoria === categoria 
            ? 'bg-senado-primary text-white shadow-lg' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ categoria }}
        </button>
        <button
          @click="filtroCategoria = 'todos'"
          class="px-4 py-2 md:px-6 md:py-2.5 rounded-full transition-all duration-300 text-sm md:text-base font-medium"
          :class="filtroCategoria === 'todos' 
            ? 'bg-senado-primary text-white shadow-lg' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          Todos
        </button>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- GRID DE ACTIVIDADES                         -->
    <!-- ============================================ -->
    <div class="container mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-600">Cargando actividades...</p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div 
          v-for="item in itemsFiltrados" 
          :key="item.id"
          class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Imagen -->
          <div class="relative overflow-hidden aspect-[16/10] bg-gray-200">
            <!-- Fallback: placeholder con icono -->
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-senado-gold-lightest to-senado-gold-soft">
              <div class="text-center">
                <svg class="w-16 h-16 text-senado-primary/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                <span class="text-senado-primary/60 text-sm font-medium">{{ item.categoria }}</span>
              </div>
            </div>
            <!-- Badge de categoría -->
            <span 
              class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
              :style="{ backgroundColor: getColorCategoria(item.categoria) }"
            >
              {{ item.categoria }}
            </span>
            <!-- Badge de fecha -->
            <span class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {{ formatearFecha(item.fecha) }}
            </span>
          </div>

          <!-- Contenido -->
          <div class="p-5 md:p-6">
            <h3 class="text-lg md:text-xl font-bold text-senado-primary mb-2 line-clamp-2">
              {{ item.titulo }}
            </h3>
            <p class="text-gray-600 text-sm md:text-base line-clamp-3 mb-4">
              {{ item.descripcion }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- Botón -->
            <button 
              @click="verDetalle(item)"
              class="w-full py-2.5 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors duration-300 font-medium text-sm md:text-base flex items-center justify-center gap-2 group"
            >
              <span>Ver más</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-if="!loading && itemsFiltrados.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">📭</div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No hay actividades</h3>
        <p class="text-gray-500">No se encontraron actividades en la categoría "{{ filtroCategoria }}"</p>
        <button 
          @click="filtroCategoria = 'todos'"
          class="mt-4 text-senado-primary hover:underline font-medium"
        >
          Ver todas las actividades
        </button>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- BOTÓN VOLVER                                -->
    <!-- ============================================ -->
    <div class="text-center pb-12">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// DATOS DE EJEMPLO
// ============================================
const actividades = ref([
  {
    id: 1,
    titulo: 'Campaña de Concientización sobre el Voto Informado',
    descripcion: 'Campaña informativa para promover el voto consciente y participativo entre la juventud boliviana, con énfasis en la importancia de conocer las propuestas de los candidatos.',
    categoria: 'Campaña',
    fecha: '2026-08-15',
    tags: ['Voto', 'Participación', 'Juventud']
  },
  {
    id: 2,
    titulo: 'Sesión de Trabajo con Comités de la Cámara de Senadores',
    descripcion: 'Jornada de trabajo conjunto entre los diferentes comités de la Cámara de Senadores para coordinar la agenda legislativa del próximo período.',
    categoria: 'Actividad',
    fecha: '2026-08-10',
    tags: ['Legislación', 'Coordinación']
  },
  {
    id: 3,
    titulo: 'Campaña de Transparencia y Rendición de Cuentas',
    descripcion: 'Campaña institucional para fortalecer la transparencia en la gestión pública y promover la participación ciudadana en el control social.',
    categoria: 'Campaña',
    fecha: '2026-08-05',
    tags: ['Transparencia', 'Participación', 'Control Social']
  },
  {
    id: 4,
    titulo: 'Foro de Jóvenes Legisladores',
    descripcion: 'Espacio de diálogo y capacitación para jóvenes interesados en la política y la legislación, con la participación de senadores y expertos en la materia.',
    categoria: 'Actividad',
    fecha: '2026-07-28',
    tags: ['Juventud', 'Capacitación', 'Diálogo']
  },
  {
    id: 5,
    titulo: 'Campaña de Protección del Medio Ambiente',
    descripcion: 'Iniciativa legislativa y campaña de concientización sobre la protección de los recursos naturales y la lucha contra el cambio climático en Bolivia.',
    categoria: 'Campaña',
    fecha: '2026-07-20',
    tags: ['Medio Ambiente', 'Sostenibilidad', 'Cambio Climático']
  },
  {
    id: 6,
    titulo: 'Visita de la Comisión de Política Internacional a la Frontera',
    descripcion: 'Comitiva de senadores de la Comisión de Política Internacional realizó una visita a la zona fronteriza para evaluar la situación y coordinar acciones con autoridades locales.',
    categoria: 'Actividad',
    fecha: '2026-07-15',
    tags: ['Política Internacional', 'Frontera', 'Coordinación']
  }
])

// ============================================
// ESTADO
// ============================================
const loading = ref(false)
const filtroCategoria = ref('todos')

const categorias = computed(() => {
  return ['Campaña', 'Actividad']
})

// ============================================
// FILTRADO
// ============================================
const itemsFiltrados = computed(() => {
  if (filtroCategoria.value === 'todos') {
    return actividades.value
  }
  return actividades.value.filter(item => item.categoria === filtroCategoria.value)
})

// ============================================
// FUNCIONES
// ============================================
const getColorCategoria = (categoria) => {
  const colores = {
    'Campaña': '#DB3737',
    'Actividad': '#2E7078'
  }
  return colores[categoria] || '#611717'
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const verDetalle = (item) => {
  alert(`Actividad: ${item.titulo}\n\n${item.descripcion}\n\nFecha: ${formatearFecha(item.fecha)}`)
}

// ============================================
// MONTAJE
// ============================================
onMounted(() => {
  console.log('✅ Página de Campañas y Actividades cargada')
})
</script>

<style scoped>
/* ============================================ */
/* ANIMACIONES DE BORDES ESTILO SENADO */
/* ============================================ */
@keyframes slide-right {
  0% { width: 0%; left: 0; }
  50% { width: 100%; left: 0; }
  100% { width: 0%; left: 100%; }
}

@keyframes slide-left {
  0% { width: 0%; right: 0; }
  50% { width: 100%; right: 0; }
  100% { width: 0%; right: 100%; }
}

@keyframes slide-down {
  0% { height: 0%; top: 0; }
  50% { height: 100%; top: 0; }
  100% { height: 0%; top: 100%; }
}

@keyframes slide-up {
  0% { height: 0%; bottom: 0; }
  50% { height: 100%; bottom: 0; }
  100% { height: 0%; bottom: 100%; }
}

.animate-slide-right {
  animation: slide-right 4s ease-in-out infinite;
}

.animate-slide-left {
  animation: slide-left 4s ease-in-out infinite;
}

.animate-slide-down {
  animation: slide-down 4s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 4s ease-in-out infinite;
}

/* ============================================ */
/* LINE-CLAMP                                  */
/* ============================================ */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>