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
    src: 'http://186.121.212.187/static/chat-embed.js',
    'api-url': 'http://186.121.212.187/api/chat',
    'tracking-api-url': 'http://186.121.212.187/api/tramite',
    'avatar-base-url': 'http://186.121.212.187/static/cara2',
    avatar: 'http://186.121.212.187/static/cara2/2.png',
    title: 'Ari',
    subtitle: 'Asistente Legislativo',
    
    // 🎨 COLORES DE LA PALETA SENADO (100% Guindos / Dorados):
    'primary-color': '#611717', // Mapeado a --senado-primary-light (reemplaza al azul #1a237e)
    'accent-color': '#e3d194',  // Mapeado a --senado-gold-dark
    
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