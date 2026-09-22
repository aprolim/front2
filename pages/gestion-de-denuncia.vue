<template>
  <div class="min-h-screen bg-[#2B2E33]/80 shadow-md py-[1.6vw]">
    <div class="mx-auto w-[90%] max-w-[1400px]">

      <!-- ========================================== -->
      <!-- TÍTULO PRINCIPAL                            -->
      <!-- ========================================== -->
      <div class="mb-[0vw]">
        <h1 class="text-[1.9vw] font-bold text-white leading-tight text-center">
          Transparencia y Lucha Contra la Corrupción (UTLCC)
        </h1>
      </div>

      <!-- ========================================== -->
      <!-- TEXTO INSTITUCIONAL UTLCC CON COMETA        -->
      <!-- ========================================== -->
      <div class="relative mb-[1.4vw] text-white mt-[1.2vw] rounded-[0.8vw] p-[1vw] overflow-hidden">

        <!-- Cometa único -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0.2vw" y="0.2vw"
            width="calc(100% - 0.4vw)" height="calc(100% - 0.4vw)"
            rx="0.8vw" ry="0.8vw"
            fill="none"
            stroke="#e9e0be"
            stroke-width="0.8vw"
            stroke-dasharray="12 100"
            stroke-linecap="round"
            pathLength="100"
            class="comet"
          />
        </svg>

        <!-- Contenido -->
        <p class="text-[1vw] leading-relaxed mb-[2vw] relative z-10">
          <strong>Transparencia y Control Social:</strong> La UTLCC de la Cámara de Senadores promueve una gestión pública honesta, visible y accesible, en cumplimiento de la Ley N° 974. Promovemos la ética, aseguramos el acceso a la información pública y facilitamos el control ciudadano.
        </p>
        <p class="text-[1vw] leading-relaxed mb-[1vw] relative z-10">
          <strong>Gestión de Denuncias</strong> A través de este espacio, Usted ciudadano/a puede presentar denuncias, que concurran en la Cámara de Senadores, sobre:
        </p>
        <ul class="list-disc list-inside space-y-[0.6vw] text-[1vw] leading-relaxed pl-[2vw] relative z-10">
          <li>Posibles actos de corrupción.</li>
          <li>Negativa injustificada de acceso a la información.</li>
          <li>Falsedad en títulos académicos de servidores públicos.</li>
          <li>Irregularidades en contrataciones en curso, con indicios de actos de corrupción.</li>
        </ul>
      </div>

      <div class="flex justify-center">
        <div class="w-[15vw] h-[0.5vw] bg-[#4A4D52] mt-[1vw] rounded-full"></div>
      </div>

      <!-- ========================================== -->
      <!-- TARJETA SITPRECO                            -->
      <!-- ========================================== -->
      <div class="rounded-[1vw] p-[1vw] mb-[4vw] text-center">
        <div class="flex items-center justify-center gap-[3vw] mb-[1vw]">
          <h2 class="text-[1.5vw] font-bold text-white tracking-tight">
            CAMARA DE SENADORES
          </h2>
        </div>

        <a 
          href="https://sitpreco.s2plus.transparencia.gob.bo/" 
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full max-w-[25vw] mx-auto bg-[#3D4045] hover:bg-[#2B2E33] text-white font-medium rounded-[0.8vw] py-[1.2vw] px-[2vw] text-[1.1vw] shadow-md hover:shadow-lg transition-all duration-300"
        >
          Ingresar con Ciudadanía
        </a>
      </div>

      <!-- ========================================== -->
      <!-- INTRODUCCIÓN                                -->
      <!-- ========================================== -->
      <div class="mb-[1.2vw]">
        <p class="text-[1.3vw] text-white leading-relaxed text-center max-w-[50vw] mx-auto">
          Ahora <strong>DENUNCIAR HECHOS DE CORRUPCIÓN</strong> ante el
          Viceministerio de Transparencia Institucional y Lucha Contra la Corrupción es muy
          <strong>FÁCIL</strong> solo sigue estos pasos:
        </p>
      </div>

      <!-- ========================================== -->
      <!-- PASOS DEL PROCESO                           -->
      <!-- ========================================== -->
      <div class="space-y-[3vw]">

        <!-- PASO 1 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 1</span>
            <span class="text-[1vw] text-gray-300">Ingresa a la página web</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed mb-[1.5vw]">
                Ingresa a la página web:
              </p>
              <a 
                href="https://sitpreco.s2plus.transparencia.gob.bo/" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[0.8vw] text-[#3D4045] hover:text-[#1A1C20] font-semibold text-[1vw] underline decoration-2 underline-offset-4 transition-colors mb-[1.5vw] break-all"
              >
                <Icon name="mdi:link-variant" class="text-[1.2vw] flex-shrink-0" />
                sitpreco.s2plus.transparencia.gob.bo
              </a>
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed mb-[1.5vw]">
                con tu usuario y contraseña de <strong>Ciudadanía Digital</strong>.
              </p>
              <a 
                href="https://www.gob.bo/ciudadania" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[0.8vw] text-[#3D4045] hover:text-[#1A1C20] font-semibold text-[1vw] underline decoration-2 underline-offset-4 transition-colors"
              >
                <Icon name="mdi:account-key" class="text-[1.2vw] flex-shrink-0" />
                www.gob.bo/ciudadania
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso1.jpg" 
                alt="Paso 1: Ingresar a la plataforma"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 2 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 2</span>
            <span class="text-[1vw] text-gray-300">Accede a "Mis Documentos"</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso2.jpg" 
                alt="Paso 2: Mis Documentos"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                Haz clic en tu bandeja principal y encontrarás la sección de
                <strong>Mis Documentos</strong>, haz clic en el botón
                <strong>Nuevo</strong>, para registrar una nueva denuncia.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 3 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 3</span>
            <span class="text-[1vw] text-gray-300">Completa el Formulario de Denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
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
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 4 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 4</span>
            <span class="text-[1vw] text-gray-300">Registra al denunciado(a)</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso4.jpg" 
                alt="Paso 4: Registrar denunciado"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                <strong>Registra al denunciado(a)</strong>
                señalando el nombre y la entidad donde ocurrió el supuesto acto de corrupción.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 5 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 5</span>
            <span class="text-[1vw] text-gray-300">Selecciona el tipo de acto</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                <strong>Registra</strong> en el menú desplegable
                el posible acto de corrupción.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso5.jpg" 
                alt="Paso 5: Tipo de acto de corrupción"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 6 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 6</span>
            <span class="text-[1vw] text-gray-300">Detalla los datos de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso6.jpg" 
                alt="Paso 6: Detallar la denuncia"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                <strong>Registra</strong> todos los datos de la
                denuncia, como ser la <strong>fecha</strong>, <strong>departamento y municipio</strong>,
                además describe el supuesto hecho de posible acto de corrupción y guárdalo.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 7 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 7</span>
            <span class="text-[1vw] text-gray-300">Genera el PDF de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                Encontrarás el formulario de denuncia en
                <strong>formato PDF</strong>
                con todos los datos que se fueron registrando.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso7.jpg" 
                alt="Paso 7: PDF de la denuncia"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 8 -->
        <div class="bg-white rounded-[1vw] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[2vw] py-[1vw] flex items-center gap-[1vw]">
            <span class="font-bold text-[1.5vw]">PASO 8</span>
            <span class="text-[1vw] text-gray-300">Seguimiento de tu denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw] p-[2vw] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso8.jpg" 
                alt="Paso 8: Seguimiento de la denuncia"
                class="w-full rounded-[0.8vw] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[1vw] text-[#1A1C20] leading-relaxed">
                Con tu <strong>Ciudadanía Digital</strong>,
                en el buzón de entrada podrás hacer seguimiento de tu denuncia.
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- ========================================== -->
      <!-- ENLACE FINAL AL SITPRECO                    -->
      <!-- ========================================== -->
      <div class="mt-[4vw] bg-white rounded-[1vw] shadow-2xl p-[3vw] text-center">
        <div class="flex justify-center mb-[1.5vw]">
          <div class="w-[5vw] h-[5vw] rounded-full bg-[#2B2E33] flex items-center justify-center">
            <Icon name="mdi:shield-star" class="text-white text-[2.5vw]" />
          </div>
        </div>
        <h3 class="text-[1.8vw] font-bold text-[#1A1C20] mb-[1vw]">
          ¿Listo para realizar tu denuncia?
        </h3>
        <p class="text-[1vw] text-gray-600 leading-relaxed max-w-[35vw] mx-auto mb-[2vw]">
          Ingresa al sistema SITPRECO con tu Ciudadanía Digital y registra tu denuncia
          de forma segura. Puedes reservar tu identidad.
        </p>
        <a 
          href="https://sitpreco.s2plus.transparencia.gob.bo/" 
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-[0.8vw] bg-[#3D4045] hover:bg-[#2B2E33] text-white font-medium rounded-[0.8vw] py-[1.2vw] px-[3vw] transition-all duration-300 text-[1.1vw] shadow-md hover:shadow-lg"
        >
          <Icon name="mdi:open-in-new" class="text-[1.2vw]" />
          Ir a SITPRECO
        </a>
        <p class="text-[0.85vw] text-gray-500 mt-[1.5vw]">
          Viceministerio de Transparencia, Seguridad Jurídica e Integridad Pública – 2026
        </p>
      </div>

      <!-- ========================================== -->
      <!-- BOTÓN VOLVER                                -->
      <!-- ========================================== -->
      <div class="mt-[4vw] text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-[0.6vw] text-gray-300 hover:text-white transition-colors text-[1vw] font-medium"
        >
          <Icon name="mdi:arrow-left" class="text-[1.2vw]" />
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
  stroke-dashoffset: -8vw; /* arranca desplazado, sin pausa en la esquina */
}

@keyframes comet-cw {
  0%   { stroke-dashoffset: -8vw; }
  100% { stroke-dashoffset: -56vw; }
}
</style>