<template>
  <div>
    <!-- ========================================== -->
    <!-- BANNER DE BIENVENIDA (ancho completo)      -->
    <!-- ========================================== -->
    <div class="w-full">
      <div class="portrait:bg-blue-500 landscape:bg-senado-gold-lighter rounded-lg shadow-lg h-[12rem] flex items-center justify-center">
        <h1 class="text-3xl font-bold text-center portrait:text-white landscape:text-senado-primary">
          Bienvenido al sitio web oficial del Senado de Bolivia
        </h1>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- BARRA DE SESIÓN (ancho completo)           -->
    <!-- ========================================== -->
    <div class="w-full bg-senado-gold-lightest border-y border-senado-gold-light py-3 px-4">
      <div class="flex items-center justify-center gap-2 flex-wrap">
        <span class="text-senado-primary font-bold">Sesión -</span>
        <span class="text-gray-700 font-medium">Lunes, 07 de Julio de 2026</span>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-senado-primary hover:underline font-medium flex items-center gap-1">
          Mira en directo
          <Icon name="mdi:play-circle" class="text-lg" />
        </a>
        <span class="text-senado-gold-dark">|</span>
        <a href="#" class="text-senado-primary hover:underline font-medium">
          ORDEN DEL DÍA
        </a>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- COLUMNAS: 70% - 30%                        -->
    <!-- ========================================== -->
    <div class="mx-auto w-[90%] py-10">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- ========================================== -->
        <!-- COLUMNA IZQUIERDA (70%)                    -->
        <!-- ========================================== -->
        <div class="md:w-[70%]">
          <!-- Imagen con línea dorada debajo -->
          <div class="w-full">
            <img 
              src="/images/sesion-senado.jpg" 
              alt="Sesión del Senado" 
              class="w-full object-cover rounded-t-lg"
              style="height: 400px;"
            />
            <!-- Línea dorada debajo de la imagen -->
            <div class="w-full h-[1vw] bg-senado-gold-dark"></div>
          </div>
          
          <!-- Texto debajo de la imagen -->
          <div class="mt-4">
            <h2 class="text-2xl font-bold text-senado-primary">
              Diálogo e institucionalidad: Ejecutivo y Legislativo acuerdan una ruta conjunta frente a la conflictividad
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              29 de junio de 2026 | 12:06
            </p>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- COLUMNA DERECHA (30%)                      -->
        <!-- ========================================== -->
        <div class="md:w-[30%] flex flex-col gap-4">
          <!-- Tarjeta 1 con barra dorada encima -->
          <div class="bg-senado-gold-lightest shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.5vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                PIO: Ministro de Defensa y titular del TSE comparecen ante el Senado en jornada de fiscalización
              </p>
              <p class="text-xs text-gray-500 mt-2">
                20 de junio de 2026 | 10:18
              </p>
            </div>
          </div>

          <!-- Tarjeta 2 con barra dorada encima -->
          <div class="bg-senado-gold-lightest shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.5vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                Senado abroga la Ley 1720 y abre una nueva etapa de concertación para la pequeña propiedad agraria
              </p>
              <p class="text-xs text-gray-500 mt-2">
                11 de junio de 2026 | 16:25
              </p>
            </div>
          </div>

          <!-- Tarjeta 3 con barra dorada encima -->
          <div class="bg-senado-gold-lightest shadow hover:shadow-lg transition-shadow overflow-hidden rounded-b-lg">
            <div class="h-[0.5vw] bg-senado-gold-dark"></div>
            <div class="p-4">
              <p class="text-sm font-semibold text-gray-800">
                Comisión de Constitución aprueba proyecto de ley de reforma judicial
              </p>
              <p class="text-xs text-gray-500 mt-2">
                05 de junio de 2026 | 14:30
              </p>
            </div>
          </div>

          <!-- Botón "Ir a todas las noticias" - DORADO Y ANCHO COMPLETO -->
          <div class="mt-2">
            <a 
              href="/noticias" 
              class="bg-senado-gold-dark text-white w-full py-2 rounded-full hover:bg-senado-gold transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              Ir a todas las noticias
              <Icon name="mdi:arrow-right" class="text-lg" />
            </a>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- LÍNEA CON IMAGEN PEQUEÑA CENTRADA          -->
      <!-- ========================================== -->
      <div class="flex items-center justify-center gap-4 my-10">
        <div class="flex-1 h-px bg-senado-gold-light"></div>
        <div class="flex-shrink-0">
          <img 
            src="/images/escudo-senado.png" 
            alt="Senado" 
            class="h-10 w-10 object-contain"
          />
        </div>
        <div class="flex-1 h-px bg-senado-gold-light"></div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN: ACTIVIDAD LEGISLATIVA             -->
      <!-- ========================================== -->
      <div class="mt-6">
        <h2 class="text-3xl font-bold text-senado-primary mb-6">
          Actividad Legislativa
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Legislación -->
          <div class="bg-senado-gold-lightest border border-senado-gold-light rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-dark text-white px-4 py-2 font-bold text-lg">
              Legislación
            </div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Resoluciones Camarales
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Declaraciones Camarales
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Minutas de Comunicación
                </li>
              </ul>
            </div>
          </div>

          <!-- Gestión -->
          <div class="bg-senado-gold-lightest border border-senado-gold-light rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-dark text-white px-4 py-2 font-bold text-lg">
              Gestión
            </div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Proyectos de Ley en Tratamiento
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Proyectos de Ley Aprobados
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Leyes Sancionadas
                </li>
              </ul>
            </div>
          </div>

          <!-- Fiscalización -->
          <div class="bg-senado-gold-lightest border border-senado-gold-light rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div class="bg-senado-gold-dark text-white px-4 py-2 font-bold text-lg">
              Fiscalización
            </div>
            <div class="p-4">
              <ul class="mt-3 space-y-2 text-sm">
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Peticiones de Informe Escrito
                </li>
                <li class="hover:text-senado-primary transition-colors cursor-pointer flex items-center gap-2 text-gray-800">
                  <span class="text-senado-gold-dark font-bold">›</span> Peticiones de Informe Oral
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DescubraSenado />
    </div>
  </div>
</template>

<script setup>
// ✅ Importar el componente DescubraSenado
import DescubraSenado from '~/components/DescubraSenado.vue'
</script>