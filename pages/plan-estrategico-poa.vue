<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-12">
        <div class="text-center">

          <h1 class="font-bold leading-tight text-[9vw] sm:text-4xl md:text-5xl">
            Plan Estratégico y <span class="text-senado-gold">POA</span>
          </h1>
          <p class="text-white/70 mt-[2.5vw] sm:mt-3 text-[3vw] sm:text-base max-w-2xl mx-auto">
            Planificación estratégica, operativa y de seguimiento institucional
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

      <!-- 9.1 Plan Estratégico Institucional -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#1a3a6c] to-[#0f2347] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:map-marker-path" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>

            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Plan Estratégico Institucional</h2>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6">
          <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[3vw] sm:mb-4">
            Instrumento de planificación que define los objetivos estratégicos, lineamientos de acción y metas a largo plazo de la Cámara de Senadores, asegurando su alineación con el marco normativo y sectorial aplicable. Aprobado mediante Resolución Camaral N° 016/2021-2022 de 5 de septiembre de 2022.
          </p>
          <div class="flex flex-wrap items-center gap-[3vw] sm:gap-4 mb-[3vw] sm:mb-4">
            <div class="flex items-center gap-[2vw] sm:gap-2 text-[2.4vw] sm:text-sm text-gray-600">
              <Icon name="mdi:calendar" class="text-senado-primary text-[3.6vw] sm:text-base" />
              <span>Gestión 2026-2027</span>
            </div>
            <div class="flex items-center gap-[2vw] sm:gap-2 text-[2.4vw] sm:text-sm">
              <span class="inline-flex items-center px-[2vw] sm:px-2.5 py-[0.3vw] sm:py-0.5 rounded-full text-[2.1vw] sm:text-xs font-medium bg-green-100 text-green-800">
                Vigente
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- 9.2 Programación Operativo Anual (POA) -->
      <div class="mb-[6vw] sm:mb-10">
        <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#8f7320] to-[#c9a84c] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:clipboard-list" class="text-white text-[6vw] sm:text-2xl" />
          </div>
          <div>

            <h2 class="font-bold text-senado-primary text-[4.5vw] sm:text-2xl">Plan Operativo Anual (POA)</h2>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-[4vw] sm:p-6">
          <p class="text-gray-700 text-[2.7vw] sm:text-base leading-relaxed mb-[3vw] sm:mb-4">
            Instrumento de planificación anual que operacionaliza los objetivos estratégicos de la Cámara de Senadores, definiendo metas, actividades, responsables y recursos necesarios para su cumplimiento.
          </p>
          <div class="flex flex-wrap items-center gap-[3vw] sm:gap-4 mb-[3vw] sm:mb-4">
            <div class="flex items-center gap-[2vw] sm:gap-2 text-[2.4vw] sm:text-sm text-gray-600">
              <Icon name="mdi:calendar" class="text-senado-primary text-[3.6vw] sm:text-base" />
              <span>Gestión 2026</span>
            </div>
            <div class="flex items-center gap-[2vw] sm:gap-2 text-[2.4vw] sm:text-sm">
              <span class="inline-flex items-center px-[2vw] sm:px-2.5 py-[0.3vw] sm:py-0.5 rounded-full text-[2.1vw] sm:text-xs font-medium bg-green-100 text-green-800">
                Vigente
              </span>
            </div>
          </div>

        

          <!-- Botón de descarga del PDF -->
          <div class="pt-[3vw] sm:pt-4 border-t border-gray-200">
            <a 
              href="/pdfs/planificacion/POA-2026.pdf" 
              download
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-[2vw] sm:gap-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors px-[4vw] sm:px-5 py-[2.4vw] sm:py-2.5 text-[2.7vw] sm:text-sm font-semibold"
            >
              <Icon name="mdi:file-pdf-box" class="text-[4vw] sm:text-lg" />
              Descargar POA 2026 (PDF)
            </a>
          </div>
        </div>
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
  title: 'Plan Estratégico y POA | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Plan Estratégico Institucional (PEI 2026-2027), Programación Operativo Anual (POA 2026), Seguimiento y Evaluación al POA, y Flujos de Procesos de la Cámara de Senadores.' },
  ],
})
</script>