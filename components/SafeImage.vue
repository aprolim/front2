<!-- components/SafeImage.vue -->
<template>
  <div class="relative overflow-hidden" :style="{ width: '100%', height: '100%' }">
    <!-- Skeleton de carga -->
    <div v-if="showSkeleton && !loaded" class="absolute inset-0 bg-gray-200 animate-pulse"></div>
    
    <!-- Imagen -->
    <img 
      v-if="!error && src" 
      :src="src" 
      :alt="alt" 
      :class="imageClass"
      @error="handleError"
      @load="handleLoad"
      :loading="loadingStrategy === 'lazy' ? 'lazy' : 'eager'"
      :style="{ opacity: loaded || !showSkeleton ? 1 : 0 }"
    />
    
    <!-- Estado de error -->
    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
      <span class="text-gray-400 text-sm">Imagen no disponible</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    default: 'low'
  },
  loadingStrategy: {
    type: String,
    default: 'lazy'
  },
  showSkeleton: {
    type: Boolean,
    default: false
  },
  maxRetries: {
    type: Number,
    default: 3
  },
  persistent: {
    type: Boolean,
    default: false
  }
})

const error = ref(false)
const loaded = ref(false)
let retryCount = 0

const handleError = () => {
  if (retryCount < props.maxRetries) {
    retryCount++
    // Reintentar después de un delay
    setTimeout(() => {
      error.value = false
      // Forzar recarga de la imagen
      const img = new Image()
      img.src = props.src
      img.onload = () => {
        loaded.value = true
        error.value = false
      }
      img.onerror = () => {
        if (retryCount >= props.maxRetries) {
          error.value = true
        }
      }
    }, 1000 * retryCount)
  } else {
    error.value = true
  }
}

const handleLoad = () => {
  loaded.value = true
  error.value = false
}

// Resetear estado cuando cambia la src
watch(() => props.src, () => {
  error.value = false
  loaded.value = false
  retryCount = 0
})
</script>