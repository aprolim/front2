<template>
  <div
    class="hero-video-wrapper relative w-full overflow-hidden"
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

    <!-- ============================================ -->
    <!-- BARRA DE SESIÓN - SIEMPRE VISIBLE            -->
    <!-- ============================================ -->
    <div
      class="absolute top-0 left-0 right-0 z-20 w-full border-b border-white/20 py-[2.4vw] md:py-[.8vw] px-4 text-[3.6vw] md:text-[1.2vw]"
      style="background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
    >
      <div class="flex items-center justify-center gap-[2.4vw] md:gap-[.8vw] flex-wrap">

        <!-- 🔥 CASO 1: Hay sesión aprobada -->
        <template v-if="hasValidData && sessionData">
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

          <span class="text-senado-gold-dark">|</span>
          <button
            @click="openModal"
            class="text-white/90 hover:text-white font-thin underline cursor-pointer transition-colors text-[3.6vw] md:text-[1.2vw]"
          >
            ORDEN DEL DÍA
          </button>
        </template>

        <!-- 🔥 CASO 2: Sin sesión -->
        <template v-else>
          <!-- <span class="text-white/90 font-medium">
            Bienvenido al portal del Senado de Bolivia
          </span>
          <span class="text-senado-gold-dark">|</span>
          <NuxtLink
            to="/en-vivo"
            class="text-white/90 hover:text-white font-medium flex items-center gap-1 underline transition-colors text-[3.6vw] md:text-[1.2vw]"
          >
            Ver sesiones en vivo
          </NuxtLink> -->
        </template>

      </div>
    </div>

    <div class="absolute inset-0"></div>

    <!-- ============================================ -->
    <!-- ESTADÍSTICAS                                 -->
    <!-- ============================================ -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-t-2xl shadow-2xl"
      style="width: 90%; height: 30%;"
    >
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
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ stats?.enTratamiento || 0 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Aprobados</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ stats?.aprobados || 0 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Sancionadas</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ stats?.sancionadas || 0 }}</div>
          </div>
          <div class="flex flex-col items-center justify-center text-center px-1">
            <div class="text-[#e3d194] text-[3.3vw] md:text-[1.1vw] font-[700] tracking-wider leading-tight">Peticiones de<br />Informe</div>
            <div class="text-white text-[9vw] md:text-[3vw] font-bold leading-none mt-1">{{ peticiones?.peticionesInforme || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

// Stores
import { useSessionStore } from '~/stores/session'
import { useStatsStore } from '~/stores/stats'
import { useLiveStore } from '~/stores/live'
import { usePeticionesStore } from '~/stores/peticiones'

// ==========================================
// STORES
// ==========================================
const sessionStore = useSessionStore()
const statsStore = useStatsStore()
const liveStore = useLiveStore()
const peticionesStore = usePeticionesStore()

const { hasValidData, sessionData, formattedDate } = storeToRefs(sessionStore)
const { data: stats } = storeToRefs(statsStore)
const { liveVideo } = storeToRefs(liveStore)
const { data: peticiones } = storeToRefs(peticionesStore)

// ==========================================
// CONFIGURACIÓN DEL VIDEO DE FONDO
// ==========================================
const videoRef = ref(null)
const videoContainerRef = ref(null)

// CSS var global que ajustamos al detectar el header
const updateHeroHeight = () => {
  if (typeof window === 'undefined') return

  const header = document.querySelector('header') || document.querySelector('.sticky')
  const headerPx = header ? header.offsetHeight : 80

  document.documentElement.style.setProperty('--header-height', `${headerPx}px`)
}

// ==========================================
// MÉTODOS
// ==========================================
const openModal = () => {
  sessionStore.openModal()
}

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  // Ajustar la altura del hero antes del primer paint
  updateHeroHeight()
  requestAnimationFrame(updateHeroHeight)

  // Aseguramos que los stores estén cargando (por si acaso)
  sessionStore.ensureLoaded()
  statsStore.ensureLoaded()
  liveStore.ensureLoaded()
  peticionesStore.ensureLoaded()

  // Resize con rAF
  let resizeRaf = null
  const handleResize = () => {
    if (resizeRaf) return
    resizeRaf = requestAnimationFrame(() => {
      updateHeroHeight()
      resizeRaf = null
    })
  }
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('orientationchange', handleResize, { passive: true })

  // Autoplay del video
  if (videoRef.value) {
    const playPromise = videoRef.value.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
  }

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('orientationchange', handleResize)
    if (resizeRaf) cancelAnimationFrame(resizeRaf)
  })
})
</script>

<style scoped>
.hero-video-wrapper {
  height: var(--hero-video-height, 70vw);
  min-height: 300px;
  transition: height 0.2s ease-out;
  contain: layout paint size;
  will-change: height;
}

@media (min-width: 1024px) {
  .hero-video-wrapper {
    height: calc(100vh - var(--header-height, 80px));
    transition: height 0.15s ease-out;
  }
}

/* Cometa */
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

/* En vivo */
@keyframes pulse-border {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
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