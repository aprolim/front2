<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-senado-primary mb-4">
          Avisos y Comunicados
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Información institucional, comunicados oficiales y avisos de la Cámara de Senadores
        </p>
        <div class="w-24 h-1 bg-senado-gold mx-auto mt-4"></div>
      </div>

      <!-- Estado de carga inicial -->
      <div v-if="showSkeleton" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-senado-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-4 text-gray-500">Cargando comunicados...</p>
      </div>

      <!-- Contenido -->
      <template v-else>
        <!-- Filtros -->
        <div class="mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filtro in filtros"
              :key="filtro.value"
              @click="filtroActivo = filtro.value"
              class="px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
              :class="filtroActivo === filtro.value
                ? 'bg-senado-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
            >
              {{ filtro.label }}
              <span v-if="contarPorFiltro(filtro.value) > 0" class="ml-1.5 text-xs opacity-75">
                ({{ contarPorFiltro(filtro.value) }})
              </span>
            </button>
          </div>

          <div class="flex items-center gap-4">
            <input
              v-model="busqueda"
              type="text"
              placeholder="Buscar comunicados..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-senado-primary text-sm w-64"
            />
            <button
              @click="alternarVista"
              class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              title="Cambiar vista"
            >
              <Icon
                :name="vista === 'grid' ? 'material-symbols:view-list' : 'material-symbols:grid-view'"
                class="text-2xl text-gray-600"
              />
            </button>
          </div>
        </div>

        <!-- Contador -->
        <div class="mb-4 text-sm text-gray-500">
          Mostrando <strong>{{ comunicadosFiltrados.length }}</strong> de
          <strong>{{ totalComunicados }}</strong> comunicados
          <span v-if="comunicadosActivos.length > 0" class="ml-2 text-green-600">
            • {{ comunicadosActivos.length }} activo{{ comunicadosActivos.length > 1 ? 's' : '' }}
          </span>
          <span v-if="comunicadosExpirados.length > 0" class="ml-2 text-gray-400">
            • {{ comunicadosExpirados.length }} expirado{{ comunicadosExpirados.length > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- ============================================ -->
        <!-- SECCIÓN: COMUNICADOS ACTIVOS                  -->
        <!-- ============================================ -->
        <div v-if="comunicadosActivos.length > 0" class="mb-12">
          <h2 class="text-xl font-bold text-senado-primary mb-4 flex items-center gap-2">
            <span class="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Comunicados Vigentes
          </h2>

          <div v-if="vista === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="comunicado in comunicadosActivosFiltrados"
              :key="comunicado._id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div
                v-if="comunicado.imagen?.url"
                class="relative w-full aspect-[16/9] bg-gray-100 cursor-pointer"
                @click="abrirDetalle(comunicado)"
              >
                <img
                  :src="comunicado.imagen.url"
                  :alt="comunicado.imagen.alt || comunicado.titulo"
                  class="w-full h-full object-cover"
                  @error="(e) => (e.target.style.display = 'none')"
                />
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-md">
                  ● Vigente
                </span>
              </div>

              <div class="p-6 flex-1 flex flex-col">
                <span class="text-xs text-gray-400 mb-2">
                  {{ formatearFecha(comunicado.fechaLanzamiento) }}
                </span>

                <h3
                  class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-senado-primary transition-colors"
                  @click="abrirDetalle(comunicado)"
                >
                  {{ comunicado.titulo }}
                </h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {{ comunicado.contenido }}
                </p>

                <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <button
                    @click="abrirDetalle(comunicado)"
                    class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium transition-colors"
                  >
                    Leer más →
                  </button>
                  <a
                    v-if="comunicado.pdf?.url"
                    :href="comunicado.pdf.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-gray-500 hover:text-senado-primary transition-colors text-sm"
                  >
                    <Icon name="material-symbols:file-download" class="text-lg" />
                    PDF
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="space-y-4">
            <article
              v-for="comunicado in comunicadosActivosFiltrados"
              :key="comunicado._id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
            >
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <div
                  v-if="comunicado.imagen?.url"
                  class="w-full md:w-24 h-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                  @click="abrirDetalle(comunicado)"
                >
                  <img
                    :src="comunicado.imagen.url"
                    :alt="comunicado.imagen.alt || comunicado.titulo"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1 flex-wrap">
                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      ● Vigente
                    </span>
                    <span class="text-xs text-gray-400">
                      {{ formatearFecha(comunicado.fechaLanzamiento) }}
                    </span>
                  </div>
                  <h3
                    class="text-lg font-bold text-gray-800 truncate cursor-pointer hover:text-senado-primary transition-colors"
                    @click="abrirDetalle(comunicado)"
                  >
                    {{ comunicado.titulo }}
                  </h3>
                  <p class="text-gray-600 text-sm line-clamp-2">
                    {{ comunicado.contenido }}
                  </p>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0">
                  <button
                    @click="abrirDetalle(comunicado)"
                    class="px-4 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors text-sm"
                  >
                    Ver
                  </button>
                  <a
                    v-if="comunicado.pdf?.url"
                    :href="comunicado.pdf.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 text-gray-500 hover:text-senado-primary transition-colors"
                  >
                    <Icon name="material-symbols:file-download" class="text-xl" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- SECCIÓN: COMUNICADOS EXPIRADOS                -->
        <!-- ============================================ -->
        <div v-if="comunicadosExpirados.length > 0">
          <h2 class="text-xl font-bold text-gray-600 mb-4 flex items-center gap-2">
            <span class="inline-block w-3 h-3 bg-gray-400 rounded-full"></span>
            Comunicados Anteriores
          </h2>

          <div v-if="vista === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="comunicado in comunicadosExpiradosFiltrados"
              :key="comunicado._id"
              class="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col opacity-90"
            >
              <div
                v-if="comunicado.imagen?.url"
                class="relative w-full aspect-[16/9] bg-gray-100 cursor-pointer"
                @click="abrirDetalle(comunicado)"
              >
                <img
                  :src="comunicado.imagen.url"
                  :alt="comunicado.imagen.alt || comunicado.titulo"
                  class="w-full h-full object-cover grayscale-[30%]"
                  @error="(e) => (e.target.style.display = 'none')"
                />
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-gray-600 text-white shadow-md">
                  Finalizado
                </span>
              </div>

              <div class="p-6 flex-1 flex flex-col">
                <span class="text-xs text-gray-400 mb-2">
                  {{ formatearFecha(comunicado.fechaLanzamiento) }}
                  <span v-if="comunicado.fechaDesactivacion" class="ml-1">
                    → {{ formatearFecha(comunicado.fechaDesactivacion) }}
                  </span>
                </span>

                <h3
                  class="text-lg font-bold text-gray-700 mb-2 line-clamp-2 cursor-pointer hover:text-senado-primary transition-colors"
                  @click="abrirDetalle(comunicado)"
                >
                  {{ comunicado.titulo }}
                </h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {{ comunicado.contenido }}
                </p>

                <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <button
                    @click="abrirDetalle(comunicado)"
                    class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium transition-colors"
                  >
                    Leer más →
                  </button>
                  <a
                    v-if="comunicado.pdf?.url"
                    :href="comunicado.pdf.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1 text-gray-500 hover:text-senado-primary transition-colors text-sm"
                  >
                    <Icon name="material-symbols:file-download" class="text-lg" />
                    PDF
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="space-y-4">
            <article
              v-for="comunicado in comunicadosExpiradosFiltrados"
              :key="comunicado._id"
              class="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 opacity-90"
            >
              <div class="flex flex-col md:flex-row md:items-center gap-4">
                <div
                  v-if="comunicado.imagen?.url"
                  class="w-full md:w-24 h-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                  @click="abrirDetalle(comunicado)"
                >
                  <img
                    :src="comunicado.imagen.url"
                    :alt="comunicado.imagen.alt || comunicado.titulo"
                    class="w-full h-full object-cover grayscale-[30%]"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1 flex-wrap">
                    <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      Finalizado
                    </span>
                    <span class="text-xs text-gray-400">
                      {{ formatearFecha(comunicado.fechaLanzamiento) }}
                    </span>
                  </div>
                  <h3
                    class="text-lg font-bold text-gray-700 truncate cursor-pointer hover:text-senado-primary transition-colors"
                    @click="abrirDetalle(comunicado)"
                  >
                    {{ comunicado.titulo }}
                  </h3>
                  <p class="text-gray-600 text-sm line-clamp-2">
                    {{ comunicado.contenido }}
                  </p>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0">
                  <button
                    @click="abrirDetalle(comunicado)"
                    class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Ver
                  </button>
                  <a
                    v-if="comunicado.pdf?.url"
                    :href="comunicado.pdf.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 text-gray-500 hover:text-senado-primary transition-colors"
                  >
                    <Icon name="material-symbols:file-download" class="text-xl" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Sin resultados -->
        <div v-if="totalComunicados === 0" class="text-center py-16 bg-white rounded-xl shadow">
          <Icon name="material-symbols:search-off" class="text-6xl text-gray-300 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            No hay comunicados disponibles
          </h3>
          <p class="text-gray-500">
            Vuelve más tarde o consulta otras secciones del portal
          </p>
        </div>

        <div
          v-else-if="comunicadosFiltrados.length === 0"
          class="text-center py-16 bg-white rounded-xl shadow"
        >
          <Icon name="material-symbols:search-off" class="text-6xl text-gray-300 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            No se encontraron comunicados
          </h3>
          <p class="text-gray-500">
            Intenta con otros filtros o términos de búsqueda
          </p>
          <button
            @click="limpiarFiltros"
            class="mt-4 px-4 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </template>
    </div>

    <!-- ============================================ -->
    <!-- MODAL DE DETALLE                              -->
    <!-- ============================================ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="comunicadoSeleccionado"
          class="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          @click.self="cerrarDetalle"
        >
          <!-- Overlay: click aquí cierra -->
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="cerrarDetalle"></div>

          <!-- Contenido del modal: NO cierra al click dentro -->
          <div
            class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col"
            @click.stop
          >
            <!-- Botón cerrar -->
            <button
              @click="cerrarDetalle"
              class="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110"
              aria-label="Cerrar"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>

            <!-- Scroll único: todo el contenido -->
            <div class="flex-1 overflow-y-auto">
              <!-- IMAGEN GRANDE Y CLICKEABLE -->
              <div
                v-if="comunicadoSeleccionado.imagen?.url"
                class="relative w-full bg-gray-900 flex items-center justify-center cursor-zoom-in group"
                style="min-height: 300px; max-height: 65vh;"
                @click="abrirLightbox"
              >
                <img
                  :src="comunicadoSeleccionado.imagen.url"
                  :alt="comunicadoSeleccionado.imagen.alt || comunicadoSeleccionado.titulo"
                  class="w-full h-auto max-h-[65vh] object-contain block"
                  @error="(e) => (e.target.style.display = 'none')"
                />

                <!-- Hint: click para ampliar -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 pointer-events-none">
                  <div class="bg-black/70 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Icon name="mdi:magnify-plus" class="w-5 h-5" />
                    Click para ampliar
                  </div>
                </div>

                <!-- Botón descargar imagen -->
                <a
                  :href="comunicadoSeleccionado.imagen.url"
                  :download="nombreDescargaComunicado"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="absolute top-3 right-16 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/70 hover:bg-[#611717] text-white text-sm font-medium transition-all hover:scale-105"
                  title="Descargar imagen"
                  @click.stop
                >
                  <Icon name="mdi:download" class="w-4 h-4" />
                  <span class="hidden sm:inline">Descargar</span>
                </a>
              </div>

              <!-- CONTENIDO -->
              <div class="p-6 sm:p-8">
                <div class="flex items-center gap-3 mb-3 flex-wrap">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="comunicadoSeleccionado.estado === 'activo'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'"
                  >
                    {{ comunicadoSeleccionado.estado === 'activo' ? '● Vigente' : 'Finalizado' }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ formatearFecha(comunicadoSeleccionado.fechaLanzamiento) }}
                  </span>
                </div>

                <h2 class="text-2xl font-bold text-[#611717] mb-4">
                  {{ comunicadoSeleccionado.titulo }}
                </h2>

                <div class="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ comunicadoSeleccionado.contenido }}
                </div>
              </div>
            </div>

            <!-- Footer con PDF -->
            <div v-if="comunicadoSeleccionado.pdf?.url" class="flex-shrink-0 border-t p-4 bg-gray-50">
              <a
                :href="comunicadoSeleccionado.pdf.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-lg bg-[#611717] text-white font-medium hover:bg-[#3a060d] transition-colors"
              >
                <Icon name="mdi:file-pdf-box" class="w-5 h-5" />
                Ver PDF adjunto
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ============================================ -->
    <!-- LIGHTBOX CON ZOOM Y ARRASTRE                  -->
    <!-- ============================================ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxAbierto"
          class="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center p-4"
          @click.self="cerrarLightbox"
        >
          <!-- Botón cerrar -->
          <button
            @click="cerrarLightbox"
            class="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
            aria-label="Cerrar imagen"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>

          <!-- Botón descargar -->
          <a
            :href="comunicadoSeleccionado?.imagen?.url"
            :download="nombreDescargaComunicado"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute top-4 right-20 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
            title="Descargar imagen"
          >
            <Icon name="mdi:download" class="w-6 h-6" />
          </a>

          <!-- Imagen con zoom y arrastre -->
          <div
            class="w-full h-full flex items-center justify-center overflow-hidden"
            @mousedown="iniciarArrastre"
            @mousemove="moverArrastre"
            @mouseup="terminarArrastre"
            @mouseleave="terminarArrastre"
            @wheel.prevent="manejarZoom"
            :class="{ 'cursor-grab': zoom > 1, 'cursor-grabbing': isDragging }"
          >
            <img
              :src="comunicadoSeleccionado?.imagen?.url"
              :alt="comunicadoSeleccionado?.imagen?.alt || comunicadoSeleccionado?.titulo"
              class="object-contain select-none"
              :style="{
                maxWidth: '90vw',
                maxHeight: '80vh',
                transform: `scale(${zoom}) translate(${posX}px, ${posY}px)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }"
              draggable="false"
              @click.stop
            />
          </div>

          <!-- Controles de zoom -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-full border border-white/15">
            <button
              @click="zoomOut"
              class="text-white hover:text-senado-gold p-1.5 rounded-full hover:bg-white/10"
              title="Alejar"
            >
              <Icon name="mdi:minus" class="w-5 h-5" />
            </button>
            <span class="text-white text-sm font-mono min-w-[50px] text-center">
              {{ Math.round(zoom * 100) }}%
            </span>
            <button
              @click="zoomIn"
              class="text-white hover:text-senado-gold p-1.5 rounded-full hover:bg-white/10"
              title="Acercar"
            >
              <Icon name="mdi:plus" class="w-5 h-5" />
            </button>
            <div class="w-px h-4 bg-white/20"></div>
            <button
              @click="resetZoom"
              class="text-white/70 hover:text-white text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20"
              title="Restablecer"
            >
              Reset
            </button>
          </div>

          <!-- Hint de arrastre -->
          <div
            v-if="zoom > 1"
            class="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-full"
          >
            <Icon name="mdi:cursor-move" class="w-4 h-4" />
            Arrastra para mover
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useComunicadosStore } from '~/stores/comunicados'

// ==========================================
// LAYOUT
// ==========================================
definePageMeta({ layout: 'default' })

// ==========================================
// STORE
// ==========================================
const comunicadosStore = useComunicadosStore()
const { comunicado: comunicadoActivo, loading, hasData } = storeToRefs(comunicadosStore)

// ==========================================
// ESTADO LOCAL
// ==========================================
const vista = ref('grid')
const filtroActivo = ref('todos')
const busqueda = ref('')
const comunicadoSeleccionado = ref(null)

// Lista completa (activos + expirados)
const comunicadosActivos = ref([])
const comunicadosExpirados = ref([])
const cargandoListado = ref(false)

// 🔥 Guardar posición del scroll antes de abrir el modal
const scrollGuardado = ref(0)

// 🔥 Estado del lightbox
const lightboxAbierto = ref(false)
const zoom = ref(1)
const posX = ref(0)
const posY = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const lastX = ref(0)
const lastY = ref(0)

// ==========================================
// CONFIGURACIÓN
// ==========================================
const API_BASE = 'https://demoback.senado.gob.bo/api'

const filtros = [
  { value: 'todos', label: 'Todos' },
  { value: 'activos', label: '🟢 Vigentes' },
  { value: 'expirados', label: '⚪ Anteriores' },
]

// ==========================================
// COMPUTED
// ==========================================

const showSkeleton = computed(() => {
  return (loading.value || cargandoListado.value) && !hasData.value && comunicadosActivos.value.length === 0
})

const totalComunicados = computed(() => {
  return comunicadosActivos.value.length + comunicadosExpirados.value.length
})

const todosLosComunicados = computed(() => {
  return [...comunicadosActivos.value, ...comunicadosExpirados.value]
})

const aplicarFiltros = (lista) => {
  let resultado = lista

  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase().trim()
    resultado = resultado.filter(c =>
      c.titulo?.toLowerCase().includes(q) ||
      c.contenido?.toLowerCase().includes(q)
    )
  }

  return resultado
}

const comunicadosActivosFiltrados = computed(() => {
  if (filtroActivo.value !== 'todos' && filtroActivo.value !== 'activos') {
    return []
  }
  return aplicarFiltros(comunicadosActivos.value)
})

const comunicadosExpiradosFiltrados = computed(() => {
  if (filtroActivo.value !== 'todos' && filtroActivo.value !== 'expirados') {
    return []
  }
  return aplicarFiltros(comunicadosExpirados.value)
})

const comunicadosFiltrados = computed(() => {
  return [...comunicadosActivosFiltrados.value, ...comunicadosExpiradosFiltrados.value]
})

const contarPorFiltro = (filtro) => {
  if (filtro === 'todos') return totalComunicados.value
  if (filtro === 'activos') return aplicarFiltros(comunicadosActivos.value).length
  if (filtro === 'expirados') return aplicarFiltros(comunicadosExpirados.value).length
  return 0
}

// Nombre de archivo para descargar la imagen
const nombreDescargaComunicado = computed(() => {
  if (!comunicadoSeleccionado.value) return 'comunicado.jpg'

  const titulo = comunicadoSeleccionado.value.titulo || 'comunicado'
  const slug = titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60)

  const url = comunicadoSeleccionado.value.imagen?.url || ''
  const extMatch = url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i)
  const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg'

  return `${slug}.${ext}`
})

// ==========================================
// MÉTODOS
// ==========================================
const formatearFecha = (fecha) => {
  if (!fecha) return 'Sin fecha'
  try {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-BO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return 'Sin fecha'
  }
}

const alternarVista = () => {
  vista.value = vista.value === 'grid' ? 'lista' : 'grid'
}

// 🔥 ABRIR modal: guardar scroll y bloquear body
const abrirDetalle = (comunicado) => {
  scrollGuardado.value = window.scrollY || window.pageYOffset || 0
  console.log('📌 [Scroll] Guardado en:', scrollGuardado.value)

  comunicadoSeleccionado.value = comunicado
  document.body.style.overflow = 'hidden'
}

// 🔥 CERRAR modal: restaurar scroll y body
const cerrarDetalle = () => {
  // Si el lightbox está abierto, cerrarlo primero
  if (lightboxAbierto.value) {
    cerrarLightbox()
    return
  }

  comunicadoSeleccionado.value = null
  document.body.style.overflow = ''

  requestAnimationFrame(() => {
    window.scrollTo({
      top: scrollGuardado.value,
      behavior: 'instant'
    })
    console.log('📍 [Scroll] Restaurado a:', scrollGuardado.value)
  })
}

const limpiarFiltros = () => {
  filtroActivo.value = 'todos'
  busqueda.value = ''
}

// ==========================================
// LIGHTBOX
// ==========================================
const abrirLightbox = () => {
  lightboxAbierto.value = true
  zoom.value = 1
  posX.value = 0
  posY.value = 0
  lastX.value = 0
  lastY.value = 0
}

const cerrarLightbox = () => {
  lightboxAbierto.value = false
  isDragging.value = false
  zoom.value = 1
  posX.value = 0
  posY.value = 0
}

const zoomIn = () => {
  if (zoom.value < 3) {
    zoom.value = Math.min(zoom.value + 0.2, 3)
  }
}

const zoomOut = () => {
  if (zoom.value > 0.5) {
    zoom.value = Math.max(zoom.value - 0.2, 0.5)
    if (zoom.value <= 1) {
      posX.value = 0
      posY.value = 0
      lastX.value = 0
      lastY.value = 0
    }
  }
}

const resetZoom = () => {
  zoom.value = 1
  posX.value = 0
  posY.value = 0
  lastX.value = 0
  lastY.value = 0
}

const manejarZoom = (event) => {
  const delta = event.deltaY > 0 ? -0.15 : 0.15
  const nuevoZoom = Math.min(Math.max(zoom.value + delta, 0.5), 3)
  if (nuevoZoom <= 1) {
    posX.value = 0
    posY.value = 0
    lastX.value = 0
    lastY.value = 0
  }
  zoom.value = nuevoZoom
}

const iniciarArrastre = (event) => {
  if (zoom.value <= 1) return
  isDragging.value = true
  startX.value = event.clientX
  startY.value = event.clientY
  lastX.value = posX.value
  lastY.value = posY.value
  event.preventDefault()
}

const moverArrastre = (event) => {
  if (!isDragging.value || zoom.value <= 1) return
  const deltaX = event.clientX - startX.value
  const deltaY = event.clientY - startY.value
  const maxOffset = 300 * zoom.value
  posX.value = Math.min(Math.max(lastX.value + deltaX, -maxOffset), maxOffset)
  posY.value = Math.min(Math.max(lastY.value + deltaY, -maxOffset), maxOffset)
}

const terminarArrastre = () => {
  isDragging.value = false
}

// ==========================================
// CARGA DE DATOS
// ==========================================
const cargarComunicadosActivos = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(`${API_BASE}/comunicados`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) return

    const result = await response.json()
    if (result.success && result.data?.comunicados) {
      comunicadosActivos.value = result.data.comunicados.filter(
        c => c.estado === 'activo'
      )
      console.log(`✅ [Comunicados] ${comunicadosActivos.value.length} activos`)
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn('⚠️ [Comunicados] No se pudieron cargar los activos:', err.message)
    }
  }
}

const cargarComunicadosExpirados = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(`${API_BASE}/comunicados/expirados`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) return

    const result = await response.json()
    if (result.success && result.data) {
      comunicadosExpirados.value = result.data
      console.log(`✅ [Comunicados] ${comunicadosExpirados.value.length} expirados`)
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn('⚠️ [Comunicados] No se pudieron cargar los expirados:', err.message)
    }
  }
}

const cargarTodo = async () => {
  cargandoListado.value = true

  try {
    await Promise.allSettled([
      cargarComunicadosActivos(),
      cargarComunicadosExpirados(),
    ])
  } finally {
    cargandoListado.value = false
  }
}

// ==========================================
// TECLADO: ESC para cerrar
// ==========================================
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (lightboxAbierto.value) {
      cerrarLightbox()
    } else if (comunicadoSeleccionado.value) {
      cerrarDetalle()
    }
  }
}

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  comunicadosStore.ensureLoaded()
  cargarTodo()

  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>