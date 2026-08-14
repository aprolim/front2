<template>
  <div v-if="noticias.length > 0" class="mt-12">
    <!-- Título de la sección -->
    <div class="flex items-center gap-4 mb-6">
      <div class="w-1 h-8 bg-[#611717] rounded-full"></div>
      <h2 class="text-2xl font-bold text-[#611717]">
        Noticias relacionadas con <span class="text-[#8f1522]">{{ nombreSenador }}</span>
      </h2>
    </div>
    <div class="border-b border-gray-200 mb-6"></div>

    <!-- Grid de noticias -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="noticia in noticiasMostradas"
        :key="noticia.id"
        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
        @click="irANoticia(noticia)"
      >
        <div class="relative aspect-[16/9] overflow-hidden">
          <img
            :src="noticia.imagen || '/images/default-news.jpg'"
            :alt="limpiarAsteriscos(noticia.titulo)"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            @error="(e) => e.target.src = '/images/default-news.jpg'"
          />
          <div class="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#611717]/80 to-transparent"></div>
          <span 
            v-if="noticia.categoria === 'importante'" 
            class="absolute top-3 right-3 bg-[#8f1522] text-white text-xs px-3 py-1 rounded-full font-semibold"
          >
            ⭐ Importante
          </span>
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 mb-1">
            {{ formatearFecha(noticia.publishedAt || noticia.fecha) }}
          </p>
          <h3 
            class="font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#611717] transition-colors"
            v-html="formatTitleWithColors(noticia.titulo)"
          >
          </h3>
          <p class="text-sm text-gray-600 mt-2 line-clamp-2">
            {{ noticia.resumen || noticia.descripcion || '' }}
          </p>
          <div class="mt-3 flex justify-end">
            <span class="text-[#611717] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Leer más
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-else class="flex justify-center py-8">
      <div class="inline-block w-8 h-8 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
      <p class="ml-3 text-gray-500">Cargando noticias relacionadas...</p>
    </div>

    <!-- Sin resultados -->
    <div v-if="!loading && noticias.length === 0" class="text-center py-8 bg-gray-50 rounded-xl">
      <p class="text-gray-500">No hay noticias relacionadas con este senador.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  senadorId: {
    type: Number,
    required: true
  },
  nombreSenador: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 6
  }
})

const router = useRouter()
const noticias = ref([])
const loading = ref(false)

// Funciones de utilidad
const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
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

const irANoticia = (noticia) => {
  if (noticia && noticia.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

const noticiasMostradas = computed(() => {
  return noticias.value.slice(0, props.limit)
})

const cargarNoticias = async () => {
  if (!props.senadorId) return
  
  loading.value = true
  try {
    const { fetchNoticiasPorSenador } = useNoticias()
    const resultados = await fetchNoticiasPorSenador(props.senadorId)
    noticias.value = resultados
  } catch (error) {
    console.error('Error cargando noticias del senador:', error)
  } finally {
    loading.value = false
  }
}

// Cargar cuando cambia el senador
watch(() => props.senadorId, () => {
  noticias.value = []
  cargarNoticias()
}, { immediate: true })
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>