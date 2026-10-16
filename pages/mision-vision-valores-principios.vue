<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo de marca de agua -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/background/fondo3.png');"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/80 to-white/80"></div>

    <!-- Decoración superior -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>

    <!-- Contenido -->
    <div class="relative z-10 container mx-auto px-4 py-[6vw] sm:py-16">

      <!-- Encabezado -->
      <div class="text-center mb-[6vw] sm:mb-12">
        <h1 class="text-[8vw] sm:text-5xl lg:text-6xl font-bold text-senado-primary leading-tight">
          Misión y Visión
        </h1>
        <p class="text-gray-500 mt-[3vw] sm:mt-4 text-[3.3vw] sm:text-lg max-w-2xl mx-auto">
          Principios que guían nuestra labor legislativa
        </p>
      </div>

      <!-- ============================================ -->
      <!-- MISIÓN Y VISIÓN                              -->
      <!-- ============================================ -->
      <div class="max-w-5xl mx-auto space-y-[4vw] sm:space-y-8 mb-[8vw] sm:mb-16">

        <!-- Misión -->
        <div class="group relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>
          <div class="p-[5vw] sm:p-8 md:p-10">
            <div class="flex items-start gap-[3vw] sm:gap-5 mb-[3vw] sm:mb-5">
              <div class="flex-shrink-0 w-[12vw] sm:w-14 h-[12vw] sm:h-14 bg-gradient-to-br from-senado-primary/20 to-senado-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="mdi:bullseye-arrow" class="text-[6vw] sm:text-3xl text-senado-primary" />
              </div>
              <div>
                <span class="text-[2.1vw] sm:text-sm font-semibold text-senado-primary/60 uppercase tracking-wider">Nuestro propósito</span>
                <h2 class="text-[6vw] sm:text-3xl md:text-4xl font-bold text-senado-primary">Misión</h2>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed text-[3vw] sm:text-lg md:text-xl font-medium text-justify">
              Ejercer las funciones legislativa, fiscalizadora y de gestión de la Cámara de Senadores, mediante la elaboración y aprobación de leyes, el control y fiscalización de la gestión pública, el acceso a la información y la representación territorial, promoviendo la participación ciudadana y contribuyendo al desarrollo integral del Estado Plurinacional de Bolivia, en el marco de la Constitución Política del Estado y la normativa vigente.
            </p>
          </div>
        </div>

        <!-- Visión -->
        <div class="group relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-senado-gold-dark via-senado-primary to-senado-gold-dark"></div>
          <div class="p-[5vw] sm:p-8 md:p-10">
            <div class="flex items-start gap-[3vw] sm:gap-5 mb-[3vw] sm:mb-5">
              <div class="flex-shrink-0 w-[12vw] sm:w-14 h-[12vw] sm:h-14 bg-gradient-to-br from-senado-gold-dark/20 to-senado-gold-dark/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="mdi:binoculars" class="text-[6vw] sm:text-3xl text-senado-gold-dark" />
              </div>
              <div>
                <span class="text-[2.1vw] sm:text-sm font-semibold text-senado-gold-dark/60 uppercase tracking-wider">Nuestra aspiración</span>
                <h2 class="text-[6vw] sm:text-3xl md:text-4xl font-bold text-senado-primary">Visión</h2>
              </div>
            </div>
            <p class="text-gray-700 leading-relaxed text-[3vw] sm:text-lg md:text-xl font-medium text-justify">
              Consolidar una Cámara de Senadores moderna, eficiente, transparente, digital y cercana a la ciudadanía, reconocida por la calidad de su labor legislativa, fiscalizadora y gestión, fortaleciendo la democracia, la participación ciudadana y el desarrollo integral del Estado Plurinacional de Bolivia.
            </p>
          </div>
        </div>
      </div>



      <!-- Botón volver -->
      <div class="text-center pt-[4vw] sm:pt-8">
        <NuxtLink to="/" class="inline-flex items-center gap-[2vw] sm:gap-3 text-senado-primary hover:text-senado-primary-dark transition-all duration-300 text-[3.3vw] sm:text-base md:text-lg font-medium group">
          <span class="w-[10vw] sm:w-10 h-[10vw] sm:h-10 rounded-full border-2 border-senado-primary/30 flex items-center justify-center group-hover:border-senado-primary group-hover:bg-senado-primary/5 transition-all duration-300">
            <Icon name="mdi:arrow-left" class="text-[5vw] sm:text-xl" />
          </span>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>

    <!-- Decoración inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-senado-primary via-senado-gold-dark to-senado-primary"></div>
  </div>
</template>

<script setup>
const valores = [
  { nombre: 'Integridad', icono: 'mdi:shield-check', descripcion: 'Actuar con rectitud, honestidad y coherencia, priorizando el interés público en el ejercicio de la función institucional.' },
  { nombre: 'Probidad', icono: 'mdi:handshake', descripcion: 'Desempeñar la función pública con honradez, transparencia y responsabilidad, evitando cualquier actuación contraria a los intereses del Estado.' },
  { nombre: 'Respeto', icono: 'mdi:account-heart', descripcion: 'Reconocer la dignidad, los derechos, las ideas y las diferencias de las personas, promoviendo relaciones institucionales basadas en el diálogo y el trato digno.' },
  { nombre: 'Compromiso', icono: 'mdi:check-decagram', descripcion: 'Cumplir las responsabilidades institucionales con dedicación, responsabilidad y vocación de servicio al Estado y a la sociedad.' },
  { nombre: 'Vocación de servicio', icono: 'mdi:hand-heart', descripcion: 'Orientar el desempeño institucional hacia la atención de las necesidades de la ciudadanía y el cumplimiento de los fines del Estado.' },
  { nombre: 'Profesionalismo', icono: 'mdi:school', descripcion: 'Ejercer las funciones con conocimiento, capacidad técnica, responsabilidad, actualización permanente y criterios objetivos.' },
  { nombre: 'Pluralismo', icono: 'mdi:account-group', descripcion: 'Reconocer y respetar la diversidad política, social, cultural y territorial que caracteriza al Estado Plurinacional de Bolivia, promoviendo el diálogo y la convivencia democrática.' },
  { nombre: 'Equidad', icono: 'mdi:scale-balance', descripcion: 'Promover un trato justo e imparcial, considerando la diversidad y las características de los diferentes sectores y territorios del Estado.' },
]

const principios = [
  { nombre: 'Legalidad y legitimidad', icono: 'mdi:gavel', descripcion: 'Ejercer las atribuciones constitucionales y legales de la Cámara de Senadores en el marco del ordenamiento jurídico vigente y de la representación democrática que le corresponde.' },
  { nombre: 'Interés público', icono: 'mdi:account-multiple-check', descripcion: 'Orientar la actividad legislativa, fiscalizadora y administrativa hacia la atención de las necesidades de la sociedad y la consecución del bien común.' },
  { nombre: 'Transparencia y acceso', icono: 'mdi:eye-check', descripcion: 'Desarrollar una gestión abierta, verificable y accesible, facilitando el conocimiento de las decisiones, procesos y resultados institucionales, conforme al marco normativo vigente.' },
  { nombre: 'Participación y representación', icono: 'mdi:vote', descripcion: 'Fortalecer la vinculación de la Cámara de Senadores con la ciudadanía, los departamentos y las instituciones públicas y privadas, promoviendo mecanismos de participación y articulación.' },
  { nombre: 'Responsabilidad institucional', icono: 'mdi:briefcase-check', descripcion: 'Ejercer las funciones y administrar los recursos públicos con responsabilidad, oportunidad y compromiso con los resultados institucionales.' },
  { nombre: 'Eficiencia y racionalidad', icono: 'mdi:chart-line', descripcion: 'Orientar la gestión institucional al logro de resultados, procurando el uso racional, económico y eficiente de los recursos públicos.' },
  { nombre: 'Coordinación institucional', icono: 'mdi:link-variant', descripcion: 'Promover la coordinación entre las instancias legislativas y administrativas de la Cámara, así como con las instituciones del Estado, para el cumplimiento efectivo de sus funciones.' },
  { nombre: 'Orientación a resultados', icono: 'mdi:target', descripcion: 'Dirigir la planificación y gestión institucional hacia resultados verificables, promoviendo permanentemente la evaluación, innovación y mejora de los procesos.' },
]

useHead({
  title: 'Misión, Visión, Valores y Principios | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Misión, Visión, Valores y Principios Institucionales de la Cámara de Senadores de Bolivia.' },
  ],
})
</script>