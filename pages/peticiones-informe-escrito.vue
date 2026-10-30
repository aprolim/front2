<!-- peticiones-informe-escrito -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-[95%] max-w-7xl mx-auto">

      <!-- Botón volver -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-[#611717] hover:text-[#3a060d] transition-colors text-sm font-medium"
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
      </div>

      <!-- BUSCADOR -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-6">
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-[#611717]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="filters.search"
              @input="onSearchInput"
              type="text"
              placeholder="Buscar por código, asunto, peticionante..."
              class="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#611717] focus:border-transparent focus:bg-white transition-all duration-200"
            />
            <button
              v-if="filters.search"
              @click="limpiarBusqueda"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#611717] transition-colors"
              title="Limpiar búsqueda"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Contador de resultados -->
      <div v-if="!loading && !error" class="mb-4 text-sm text-gray-500">
        Mostrando <strong class="text-[#611717]">{{ documentos.length }}</strong>
        de <strong class="text-[#611717]">{{ total }}</strong>
        peticione{{ total !== 1 ? 's' : '' }}
        <span v-if="filters.search"> para "<strong>{{ filters.search }}</strong>"</span>
        <span class="ml-2 text-xs text-gray-400">· Orden: {{ ordenDescendente ? 'más reciente primero' : 'más antiguo primero' }}</span>
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
        <h3 class="text-lg font-medium text-gray-800 mb-1">No hay peticiones</h3>
        <p class="text-gray-500 text-sm">
          {{ filters.search ? 'Prueba con otros términos de búsqueda.' : 'Aún no hay peticiones registradas.' }}
        </p>
      </div>

      <!-- Tabla -->
      <div v-else class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-[#611717] text-white">
              <tr>
                <!-- BOTÓN Nº PARA INVERTIR EL ORDEN -->
                <th
                  @click="toggleOrden"
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer select-none hover:bg-[#7a1f1f] transition-colors group w-16"
                  title="Click para invertir el orden"
                >
                  <span class="inline-flex items-center gap-1">
                    Nº
                    <span class="text-[10px] opacity-80 group-hover:opacity-100">
                      {{ ordenDescendente ? '▼' : '▲' }}
                    </span>
                  </span>
                </th>
                <th class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Código</th>
                <th class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Fecha
                </th>
                <th class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Descripción
                </th>
                <th class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Senador(es) Peticionante(s)
                </th>
                <th class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Destinatario
                </th>
                <th class="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  Adjuntos
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(doc, index) in documentos"
                :key="doc._id"
                class="hover:bg-[#fbf8f1] transition-colors"
              >
                <!-- Nº secuencial GLOBAL -->
                <td class="px-4 py-4 whitespace-nowrap align-top">
                  <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fbf8f1] text-[#611717] font-bold text-xs border border-[#e3d194]">
                    {{ numeroSecuencial(index) }}
                  </span>
                </td>

                <!-- Código (con el mismo estilo de pastilla) -->
                <td class="px-4 py-4 whitespace-nowrap align-top">
                  <span class="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-full bg-[#fbf8f1] text-[#611717] font-bold text-xs border border-[#e3d194] uppercase">
                    {{ doc.numero ?? '—' }}
                  </span>
                </td>

                <!-- Fecha de Petición -->
                <td class="px-4 py-4 text-gray-700 whitespace-nowrap text-xs align-top uppercase">
                  {{ formatearFecha(doc.fechaIngreso) }}
                </td>

                <!-- Descripción -->
                <td class="px-4 py-4 text-gray-700 min-w-[320px] max-w-md align-top uppercase">
                  <div class="line-clamp-3 text-justify text-xs leading-relaxed uppercase" :title="doc.asunto">
                    {{ doc.asunto }}
                  </div>
                </td>

                <!-- Peticionante -->
                <td class="px-4 py-4 text-gray-700 min-w-[180px] text-xs align-top uppercase">
                  <div v-if="Array.isArray(doc.peticionario) && doc.peticionario.length > 0">
                    <div v-for="(senador, i) in procesarPeticionarios(doc.peticionario)" :key="i" class="mb-1 last:mb-0">
                      {{ senador }}
                    </div>
                  </div>
                  <div v-else-if="typeof doc.peticionario === 'string'">
                     <div v-for="(senador, i) in procesarPeticionarios([doc.peticionario])" :key="i" class="mb-1 last:mb-0">
                      {{ senador }}
                    </div>
                  </div>
                  <div v-else>—</div>
                </td>

                <!-- Destinatario -->
                <td class="px-4 py-4 text-gray-700 min-w-[180px] text-xs align-top uppercase">
                  {{ doc.destinatario || '—' }}
                </td>

                <!-- Adjuntos y Estado -->
                <td class="px-4 py-4 text-center whitespace-nowrap align-top">
                  <div class="flex flex-col items-center gap-2">
                    <a
                      v-if="doc.archivo && doc.archivo.url"
                      :href="doc.archivo.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#611717] text-[#611717] hover:bg-[#611717] hover:text-white rounded-lg text-xs font-semibold transition-all duration-200 uppercase"
                      title="Ver PDF"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Ver PDF
                    </a>
                    <span v-else class="text-gray-300 text-xs uppercase">Sin archivo</span>

                    <span
                      v-if="doc.fechaRespuesta"
                      class="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded border border-green-200 uppercase"
                      title="Con Respuesta"
                    >
                      Con Respuesta
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-200 uppercase"
                      title="Sin Respuesta"
                    >
                      Sin Respuesta
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div
          v-if="totalPages > 1"
          class="px-6 py-5 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4 bg-[#fbf8f1]"
        >
          <div class="text-xs text-gray-600">
            Mostrando registros del <strong class="text-[#611717]">{{ (page - 1) * itemsPorPagina + 1 }}</strong> al
            <strong class="text-[#611717]">{{ Math.min(page * itemsPorPagina, total) }}</strong> de un total de
            <strong class="text-[#611717]">{{ total }}</strong> registros
          </div>
          <div class="flex items-center gap-1">
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="p-2 rounded-md text-[#611717] hover:bg-[#e3d194] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-for="p in paginasVisibles"
              :key="p"
              @click="irAPagina(p)"
              class="w-9 h-9 rounded-full text-xs font-semibold transition-colors"
              :class="page === p ? 'bg-[#611717] text-white shadow-md' : 'hover:bg-[#e3d194] text-[#611717]'"
            >
              {{ p }}
            </button>
            <span v-if="totalPages > 5 && page < totalPages - 2" class="px-1 text-[#611717]">...</span>
            <button
              @click="nextPage"
              :disabled="page === totalPages"
              class="p-2 rounded-md text-[#611717] hover:bg-[#e3d194] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

useHead({
  title: 'Peticiones de Informe Escrito | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Registro oficial de peticiones de informe escrito de la Cámara de Senadores de Bolivia.'
    }
  ]
})

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
const total = ref(0) // 👈 Aquí se guardará el 1898 real del backend
const itemsPorPagina = 10
const filters = ref({ search: '' })
let searchTimeout = null

const ordenDescendente = ref(true)

// ============================================
// COMPUTED
// ============================================
const paginasVisibles = computed(() => {
  const paginas = []
  const rango = 2
  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= page.value - rango && i <= page.value + rango)) {
      paginas.push(i)
    }
  }
  return paginas
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

// 🔥 Numeración GLOBAL (Igual a Proyectos Aprobados)
const numeroSecuencial = (index) => {
  if (ordenDescendente.value) {
    return total.value - ((page.value - 1) * itemsPorPagina) - index
  }
  return (page.value - 1) * itemsPorPagina + index + 1
}

const procesarPeticionarios = (peticionarioData) => {
  if (!peticionarioData) return []
  const lista = Array.isArray(peticionarioData)
    ? peticionarioData.map((s) => String(s))
    : [String(peticionarioData)]

  let textoUnido = lista.join(' ')
  textoUnido = textoUnido.replace(/[\[\]"]/g, ' ').trim()

  return textoUnido
    .split(/(?=Sen\.)/i)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
}

// ============================================
// CARGA DE DATOS (CON PAGINACIÓN DEL BACKEND)
// ============================================
const cargarDocumentos = async () => {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()
    params.append('page', String(page.value))
    params.append('limit', String(itemsPorPagina))
    if (filters.value.search) params.append('search', filters.value.search)
    params.append('order', ordenDescendente.value ? 'desc' : 'asc')

    const url = `${API_BASE_URL}/legislativos/peticion-informe-escrito?${params.toString()}`
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al cargar las peticiones')
    }

    documentos.value = result.data?.documentos || []
    total.value = result.data?.total || 0 // 👈 Esto hace que diga "1898"
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

// 🔥 Botón Nº
const toggleOrden = () => {
  if (loading.value) return
  ordenDescendente.value = !ordenDescendente.value
  page.value = 1
  cargarDocumentos()
  if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
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

const limpiarBusqueda = () => {
  filters.value.search = ''
  page.value = 1
  cargarDocumentos()
}

const irAPagina = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p
    cargarDocumentos()
    if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (page.value > 1) irAPagina(page.value - 1)
}

const nextPage = () => {
  if (page.value < totalPages.value) irAPagina(page.value + 1)
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarDocumentos()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>