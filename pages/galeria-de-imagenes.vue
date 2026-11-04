<template>
  <div class="min-h-screen bg-gray-50">
    <!-- ============================================ -->
    <!-- TÍTULO CON ESTILO SENADO -->
    <!-- ============================================ -->
    <div class="relative w-full" ref="topSection">
      <div class="relative w-full bg-white shadow-sm">
        <!-- Líneas animadas estilo Senado -->
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
        
        <div class="py-6 md:py-8 text-center px-4">
          <h1 class="text-2xl md:text-4xl text-senado-primary font-bold tracking-tight">
            Galería Institucional
          </h1>
        </div>
      </div>
      
      <div class="text-center mt-8 mb-4">

      </div>
    </div>

    <!-- Contenido principal -->
    <div class="container mx-auto px-4 pb-16 max-w-7xl">
      <!-- Grid de imágenes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div 
          v-for="(img, index) in images" 
          :key="index"
          class="gallery-item cursor-pointer group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          @click="openImageModal(index)"
        >
          <div class="relative overflow-hidden" style="aspect-ratio: 4/3">
            <img 
              :src="`/galeria/${img.filename}`"
              alt="Imagen de la galería"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <!-- Overlay oscuro al hacer hover -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <!-- Ícono de lupa -->
              <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- VISOR PROFESIONAL (LIGHTBOX)                 -->
    <!-- ============================================ -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="showImageModal" 
          class="fixed inset-0 z-[100] bg-black/95 flex flex-col"
        >
          <!-- Barra superior -->
          <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
            <div class="text-white/80 font-medium text-sm md:text-base">
              {{ currentImageIndex + 1 }} / {{ totalImages }}
            </div>
            <button 
              @click.stop="closeImageViewer"
              class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Botón Anterior -->
          <button 
            @click.stop="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-3 md:p-4 transition-all z-20 backdrop-blur-sm"
            :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }"
            :disabled="currentImageIndex === 0"
          >
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Contenedor de la Imagen -->
          <div 
            class="flex-1 overflow-hidden flex items-center justify-center relative cursor-grab active:cursor-grabbing"
            @wheel.prevent="handleWheel"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
            @touchstart="handleTouchStart"
            @touchmove.prevent="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <img 
              :src="`/galeria/${currentImage.filename}`"
              alt="Imagen ampliada"
              class="max-w-full max-h-full object-contain select-none pointer-events-none transition-transform duration-75 ease-out"
              :style="{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: scale > 1 ? 'grab' : 'default'
              }"
              @dragstart.prevent
            />
          </div>

          <!-- Botón Siguiente -->
          <button 
            @click.stop="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-3 md:p-4 transition-all z-20 backdrop-blur-sm"
            :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === totalImages - 1 }"
            :disabled="currentImageIndex === totalImages - 1"
          >
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Controles Inferiores (Zoom) -->
          <div class="absolute bottom-0 left-0 right-0 p-6 flex justify-center items-center gap-4 z-20 bg-gradient-to-t from-black/60 to-transparent">
            <button @click.stop="zoomOut" class="text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all" title="Alejar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
            </button>
            <div class="text-white/80 text-sm font-medium w-12 text-center">{{ Math.round(scale * 100) }}%</div>
            <button @click.stop="zoomIn" class="text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all" title="Acercar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            </button>
            <button @click.stop="resetZoom" class="text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all ml-2" title="Restablecer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const topSection = ref(null)

// Arreglo estático con las 6 imágenes
const images = ref([
  { filename: 'img1.jpeg' },
  { filename: 'img2.jpeg' },
  { filename: 'img3.jpeg' },
  { filename: 'img4.jpeg' },
  { filename: 'img5.jpeg' },
  { filename: 'img6.jpeg' }
])

const totalImages = computed(() => images.value.length)

// Variables del Modal
const showImageModal = ref(false)
const currentImageIndex = ref(0)
const currentImage = computed(() => images.value[currentImageIndex.value] || {})

// Variables de Zoom y Paneo (Arrastre)
const scale = ref(1)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

// Variables para gestos táctiles
let touchStartDist = 0
let touchStartScale = 1

const openImageModal = (index) => {
  currentImageIndex.value = index
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
  resetZoom()
}

const closeImageViewer = () => {
  showImageModal.value = false
  document.body.style.overflow = ''
  resetZoom()
}

const nextImage = () => {
  if (currentImageIndex.value < totalImages.value - 1) {
    currentImageIndex.value++
    resetZoom()
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    resetZoom()
  }
}

// ============================================
// CONTROLES DE ZOOM
// ============================================
const zoomIn = () => {
  if (scale.value < 4) scale.value += 0.5
}

const zoomOut = () => {
  if (scale.value > 1) {
    scale.value -= 0.5
    if (scale.value < 1) scale.value = 1
    if (scale.value === 1) resetPosition()
  }
}

const resetZoom = () => {
  scale.value = 1
  resetPosition()
}

const resetPosition = () => {
  position.value = { x: 0, y: 0 }
}

// Zoom con rueda del ratón
const handleWheel = (e) => {
  if (e.deltaY < 0) {
    if (scale.value < 4) scale.value += 0.25
  } else {
    if (scale.value > 1) {
      scale.value -= 0.25
      if (scale.value < 1) {
        scale.value = 1
        resetPosition()
      }
    }
  }
}

// Arrastre con el ratón (Paneo)
const handleMouseDown = (e) => {
  if (scale.value > 1) {
    isDragging.value = true
    dragStart.value = { x: e.clientX - position.value.x, y: e.clientY - position.value.y }
  }
}

const handleMouseMove = (e) => {
  if (isDragging.value && scale.value > 1) {
    position.value = {
      x: e.clientX - dragStart.value.x,
      y: e.clientY - dragStart.value.y
    }
  }
}

const handleMouseUp = () => {
  isDragging.value = false
}

// Gestos táctiles para móviles
const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    // Pinch to zoom
    touchStartDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    touchStartScale = scale.value
  } else if (e.touches.length === 1 && scale.value > 1) {
    // Arrastre
    isDragging.value = true
    dragStart.value = { 
      x: e.touches[0].clientX - position.value.x, 
      y: e.touches[0].clientY - position.value.y 
    }
  }
}

const handleTouchMove = (e) => {
  if (e.touches.length === 2) {
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    )
    const newScale = touchStartScale * (dist / touchStartDist)
    scale.value = Math.min(Math.max(1, newScale), 4) // Límite entre 1 y 4
  } else if (e.touches.length === 1 && isDragging.value && scale.value > 1) {
    position.value = {
      x: e.touches[0].clientX - dragStart.value.x,
      y: e.touches[0].clientY - dragStart.value.y
    }
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
}

// ============================================
// EVENTOS DE TECLADO Y CICLO DE VIDA
// ============================================
const handleKeydown = (e) => {
  if (!showImageModal.value) return
  switch(e.key) {
    case 'ArrowLeft': prevImage(); break
    case 'ArrowRight': nextImage(); break
    case 'Escape': closeImageViewer(); break
    case '+': zoomIn(); break
    case '-': zoomOut(); break
  }
}

const forceScrollToTop = () => {
  if (process.client) {
    window.scrollTo(0, 0)
  }
}

// Resetea el zoom al cambiar de imagen
watch(currentImageIndex, () => {
  resetZoom()
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  forceScrollToTop()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Animación de entrada del modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gallery-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes slide-right {
  0% { width: 0%; left: 0; }
  50% { width: 100%; left: 0; }
  100% { width: 0%; left: 100%; }
}

@keyframes slide-left {
  0% { width: 0%; right: 0; }
  50% { width: 100%; right: 0; }
  100% { width: 0%; right: 100%; }
}

@keyframes slide-down {
  0% { height: 0%; top: 0; }
  50% { height: 100%; top: 0; }
  100% { height: 0%; top: 100%; }
}

@keyframes slide-up {
  0% { height: 0%; bottom: 0; }
  50% { height: 100%; bottom: 0; }
  100% { height: 0%; bottom: 100%; }
}

.animate-slide-right { animation: slide-right 4s ease-in-out infinite; }
.animate-slide-left { animation: slide-left 4s ease-in-out infinite; }
.animate-slide-down { animation: slide-down 4s ease-in-out infinite; }
.animate-slide-up { animation: slide-up 4s ease-in-out infinite; }
</style>