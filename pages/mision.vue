<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-12">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
          📜 Institucional
        </div>
        <h1 class="text-[4vw] font-bold text-senado-primary leading-tight">
          Misión
        </h1>
        <div class="w-24 h-1 bg-senado-gold-dark mt-4 rounded-full"></div>
      </div>

      <!-- Contenido -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-10">
          <div class="prose prose-lg text-gray-700 leading-relaxed space-y-6">
            <p class="text-xl font-semibold text-senado-primary">
              “El horizonte estratégico del Estado Plurinacional es el Vivir Bien como modelo civilizatorio alternativo al capitalismo y al colonialismo; la legislación y fiscalización democrática y participativa nos permitirá consolidar la arquitectura de nuestro nuevo Estado al conmemorar los 200 años de fundación de la Patria.”
            </p>
            <p>
              La democracia deliberativa y comunitaria es la esencia de nuestro Estado Plurinacional y de nuestros pueblos, la <strong>Cámara de Senadores</strong>, como expresión democrática y soberana del pueblo, institucionalizará el acompañamiento y presencia de las y los senadores donde el pueblo lo requiera.
            </p>
          </div>
        </div>

        <!-- Cita destacada -->
        <div class="mt-8 bg-senado-gold-lightest rounded-2xl p-8 border-l-4 border-senado-primary">
          <p class="text-gray-600 text-sm italic">
            "La Cámara de Senadores, como expresión democrática y soberana del pueblo, institucionalizará el acompañamiento y presencia de las y los senadores donde el pueblo lo requiera."
          </p>
        </div>

        <!-- Botón volver -->
        <div class="mt-12 text-center">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
          >
            <ClientOnly>
              <Icon name="material-symbols:arrow-back-rounded" class="text-[1.5vw]" />
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