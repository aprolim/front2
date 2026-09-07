<template>
  <div class="min-h-screen bg-white py-[10vw] sm:py-12">
    <div class="mx-auto w-[90%] sm:w-[80%]">
      <!-- Título -->
      <h1 class="text-[10vw] sm:text-[4vw] font-bold text-senado-primary text-center mb-[6vw] sm:mb-8 leading-tight">
        Mandato Constitucional Senado
      </h1>

      <!-- Contenido -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-[4vw] sm:gap-12 items-start">
        <!-- Texto -->
        <div class="space-y-[4vw] sm:space-y-8">
          <p class="text-[3.6vw] sm:text-[1.2vw] font-semibold text-gray-700 mb-[3vw] sm:mb-6">
            La Constitución Política del Estado establece:
          </p>

          <!-- Artículo 12 -->
          <div class="bg-gray-50 rounded-xl p-[4vw] sm:p-8 border-l-[0.4vw] sm:border-l-[0.1vw] border-t-[0.4vw] sm:border-t-[0.1vw] border-senado-primary">
            <h2 class="text-[5.4vw] sm:text-[1.8vw] font-bold text-senado-primary mb-[2vw] sm:mb-3">
              Artículo 12.
            </h2>
            <p class="text-[3.3vw] sm:text-[1.1vw] text-gray-700 leading-relaxed">
              <b>I.</b>  El Estado se organiza y estructura su poder público a través de los órganos Legislativo, Ejecutivo, Judicial y Electoral. La organización del Estado está fundamentada en la independencia, separación, coordinación y cooperación de estos órganos.
            </p>
          </div>

          <!-- Artículo 148 -->
          <div class="bg-gray-50 rounded-xl p-[4vw] sm:p-8 border-l-[0.4vw] sm:border-l-[0.1vw] border-t-[0.4vw] sm:border-t-[0.1vw] border-senado-primary">
            <h2 class="text-[5.4vw] sm:text-[1.8vw] font-bold text-senado-primary mb-[2vw] sm:mb-3">
              Artículo 148.
            </h2>
            <div class="space-y-[2vw] sm:space-y-4 text-[3.3vw] sm:text-[1.1vw] text-gray-700 leading-relaxed">
              <p>
                <b>I.</b> La Cámara de Senadores estará conformada por un total de 36 miembros.
              </p>
              <p>
                <b>II.</b> En cada departamento se eligen 4 Senadores en circunscripción departamental, por votación universal, directa y secreta.
              </p>
              <p>
                <b>III.</b> La asignación de los escaños de Senadores en cada departamento se hará mediante el sistema proporcional, de acuerdo a la Ley.
              </p>
            </div>
          </div>
        </div>

        <!-- Imagen -->
        <div class="flex justify-center items-start">
          <div class="w-full max-w-[500px] rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/Mandato Constitucional Senado/6.png" 
              alt="Mandato Constitucional Senado"
              class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <!-- Botón de volver -->
      <div class="mt-[6vw] sm:mt-12 text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-[1.1vw] font-medium"
        >
          <Icon name="material-symbols:arrow-back-rounded" class="text-[4.5vw] sm:text-[1.5vw]" />
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