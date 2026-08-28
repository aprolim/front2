<!-- components/SesionesVideos.vue -->
<template>
  <div class="sesiones-videos">
    <!-- Estado de carga -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="inline-block w-10 h-10 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
      <p class="ml-3 text-gray-500 text-sm">Cargando videos...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="text-center py-8 bg-red-50 rounded-xl border border-red-200">
      <p class="text-red-600 text-sm">⚠️ {{ error }}</p>
      <button @click="recargar" class="mt-3 px-4 py-2 bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] transition text-sm">
        Reintentar
      </button>
    </div>

    <!-- Videos en grid de 3 columnas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="video in videos" 
        :key="video.position || video.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <!-- Video de YouTube -->
        <div class="relative aspect-video bg-gray-900">
          <iframe
            :src="getYoutubeEmbedUrl(video.youtubeId || video.url)"
            :title="video.title || 'Sesión del Senado'"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
        
        <!-- Información del video -->
        <div class="p-4">
          <h3 class="font-bold text-[#611717] text-sm md:text-base truncate">
            {{ video.title || 'Sesión del Senado' }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Sin videos -->
    <div v-if="!loading && videos.length === 0" class="text-center py-12 bg-gray-50 rounded-xl">
      <div class="text-4xl mb-3">📹</div>
      <p class="text-gray-500 font-medium">No hay videos disponibles</p>
      <p class="text-gray-400 text-sm">Pronto se agregarán nuevas sesiones</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// ✅ IMPORTAR CORRECTAMENTE con llaves porque es named export
import { useSesiones } from '~/composables/useSesiones'

const { videos, loading, error, fetchVideos } = useSesiones()

// Función para obtener la URL embed de YouTube
const getYoutubeEmbedUrl = (input) => {
  if (!input) return ''
  
  if (input.includes('youtube.com/embed/')) return input
  if (input.includes('youtu.be/')) {
    const videoId = input.split('/').pop()?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  if (input.includes('watch?v=')) {
    const videoId = new URL(input).searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  if (input.length === 11) {
    return `https://www.youtube.com/embed/${input}`
  }
  
  return input
}

// Función para recargar
const recargar = async () => {
  await fetchVideos()
}

// Cargar videos al montar el componente
onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
.sesiones-videos {
  width: 100%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}
</style>