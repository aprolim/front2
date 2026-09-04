<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-6xl">

      <!-- Estado de carga -->
      <div v-if="pending && !noticiaData?.noticia" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando noticia...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="errorMsg || error" class="text-center py-12 bg-white rounded-xl">
        <p class="text-red-600 mb-4">{{ errorMsg || error?.message || 'Error al cargar la noticia' }}</p>
        <button @click="recargar" class="bg-[#611717] text-white px-4 py-2 rounded-lg hover:bg-[#3a060d] transition">Reintentar</button>
      </div>

      <!-- Estado de contenido vacío -->
      <div v-else-if="noticiaData?.noticia && !noticiaValida" class="text-center py-12 bg-white rounded-xl">
        <p class="text-red-600 mb-4">⚠️ El contenido de esta noticia no está disponible</p>
        <p class="text-gray-500 mb-6">Puede que la noticia haya sido eliminada o esté incompleta.</p>
        <button @click="volverAtras" class="bg-[#611717] text-white px-6 py-2 rounded-lg hover:bg-[#3a060d] transition">Volver</button>
      </div>

      <!-- Noticia encontrada y su contenido -->
      <template v-else-if="noticiaData?.noticia && noticiaValida">
        <article class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- TITULO -->
          <div class="p-6 md:p-8 pb-0">
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="tag-noticia">{{ noticiaData.noticia.category || noticiaData.noticia.categoria || 'Noticia' }}</span>
              <span v-if="noticiaData.noticia.category === 'legislacion'" class="tag-importante">★ Importante</span>
            </div>
            <h1 class="text-[3vw] font-bold text-gray-900 leading-tight title-main">
              <span v-html="formatTitleWithColors(noticiaData.noticia.title)"></span>
            </h1>
            <p class="text-gray-600 text-[1.2vw] mt-4 leading-relaxed excerpt-text">
              {{ noticiaData.noticia.excerpt }}
            </p>
          </div>

          <!-- CARRUSEL -->
          <div class="px-6 md:px-8 mt-6 mb-4">
            <div class="relative">
              <div class="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl" style="height: 500px;">
                <div class="flex h-full">
                  <!-- Imagen izquierda (peek) -->
                  <div class="flex-shrink-0 transition-all duration-500 ease-out overflow-hidden h-full cursor-pointer"
                       :style="{ width: `${peekLeftWidth}%` }"
                       @click="anteriorImagen">
                    <div class="relative w-full h-full">
                      <SafeImage 
                        :src="imagenAnterior?.url || imagenActual?.url"
                        :alt="imagenAnterior?.alt || 'Imagen anterior'"
                        image-class="w-full h-full object-cover"
                        :max-retries="5"
                        :persistent="true"
                      />
                      <div class="absolute inset-0 bg-black/30"></div>
                    </div>
                  </div>

                  <!-- Imagen central -->
                  <div class="flex-shrink-0 transition-all duration-500 h-full"
                       :style="{ width: `${imagenActualWidth}%` }">
                    <div class="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      <SafeImage 
                        :src="imagenActual?.url"
                        :alt="imagenActual?.alt"
                        image-class="w-full h-full object-contain"
                        :max-retries="5"
                        :persistent="true"
                        priority="high"
                      />
                    </div>
                  </div>

                  <!-- Imagen derecha (peek) -->
                  <div class="flex-shrink-0 transition-all duration-500 overflow-hidden h-full cursor-pointer"
                       :style="{ width: `${peekRightWidth}%` }"
                       @click="siguienteImagen">
                    <div class="relative w-full h-full">
                      <SafeImage 
                        :src="imagenSiguiente?.url || imagenActual?.url"
                        :alt="imagenSiguiente?.alt || 'Imagen siguiente'"
                        image-class="w-full h-full object-cover"
                        :max-retries="5"
                        :persistent="true"
                      />
                      <div class="absolute inset-0 bg-black/30"></div>
                    </div>
                  </div>
                </div>

                <!-- Botones de navegación -->
                <button 
                  v-if="imagenesCarrusel.length > 1"
                  @click="anteriorImagen"
                  class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#611717] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>

                <button 
                  v-if="imagenesCarrusel.length > 1"
                  @click="siguienteImagen"
                  class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#611717] text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>

                <!-- Contador de imágenes -->
                <div v-if="imagenesCarrusel.length > 1" class="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm font-medium z-10">
                  {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(imagenesCarrusel.length).padStart(2, '0') }}
                </div>
              </div>

              <!-- TEXTO DEBAJO DE LA IMAGEN -->
              <div class="text-center mt-3">
                <p class="carousel-caption">
                  {{ imagenActual?.caption || imagenActual?.alt || 'Sin descripción' }}
                </p>
              </div>

              <!-- Miniaturas -->
              <div v-if="imagenesCarrusel.length > 1" class="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                <button
                  v-for="(img, idx) in imagenesCarrusel"
                  :key="idx"
                  @click="currentIndex = idx"
                  class="relative flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden"
                  :class="currentIndex === idx ? 'ring-2 ring-[#611717] scale-105' : 'opacity-60 hover:opacity-100'"
                  style="width: 80px; height: 60px;"
                >
                  <img 
                    :src="img.url" 
                    :alt="`Miniatura ${idx + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- REDES SOCIALES -->
          <div class="px-6 md:px-8 mb-6">
            <div class="flex justify-end items-center gap-3 py-2 border-b border-gray-200">
              <span class="compartir-texto">Compartir:</span>
              
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                aria-label="Compartir en Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(noticiaData.noticia.title)}&url=${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                aria-label="Compartir en X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a 
                :href="`https://www.instagram.com/`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>

              <a 
                :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(noticiaData.noticia.title)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                aria-label="Buscar en YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a 
                :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(noticiaData.noticia.title)}%0A%0A${encodeURIComponent(windowLocation)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon"
                aria-label="Compartir en WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- CONTENIDO VARIABLE DE LA NOTICIA -->
          <div class="p-6 md:p-8 pt-0">
            <div 
              v-for="(block, index) in noticiaData.noticia.blocks" 
              :key="index"
              class="block-item"
            >
              <div v-if="block.type === 'paragraph'" class="prose prose-lg max-w-none text-gray-700 mb-6 text-justify">
                <p v-html="block.content"></p>
              </div>

              <div v-else-if="block.type === 'quote'" class="quote-block mt-[3vw] mb-[5vw]">
                <div class="quote-badge">
                  <div class="badge-name">{{ block.author || 'Senado de Bolivia' }}</div>
                  <div class="badge-role">{{ block.role || 'Cámara de Senadores' }}</div>
                </div>
                <div class="quote-container">
                  <div class="quote-content-wrapper">
                    <span class="quote-mark quote-open">“</span>
                    <p class="quote-text">{{ block.content }}</p>
                    <span class="quote-mark quote-close">”</span>
                  </div>
                </div>
              </div>

              <div v-else-if="block.type === 'video'" class="video-block my-8">
                <div class="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe 
                    :src="block.url" 
                    :title="block.title || 'Video'"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p v-if="block.caption" class="video-caption">{{ block.caption }}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- 🔥 SECCIÓN NOTICIAS RELACIONADAS - MEJORADA -->
        <div class="mt-16">
          <div class="text-center mb-8">
            <h2 class="text-[2.5vw] font-bold text-[#611717]">
              Artículos <span class="text-[#8f1522]">Relacionados</span>
            </h2>
            <div class="w-[6vw] h-[0.2vw] bg-[#611717] mx-auto mt-[1vw]"></div>
            <p class="text-gray-500 text-[1vw] mt-[0.5vw]">Noticias que podrían interesarte</p>
          </div>
          
          <div v-if="loadingRelacionadas" class="flex justify-center py-8">
            <div class="inline-block w-8 h-8 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
          </div>

          <div v-else-if="noticiasRelacionadas.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(relacionada, idx) in noticiasRelacionadas" 
                :key="idx"
                class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                @click="verNoticiaRelacionada(relacionada)"
              >
                <div class="relative aspect-[16/9] overflow-hidden">
                  <img 
                    :src="relacionada.featuredImage?.url || relacionada.imagen || '/images/default-news.jpg'" 
                    :alt="limpiarAsteriscos(relacionada.title)"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#611717]/80 to-transparent"></div>
                </div>
                <div class="p-4">
                  <p class="text-xs text-gray-500 mb-1">
                    {{ formatearFecha(relacionada.publishedAt || relacionada.createdAt) }}
                  </p>
                  <h3 class="font-bold text-[1vw] text-gray-900 leading-tight line-clamp-2 group-hover:text-[#611717] transition-colors">
                    <span v-html="formatTitleWithColors(relacionada.title)"></span>
                  </h3>
                  <p class="text-[0.8vw] text-gray-600 mt-2 line-clamp-2">
                    {{ relacionada.excerpt || '' }}
                  </p>
                  <div class="mt-3 flex justify-end">
                    <span class="text-[#611717] text-[0.8vw] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer más
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <p class="text-gray-500">No hay noticias relacionadas disponibles en este momento.</p>
          </div>
        </div>
      </template>

      <!-- Noticia no encontrada -->
      <div v-else-if="!pending && !noticiaData?.noticia && !error" class="text-center py-12 bg-white rounded-xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Noticia no encontrada</h1>
        <p class="text-gray-500 mb-6">Lo sentimos, la noticia que buscas no existe o ha sido removida.</p>
        <NuxtLink to="/noticias" class="inline-block bg-[#611717] text-white px-6 py-3 rounded-lg hover:bg-[#3a060d] transition">
          Ver todas las noticias
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SafeImage from '@/components/SafeImage.vue'

const route = useRoute()
const router = useRouter()

const API_BASE_URL = 'https://demoback.senado.gob.bo/api'

const windowLocation = ref('')
const currentIndex = ref(0)
const imagenesCarrusel = ref([])
const errorMsg = ref(null)

const noticiasRelacionadas = ref([])
const relacionadaCurrentIndex = ref(0)
const loadingRelacionadas = ref(true)

const noticiasPorPagina = 2
const maxRelacionadaIndex = computed(() => Math.max(0, Math.ceil(noticiasRelacionadas.value.length / noticiasPorPagina) - 1))

// ============================================
// useAsyncData - OBTENER LOS DATOS
// ============================================
const { data: noticiaData, pending, error, refresh } = await useAsyncData(
  `noticia-${route.params.slug}`,
  async () => {
    console.log(`🚀 Buscando noticia por slug: ${route.params.slug}`)
    
    try {
      const response = await fetch(`${API_BASE_URL}/content/slug/${route.params.slug}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return { noticia: null, imagenes: [] }
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      const noticia = result.data
      
      console.log(`✅ Noticia encontrada: ${noticia.title}`)
      
      const imagenes = []
      
      if (noticia.featuredImage?.url) {
        imagenes.push({
          url: noticia.featuredImage.url,
          alt: noticia.featuredImage.alt || noticia.title,
          caption: noticia.featuredImage.caption || noticia.featuredImage.name || noticia.title,
          orientation: 'horizontal'
        })
      }
      
      if (noticia.gallery && Array.isArray(noticia.gallery)) {
        noticia.gallery.forEach((img, idx) => {
          imagenes.push({
            url: img.url,
            alt: img.alt || noticia.title,
            caption: img.caption || img.name || `Imagen ${idx + 1}`,
            orientation: 'horizontal'
          })
        })
      }
      
      let blocks = noticia.blocks || []
      if (blocks.length === 0 && noticia.content) {
        blocks = convertirHTMLaBloques(noticia.content)
      }
      
      const noticiaEnriquecida = {
        ...noticia,
        blocks: blocks,
        categoria: noticia.category
      }
      
      return { noticia: noticiaEnriquecida, imagenes }
      
    } catch (err) {
      console.error(`❌ Error: ${err.message}`)
      return { noticia: null, imagenes: [], error: err.message }
    }
  },
  {
    lazy: false,
    server: true,
    default: () => ({ noticia: null, imagenes: [] })
  }
)

// ============================================
// Computed - Verificar si la noticia es válida
// ============================================
const noticiaValida = computed(() => {
  const noticia = noticiaData.value?.noticia
  if (!noticia) return false
  const tieneTitulo = noticia.title && noticia.title.trim().length > 0
  const tieneContenido = noticia.blocks?.length > 0 || noticia.content?.length > 0
  return tieneTitulo && tieneContenido
})

// ============================================
// OBTENER LA IMAGEN PARA OG
// ============================================
const obtenerImagenOG = () => {
  if (imagenesCarrusel.value && imagenesCarrusel.value.length > 0) {
    return imagenesCarrusel.value[0].url
  }
  
  const noticia = noticiaData.value?.noticia
  if (noticia?.featuredImage?.url) {
    return noticia.featuredImage.url
  }
  if (noticia?.gallery && noticia.gallery.length > 0) {
    return noticia.gallery[0].url
  }
  
  return '/images/default-news.jpg'
}

// ============================================
// SEO dinámico
// ============================================
const seoData = computed(() => {
  const noticia = noticiaData.value?.noticia
  if (!noticia) {
    return {
      title: 'Noticia | Senado de Bolivia',
      description: 'Noticias del Senado de Bolivia',
      image: '/images/default-news.jpg'
    }
  }
  
  const tituloLimpio = noticia.title?.replace(/\*/g, '') || 'Noticia'
  const descripcion = noticia.excerpt || noticia.description || noticia.content?.substring(0, 160) || 'Noticias del Senado de Bolivia'
  const imagen = obtenerImagenOG()
  
  return {
    title: `${tituloLimpio} | Senado de Bolivia`,
    description: descripcion.substring(0, 160),
    image: imagen,
    url: `https://senado.gob.bo/noticias/${route.params.slug}`
  }
})

// ============================================
// useHead - SEO
// ============================================
useHead({
  title: () => seoData.value.title,
  meta: [
    { name: 'description', content: () => seoData.value.description },
    { property: 'og:title', content: () => seoData.value.title },
    { property: 'og:description', content: () => seoData.value.description },
    { property: 'og:image', content: () => seoData.value.image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:url', content: () => seoData.value.url },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: 'Senado de Bolivia' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => seoData.value.title },
    { name: 'twitter:description', content: () => seoData.value.description },
    { name: 'twitter:image', content: () => seoData.value.image }
  ],
  link: [
    { rel: 'canonical', href: () => `https://senado.gob.bo/noticias/${route.params.slug}` }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': seoData.value.title,
        'description': seoData.value.description,
        'image': seoData.value.image,
        'url': seoData.value.url,
        'publisher': {
          '@type': 'Organization',
          'name': 'Senado de Bolivia'
        },
        'datePublished': noticiaData.value?.noticia?.publishedAt || new Date().toISOString(),
        'dateModified': noticiaData.value?.noticia?.updatedAt || new Date().toISOString()
      })
    }
  ]
})

// ============================================
// FUNCIONES
// ============================================
const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
}

const cargarNoticiasRelacionadas = async (noticiaId, categoria, tags) => {
  loadingRelacionadas.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/content/${noticiaId}/related?limit=6`)
    const result = await response.json()
    
    if (result.success && result.data && result.data.length > 0) {
      noticiasRelacionadas.value = result.data
    } else {
      const fallbackResponse = await fetch(`${API_BASE_URL}/content?category=${categoria}&limit=6`)
      const fallbackResult = await fallbackResponse.json()
      if (fallbackResult.success && fallbackResult.data?.contents) {
        noticiasRelacionadas.value = fallbackResult.data.contents.filter(n => n._id !== noticiaId)
      } else {
        noticiasRelacionadas.value = []
      }
    }
    relacionadaCurrentIndex.value = 0
  } catch (err) {
    console.error('Error cargando noticias relacionadas:', err)
    noticiasRelacionadas.value = []
  } finally {
    loadingRelacionadas.value = false
  }
}

const convertirHTMLaBloques = (htmlContent) => {
  if (!htmlContent) return []
  
  const bloques = []
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlContent
  
  tempDiv.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      bloques.push({
        type: 'paragraph',
        content: node.textContent
      })
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node
      const tagName = element.tagName.toLowerCase()
      
      if (tagName === 'p') {
        bloques.push({
          type: 'paragraph',
          content: element.innerHTML
        })
      } else if (tagName === 'blockquote') {
        const author = element.getAttribute('data-author') || 'Senado de Bolivia'
        const role = element.getAttribute('data-role') || 'Cámara de Senadores'
        const text = element.textContent || ''
        const cleanText = text.replace(/—.*$/, '').trim()
        bloques.push({
          type: 'quote',
          content: cleanText,
          author: author,
          role: role
        })
      } else if (tagName === 'div' && element.getAttribute('data-type') === 'video') {
        const iframe = element.querySelector('iframe')
        const captionEl = element.querySelector('.video-caption')
        if (iframe) {
          bloques.push({
            type: 'video',
            url: iframe.getAttribute('src') || '',
            title: iframe.getAttribute('title') || '',
            caption: captionEl?.textContent || ''
          })
        }
      } else if (tagName === 'iframe') {
        const src = element.src || ''
        bloques.push({
          type: 'video',
          url: src,
          title: element.title || 'Video institucional',
          caption: ''
        })
      } else {
        bloques.push({
          type: 'paragraph',
          content: element.outerHTML
        })
      }
    }
  })
  
  return bloques
}

const formatTitleWithColors = (title) => {
  if (!title) return ''
  return title.replace(/\*(.*?)\*/g, '<span class="text-[#611717] font-bold">$1</span>')
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const anteriorRelacionada = () => {
  if (relacionadaCurrentIndex.value > 0) relacionadaCurrentIndex.value--
}

const siguienteRelacionada = () => {
  if (relacionadaCurrentIndex.value < maxRelacionadaIndex.value) relacionadaCurrentIndex.value++
}

const verNoticiaRelacionada = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const forceScrollToTop = () => {
  if (process.client) {
    window.scrollTo(0, 0)
    const container = document.querySelector('.snap-container')
    if (container) container.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    const mainContent = document.querySelector('main')
    if (mainContent) mainContent.scrollTop = 0
  }
}

// ============================================
// COMPUTED DEL CARRUSEL
// ============================================
const imagenActual = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  return imagenesCarrusel.value[currentIndex.value]
})

const imagenAnterior = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const prevIndex = currentIndex.value === 0 
    ? imagenesCarrusel.value.length - 1 
    : currentIndex.value - 1
  return imagenesCarrusel.value[prevIndex]
})

const imagenSiguiente = computed(() => {
  if (imagenesCarrusel.value.length === 0) return null
  if (imagenesCarrusel.value.length === 1) return imagenActual.value
  const nextIndex = currentIndex.value === imagenesCarrusel.value.length - 1 
    ? 0 
    : currentIndex.value + 1
  return imagenesCarrusel.value[nextIndex]
})

const peekWidth = computed(() => {
  if (imagenActual.value?.orientation === 'vertical') return 22
  return 12
})

const imagenActualWidth = computed(() => {
  return 100 - (peekWidth.value * 2)
})

const peekLeftWidth = computed(() => peekWidth.value)
const peekRightWidth = computed(() => peekWidth.value)

const siguienteImagen = () => {
  if (imagenesCarrusel.value.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % imagenesCarrusel.value.length
}

const anteriorImagen = () => {
  if (imagenesCarrusel.value.length <= 1) return
  currentIndex.value = currentIndex.value === 0 
    ? imagenesCarrusel.value.length - 1 
    : currentIndex.value - 1
}

const volverAtras = () => {
  router.back()
}

const recargar = () => {
  refresh()
  if (noticiaData.value?.noticia) {
    cargarNoticiasRelacionadas(noticiaData.value.noticia._id, noticiaData.value.noticia.category, noticiaData.value.noticia.tags)
  }
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') anteriorImagen()
  else if (e.key === 'ArrowRight') siguienteImagen()
}

// ============================================
// WATCHERS
// ============================================
watch(noticiaData, (newData) => {
  if (newData?.noticia) {
    cargarNoticiasRelacionadas(newData.noticia._id, newData.noticia.category, newData.noticia.tags)
  }
}, { immediate: true })

if (noticiaData.value?.imagenes) {
  imagenesCarrusel.value = noticiaData.value.imagenes
}

watch(noticiaData, (newData) => {
  if (newData?.imagenes) {
    imagenesCarrusel.value = newData.imagenes
  }
}, { immediate: true })

if (error.value) {
  errorMsg.value = error.value.message
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  windowLocation.value = window.location.href
  window.addEventListener('keydown', handleKeydown)
  console.log('✅ Frontend conectado a la API real en:', API_BASE_URL)
  
  forceScrollToTop()
  setTimeout(forceScrollToTop, 100)
  setTimeout(forceScrollToTop, 300)
  setTimeout(forceScrollToTop, 500)
  setTimeout(forceScrollToTop, 1000)
})

onActivated(() => {
  forceScrollToTop()
})

watch(() => route.params.slug, () => {
  forceScrollToTop()
}, { immediate: true })

watch(() => route.fullPath, () => {
  forceScrollToTop()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// 🔥 LAYOUT CORRECTO
definePageMeta({ layout: 'default' })
</script>

<style scoped>
/* ========== FONTS ========== */
@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Regular/Capitolium News W01 2 Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Bold/Capitolium News W01 2 Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 Italic/Capitolium News W01 2 Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Capitolium News';
  src: url('/fonts/Capitolium News W01 2 SemiBold/Capitolium News W01 2 SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

.prose,
.prose p,
article,
p,
h1,
h2,
h3,
h4,
h5,
h6,
div,
section {
  font-family: 'Capitolium News', 'Montserrat', sans-serif !important;
}

.tag-noticia,
.tag-importante {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 600 !important;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.tag-noticia {
  background-color: #A54A4A;
  color: white;
}

.tag-importante {
  background-color: #eab308;
  color: white;
}

.compartir-texto {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 500 !important;
  color: #6b7280;
  font-size: 0.875rem;
}

.title-main,
.title-main span,
h1.title-main {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
}

.excerpt-text {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 300 !important;
}

.carousel-caption,
.video-caption {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 300 !important;
  color: #6b7280 !important;
  font-size: 0.9rem !important;
}

.video-caption {
  text-align: center;
  margin-top: 0.5rem;
}

.quote-badge .badge-name {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
}

.quote-badge .badge-role {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 300 !important;
}

.quote-text {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 300 !important;
  font-style: italic !important;
}

.quote-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.quote-badge {
  background-color: #1a1a1a;
  color: white;
  padding: 0.5rem 1.2rem;
  display: inline-block;
  text-align: right;
  margin-bottom: 0;
  width: auto;
}

.quote-container {
  background-color: #f5f5f5;
  width: 100%;
  margin-top: 0;
  padding: 2rem 2.5rem;
  position: relative;
}

.quote-content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.quote-mark {
  position: absolute;
  font-family: 'Times New Roman', Georgia, serif;
  font-size: 15vw;
  font-weight: 900;
  color: #1a1a1a;
  opacity: 0.12;
  line-height: 1;
  z-index: 0;
}

.quote-open {
  top: -6vw;
  left: -2vw;
}

.quote-close {
  bottom: -13vw;
  right: -2vw;
}

.quote-text {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 85%;
}

.video-block iframe {
  transition: transform 0.3s ease;
  width: 100%;
  border-radius: 0.75rem;
  aspect-ratio: 16 / 9;
}

.video-block:hover iframe {
  transform: scale(1.01);
}

/* ============================================ */
/* ESTILOS PARA ICONOS DE REDES SOCIALES */
/* ============================================ */

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  transition: all 0.3s ease;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  text-decoration: none;
  background-color: #ffffff;
}

.social-icon svg {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  fill: #000000;
}

.social-icon:hover {
  background-color: #1a202c !important;
  border-color: #000000 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.social-icon:hover svg {
  fill: #ffffff !important;
}

/* ============================================ */
/* BLOQUES DE CONTENIDO */
/* ============================================ */

.block-item {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.block-item:nth-child(1) { animation-delay: 0.05s; }
.block-item:nth-child(2) { animation-delay: 0.1s; }
.block-item:nth-child(3) { animation-delay: 0.15s; }
.block-item:nth-child(4) { animation-delay: 0.2s; }
.block-item:nth-child(5) { animation-delay: 0.25s; }
.block-item:nth-child(6) { animation-delay: 0.3s; }
.block-item:nth-child(7) { animation-delay: 0.35s; }
.block-item:nth-child(8) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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