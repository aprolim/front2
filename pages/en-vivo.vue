<!-- pages/en-vivo.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      
      <!-- 🔴 SECCIÓN: EN VIVO -->
      <div class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="inline-block w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
          <h1 class="text-2xl md:text-3xl font-bold text-[#611717] flex items-center gap-3">
            <Icon name="mdi:television" class="text-red-600 text-3xl" />
            EN VIVO
          </h1>
          <span class="text-sm text-gray-500 font-medium">Transmisión actual</span>
        </div>

        <!-- Estado de carga -->
        <div v-if="liveLoading" class="flex justify-center items-center py-12">
          <div class="inline-block w-10 h-10 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
          <p class="ml-4 text-gray-500">Cargando transmisión en vivo...</p>
        </div>

        <!-- Error -->
        <div v-else-if="liveError" class="text-center py-12 bg-red-50 rounded-xl border border-red-200">
          <div class="text-4xl mb-3 flex justify-center">
            <Icon name="mdi:signal-off" class="text-red-600 text-5xl" />
          </div>
          <p class="text-red-600 font-medium">{{ liveError }}</p>
          <button @click="cargarLive" class="mt-4 px-6 py-2 bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] transition text-sm">
            Reintentar
          </button>
        </div>

        <!-- 🔥 VIDEO EN VIVO -->
        <div v-else-if="liveVideo" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="relative aspect-video bg-black">
            <!-- YOUTUBE -->
            <iframe
              v-if="getPlatform(liveVideo.url) === 'youtube'"
              :src="getYoutubeEmbedUrl(liveVideo.youtubeId || liveVideo.url)"
              :title="liveVideo.title || 'Transmisión en vivo'"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
            ></iframe>
            
            <!-- FACEBOOK -->
            <iframe
              v-else-if="getPlatform(liveVideo.url) === 'facebook'"
              :src="getFacebookEmbedUrl(liveVideo.url)"
              :title="liveVideo.title || 'Transmisión en vivo'"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
            ></iframe>
            
            <!-- VIMEO -->
            <iframe
              v-else-if="getPlatform(liveVideo.url) === 'vimeo'"
              :src="getVimeoEmbedUrl(liveVideo.url)"
              :title="liveVideo.title || 'Transmisión en vivo'"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
            
            <!-- TWITCH -->
            <iframe
              v-else-if="getPlatform(liveVideo.url) === 'twitch'"
              :src="getTwitchEmbedUrl(liveVideo.url)"
              :title="liveVideo.title || 'Transmisión en vivo'"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
            
            <!-- PLATAFORMA NO SOPORTADA -->
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6">
              <Icon name="mdi:help-circle" class="text-6xl text-gray-500 mb-4" />
              <p class="text-lg font-medium">Plataforma no soportada</p>
              <p class="text-sm text-gray-400 mt-2">La URL no es de una plataforma compatible</p>
              <a 
                :href="liveVideo.url" 
                target="_blank"
                class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Abrir enlace
              </a>
            </div>
            
            <!-- Badge "EN VIVO" -->
            <span class="absolute top-4 left-4 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full animate-pulse flex items-center gap-2">
              <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse-fast"></span>
              EN VIVO
            </span>
            
            <!-- Badge de plataforma -->
            <span class="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Icon :name="getPlatformIcon(liveVideo.url)" class="text-sm" />
              {{ getPlatformLabel(liveVideo.url) }}
            </span>
          </div>
          
          <div class="p-6">
            <h2 class="text-xl md:text-2xl font-bold text-[#611717]">
              {{ liveVideo.title || 'Transmisión en vivo del Senado' }}
            </h2>
            <p class="text-gray-500 text-sm mt-2 flex items-center gap-4">
              <span class="flex items-center gap-1">
                <span class="text-red-600">●</span> Transmitiendo ahora
              </span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:clock-outline" class="text-gray-500 text-sm" />
                {{ fechaActual }}
              </span>
              <span class="flex items-center gap-1">
                <Icon :name="getPlatformIcon(liveVideo.url)" class="text-gray-500 text-sm" />
                {{ getPlatformLabel(liveVideo.url) }}
              </span>
            </p>
            <a 
              :href="liveVideo.url" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] transition text-sm"
            >
              <Icon :name="getPlatformIcon(liveVideo.url)" class="text-white text-lg" />
              Ver en {{ getPlatformLabel(liveVideo.url) }}
            </a>
          </div>
        </div>

        <!-- 🔥 SIN TRANSMISIÓN - VERSIÓN COMPACTA Y CENTRADA -->
        <div v-else class="relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300">
          <!-- Fondo con imagen de asamblea.png como marca de agua -->
          <div 
            class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65"
            style="background-image: url('/background/asamblea.png');"
          ></div>
          
          <!-- Overlay sutil -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50"></div>
          
          <!-- Contenido centrado verticalmente -->
          <div class="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
            <!-- Icono + textos en columna -->
            <div class="flex items-center gap-3">
              <div class="translate-y-3 w-[8vw] h-[8vw] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md flex-shrink-0">
                <Icon name="mdi:television-off" class="text-gray-400 text-[6vw]" />
              </div>
              <div class="text-left">
                <h3 class="text-base font-bold text-gray-700">
                  No hay transmisión en vivo
                </h3>
                <p class="text-sm text-gray-500">
                  Actualmente no hay ninguna sesión en curso
                </p>
              </div>
            </div>
            
            <!-- Enlace a sesiones previas -->
            <NuxtLink 
              to="#sesiones-previas"
              class="inline-flex items-center gap-2 text-[#611717] hover:text-[#3a060d] font-medium text-sm transition-colors mt-2"
            >
              <Icon name="mdi:video" class="text-base" />
              Ver sesiones previas
              <Icon name="mdi:arrow-right" class="text-sm" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 📹 SECCIÓN: VIDEOS DE SESIONES PREVIAS -->
      <div id="sesiones-previas" class="border-t border-gray-200 pt-10 scroll-mt-20">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl md:text-2xl font-bold text-[#611717] flex items-center gap-3">
            <Icon name="mdi:video" class="text-[#611717] text-2xl" />
            Sesiones Previas
          </h2>
          <span class="text-sm text-gray-500">Últimas sesiones grabadas</span>
        </div>

        <SesionesVideos />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SesionesVideos from '~/components/SesionesVideos.vue'

const liveVideo = ref(null)
const liveLoading = ref(false)
const liveError = ref(null)

const API_BASE_URL = 'https://demoback.senado.gob.bo/api'

const fechaActual = computed(() => {
  const ahora = new Date()
  return ahora.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// ============================================
// DETECCIÓN DE PLATAFORMA
// ============================================

const getPlatform = (url) => {
  if (!url) return 'unknown'
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook'
  if (url.includes('vimeo.com')) return 'vimeo'
  if (url.includes('twitch.tv')) return 'twitch'
  
  return 'unknown'
}

const getPlatformLabel = (url) => {
  const platform = getPlatform(url)
  const labels = {
    youtube: 'YouTube',
    facebook: 'Facebook',
    vimeo: 'Vimeo',
    twitch: 'Twitch',
    unknown: 'Enlace'
  }
  return labels[platform] || 'Enlace'
}

const getPlatformIcon = (url) => {
  const platform = getPlatform(url)
  const icons = {
    youtube: 'mdi:youtube',
    facebook: 'mdi:facebook',
    vimeo: 'mdi:vimeo',
    twitch: 'mdi:twitch',
    unknown: 'mdi:link-variant'
  }
  return icons[platform] || 'mdi:link-variant'
}

// ============================================
// EMBED URLs POR PLATAFORMA
// ============================================

const getYoutubeEmbedUrl = (input) => {
  if (!input) return ''
  
  if (input.includes('youtube.com/embed/')) return input
  if (input.includes('youtu.be/')) {
    const videoId = input.split('/').pop()?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }
  if (input.includes('watch?v=')) {
    const videoId = new URL(input).searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }
  if (input.length === 11) {
    return `https://www.youtube.com/embed/${input}?autoplay=1`
  }
  return input
}

const getFacebookEmbedUrl = (url) => {
  if (!url) return ''
  if (url.includes('facebook.com/plugins/video.php')) return url
  
  let videoId = ''
  if (url.includes('/videos/')) {
    const parts = url.split('/videos/')
    videoId = parts[1]?.split('/')[0]?.split('?')[0] || ''
  }
  if (url.includes('fb.watch/')) {
    videoId = url.split('fb.watch/')[1]?.split('?')[0] || ''
  }
  
  if (videoId) {
    return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${videoId}&show_text=0&autoplay=1`
  }
  return url
}

const getVimeoEmbedUrl = (url) => {
  if (!url) return ''
  if (url.includes('vimeo.com/embed/')) return url
  
  const videoId = url.split('vimeo.com/')[1]?.split('/')[0]?.split('?')[0]
  if (videoId) {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`
  }
  return url
}

const getTwitchEmbedUrl = (url) => {
  if (!url) return ''
  if (url.includes('twitch.tv/embed')) return url
  
  const channel = url.split('twitch.tv/')[1]?.split('/')[0]?.split('?')[0]
  if (channel) {
    return `https://player.twitch.tv/?channel=${channel}&autoplay=true`
  }
  return url
}

// ============================================
// CARGAR LIVE
// ============================================

const cargarLive = async () => {
  liveLoading.value = true
  liveError.value = null
  
  try {
    const response = await fetch(`${API_BASE_URL}/sesiones/live`)
    const result = await response.json()
    
    if (result.success && result.data) {
      liveVideo.value = result.data
      console.log('🔴 Video en vivo cargado:', liveVideo.value.title)
    } else {
      liveVideo.value = null
    }
  } catch (error) {
    console.error('❌ Error cargando LIVE:', error)
    liveError.value = 'Error al cargar la transmisión en vivo'
    liveVideo.value = null
  } finally {
    liveLoading.value = false
  }
}

onMounted(() => {
  cargarLive()
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes pulse-fast {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 1s ease-in-out infinite;
}
</style>