<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-[#fff] overflow-visible">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <!-- ========================================== -->
    <!-- ASISTENTE FLOTANTE                         -->
    <!-- ========================================== -->
    <AsistenteFlotante 
      :tamaño="56"
      :posicion-bottom="30"
      :posicion-right="30"
      :intervalo-cambio="6000"
    />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import AsistenteFlotante from '~/components/AsistenteFlotante.vue'

export default {
  components: {
    Header,
    Footer,
    AsistenteFlotante
  }
}
</script>

<style scoped>
</style>