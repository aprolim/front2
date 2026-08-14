<template>
  <div class="min-h-screen" style="background: transparent !important;">
    <!-- Fondo fijo -->
    <div class="global-fixed-background"></div>
    
    <div class="container-vw">

      <!-- Título -->
      <div class="text-center pb-[3vw] pt-[3vw]">
        <h1 class="text-[5vw] font-bold text-white drop-shadow-lg tracking-wide">
          Todas las <span class="text-[#8f1522]">Noticias</span>
        </h1>
        <div class="w-[6vw] h-[0.2vw] bg-[#611717] mx-auto mt-[1vw]"></div>
        <p class="text-white drop-shadow-md mt-[1.5vw] text-[1.5vw] font-[500] tracking-wide">
          Explora todas las noticias del Senado de Bolivia
        </p>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-[10vw]">
        <div class="inline-block w-[3vw] h-[3vw] border-[0.3vw] border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-[1vw] text-white drop-shadow-md text-[1vw]">Cargando noticias...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="text-center py-[10vw]">
        <p class="text-red-500 mb-[2vw] text-[1vw]">{{ error }}</p>
        <button @click="recargar" class="bg-[#611717] text-white px-[2vw] py-[0.8vw] rounded-lg hover:bg-[#3a060d] transition text-[0.9vw]">
          Reintentar
        </button>
      </div>

      <!-- Grid de noticias -->
      <div v-else-if="todasLasNoticias.length > 0" class="w-[90%] mx-auto">
        <div class="grid grid-cols-4 gap-[1.5vw]">
          <div 
            v-for="noticia in noticiasPaginadas" 
            :key="noticia._id || noticia.id"
            class="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] relative"
            @click="verNoticia(noticia)"
          >
            <div class="relative aspect-[4/5] w-full">
              <img 
                :src="noticia.featuredImage?.url || noticia.imagen || '/images/default-news.jpg'" 
                :alt="limpiarAsteriscos(noticia.titulo || noticia.title)"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div class="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#611717]/90 via-[#611717]/70 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-[1.2vw] flex flex-col justify-end h-[45%]">
                <p class="text-white/90 text-[0.7em] mb-[0.3em] text-shadow-sm font-[600]">
                  {{ formatearFecha(noticia.publishedAt || noticia.fecha || noticia.createdAt) }}
                </p>
                
                <h3 class="font-bold text-white text-[0.9em] leading-tight line-clamp-2">
                  {{ limpiarAsteriscos(noticia.titulo || noticia.title) }}
                </h3>
                
                <div class="mt-[0.8em] flex justify-end">
                  <span class="text-white text-[0.75em] font-semibold flex items-center gap-[0.5em] group-hover:gap-[0.8em] transition-all italic">
                    Leer más
                    <svg class="w-[0.9em] h-[0.9em]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="!loading && todasLasNoticias.length === 0" class="text-center py-[10vw]">
        <p class="text-white drop-shadow-md text-[1vw]">No hay noticias disponibles</p>
        <button @click="recargar" class="mt-[2vw] inline-flex items-center gap-[0.8vw] px-[2vw] py-[0.8vw] bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] transition text-[0.9vw]">
          Reintentar
        </button>
      </div>

      <!-- 🔥 PAGINACIÓN CON COLORES SÓLIDOS -->
      <div v-if="totalPaginas > 1 && !loading" class="flex justify-center items-center gap-[0.8vw] mt-[4vw] pb-[4vw]">
        <button 
          @click="cambiarPagina(paginaActual - 1)" 
          :disabled="paginaActual === 1" 
          class="px-[1.5vw] py-[0.8vw] rounded-lg text-[1vw] font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-[#611717] text-white hover:bg-[#4a1111] shadow-md"
        >
          Anterior
        </button>
        
        <button 
          v-for="p in paginasMostradas" 
          :key="p" 
          @click="cambiarPagina(p)" 
          :class="[
            'w-[3vw] h-[3vw] rounded-lg transition-all duration-300 text-[1.1vw] font-bold shadow-md',
            paginaActual === p 
              ? 'bg-[#8f1522] text-white hover:bg-[#6b111b] border-2 border-[#611717]' 
              : 'bg-white text-[#611717] hover:bg-[#611717] hover:text-white'
          ]"
        >
          {{ p }}
        </button>
        
        <button 
          @click="cambiarPagina(paginaActual + 1)" 
          :disabled="paginaActual === totalPaginas" 
          class="px-[1.5vw] py-[0.8vw] rounded-lg text-[1vw] font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-[#611717] text-white hover:bg-[#4a1111] shadow-md"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'default' })

const router = useRouter()
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

const todasLasNoticias = ref([])
const loading = ref(false)
const error = ref(null)
const paginaActual = ref(1)
const itemsPorPagina = ref(12)

const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
}

const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const noticiasPaginadas = computed(() => {
  const start = (paginaActual.value - 1) * itemsPorPagina.value
  const end = start + itemsPorPagina.value
  return todasLasNoticias.value.slice(start, end)
})

const totalPaginas = computed(() => {
  return Math.ceil(todasLasNoticias.value.length / itemsPorPagina.value)
})

const paginasMostradas = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const rango = 5
  
  let start = Math.max(1, actual - Math.floor(rango / 2))
  let end = Math.min(total, start + rango - 1)
  
  if (end - start + 1 < rango) {
    start = Math.max(1, end - rango + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
    setTimeout(forceScrollToTop, 100)
  }
}

const forceScrollToTop = () => {
  if (process.client) {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}

const verNoticia = (noticia) => {
  const slug = noticia.slug || noticia._id
  if (slug) {
    router.push(`/noticias/${slug}`)
  }
}

const fetchTodasLasNoticias = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`${API_BASE_URL}/content?limit=100`)
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (result.success && result.data?.contents) {
      todasLasNoticias.value = result.data.contents.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt)
        const dateB = new Date(b.publishedAt || b.createdAt)
        return dateB - dateA
      })
    } else {
      todasLasNoticias.value = []
    }
  } catch (err) {
    console.error('Error fetching noticias:', err)
    error.value = err.message || 'Error al cargar las noticias'
    todasLasNoticias.value = []
  } finally {
    loading.value = false
  }
}

const recargar = async () => {
  await fetchTodasLasNoticias()
  forceScrollToTop()
}

useHead({
  title: 'Todas las Noticias - Senado Bolivia',
  meta: [
    { name: 'description', content: 'Explora todas las noticias del Senado de Bolivia.' },
    { property: 'og:title', content: 'Todas las Noticias - Senado Bolivia' },
    { property: 'og:description', content: 'Explora todas las noticias del Senado de Bolivia.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Senado de Bolivia' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

onMounted(async () => {
  await fetchTodasLasNoticias()
  await nextTick()
  forceScrollToTop()
})
</script>

<style scoped>
.container-vw {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2vw;
  position: relative;
  z-index: 10;
}

.global-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/background/fondo departamentos.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
}

.global-fixed-background::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 30%, transparent 0%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  z-index: 1;
}

.min-h-screen {
  background: transparent !important;
  min-height: 100vh;
}

.grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5vw;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-\[4\/5\] {
  aspect-ratio: 4 / 5;
}
</style>

<style>
html, body {
  background: transparent !important;
  margin: 0;
  padding: 0;
}

#__nuxt,
#__layout,
#__layout > div,
#__nuxt > div {
  background: transparent !important;
}

.global-fixed-background {
  z-index: 0 !important;
}

footer {
  position: relative;
  z-index: 20 !important;
  background: #ffffff !important;
}
</style>