<template>
  <div class="flex flex-col h-full">
    <!-- Toolbar -->
    <div class="flex items-center justify-between bg-gray-300 px-[3.6vw] sm:px-4 py-[2.4vw] sm:py-2 border-b border-gray-400">
      <span class="inline-block bg-gray-700 text-white text-[1.8vw] sm:text-xs font-medium px-3 py-1 rounded">
        Visor de PDF
      </span>

      <div v-if="totalPaginas > 0" class="flex items-center gap-2 text-[2.1vw] sm:text-xs text-gray-700">
        <button
          @click="irAnterior"
          :disabled="paginaActual <= 1"
          class="px-2 py-1 bg-white rounded border border-gray-400 disabled:opacity-40 hover:bg-gray-100"
        >
          ◀
        </button>
        <span>Página {{ paginaActual }} / {{ totalPaginas }}</span>
        <button
          @click="irSiguiente"
          :disabled="paginaActual >= totalPaginas"
          class="px-2 py-1 bg-white rounded border border-gray-400 disabled:opacity-40 hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </div>

    <!-- Área de render -->
    <div
      ref="scrollRef"
      class="flex-1 overflow-auto bg-gray-100 flex justify-center items-start p-3"
    >
      <!-- Cargando -->
      <div v-if="cargando" class="flex flex-col items-center justify-center py-16 text-gray-500">
        <div class="inline-block w-10 h-10 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-3 text-sm">Cargando PDF…</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-16 text-gray-500 text-center px-6">
        <Icon name="mdi:file-pdf-box" class="text-7xl opacity-40" />
        <p class="mt-3 text-sm">{{ error }}</p>
      </div>

      <!-- Canvas -->
      <canvas v-show="!cargando && !error" ref="canvasRef" class="shadow-md bg-white max-w-full"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  url: { type: String, required: true }
})

const canvasRef = ref(null)
const scrollRef = ref(null)
const cargando = ref(false)
const error = ref(null)
const totalPaginas = ref(0)
const paginaActual = ref(1)

let pdfDoc = null
let renderTask = null
let pdfjsLib = null

// ============================================
// CARGA DINÁMICA DE PDFJS (evita SSR)
// ============================================
const cargarPdfJs = async () => {
  if (pdfjsLib) return pdfjsLib

  // Import dinámico: solo en cliente
  const pdfjs = await import('pdfjs-dist/build/pdf')

  // Worker: en v2.6.347 debe apuntar a este archivo
  // Importamos el worker como URL para que Vite lo empaquete
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.js?url')).default
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

  pdfjsLib = pdfjs
  return pdfjsLib
}

// ============================================
// CARGAR DOCUMENTO
// ============================================
const cargarPdf = async () => {
  if (!props.url) return

  cargando.value = true
  error.value = null
  totalPaginas.value = 0
  paginaActual.value = 1

  try {
    const pdfjs = await cargarPdfJs()

    // Cargamos el PDF desde la URL
    const loadingTask = pdfjs.getDocument({
      url: props.url,
      // Necesario si el servidor no permite CORS en el rango de bytes:
      // desactiva el uso de range requests
      disableAutoFetch: true,
      disableStream: true
    })

    pdfDoc = await loadingTask.promise
    totalPaginas.value = pdfDoc.numPages

    await nextTick()
    await renderPagina(1)
  } catch (err) {
    console.error('🔴 Error cargando PDF:', err)
    error.value = 'No se pudo cargar el PDF. Verifica que la URL sea accesible y que CORS esté habilitado.'
  } finally {
    cargando.value = false
  }
}

// ============================================
// RENDER DE UNA PÁGINA
// ============================================
const renderPagina = async (num) => {
  if (!pdfDoc) return

  // Cancelar render previo si existe
  if (renderTask) {
    try { renderTask.cancel() } catch {}
    renderTask = null
  }

  const page = await pdfDoc.getPage(num)

  // Ajustar escala al ancho del contenedor
  const contenedor = scrollRef.value
  const anchoDisponible = contenedor ? contenedor.clientWidth - 24 : 800
  const viewportBase = page.getViewport({ scale: 1 })
  const escala = Math.min(2, Math.max(0.5, anchoDisponible / viewportBase.width))
  const viewport = page.getViewport({ scale: escala })

  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = viewport.width
  canvas.height = viewport.height

  renderTask = page.render({ canvasContext: ctx, viewport })
  try {
    await renderTask.promise
  } catch (err) {
    if (err?.name !== 'RenderingCancelledException') {
      console.warn('⚠️ Error renderizando página:', err)
    }
  }
}

// ============================================
// NAVEGACIÓN
// ============================================
const irAnterior = () => {
  if (paginaActual.value > 1) {
    paginaActual.value--
    renderPagina(paginaActual.value)
  }
}

const irSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) {
    paginaActual.value++
    renderPagina(paginaActual.value)
  }
}

// ============================================
// REACCIONAR A CAMBIO DE URL
// ============================================
watch(() => props.url, () => {
  cargarPdf()
}, { immediate: true })

// ============================================
// LIMPIEZA
// ============================================
onBeforeUnmount(() => {
  if (renderTask) {
    try { renderTask.cancel() } catch {}
  }
  if (pdfDoc) {
    try { pdfDoc.destroy() } catch {}
  }
})
</script>