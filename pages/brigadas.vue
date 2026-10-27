<template>
  <div class="min-h-screen w-full flex flex-col items-center bg-gray-50 pb-12">
    <!-- HERO -->
    <div class="mb-12 text-center pt-10">
      <h1 class="text-[4vw] font-bold text-senado-primary leading-tight flex flex-col items-center text-center">
        Brigadas
        <div class="w-[12vw] h-1 bg-senado-gold-dark mt-[.5vw] rounded-full"></div>
      </h1>

    </div>

    <!-- COMPONENTE (AHORA ABSORBE TODO) -->
    <main class="w-full max-w-[1400px] mx-auto px-4 mt-8">
      <PlenoCamaralFiltrado 
        :filtro-departamento-externo="filtroDepartamento" 
        @update:filtroDepartamento="filtroDepartamento = $event"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filtroDepartamento = ref(null)

useHead({
  title: 'Pleno Camaral | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Composición del Pleno Camaral del Senado de Bolivia: titulares, suplentes, directiva y distribución de escaños por departamento.' }
  ]
})
</script>