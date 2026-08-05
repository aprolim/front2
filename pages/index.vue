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
          class="absolute right-0 z-[60] w-[22vw]"
          style="bottom: 0; pointer-events: none;"
        >
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
          <h1 class="text-[2.85vw] text-black w-[65%] leading-[.9] font-medium">
            Bienvenido al sitio web oficial <br> del
            <span class="text-senado-primary text-[4vw] text-justify font-bold">Senado de Bolivia</span>
          </h1>
        </div>
      </div>

      <!-- Línea dorada inferior -->
    </div>

    <!-- ========================================== -->
    <!-- BARRA DE SESIÓN (ancho completo)           -->
    <!-- ========================================== -->
    <div class="w-full border-b border-[#000] py-[.8vw] px-4 text-[1.2vw]">
      <div class="flex items-center justify-center gap-[.8vw] flex-wrap">
        <span class="text-senado-primary font-medium">Sesión -</span>
        <span class="text-gray-700 font-normal">Lunes, 07 de Julio de 2026</span>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-senado-primary hover:underline font-medium flex items-center gap-1 underline">
          Mira en directo
        </a>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-black hover:underline font-thin underline">
          ORDEN DEL DÍA
        </a>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- COLUMNAS: 70% - 30%                        -->
    <!-- ========================================== -->
    <div class="mx-auto w-[75%] py-[2vw]">
      <NoticiasDinamicas />
      <!-- LÍNEA CON IMAGEN PEQUEÑA CENTRADA -->
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>

      <!-- ACTIVIDAD LEGISLATIVA -->
      <div class="mt-6">
        <h2 class="text-[2.6vw] font-bold text-senado-primary mb-6">Actividad Legislativa</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- LEGISLACIÓN -->
          <div class="bg-senado-gold-lightest2 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">LEGISLACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
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

          <!-- GESTIÓN (COMPLETO) -->
          <div class="bg-senado-gold-lightest3 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">GESTIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley en Tratamiento
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley Aprobados
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Leyes Sancionadas
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Leyes Promulgadas
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley con Modificaciones
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley Rechazados
                </li>
              </ul>
            </div>
          </div>

          <!-- FISCALIZACIÓN -->
          <div class="bg-senado-gold-lightest2 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">FISCALIZACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-[2vw] items-end">
          <div class="text-center">
            <h3 class="text-[2.5vw] font-bold text-senado-primary mb-3 leading-[1.1]">Mandato Constitucional</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
              <img src="/images/25.webp" alt="Mandato Constitucional" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-[2.5vw] font-bold text-senado-primary mb-3 leading-[1.1]">Funciones del Senado</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
              <img src="/images/26.webp" alt="Funciones del Senado" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-[2.5vw] font-bold text-senado-primary mb-3 leading-[1.1]">Antecedentes históricos</h3>
            <div class="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mt-[3.4vw]">
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
import NoticiasDinamicas from '~/components/NoticiasDinamicas.vue'
</script>