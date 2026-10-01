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

          <p class="text-white/80 mt-[2.5vw] sm:mt-4 text-[3.3vw] sm:text-base leading-relaxed">
            La UTLCC de la Cámara de Senadores promueve una gestión pública honesta, visible y accesible,
            en cumplimiento de la <strong>Ley N° 974</strong>. Promovemos la ética, aseguramos el acceso
            a la información pública y facilitamos el control ciudadano.
          </p>
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
            A través de este espacio, usted ciudadano/a puede presentar denuncias que concurran
            en la Cámara de Senadores sobre:
          </p>

          <ul class="space-y-[1.5vw] sm:space-y-2 text-[3vw] sm:text-base text-gray-700">
            <li class="flex items-start gap-[2vw] sm:gap-3">
              <span class="text-senado-primary mt-[0.5vw] sm:mt-1">•</span>
              <span>Posibles actos de corrupción.</span>
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
          Ingresa con tu <strong>Ciudadanía Digital</strong> para registrar tu denuncia de forma
          segura y reservada.
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

      <!-- ========================================== -->
      <!-- INTRODUCCIÓN PASOS                          -->
      <!-- ========================================== -->
      <div class="mb-[5vw] sm:mb-8">
        <div class="text-center mb-[3vw] sm:mb-4">
          <h2 class="text-[6vw] sm:text-3xl font-bold text-senado-primary mb-[1.5vw] sm:mb-2">
            Pasos para Denunciar
          </h2>
          <div class="w-[15vw] sm:w-[6vw] h-[0.6vw] sm:h-[0.2vw] bg-senado-primary mx-auto rounded-full"></div>
        </div>
        <p class="text-[3.3vw] sm:text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          Ahora <strong class="text-senado-primary">DENUNCIAR HECHOS DE CORRUPCIÓN</strong> ante el
          Viceministerio de Transparencia Institucional y Lucha Contra la Corrupción es muy
          <strong class="text-senado-primary">FÁCIL</strong>. Solo sigue estos pasos:
        </p>
      </div>

      <!-- ========================================== -->
      <!-- PASOS DEL PROCESO                           -->
      <!-- ========================================== -->
      <div class="space-y-[4vw] sm:space-y-6">

        <!-- PASO 1 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 1</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Ingresa a la página web</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-2 md:order-1">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed mb-[2.5vw] sm:mb-4">
                Ingresa a la página web:
              </p>
              <a
                href="https://sitpreco.s2plus.transparencia.gob.bo/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark font-semibold text-[3vw] sm:text-base underline decoration-2 underline-offset-4 transition-colors mb-[2.5vw] sm:mb-4 break-all"
              >
                <Icon name="mdi:link-variant" class="text-[4vw] sm:text-lg flex-shrink-0" />
                sitpreco.s2plus.transparencia.gob.bo
              </a>
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed mb-[2.5vw] sm:mb-4">
                con tu usuario y contraseña de <strong>Ciudadanía Digital</strong>.
              </p>
              <a
                href="https://www.gob.bo/ciudadania"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark font-semibold text-[3vw] sm:text-base underline decoration-2 underline-offset-4 transition-colors"
              >
                <Icon name="mdi:account-key" class="text-[4vw] sm:text-lg flex-shrink-0" />
                www.gob.bo/ciudadania
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img
                src="/gestion-denuncia/paso1.jpg"
                alt="Paso 1: Ingresar a la plataforma"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 2 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 2</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Accede a "Mis Documentos"</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-1 md:order-1">
              <img
                src="/gestion-denuncia/paso2.jpg"
                alt="Paso 2: Mis Documentos"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                Haz clic en tu bandeja principal y encontrarás la sección de
                <strong>Mis Documentos</strong>, haz clic en el botón
                <strong>Nuevo</strong>, para registrar una nueva denuncia.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 3 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 3</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Completa el Formulario de Denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-2 md:order-1">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                Encontrarás el <strong>Formulario de Denuncia</strong>,
                donde podrás ingresar la referencia, entidad o empresa pública donde ocurrió el
                supuesto acto de corrupción. Recuerda que se puede
                <strong>reservar tu identidad</strong>.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img
                src="/gestion-denuncia/paso3.jpg"
                alt="Paso 3: Formulario de Denuncia"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 4 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 4</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Registra al denunciado(a)</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-1 md:order-1">
              <img
                src="/gestion-denuncia/paso4.jpg"
                alt="Paso 4: Registrar denunciado"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                <strong>Registra al denunciado(a)</strong>
                señalando el nombre y la entidad donde ocurrió el supuesto acto de corrupción.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 5 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 5</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Selecciona el tipo de acto</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-2 md:order-1">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                <strong>Registra</strong> en el menú desplegable
                el posible acto de corrupción.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img
                src="/gestion-denuncia/paso5.jpg"
                alt="Paso 5: Tipo de acto de corrupción"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 6 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 6</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Detalla los datos de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-1 md:order-1">
              <img
                src="/gestion-denuncia/paso6.jpg"
                alt="Paso 6: Detallar la denuncia"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                <strong>Registra</strong> todos los datos de la
                denuncia, como ser la <strong>fecha</strong>, <strong>departamento y municipio</strong>,
                además describe el supuesto hecho de posible acto de corrupción y guárdalo.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 7 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 7</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Genera el PDF de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-2 md:order-1">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                Encontrarás el formulario de denuncia en
                <strong>formato PDF</strong>
                con todos los datos que se fueron registrando.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img
                src="/gestion-denuncia/paso7.jpg"
                alt="Paso 7: PDF de la denuncia"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 8 -->
        <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div class="bg-senado-primary text-white px-[3.5vw] sm:px-5 py-[2vw] sm:py-3 flex items-center gap-[2vw] sm:gap-3">
            <span class="font-bold text-[4.5vw] sm:text-lg">PASO 8</span>
            <span class="text-[3vw] sm:text-sm text-white/80">Seguimiento de tu denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[3.5vw] sm:gap-6 p-[3.5vw] sm:p-6 items-center">
            <div class="order-1 md:order-1">
              <img
                src="/gestion-denuncia/paso8.jpg"
                alt="Paso 8: Seguimiento de la denuncia"
                class="w-full rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[3vw] sm:text-base text-gray-700 leading-relaxed">
                Con tu <strong>Ciudadanía Digital</strong>,
                en el buzón de entrada podrás hacer seguimiento de tu denuncia.
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- ========================================== -->
      <!-- CTA FINAL                                   -->
      <!-- ========================================== -->
      <div class="mt-[6vw] sm:mt-8 bg-gradient-to-r from-senado-primary to-senado-primary-dark rounded-2xl shadow-lg p-[5vw] sm:p-8 text-center text-white">
        <div class="flex justify-center mb-[3vw] sm:mb-4">
          <div class="w-[14vw] sm:w-16 h-[14vw] sm:h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <Icon name="mdi:shield-star" class="text-senado-gold text-[7vw] sm:text-3xl" />
          </div>
        </div>

        <h3 class="text-[5.5vw] sm:text-2xl font-bold mb-[2.5vw] sm:mb-3">
          ¿Listo para realizar tu denuncia?
        </h3>

        <p class="text-[3vw] sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto mb-[4vw] sm:mb-6">
          Ingresa al sistema SITPRECO con tu Ciudadanía Digital y registra tu denuncia
          de forma segura. Puedes reservar tu identidad.
        </p>

        <a
          href="https://sitpreco.s2plus.transparencia.gob.bo/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-[2vw] sm:gap-2 bg-senado-gold hover:bg-senado-gold-dark text-senado-primary-dark font-bold rounded-lg py-[2.8vw] sm:py-3 px-[7vw] sm:px-8 text-[3.3vw] sm:text-base transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Icon name="mdi:open-in-new" class="text-[4vw] sm:text-lg" />
          Ir a SITPRECO
        </a>

        <p class="text-[2.4vw] sm:text-xs text-white/60 mt-[3vw] sm:mt-5">
          Viceministerio de Transparencia, Seguridad Jurídica e Integridad Pública – 2026
        </p>
      </div>

      <!-- ========================================== -->
      <!-- BOTÓN VOLVER                                -->
      <!-- ========================================== -->
      <div class="mt-[6vw] sm:mt-10 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-[2vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-base font-medium"
        >
          <Icon name="mdi:arrow-left" class="text-[4vw] sm:text-lg" />
          Volver al inicio
        </NuxtLink>
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