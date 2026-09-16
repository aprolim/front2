<template>
  <div class="min-h-screen bg-[#2B2E33] py-[6vw]">
    <div class="mx-auto w-[90%] max-w-[1400px]">

      <!-- ========================================== -->
      <!-- TÍTULO PRINCIPAL                            -->
      <!-- ========================================== -->
      <div class="mb-[5vw]">
        <h1 class="text-[min(9vw,48px)] font-bold text-white leading-tight">
          Denuncias por hechos de corrupción
        </h1>
        <div class="w-[min(15vw,90px)] h-[min(0.5vw,4px)] bg-[#4A4D52] mt-[2.5vw] rounded-full"></div>
      </div>

      <!-- ========================================== -->
      <!-- TARJETA SITPRECO                            -->
      <!-- ========================================== -->
      <div class="bg-white rounded-[min(2vw,14px)] shadow-2xl p-[min(6vw,40px)] mb-[8vw] text-center">
        <!-- Logo + Título -->
        <div class="flex items-center justify-center gap-[min(3vw,20px)] mb-[min(4vw,24px)]">
          <div class="w-[min(16vw,110px)] h-[min(16vw,110px)] rounded-full bg-[#2B2E33] flex items-center justify-center flex-shrink-0">
            <Icon name="mdi:shield-star" class="text-white text-[min(8vw,55px)]" />
          </div>
          <h2 class="text-[min(7vw,36px)] font-bold text-[#1A1C20] tracking-tight">
            SITPRECO <span class="text-[#4A4D52]">S2+</span>
          </h2>
        </div>

        <!-- Botón principal -->
        <a 
          href="https://sitpreco.s2plus.transparencia.gob.bo/" 
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full max-w-[min(70vw,420px)] mx-auto bg-[#3D4045] hover:bg-[#2B2E33] text-white font-medium rounded-[min(1.5vw,10px)] py-[min(3.5vw,16px)] px-[min(4vw,24px)] text-[min(4.2vw,16px)] shadow-md hover:shadow-lg transition-all duration-300"
        >
          Ingresar con Ciudadanía
        </a>

        <!-- Subtítulo institucional -->
        <p class="text-[min(2.7vw,13px)] text-gray-600 mt-[min(4vw,20px)] leading-relaxed max-w-[min(85vw,500px)] mx-auto">
          Viceministerio de Transparencia, Seguridad Jurídica e Integridad Pública – 2026
        </p>
      </div>

      <!-- ========================================== -->
      <!-- INTRODUCCIÓN                                -->
      <!-- ========================================== -->
      <div class="mb-[8vw]">
        <p class="text-[min(4.5vw,20px)] text-white leading-relaxed text-center max-w-[min(90vw,800px)] mx-auto">
          Ahora <strong>DENUNCIAR HECHOS DE CORRUPCIÓN</strong> ante el
          Viceministerio de Transparencia Institucional y Lucha Contra la Corrupción es muy
          <strong>FÁCIL</strong> solo sigue estos pasos:
        </p>
      </div>

      <!-- ========================================== -->
      <!-- PASOS DEL PROCESO                           -->
      <!-- ========================================== -->
      <div class="space-y-[8vw]">

        <!-- PASO 1 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 1</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Ingresa a la página web</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed mb-[min(3vw,14px)]">
                Ingresa a la página web:
              </p>
              <a 
                href="https://sitpreco.s2plus.transparencia.gob.bo/" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[min(2vw,10px)] text-[#3D4045] hover:text-[#1A1C20] font-semibold text-[min(3.6vw,15px)] underline decoration-2 underline-offset-4 transition-colors mb-[min(3vw,14px)] break-all"
              >
                <Icon name="mdi:link-variant" class="text-[min(4.5vw,20px)] flex-shrink-0" />
                sitpreco.s2plus.transparencia.gob.bo
              </a>
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed mb-[min(3vw,14px)]">
                con tu usuario y contraseña de <strong>Ciudadanía Digital</strong>.
              </p>
              <a 
                href="https://www.gob.bo/ciudadania" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-[min(2vw,10px)] text-[#3D4045] hover:text-[#1A1C20] font-semibold text-[min(3.6vw,15px)] underline decoration-2 underline-offset-4 transition-colors"
              >
                <Icon name="mdi:account-key" class="text-[min(4.5vw,20px)] flex-shrink-0" />
                www.gob.bo/ciudadania
              </a>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso1.jpg" 
                alt="Paso 1: Ingresar a la plataforma"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 2 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 2</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Accede a "Mis Documentos"</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso2.jpg" 
                alt="Paso 2: Mis Documentos"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
                Haz clic en tu bandeja principal y encontrarás la sección de
                <strong>Mis Documentos</strong>, haz clic en el botón
                <strong>Nuevo</strong>, para registrar una nueva denuncia.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 3 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 3</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Completa el Formulario de Denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
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
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 4 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 4</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Registra al denunciado(a)</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso4.jpg" 
                alt="Paso 4: Registrar denunciado"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
                <strong>Registra al denunciado(a)</strong>
                señalando el nombre y la entidad donde ocurrió el supuesto acto de corrupción.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 5 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 5</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Selecciona el tipo de acto</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
                <strong>Registra</strong> en el menú desplegable
                el posible acto de corrupción.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso5.jpg" 
                alt="Paso 5: Tipo de acto de corrupción"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 6 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 6</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Detalla los datos de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso6.jpg" 
                alt="Paso 6: Detallar la denuncia"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
                <strong>Registra</strong> todos los datos de la
                denuncia, como ser la <strong>fecha</strong>, <strong>departamento y municipio</strong>,
                además describe el supuesto hecho de posible acto de corrupción y guárdalo.
              </p>
            </div>
          </div>
        </div>

        <!-- PASO 7 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 7</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Genera el PDF de la denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-2 md:order-1">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
                Encontrarás el formulario de denuncia en
                <strong>formato PDF</strong>
                con todos los datos que se fueron registrando.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <img 
                src="/gestion-denuncia/paso7.jpg" 
                alt="Paso 7: PDF de la denuncia"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
          </div>
        </div>

        <!-- PASO 8 -->
        <div class="bg-white rounded-[min(2vw,14px)] shadow-lg overflow-hidden">
          <div class="bg-[#3D4045] text-white px-[min(4.5vw,24px)] py-[min(2.5vw,12px)] flex items-center gap-[min(2.5vw,16px)]">
            <span class="font-bold text-[min(5.4vw,26px)]">PASO 8</span>
            <span class="text-[min(3.6vw,15px)] text-gray-300">Seguimiento de tu denuncia</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[min(4vw,24px)] p-[min(4.5vw,24px)] items-center">
            <div class="order-1 md:order-1">
              <img 
                src="/gestion-denuncia/paso8.jpg" 
                alt="Paso 8: Seguimiento de la denuncia"
                class="w-full rounded-[min(1.5vw,10px)] border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
                loading="lazy"
                @error="(e) => e.target.src = '/images/placeholder.jpg'"
              />
            </div>
            <div class="order-2 md:order-2">
              <p class="text-[min(3.6vw,15px)] text-[#1A1C20] leading-relaxed">
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
      <div class="mt-[8vw] bg-white rounded-[min(2vw,14px)] shadow-2xl p-[min(6vw,40px)] text-center">
        <div class="flex justify-center mb-[min(3vw,16px)]">
          <div class="w-[min(14vw,90px)] h-[min(14vw,90px)] rounded-full bg-[#2B2E33] flex items-center justify-center">
            <Icon name="mdi:shield-star" class="text-white text-[min(7vw,48px)]" />
          </div>
        </div>
        <h3 class="text-[min(5.4vw,28px)] font-bold text-[#1A1C20] mb-[min(2vw,12px)]">
          ¿Listo para realizar tu denuncia?
        </h3>
        <p class="text-[min(3.6vw,15px)] text-gray-600 leading-relaxed max-w-[min(85vw,520px)] mx-auto mb-[min(5vw,28px)]">
          Ingresa al sistema SITPRECO con tu Ciudadanía Digital y registra tu denuncia
          de forma segura. Puedes reservar tu identidad.
        </p>
        <a 
          href="https://sitpreco.s2plus.transparencia.gob.bo/" 
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-[min(2vw,10px)] bg-[#3D4045] hover:bg-[#2B2E33] text-white font-medium rounded-[min(1.5vw,10px)] py-[min(3.5vw,16px)] px-[min(8vw,40px)] transition-all duration-300 text-[min(4.2vw,16px)] shadow-md hover:shadow-lg"
        >
          <Icon name="mdi:open-in-new" class="text-[min(4.5vw,20px)]" />
          Ir a SITPRECO
        </a>
        <p class="text-[min(2.7vw,13px)] text-gray-500 mt-[min(4vw,20px)]">
          Viceministerio de Transparencia, Seguridad Jurídica e Integridad Pública – 2026
        </p>
      </div>

      <!-- ========================================== -->
      <!-- BOTÓN VOLVER                                -->
      <!-- ========================================== -->
      <div class="mt-[8vw] text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-[min(1.5vw,8px)] text-gray-300 hover:text-white transition-colors text-[min(3.6vw,15px)] font-medium"
        >
          <Icon name="mdi:arrow-left" class="text-[min(4.5vw,20px)]" />
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