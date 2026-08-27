<template>
  <div class="mt-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-[2vw] items-end">
      <!-- Mandato Constitucional -->
      <NuxtLink to="/mandato-constitucional" class="text-center group block">
        <h3 class="text-[2.2vw] font-[500] text-black mb-3 leading-[1.1] group-hover:text-[#4a1111] transition-colors duration-300 font-inter">
          Mandato Constitucional
        </h3>
        <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
          <img 
            src="/images/25.webp" 
            alt="Mandato Constitucional" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </NuxtLink>

      <!-- Funciones del Senado -->
      <NuxtLink to="/funciones-del-senado" class="text-center group block">
        <h3 class="text-[2.2vw] font-[500] text-black mb-3 leading-[1.1] group-hover:text-[#4a1111] transition-colors duration-300 font-inter">
          Funciones del
          <br> Senado 
        </h3>
        <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
          <img 
            src="/images/26.webp" 
            alt="Funciones del Senado" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </NuxtLink>

      <!-- Antecedentes históricos -->
      <NuxtLink to="/antecedentes-historicos" class="text-center group block">
        <h3 class="text-[2.2vw] font-[500] text-black mb-3 leading-[1.1] group-hover:text-[#4a1111] transition-colors duration-300 font-inter">
          Antecedentes históricos
        </h3>
        <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
          <img 
            src="/images/27.webp" 
            alt="Antecedentes históricos" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// No necesita props ni lógica adicional por ahora
</script>

<style scoped>
/* Estilos específicos del componente */
</style>