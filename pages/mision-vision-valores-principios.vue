<!-- pages/mision-vision-valores.vue -->
<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-12">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
          Institucional
        </div>
        <h1 class="text-[4vw] font-bold text-senado-primary leading-tight">
          Misión y <span class="text-senado-gold-dark">Visión</span>
        </h1>
        <div class="w-24 h-1 bg-senado-gold-dark mt-4 rounded-full"></div>
      </div>

      <!-- Contenido -->
      <div class="max-w-5xl mx-auto space-y-8">
        
        <!-- Misión -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-senado-primary/10 rounded-full flex items-center justify-center">
              <ClientOnly>
                <Icon name="mdi:bullseye-arrow" class="text-2xl text-senado-primary" />
                <template #fallback>
                  <span class="text-2xl">🎯</span>
                </template>
              </ClientOnly>
            </div>
            <h2 class="text-[2.5vw] font-bold text-senado-primary">Misión</h2>
          </div>
          <div class="prose prose-lg text-gray-700 leading-relaxed">
            <p class="text-xl font-medium text-senado-primary/90">
              Ejercer las funciones legislativa, fiscalizadora y de representación de la Cámara de Senadores, mediante la elaboración y aprobación de leyes, el control y fiscalización de la gestión pública, el acceso a la información y la representación territorial, promoviendo la participación ciudadana y contribuyendo al desarrollo integral del Estado Plurinacional de Bolivia, en el marco de la Constitución Política del Estado y la normativa vigente.
            </p>
          </div>
        </div>

        <!-- Visión -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-senado-primary/10 rounded-full flex items-center justify-center">
              <ClientOnly>
                <Icon name="mdi:binoculars" class="text-2xl text-senado-primary" />
                <template #fallback>
                  <span class="text-2xl">🔭</span>
                </template>
              </ClientOnly>
            </div>
            <h2 class="text-[2.5vw] font-bold text-senado-primary">Visión</h2>
          </div>
          <div class="prose prose-lg text-gray-700 leading-relaxed">
            <p class="text-xl font-medium text-senado-primary/90">
              Consolidar una Cámara de Senadores moderna, eficiente, transparente, digital y cercana a la ciudadanía, reconocida por la calidad de su labor legislativa, fiscalizadora y gestión, fortaleciendo la democracia, la participación ciudadana y el desarrollo integral del Estado Plurinacional de Bolivia.
            </p>
          </div>
        </div>

        <!-- Cita destacada -->
        <div class="bg-senado-gold-lightest rounded-2xl p-8 border-l-4 border-senado-primary">
          <p class="text-gray-600 text-sm italic">
            "La Cámara de Senadores, como expresión democrática y soberana del pueblo, institucionalizará el acompañamiento y presencia de las y los senadores donde el pueblo lo requiera, consolidando los valores del Estado Plurinacional."
          </p>
        </div>

        <!-- Botón volver -->
        <div class="mt-12 text-center">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
          >
            <ClientOnly>
              <Icon name="mdi:arrow-left" class="text-[1.5vw]" />
              <template #fallback>
                <span class="text-[1.5vw]">←</span>
              </template>
            </ClientOnly>
            Volver al inicio
          </NuxtLink>
        </div>
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