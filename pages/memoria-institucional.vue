<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[90%] max-w-7xl">

      <!-- Título -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-senado-primary">
          Memoria <span class="text-[#8f1522]">Institucional</span>
        </h1>
        <div class="w-24 h-1 bg-[#611717] mx-auto mt-4"></div>
        <p class="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Redactor Legislativo - Seleccione un tomo para visualizar
        </p>
      </div>

      <!-- ========================================== -->
      <!-- PERIODO 2025-2026 (2 tomos)                -->
      <!-- ========================================== -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white bg-senado-primary-light w-full text-center py-3 rounded-lg shadow-md">
            REDACTOR LEGISLATURA 2025-2026
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="tomo in tomos2025" 
            :key="tomo.id"
            @click="abrirPDF(tomo)"
            class="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-[#E03636] group"
          >
            <div class="flex flex-col items-center text-center">
              <h5 class="text-sm sm:text-base font-bold text-[#A54A4A] mt-1">
                {{ tomo.numero }}
              </h5>
              <div class="w-full aspect-square mb-2 overflow-hidden rounded-lg shadow-md bg-gray-100">
                <img 
                  :src="tomo.portada" 
                  :alt="tomo.titulo"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  @error="(e) => e.target.src = '/images/portadas/default.jpg'"
                />
              </div>
              <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E03636]/10 rounded-full text-[#E03636] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="mdi:file-pdf-box" class="w-3 h-3" />
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- PERIODO 2023-2024 (12 tomos)               -->
      <!-- ========================================== -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white bg-senado-primary-light w-full text-center py-3 rounded-lg shadow-md">
            REDACTOR LEGISLATURA 2023-2024
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="tomo in tomosPaginados" 
            :key="tomo.id"
            @click="abrirPDF(tomo)"
            class="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-[#E03636] group"
          >
            <div class="flex flex-col items-center text-center">
              <h5 class="text-sm sm:text-base font-bold text-[#A54A4A] mt-1">
                {{ tomo.numero }}
              </h5>
              <div class="w-full aspect-square mb-2 overflow-hidden rounded-lg shadow-md bg-gray-100">
                <img 
                  :src="tomo.portada" 
                  :alt="tomo.titulo"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  @error="(e) => e.target.src = '/images/portadas/default.jpg'"
                />
              </div>
              <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E03636]/10 rounded-full text-[#E03636] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="mdi:file-pdf-box" class="w-3 h-3" />
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginación -->
        <div v-if="totalPaginas > 1" class="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button 
            @click="paginaAnterior"
            :disabled="paginaActual === 1"
            class="px-3 py-1 rounded-lg transition-all duration-300 text-sm font-medium"
            :class="paginaActual === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
          >
            <Icon name="mdi:chevron-left" class="w-4 h-4" />
            Anterior
          </button>

          <div class="flex gap-1 flex-wrap justify-center">
            <button 
              v-for="p in totalPaginas" 
              :key="p"
              @click="paginaActual = p"
              class="w-8 h-8 rounded-lg transition-all duration-300 text-sm font-medium"
              :class="paginaActual === p ? 'bg-[#E03636] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ p }}
            </button>
          </div>

          <button 
            @click="paginaSiguiente"
            :disabled="paginaActual === totalPaginas"
            class="px-3 py-1 rounded-lg transition-all duration-300 text-sm font-medium"
            :class="paginaActual === totalPaginas ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
          >
            Siguiente
            <Icon name="mdi:chevron-right" class="w-4 h-4" />
          </button>
        </div>

        <div class="text-center text-xs text-gray-400 mt-2">
          Mostrando {{ inicioMostrar }} - {{ finMostrar }} de {{ totalTomos }} tomos
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL DEL VISOR DE PDF (VERSIÓN COMPLETA)  -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
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
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
            <!-- ========================================== -->
            <!-- BARRA DE HERRAMIENTAS SUPERIOR             -->
            <!-- ========================================== -->
            <div class="flex-shrink-0 bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white p-3 flex items-center justify-between flex-wrap gap-2">
              <!-- Izquierda -->
              <div class="flex items-center gap-3">
                <button 
                  @click="cerrarVisor"
                  class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                  title="Cerrar (ESC)"
                >
                  <Icon name="mdi:close" class="w-6 h-6" />
                </button>
                <div class="flex items-center gap-2">
                  <Icon name="mdi:book-open-variant" class="w-5 h-5 text-senado-gold" />
                  <span class="font-bold text-lg truncate max-w-[120px] md:max-w-md">
                    {{ pdfTitulo }}
                  </span>
                </div>
                <span class="hidden md:inline text-xs opacity-60 bg-white/10 px-2 py-0.5 rounded-full">
                  {{ totalPaginasPDF }} páginas
                </span>
              </div>

              <!-- Centro: Controles -->
              <div class="flex items-center gap-1 md:gap-2 flex-wrap">
                <!-- ===== ZOOM ===== -->
                <div class="flex items-center gap-1 bg-white/10 rounded-lg px-1 py-1">
                  <button 
                    @click="zoomOut"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors"
                    title="Alejar (-)"
                  >
                    <Icon name="mdi:minus" class="w-4 h-4" />
                  </button>
                  <span class="text-xs font-mono min-w-[45px] text-center">
                    {{ Math.round(zoomLevel * 100) }}%
                  </span>
                  <button 
                    @click="zoomIn"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors"
                    title="Acercar (+)"
                  >
                    <Icon name="mdi:plus" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="resetZoom"
                    class="hover:bg-white/20 rounded px-2 py-1 transition-colors text-xs"
                    title="Restablecer zoom (0)"
                  >
                    <Icon name="mdi:restore" class="w-4 h-4" />
                  </button>
                </div>

                <div class="w-px h-6 bg-white/20 hidden sm:block"></div>

                <!-- ===== PÁGINAS ===== -->
                <div class="flex items-center gap-1 bg-white/10 rounded-lg px-1 py-1">
                  <button 
                    @click="paginaAnteriorPDF"
                    :disabled="paginaActualPDF <= 1"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Página anterior (←)"
                  >
                    <Icon name="mdi:chevron-left" class="w-5 h-5" />
                  </button>
                  
                  <!-- 🔥 INPUT DE PÁGINA CORREGIDO -->
                  <div class="flex items-center gap-1 px-1">
                    <input 
                      type="number" 
                      v-model.number="paginaInput"
                      @keydown.enter="irAPagina"
                      @keydown="handleInputKeydown"
                      @focus="seleccionarTexto"
                      @blur="validarInputPagina"
                      min="1"
                      :max="totalPaginasPDF"
                      class="w-14 bg-white/10 text-center text-sm text-white border-0 focus:outline-none focus:ring-1 focus:ring-white/30 rounded py-0.5"
                    />
                    <span class="text-xs opacity-60">/ {{ totalPaginasPDF }}</span>
                  </div>
                  
                  <button 
                    @click="paginaSiguientePDF"
                    :disabled="paginaActualPDF >= totalPaginasPDF"
                    class="hover:bg-white/20 rounded p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Página siguiente (→)"
                  >
                    <Icon name="mdi:chevron-right" class="w-5 h-5" />
                  </button>
                </div>

                <div class="w-px h-6 bg-white/20 hidden sm:block"></div>

                <!-- ===== ACCIONES ===== -->
                <div class="flex items-center gap-1">
                  <button 
                    @click="toggleBusqueda"
                    class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                    title="Buscar en el documento (Ctrl+F)"
                  >
                    <Icon name="mdi:magnify" class="w-5 h-5" />
                  </button>
                  
                  <button 
                    @click="toggleMiniaturas"
                    class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                    title="Miniaturas"
                  >
                    <Icon name="mdi:view-grid" class="w-5 h-5" />
                  </button>
                  
                  <button 
                    @click="toggleModoLectura"
                    class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                    title="Modo lectura (ocultar barras)"
                  >
                    <Icon name="mdi:book" class="w-5 h-5" />
                  </button>

                  <div class="w-px h-6 bg-white/20 hidden sm:block"></div>

                  <a 
                    :href="pdfUrlActual" 
                    download
                    target="_blank"
                    class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                    title="Descargar PDF"
                  >
                    <Icon name="mdi:download" class="w-5 h-5" />
                  </a>
                  <button 
                    @click="toggleFullscreen"
                    class="hover:bg-white/20 rounded-lg p-2 transition-colors"
                    title="Pantalla completa (F)"
                  >
                    <Icon name="mdi:fullscreen" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- BARRA DE BÚSQUEDA                          -->
            <!-- ========================================== -->
            <div 
              v-if="mostrarBusqueda"
              class="flex-shrink-0 bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-3"
            >
              <Icon name="mdi:magnify" class="w-5 h-5 text-gray-400" />
              <input 
                v-model="busquedaTexto"
                @input="buscarTexto"
                type="text"
                placeholder="Buscar en el documento..."
                class="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent"
                ref="busquedaInput"
              />
              <span class="text-xs text-gray-500" v-if="resultadosBusqueda.length > 0">
                {{ resultadoActual + 1 }} de {{ resultadosBusqueda.length }}
              </span>
              <span class="text-xs text-gray-400" v-else-if="busquedaTexto && !buscando">
                Sin resultados
              </span>
              <div class="flex gap-1">
                <button 
                  @click="resultadoAnterior"
                  :disabled="resultadosBusqueda.length === 0"
                  class="p-1 hover:bg-gray-200 rounded disabled:opacity-40"
                >
                  <Icon name="mdi:chevron-up" class="w-5 h-5" />
                </button>
                <button 
                  @click="resultadoSiguiente"
                  :disabled="resultadosBusqueda.length === 0"
                  class="p-1 hover:bg-gray-200 rounded disabled:opacity-40"
                >
                  <Icon name="mdi:chevron-down" class="w-5 h-5" />
                </button>
                <button 
                  @click="mostrarBusqueda = false"
                  class="p-1 hover:bg-gray-200 rounded"
                >
                  <Icon name="mdi:close" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- CONTENEDOR PRINCIPAL (PDF + MINIATURAS)    -->
            <!-- ========================================== -->
            <div class="flex-1 flex overflow-hidden">
              <!-- PANEL DE MINIATURAS -->
              <div 
                v-if="mostrarMiniaturas"
                class="w-48 flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-y-auto p-2 hidden md:block"
                style="max-height: 500px;"
                ref="miniaturasContainer"
              >
                <div class="text-xs font-semibold text-gray-500 mb-2 sticky top-0 bg-gray-50 py-1">
                  Miniaturas
                </div>
                <div 
                  v-for="num in miniaturasVisibles" 
                  :key="num"
                  @click="renderPagina(num)"
                  class="mb-2 cursor-pointer rounded-lg border-2 transition-all hover:border-senado-primary"
                  :class="num === paginaActualPDF ? 'border-senado-primary bg-senado-primary/5' : 'border-transparent hover:bg-gray-100'"
                >
                  <div class="aspect-[3/4] bg-white rounded shadow-sm overflow-hidden">
                    <canvas 
                      :ref="el => setMiniaturaCanvas(el, num)"
                      class="w-full h-full object-contain"
                    ></canvas>
                  </div>
                  <div class="text-center text-xs text-gray-500 mt-0.5">
                    Pág. {{ num }}
                  </div>
                </div>
              </div>

              <!-- ===== ÁREA DE LECTURA ===== -->
              <div 
                class="flex-1 overflow-auto bg-[#e8e0d5] p-4 relative"
                ref="visorContainer"
                @scroll="handleScroll"
                :class="modoLectura ? 'pt-2 pb-2' : ''"
              >
                <div 
                  class="mx-auto transition-transform duration-200 ease-out relative"
                  :style="{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    maxWidth: '900px'
                  }"
                >
                  <!-- Sombras de libro -->
                  <div class="absolute -left-4 top-0 bottom-0 w-4 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
                  <div class="absolute -right-4 top-0 bottom-0 w-4 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
                  <div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
                  <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

                  <!-- Cargando -->
                  <div v-if="cargandoPDF" class="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-2xl min-h-[400px]">
                    <div class="inline-block w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
                    <p class="mt-4 text-gray-600 font-medium">Cargando documento...</p>
                    <p class="text-sm text-gray-400">Por favor espere un momento</p>
                  </div>

                  <!-- Canvas del PDF -->
                  <canvas 
                    v-show="!cargandoPDF"
                    ref="pdfCanvas"
                    class="w-full shadow-2xl rounded-lg bg-white"
                    style="height: auto;"
                  ></canvas>

                  <!-- Número de página flotante -->
                  <div v-if="!cargandoPDF && !modoLectura" class="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {{ paginaActualPDF }} / {{ totalPaginasPDF }}
                  </div>
                </div>
              </div>
            </div>

            <!-- ========================================== -->
            <!-- BARRA INFERIOR                             -->
            <!-- ========================================== -->
            <div v-if="!modoLectura" class="flex-shrink-0 bg-white border-t border-gray-200 p-2 flex items-center justify-between gap-4 flex-wrap">
              <!-- Progreso -->
              <div class="flex items-center gap-3 flex-1 min-w-[150px]">
                <Icon name="mdi:progress-check" class="w-4 h-4 text-gray-400" />
                <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden min-w-[60px]">
                  <div 
                    class="h-full bg-gradient-to-r from-senado-primary to-senado-primary-light transition-all duration-300 rounded-full"
                    :style="{ width: `${(paginaActualPDF / totalPaginasPDF) * 100}%` }"
                  ></div>
                </div>
                <span class="text-xs text-gray-500 font-mono min-w-[40px]">
                  {{ Math.round((paginaActualPDF / totalPaginasPDF) * 100) }}%
                </span>
              </div>
              
              <!-- Estadísticas -->
              <div class="flex items-center gap-4 text-xs text-gray-500">
                <div class="flex items-center gap-1.5">
                  <Icon name="mdi:file-pdf-box" class="w-4 h-4 text-red-500" />
                  <span class="hidden sm:inline">{{ pdfNombreArchivo }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Icon name="mdi:book-open-page-variant" class="w-4 h-4" />
                  <span>{{ totalPaginasPDF }} páginas</span>
                </div>
                <div class="flex items-center gap-1.5 hidden sm:flex">
                  <Icon name="mdi:magnify-plus-outline" class="w-4 h-4" />
                  <span>{{ Math.round(zoomLevel * 100) }}%</span>
                </div>
                <div v-if="ultimaPaginaLeida > 0" class="flex items-center gap-1.5 hidden sm:flex">
                  <Icon name="mdi:bookmark" class="w-4 h-4 text-senado-gold" />
                  <span class="text-senado-primary">Última: {{ ultimaPaginaLeida }}</span>
                  <button 
                    @click="irAUltimaPagina"
                    class="text-xs text-senado-primary hover:underline"
                  >
                    Ir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

// ============================================ //
// IMPORTAR PDF.JS VERSIÓN LEGACY
// ============================================ //
import * as pdfjsLib from 'pdfjs-dist'

// ============================================ //
// CONFIGURAR PDF.JS WORKER
// ============================================ //
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

// ============================================ //
// DATOS DE TOMOS
// ============================================ //

const tomos2025 = [
  { 
    id: 1, 
    numero: 'TOMO I', 
    titulo: 'Tomo I - Gestión 2025-2026', 
    pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_I_2025-2026.pdf',
    portada: '/images/portadas/2025-2026/default.jpg',
    nombreArchivo: 'Redactor_Tomo_I_2025-2026.pdf'
  },
  { 
    id: 2, 
    numero: 'TOMO II', 
    titulo: 'Tomo II - Gestión 2025-2026', 
    pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_II_2025-2026.pdf',
    portada: '/images/portadas/2025-2026/default.jpg',
    nombreArchivo: 'Redactor_Tomo_II_2025-2026.pdf'
  }
]

const tomos2023 = [
  { id: 3, numero: 'TOMO I', titulo: 'Tomo I - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_I_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_I_2023-2024.pdf' },
  { id: 4, numero: 'TOMO II', titulo: 'Tomo II - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_II_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_II_2023-2024.pdf' },
  { id: 5, numero: 'TOMO III', titulo: 'Tomo III - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_III_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_III_2023-2024.pdf' },
  { id: 6, numero: 'TOMO IV', titulo: 'Tomo IV - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_IV_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_IV_2023-2024.pdf' },
  { id: 7, numero: 'TOMO V', titulo: 'Tomo V - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_V_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_V_2023-2024.pdf' },
  { id: 8, numero: 'TOMO VI', titulo: 'Tomo VI - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VI_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_VI_2023-2024.pdf' },
  { id: 9, numero: 'TOMO VII', titulo: 'Tomo VII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_VII_2023-2024.pdf' },
  { id: 10, numero: 'TOMO VIII', titulo: 'Tomo VIII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_VIII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_VIII_2023-2024.pdf' },
  { id: 11, numero: 'TOMO IX', titulo: 'Tomo IX - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_IX_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_IX_2023-2024.pdf' },
  { id: 12, numero: 'TOMO X', titulo: 'Tomo X - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_X_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_X_2023-2024.pdf' },
  { id: 13, numero: 'TOMO XI', titulo: 'Tomo XI - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_XI_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_XI_2023-2024.pdf' },
  { id: 14, numero: 'TOMO XII', titulo: 'Tomo XII - Gestión 2023-2024', pdfUrl: '/pdfs/redactor/REDACTOR_TOMO_XII_2023-2024.pdf', portada: '/images/portadas/2023-2024/default.jpg', nombreArchivo: 'Redactor_Tomo_XII_2023-2024.pdf' }
]

// ============================================ //
// ESTADO DE PAGINACIÓN
// ============================================ //
const paginaActual = ref(1)
const itemsPorPagina = 6

const totalTomos = computed(() => tomos2023.length)
const totalPaginas = computed(() => Math.ceil(totalTomos.value / itemsPorPagina))

const tomosPaginados = computed(() => {
  const start = (paginaActual.value - 1) * itemsPorPagina
  const end = start + itemsPorPagina
  return tomos2023.slice(start, end)
})

const inicioMostrar = computed(() => (paginaActual.value - 1) * itemsPorPagina + 1)
const finMostrar = computed(() => Math.min(paginaActual.value * itemsPorPagina, totalTomos.value))

const paginaAnterior = () => {
  if (paginaActual.value > 1) paginaActual.value--
}

const paginaSiguiente = () => {
  if (paginaActual.value < totalPaginas.value) paginaActual.value++
}

// ============================================ //
// ESTADO DEL VISOR DE PDF
// ============================================ //
const visorAbierto = ref(false)
const pdfTitulo = ref('')
const pdfUrlActual = ref('')
const pdfNombreArchivo = ref('')
const pdfDocumento = ref(null)
const pdfCanvas = ref(null)
const visorContainer = ref(null)
const cargandoPDF = ref(false)

const paginaActualPDF = ref(1)
const totalPaginasPDF = ref(0)
const zoomLevel = ref(1)
const paginaInput = ref(1)

// 🔥 NUEVAS FUNCIONALIDADES
const mostrarBusqueda = ref(false)
const busquedaTexto = ref('')
const buscando = ref(false)
const resultadosBusqueda = ref([])
const resultadoActual = ref(0)
const busquedaInput = ref(null)

const mostrarMiniaturas = ref(false)
const miniaturasContainer = ref(null)
const miniaturasCache = ref({})

const modoLectura = ref(false)

const ultimaPaginaLeida = ref(0)

const miniaturasVisibles = ref([])

// ============================================ //
// FUNCIONES DEL VISOR DE PDF
// ============================================ //

const abrirPDF = async (tomo) => {
  pdfTitulo.value = tomo.titulo
  pdfUrlActual.value = tomo.pdfUrl
  pdfNombreArchivo.value = tomo.nombreArchivo || 'documento.pdf'
  
  const clave = `senado_ultima_pagina_${tomo.id}`
  const guardada = localStorage.getItem(clave)
  const paginaInicial = guardada ? parseInt(guardada) : 1
  
  paginaActualPDF.value = paginaInicial
  paginaInput.value = paginaInicial
  zoomLevel.value = 1
  visorAbierto.value = true
  document.body.style.overflow = 'hidden'
  
  await nextTick()
  await cargarPDF()
}

const cerrarVisor = () => {
  if (pdfDocumento.value && totalPaginasPDF.value > 0) {
    const clave = `senado_ultima_pagina_${pdfTitulo.value}`
    localStorage.setItem(clave, paginaActualPDF.value.toString())
  }
  
  visorAbierto.value = false
  document.body.style.overflow = 'auto'
  pdfDocumento.value = null
  pdfCanvas.value = null
  mostrarMiniaturas.value = false
  mostrarBusqueda.value = false
  miniaturasCache.value = {}
}

const cargarPDF = async () => {
  if (!pdfUrlActual.value) return
  
  cargandoPDF.value = true
  
  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrlActual.value)
    pdfDocumento.value = await loadingTask.promise
    
    totalPaginasPDF.value = pdfDocumento.value.numPages
    
    const total = Math.min(totalPaginasPDF.value, 20)
    miniaturasVisibles.value = Array.from({ length: total }, (_, i) => i + 1)
    
    console.log(`📄 PDF cargado: ${totalPaginasPDF.value} páginas`)
    
    await renderPagina(paginaActualPDF.value)
  } catch (error) {
    console.error('Error cargando PDF:', error)
    alert(`Error al cargar el PDF: ${error.message}`)
  } finally {
    cargandoPDF.value = false
  }
}

const renderPagina = async (numeroPagina) => {
  if (!pdfDocumento.value || !pdfCanvas.value) return
  
  try {
    const page = await pdfDocumento.value.getPage(numeroPagina)
    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')
    
    const container = canvas.parentElement
    const containerWidth = container?.clientWidth || 800
    
    const viewport = page.getViewport({ scale: 1 })
    const escala = Math.min((containerWidth - 40) / viewport.width, 2.5)
    
    const escalaFinal = escala * zoomLevel.value
    const scaledViewport = page.getViewport({ scale: escalaFinal })
    
    canvas.width = scaledViewport.width
    canvas.height = scaledViewport.height
    
    await page.render({
      canvasContext: context,
      viewport: scaledViewport
    }).promise
    
    paginaActualPDF.value = numeroPagina
    paginaInput.value = numeroPagina
    
    const clave = `senado_ultima_pagina_${pdfTitulo.value}`
    localStorage.setItem(clave, numeroPagina.toString())
    ultimaPaginaLeida.value = numeroPagina
    
    console.log(`✅ Página ${numeroPagina} renderizada`)
    
    if (mostrarMiniaturas.value) {
      renderizarMiniaturas()
    }
  } catch (error) {
    console.error('Error renderizando página:', error)
  }
}

// ============================================ //
// CONTROLES DE NAVEGACIÓN - CORREGIDOS
// ============================================ //

const paginaAnteriorPDF = () => {
  if (paginaActualPDF.value > 1) {
    renderPagina(paginaActualPDF.value - 1)
  }
}

const paginaSiguientePDF = () => {
  if (paginaActualPDF.value < totalPaginasPDF.value) {
    renderPagina(paginaActualPDF.value + 1)
  }
}

const irAPagina = () => {
  const num = parseInt(paginaInput.value)
  if (num >= 1 && num <= totalPaginasPDF.value) {
    renderPagina(num)
  } else {
    paginaInput.value = paginaActualPDF.value
  }
}

// 🔥 NUEVO: Manejar teclas en el input
const handleInputKeydown = (event) => {
  // Prevenir que el 0 se use como reset zoom cuando estamos en el input
  event.stopPropagation()
  
  // Si es Enter, ir a la página
  if (event.key === 'Enter') {
    event.preventDefault()
    irAPagina()
  }
}

// 🔥 NUEVO: Validar al perder el foco
const validarInputPagina = () => {
  const num = parseInt(paginaInput.value)
  if (isNaN(num) || num < 1) {
    paginaInput.value = 1
  } else if (num > totalPaginasPDF.value) {
    paginaInput.value = totalPaginasPDF.value
  }
}

const irAUltimaPagina = () => {
  if (ultimaPaginaLeida.value > 0) {
    renderPagina(ultimaPaginaLeida.value)
  }
}

const seleccionarTexto = (event) => {
  event.target.select()
}

const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(zoomLevel.value + 0.15, 3)
    renderPagina(paginaActualPDF.value)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.4) {
    zoomLevel.value = Math.max(zoomLevel.value - 0.15, 0.4)
    renderPagina(paginaActualPDF.value)
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
  renderPagina(paginaActualPDF.value)
}

// ============================================ //
// BÚSQUEDA DE TEXTO
// ============================================ //

const toggleBusqueda = () => {
  mostrarBusqueda.value = !mostrarBusqueda.value
  if (mostrarBusqueda.value) {
    nextTick(() => {
      busquedaInput.value?.focus()
    })
  }
}

const buscarTexto = async () => {
  if (!busquedaTexto.value.trim() || !pdfDocumento.value) {
    resultadosBusqueda.value = []
    return
  }
  
  buscando.value = true
  resultadosBusqueda.value = []
  
  try {
    const texto = busquedaTexto.value.toLowerCase()
    const resultados = []
    
    const maxPaginas = Math.min(totalPaginasPDF.value, 50)
    
    for (let i = 1; i <= maxPaginas; i++) {
      const page = await pdfDocumento.value.getPage(i)
      const content = await page.getTextContent()
      const textoPagina = content.items.map(item => item.str).join(' ')
      
      if (textoPagina.toLowerCase().includes(texto)) {
        resultados.push(i)
      }
    }
    
    resultadosBusqueda.value = resultados
    resultadoActual.value = 0
    
    if (resultados.length > 0) {
      renderPagina(resultados[0])
    }
  } catch (error) {
    console.error('Error en búsqueda:', error)
  } finally {
    buscando.value = false
  }
}

const resultadoAnterior = () => {
  if (resultadosBusqueda.value.length === 0) return
  resultadoActual.value = (resultadoActual.value - 1 + resultadosBusqueda.value.length) % resultadosBusqueda.value.length
  renderPagina(resultadosBusqueda.value[resultadoActual.value])
}

const resultadoSiguiente = () => {
  if (resultadosBusqueda.value.length === 0) return
  resultadoActual.value = (resultadoActual.value + 1) % resultadosBusqueda.value.length
  renderPagina(resultadosBusqueda.value[resultadoActual.value])
}

// ============================================ //
// MINIATURAS
// ============================================ //

const toggleMiniaturas = () => {
  mostrarMiniaturas.value = !mostrarMiniaturas.value
  if (mostrarMiniaturas.value) {
    renderizarMiniaturas()
  }
}

const setMiniaturaCanvas = (el, num) => {
  if (el && !miniaturasCache.value[num]) {
    miniaturasCache.value[num] = el
    renderizarMiniatura(num)
  }
}

const renderizarMiniatura = async (num) => {
  const canvas = miniaturasCache.value[num]
  if (!canvas || !pdfDocumento.value) return
  
  try {
    const page = await pdfDocumento.value.getPage(num)
    const context = canvas.getContext('2d')
    
    const viewport = page.getViewport({ scale: 0.3 })
    canvas.width = viewport.width
    canvas.height = viewport.height
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise
  } catch (error) {
    console.error('Error renderizando miniatura:', error)
  }
}

const renderizarMiniaturas = async () => {
  for (const num of miniaturasVisibles.value) {
    await renderizarMiniatura(num)
  }
}

// ============================================ //
// MODO LECTURA
// ============================================ //

const toggleModoLectura = () => {
  modoLectura.value = !modoLectura.value
}

// ============================================ //
// HANDLE SCROLL
// ============================================ //

const handleScroll = () => {}

// ============================================ //
// FULLSCREEN
// ============================================ //

const toggleFullscreen = () => {
  const container = visorContainer.value?.closest('.fixed')
  if (container) {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }
}

// ============================================ //
// KEYBOARD SHORTCUTS - CORREGIDO
// ============================================ //

const handleKeydown = (event) => {
  if (!visorAbierto.value) return
  
  // 🔥 IMPORTANTE: Si el foco está en un input, no ejecutar atajos
  const target = event.target
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    // Solo permitir Escape para salir del input
    if (event.key === 'Escape') {
      target.blur()
      if (mostrarBusqueda.value) {
        mostrarBusqueda.value = false
      }
    }
    return
  }
  
  // Ctrl+F para búsqueda
  if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
    event.preventDefault()
    toggleBusqueda()
    return
  }
  
  // Escape para cerrar búsqueda
  if (event.key === 'Escape' && mostrarBusqueda.value) {
    mostrarBusqueda.value = false
    return
  }
  
  const navigationKeys = ['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', '+', '=', '-', '0']
  if (navigationKeys.includes(event.key)) {
    event.preventDefault()
  }
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'PageUp':
      paginaAnteriorPDF()
      break
    case 'ArrowRight':
    case 'PageDown':
      paginaSiguientePDF()
      break
    case '+':
    case '=':
      zoomIn()
      break
    case '-':
      zoomOut()
      break
    case '0':
      resetZoom()
      break
    case 'Escape':
      if (!mostrarBusqueda.value) cerrarVisor()
      break
    case 'f':
    case 'F':
      if (!event.ctrlKey && !event.metaKey) toggleFullscreen()
      break
  }
}

// ============================================ //
// WATCHERS
// ============================================ //

watch(paginaInput, (newVal) => {
  if (newVal < 1) paginaInput.value = 1
  if (newVal > totalPaginasPDF.value) paginaInput.value = totalPaginasPDF.value
})

// ============================================ //
// LIFECYCLE
// ============================================ //

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* ========================================== */
/* GRID DE 6 COLUMNAS                        */
/* ========================================== */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ========================================== */
/* ESTILOS DE TARJETAS                       */
/* ========================================== */
.aspect-square {
  aspect-ratio: 1/1;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #ffffff, #f9fafb);
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* ========================================== */
/* TRANSICIONES                              */
/* ========================================== */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:border-\[\#E03636\]:hover {
  border-color: #E03636;
}

.opacity-0 {
  opacity: 0;
}

.group:hover .opacity-0 {
  opacity: 1;
}

/* ========================================== */
/* ESTILOS DEL VISOR                         */
/* ========================================== */
.fixed {
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #e8e0d5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #611717;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3a060d;
}

/* Fondo de libro */
.bg-\[\#e8e0d5\] {
  background-color: #e8e0d5;
}

/* Input de número - ocultar flechas */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* Shadow del libro */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Barra de progreso */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #611717, #8f1522);
}

/* Miniaturas */
.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}
</style>