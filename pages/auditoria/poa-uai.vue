<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner - Versión Compacta -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-12 sm:px-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <!-- Badge pequeño -->
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:file-pdf-box" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">PLAN OPERATIVO ANUAL</span>
            </div>

            <!-- Título en línea -->
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              POA - <span class="text-senado-gold">UAI</span>
            </h1>

            <!-- Subtítulo -->
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>

          <!-- Año actual destacado -->
          <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-center px-[6vw] sm:px-8 py-[1.8vw] sm:py-3">
            <span class="font-bold text-senado-gold text-[7.5vw] sm:text-3xl">{{ añoActual }}</span>
            <p class="text-white/60 tracking-wider text-[1.8vw] sm:text-xs">VIGENTE</p>
          </div>
        </div>
      </div>

      <!-- Onda inferior -->
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
        <p class="ml-4 text-gray-500 text-[3vw] sm:text-sm">Cargando POAs...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-[10vw] sm:py-16 bg-red-50 rounded-xl border border-red-200">
        <div class="text-[10vw] sm:text-4xl mb-3">⚠️</div>
        <p class="text-red-600 font-medium text-[3.6vw] sm:text-base">{{ error }}</p>
        <button @click="recargar" class="mt-4 px-6 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition text-sm">
          Reintentar
        </button>
      </div>

      <!-- Contenido -->
      <template v-else>
        <!-- Tarjeta del Año Actual -->
        <div v-if="poaActual" class="bg-white rounded-xl shadow-md border border-gray-100 relative z-10 px-[3.6vw] sm:px-6 py-[3.6vw] sm:py-4 -mt-[2.4vw] sm:-mt-4 mb-[4.5vw] sm:mb-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex items-center gap-[2.4vw] sm:gap-4">
              <div class="bg-senado-primary text-white rounded-lg px-[3.6vw] sm:px-4 py-[1.5vw] sm:py-2">
                <span class="font-bold text-[5.4vw] sm:text-2xl">{{ poaActual.anio }}</span>
              </div>
              <div>
                <h3 class="font-bold text-senado-primary text-[3.3vw] sm:text-lg">POA - UAI {{ poaActual.anio }}</h3>
                <p class="text-gray-500 text-[2.1vw] sm:text-sm">Plan Operativo Anual vigente</p>
              </div>
            </div>
            <a
              v-if="poaActual.pdfUrl"
              :href="poaActual.pdfUrl"
              :download="'POA_UAI_' + poaActual.anio + '.pdf'"
              target="_blank"
              class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium whitespace-nowrap px-[4.5vw] sm:px-4 py-[1.5vw] sm:py-2 text-[2.4vw] sm:text-sm gap-[1.2vw] sm:gap-2"
            >
              <Icon name="mdi:download" class="text-[3.3vw] sm:text-lg" />
              Descargar PDF
            </a>
          </div>
        </div>

        <!-- ESTADÍSTICAS CALCULADAS AUTOMÁTICAMENTE -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
          <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
            <div class="font-bold text-senado-primary text-[6vw] sm:text-2xl">{{ totalPoas }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm">Total POAs</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
            <div class="font-bold text-green-600 text-[6vw] sm:text-2xl">{{ totalVigentes }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm">Vigentes</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
            <div class="font-bold text-blue-600 text-[6vw] sm:text-2xl">{{ totalPublicados }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm">Publicados</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
            <div class="font-bold text-yellow-600 text-[6vw] sm:text-2xl">{{ totalEnRevision }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm">En Revisión</p>
          </div>
        </div>

        <!-- Tabla de Documentos -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div class="border-b border-gray-100 px-[3.6vw] sm:px-4 py-[1.8vw] sm:py-3">
            <h2 class="font-bold text-senado-primary flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
              <Icon name="mdi:file-document" class="text-[4.2vw] sm:text-xl" />
              Documentos POA - UAI
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Año</th>
                  <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Documento</th>
                  <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Fecha</th>
                  <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Estado</th>
                  <th class="text-center text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(poa, index) in poasOrdenados"
                  :key="poa._id || index"
                  class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  :class="poa.activo ? 'bg-yellow-50/50' : ''"
                >
                  <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                    <span class="font-bold text-[2.55vw] sm:text-sm">{{ poa.anio }}</span>
                    <span v-if="poa.activo" class="ml-1 font-bold text-yellow-600 bg-yellow-100 rounded-full px-[1.5vw] sm:px-2 py-[0.15vw] sm:py-0.5 text-[1.5vw] sm:text-[10px]">VIGENTE</span>
                  </td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                    <div class="flex items-center gap-[1.2vw] sm:gap-2">
                      <Icon name="mdi:file-pdf-box" class="text-red-500 text-[4.2vw] sm:text-xl" />
                      <span class="text-[2.1vw] sm:text-sm">{{ poa.titulo }}</span>
                    </div>
                  </td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[2.1vw] sm:text-sm text-gray-500">{{ poa.fecha || '-' }}</td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                    <span
                      class="rounded-full font-medium px-[1.8vw] sm:px-2 py-[0.3vw] sm:py-0.5 text-[1.8vw] sm:text-xs"
                      :class="{
                        'bg-green-100 text-green-700': poa.estado === 'Publicado',
                        'bg-yellow-100 text-yellow-700': poa.estado === 'En Revisión',
                        'bg-gray-100 text-gray-700': poa.estado === 'Borrador'
                      }"
                    >
                      {{ poa.estado }}
                    </span>
                  </td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                    <div class="flex items-center justify-center gap-[1.8vw] sm:gap-3">
                      <button
                        @click="verPDF(poa)"
                        class="text-senado-primary hover:text-senado-primary-dark transition-colors"
                        title="Ver"
                      >
                        <Icon name="mdi:eye" class="text-[3.9vw] sm:text-lg" />
                      </button>
                      <a
                        v-if="poa.pdfUrl"
                        :href="poa.pdfUrl"
                        :download="'POA_UAI_' + poa.anio + '.pdf'"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Descargar"
                      >
                        <Icon name="mdi:download" class="text-[3.9vw] sm:text-lg" />
                      </a>
                      <span v-else class="text-gray-300 text-[1.8vw] sm:text-xs">Sin PDF</span>
                    </div>
                  </td>
                </tr>

                <!-- Sin datos -->
                <tr v-if="poas.length === 0">
                  <td colspan="5" class="text-center py-[4vw] sm:py-8 text-gray-500 text-[2.7vw] sm:text-sm">
                    No hay documentos POA disponibles
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
const API_BASE_URL = 'https://demoback.senado.gob.bo/api'

// ============================================
// ESTADO
// ============================================
const poas = ref([])
const loading = ref(false)
const error = ref(null)

// ============================================
// COMPUTED
// ============================================
const añoActual = computed(() => new Date().getFullYear())

const totalPoas = computed(() => poas.value.length)
const totalVigentes = computed(() => poas.value.filter(p => p.activo === true).length)
const totalPublicados = computed(() => poas.value.filter(p => p.estado === 'Publicado').length)
const totalEnRevision = computed(() => poas.value.filter(p => p.estado === 'En Revisión').length)

const poaActual = computed(() => poas.value.find(p => p.activo === true) || null)

const poasOrdenados = computed(() => {
  return [...poas.value].sort((a, b) => b.anio - a.anio)
})

// ============================================
// MÉTODOS
// ============================================
const cargarPOAs = async () => {
  loading.value = true
  error.value = null

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    // 🔥 Endpoint: GET /api/auditoria/poa-uai
    const response = await fetch(`${API_BASE_URL}/auditoria/poa-uai`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    clearTimeout(timeoutId)

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

    const result = await response.json()

    if (result.success && result.data) {
      // El backend devuelve { documentos: [...] }
      poas.value = result.data.documentos || result.data || []
      console.log(`✅ [POA-UAI] ${poas.value.length} POAs cargados`)
    } else {
      throw new Error(result.message || 'Error al cargar POAs')
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      error.value = 'La solicitud tardó demasiado. Intente nuevamente.'
    } else {
      error.value = err.message
    }
    console.error('❌ [POA-UAI] Error:', err)
  } finally {
    loading.value = false
  }
}

const verPDF = (poa) => {
  if (poa.pdfUrl) {
    window.open(poa.pdfUrl, '_blank')
  } else {
    alert(`El documento POA ${poa.anio} no tiene PDF disponible.`)
  }
}

const recargar = () => {
  cargarPOAs()
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarPOAs()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>