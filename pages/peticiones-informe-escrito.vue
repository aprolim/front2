<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-[95%] max-w-7xl mx-auto">

      <!-- Botón volver -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-[#611717] transition-colors text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- Encabezado -->
      <div class="mb-6">
        <div class="inline-block bg-[#611717] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          🔍 Fiscalización
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-[#611717]">
          Peticiones de Informe Escrito
        </h1>
        <p class="text-gray-600 mt-1 text-sm">
          Registro oficial de peticiones de informe escrito de la Cámara de Senadores
        </p>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div class="flex-1 min-w-[250px]">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="filters.search"
              @input="onSearchInput"
              type="text"
              placeholder="Buscar por código, asunto, peticionario o destinatario..."
              class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#611717] focus:border-transparent outline-none"
            />
          </div>
        </div>
        <select
          v-model="filters.gestion"
          @change="onFilterChange"
          class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#611717] outline-none"
        >
          <option value="">Todas las gestiones</option>
          <option v-for="year in aniosDisponibles" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <button
          @click="resetFilters"
          class="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Limpiar
        </button>
      </div>

      <!-- Contador de resultados -->
      <div v-if="!loading && !error" class="mb-4 text-sm text-gray-500">
        Mostrando <strong class="text-[#611717]">{{ documentos.length }}</strong>
        de <strong class="text-[#611717]">{{ total }}</strong>
        peticione{{ total !== 1 ? 's' : '' }}
        <span v-if="filters.search"> para "<strong>{{ filters.search }}</strong>"</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white rounded-lg shadow-sm py-16 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#611717] mx-auto"></div>
        <p class="mt-4 text-gray-600 text-sm">Cargando peticiones...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-700 font-medium text-sm">{{ error }}</p>
        <button
          @click="cargarDocumentos"
          class="mt-3 px-4 py-2 bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] text-sm"
        >
          Reintentar
        </button>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="documentos.length === 0" class="bg-white rounded-lg shadow-sm py-16 text-center">
        <div class="text-5xl mb-3">📭</div>
        <h3 class="text-lg font-medium text-gray-800 mb-1">
          No hay peticiones
        </h3>
        <p class="text-gray-500 text-sm">
          {{ tieneFiltros ? 'Prueba con otros filtros.' : 'Aún no hay peticiones registradas.' }}
        </p>
      </div>

      <!-- Tabla -->
      <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-[#611717] text-white">
              <tr>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Nº
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Código o Nombre
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Fecha de Ingreso
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Peticionario
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Asunto
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Destinatario
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Tipo de Destinatario
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Fecha de Remisión al Destinatario
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Fecha de Respuesta
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Fecha de Remisión al Peticionario
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Conminatoria
                </th>
                <th class="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Observación
                </th>
                <th class="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Archivo
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr
                v-for="doc in documentos"
                :key="doc._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Nº -->
                <td class="px-3 py-3 font-bold text-[#611717] whitespace-nowrap">
                  {{ doc.numero }}
                </td>

                <!-- Código -->
                <td class="px-3 py-3 font-mono text-xs text-gray-800 whitespace-nowrap">
                  {{ doc.codigo }}
                </td>

                <!-- Fecha Ingreso -->
                <td class="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {{ formatearFecha(doc.fechaIngreso) }}
                </td>

                <!-- Peticionario -->
                <td class="px-3 py-3 text-gray-700 min-w-[180px]">
                  {{ doc.peticionario || '—' }}
                </td>

                <!-- Asunto (truncado con tooltip) -->
                <td class="px-3 py-3 text-gray-700 min-w-[320px] max-w-md">
                  <div class="line-clamp-3 text-justify text-xs leading-relaxed" :title="doc.asunto">
                    {{ doc.asunto }}
                  </div>
                </td>

                <!-- Destinatario -->
                <td class="px-3 py-3 text-gray-700 min-w-[180px]">
                  {{ doc.destinatario || '—' }}
                </td>

                <!-- Tipo Destinatario -->
                <td class="px-3 py-3 whitespace-nowrap">
                  <span
                    v-if="doc.tipoDestinatario"
                    class="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {{ doc.tipoDestinatario }}
                  </span>
                  <span v-else class="text-gray-300">—</span>
                </td>

                <!-- Fecha Remisión Destinatario -->
                <td class="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {{ formatearFecha(doc.fechaRemisionDestinatario) }}
                </td>

                <!-- Fecha Respuesta -->
                <td class="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {{ formatearFecha(doc.fechaRespuesta) }}
                </td>

                <!-- Fecha Remisión Peticionario -->
                <td class="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {{ formatearFecha(doc.fechaRemisionPeticionario) }}
                </td>

                <!-- Conminatoria -->
                <td class="px-3 py-3 text-gray-700 min-w-[140px]">
                  {{ doc.conminatoria || '—' }}
                </td>

                <!-- Observación -->
                <td class="px-3 py-3 text-gray-700 min-w-[140px]">
                  <div class="line-clamp-2 text-xs" :title="doc.observacion">
                    {{ doc.observacion || '—' }}
                  </div>
                </td>

                <!-- Archivo -->
                <td class="px-3 py-3 text-center whitespace-nowrap">
                  <a
                    v-if="doc.archivo && doc.archivo.url"
                    :href="doc.archivo.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
                    title="Ver PDF"
                  >
                    📄 Ver PDF
                  </a>
                  <span v-else class="text-gray-300 text-xs">Sin archivo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div
          v-if="totalPages > 1"
          class="px-4 py-3 border-t border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50"
        >
          <button
            @click="prevPage"
            :disabled="page === 1"
            class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#611717] hover:text-white hover:border-[#611717] transition-colors"
          >
            ← Anterior
          </button>

          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">
              Página <strong class="text-[#611717]">{{ page }}</strong>
              de <strong class="text-[#611717]">{{ totalPages }}</strong>
            </span>
          </div>

          <button
            @click="nextPage"
            :disabled="page === totalPages"
            class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#611717] hover:text-white hover:border-[#611717] transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ============================================
// SEO
// ============================================
useHead({
  title: 'Peticiones de Informe Escrito | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Registro oficial de peticiones de informe escrito de la Cámara de Senadores de Bolivia.'
    }
  ]
})

// ============================================
// API
// ============================================
const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiUrl || 'https://demoback.senado.gob.bo/api'

// ============================================
// ESTADO
// ============================================
const documentos = ref([])
const loading = ref(false)
const error = ref(null)
const page = ref(1)
const totalPages = ref(1)
const total = ref(0)
const itemsPorPagina = 20

const filters = ref({
  search: '',
  gestion: ''
})

let searchTimeout = null

// ============================================
// COMPUTED
// ============================================
const tieneFiltros = computed(() => !!(filters.value.search || filters.value.gestion))

const aniosDisponibles = computed(() => {
  const actual = new Date().getFullYear()
  const anios = []
  for (let y = actual + 1; y >= 2020; y--) {
    anios.push(y)
  }
  return anios
})

// ============================================
// HELPERS
// ============================================
const formatearFecha = (fecha) => {
  if (!fecha) return '—'
  try {
    const d = new Date(fecha)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    })
  } catch {
    return '—'
  }
}

// ============================================
// CARGA DE DATOS
// ============================================
const cargarDocumentos = async () => {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()
    params.append('page', String(page.value))
    params.append('limit', String(itemsPorPagina))
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.gestion) params.append('gestion', String(filters.value.gestion))

    const url = `${API_BASE_URL}/legislativos/peticion-informe-escrito?${params.toString()}`
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al cargar las peticiones')
    }

    documentos.value = result.data?.documentos || []
    total.value = result.data?.total || 0
    totalPages.value = result.data?.pages || 1
  } catch (err) {
    console.error('Error cargando PIE:', err)
    error.value = err.message || 'Error al cargar las peticiones'
    documentos.value = []
    total.value = 0
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

// ============================================
// FILTROS Y PAGINACIÓN
// ============================================
const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    cargarDocumentos()
  }, 500)
}

const onFilterChange = () => {
  page.value = 1
  cargarDocumentos()
}

const resetFilters = () => {
  filters.value = { search: '', gestion: '' }
  page.value = 1
  cargarDocumentos()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    cargarDocumentos()
    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    cargarDocumentos()
    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarDocumentos()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>