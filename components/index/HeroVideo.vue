<template>
  <div 
    class="relative w-full overflow-hidden" 
    :style="isDesktop ? { height: videoHeight } : { height: '70vw', minHeight: '300px' }"
    ref="videoContainerRef"
  >
    <video
      ref="videoRef"
      class="absolute top-0 left-0 w-full h-full object-cover"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    >
      <source src="/videos/fondo-senado.webm" type="video/mp4" />
    </video>
    
    <!-- BARRA DE SESIÓN -->
    <div 
      v-if="hasValidData && !isLoading"
      class="absolute top-0 left-0 right-0 z-20 w-full border-b border-white/20 py-[2.4vw] md:py-[.8vw] px-4 text-[3.6vw] md:text-[1.2vw]" 
      style="background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
    >
      <div class="flex items-center justify-center gap-[2.4vw] md:gap-[.8vw] flex-wrap">
        <span class="text-white/90 font-[700]">
          {{ formattedDate }} -
        </span>
        <span class="text-white/90 font-medium">
          {{ sessionData?.title || 'Sesión' }} 
        </span>

        <template v-if="liveVideo">
          <span class="text-senado-gold-dark">|</span>
          <NuxtLink 
            to="/en-vivo"
            class="flex items-center gap-2 px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded-full text-white font-bold text-[2.4vw] md:text-[0.8vw] transition-all duration-300 animate-pulse-border"
          >
            <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse-dot"></span>
            EN DIRECTO
          </NuxtLink>
        </template>

        <template v-else>
          <span class="text-senado-gold-dark">|</span>
          <NuxtLink 
            to="/en-vivo"
            class="text-white/90 hover:text-white font-medium flex items-center gap-1 underline transition-colors text-[3.6vw] md:text-[1.2vw]"
          >
            Ver sesiones previas
          </NuxtLink>
        </template>

        <span v-if="sessionData?.path || liveVideo" class="text-senado-gold-dark">|</span>
        
        <button 
          @click="openModal"
          :disabled="!hasValidData"
          class="text-white/90 hover:text-white font-thin underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[3.6vw] md:text-[1.2vw]"
        >
          ORDEN DEL DÍA
        </button>
      </div>
    </div>

    <!-- BARRA DE CARGA -->
    <div 
      v-else-if="isLoading"
      class="absolute top-0 left-0 right-0 z-20 w-full border-b border-white/20 py-[2.4vw] md:py-[.8vw] px-4 text-[3.6vw] md:text-[1.2vw]" 
      style="background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
    >
      <div class="flex items-center justify-center gap-[2.4vw] md:gap-[.8vw] flex-wrap">
        <span class="text-white/90 font-[700]">Cargando sesión...</span>
      </div>
    </div>

    <div class="absolute inset-0"></div>

    <!-- Estadísticas -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-t-2xl shadow-2xl" style="width: 90%; height: 30%;">
      <div class="relative w-full h-full bg-black/5 backdrop-blur-md rounded-t-2xl border border-b-0 border-[#e3d194]/30">
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-20">
          <defs>
            <linearGradient id="comet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#e3d194" stop-opacity="1" />
              <stop offset="20%" stop-color="#e3d194" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#e3d194" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" ry="16" fill="none" stroke="url(#comet-gradient)" stroke-width="3" pathLength="100" stroke-dasharray="18 82" class="comet-animation-1" />
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" ry="16" fill="none" stroke="url(#comet-gradient)" stroke-width="3" pathLength="100" stroke-dasharray="18 82" class="comet-animation-2" />
        </svg>

        <div class="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 p-2 md:p-4 relative z-10">
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />en Tratamiento</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ estadisticas?.proyectos_tratamiento || 293 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Aprobados</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ estadisticas?.proyectos_aprobados || 16 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Sancionadas</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ estadisticas?.proyectos_sancionados || 31 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Peticiones de<br />Informe</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ estadisticas?.peticiones_informe || 1627 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useSessionData } from '~/composables/useSessionData'

// Props
defineProps({
  liveVideo: {
    type: Object,
    default: null
  },
  estadisticas: {
    type: Object,
    default: () => ({})
  }
})

// ========================================== //
// SESIÓN DE DATOS
// ========================================== //
const {
  sessionData,
  formattedDate,
  isLoading,
  hasValidData,
  openModal
} = useSessionData()

// ========================================== //
// CONFIGURACIÓN DEL VIDEO DE FONDO
// ========================================== //
const videoRef = ref(null)
const videoContainerRef = ref(null)
const videoHeight = ref('100vh')
const isDesktop = ref(false)

const checkIsDesktop = () => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024
  }
}

const calculateVideoHeight = () => {
  if (process.client && isDesktop.value) {
    const header = document.querySelector('header') || document.querySelector('.sticky')
    let headerHeight = 0
    
    if (header) {
      headerHeight = header.offsetHeight
    }
    
    const viewportHeight = window.innerHeight
    const calculatedHeight = viewportHeight - headerHeight
    
    videoHeight.value = `${calculatedHeight}px`
  }
}

const handleResize = () => {
  checkIsDesktop()
  if (isDesktop.value) {
    calculateVideoHeight()
  }
}

// ========================================== //
// LIFECYCLE
// ========================================== //
onMounted(() => {
  checkIsDesktop()
  
  nextTick(() => {
    if (isDesktop.value) {
      calculateVideoHeight()
    }
  })
  
  window.addEventListener('resize', handleResize)
  
  if (videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* ========================================== */
/* ANIMACIONES COMETA                         */
/* ========================================== */
.comet-animation-1 {
  animation: cometLoop1 10s linear infinite;
}
.comet-animation-2 {
  animation: cometLoop2 10s linear infinite;
}
@keyframes cometLoop1 {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -100; }
}
@keyframes cometLoop2 {
  from { stroke-dashoffset: -50; }
  to { stroke-dashoffset: -150; }
}

/* ========================================== */
/* ANIMACIONES EN DIRECTO                     */
/* ========================================== */
@keyframes pulse-border {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  }
  50% { 
    box-shadow: 0 0 0 8px rgba(220, 38, 38, 0);
  }
}

.animate-pulse-border {
  animation: pulse-border 1.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
}

.animate-pulse-dot {
  animation: pulse-dot 1s ease-in-out infinite;
}
</style>