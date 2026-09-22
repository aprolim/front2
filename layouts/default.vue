<template>
  <div class="min-h-screen bg-[#fff] overflow-visible">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <ModalComunicado />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ModalComunicado from '~/components/comunicados/ModalComunicado.vue'

// ==========================================
// 🔥 ARI - CARGA DIFERIDA Y NO BLOQUEANTE
// ==========================================
const cargarAri = () => {
  const CONFIG = {
    src: 'https://agente.senado.gob.bo/static/chat-embed.js',
    title: 'Ari',
    subtitle: 'Asistente Institucional',
    
    // 🎨 COLORES DE LA PALETA SENADO (Guindos / Dorados):
    'primary-color': '#681F3A', // Guindo institucional
    'accent-color': '#D2A83A',  // Dorado institucional
    
    'request-timeout': '45000'
  }

  const SCRIPT_TIMEOUT = 3000 // 3 segundos máximo

  // Evitar duplicados si ya existe el script
  if (document.querySelector(`script[src="${CONFIG.src}"]`)) {
    return
  }

  const script = document.createElement('script')

  // 🔥 Timeout de seguridad
  const timeoutId = setTimeout(() => {
    console.warn('⏱️ [Ari] Timeout alcanzado, cancelando carga')
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  }, SCRIPT_TIMEOUT)

  // Configuración del elemento script
  script.src = CONFIG.src
  script.async = true

  // Asignación de atributos dinámicos
  Object.entries(CONFIG).forEach(([key, value]) => {
    if (key !== 'src') {
      script.setAttribute(key, value)
    }
  })

  // Handlers de carga
  script.onload = () => {
    clearTimeout(timeoutId)
    console.log('✅ [Ari] Cargado correctamente con la paleta de colores')
  }

  script.onerror = () => {
    clearTimeout(timeoutId)
    console.warn('ℹ️ [Ari] No se pudo cargar (no es crítico)')
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  }

  document.head.appendChild(script)
}

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  setTimeout(cargarAri, 2000)
})
</script>