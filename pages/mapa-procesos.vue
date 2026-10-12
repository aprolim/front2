<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:sitemap" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">GESTIÓN INSTITUCIONAL</span>
            </div>
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              Mapa de <span class="text-senado-gold">Procesos</span>
            </h1>
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              CÁMARA DE SENADORES
            </p>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <!-- Contenido: solo imagen -->
    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">
      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-[3vw] sm:p-6">
        <img
          src="/mapa de procesos/MAPA DE PROCESOS.jpg"
          alt="Mapa de Procesos — Cámara de Senadores"
          class="w-full h-auto rounded-lg"
        />
      </div>

      <!-- Botón volver -->
      <div class="text-center mt-[6vw] sm:mt-8">
        <NuxtLink to="/" class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-base font-medium">
          <Icon name="mdi:arrow-left" class="text-[4vw] sm:text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Mapa de Procesos | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Mapa de Procesos Institucional de la Cámara de Senadores.' },
  ],
})
</script>