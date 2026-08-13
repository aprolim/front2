<template>
  <div class="min-h-screen bg-white py-8">
    <div class="mx-auto w-[85%]">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-senado-primary">
          Asistente Legislativo
        </h1>
        <p class="text-gray-600 text-lg mt-2">
          Búsqueda semántica con trazabilidad · Cámara de Senadores
        </p>
        <div class="mt-2 inline-block bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-3 py-1 rounded-full">
          ⚡ Modo demostración
        </div>
      </div>

      <ConsultaLegislativa />
    </div>
  </div>
</template>

<script setup>
import ConsultaLegislativa from '~/components/asistente/ConsultaLegislativa.vue'
</script>