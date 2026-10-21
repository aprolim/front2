<template>
  <div class="min-h-screen bg-gray-50 py-[8vw] sm:py-8 flex justify-center">
    <div class="w-[90%] max-w-6xl">
      
      <!-- Botón volver -->
      <div class="mb-[4vw] sm:mb-6">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-senado-primary transition-colors text-[3.6vw] sm:text-[1vw]"
        >
          <Icon name="mdi:arrow-left" class="w-[5vw] sm:w-5 h-[5vw] sm:h-5" />
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- ========================================== -->
      <!-- ESCALA SALARIAL                            -->
      <!-- ========================================== -->
      <div class="w-full font-sans">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[4vw] sm:mb-6 gap-[4vw] sm:gap-4 flex-wrap">
          <div class="flex items-center gap-[3vw] sm:gap-3 flex-wrap">
            <h2 class="text-[5.4vw] sm:text-2xl font-bold text-senado-primary flex items-center gap-2 m-0">
              Escala Salarial
              <span v-if="!loading && !error" class="bg-gradient-to-r from-[#E03636] to-[#b82c2c] text-white px-2 py-0.5 rounded-full text-[2.4vw] sm:text-xs font-medium">
                {{ documentos.length }} documentos
              </span>
            </h2>
          </div>
          
          <div class="flex gap-[3vw] sm:gap-4 items-center flex-wrap w-full sm:w-auto">
            <!-- Buscador -->
            <div class="relative flex bg-white p-1 rounded-lg shadow-sm w-full sm:w-auto">
              <input 
                type="text" 
                v-model="terminoBusqueda"
                @input="filtrarDocumentos"
                placeholder="Buscar documentos..."
                class="border border-gray-200 px-[3vw] sm:px-3 py-[1.5vw] sm:py-1.5 text-[3vw] sm:text-sm w-full sm:w-64 rounded-md outline-none transition-all focus:border-[#E03636] focus:ring-2 focus:ring-[#E03636]/20 pr-[15vw] sm:pr-16"
              >
              <button class="absolute right-1 top-1 bg-[#E03636] hover:bg-[#b82c2c] text-white px-[2vw] sm:px-3 py-[1.5vw] sm:py-1.5 rounded-md transition-colors disabled:opacity-50 text-[3vw] sm:text-sm" :disabled="loading">
                <Icon name="mdi:magnify" class="w-[4vw] sm:w-4 h-[4vw] sm:h-4" />
              </button>
              <button 
                v-if="terminoBusqueda" 
                @click="limpiarBusqueda" 
                class="absolute right-[12vw] sm:right-[50px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E03636] text-[3.6vw] sm:text-sm p-1"
                title="Limpiar búsqueda"
              >
                <Icon name="mdi:close" class="w-[4vw] sm:w-4 h-[4vw] sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Estado de carga -->
        <div v-if="loading" class="text-center py-20 bg-white rounded-xl shadow-sm">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-[#E03636] rounded-full mx-auto mb-4 animate-spin"></div>
          <p class="text-[3.6vw] sm:text-base text-gray-500">Cargando documentos...</p>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="text-center py-20 bg-white rounded-xl shadow-sm">
          <Icon name="mdi:alert-circle-outline" class="w-[15vw] sm:w-12 h-[15vw] sm:h-12 text-red-500 mx-auto mb-4" />
          <p class="text-[3.6vw] sm:text-base text-gray-700 mb-4">{{ error }}</p>
          <button @click="cargarDocumentos" class="bg-[#E03636] hover:bg-[#b82c2c] text-white px-6 py-2 rounded-lg text-[3.6vw] sm:text-sm font-medium transition-colors">
            Reintentar
          </button>
        </div>

        <!-- Tabla de documentos -->
        <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-4">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b-2 border-gray-200">
                  <th @click="ordenarPor('nombre')" class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[2.4vw] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Nombre del archivo
                    <span class="ml-1 opacity-60 text-[2.4vw] sm:text-xs">{{ getSortIcon('nombre') }}</span>
                  </th>
                  <th @click="ordenarPor('fecha')" class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[2.4vw] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Fecha de subida
                    <span class="ml-1 opacity-60 text-[2.4vw] sm:text-xs">{{ getSortIcon('fecha') }}</span>
                  </th>
                  <th @click="ordenarPor('tamaño')" class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[2.4vw] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Tamaño
                    <span class="ml-1 opacity-60 text-[2.4vw] sm:text-xs">{{ getSortIcon('tamaño') }}</span>
                  </th>
                  <!-- Columna de acciones ajustada -->
                  <th class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[2.4vw] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider text-center w-[120px] whitespace-nowrap">
                    Documento
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="doc in documentosFiltrados" :key="doc.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-[3vw] sm:px-4 py-[2vw] sm:py-3">
                    <div class="font-medium text-[3vw] sm:text-sm text-gray-900 mb-0.5">{{ doc.nombre }}</div>
                    <div v-if="doc.descripcion" class="text-[2.4vw] sm:text-xs text-gray-500">{{ doc.descripcion }}</div>
                    <div v-if="doc.gestion" class="text-[2.4vw] sm:text-xs text-[#E03636] mt-0.5 font-medium">Gestión: {{ doc.gestion }}</div>
                  </td>
                  <td class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[3vw] sm:text-sm text-gray-600 whitespace-nowrap">
                    {{ formatearFecha(doc.fecha) }}
                  </td>
                  <td class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-[3vw] sm:text-sm text-gray-600 whitespace-nowrap">
                    {{ formatearTamaño(doc.tamaño) }}
                  </td>
                  <td class="px-[3vw] sm:px-4 py-[2vw] sm:py-3 text-center">
                    <!-- Botón rediseñado -->
                    <button 
                      @click="abrirVisor(doc)"
                      class="inline-flex items-center justify-center gap-1.5 bg-[#E03636] hover:bg-[#b82c2c] text-white px-3 py-1.5 rounded-md font-medium transition-all hover:shadow-md text-[2.4vw] sm:text-xs whitespace-nowrap min-w-[80px]"
                      title="Ver PDF"
                    >
                      <Icon name="mdi:file-pdf-box" class="w-[3.6vw] sm:w-4 h-[3.6vw] sm:h-4" />
                      <span>Ver PDF</span>
                    </button>
                  </td>
                </tr>
                
                <!-- Fila vacía -->
                <tr v-if="documentosFiltrados.length === 0 && !loading">
                  <td colspan="4" class="text-center py-12 text-gray-500">
                    <Icon name="mdi:file-search-outline" class="w-[12vw] sm:w-10 h-[12vw] sm:h-10 mx-auto mb-2 opacity-50" />
                    <p class="text-[3.6vw] sm:text-base font-medium">No hay documentos disponibles</p>
                    <p v-if="terminoBusqueda" class="text-[3vw] sm:text-sm text-gray-400 mt-1">
                      No se encontraron resultados para "{{ terminoBusqueda }}"
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Info de depuración -->
        <div v-if="documentos.length > 0 && !loading" class="p-2 text-[2.4vw] sm:text-xs bg-gray-100 rounded-lg text-gray-600 font-mono border border-gray-200">
          <p>Total documentos: {{ documentos.length }} | Mostrando: {{ documentosFiltrados.length }}</p>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- MODAL VISOR DE PDF (CARGA PÁGINA POR PÁGINA) -->
    <!-- ============================================ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div 
          v-if="visorAbierto"
          class="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          @click.self="cerrarVisor"
        >
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
            
            <!-- Barra Superior del Visor -->
            <div class="flex-shrink-0 bg-[#611717] text-white p-3 flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-3">
                <button @click="cerrarVisor" class="hover:bg-white/20 rounded-lg p-2 transition-colors">
                  <Icon name="mdi:close" class="w-6 h-6" />
                </button>
                <div class="flex items-center gap-2">
                  <Icon name="mdi:file-pdf-box" class="w-5 h-5 text-senado-gold" />
                  <span class="font-bold text-lg truncate max-w-[200px] sm:max-w-md">
                    {{ pdfTitulo }}
                  </span>
                </div>
              </div>

              <!-- Controles del visor -->
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
                  <button 
                    @click="paginaAnteriorPDF"
                    :disabled="paginaActualPDF <= 1 || cargandoPDF"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors disabled:opacity-40"
                  >
                    <Icon name="mdi:chevron-left" class="w-5 h-5" />
                  </button>
                  <span class="text-xs font-mono px-2">
                    {{ paginaActualPDF }} / {{ totalPaginasPDF || '?' }}
                  </span>
                  <button 
                    @click="paginaSiguientePDF"
                    :disabled="paginaActualPDF >= totalPaginasPDF || cargandoPDF"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors disabled:opacity-40"
                  >
                    <Icon name="mdi:chevron-right" class="w-5 h-5" />
                  </button>
                </div>

                <a 
                  :href="pdfUrlActual" 
                  download
                  target="_blank"
                  class="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors text-sm font-medium"
                >
                  <Icon name="mdi:download" class="w-4 h-4" />
                  Descargar <span class="hidden sm:inline">({{ pdfPeso ? formatearTamaño(pdfPeso) : '...' }})</span>
                </a>
              </div>
            </div>

            <!-- Área de Lectura (Canvas) -->
            <div class="flex-1 overflow-auto bg-gray-200 p-4 relative flex justify-center items-start">
              
              <div v-if="cargandoPDF" class="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                <div class="w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
                <p class="mt-4 text-gray-700 font-medium">Cargando página...</p>
              </div>

              <canvas 
                ref="pdfCanvas"
                class="w-full max-w-[800px] shadow-2xl rounded bg-white"
              ></canvas>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Configurar el Worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// ============================================
// ESTADO
// ============================================
const documentos = ref([])
const documentosFiltrados = ref([])
const loading = ref(false)
const error = ref(null)
const terminoBusqueda = ref('')
const orden = ref({
  columna: 'fecha',
  direccion: 'desc'
})

// Estado para el VISOR MODAL
const visorAbierto = ref(false)
const pdfTitulo = ref('')
const pdfUrlActual = ref('')
const pdfPeso = ref(0)
const pdfDocumento = ref(null)
const pdfCanvas = ref(null)
const paginaActualPDF = ref(1)
const totalPaginasPDF = ref(0)
const cargandoPDF = ref(false)

// ============================================
// FUNCIONES
// ============================================
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatearTamaño = (bytes) => {
  if (!bytes || bytes === 0) return '...'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const filtrarDocumentos = () => {
  if (!terminoBusqueda.value.trim()) {
    documentosFiltrados.value = [...documentos.value]
    aplicarOrdenamiento()
    return
  }
  
  const termino = terminoBusqueda.value.toLowerCase().trim()
  documentosFiltrados.value = documentos.value.filter(doc => 
    (doc.nombre && doc.nombre.toLowerCase().includes(termino)) ||
    (doc.descripcion && doc.descripcion.toLowerCase().includes(termino)) ||
    (doc.gestion && doc.gestion.toLowerCase().includes(termino))
  )
  
  aplicarOrdenamiento()
}

const limpiarBusqueda = () => {
  terminoBusqueda.value = ''
  documentosFiltrados.value = [...documentos.value]
  aplicarOrdenamiento()
}

const aplicarOrdenamiento = () => {
  const columna = orden.value.columna
  const direccion = orden.value.direccion
  
  documentosFiltrados.value.sort((a, b) => {
    let valorA, valorB
    
    if (columna === 'nombre') {
      valorA = a.nombre || ''
      valorB = b.nombre || ''
    } else if (columna === 'fecha') {
      valorA = a.fecha ? new Date(a.fecha) : new Date(0)
      valorB = b.fecha ? new Date(b.fecha) : new Date(0)
    } else if (columna === 'tamaño') {
      valorA = a.tamaño || 0
      valorB = b.tamaño || 0
    }
    
    if (valorA < valorB) return direccion === 'asc' ? -1 : 1
    if (valorA > valorB) return direccion === 'asc' ? 1 : -1
    return 0
  })
}

const ordenarPor = (columna) => {
  if (orden.value.columna === columna) {
    orden.value.direccion = orden.value.direccion === 'asc' ? 'desc' : 'asc'
  } else {
    orden.value.columna = columna
    orden.value.direccion = 'desc'
  }
  aplicarOrdenamiento()
}

const getSortIcon = (columna) => {
  if (orden.value.columna !== columna) return '↕️'
  return orden.value.direccion === 'asc' ? '↑' : '↓'
}

// ============================================
// CARGAR DATOS DESDE API
// ============================================
const cargarDocumentos = async () => {
  loading.value = true
  error.value = null
  
  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    documentos.value = [
      {
        id: 1,
        nombre: 'Escala Salarial 2024',
        descripcion: 'Escala salarial vigente para la gestión 2026, RM N° 280_29.05.24',
        gestion: '2024',
        fecha: '2026-08-25T10:30:00',
        tamaño: 2027520,
        url: '/pdfs/Recursos-humanos/EscalaCamSenadores.pdf'
      }
    ]
    
    documentosFiltrados.value = [...documentos.value]
    aplicarOrdenamiento()
    
  } catch (err) {
    error.value = 'Error al cargar los documentos: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

// ============================================
// LÓGICA DEL VISOR DE PDF
// ============================================
const abrirVisor = async (doc) => {
  pdfTitulo.value = doc.nombre
  pdfUrlActual.value = doc.url
  pdfPeso.value = 0
  visorAbierto.value = true
  cargandoPDF.value = true
  paginaActualPDF.value = 1
  document.body.style.overflow = 'hidden'
  
  await nextTick()
  
  try {
    try {
      const response = await fetch(pdfUrlActual.value, { method: 'HEAD' })
      const size = response.headers.get('content-length')
      if (size) pdfPeso.value = parseInt(size)
    } catch (e) {
      console.warn('No se pudo obtener el peso del archivo', e)
    }

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrlActual.value,
      disableAutoFetch: true,
      disableStream: false,
      rangeChunkSize: 65536,
    })
    
    pdfDocumento.value = await loadingTask.promise
    totalPaginasPDF.value = pdfDocumento.value.numPages
    await renderizarPaginaPDF(1)
  } catch (error) {
    console.error('Error al cargar PDF:', error)
    alert('Error al cargar el PDF.')
    cerrarVisor()
  } finally {
    cargandoPDF.value = false
  }
}

const renderizarPaginaPDF = async (numero) => {
  if (!pdfDocumento.value || !pdfCanvas.value) return
  cargandoPDF.value = true
  
  try {
    const page = await pdfDocumento.value.getPage(numero)
    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')
    
    const viewportBase = page.getViewport({ scale: 1 })
    const escala = 800 / viewportBase.width 
    const viewport = page.getViewport({ scale: escala })
    
    const dpr = window.devicePixelRatio || 1
    canvas.width = viewport.width * dpr
    canvas.height = viewport.height * dpr
    canvas.style.width = '100%' 
    canvas.style.height = 'auto'
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      transform: [dpr, 0, 0, dpr, 0, 0]
    }
    
    await page.render(renderContext).promise
    paginaActualPDF.value = numero
  } catch (error) {
    console.error('Error al renderizar página:', error)
  } finally {
    cargandoPDF.value = false
  }
}

const paginaAnteriorPDF = () => {
  if (paginaActualPDF.value > 1) renderizarPaginaPDF(paginaActualPDF.value - 1)
}

const paginaSiguientePDF = () => {
  if (paginaActualPDF.value < totalPaginasPDF.value) renderizarPaginaPDF(paginaActualPDF.value + 1)
}

const cerrarVisor = () => {
  visorAbierto.value = false
  document.body.style.overflow = 'auto'
  pdfDocumento.value = null
  pdfUrlActual.value = ''
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarDocumentos()
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>