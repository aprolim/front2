<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ========================================== -->
    <!-- HERO                                        -->
    <!-- ========================================== -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-12">
        <div class="max-w-3xl">
          <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.5vw] sm:gap-2 px-[3vw] sm:px-4 py-[1vw] sm:py-1.5 mb-[2vw] sm:mb-3">
            <Icon name="mdi:shield-star" class="text-senado-gold text-[4.5vw] sm:text-xl" />
            <span class="text-white/90 tracking-wider font-medium text-[2.4vw] sm:text-sm">
              TRANSPARENCIA Y LUCHA CONTRA LA CORRUPCIÓN
            </span>
          </div>

          <h1 class="font-bold leading-tight text-[9vw] sm:text-4xl md:text-5xl">
            Transparencia y Lucha <br class="hidden sm:block" />
            Contra la <span class="text-senado-gold">Corrupción</span>
          </h1>

        </div>
      </div>

      <!-- Onda inferior -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- CONTENIDO PRINCIPAL                         -->
    <!-- ========================================== -->
    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">

      <!-- ========================================== -->
      <!-- TARJETA INFORMATIVA UTLCC CON COMETA        -->
      <!-- ========================================== -->
      <div class="relative bg-white rounded-2xl shadow-md border border-gray-100 mb-[4.5vw] sm:mb-6 p-[3.5vw] sm:p-6 overflow-hidden">

        <!-- Cometa dorado -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="2" y="2"
            width="calc(100% - 4px)" height="calc(100% - 4px)"
            rx="16" ry="16"
            fill="none"
            stroke="#e3d194"
            stroke-width="3"
            stroke-dasharray="12 100"
            stroke-linecap="round"
            pathLength="100"
            class="comet"
          />
        </svg>

        <div class="relative z-10">
          <h2 class="text-[4vw] sm:text-2xl font-bold text-senado-primary mb-[2.5vw] sm:mb-4 flex items-center gap-[2vw] sm:gap-3">
            <Icon name="mdi:file-document-check" class="text-senado-primary text-[5vw] sm:text-2xl" />
            Gestión de Denuncias
          </h2>

          <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed mb-[2.5vw] sm:mb-4">
            A través de este espacio, se pueden presentar denuncias en la camara de senadores sobre:
          </p>

          <ul class="space-y-[1.5vw] sm:space-y-2 text-[3vw] sm:text-base text-gray-700">
            <li class="flex items-start gap-[2vw] sm:gap-3">
              <span class="text-senado-primary mt-[0.5vw] sm:mt-1">•</span>
              <span>Indicios de actos de corrupción.</span>
            </li>
            <li class="flex items-start gap-[2vw] sm:gap-3">
              <span class="text-senado-primary mt-[0.5vw] sm:mt-1">•</span>
              <span>Negativa injustificada de acceso a la información.</span>
            </li>
            <li class="flex items-start gap-[2vw] sm:gap-3">
              <span class="text-senado-primary mt-[0.5vw] sm:mt-1">•</span>
              <span>Falsedad en títulos académicos de servidores públicos.</span>
            </li>
            <li class="flex items-start gap-[2vw] sm:gap-3">
              <span class="text-senado-primary mt-[0.5vw] sm:mt-1">•</span>
              <span>Irregularidades en contrataciones en curso, con indicios de actos de corrupción.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- TARJETA SITPRECO                            -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest rounded-2xl border border-senado-gold p-[4vw] sm:p-6 mb-[6vw] sm:mb-8 text-center">
        <div class="flex items-center justify-center gap-[2vw] sm:gap-3 mb-[3vw] sm:mb-4">
          <Icon name="mdi:bank" class="text-senado-primary text-[6vw] sm:text-3xl" />
          <h2 class="text-[4.5vw] sm:text-2xl font-bold text-senado-primary tracking-tight">
            Cámara de Senadores
          </h2>
        </div>

        <p class="text-[3vw] sm:text-base text-gray-700 max-w-2xl mx-auto mb-[3.5vw] sm:mb-5">
          Registro de denuncias con ciudadania digital
        </p>

        <a
          href="https://sitpreco.s2plus.transparencia.gob.bo/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-[2vw] sm:gap-2 bg-senado-primary hover:bg-senado-primary-dark text-white font-semibold rounded-lg py-[2.5vw] sm:py-3 px-[6vw] sm:px-8 text-[3.3vw] sm:text-base transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Icon name="mdi:login" class="text-[4.5vw] sm:text-xl" />
          Ingresar con Ciudadanía Digital
        </a>
      </div>

    
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Denuncias por hechos de corrupción - SITPRECO S2+',
  meta: [
    { name: 'description', content: 'Denuncia hechos de corrupción ante el Viceministerio de Transparencia Institucional y Lucha Contra la Corrupción a través de SITPRECO S2+.' },
    { property: 'og:title', content: 'Denuncias por hechos de corrupción - SITPRECO S2+' },
    { property: 'og:description', content: 'Registra tu denuncia por hechos de corrupción de forma fácil y segura.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style scoped>
.comet {
  animation: comet-cw 23s linear infinite;
  stroke-dashoffset: -8vw;
}

@keyframes comet-cw {
  0%   { stroke-dashoffset: -8vw; }
  100% { stroke-dashoffset: -56vw; }
}
</style>