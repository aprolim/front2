<template>
  <div class="overflow-visible">
    <!-- ========================================== -->
    <!-- BANNER DE BIENVENIDA (ancho completo)      -->
    <!-- ========================================== -->
    <div class="w-full bg-[#f2f2f2] relative h-[19vw]" style="overflow: visible !important;">

      <!-- Contenedor del 70% centrado -->
      <div class="mx-auto w-[70%] relative py-6 h-full flex items-center" style="overflow: visible !important;">
        
        <!-- IMAGEN IZQUIERDA (Logo Blanco) -->
        <div class="absolute left-0 top-[-2vw] z-10 h-[calc(100%+2vw)] aspect-[2/1] overflow-hidden">
          <div 
            class="w-full h-full scale-[2] origin-top bg-[#f8f8f8] [mask-image:url(/images/LogoBlanco.svg)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
          ></div>
        </div>

        <!-- CÚPULA DERECHA -->
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

        <!-- TEXTO CENTRADO -->
        <div class="flex-1 text-center z-20">
          <h1 class="text-[2.85vw] text-black w-[65%] leading-[.9] font-medium">
            Bienvenido al sitio web oficial <br> del
            <span class="text-senado-primary text-[4vw] text-justify font-bold">Senado de Bolivia</span>
          </h1>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- BARRA DE SESIÓN                            -->
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
    <!-- 🔥 VIDEO DE FONDO CON 4 ESTADÍSTICAS      -->
    <!-- ========================================== -->
    <div class="relative w-full overflow-hidden" style="height: 40vw; min-height: 300px;">
      <!-- Video de fondo -->
      <video
        ref="videoRef"
        class="absolute top-0 left-0 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
      >
        <source src="/videos/fondo-senado.mp4" type="video/mp4" />
        <div class="absolute inset-0 bg-senado-primary-dark"></div>
      </video>

      <!-- Overlay oscuro -->
      <div class="absolute inset-0 bg-black/50"></div>

      <!-- ========================================== -->
      <!-- CUADRADO CON 4 ESTADÍSTICAS               -->
      <!-- ========================================== -->
      <div 
        class="absolute bottom-0 left-1/2 -translate-x-1/2"
        style="width: 90%; height: 30%;"
      >
        <div 
          class="w-full h-full bg-black/10 backdrop-blur-sm"
          style="border: 2px solid #e3d194; border-bottom: none; border-radius: 16px 16px 0 0;"
        >
          <!-- Grid de 4 columnas -->
          <div class="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 p-2 md:p-4">
            
            <!-- 1. PROYECTOS EN TRATAMIENTO -->
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-light tracking-wider leading-tight">
                Proyectos de Ley<br />en Tratamiento
              </div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">
                {{ estadisticas.enTratamiento }}
              </div>
            </div>

            <!-- 2. PROYECTOS APROBADOS -->
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-light tracking-wider leading-tight">
                Proyectos de Ley<br />Aprobados
              </div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">
                {{ estadisticas.aprobados }}
              </div>
            </div>

            <!-- 3. LEYES SANCIONADAS -->
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-light tracking-wider leading-tight">
                Proyectos de Ley<br />Sancionadas
              </div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">
                {{ estadisticas.sancionadas }}
              </div>
            </div>

            <!-- 4. PETICIONES DE INFORME -->
            <div class="flex flex-col items-center justify-center text-center px-1">
              <div class="text-[#e3d194] text-[1.1vw] md:text-[1.2vw] font-light tracking-wider leading-tight">
                Peticiones de<br />Informe
              </div>
              <div class="text-white text-[3vw] md:text-[3.5vw] font-bold leading-none mt-1">
                {{ estadisticas.peticionesInforme }}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- CONTENIDO PRINCIPAL                       -->
    <!-- ========================================== -->
    <div class="mx-auto w-[75%] py-[2vw]">
      <!-- ACTIVIDAD LEGISLATIVA -->
      <div>
        <h2 class="text-[2.6vw] font-bold text-senado-primary mb-6">Facultades Legislativas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- LEGISLACION -->
          <div class="bg-senado-gold-lightest3 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">LEGISLACIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley en Tratamiento
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.enTratamiento }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley Aprobados
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.aprobados }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Leyes Sancionadas
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.sancionadas }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Leyes Promulgadas
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.promulgadas }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley con Modificaciones
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.modificaciones }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Proyectos de Ley Rechazados
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.rechazados }}</span>
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
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.peticionesEscrito }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Peticiones de Informe Oral
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.peticionesOral }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- GESTION -->
          <div class="bg-senado-gold-lightest2 rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-light text-black px-4 py-2 text-[1.4vw] text-center font-[500]">GESTIÓN</div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-[1.2vw]">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Resoluciones Camarales
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.resoluciones }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Declaraciones Camarales
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.declaraciones }}</span>
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">></span> Minutas de Comunicación
                  <span class="ml-auto bg-senado-primary text-white text-[0.8vw] px-2 py-0.5 rounded-full">{{ estadisticas.minutas }}</span>
                </li>
              </ul>
            </div>
          </div>
        
        </div>
      </div>
      
      <!-- LÍNEA CON IMAGEN PEQUEÑA CENTRADA -->
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>
      
      <NoticiasDinamicas />

      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>

      <DescubraSenado />

      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-[#75797B]"></div>
      </div>
      
      <MandatoFuncionesAntecedentes />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import DescubraSenado from '~/components/DescubraSenado.vue'
import NoticiasDinamicas from '~/components/NoticiasDinamicas.vue'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'

const videoRef = ref(null)

// ========================================== //
// 🔥 ESTADÍSTICAS SIMULADAS (HARDCODEADAS)  //
// ========================================== //
const estadisticas = reactive({
  enTratamiento: 15,
  aprobados: 42,
  sancionadas: 28,
  promulgadas: 18,
  modificaciones: 7,
  rechazados: 5,
  peticionesEscrito: 12,
  peticionesOral: 8,
  peticionesInforme: 20,
  resoluciones: 45,
  declaraciones: 23,
  minutas: 67
})

// ========================================== //
// 🔥 INICIALIZACIÓN                         //
// ========================================== //
onMounted(() => {
  // Restaurar scroll
  if (process.client) {
    const scrollPos = sessionStorage.getItem('scrollPosicion')
    if (scrollPos) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(scrollPos),
          behavior: 'smooth'
        })
        sessionStorage.removeItem('scrollPosicion')
      }, 400)
    }
  }
  
  // Reproducir video
  if (videoRef.value) {
    videoRef.value.play().catch(error => {
      console.log('Autoplay bloqueado:', error)
    })
  }
})
</script>