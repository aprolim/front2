<template>
  <div class="min-h-screen bg-gray-100">
    <!-- ============================================ -->
    <!-- TÍTULO CON ESTILO SENADO -->
    <!-- ============================================ -->
    <div class="relative w-full" ref="topSection">
      <div class="relative w-full">
        <!-- Líneas animadas estilo Senado -->
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right" style="width: 100%;"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left" style="width: 100%;"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down" style="height: 100%;"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up" style="height: 100%;"></div>
        
        <div class="py-[0.8vw] text-center">
          <h1 class="text-[3vw] text-senado-primary font-semibold">
            Galería Institucional
          </h1>
        </div>
      </div>
      
      <p class="text-gray-600 text-lg text-center max-w-2xl mx-auto mt-6 px-4">
        Conoce la historia y el patrimonio del Senado de Bolivia
      </p>
      <p class="text-gray-500 text-sm text-center mt-2 px-4">
        {{ totalImages }} imágenes | Página {{ currentPage }} de {{ totalPages }}
        <span v-if="!useApi" class="ml-2 text-xs text-gray-400">(datos locales)</span>
      </p>
    </div>

    <!-- Contenido principal -->
    <div class="container mx-auto px-4 py-8">
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-600">Cargando galería...</p>
      </div>

      <!-- Grid de imágenes -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        <div 
          v-for="img in paginatedImages" 
          :key="img.id"
          class="gallery-item cursor-pointer group"
          @click="openImageModal(img)"
        >
          <div class="relative overflow-hidden rounded-xl shadow-lg bg-gray-200" style="aspect-ratio: 4/3">
            <img 
              :src="`/G-Institucional/${img.id}.webp`"
              :alt="img.description"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              @error="handleImageError"
            />
            
            <div class="absolute bottom-0 left-0 right-0 bg-senado-gold-dark backdrop-blur-sm py-2 px-2">
              <p class="text-senado-primary text-xs md:text-sm font-medium line-clamp-2 text-center">
                {{ img.description }}
              </p>
            </div>

            <div class="absolute inset-0 border-2 border-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute inset-[3px] border border-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-senado-primary-light text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C12F2F] transition-colors text-sm"
        >
          ← Anterior
        </button>
        
        <div class="flex gap-1 mx-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 text-sm font-medium"
            :class="currentPage === page 
              ? 'bg-senado-primary-light text-white scale-105 shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-senado-primary-light text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C12F2F] transition-colors text-sm"
        >
          Siguiente →
        </button>
      </div>

      <p class="text-center text-gray-500 text-sm mt-4">
        Página {{ currentPage }} de {{ totalPages }}
      </p>
    </div>

    <!-- ============================================ -->
    <!-- MODAL DE IMAGEN AMPLIADA                     -->
    <!-- ============================================ -->
    <Teleport to="body">
      <!-- Fondo del modal -->
      <div 
        v-if="showImageModal" 
        class="fixed inset-0 z-[100] backdrop-blur-lg flex items-center justify-center"
        @click="closeImageViewer"
      >
        <!-- Contenedor del contenido - click aquí CIERRA -->
        <div 
          class="relative w-full h-full flex flex-col items-center justify-center p-4" 
          @click="closeImageViewer"
        >
          <button 
            @click.stop="closeImageViewer"
            class="absolute top-4 right-4 text-white hover:text-[#E03636] transition-colors text-3xl z-10"
          >
            ✕
          </button>

          <button 
            @click.stop="prevImage"
            class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-3xl md:text-5xl z-10"
          >
            ‹
          </button>

          <!-- Imagen - click aquí NO cierra -->
          <div class="relative max-w-[90vw] max-h-[70vh] flex items-center justify-center" @click.stop>
            <img 
              :src="`/G-Institucional/${currentImage?.id}.webp`"
              :alt="currentImage?.description"
              class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <!-- Texto con efecto cometa - click aquí NO cierra -->
          <div class="relative w-full max-w-2xl px-4 mt-6" @click.stop>
            <div class="relative rounded-2xl p-[4px] bg-transparent">
              <svg class="absolute inset-0 w-full h-full pointer-events-none z-20" style="overflow: visible;">
                <defs>
                  <linearGradient id="comet-grad-modal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#e3d194" stop-opacity="1" />
                    <stop offset="30%" stop-color="#e3d194" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="#e3d194" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <rect 
                  x="4" y="4" 
                  width="calc(100% - 8px)" 
                  height="calc(100% - 8px)" 
                  rx="16" ry="16" 
                  fill="none" 
                  stroke="url(#comet-grad-modal)" 
                  stroke-width="4" 
                  stroke-dasharray="25 75"
                  class="comet-line-1"
                />
                <rect 
                  x="4" y="4" 
                  width="calc(100% - 8px)" 
                  height="calc(100% - 8px)" 
                  rx="16" ry="16" 
                  fill="none" 
                  stroke="url(#comet-grad-modal)" 
                  stroke-width="4" 
                  stroke-dasharray="25 75"
                  class="comet-line-2"
                />
              </svg>
              
              <div class="relative z-10 bg-senado-gold-dark rounded-2xl p-4 md:p-6 text-center">
                <p class="text-senado-primary text-base md:text-xl font-[600]">
                  {{ currentImage?.description }}
                </p>
              </div>
            </div>
          </div>

          <button 
            @click.stop="nextImage"
            class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-3xl md:text-5xl z-10"
          >
            ›
          </button>

          <p class="text-white/50 text-sm mt-4" @click.stop>
            {{ currentImageIndex + 1 }} / {{ totalImages }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGaleria } from '~/composables/useGaleria'

const router = useRouter()
const route = useRoute()
const { images: allImages, loading, fetchImages, USE_API } = useGaleria()

const topSection = ref(null)

const forceScrollToTop = () => {
  if (process.client) {
    window.scrollTo(0, 0)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    document.body.scrollIntoView({ block: 'start', behavior: 'instant' })
    
    if (topSection.value) {
      topSection.value.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
  }
}

const totalImages = computed(() => allImages.value.length)
const useApi = computed(() => USE_API)

const itemsPerPage = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalImages.value / itemsPerPage))

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allImages.value.slice(start, end)
})

const visiblePages = computed(() => {
  const maxVisible = 7
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  forceScrollToTop()
}

const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/placeholder.jpg'
}

const showImageModal = ref(false)
const currentImage = ref(null)
const currentImageIndex = ref(0)

const openImageModal = (image) => {
  currentImage.value = image
  currentImageIndex.value = image.id - 1
  showImageModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageViewer = () => {
  showImageModal.value = false
  currentImage.value = null
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < totalImages.value - 1) {
    currentImageIndex.value++
    currentImage.value = allImages.value[currentImageIndex.value]
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = allImages.value[currentImageIndex.value]
  }
}

const handleKeydown = (e) => {
  if (!showImageModal.value) return
  switch(e.key) {
    case 'ArrowLeft': prevImage(); break
    case 'ArrowRight': nextImage(); break
    case 'Escape': closeImageViewer(); break
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  forceScrollToTop()
  await fetchImages()
  console.log(`📸 Galería cargada: ${totalImages.value} imágenes | Usando API: ${USE_API}`)
  nextTick(() => { forceScrollToTop() })
  setTimeout(() => { forceScrollToTop() }, 50)
  setTimeout(() => { forceScrollToTop() }, 200)
})

if (process.client) {
  router.afterEach((to) => {
    if (to.path === '/museo/galeria') {
      forceScrollToTop()
    }
  })
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
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

.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.gallery-item {
  transition: transform 0.2s ease;
}

.gallery-item:hover {
  transform: translateY(-3px);
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

/* ============================================ */
/* EFECTO COMETA                                */
/* ============================================ */
.comet-line-1 {
  animation: comet1 8s linear infinite;
}

.comet-line-2 {
  animation: comet2 8s linear infinite;
}

@keyframes comet1 {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -100; }
}

@keyframes comet2 {
  0% { stroke-dashoffset: -50; }
  100% { stroke-dashoffset: -150; }
}
</style>