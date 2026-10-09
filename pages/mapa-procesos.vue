<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:sitemap" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">GESTIÓN INSTITUCIONAL</span>
            </div>
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              Mapa de <span class="text-senado-gold">Procesos</span>
            </h1>
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              CÁMARA DE SENADORES
            </p>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <!-- Contenido -->
    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">

      <!-- Intro -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-[4vw] sm:p-6 mb-[4.5vw] sm:mb-6">
        <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
          El Mapa de Procesos Institucional de la Cámara de Senadores es la representación gráfica
          de los procesos estratégicos, sustantivos, de apoyo y de evaluación que desarrolla la
          institución, reflejando los tiempos, responsables y productos conforme a la normativa vigente.
        </p>
      </div>

      <!-- MAPA DE PROCESOS -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-[4.5vw] sm:mb-6">
        <div class="bg-gradient-to-r from-[#1a3a6c] to-[#0f2347] px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
          <h2 class="font-bold text-white flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:chart-tree" class="text-senado-gold text-[4.5vw] sm:text-xl" />
            Mapa de Procesos — Cámara de Senadores
          </h2>
        </div>

        <div class="p-[4vw] sm:p-8">
          <!-- Nivel 1: Procesos Legislativos -->
          <div class="mb-[4vw] sm:mb-6">
            <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
              <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#1a3a6c] to-[#0f2347] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:bank" class="text-white text-[6vw] sm:text-2xl" />
              </div>
              <div>
                <h3 class="font-bold text-[#1a3a6c] text-[4vw] sm:text-xl">PROCESOS LEGISLATIVOS</h3>
                <p class="text-gray-500 text-[2.4vw] sm:text-sm">Procesos sustantivos de la institución</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.4vw] sm:gap-3 ml-[5vw] sm:ml-16">
              <div v-for="(proc, i) in procesosLegislativos" :key="i"
                   class="bg-[#f0f4f9] border-l-4 border-[#1a3a6c] rounded-lg px-[3vw] sm:px-4 py-[2.4vw] sm:py-3 hover:shadow-md transition-shadow">
                <div class="flex items-start gap-[1.5vw] sm:gap-2">
                  <Icon name="mdi:chevron-right" class="text-[#1a3a6c] text-[3.6vw] sm:text-lg flex-shrink-0 mt-[0.2vw] sm:mt-0.5" />
                  <span class="text-[2.7vw] sm:text-sm text-gray-800 font-medium">{{ proc }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Flecha hacia abajo -->
          <div class="flex justify-center mb-[4vw] sm:mb-6">
            <Icon name="mdi:arrow-down-bold" class="text-[#1a3a6c] text-[10vw] sm:text-5xl" />
          </div>

          <!-- Nivel 2: Resultados Institucionales -->
          <div class="mb-[4vw] sm:mb-6">
            <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
              <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#8f1522] to-[#611717] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:check-decagram" class="text-white text-[6vw] sm:text-2xl" />
              </div>
              <div>
                <h3 class="font-bold text-[#611717] text-[4vw] sm:text-xl">RESULTADOS INSTITUCIONALES</h3>
                <p class="text-gray-500 text-[2.4vw] sm:text-sm">Productos entregados a la ciudadanía</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-[2.4vw] sm:gap-3 ml-[5vw] sm:ml-16">
              <div v-for="(res, i) in resultadosInstitucionales" :key="i"
                   class="bg-[#fdf2f2] border-l-4 border-[#611717] rounded-lg px-[3vw] sm:px-4 py-[2.4vw] sm:py-3 hover:shadow-md transition-shadow">
                <div class="flex items-start gap-[1.5vw] sm:gap-2">
                  <Icon name="mdi:star-check" class="text-[#611717] text-[3.6vw] sm:text-lg flex-shrink-0 mt-[0.2vw] sm:mt-0.5" />
                  <span class="text-[2.7vw] sm:text-sm text-gray-800 font-medium">{{ res }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Flecha hacia abajo -->
          <div class="flex justify-center mb-[4vw] sm:mb-6">
            <Icon name="mdi:arrow-down-bold" class="text-[#1a3a6c] text-[10vw] sm:text-5xl" />
          </div>

          <!-- Nivel 3: Beneficiarios -->
          <div class="mb-[4vw] sm:mb-6">
            <div class="flex items-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
              <div class="w-[10vw] sm:w-12 h-[10vw] sm:h-12 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#8f7320] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account-group" class="text-white text-[6vw] sm:text-2xl" />
              </div>
              <div>
                <h3 class="font-bold text-[#8f7320] text-[4vw] sm:text-xl">BENEFICIARIOS</h3>
                <p class="text-gray-500 text-[2.4vw] sm:text-sm">Destinatarios de los resultados institucionales</p>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-3 ml-[5vw] sm:ml-16">
              <div v-for="(ben, i) in beneficiarios" :key="i"
                   class="bg-[#fdfcf7] border-l-4 border-[#c9a84c] rounded-lg px-[3vw] sm:px-4 py-[2.4vw] sm:py-3 text-center hover:shadow-md transition-shadow">
                <Icon :name="ben.icono" class="text-[#c9a84c] text-[5vw] sm:text-xl mb-[1vw] sm:mb-1" />
                <p class="text-[2.4vw] sm:text-sm text-gray-800 font-medium">{{ ben.nombre }}</p>
              </div>
            </div>
          </div>

          <!-- Flecha hacia abajo -->
          <div class="flex justify-center mb-[4vw] sm:mb-6">
            <Icon name="mdi:arrow-down-bold" class="text-[#1a3a6c] text-[10vw] sm:text-5xl" />
          </div>

          <!-- Nivel 4: Valor Público -->
          <div class="bg-gradient-to-r from-[#1a3a6c] via-[#611717] to-[#c9a84c] rounded-xl px-[4vw] sm:px-6 py-[4vw] sm:py-5 text-center shadow-lg">
            <Icon name="mdi:hand-heart" class="text-white text-[8vw] sm:text-4xl mb-[1.5vw] sm:mb-2" />
            <h3 class="font-bold text-white text-[4.5vw] sm:text-xl tracking-wide">
              VALOR PÚBLICO Y BENEFICIO PARA LA CIUDADANÍA
            </h3>
          </div>
        </div>
      </div>

      <!-- Procesos Administrativos -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-[4.5vw] sm:mb-6">
        <div class="bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
          <h2 class="font-bold text-white flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:cog" class="text-white text-[4.5vw] sm:text-xl" />
            PROCESOS ADMINISTRATIVOS (Apoyo)
          </h2>
        </div>

        <div class="p-[4vw] sm:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2.4vw] sm:gap-3">
            <div v-for="(proc, i) in procesosAdministrativos" :key="i"
                 class="bg-gray-50 border-l-4 border-gray-400 rounded-lg px-[3vw] sm:px-4 py-[2.4vw] sm:py-3 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-[1.5vw] sm:gap-2">
                <Icon name="mdi:chevron-right" class="text-gray-500 text-[3.6vw] sm:text-lg flex-shrink-0 mt-[0.2vw] sm:mt-0.5" />
                <span class="text-[2.7vw] sm:text-sm text-gray-800 font-medium">{{ proc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-base font-medium">
          <Icon name="mdi:arrow-left" class="text-[4vw] sm:text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const procesosLegislativos = [
  'Gestión legislativa',
  'Tratamiento y aprobación de leyes',
  'Fiscalización al Órgano Ejecutivo',
  'Gestión de comisiones',
  'Gestión del Pleno Camaral',
  'Participación ciudadana',
  'Gestión de instrumentos legislativos',
]

const resultadosInstitucionales = [
  'Leyes aprobadas',
  'Fiscalización efectiva',
  'Gestión institucional eficiente y transparente',
]

const beneficiarios = [
  { nombre: 'Ciudadanía', icono: 'mdi:account-multiple' },
  { nombre: 'Órganos del Estado', icono: 'mdi:bank' },
  { nombre: 'Instituciones públicas', icono: 'mdi:domain' },
  { nombre: 'Organizaciones sociales', icono: 'mdi:account-group' },
]

const procesosAdministrativos = [
  'Administración financiera y presupuestaria',
  'Gestión de recursos humanos',
  'Contratación de bienes y servicios',
  'Gestión jurídica',
  'Gestión de tecnologías de información',
  'Gestión documental y archivo',
  'Comunicación institucional',
  'Servicios generales y mantenimiento',
  'Protocolo y relaciones institucionales',
]

useHead({
  title: 'Mapa de Procesos | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Mapa de Procesos Institucional de la Cámara de Senadores - Procesos legislativos, administrativos, resultados y valor público.' },
  ],
})
</script>