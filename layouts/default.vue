<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-[#fff] overflow-visible">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <!-- ========================================== -->
    <!-- ASISTENTE LEGISLATIVO - SIRI              -->
    <!-- Se carga automáticamente con useHead      -->
    <!-- ========================================== -->
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

// ==========================================
// ELIMINADO: AsistenteFlotante ya no se usa
// ==========================================

// ==========================================
// NUEVO: Asistente Legislativo - SIRI
// ==========================================
useHead({
  script: [
    {
      src: 'http://10.0.0.61/static/chat-embed.js',
      'api-url': 'http://10.0.0.61/api/chat',
      'tracking-api-url': 'http://10.0.0.61/api/tramite',
      avatar: 'http://10.0.0.61/static/cara2/9.png',
      'avatar-thinking': 'http://10.0.0.61/static/cara2/8.png',
      'avatar-responding': 'http://10.0.0.61/static/cara2/10.png',
      title: 'Siri',
      subtitle: 'Asistente Legislativo',
      'primary-color': '#1a237e',
      'request-timeout': '45000',
      defer: true
    }
  ]
})
</script>

<style scoped>
</style>