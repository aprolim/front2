<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-12">
        <div class="text-center">
          <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.5vw] sm:gap-2 px-[3vw] sm:px-4 py-[1vw] sm:py-1.5 mb-[2vw] sm:mb-3">
            <Icon name="mdi:bank" class="text-senado-gold text-[4.5vw] sm:text-xl" />
            <span class="text-white/90 tracking-wider font-medium text-[2.4vw] sm:text-sm">
              SECCIÓN 8
            </span>
          </div>
          <h1 class="font-bold leading-tight text-[9vw] sm:text-4xl md:text-5xl">
            Información de la <span class="text-senado-gold">Institución</span>
          </h1>
          <p class="text-white/70 mt-[2.5vw] sm:mt-3 text-[3vw] sm:text-base max-w-2xl mx-auto">
            Conoce la misión, visión, valores, principios, historia y objetivos institucionales de la Cámara de Senadores
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <!-- Contenido -->
    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-10">

      <!-- Sección 8.1 a 8.3: Misión, Visión, Valores y Principios -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-senado-primary to-senado-primary-dark flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:compass" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>
            <span class="text-senado-primary/60 text-[2.1vw] sm:text-xs font-bold tracking-wider uppercase">Sección 8.1 · 8.2 · 8.3</span>
            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Misión, Visión, Valores y Principios</h2>
          </div>
        </div>
        <NuxtLink to="/mision-vision-valores-principios" 
                  class="block bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6 hover:shadow-lg transition-shadow group">
          <div class="flex items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex-1">
              <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[2vw] sm:mb-2">
                Declaración del propósito esencial de la Cámara de Senadores, su visión de futuro, así como los 8 valores y 8 principios institucionales que rigen su accionar.
              </p>
              <span class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary font-semibold text-[2.7vw] sm:text-sm">
                Ver contenido completo
                <Icon name="mdi:arrow-right" class="text-[3.6vw] sm:text-base group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <Icon name="mdi:arrow-right-circle" class="text-senado-primary/30 text-[10vw] sm:text-5xl flex-shrink-0" />
          </div>
        </NuxtLink>
      </div>

      <!-- Sección 8.4: Reseña Histórica -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#8f7320] to-[#c9a84c] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:book-open-page-variant" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>
            <span class="text-senado-primary/60 text-[2.1vw] sm:text-xs font-bold tracking-wider uppercase">Sección 8.4</span>
            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Reseña Histórica</h2>
          </div>
        </div>
        <NuxtLink to="/antecedentes-historicos" 
                  class="block bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6 hover:shadow-lg transition-shadow group">
          <div class="flex items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex-1">
              <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[2vw] sm:mb-2">
                Narración que documenta la historia de la Cámara de Senadores desde la independencia de Bolivia en 1825 hasta la actualidad, identificando los hitos de cambio y transformación institucional.
              </p>
              <span class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary font-semibold text-[2.7vw] sm:text-sm">
                Ver contenido completo
                <Icon name="mdi:arrow-right" class="text-[3.6vw] sm:text-base group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <Icon name="mdi:arrow-right-circle" class="text-senado-primary/30 text-[10vw] sm:text-5xl flex-shrink-0" />
          </div>
        </NuxtLink>
      </div>

      <!-- Sección 8.5: Memoria Institucional -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#4a2a4a] to-[#8f1522] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:book-open-variant" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>
            <span class="text-senado-primary/60 text-[2.1vw] sm:text-xs font-bold tracking-wider uppercase">Sección 8.5</span>
            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Memoria Institucional o Informe de Gestión</h2>
          </div>
        </div>
        <NuxtLink to="/memoria-institucional" 
                  class="block bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6 hover:shadow-lg transition-shadow group">
          <div class="flex items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex-1">
              <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[2vw] sm:mb-2">
                Documento que contiene información administrativa y financiera de lo ejecutado por la institución. Incluye el compendio "Redactor" con la transcripción de las sesiones ordinarias y extraordinarias.
              </p>
              <span class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary font-semibold text-[2.7vw] sm:text-sm">
                Ver contenido completo
                <Icon name="mdi:arrow-right" class="text-[3.6vw] sm:text-base group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <Icon name="mdi:arrow-right-circle" class="text-senado-primary/30 text-[10vw] sm:text-5xl flex-shrink-0" />
          </div>
        </NuxtLink>
      </div>

      <!-- Sección 8.6: Objetivos Institucionales -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#1a3a6c] to-[#0f2347] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:target" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>
            <span class="text-senado-primary/60 text-[2.1vw] sm:text-xs font-bold tracking-wider uppercase">Sección 8.6</span>
            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Objetivos Institucionales</h2>
          </div>
        </div>
        <NuxtLink to="/objetivos-institucionales" 
                  class="block bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6 hover:shadow-lg transition-shadow group">
          <div class="flex items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex-1">
              <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[2vw] sm:mb-2">
                Resumen de lo establecido en el Plan Estratégico Institucional (PEI 2021-2025), con los objetivos estratégicos que orientan las acciones de la Cámara de Senadores.
              </p>
              <span class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary font-semibold text-[2.7vw] sm:text-sm">
                Ver contenido completo
                <Icon name="mdi:arrow-right" class="text-[3.6vw] sm:text-base group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <Icon name="mdi:arrow-right-circle" class="text-senado-primary/30 text-[10vw] sm:text-5xl flex-shrink-0" />
          </div>
        </NuxtLink>
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
  title: 'Información de la Institución | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Información institucional de la Cámara de Senadores: Misión, Visión, Valores, Principios, Reseña Histórica, Memoria Institucional y Objetivos Institucionales.' },
  ],
})
</script>