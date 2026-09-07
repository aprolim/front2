<template>
  <div class="overflow-visible">
    <!-- VIDEO CON ESTADÍSTICAS Y BARRA DE SESIÓN -->
    <HeroVideo 
      :live-video="liveVideo" 
      :estadisticas="estadisticas" 
    />

    <!-- CONTENIDO PRINCIPAL -->
    <div class="mx-auto w-[75%] py-[2vw]">
      <FacultadesLegislativas />

      <!-- CALENDARIO Y LÍNEA DE TIEMPO -->
      <div class="mt-12">
        <AgendaSesiones 
          :fechas-sesiones="fechasSesiones"
          :actividades-extra="actividadesExtra"
        />
      </div>

      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] md:h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>
  
      <NoticiasDinamicas />
      
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] md:h-[2vw] w-auto object-contain brightness-0 opacity-100" />
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useSessionData } from '~/composables/useSessionData'

// Componentes de la página index (carpeta específica)
import DescubraSenado from '~/components/DescubraSenado.vue'
import NoticiasDinamicas from '~/components/NoticiasDinamicas.vue'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'
import HeroVideo from '~/components/index/HeroVideo.vue'
import FacultadesLegislativas from '~/components/index/FacultadesLegislativas.vue'
import AgendaSesiones from '~/components/index/AgendaSesiones.vue'

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

const fechasSesiones = computed(() => todasLasSesiones.value)
const actividadesExtra = computed(() => [])

// ========================================== //
// API PARA VIDEO EN VIVO
// ========================================== //
const API_BASE_URL = 'https://demoback.senado.gob.bo/api'

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
  
  if (process.client) {
    const scrollPos = sessionStorage.getItem('scrollPosicion')
    if (scrollPos) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(scrollPos), behavior: 'smooth' })
        sessionStorage.removeItem('scrollPosicion')
      }, 400)
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>