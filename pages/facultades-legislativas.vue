<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-[95%] max-w-7xl mx-auto">

      <!-- Botón volver -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-senado-primary transition-colors text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>

      <!-- Hero / Encabezado -->
      <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white rounded-2xl overflow-hidden mb-8">
        <div class="container mx-auto px-6 max-w-7xl py-8 sm:py-12">
          <div class="inline-flex items-center bg-white/10 rounded-full gap-2 px-4 py-1.5 mb-4">
            <Icon name="mdi:landmark" class="text-senado-gold text-lg" />
            <span class="text-white/80 tracking-wider font-medium text-xs uppercase">
              Módulo Legislativo
            </span>
          </div>

          <h1 class="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl">
            Facultades de la Camara de Senadores
          </h1>
        </div>

        <!-- Onda inferior -->
        <div class="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
            <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
          </svg>
        </div>
      </section>

      <!-- Contenido: el componente con los contadores -->
      <!-- Se oculta el encabezado interno SOLO en esta página -->
      <FacultadesLegislativas :mostrar-encabezado="false" />

      <!-- Botón volver inferior -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-base font-medium"
        >
          <Icon name="mdi:arrow-left" class="text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Facultades Legislativas | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Consulta las facultades legislativas de la Cámara de Senadores de Bolivia: proyectos de ley, peticiones de informe, resoluciones, declaraciones y minutas.'
    }
  ]
})
</script>