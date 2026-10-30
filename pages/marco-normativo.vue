<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[90%] max-w-7xl">
      
      <!-- Título -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-senado-primary text-center">
          Marco <span class="text-[#8f1522]">Normativo</span>
        </h1>
        <div class="w-24 h-1 bg-[#611717] mx-auto mt-4"></div>
        <p class="text-center text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Consulta la normativa vigente del Senado de Bolivia
        </p>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando documentos...</p>
      </div>

      <!-- Error general -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="cargarDocumentos" class="bg-[#611717] text-white px-4 py-2 rounded-lg hover:bg-[#3a060d] transition">
          Reintentar
        </button>
      </div>

      <!-- Mostrar documentos -->
      <template v-else>
        
        <!-- ============================================ -->
        <!-- 1. CONSTITUCIÓN Y NORMAS GENERALES (TARJETAS)-->
        <!-- ============================================ -->
        <div v-if="documentosDestacados.length > 0" class="mb-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              v-for="doc in documentosDestacados" 
              :key="doc.id"
              class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              @click="abrirVisor(doc)"
            >
              
              <!-- VISOR DE LA PRIMERA HOJA DEL PDF O IMAGEN ESTÁTICA -->
              <div class="p-4 bg-gray-50">
                <div class="relative w-full aspect-[3/4] bg-white shadow-sm border border-gray-300 overflow-hidden flex items-center justify-center">
                  
                  <!-- Si es el primer documento (Constitución), renderizamos el PDF -->
                  <template v-if="doc.id === 1">
                    <!-- Spinner de carga del PDF -->
                    <div v-if="!portadasCargadas[doc.id]" class="flex flex-col items-center text-gray-400 absolute inset-0 justify-center bg-white z-10">
                      <div class="w-6 h-6 border-2 border-gray-300 border-t-[#611717] rounded-full animate-spin mb-2"></div>
                      <span class="text-[10px]">Cargando portada...</span>
                    </div>

                    <!-- El Canvas donde se dibuja el PDF -->
                    <canvas 
                      :ref="el => setCanvasRef(el, doc.id)"
                      class="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02] relative z-0"
                      :class="{ 'opacity-0': !portadasCargadas[doc.id] }"
                    ></canvas>

                    <!-- Bloque blanco que tapa el logo superior izquierdo (Ajustado al 35% de ancho y 18% de alto) -->
                    <div class="absolute top-0 left-0 w-[35%] h-[18%] bg-white z-20 pointer-events-none"></div>
                  </template>

                  <!-- Para los demás documentos, mostramos la imagen estática CON EL TEXTO SUPERPUESTO -->
                  <div v-else class="relative w-full h-full group-hover:scale-[1.02] transition-transform duration-500">
                    <!-- Imagen de fondo -->
                    <img 
                      src="/images/t-negra.png" 
                      alt="Portada genérica"
                      class="w-full h-full object-cover object-center absolute inset-0"
                    />
                    
                    <!-- Texto superpuesto con estilo dorado brillante (Más abajo y 10% más pequeño) -->
                    <div class="absolute inset-0 flex flex-col items-center justify-end pb-6 p-5 bg-black/40">
                      <h3 class="text-center text-xs md:text-sm font-bold uppercase tracking-wide text-[#f7e6a1] drop-shadow-[0_0_6px_rgba(247,230,161,0.8)] leading-snug">
                        {{ doc.nombre }}
                      </h3>
                      <p class="text-center text-[9px] md:text-[10px] mt-1 text-[#e3d194] font-medium drop-shadow-md">
                        Gestión {{ doc.gestion }}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- 2. RESTO DE CATEGORÍAS (PESTAÑAS MINIMIZADAS)-->
        <!-- ============================================ -->
        <div class="space-y-4 max-w-5xl mx-auto">
          <div 
            v-for="categoria in categoriasAcordeon" 
            :key="categoria.nombre"
            class="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
          >
            <button 
              @click="toggleCategoria(categoria.nombre)"
              class="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-senado-gold-lightest flex items-center justify-center text-senado-primary">
                  <Icon name="mdi:folder" class="w-4 h-4" />
                </div>
                <h2 class="text-lg font-bold text-gray-800">{{ categoria.nombre }}</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ categoria.documentos.length }}
                </span>
              </div>
              <div class="text-gray-400 transform transition-transform duration-300" :class="{ 'rotate-180': abiertos.includes(categoria.nombre) }">
                <Icon name="mdi:chevron-down" class="w-6 h-6" />
              </div>
            </button>

            <div v-show="abiertos.includes(categoria.nombre)" class="border-t border-gray-200 overflow-x-auto">
              <table class="w-full">
                <thead class="bg-[#611717] text-white">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold w-2/3">Descripción</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold w-1/6">Gestión</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold w-1/6">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="doc in categoria.documentos" :key="doc.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ doc.nombre }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ doc.gestion }}
                    </td>
                    <td class="px-6 py-4 text-sm text-center">
                      <div class="flex items-center justify-center gap-3">
                        <button 
                          @click="abrirVisor(doc)"
                          class="inline-flex items-center gap-1 text-[#611717] hover:text-[#8f1522] font-medium hover:underline"
                        >
                          <Icon name="mdi:eye" class="w-4 h-4" />
                          Leer
                        </button>
                        <a 
                          :href="doc.url" 
                          download
                          target="_blank"
                          class="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 font-medium hover:underline"
                        >
                          <Icon name="mdi:download" class="w-4 h-4" />
                          Descargar
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium">
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver al inicio
        </NuxtLink>
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

              <!-- Mensaje de error dentro del modal si falla el PDF -->
              <div v-if="errorVisor" class="flex flex-col items-center justify-center text-center py-20 px-4">
                <Icon name="mdi:alert-circle" class="w-16 h-16 text-red-500 mb-4" />
                <h3 class="text-xl font-bold text-gray-800 mb-2">No se pudo abrir el documento</h3>
                <p class="text-gray-600 mb-6">{{ errorVisor }}</p>
                <a :href="pdfUrlActual" target="_blank" class="px-4 py-2 bg-[#611717] text-white rounded hover:bg-[#3a060d]">
                  Abrir PDF en nueva pestaña
                </a>
              </div>

              <canvas 
                v-show="!errorVisor"
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
const loading = ref(false)
const error = ref(null)
const documentos = ref([])
const abiertos = ref([])

// Estado para saber qué canvas ya se renderizaron
const portadasCargadas = ref({})
const canvases = ref({})

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
const errorVisor = ref(null) 

const setCanvasRef = (el, id) => {
  if (el) {
    canvases.value[id] = el
  }
}

// ============================================
// DATOS
// ============================================
const documentosData = [
  // 1 y 2. DESTACADOS (Tarjetas)
  { id: 1, categoria: 'Constitución Política del Estado', nombre: 'Constitución Política Del Estado Plurinacional de Bolivia', gestion: '2009', url: '/pdfs/Constitución Política del Estado/Constitución Politica Del Estado Plurinacional de Bolivia.pdf' },
  { id: 2, categoria: 'Norma General de Área Legislativa', nombre: 'Reglamento General de la Cámara de Senadores', gestion: '2024', url: '/pdfs/Norma General de Área Legislativa/Reglamento General de la Cámara de Senadores.pdf' },
  { id: 3, categoria: 'Norma General de Área Legislativa', nombre: 'Reglamento de Participación Ciudadana y Deliberación Pública', gestion: '2012', url: '/pdfs/Norma General de Área Legislativa/Reglamento de Participación Ciudadana y Deliberación Pública.pdf' },
  { id: 4, categoria: 'Norma General de Área Legislativa', nombre: 'Reglamento Específico de Homenajes Camarales', gestion: '2024', url: '/pdfs/Norma General de Área Legislativa/Reglamento Específico de Homenajes Camarales.pdf' },
  { id: 5, categoria: 'Norma General de Área Legislativa', nombre: 'Reglamento de Condecoraciones', gestion: '2022', url: '/pdfs/Norma General de Área Legislativa/Reglamento de Condecoraciones.pdf' },
  { id: 6, categoria: 'Norma General de Área Legislativa', nombre: 'Reglamento de Ética', gestion: '2014', url: '/pdfs/Norma General de Área Legislativa/Reglamento de Ética.pdf' },

  // DOCUMENTOS QUE VAN AL ACORDEÓN UNIFICADO (Ordenados según tu solicitud)
  // 1ro y 2do
  { id: 7, categoria: 'Normas del Área Administrativa', nombre: 'Manual de Organización y Funciones', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Manual de Organización y Funciones.pdf' },
  { id: 8, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Interno de Personal', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Interno de Personal.pdf' },
  
  // 3ro: Código de Ética
  { id: 9, categoria: 'Normativa Interna', nombre: 'Código de Ética', gestion: '2020', url: '/pdfs/Normativa Interna/Código de Ética.pdf' },

  // 4to en adelante: Resto de normativas
  { id: 10, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema Contabilidad Integrada', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema Contabilidad Integrada.pdf' },
  { id: 11, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema de Administración de Personal', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Personal.pdf' },
  { id: 12, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema de Organización Administrativa', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Organización Administrativa.pdf' },
  { id: 13, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema de Programación de Operaciones', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Programación de Operaciones.pdf' },
  { id: 14, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico Sistema de Tesorería', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico Sistema de Tesorería.pdf' },
  { id: 15, categoria: 'Normativa Interna', nombre: 'Manual de Procesos y Procedimientos del Sistema de Presupuestos', gestion: '2020', url: '/pdfs/Normativa Interna/Manual de Procesos y Procedimientos del Sistema de Presupuestos.pdf' },
  { id: 16, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento para el cumplimiento de Declaración Jurada de Bienes y Servicios.pdf' },
  
  // LOS ÚLTIMOS 4 DOCUMENTOS (Bienes y Servicios, Presupuesto, Activos Fijos, Almacenes)
  { id: 17, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema de Administración de Bienes y Servicios', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Administración de Bienes y Servicios.pdf' },
  { id: 18, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Específico del Sistema de Presupuestos', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Reglamento Específico del Sistema de Presupuestos.pdf' },
  { id: 19, categoria: 'Normas del Área Administrativa', nombre: 'Reglamento Interno Unidad de Transparencia y Lucha Contra la Corrupción', gestion: '2025', url: '/pdfs/trasparencia/Reglamento Interno UTLCC.pdf' },
  { id: 20, categoria: 'Normas del Área Administrativa', nombre: 'Manual de Administración de Activos Fijos', gestion: '2020', url: '/pdfs/Norma General de Área Administrativa/Manual de Administración de Activos Fijos.pdf' },
  { id: 21, categoria: 'Normativa Interna', nombre: 'Manual de Administración de Almacenes', gestion: '2020', url: '/pdfs/Normativa Interna/Manual de Administración de Almacenes.pdf' }
]

// ============================================
// COMPUTED
// ============================================
const documentosDestacados = computed(() => {
  return documentos.value.filter(d => 
    d.categoria === 'Constitución Política del Estado' || 
    d.categoria === 'Norma General de Área Legislativa'
  )
})

// Unificamos todas las categorías en un solo acordeón respetando el orden del array
const categoriasAcordeon = computed(() => {
  const documentosUnificados = documentos.value.filter(d => 
    d.categoria === 'Normas del Área Administrativa' || 
    d.categoria === 'Normativa Interna'
  )
  
  return [
    {
      nombre: 'Normativa Administrativa',
      documentos: documentosUnificados
    }
  ]
})

// ============================================
// MÉTODOS
// ============================================

const formatearTamaño = (bytes) => {
  if (!bytes || bytes === 0) return '...'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

const renderizarPortadas = async () => {
  await nextTick()
  for (const doc of documentosDestacados.value) {
    if (doc.id !== 1) continue; 
    
    const canvas = canvases.value[doc.id]
    if (!canvas) continue
    try {
      const loadingTask = pdfjsLib.getDocument(encodeURI(doc.url))
      const pdf = await loadingTask.promise
      const page = await pdf.getPage(1)
      const context = canvas.getContext('2d')
      const viewportBase = page.getViewport({ scale: 1 })
      const escala = 300 / viewportBase.width 
      const viewport = page.getViewport({ scale: escala })
      const dpr = window.devicePixelRatio || 1
      canvas.width = viewport.width * dpr
      canvas.height = viewport.height * dpr
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        transform: [dpr, 0, 0, dpr, 0, 0]
      }
      await page.render(renderContext).promise
      portadasCargadas.value[doc.id] = true
    } catch (err) {
      console.error(`Error cargando portada del PDF ${doc.id}:`, err)
      portadasCargadas.value[doc.id] = true
    }
  }
}

const toggleCategoria = (nombre) => {
  const index = abiertos.value.indexOf(nombre)
  if (index === -1) {
    abiertos.value.push(nombre)
  } else {
    abiertos.value.splice(index, 1)
  }
}

const cargarDocumentos = () => {
  loading.value = true
  try {
    documentos.value = documentosData
    setTimeout(() => {
      renderizarPortadas()
    }, 100)
  } catch (err) {
    error.value = 'Error al cargar'
  } finally {
    loading.value = false
  }
}

const abrirVisor = async (doc) => {
  pdfTitulo.value = doc.nombre
  pdfUrlActual.value = encodeURI(doc.url)
  pdfPeso.value = 0 
  errorVisor.value = null
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
  } catch (err) {
    console.error('Error al cargar PDF:', err)
    errorVisor.value = 'El archivo no pudo ser leído. Verifica que exista en la carpeta public o intenta abrirlo en una pestaña nueva.'
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
  errorVisor.value = null
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
canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: top center;
}
</style>