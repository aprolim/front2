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


    <div class="absolute inset-0"></div>

    <!-- ============================================ -->
    <!-- ESTADÍSTICAS                                 -->
    <!-- ============================================ -->

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

// Stores existentes (para sesiones y en vivo)
import { useSessionStore } from '~/stores/session'
import { useLiveStore } from '~/stores/live'

// 🔥 Usar el composable de documentos legislativos
import { useDocumentosLegislativos } from '~/composables/useDocumentosLegislativos'

// ==========================================
// STORES Y COMPOSABLES
// ==========================================
const sessionStore = useSessionStore()
const liveStore = useLiveStore()
const { getStats } = useDocumentosLegislativos()

const { hasValidData, sessionData, formattedDate } = storeToRefs(sessionStore)
const { liveVideo } = storeToRefs(liveStore)

// ==========================================
// 🔥 ESTADO DINÁMICO DE ESTADÍSTICAS
// ==========================================
const statsDinamicos = ref({
  enTratamiento: 0,
  aprobados: 0,
  rechazados: 0 // CAMBIO: Renombrado de sancionadas a rechazados
})

const cargarEstadisticas = async () => {
  try {
    // Consultamos todos los endpoints en paralelo para mayor velocidad
    const [
      resTratamiento,
      resAprobados,
      resRechazados // CAMBIO: Ahora consulta rechazados
    ] = await Promise.allSettled([
      getStats('proyecto-ley-tratamiento-senado'),
      getStats('proyecto-ley-aprobados'),
      getStats('proyecto-ley-rechazados') // CAMBIO: Endpoint de rechazados
    ])

    // Extraer los totales (si falla, se queda en 0)
    const enTratamiento = resTratamiento.status === 'fulfilled' ? (resTratamiento.value?.total || 0) : 0
    const aprobados = resAprobados.status === 'fulfilled' ? (resAprobados.value?.total || 0) : 0
    const rechazados = resRechazados.status === 'fulfilled' ? (resRechazados.value?.total || 0) : 0
    
    statsDinamicos.value = {
      enTratamiento,
      aprobados,
      rechazados
    }

    console.log('✅ [HeroVideo] Estadísticas cargadas:', statsDinamicos.value)
  } catch (error) {
    console.error('❌ [HeroVideo] Error al cargar estadísticas:', error)
  }
}

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
  liveStore.ensureLoaded()

  // 🔥 CARGAR LAS ESTADÍSTICAS DINÁMICAS
  cargarEstadisticas()

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