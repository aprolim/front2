<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[90%] max-w-7xl">

      <!-- Título -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-senado-primary">
          Memoria <span class="text-[#8f1522]">Institucional</span>
        </h1>
        <div class="w-24 h-1 bg-[#611717] mx-auto mt-4"></div>
        <p class="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Redactor Legislativo - Seleccione un tomo para visualizar
        </p>
      </div>

      <!-- ========================================== -->
      <!-- PERIODO 2025-2026 (2 tomos)                -->
      <!-- ========================================== -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white bg-senado-primary-light w-full text-center py-3 rounded-lg shadow-md">
            REDACTOR LEGISLATURA 2025-2026
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="tomo in tomos2025" 
            :key="tomo.id"
            @click="abrirPDF(tomo.pdfUrl)"
            class="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-[#E03636] group"
          >
            <div class="flex flex-col items-center text-center">
              <h5 class="text-sm sm:text-base font-bold text-[#A54A4A] mt-1">
                {{ tomo.numero }}
              </h5>
              <div class="w-full aspect-square mb-2 overflow-hidden rounded-lg shadow-md bg-gray-100">
                <img 
                  :src="tomo.portada" 
                  :alt="tomo.titulo"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  @error="(e) => e.target.src = '/images/portadas/default.jpg'"
                />
              </div>
              <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E03636]/10 rounded-full text-[#E03636] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- PERIODO 2023-2024 (12 tomos)               -->
      <!-- ========================================== -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white bg-senado-primary-light w-full text-center py-3 rounded-lg shadow-md">
            REDACTOR LEGISLATURA 2023-2024
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="tomo in tomosPaginados" 
            :key="tomo.id"
            @click="abrirPDF(tomo.pdfUrl)"
            class="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-[#E03636] group"
          >
            <div class="flex flex-col items-center text-center">
              <h5 class="text-sm sm:text-base font-bold text-[#A54A4A] mt-1">
                {{ tomo.numero }}
              </h5>
              <div class="w-full aspect-square mb-2 overflow-hidden rounded-lg shadow-md bg-gray-100">
                <img 
                  :src="tomo.portada" 
                  :alt="tomo.titulo"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  @error="(e) => e.target.src = '/images/portadas/default.jpg'"
                />
              </div>
              <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E03636]/10 rounded-full text-[#E03636] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginación -->
        <div v-if="totalPaginas > 1" class="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button 
            @click="paginaAnterior"
            :disabled="paginaActual === 1"
            class="px-3 py-1 rounded-lg transition-all duration-300 text-sm font-medium"
            :class="paginaActual === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
          >
            ← Anterior
          </button>

          <div class="flex gap-1 flex-wrap justify-center">
            <button 
              v-for="p in totalPaginas" 
              :key="p"
              @click="paginaActual = p"
              class="w-8 h-8 rounded-lg transition-all duration-300 text-sm font-medium"
              :class="paginaActual === p ? 'bg-[#E03636] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ p }}
            </button>
          </div>

          <button 
            @click="paginaSiguiente"
            :disabled="paginaActual === totalPaginas"
            class="px-3 py-1 rounded-lg transition-all duration-300 text-sm font-medium"
            :class="paginaActual === totalPaginas ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
          >
            Siguiente →
          </button>
        </div>

        <div class="text-center text-xs text-gray-400 mt-2">
          Mostrando {{ inicioMostrar }} - {{ finMostrar }} de {{ totalTomos }} tomos
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ============================================
// DATOS DE TOMOS - CON RUTAS CORRECTAS
// ============================================

// Periodo 2025-2026: 2 tomos
const tomos2025 = [
  { 
    id: 1, 
    numero: 'TOMO I', 
    titulo: 'Tomo I - Gestión 2025-2026', 
    pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_I_2025-2026.pdf',
    portada: '/images/portadas/2025-2026/default.jpg'
  },
  { 
    id: 2, 
    numero: 'TOMO II', 
    titulo: 'Tomo II - Gestión 2025-2026', 
    pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_II_2025-2026.pdf',
    portada: '/images/portadas/2025-2026/default.jpg'
  }
]

// Periodo 2023-2024: 12 tomos
const tomos2023 = [
  { id: 3, numero: 'TOMO I', titulo: 'Tomo I - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_I_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 4, numero: 'TOMO II', titulo: 'Tomo II - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_II_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 5, numero: 'TOMO III', titulo: 'Tomo III - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_III_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 6, numero: 'TOMO IV', titulo: 'Tomo IV - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_IV_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 7, numero: 'TOMO V', titulo: 'Tomo V - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_V_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 8, numero: 'TOMO VI', titulo: 'Tomo VI - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VI_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 9, numero: 'TOMO VII', titulo: 'Tomo VII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 10, numero: 'TOMO VIII', titulo: 'Tomo VIII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VIII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 11, numero: 'TOMO IX', titulo: 'Tomo IX - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_IX_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 12, numero: 'TOMO X', titulo: 'Tomo X - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_X_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 13, numero: 'TOMO XI', titulo: 'Tomo XI - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_XI_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' },
  { id: 14, numero: 'TOMO XII', titulo: 'Tomo XII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_XII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg' }
]

// ============================================
// ESTADO
// ============================================
const paginaActual = ref(1)
const itemsPorPagina = 6

// ============================================
// COMPUTED
// ============================================
const totalTomos = computed(() => tomos2023.length)
const totalPaginas = computed(() => Math.ceil(totalTomos.value / itemsPorPagina))

const tomosPaginados = computed(() => {
  const start = (paginaActual.value - 1) * itemsPorPagina
  const end = start + itemsPorPagina
  return tomos2023.slice(start, end)
})

const inicioMostrar = computed(() => (paginaActual.value - 1) * itemsPorPagina + 1)
const finMostrar = computed(() => Math.min(paginaActual.value * itemsPorPagina, totalTomos.value))

// ============================================
// MÉTODOS
// ============================================
const abrirPDF = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    alert('PDF no disponible')
  }
}

const paginaAnterior = () => {
  if (paginaActual.value > 1) paginaActual.value--
}

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++
}
</script>

<style scoped>
/* ========================================== */
/* 🔥 GRID DE 6 COLUMNAS                     */
/* ========================================== */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ========================================== */
/* 🔥 ESTILOS DE TARJETAS                    */
/* ========================================== */
.aspect-square {
  aspect-ratio: 1/1;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #ffffff, #f9fafb);
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* ========================================== */
/* 🔥 BADGE PDF                              */
/* ========================================== */
.bg-\[\#E03636\]\/10 {
  background-color: rgba(224, 54, 54, 0.1);
}

.text-\[\#E03636\] {
  color: #E03636;
}

/* ========================================== */
/* 🔥 TÍTULO DE PERIODO                      */
/* ========================================== */
.bg-\[\#A54A4A\] {
  background-color: #A54A4A;
}

.text-\[\#A54A4A\] {
  color: #A54A4A;
}

/* ========================================== */
/* 🔥 TRANSICIONES                           */
/* ========================================== */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:border-\[\#E03636\]:hover {
  border-color: #E03636;
}

.opacity-0 {
  opacity: 0;
}

.group:hover .opacity-0 {
  opacity: 1;
}
</style>
