<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero centrado -->
    <section class="relative bg-gradient-to-br from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] pt-[7vw] sm:pt-12 pb-[10vw] sm:pb-16 text-center">
        <div class="inline-flex items-center bg-white/10 rounded-full gap-2 px-3 py-1 mb-4">
          <Icon name="mdi:landmark" class="text-senado-gold text-lg" />
          <span class="text-white/80 tracking-wider font-medium text-xs uppercase">Módulo Legislativo</span>
        </div>

        <h1 class="font-bold leading-tight text-[7.5vw] sm:text-4xl md:text-5xl">
          Facultades <span class="text-senado-gold">Legislativas</span>
        </h1>

        <p class="text-white/70 mt-3 max-w-2xl mx-auto text-[2.7vw] sm:text-base">
          Encuentra leyes, proyectos, peticiones de informe y declaraciones camarales en un solo lugar.
        </p>

        <!-- Buscador grande -->
        <div class="mt-[6vw] sm:mt-8 max-w-3xl mx-auto">
          <div class="flex bg-white rounded-xl shadow-lg overflow-hidden border border-white/20">
            <div class="flex items-center pl-[3vw] sm:pl-4 text-gray-400">
              <Icon name="mdi:magnify" class="text-[5vw] sm:text-xl" />
            </div>
            <input
              v-model="terminoBusqueda"
              type="text"
              placeholder="Ej: Ley de Medio Ambiente, Proyecto 123, PIE Ministerio..."
              class="flex-1 px-[3vw] sm:px-4 py-[3.5vw] sm:py-4 text-[2.7vw] sm:text-base text-gray-700 outline-none bg-transparent"
              @keyup.enter="ejecutarBusqueda"
            />
            <button
              @click="ejecutarBusqueda"
              :disabled="buscando"
              class="bg-senado-primary hover:bg-senado-primary-dark disabled:opacity-60 text-white font-semibold px-[5vw] sm:px-8 text-[2.7vw] sm:text-base transition-colors"
            >
              <span v-if="!buscando">Buscar</span>
              <span v-else>...</span>
            </button>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">
      <!-- Banner servidor caído -->
      <div v-if="servidorCaido" class="mb-[4vw] sm:mb-6 bg-red-50 border border-red-200 rounded-xl px-[3.6vw] sm:px-5 py-[3vw] sm:py-4 flex items-start gap-3">
        <Icon name="mdi:alert-circle" class="text-red-600 text-[5vw] sm:text-xl flex-shrink-0 mt-0.5" />
        <div class="text-[2.1vw] sm:text-sm text-red-800">
          <p class="font-semibold mb-1">Servidor no disponible</p>
          <p>El servicio legislativo no responde. Mostrando datos si existen.</p>
        </div>
      </div>

      <!-- Cargando vitrinas -->
      <div v-if="loading" class="flex justify-center items-center py-[12vw] sm:py-20">
        <div class="inline-block w-[8vw] sm:w-12 h-[8vw] sm:h-12 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-4 text-gray-500 text-[3vw] sm:text-sm">Cargando documentos...</p>
      </div>

      <!-- Error vitrinas -->
      <div v-else-if="error" class="text-center py-[10vw] sm:py-16 bg-red-50 rounded-xl border border-red-200">
        <div class="text-[10vw] sm:text-4xl mb-3">⚠️</div>
        <p class="text-red-600 font-medium text-[3.6vw] sm:text-base">{{ error }}</p>
        <button @click="recargar" class="mt-4 px-6 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition text-sm">
          Reintentar
        </button>
      </div>

      <template v-else>
        <!-- Modo búsqueda activa -->
        <div v-if="modoBusqueda">
          <div class="mb-[3vw] sm:mb-4 flex items-center justify-between">
            <h2 class="font-bold text-senado-primary text-[4vw] sm:text-2xl">
              <Icon name="mdi:magnify" class="inline mr-2" />
              Resultados
            </h2>
            <button @click="limpiarBusqueda" class="text-[2.1vw] sm:text-sm text-senado-primary hover:text-senado-primary-dark font-medium">
              ← Volver a las vitrinas
            </button>
          </div>

          <div v-if="respuestaIA" class="mb-[4vw] sm:mb-6 bg-senado-gold-soft border border-senado-gold/40 rounded-xl p-[3.6vw] sm:p-5">
            <div class="flex items-start gap-3">
              <Icon name="mdi:robot" class="text-senado-primary text-[5vw] sm:text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-semibold text-senado-primary-dark text-[2.7vw] sm:text-sm mb-1">Respuesta del asistente</p>
                <p class="text-gray-800 text-[2.4vw] sm:text-sm whitespace-pre-line">{{ respuestaIA }}</p>
              </div>
            </div>
          </div>

          <p class="text-gray-500 text-[2.4vw] sm:text-sm mb-[3vw] sm:mb-4">
            {{ resultadosBusqueda.length }} resultado(s) para "<strong>{{ busquedaEjecutada }}</strong>"
          </p>

          <div v-if="resultadosBusqueda.length > 0" class="space-y-[2.4vw] sm:space-y-3">
            <div
              v-for="doc in resultadosBusqueda"
              :key="doc.id"
              class="bg-white rounded-xl border border-gray-200 p-[3.6vw] sm:p-4 hover:shadow-md hover:border-senado-primary/30 cursor-pointer transition-all group"
              @click="abrirDetalle(doc)"
            >
              <div class="flex items-center gap-[1.8vw] sm:gap-2 mb-[1.5vw] sm:mb-1 flex-wrap">
                <span v-if="doc.estado" class="text-[1.8vw] sm:text-xs px-2 py-0.5 rounded font-medium" :class="colorEstado(doc.estado)">
                  {{ doc.estado }}
                </span>
                <span v-if="doc.gestion" class="text-gray-500 text-[1.8vw] sm:text-xs">
                  <Icon name="mdi:folder" class="inline mr-1" />{{ doc.gestion }}
                </span>
                <span v-if="doc.fecha" class="text-gray-500 text-[1.8vw] sm:text-xs">
                  <Icon name="mdi:calendar" class="inline mr-1" />{{ formatearFecha(doc.fecha) }}
                </span>
              </div>
              <h4 class="font-bold text-[3vw] sm:text-lg text-senado-primary-dark group-hover:text-senado-primary transition-colors leading-snug">
                {{ doc.titulo }}
              </h4>
              <p v-if="doc.descripcion" class="text-gray-500 text-[2.1vw] sm:text-sm mt-[0.9vw] sm:mt-1 line-clamp-2">
                {{ doc.descripcion }}
              </p>
            </div>
          </div>

          <div v-else class="text-center py-[10vw] sm:py-16 bg-white rounded-xl border border-gray-200">
            <div class="text-[10vw] sm:text-4xl mb-3">🔍</div>
            <p class="text-gray-600 font-medium text-[3vw] sm:text-base">
              No se encontraron documentos para "{{ busquedaEjecutada }}"
            </p>
          </div>
        </div>

        <!-- Vitrinas: 3 columnas -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-[4vw] sm:gap-6">
          <!-- Recién Promulgadas -->
          <div class="bg-white rounded-xl border border-gray-200 p-[4vw] sm:p-5 shadow-sm">
            <div class="flex items-center gap-2 pb-[2.4vw] sm:pb-3 mb-[3vw] sm:mb-4 border-b border-gray-200">
              <Icon name="mdi:check-circle" class="text-green-600 text-[5vw] sm:text-xl" />
              <h3 class="font-bold text-senado-primary-dark text-[3.3vw] sm:text-lg">Recién Promulgadas</h3>
            </div>
            <ul v-if="leyes.length" class="space-y-[3vw] sm:space-y-4">
              <li v-for="doc in leyes" :key="doc.id" class="cursor-pointer group" @click="abrirDetalle(doc)">
                <p class="font-bold text-[2.7vw] sm:text-sm text-gray-800 group-hover:text-senado-primary transition-colors">
                  {{ doc.codigo || doc.titulo }}
                </p>
                <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-0.5 line-clamp-2">
                  {{ doc.descripcion || 'Sin descripción disponible' }}
                </p>
              </li>
            </ul>
            <p v-else class="text-gray-400 text-[2.4vw] sm:text-sm text-center py-6">Sin documentos</p>
          </div>

          <!-- En el Hemiciclo -->
          <div class="bg-white rounded-xl border border-gray-200 p-[4vw] sm:p-5 shadow-sm">
            <div class="flex items-center gap-2 pb-[2.4vw] sm:pb-3 mb-[3vw] sm:mb-4 border-b border-gray-200">
              <Icon name="mdi:gavel" class="text-orange-500 text-[5vw] sm:text-xl" />
              <h3 class="font-bold text-senado-primary-dark text-[3.3vw] sm:text-lg">En el Hemiciclo</h3>
            </div>
            <ul v-if="enHemiciclo.length" class="space-y-[3vw] sm:space-y-4">
              <li v-for="doc in enHemiciclo" :key="doc.id" class="cursor-pointer group" @click="abrirDetalle(doc)">
                <p class="font-bold text-[2.7vw] sm:text-sm text-gray-800 group-hover:text-senado-primary transition-colors">
                  {{ doc.codigo || doc.titulo }}
                </p>
                <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-0.5 line-clamp-2">
                  {{ doc.descripcion || 'Sin descripción disponible' }}
                </p>
              </li>
            </ul>
            <p v-else class="text-gray-400 text-[2.4vw] sm:text-sm text-center py-6">Sin documentos</p>
          </div>

          <!-- Últimas Fiscalizaciones -->
          <div class="bg-white rounded-xl border border-gray-200 p-[4vw] sm:p-5 shadow-sm">
            <div class="flex items-center gap-2 pb-[2.4vw] sm:pb-3 mb-[3vw] sm:mb-4 border-b border-gray-200">
              <Icon name="mdi:magnify" class="text-senado-primary text-[5vw] sm:text-xl" />
              <h3 class="font-bold text-senado-primary-dark text-[3.3vw] sm:text-lg">Últimas Fiscalizaciones</h3>
            </div>
            <ul v-if="fiscalizaciones.length" class="space-y-[3vw] sm:space-y-4">
              <li v-for="doc in fiscalizaciones" :key="doc.id" class="cursor-pointer group" @click="abrirDetalle(doc)">
                <p class="font-bold text-[2.7vw] sm:text-sm text-gray-800 group-hover:text-senado-primary transition-colors">
                  {{ doc.codigo || doc.titulo }}
                </p>
                <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-0.5 line-clamp-2">
                  {{ doc.descripcion || 'Sin descripción disponible' }}
                </p>
              </li>
            </ul>
            <p v-else class="text-gray-400 text-[2.4vw] sm:text-sm text-center py-6">Sin documentos</p>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- PANEL DE DETALLE (debajo de las 3 columnas)  -->
        <!-- ============================================ -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <section
            v-if="docSeleccionado"
            ref="detalleRef"
            class="mt-[6vw] sm:mt-10 rounded-xl overflow-hidden border border-gray-300 bg-white shadow-lg"
          >
            <!-- Header oscuro -->
            <div class="bg-senado-primary-dark text-white px-[4vw] sm:px-6 py-[4vw] sm:py-5">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[4vw] sm:gap-6">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      v-if="detalleDoc?.codigo"
                      class="inline-block bg-blue-600 text-white text-[2.1vw] sm:text-xs font-bold px-3 py-1 rounded"
                    >
                      {{ detalleDoc.codigo }}
                    </span>
                    <button
                      @click="cerrarDetalle"
                      class="ml-auto sm:ml-0 text-white/70 hover:text-white text-[4vw] sm:text-lg"
                      title="Cerrar detalle"
                    >
                      <Icon name="mdi:close" />
                    </button>
                  </div>

                  <h2 class="font-bold text-[4.5vw] sm:text-2xl md:text-3xl mt-[2.4vw] sm:mt-3 leading-snug">
                    {{ detalleDoc?.titulo }}
                  </h2>

                  <div class="flex flex-wrap items-center gap-x-[3vw] sm:gap-x-4 gap-y-1 mt-[2.4vw] sm:mt-3 text-white/70 text-[2.4vw] sm:text-sm">
                    <span v-if="detalleDoc?.peticionante" class="inline-flex items-center gap-1">
                      <Icon name="mdi:account" /> Peticionante: {{ detalleDoc.peticionante }}
                    </span>
                    <span v-if="detalleDoc?.fecha" class="inline-flex items-center gap-1">
                      <Icon name="mdi:calendar" /> Fecha: {{ formatearFecha(detalleDoc.fecha) }}
                    </span>
                    <span v-if="detalleDoc?.estado" class="inline-flex items-center gap-1">
                      <Icon name="mdi:flag" /> {{ detalleDoc.estado }}
                    </span>
                  </div>
                </div>

                <div class="flex-shrink-0">
                  <button
                    @click="descargarPdf(detalleDoc)"
                    class="inline-flex items-center gap-2 bg-senado-gold hover:brightness-110 text-senado-primary-dark font-bold px-[4vw] sm:px-5 py-[2.7vw] sm:py-3 rounded-lg shadow transition"
                  >
                    <Icon name="mdi:download" class="text-[4.5vw] sm:text-lg" />
                    <span class="text-[2.7vw] sm:text-sm">Descargar PDF</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Cuerpo: 2 columnas (PDF | OCR/JSON) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Visor PDF -->
              <div class="bg-gray-200 border-r border-gray-300 flex flex-col min-h-[55vh]">
                <PdfViewer
                  v-if="detalleDoc?.id"
                  :url="pdfUrlDetalle"
                  class="flex-1 min-h-[55vh]"
                />
                <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400 px-6 text-center">
                  <Icon name="mdi:file-pdf-box" class="text-[20vw] sm:text-8xl opacity-40" />
                  <p class="mt-3 text-[2.7vw] sm:text-sm">Previsualización del PDF incrustado aquí</p>
                </div>
              </div>

              <!-- Columna derecha: OCR / JSON -->
              <div class="p-[4vw] sm:p-5 flex flex-col">
                <!-- Tabs internas -->
                <div class="flex items-center gap-2 pb-[2.4vw] sm:pb-3 mb-[3vw] sm:mb-4 border-b border-gray-200">
                  <button
                    @click="vistaDetalle = 'ocr'"
                    class="inline-flex items-center gap-1 text-[2.4vw] sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition"
                    :class="vistaDetalle === 'ocr'
                      ? 'bg-senado-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    <Icon name="mdi:text-box-outline" /> Texto OCR
                  </button>
                  <button
                    @click="vistaDetalle = 'json'"
                    class="inline-flex items-center gap-1 text-[2.4vw] sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition"
                    :class="vistaDetalle === 'json'
                      ? 'bg-senado-primary-dark text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    <Icon name="mdi:code-json" /> JSON (Open Data)
                  </button>
                </div>

                <!-- Vista OCR -->
                <template v-if="vistaDetalle === 'ocr'">
                  <pre class="whitespace-pre-wrap font-sans text-gray-700 text-[2.4vw] sm:text-sm leading-relaxed flex-1 overflow-auto max-h-[55vh]">{{ detalleDoc?.descripcion || 'Sin texto disponible.' }}</pre>
                </template>

                <!-- Vista JSON -->
                <template v-else>
                  <div v-if="cargandoJson" class="flex-1 flex items-center justify-center text-gray-500 py-10">
                    <div class="inline-block w-8 h-8 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
                    <span class="ml-3 text-sm">Cargando JSON…</span>
                  </div>

                  <div v-else-if="errorJson" class="flex-1 flex flex-col items-center justify-center text-gray-500 py-10 text-center px-4">
                    <Icon name="mdi:alert-circle" class="text-4xl text-red-500 mb-2" />
                    <p class="text-sm">{{ errorJson }}</p>
                  </div>

                  <pre
                    v-else
                    class="font-mono text-[2.1vw] sm:text-xs text-gray-800 leading-relaxed flex-1 overflow-auto max-h-[55vh] bg-gray-50 rounded-lg border border-gray-200 p-3"
                  >{{ jsonFormateado }}</pre>
                </template>

                <!-- Botones de acción -->
                <div class="mt-[3vw] sm:mt-5 flex justify-end gap-2">
                  <button
                    v-if="vistaDetalle === 'json'"
                    @click="copiarJson"
                    class="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-[3vw] sm:px-4 py-[2.4vw] sm:py-2.5 rounded-lg transition"
                  >
                    <Icon name="mdi:content-copy" class="text-[4vw] sm:text-base" />
                    <span class="text-[2.4vw] sm:text-sm">{{ copiado ? '¡Copiado!' : 'Copiar' }}</span>
                  </button>

                  <button
                    v-if="vistaDetalle === 'json'"
                    @click="descargarJson(detalleDoc)"
                    class="inline-flex items-center gap-2 bg-senado-primary-dark hover:bg-senado-primary text-white font-semibold px-[4vw] sm:px-5 py-[2.7vw] sm:py-3 rounded-lg transition"
                  >
                    <Icon name="mdi:download" class="text-[4.5vw] sm:text-lg" />
                    <span class="text-[2.4vw] sm:text-sm">Descargar JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </transition>

        <!-- Nota informativa -->
        <div class="mt-[6vw] sm:mt-8 bg-blue-50 rounded-xl border border-blue-200 px-[3.6vw] sm:px-5 py-[3vw] sm:py-4">
          <div class="flex items-start gap-[2.4vw] sm:gap-3">
            <Icon name="mdi:information" class="text-blue-600 text-[5vw] sm:text-xl flex-shrink-0 mt-0.5" />
            <div class="text-[2.1vw] sm:text-sm text-blue-800">
              <p class="font-semibold mb-1">Sobre los documentos</p>
              <p>
                Esta sección muestra las leyes y documentos de fiscalización más recientes.
                Algunos títulos aparecen con caracteres extraños porque el PDF aún no ha sido
                procesado correctamente por OCR.
              </p>
            </div>
          </div>
        </div>

        <!-- Botón volver -->
        <div class="mt-[8vw] sm:mt-10 text-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[2.7vw] sm:text-base font-medium"
          >
            <Icon name="mdi:arrow-left" />
            Volver al inicio
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// ============================================
// CONFIGURACIÓN
// ============================================
const API_BASE_URL = 'http://186.121.212.182:8000'

// ============================================
// ESTADO
// ============================================
const leyes = ref([])
const enHemiciclo = ref([])
const fiscalizaciones = ref([])
const loading = ref(false)
const error = ref(null)
const servidorCaido = ref(false)

// Búsqueda
const terminoBusqueda = ref('')
const busquedaEjecutada = ref('')
const resultadosBusqueda = ref([])
const respuestaIA = ref('')
const buscando = ref(false)
const modoBusqueda = ref(false)

// Detalle embebido
const docSeleccionado = ref(null)
const detalleRef = ref(null)

// Vista del detalle: 'ocr' o 'json'
const vistaDetalle = ref('ocr')
const jsonCrudo = ref(null)
const cargandoJson = ref(false)
const errorJson = ref(null)
const copiado = ref(false)

// ============================================
// COMPUTADOS
// ============================================
const detalleDoc = computed(() => docSeleccionado.value)

const pdfUrlDetalle = computed(() =>
  detalleDoc.value?.id
    ? `${API_BASE_URL}/api/descargar/pdf/${encodeURIComponent(detalleDoc.value.id)}`
    : ''
)

const jsonFormateado = computed(() => {
  if (!jsonCrudo.value) return ''
  try {
    return JSON.stringify(jsonCrudo.value, null, 2)
  } catch {
    return String(jsonCrudo.value)
  }
})

// ============================================
// HEALTH CHECK
// ============================================
const chequearSalud = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    clearTimeout(timeoutId)
    servidorCaido.value = !res.ok
    return res.ok
  } catch {
    servidorCaido.value = true
    return false
  }
}

// ============================================
// CARGAR VITRINAS
// ============================================
const cargarVitrinas = async () => {
  loading.value = true
  error.value = null

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(`${API_BASE_URL}/api/vitrinas`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

    const data = await res.json()

    leyes.value           = (data.recien_promulgadas || []).map(normalizarDoc)
    enHemiciclo.value     = (data.en_hemiciclo       || []).map(normalizarDoc)
    fiscalizaciones.value = (data.fiscalizacion      || []).map(normalizarDoc)

    servidorCaido.value = false
  } catch (err) {
    if (err.name === 'AbortError') {
      error.value = 'La solicitud tardó demasiado. Intente nuevamente.'
    } else {
      error.value = err.message
    }
    servidorCaido.value = true
  } finally {
    loading.value = false
  }
}

// ============================================
// NORMALIZAR DOCUMENTO
// ============================================
const normalizarDoc = (d) => {
  const titulo = limpiarTitulo(d.titulo || d.contexto_ia || 'Sin título')
  return {
    id: d.nombre_base || '',
    codigo: extraerCodigo(titulo),
    titulo,
    estado: d.estado || '',
    fecha: d.fecha || d.fecha_ley || d.fecha_procesamiento || '',
    tipo: d.tipo || '',
    gestion: d.gestion || extraerGestionDeId(d.nombre_base) || '',
    descripcion: d.texto_preview || d.contexto_ia || '',
    contexto_ia: d.contexto_ia || '',
    peticionante: d.peticionante || '',
    archivo_original: d.archivo_original || ''
  }
}

const limpiarTitulo = (titulo) => {
  if (!titulo) return 'Sin título'
  const limpio = titulo.replace(/\s+/g, ' ').trim()
  const m = limpio.match(/(LEY[^.]{0,140}|PROYECTO DE LEY[^.]{0,140}|PL[^.]{0,90}|PIE[^.]{0,90}|PIO[^.]{0,90})/i)
  return m ? m[1].trim() : (limpio.length > 160 ? limpio.slice(0, 160) + '…' : limpio)
}

const extraerCodigo = (titulo) => {
  if (!titulo) return ''
  const m = titulo.match(/(LEY\s*(DE\s*[\d\s\w]+\s*)?N[°º'’]?\s*\d+[\/\d\-]*|PL\s*N[°º'’]?\s*[\d\/\-]+|PIE\s*N[°º'’]?\s*[\d\/\-]+|PIO\s*N[°º'’]?\s*[\d\/\-]+)/i)
  return m ? m[0].trim() : ''
}

const extraerGestionDeId = (id) => {
  if (!id) return ''
  const match = id.match(/(\d{4})(\d{4})/)
  if (match) return `${match[1]}-${match[2]}`
  return ''
}

// ============================================
// ABRIR / CERRAR DETALLE (misma página)
// ============================================
const abrirDetalle = async (doc) => {
  if (!doc?.id) return

  docSeleccionado.value = { ...doc }
  vistaDetalle.value = 'ocr'
  jsonCrudo.value = null
  errorJson.value = null
  copiado.value = false

  await nextTick()
  detalleRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // Cargar JSON en segundo plano
  cargarJsonDetalle(doc.id)
}

const cargarJsonDetalle = async (id) => {
  cargandoJson.value = true
  errorJson.value = null
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(
      `${API_BASE_URL}/api/descargar/json/${encodeURIComponent(id)}`,
      { signal: controller.signal, headers: { 'Accept': 'application/json' } }
    )
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`Error ${res.status}`)

    const data = await res.json()
    jsonCrudo.value = data
    // Refrescar datos del detalle con el JSON completo
    docSeleccionado.value = { ...normalizarDoc(data), id }
  } catch (err) {
    errorJson.value = `No se pudo cargar el JSON: ${err.message}`
  } finally {
    cargandoJson.value = false
  }
}

const cerrarDetalle = () => {
  docSeleccionado.value = null
  jsonCrudo.value = null
  errorJson.value = null
  vistaDetalle.value = 'ocr'
}

// ============================================
// BÚSQUEDA — POST /consulta
// ============================================
const ejecutarBusqueda = async () => {
  const q = terminoBusqueda.value.trim()
  if (!q) {
    limpiarBusqueda()
    return
  }

  buscando.value = true
  modoBusqueda.value = true
  busquedaEjecutada.value = q
  resultadosBusqueda.value = []
  respuestaIA.value = ''
  docSeleccionado.value = null

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const res = await fetch(`${API_BASE_URL}/consulta`, {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pregunta: q, top_k: 5, modo_experto: false })
    })
    clearTimeout(timeoutId)

    if (!res.ok) throw new Error(`Error ${res.status}`)

    const data = await res.json()

    respuestaIA.value =
      data.respuesta || data.answer || data.texto || data.mensaje || ''

    const lista =
      data.resultados || data.fuentes || data.fragmentos ||
      data.documentos || data.data || (Array.isArray(data) ? data : [])

    resultadosBusqueda.value = (Array.isArray(lista) && lista.length)
      ? lista.map(normalizarDoc)
      : filtrarLocal(q)
  } catch (err) {
    console.warn('⚠️ /consulta falló, usando filtro local:', err.message)
    respuestaIA.value = ''
    resultadosBusqueda.value = filtrarLocal(q)
  } finally {
    buscando.value = false
  }
}

const filtrarLocal = (q) => {
  const t = q.toLowerCase()
  return [...leyes.value, ...enHemiciclo.value, ...fiscalizaciones.value]
    .filter(d =>
      (d.titulo || '').toLowerCase().includes(t) ||
      (d.descripcion || '').toLowerCase().includes(t) ||
      (d.id || '').toLowerCase().includes(t)
    )
}

const limpiarBusqueda = () => {
  terminoBusqueda.value = ''
  busquedaEjecutada.value = ''
  resultadosBusqueda.value = []
  respuestaIA.value = ''
  modoBusqueda.value = false
  docSeleccionado.value = null
}

// ============================================
// DESCARGAS / COPIAR
// ============================================
const descargarPdf = (doc) => {
  if (!doc?.id) return
  window.open(`${API_BASE_URL}/api/descargar/pdf/${encodeURIComponent(doc.id)}`, '_blank')
}

const descargarJson = (doc) => {
  if (!doc?.id) return
  window.open(`${API_BASE_URL}/api/descargar/json/${encodeURIComponent(doc.id)}`, '_blank')
}

const copiarJson = async () => {
  if (!jsonFormateado.value) return
  try {
    await navigator.clipboard.writeText(jsonFormateado.value)
    copiado.value = true
    setTimeout(() => { copiado.value = false }, 1800)
  } catch (err) {
    console.warn('No se pudo copiar el JSON:', err)
  }
}

// ============================================
// MÉTODOS
// ============================================
const colorEstado = (estado) => {
  const e = (estado || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (e.includes('promulg')) return 'bg-green-100 text-green-700'
  if (e.includes('tratamiento') || e.includes('tramit')) return 'bg-orange-100 text-orange-700'
  if (e.includes('sancion')) return 'bg-purple-100 text-purple-700'
  if (e.includes('aprob')) return 'bg-blue-100 text-blue-700'
  if (e.includes('rechaz')) return 'bg-red-100 text-red-700'
  if (e.includes('devuelto')) return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-600'
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  try {
    const d = new Date(fecha)
    if (isNaN(d.getTime())) return fecha
    return d.toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return fecha
  }
}

const recargar = () => {
  chequearSalud()
  cargarVitrinas()
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(async () => {
  await chequearSalud()
  cargarVitrinas()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>