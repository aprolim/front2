<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[80%]">
      <!-- Título -->
      <h1 class="text-[4vw] font-bold text-senado-primary text-center mb-8 leading-tight">
        Funciones del Senado
      </h1>

      <!-- Contenido -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <!-- Texto -->
        <div class="space-y-8">
          <p class="text-[1.2vw] font-semibold text-gray-700 mb-6">
            El Rol del Senado en la Asamblea Legislativa Plurinacional
          </p>

          <!-- Introducción -->
          <div class="bg-gray-50 rounded-xl p-8 border-l-[.1vw] border-t-[.1vw] border-senado-primary">
            <p class="text-[1.1vw] text-gray-700 leading-relaxed">
              El Reglamento General de la Cámara de Senadores establece:
            </p>
          </div>

          <!-- Artículo 2 -->
          <div class="bg-gray-50 rounded-xl p-8 border-l-[.1vw] border-t-[.1vw] border-senado-primary">
            <h2 class="text-[1.8vw] font-bold text-senado-primary mb-3">
              Artículo 2.
            </h2>
            <p class="text-[1.1vw] text-gray-700 leading-relaxed">
              <b>(Marco Constitucional).</b> En el marco de lo establecido por la Constitución Política del Estado, la Cámara de Senadores de la Asamblea Legislativa Plurinacional reside en el Órgano Legislativo y ejerce las atribuciones de legislación, fiscalización y gestión, bajo los principios de coordinación y cooperación, promoviendo la participación activa de la ciudadanía en todo el territorio boliviano.
            </p>
          </div>
        </div>

        <!-- Imagen -->
        <div class="flex justify-center items-stretch">
          <div class="w-full rounded-xl overflow-hidden shadow-lg flex">
            <img 
              src="/Mandato Constitucional Senado/27.JPG" 
              alt="Funciones del Senado"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <!-- Botón de volver -->
      <div class="mt-12 text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <Icon name="material-symbols:arrow-back-rounded" class="text-[1.5vw]" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica adicional
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>