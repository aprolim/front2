<template>
  <div class="min-h-screen bg-gray-50 py-[8vw] sm:py-8 flex justify-center">
    <div class="w-[90%] max-w-6xl">
      <!-- Botón volver -->
      <div class="mb-[4vw] sm:mb-6">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-gray-600 hover:text-senado-primary transition-colors text-[3.6vw] sm:text-[1vw]"
        >
          <svg class="w-[5vw] sm:w-5 h-[5vw] sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- ========================================== -->
      <!-- PLAN OPERATIVO ANUAL INDIVIDUAL - POAI    -->
      <!-- ========================================== -->
      <div class="management-container">
        <!-- Header -->
        <div class="management-header">
          <div class="header-left">
            <h2 class="management-title text-[5.4vw] sm:text-[1.4rem] font-bold text-senado-primary">
              Plan Operativo Anual Individual - POAI
              <span v-if="!loading && !error" class="badge text-[2.4vw] sm:text-[0.75rem]">{{ documentos.length }} documentos</span>
            </h2>
          </div>
          
          <div class="header-controls">
            <!-- Buscador -->
            <div class="search-box">
              <input 
                type="text" 
                v-model="terminoBusqueda"
                @input="filtrarDocumentos"
                placeholder="Buscar documentos..."
                class="search-input text-[3vw] sm:text-[0.85rem]"
              >
              <button class="search-button text-[3vw] sm:text-[0.85rem]" :disabled="loading">
                <span class="search-icon">🔍</span>
              </button>
              <button 
                v-if="terminoBusqueda" 
                @click="limpiarBusqueda" 
                class="clear-button text-[3.6vw] sm:text-[0.9rem]"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Estado de carga -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p class="text-[3.6vw] sm:text-[1vw]">Cargando documentos...</p>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="error-state">
          <span class="error-icon text-[6vw] sm:text-[2rem]">⚠️</span>
          <p class="text-[3.6vw] sm:text-[1vw]">{{ error }}</p>
          <button @click="cargarDocumentos" class="retry-button text-[3.6vw] sm:text-[0.9rem]">Reintentar</button>
        </div>

        <!-- Lista de documentos -->
        <div v-else class="table-responsive">
          <table class="management-table">
            <thead>
              <tr>
                <th @click="ordenarPor('nombre')" class="sortable text-[2.4vw] sm:text-[0.8rem]">
                  Nombre del archivo
                  <span class="sort-icon text-[2.4vw] sm:text-[0.75rem]">{{ getSortIcon('nombre') }}</span>
                </th>
                <th @click="ordenarPor('fecha')" class="sortable text-[2.4vw] sm:text-[0.8rem]">
                  Fecha de subida
                  <span class="sort-icon text-[2.4vw] sm:text-[0.75rem]">{{ getSortIcon('fecha') }}</span>
                </th>
                <th @click="ordenarPor('tamaño')" class="sortable text-[2.4vw] sm:text-[0.8rem]">
                  Tamaño
                  <span class="sort-icon text-[2.4vw] sm:text-[0.75rem]">{{ getSortIcon('tamaño') }}</span>
                </th>
                <th class="actions-column text-[2.4vw] sm:text-[0.8rem]">Documento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documentosFiltrados" :key="doc.id" class="management-row">
                <td class="title-cell">
                  <div class="titulo-principal text-[3vw] sm:text-[0.85rem]">{{ doc.nombre }}</div>
                  <div v-if="doc.descripcion" class="descripcion text-[2.4vw] sm:text-[0.7rem]">{{ doc.descripcion }}</div>
                  <div v-if="doc.gestion" class="gestion-info text-[2.4vw] sm:text-[0.7rem]">Gestión: {{ doc.gestion }}</div>
                </td>
                <td class="text-[3vw] sm:text-[0.85rem]">{{ formatearFecha(doc.fecha) }}</td>
                <td class="text-[3vw] sm:text-[0.85rem]">{{ formatearTamaño(doc.tamaño) }}</td>
                <td class="actions-cell">
                  <!-- 🔥 AHORA ABRE EL VISOR MODAL EN LUGAR DE UNA NUEVA PESTAÑA -->
                  <button 
                    @click="abrirVisor(doc)"
                    class="btn-documento text-[2.4vw] sm:text-[0.7rem]"
                    title="Ver PDF"
                  >
                    <span class="btn-icon text-[3.6vw] sm:text-[1rem]">📄</span>
                    <span class="btn-text">Ver PDF</span>
                  </button>
                </td>
              </tr>
              
              <!-- Fila vacía -->
              <tr v-if="documentosFiltrados.length === 0 && !loading">
                <td colspan="4" class="empty-state text-[3.6vw] sm:text-[0.95rem]">
                  <p>No hay documentos disponibles</p>
                  <p v-if="terminoBusqueda" class="text-[3vw] sm:text-sm text-gray-400 mt-1">
                    No se encontraron resultados para "{{ terminoBusqueda }}"
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Información de depuración (opcional) -->
        <div v-if="documentos.length > 0 && !loading" class="debug-info p-2 text-[2.4vw] sm:text-xs border-t border-gray-200 bg-gray-50">
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

                <!-- Botón de Descarga Directa -->
                <a 
                  :href="pdfUrlActual" 
                  download
                  target="_blank"
                  class="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors text-sm font-medium"
                >
                  <Icon name="mdi:download" class="w-4 h-4" />
                  Descargar <span class="hidden sm:inline">({{ formatearTamaño(pdfPeso) }})</span>
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

// 🔥 Estado para el VISOR MODAL
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
  if (!bytes) return '0 KB'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const filtrarDocumentos = () => {
  if (!terminoBusqueda.value.trim()) {
    documentosFiltrados.value = [...documentos.value]
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
    // 📌 DATOS DE EJEMPLO
    await new Promise(resolve => setTimeout(resolve, 800))
    documentos.value = [
      {
        id: 1,
        nombre: 'POAI 2026',
        descripcion: 'Plan Operativo Anual Individual 2026',
        gestion: '2026',
        fecha: '2026-08-25T10:00:00',
        tamaño: 204423168, // Simulando los 200 MB
        url: '/pdfs/Recursos-humanos/POAIs 2026 APROBADO.pdf'
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
// LÓGICA DEL VISOR DE PDF (CARGA BAJO DEMANDA)
// ============================================
const abrirVisor = async (doc) => {
  pdfTitulo.value = doc.nombre
  pdfUrlActual.value = doc.url
  pdfPeso.value = doc.tamaño || 0
  visorAbierto.value = true
  cargandoPDF.value = true
  paginaActualPDF.value = 1
  document.body.style.overflow = 'hidden'
  
  await nextTick()
  
  try {
    // 🔥 CONFIGURACIÓN CLAVE PARA NO DESCARGAR LOS 200MB DE GOLPE
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrlActual.value,
      disableAutoFetch: true,    // No descargar páginas que no se ven
      disableStream: false,      // Permitir streaming por rangos
      rangeChunkSize: 65536,     // Descargar en bloques de 64KB (ajustable)
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
    const escala = 800 / viewportBase.width // Forzar un ancho de 800px en el visor
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

<style scoped>
.management-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  width: 100%;
  background: transparent;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vw;
  flex-wrap: wrap;
  gap: 12px;
}

@media (min-width: 640px) {
  .management-header {
    margin-bottom: 16px;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.management-title {
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.badge {
  background: linear-gradient(135deg, #E03636, #b82c2c);
  color: white;
  padding: 2px 8px;
  border-radius: 16px;
  font-weight: 500;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  gap: 4px;
  background: white;
  padding: 3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.search-input {
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  width: 100%;
  max-width: 260px;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
  padding-right: 65px;
}

.search-input:focus {
  border-color: #E03636;
  box-shadow: 0 0 0 2px rgba(224, 54, 54, 0.2);
}

.search-button {
  background: #E03636;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  position: absolute;
  right: 3px;
  top: 3px;
}

.search-button:hover:not(:disabled) {
  background: #b82c2c;
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-button {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0 6px;
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
}

.clear-button:hover {
  color: #E03636;
}

.table-responsive {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: auto;
  margin-bottom: 16px;
}

.management-table {
  width: 100%;
  border-collapse: collapse;
}

.management-table th {
  background: #f8fafc;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #f1f5f9;
}

.sort-icon {
  margin-left: 4px;
  opacity: 0.6;
}

.management-row td {
  padding: 8px 12px;
  border-bottom: 1px solid #eef2f6;
  color: #334155;
  line-height: 1.3;
}

.management-row:hover td {
  background-color: #f8fafc;
}

.title-cell {
  min-width: 220px;
}

.titulo-principal {
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 2px;
}

.descripcion {
  color: #94a3b8;
}

.gestion-info {
  color: #E03636;
  margin-top: 2px;
}

.actions-cell {
  width: 100px;
  text-align: center;
}

.btn-documento {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E03636;
  color: white;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-documento:hover {
  background: #b82c2c;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(224, 54, 54, 0.3);
}

.loading-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #E03636;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.error-icon {
  display: block;
}

.retry-button {
  background: #E03636;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
}

.retry-button:hover {
  background: #b82c2c;
}

.empty-state {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
}

.debug-info {
  background-color: #f1f5f9;
  border-radius: 0 0 10px 10px;
  font-family: monospace;
  color: #334155;
}

@media (max-width: 768px) {
  .management-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    justify-content: center;
  }
  
  .header-controls {
    justify-content: center;
  }
  
  .search-input {
    max-width: 100%;
  }
  
  .btn-text {
    display: none;
  }
}

@media (min-width: 640px) {
  .btn-text {
    display: inline;
  }
}
</style>