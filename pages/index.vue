<template>
  <div class="overflow-visible">
    <!-- ========================================== -->
    <!-- BANNER DE BIENVENIDA (ancho completo)      -->
    <!-- ========================================== -->
    <div class="w-full bg-[#f2f2f2] relative h-[19vw] " style="overflow: visible !important;">

      <!-- Contenedor del 70% centrado -->
      <div class="mx-auto w-[70%] relative py-6 h-full flex items-center" style="overflow: visible !important;">
        
        <!-- ========================================== -->
        <!-- IMAGEN IZQUIERDA (Logo Blanco)             -->
        <!-- ========================================== -->
        <!-- IMAGEN IZQUIERDA - MITAD SUPERIOR RECORTADA -->
        <div class="absolute left-0 top-[-2vw] z-10 h-[calc(100%+2vw)] aspect-[2/1] overflow-hidden">
          <div 
            class="w-full h-full scale-[2] origin-top bg-[#f8f8f8] [mask-image:url(/images/LogoBlanco.svg)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
          ></div>
        </div>

        <!-- ========================================== -->
        <!-- CÚPULA DERECHA (Alineada por su base)      -->
        <!-- ========================================== -->
        <div 
          class="absolute right-0 z-[50] w-[22vw]"
          style="bottom: 0; pointer-events: none;"
        >
          <!-- Borde decorativo exterior (oro y rojo) -->
            <!-- Borde interior blanco/gold -->
              <img 
                src="/images/Cupula.png" 
                alt="Senado derecha" 
                style="width: 100%; height: 100%; object-fit: contain; object-position: bottom; display: block;"
              />
        </div>

        <!-- ========================================== -->
        <!-- TEXTO CENTRADO                              -->
        <!-- ========================================== -->
        <div class="flex-1 text-center z-20">
          <h1 class="text-[3.0vw] text-black w-[60%] leading-[.9] font-medium text-justify">
            Bienvenido al sitio web oficial <br> del
            <span class="text-senado-primary text-[3.8vw] text-justify font-bold">Senado de Bolivia</span>
          </h1>
        </div>
      </div>

      <!-- Línea dorada inferior -->
    </div>

    <!-- ========================================== -->
    <!-- BARRA DE SESIÓN (ancho completo)           -->
    <!-- ========================================== -->
    <div class="w-full border-b border-[#f4f4f4] py-3 px-4">
      <div class="flex items-center justify-center gap-2 flex-wrap">
        <span class="text-senado-primary font-medium">Sesión -</span>
        <span class="text-gray-700 font-normal">Lunes, 07 de Julio de 2026</span>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-senado-primary hover:underline font-medium flex items-center gap-1 underline">
          Mira en directo
        </a>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-black hover:underline font-thin underline">
          ORDEN DEL DÍA5
        </a>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- COLUMNAS: 70% - 30%                        -->
    <!-- ========================================== -->
    <div class="mx-auto w-[75%] py-10">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-[70%]">
          <div class="w-full">
            <img 
              src="/images/sesion-senado.jpg" 
              alt="Sesión del Senado" 
              class="w-full object-cover rounded-t-lg"
              style="height: 400px;"
            />
            <div class="w-full h-[1vw] bg-senado-gold-dark"></div>
          </div>
          <div class="mt-4">
            <h2 class="text-2xl font-bold text-senado-primary">
              Diálogo e institucionalidad: Ejecutivo y Legislativo acuerdan una ruta conjunta frente a la conflictividad
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              29 de junio de 2026 | 12:06
            </p>
          </div>
        </div>

        <div class="md:w-[25%] flex flex-col gap-4">
          <div class="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.6vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                PIO: Ministro de Defensa y titular del TSE comparecen ante el Senado en jornada de fiscalización
              </p>
              <p class="text-xs text-gray-500 mt-2">
                20 de junio de 2026 | 10:18
              </p>
            </div>
          </div>

          <div class="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.6vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                Senado abroga la Ley 1720 y abre una nueva etapa de concertación para la pequeña propiedad agraria
              </p>
              <p class="text-xs text-gray-500 mt-2">
                11 de junio de 2026 | 16:25
              </p>
            </div>
          </div>

          <div class="bg-white shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.6vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                Comisión de Constitución aprueba proyecto de ley de reforma judicial
              </p>
              <p class="text-xs text-gray-500 mt-2">
                05 de junio de 2026 | 14:30
              </p>
            </div>
          </div>

          <div class="mt-2">
            <a 
              href="/noticias" 
              class="bg-senado-gold-lightest text-black w-full py-2 rounded-full hover:bg-senado-gold transition-colors font-thin text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              Ir a todas las noticias
            </a>
          </div>
        </div>
      </div>

      <!-- LÍNEA CON IMAGEN PEQUEÑA CENTRADA -->
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#f4f4f4]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-10 w-10 object-contain brightness-0 opacity-50" />
        </div>
        <div class="flex-1 h-px bg-[#f4f4f4]"></div>
      </div>

      <!-- ACTIVIDAD LEGISLATIVA -->
      <div class="mt-6">
        <h2 class="text-3xl font-bold text-senado-primary mb-6">Actividad Legislativa</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-senado-gold-lightest2  rounded-lg hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-lg text-center">LEGISLACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Resoluciones Camarales
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Declaraciones Camarales
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Minutas de Comunicación
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-senado-gold-lightest3  rounded-lg hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2  text-lg text-center">GESTIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley en Tratamiento
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley Aprobados
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Leyes Sancionadas
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-senado-gold-lightest2  rounded-lg hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-lg text-center">FISCALIZACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Peticiones de Informe Escrito
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Peticiones de Informe Oral
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- LÍNEA ANTES DE DESCRUBRA EL SENADO -->
      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>

      <!-- DESCRUBRA EL SENADO -->
      <DescubraSenado />

      <!-- LÍNEA DESPUÉS DE DESCRUBRA EL SENADO -->
      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>

      <!-- MANDATO, FUNCIONES, ANTECEDENTES -->
      <div class="mt-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-senado-primary mb-3">Mandato Constitucional</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/images/25.webp" alt="Mandato Constitucional" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-2xl font-bold text-senado-primary mb-3">Funciones del Senado</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/images/26.webp" alt="Funciones del Senado" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-2xl font-bold text-senado-primary mb-3">Antecedentes históricos</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img src="/images/27.webp" alt="Antecedentes históricos" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DescubraSenado from '~/components/DescubraSenado.vue'
</script>