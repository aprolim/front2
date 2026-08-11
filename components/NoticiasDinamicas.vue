<!-- components/NoticiasDinamicas.vue -->
<template>
  <div class="flex flex-col md:flex-row gap-[1vw]">
    <!-- COLUMNA IZQUIERDA - 70% -->
    <div class="md:w-[70%]">
      <!-- Estado de carga -->
      <div v-if="loading" class="w-full">
        <div class="w-full bg-gray-200 animate-pulse rounded-t-lg aspect-[16/9]"></div>
        <div class="w-full h-[1vw] bg-gray-300"></div>
        <div class="mt-4">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      <!-- Noticia Principal -->
      <div v-else-if="noticiaPrincipal" class="group cursor-pointer" @click="irANoticia(noticiaPrincipal)">
        <div class="w-full">
          <div class="relative overflow-hidden rounded-t-lg aspect-[18/9] bg-gray-100">
            <!-- Imagen con aspecto fijo 16:9 -->
            <img 
              :src="obtenerImagen(noticiaPrincipal)"
              :alt="limpiarAsteriscos(noticiaPrincipal.titulo)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
              @error="imagenError = true"
            />
            
            <!-- Fallback -->
            <div 
              v-if="imagenError"
              class="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm"
            >
              Imagen no disponible
            </div>
          </div>
          <div class="w-full h-[1vw] bg-senado-gold-dark"></div>
        </div>
        
        <div class="mt-[2vw]">
          <!-- Título con resaltado de asteriscos -->
          <h2 
            class="text-[1.5vw] font-bold group-hover:text-senado-primary transition-colors"
            v-html="tituloResaltado(noticiaPrincipal.titulo)"
          ></h2>
          <p class="text-[0.8vw] text-gray-500 mt-1">
            {{ formatearFecha(noticiaPrincipal.publishedAt || noticiaPrincipal.fecha) }}
          </p>
        </div>
      </div>

      <!-- Sin noticias -->
      <div v-else class="w-full text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-600">No hay noticias disponibles</p>
        <button @click="recargarDatos" class="mt-4 px-4 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition">
          Reintentar
        </button>
      </div>
    </div>

    <!-- COLUMNA DERECHA - 30% -->
    <div class="md:w-[30%] flex flex-col gap-[1vw]">
      <!-- Estado de carga -->
      <div v-if="loading" class="flex flex-col gap-4">
        <div v-for="i in 3" :key="i" class="bg-white shadow rounded-b-lg overflow-hidden">
          <div class="h-[0.6vw] bg-gray-300"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Noticias secundarias -->
      <template v-else-if="noticiasSecundarias.length > 0">
        <div 
          v-for="noticia in noticiasSecundarias" 
          :key="noticia.id || noticia._id"
          class="bg-white hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
          @click="irANoticia(noticia)"
        >
          <div class="h-[0.6vw] bg-senado-gold-dark"></div>
          <div class="p-[1vw]">
            <p 
              class="text-[1.0vw] font-semibold group-hover:text-senado-primary transition-colors line-clamp-3"
              v-html="tituloResaltado(noticia.titulo, 'text-gray-800')"
            ></p>
            <p class="text-[.8vw] text-gray-500 mt-2">
              {{ formatearFecha(noticia.publishedAt || noticia.fecha) }}
            </p>
          </div>
        </div>
      </template>

      <!-- Sin noticias secundarias -->
      <div v-else-if="!loading" class="text-center py-8 bg-gray-50 rounded-lg">
        <p class="text-gray-500 text-sm">No hay noticias secundarias</p>
      </div>

      <!-- Botón -->
      <div class="mt-2">
        <NuxtLink 
          to="/noticias" 
          class="bg-senado-gold-lightest text-black w-full py-2 rounded-full hover:bg-senado-gold transition-colors font-thin text-[1vw] flex items-center justify-center gap-2 shadow-sm"
        >
          Ir a todas las noticias
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNoticias } from '../composables/useNoticias'

const props = defineProps({
  secundariasLimit: { type: Number, default: 3 },
  autoLoad: { type: Boolean, default: true }
})

const router = useRouter()
const imagenError = ref(false)

const { 
  noticiasImportantes, 
  loading, 
  error, 
  recargarDatos 
} = useNoticias()

// Resalta texto entre asteriscos
const tituloResaltado = (texto, colorNormal = 'text-gray-900') => {
  if (!texto) return ''
  return texto.replace(/\*([^*]+)\*/g, (match, contenido) => {
    return `<span class="text-senado-primary font-bold">${contenido}</span>`
  })
}

const limpiarAsteriscos = (texto) => {
  if (!texto) return ''
  return texto.replace(/\*/g, '')
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible'
  try {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  } catch {
    return fecha
  }
}

const obtenerImagen = (noticia) => {
  if (!noticia) return '/images/default-news.jpg'
  return noticia.featuredImage?.url || 
         noticia.imagen || 
         '/images/default-news.jpg'
}

const irANoticia = (noticia) => {
  if (noticia?.slug) {
    router.push(`/noticias/${noticia.slug}`)
  }
}

// Computadas
const noticias = computed(() => {
  if (!noticiasImportantes.value) return []
  return [...noticiasImportantes.value].sort((a, b) => {
    const fechaA = new Date(a.publishedAt || a.fecha || 0)
    const fechaB = new Date(b.publishedAt || b.fecha || 0)
    return fechaB - fechaA
  })
})

const noticiaPrincipal = computed(() => {
  return noticias.value.length > 0 ? noticias.value[0] : null
})

const noticiasSecundarias = computed(() => {
  return noticias.value.length > 1 
    ? noticias.value.slice(1, 1 + props.secundariasLimit)
    : []
})

onMounted(async () => {
  if (props.autoLoad && noticiasImportantes.value.length === 0) {
    await recargarDatos()
  }
})

defineExpose({ recargarDatos })
</script>

<style scoped>
/* Solo lo necesario para line-clamp (Tailwind no lo tiene por defecto) */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>