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
// 🔥 SIRI - CARGA DIFERIDA Y NO BLOQUEANTE
// ==========================================
const cargarSiri = () => {
  const SIRI_URL = 'http://10.0.0.61/static/chat-embed.js'
  const SIRI_TIMEOUT = 3000 // 3 segundos máximo

  // Si ya está cargado, no hacer nada
  if (document.querySelector(`script[src="${SIRI_URL}"]`)) {
    return
  }

  // 🔥 Timeout de seguridad: si no carga en 3s, se cancela
  const timeoutId = setTimeout(() => {
    console.log('⏱️ [Siri] Timeout alcanzado, cancelando carga')
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  }, SIRI_TIMEOUT)

  const script = document.createElement('script')
  script.src = SIRI_URL
  script.async = true
  script.defer = true

  // Atributos custom
  script.setAttribute('api-url', 'http://10.0.0.61/api/chat')
  script.setAttribute('tracking-api-url', 'http://10.0.0.61/api/tramite')
  script.setAttribute('avatar', 'http://10.0.0.61/static/cara2/9.png')
  script.setAttribute('avatar-thinking', 'http://10.0.0.61/static/cara2/8.png')
  script.setAttribute('avatar-responding', 'http://10.0.0.61/static/cara2/10.png')
  script.setAttribute('title', 'Siri')
  script.setAttribute('subtitle', 'Asistente Legislativo')
  script.setAttribute('primary-color', '#1a237e')
  script.setAttribute('request-timeout', '45000')

  // 🔥 Éxito
  script.onload = () => {
    clearTimeout(timeoutId)
    console.log('✅ [Siri] Cargado correctamente')
  }

  // 🔥 Error: no bloquea nada, solo log
  script.onerror = () => {
    clearTimeout(timeoutId)
    console.log('ℹ️ [Siri] No se pudo cargar (no es crítico)')
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
  // 🔥 Cargar Siri DESPUÉS de que la página esté lista
  // y con un pequeño delay para no competir con la carga inicial
  setTimeout(cargarSiri, 2000)
})
</script>