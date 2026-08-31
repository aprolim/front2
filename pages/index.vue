<!-- pages/index.vue -->
<template>
  <div class="overflow-visible">
    <!-- VIDEO CON ESTADÍSTICAS Y BARRA DE SESIÓN -->
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
        class="absolute top-0 left-0 right-0 z-20 w-full border-b border-white/20 py-[.8vw] px-4 text-[1.2vw]" 
        style="background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
      >
        <div class="flex items-center justify-center gap-[.8vw] flex-wrap">
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
              class="flex items-center gap-2 px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded-full text-white font-bold text-xs transition-all duration-300 animate-pulse-border"
            >
              <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse-dot"></span>
              EN DIRECTO
            </NuxtLink>
          </template>

          <template v-else>
            <span class="text-senado-gold-dark">|</span>
            <NuxtLink 
              to="/en-vivo"
              class="text-white/90 hover:text-white font-medium flex items-center gap-1 underline transition-colors"
            >
              Ver sesiones previas
            </NuxtLink>
          </template>

          <span v-if="sessionData?.path || liveVideo" class="text-senado-gold-dark">|</span>
          
          <button 
            @click="openModal"
            :disabled="!hasValidData"
            class="text-white/90 hover:text-white font-thin underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ORDEN DEL DÍA
          </button>
        </div>
      </div>

      <!-- BARRA DE CARGA -->
      <div 
        v-else-if="isLoading"
        class="absolute top-0 left-0 right-0 z-20 w-full border-b border-white/20 py-[.8vw] px-4 text-[1.2vw]" 
        style="background: rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
      >
        <div class="flex items-center justify-center gap-[.8vw] flex-wrap">
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
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />en Tratamiento</div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">{{ estadisticas.enTratamiento }}</div>
            </div>
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Aprobados</div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">{{ estadisticas.aprobados }}</div>
            </div>
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-[700] tracking-wider leading-tight">Proyectos de Ley<br />Sancionadas</div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">{{ estadisticas.sancionadas }}</div>
            </div>
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-[700] tracking-wider leading-tight">Peticiones de<br />Informe</div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">{{ estadisticas.peticionesInforme }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="mx-auto w-[75%] py-[2vw]">
      <div>
        <h2 class="text-[2.2vw] font-bold text-senado-primary mb-6">Facultades Legislativas</h2>
        
        <!-- ========================================== -->
        <!-- GRID DE 3 COLUMNAS CON BADGES UNIFORMES   -->
        <!-- ========================================== -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- ========================================== -->
          <!-- LEGISLACIÓN - TODOS APUNTAN A /legislacion -->
          <!-- ========================================== -->
          <div class="bg-senado-gold-lightest3 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">LEGISLACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Proyectos de Ley en Tratamiento</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.enTratamiento }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Proyectos de Ley Aprobados</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.aprobados }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Leyes Sancionadas</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.sancionadas }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Leyes Promulgadas</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.promulgadas }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Proyectos de Ley con Modificaciones</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.modificaciones }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/legislacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Proyectos de Ley Rechazados</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.rechazados }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- FISCALIZACIÓN - ENLACES EXISTENTES        -->
          <!-- ========================================== -->
          <div class="bg-senado-gold-lightest2 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">FISCALIZACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/peticiones-informe-escrito" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Peticiones de Informe Escrito</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.peticionesEscrito }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/peticiones-informe-oral" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Peticiones de Informe Oral</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.peticionesOral }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- GESTIÓN - ENLACES EXISTENTES              -->
          <!-- ========================================== -->
          <div class="bg-senado-gold-lightest2 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">GESTIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/resoluciones-camarales" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Resoluciones Camarales</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.resoluciones }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/declaraciones-camarales" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Declaraciones Camarales</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.declaraciones }}</span>
                </li>
                
                <li class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800">
                  <NuxtLink to="/minutas-comunicacion" class="flex items-center gap-2 hover:text-senado-primary w-full">
                    <span class="text-senado-gold-dark font-bold">></span>
                    <span>Minutas de Comunicación</span>
                  </NuxtLink>
                  <span class="bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full min-w-[3.2vw] text-center font-medium">{{ estadisticas.minutas }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- CALENDARIO Y LÍNEA DE TIEMPO -->
      <div class="mt-12">
        <h2 class="text-[2.2vw] font-bold text-senado-primary mb-6 flex items-center gap-3">
          <Icon name="mdi:calendar-month" class="text-[2.5vw] text-senado-primary" />
          Agenda de Sesiones
        </h2>
        
        <CalendarioActividades 
          :fechas-sesiones="fechasSesiones"
          :actividades="actividadesExtra"
        />
      </div>

      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>
  
      <NoticiasDinamicas />
      
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>

      <DescubraSenado />
      
      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>

      <MandatoFuncionesAntecedentes />
    </div>

    <!-- MODAL DE ORDEN DEL DÍA -->
    <div 
      v-if="showModal && hasValidData && modalData" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-[90vw] max-h-[90vh] overflow-y-auto p-8 md:p-10" style="width: 520px;">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors text-3xl font-light z-10">×</button>
        
        <div class="text-center">
          <!-- BANDA TRICOLOR -->
          <div class="w-full h-[6px] flex rounded-full overflow-hidden mb-4">
            <div class="flex-1 bg-[#D52B1E]"></div>
            <div class="flex-1 bg-[#F9E300]"></div>
            <div class="flex-1 bg-[#007A36]"></div>
          </div>
          
          <!-- ESCUDO -->
          <img 
            src="/logo/log2_colores.png" 
            alt="Senado de Bolivia" 
            class="w-[90px] h-auto mx-auto mb-3"
          />
          
          <!-- TÍTULO -->
          <h2 class="text-2xl font-bold text-[#1a2b4c] mb-2 tracking-wide">
            {{ modalData?.title || 'SESIÓN ORDINARIA' }}
          </h2>
          
          <!-- LÍNEA DORADA -->
          <div class="w-[60px] h-[3px] bg-[#c9a84c] mx-auto mb-4 rounded-full"></div>
          
          <!-- ORDEN DEL DÍA -->
          <h3 class="text-sm font-semibold text-[#1a2b4c] mb-4 tracking-wider">
            - ORDEN DEL DÍA -
          </h3>
          
          <!-- ÍTEMS -->
          <div class="text-left max-w-[380px] mx-auto text-sm text-gray-700">
            <div 
              v-for="(item, index) in modalData?.agendaItems || []" 
              :key="index" 
              class="flex items-start gap-3 py-1.5 border-b border-gray-100 last:border-0"
            >
              <span class="font-bold text-[#c9a84c] min-w-[22px]">{{ index + 1 }}.</span>
              <span class="leading-relaxed">{{ item }}</span>
            </div>
          </div>

          <!-- NOTA -->
          <p class="text-sm text-gray-600 italic mt-4">
            {{ modalData?.note || 'Nota: La sesión se desarrollará bajo la modalidad presencial.' }}
          </p>

          <!-- FECHA Y HORA -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-sm font-bold text-[#1a2b4c] tracking-wide">
              {{ modalData?.dateFormattedShort || 'FECHA NO DISPONIBLE' }}
            </p>
            <p class="text-sm text-gray-600 font-semibold">
              HORA: {{ modalData?.time || '--:--' }}
            </p>
            <p v-if="modalData?.location" class="text-xs text-gray-500 mt-1">
              📍 {{ modalData.location }}
            </p>
            <p v-if="modalData?.modality" class="text-xs text-gray-500 mt-0.5">
              📋 Modalidad: {{ modalData.modality }}
            </p>
          </div>

          <!-- FOOTER -->
          <div class="mt-4 pt-3 border-t border-gray-200">
            <p class="text-[10px] text-gray-400 font-light tracking-wider">
              Dirección de Comunicación y Prensa
            </p>
          </div>

          <!-- BOTÓN DESCARGAR PDF -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <button 
              @click="downloadPDF"
              class="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a2b4c] hover:bg-[#2a3b5c] text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useSessionData } from '~/composables/useSessionData'
import DescubraSenado from '~/components/DescubraSenado.vue'
import NoticiasDinamicas from '~/components/NoticiasDinamicas.vue'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'
import CalendarioActividades from '~/components/CalendarioActividades.vue'

// ========================================== //
// ESTADO DEL VIDEO EN VIVO
// ========================================== //
const liveVideo = ref(null)
const liveLoading = ref(false)

// ========================================== //
// SESIÓN DE DATOS
// ========================================== //
const {
  sessionData,
  formattedDate,
  isLoading,
  errorMessage,
  showModal,
  modalData,
  estadisticas,
  hasValidData,
  todasLasSesiones,
  fetchSessionData,
  fetchEstadisticas,
  openModal,
  closeModal,
  handleKeydown,
  downloadPDF
} = useSessionData()

// 🔥 PASAR LAS SESIONES AL CALENDARIO
const fechasSesiones = computed(() => {
  return todasLasSesiones.value
})

const actividadesExtra = computed(() => {
  return []
})

// ========================================== //
// API PARA VIDEO EN VIVO
// ========================================== //
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

const cargarLive = async () => {
  liveLoading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/sesiones/live`)
    const result = await response.json()
    
    if (result.success && result.data) {
      liveVideo.value = result.data
      console.log('🔴 Video en vivo cargado:', liveVideo.value.title)
    } else {
      liveVideo.value = null
      console.log('ℹ️ No hay transmisión en vivo activa')
    }
  } catch (error) {
    console.error('❌ Error cargando LIVE:', error)
    liveVideo.value = null
  } finally {
    liveLoading.value = false
  }
}

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
    
    console.log('Header height:', headerHeight)
    console.log('Video height:', videoHeight.value)
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
  Promise.all([
    fetchSessionData(),
    fetchEstadisticas(),
    cargarLive()
  ]).then(() => {
    console.log('✅ Todos los datos cargados correctamente')
  }).catch((error) => {
    console.error('❌ Error cargando datos:', error)
  })
  
  checkIsDesktop()
  
  nextTick(() => {
    if (isDesktop.value) {
      calculateVideoHeight()
    }
  })
  
  window.addEventListener('resize', handleResize)
  
  if (process.client) {
    const scrollPos = sessionStorage.getItem('scrollPosicion')
    if (scrollPos) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(scrollPos), behavior: 'smooth' })
        sessionStorage.removeItem('scrollPosicion')
      }, 400)
    }
  }
  
  if (videoRef.value) {
    videoRef.value.play().catch(() => {})
  }
  
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
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