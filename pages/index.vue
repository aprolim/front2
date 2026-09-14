<template>
  <div class="overflow-visible">
    <!-- HERO CON VIDEO Y ESTADÍSTICAS - usa localStorage -->
    <ClientOnly>
      <HeroVideo />
      <template #fallback>
        <div class="hero-video-wrapper relative w-full overflow-hidden bg-black" />
      </template>
    </ClientOnly>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="mx-auto w-[75%] py-[2vw]">
      <!-- Estático: sin ClientOnly -->
      <FacultadesLegislativas />

      <!-- Dinámico: usa localStorage -->
      <ClientOnly>
        <div class="mt-12">
          <AgendaSesiones />
        </div>
        <template #fallback>
          <div class="mt-12 h-96" />
        </template>
      </ClientOnly>

      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] md:h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>

      <!-- Dinámico: usa store de noticias -->
      <ClientOnly>
        <NoticiasDinamicas />
        <template #fallback>
          <div class="min-h-[400px]" />
        </template>
      </ClientOnly>

      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] md:h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>

      <!-- Estático -->
      <DescubraSenado />

      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>

      <!-- Estático -->
      <MandatoFuncionesAntecedentes />
    </div>

    <!-- MODAL DE ORDEN DEL DÍA -->
    <div
      v-if="showModal && modalData"
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
import { onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

// ==========================================
// COMPONENTES
// ==========================================
import HeroVideo from '~/components/index/HeroVideo.vue'
import FacultadesLegislativas from '~/components/index/FacultadesLegislativas.vue'
import AgendaSesiones from '~/components/index/AgendaSesiones.vue'
import NoticiasDinamicas from '~/components/NoticiasDinamicas.vue'
import DescubraSenado from '~/components/DescubraSenado.vue'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'

// ==========================================
// STORES
// ==========================================
import { useSessionStore } from '~/stores/session'
import { useStatsStore } from '~/stores/stats'
import { useLiveStore } from '~/stores/live'
import { usePeticionesStore } from '~/stores/peticiones'
import { useNoticiasStore } from '~/stores/noticias'

const sessionStore = useSessionStore()
const statsStore = useStatsStore()
const liveStore = useLiveStore()
const peticionesStore = usePeticionesStore()
const noticiasStore = useNoticiasStore()

// ==========================================
// STATE REACTIVO DEL STORE
// ==========================================
const { showModal, modalData } = storeToRefs(sessionStore)

// ==========================================
// MÉTODOS
// ==========================================
const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}

const downloadPDF = () => {
  sessionStore.downloadPDF?.()
}

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  // 🔥 Disparar todas las cargas en paralelo (idempotente)
  // Cada store decide si usar caché o refetch
  // Nada bloquea la UI porque no hay await
  sessionStore.ensureLoaded()
  statsStore.ensureLoaded()
  liveStore.ensureLoaded()
  peticionesStore.ensureLoaded()
  noticiasStore.ensureLoaded()

  // Restaurar scroll si había uno guardado
  if (process.client) {
    const scrollPos = sessionStorage.getItem('scrollPosicion')
    if (scrollPos) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(scrollPos), behavior: 'smooth' })
        sessionStorage.removeItem('scrollPosicion')
      }, 400)
    }
  }

  // Cerrar modal con ESC
  const handleKeydown = (event) => {
    if (event.key === 'Escape' && showModal.value) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleKeydown)

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto'
  })
})
</script>