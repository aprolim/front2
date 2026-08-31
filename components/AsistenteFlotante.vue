<!-- components/AsistenteFlotante.vue -->
<template>
  <div 
    class="asistente-flotante fixed z-50 cursor-pointer transition-all duration-300 hover:scale-110"
    :style="{
      bottom: `${posicionBottom}px`,
      right: `${posicionRight}px`,
      width: `${tamaño}px`,
      height: `${tamaño}px`
    }"
    @click="cambiarImagen"
    @mouseenter="flotando = true"
    @mouseleave="flotando = false"
  >
    <!-- Marco decorativo dorado -->
    <div class="marco-dorado">
      <img 
        :src="imagenActual"
        alt="Asistente virtual"
        class="w-full h-full object-contain"
        :class="{ 'animate-flotar': flotando }"
      />
    </div>
    
    <!-- Badge de indicación -->
    <div class="absolute -top-1 -right-1 bg-senado-primary text-white text-[0.5vw] px-2 py-0.5 rounded-full animate-pulse">
      💡
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props con valores por defecto
const props = defineProps({
  tamaño: {
    type: Number,
    default: 56  // 🔥 30% más pequeño: 80 * 0.7 = 56
  },
  posicionBottom: {
    type: Number,
    default: 30  // 🔥 Más abajo
  },
  posicionRight: {
    type: Number,
    default: 30
  },
  intervaloCambio: {
    type: Number,
    default: 6000
  }
})

// Estado
const imagenes = [
  '/asistente/3.png',
  '/asistente/11.png'
]
const indiceActual = ref(0)
const flotando = ref(false)
let intervalo = null

const imagenActual = computed(() => imagenes[indiceActual.value])

// Métodos
const cambiarImagen = () => {
  indiceActual.value = (indiceActual.value + 1) % imagenes.length
}

// Lifecycle
onMounted(() => {
  intervalo = setInterval(() => {
    cambiarImagen()
  }, props.intervaloCambio)
})

onUnmounted(() => {
  if (intervalo) {
    clearInterval(intervalo)
    intervalo = null
  }
})
</script>

<style scoped>
.asistente-flotante {
  transition: all 0.3s ease;
  z-index: 9999;
}

/* 🔥 Marco dorado con borde ligero */
.marco-dorado {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #e3d194, #c9a84c, #e3d194);
  box-shadow: 
    0 4px 20px rgba(201, 168, 76, 0.3),
    inset 0 1px 3px rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.asistente-flotante:hover .marco-dorado {
  box-shadow: 
    0 8px 35px rgba(201, 168, 76, 0.5),
    inset 0 1px 3px rgba(255, 255, 255, 0.4);
}

.marco-dorado img {
  border-radius: 50%;
  background: #ffffff;
  display: block;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}

@keyframes flotar {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-flotar {
  animation: flotar 2s ease-in-out infinite;
}

/* Badge pulsante */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>