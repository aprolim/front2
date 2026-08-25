<template>
  <div class="min-h-screen bg-white py-[2vw]">
    <div class="mx-auto w-[85%] max-w-[90vw]">
      
      <!-- ========================================== -->
      <!-- TÍTULO                                    -->
      <!-- ========================================== -->
      <div class="mb-[3vw] text-center">
        <h1 class="text-[4vw] md:text-[4.5vw] font-bold text-senado-primary">
          Visitas <span class="text-[#8f1522]">Guiadas</span>
        </h1>
        <div class="w-[6vw] h-[0.3vw] bg-[#611717] mx-auto mt-[1vw] rounded-full"></div>
        <p class="text-[1.2vw] text-gray-600 mt-[1.5vw] max-w-[60vw] mx-auto">
          Conoce el Palacio Legislativo y la historia del Senado de Bolivia.
          Reserva tu visita guiada gratuita a través de nuestra plataforma digital.
        </p>
      </div>

      <!-- ========================================== -->
      <!-- DESCRIPCIÓN GENERAL                        -->
      <!-- ========================================== -->
      <div class="bg-[#f8f6f0] rounded-[1vw] p-[1.8vw] mb-[2vw] max-w-[80vw] mx-auto">
        <p class="text-[1vw] text-gray-700 leading-relaxed text-center">
          Las visitas guiadas al edificio legislativo tienen por objetivo generar un espacio de acercamiento al 
          <strong>Poder Legislativo</strong>, para que los visitantes conozcan dónde y cómo trabajan los 
          representantes del pueblo en la confección de las leyes que nos permiten ampliar nuestros derechos 
          y fortalecer la democracia.
        </p>
      </div>

      <!-- ========================================== -->
      <!-- CONTENIDO PRINCIPAL - UNA COLUMNA         -->
      <!-- ========================================== -->
      <div class="max-w-[70vw] mx-auto space-y-[2vw]">
        
        <!-- ========================================== -->
        <!-- REQUISITOS Y HORARIOS (2 columnas internas) -->
        <!-- ========================================== -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[2vw]">
          <!-- Requisitos -->
          <div class="bg-[#f8f6f0] rounded-[1vw] p-[1.8vw]">
            <h3 class="text-[1.2vw] font-bold text-senado-primary mb-[1vw] flex items-center gap-[0.5vw]">
              <svg class="w-[1.5vw] h-[1.5vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              REQUISITOS PARA EL INGRESO
            </h3>
            <ul class="space-y-[0.6vw] text-[1vw] text-gray-700">
              <li class="flex items-start gap-[0.8vw]">
                <span class="text-senado-primary font-bold">•</span>
                <span>Completar la <strong>solicitud en la plataforma digital</strong></span>
              </li>
              <li class="flex items-start gap-[0.8vw]">
                <span class="text-senado-primary font-bold">•</span>
                <span>Presentar <strong>cédula de identidad</strong> el día de la visita</span>
              </li>
              <li class="flex items-start gap-[0.8vw]">
                <span class="text-senado-primary font-bold">•</span>
                <span>Respetar las <strong>normas de conducta</strong> del Reglamento del Senado</span>
              </li>
              <li class="flex items-start gap-[0.8vw]">
                <span class="text-senado-primary font-bold">•</span>
                <span>Uso obligatorio de <strong>tapabocas</strong> y medidas de bioseguridad</span>
              </li>
            </ul>
          </div>

          <!-- Horarios -->
          <div class="bg-[#f8f6f0] rounded-[1vw] p-[1.8vw]">
            <h3 class="text-[1.2vw] font-bold text-senado-primary mb-[1vw] flex items-center gap-[0.5vw]">
              <svg class="w-[1.5vw] h-[1.5vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Horarios de Visita
            </h3>
            <div class="space-y-[0.5vw] text-[1vw] text-gray-700">
              <div class="flex justify-between py-[0.5vw] border-b border-gray-200">
                <span class="font-medium">Lunes a Viernes</span>
                <span>09:00 - 12:00 / 14:00 - 17:00</span>
              </div>
              <div class="flex justify-between py-[0.5vw]">
                <span class="font-medium">Sábados y Domingos</span>
                <span class="text-gray-400">Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- ADVERTENCIA COVID                         -->
        <!-- ========================================== -->
        <div class="p-[1.2vw] bg-yellow-50 border border-yellow-200 rounded-[0.8vw]">
          <p class="text-[0.9vw] text-yellow-800 flex items-center gap-[0.5vw] justify-center">
            <span class="text-[1.2vw]">⚠️</span>
            Para la asistencia se deberá cumplir con todas las medidas de prevención del Covid-19: 
            uso correcto del tapabocas, mantener la distancia, uso de alcohol en gel, respeto de las indicaciones.
          </p>
        </div>

        <!-- ========================================== -->
        <!-- TÍTULO DEL PROCESO                         -->
        <!-- ========================================== -->
        <div class="text-center mt-[2vw]">
          <h2 class="text-[2.5vw] font-bold text-senado-primary">
            Proceso de Solicitud
          </h2>
          <p class="text-[1vw] text-gray-500 mt-[0.5vw]">
            Sigue estos pasos para solicitar tu visita guiada a través de la Plataforma Digital
          </p>
          <div class="w-[4vw] h-[0.2vw] bg-[#611717] mx-auto mt-[0.8vw] rounded-full"></div>
        </div>

        <!-- ========================================== -->
        <!-- PASOS DEL PROCESO - UNA COLUMNA           -->
        <!-- ========================================== -->
        <div class="space-y-[3vw]">
          <!-- Paso 1 -->
          <div class="bg-white rounded-[1vw] shadow-lg border border-gray-200 p-[2vw]">
            <div class="flex items-center gap-[1.5vw] mb-[1vw]">
              <div class="flex-shrink-0 w-[3vw] h-[3vw] bg-senado-primary text-white rounded-full flex items-center justify-center font-bold text-[1.2vw]">1</div>
              <h3 class="text-[1.5vw] font-bold text-senado-primary">Ingresa a la Plataforma Digital</h3>
            </div>
            <p class="text-[1vw] text-gray-600 mb-[1.5vw] ml-[4.5vw]">
              Accede al sistema a través del siguiente enlace. Si no tienes cuenta, deberás registrarte.
            </p>
            <div class="ml-[4.5vw]">
              <div class="relative cursor-pointer group" @click="abrirLightbox('/images/visitas/paso1.webp', 'Paso 1: Ingresar a la plataforma digital')">
                <img 
                  src="/images/visitas/paso1.webp" 
                  alt="Paso 1: Ingresar a la plataforma digital"
                  class="w-full rounded-[0.6vw] border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300"
                  loading="lazy"
                />
                <!-- Overlay de zoom -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-[0.6vw] transition-all duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 text-white text-[0.9vw] px-[1.5vw] py-[0.6vw] rounded-[0.4vw] flex items-center gap-[0.5vw]">
                    <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                    </svg>
                    <span>Click para ampliar</span>
                  </div>
                </div>
                <!-- Badge de zoom siempre visible -->
                <div class="absolute bottom-[0.5vw] right-[0.5vw] bg-black/60 text-white text-[0.7vw] px-[0.8vw] py-[0.3vw] rounded-[0.3vw] flex items-center gap-[0.3vw] pointer-events-none">
                  <svg class="w-[0.8vw] h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                  <span>Ampliar</span>
                </div>
              </div>
              <a 
                href="https://systemdemo.es/auth/login-external" 
                target="_blank"
                class="inline-flex items-center gap-[0.5vw] mt-[1vw] text-senado-primary hover:underline font-medium text-[1vw]"
              >
                <span>Ir a la Plataforma</span>
                <svg class="w-[1vw] h-[1vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Paso 2 -->
          <div class="bg-white rounded-[1vw] shadow-lg border border-gray-200 p-[2vw]">
            <div class="flex items-center gap-[1.5vw] mb-[1vw]">
              <div class="flex-shrink-0 w-[3vw] h-[3vw] bg-senado-primary text-white rounded-full flex items-center justify-center font-bold text-[1.2vw]">2</div>
              <h3 class="text-[1.5vw] font-bold text-senado-primary">Redacta una carta dirigida al Oficial Mayor</h3>
            </div>
            <p class="text-[1vw] text-gray-600 mb-[1.5vw] ml-[4.5vw]">
              Explica el motivo de tu visita guiada. Incluye la fecha deseada, número de visitantes y el nombre de la institución o grupo.
            </p>
            <div class="ml-[4.5vw]">
              <div class="relative cursor-pointer group" @click="abrirLightbox('/images/visitas/paso2.webp', 'Paso 2: Redactar carta al Oficial Mayor')">
                <img 
                  src="/images/visitas/paso2.webp" 
                  alt="Paso 2: Redactar carta al Oficial Mayor"
                  class="w-full rounded-[0.6vw] border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-[0.6vw] transition-all duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 text-white text-[0.9vw] px-[1.5vw] py-[0.6vw] rounded-[0.4vw] flex items-center gap-[0.5vw]">
                    <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                    </svg>
                    <span>Click para ampliar</span>
                  </div>
                </div>
                <div class="absolute bottom-[0.5vw] right-[0.5vw] bg-black/60 text-white text-[0.7vw] px-[0.8vw] py-[0.3vw] rounded-[0.3vw] flex items-center gap-[0.3vw] pointer-events-none">
                  <svg class="w-[0.8vw] h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                  <span>Ampliar</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 3 -->
          <div class="bg-white rounded-[1vw] shadow-lg border border-gray-200 p-[2vw]">
            <div class="flex items-center gap-[1.5vw] mb-[1vw]">
              <div class="flex-shrink-0 w-[3vw] h-[3vw] bg-senado-primary text-white rounded-full flex items-center justify-center font-bold text-[1.2vw]">3</div>
              <h3 class="text-[1.5vw] font-bold text-senado-primary">Adjunta documentos anexos (opcional)</h3>
            </div>
            <p class="text-[1vw] text-gray-600 mb-[1.5vw] ml-[4.5vw]">
              Si tienes documentos adicionales que respalden tu solicitud, puedes adjuntarlos en la plataforma.
            </p>
            <div class="ml-[4.5vw]">
              <div class="relative cursor-pointer group" @click="abrirLightbox('/images/visitas/paso3.webp', 'Paso 3: Adjuntar documentos anexos')">
                <img 
                  src="/images/visitas/paso3.webp" 
                  alt="Paso 3: Adjuntar documentos anexos"
                  class="w-full rounded-[0.6vw] border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-[0.6vw] transition-all duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 text-white text-[0.9vw] px-[1.5vw] py-[0.6vw] rounded-[0.4vw] flex items-center gap-[0.5vw]">
                    <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                    </svg>
                    <span>Click para ampliar</span>
                  </div>
                </div>
                <div class="absolute bottom-[0.5vw] right-[0.5vw] bg-black/60 text-white text-[0.7vw] px-[0.8vw] py-[0.3vw] rounded-[0.3vw] flex items-center gap-[0.3vw] pointer-events-none">
                  <svg class="w-[0.8vw] h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                  <span>Ampliar</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 4 -->
          <div class="bg-white rounded-[1vw] shadow-lg border border-gray-200 p-[2vw]">
            <div class="flex items-center gap-[1.5vw] mb-[1vw]">
              <div class="flex-shrink-0 w-[3vw] h-[3vw] bg-senado-primary text-white rounded-full flex items-center justify-center font-bold text-[1.2vw]">4</div>
              <h3 class="text-[1.5vw] font-bold text-senado-primary">Haz seguimiento a tu solicitud</h3>
            </div>
            <p class="text-[1vw] text-gray-600 mb-[1.5vw] ml-[4.5vw]">
              A través de la misma plataforma, podrás dar seguimiento a tu carta y recibir la respuesta del Oficial Mayor.
            </p>
            <div class="ml-[4.5vw]">
              <div class="relative cursor-pointer group" @click="abrirLightbox('/images/visitas/paso4.webp', 'Paso 4: Seguimiento de la solicitud')">
                <img 
                  src="/images/visitas/paso4.webp" 
                  alt="Paso 4: Seguimiento de la solicitud"
                  class="w-full rounded-[0.6vw] border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-[0.6vw] transition-all duration-300 flex items-center justify-center">
                  <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/70 text-white text-[0.9vw] px-[1.5vw] py-[0.6vw] rounded-[0.4vw] flex items-center gap-[0.5vw]">
                    <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                    </svg>
                    <span>Click para ampliar</span>
                  </div>
                </div>
                <div class="absolute bottom-[0.5vw] right-[0.5vw] bg-black/60 text-white text-[0.7vw] px-[0.8vw] py-[0.3vw] rounded-[0.3vw] flex items-center gap-[0.3vw] pointer-events-none">
                  <svg class="w-[0.8vw] h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                  <span>Ampliar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- BOTÓN PRINCIPAL Y NOTA                     -->
        <!-- ========================================== -->
        <div class="bg-white rounded-[1vw] shadow-lg border border-gray-200 p-[2vw] mt-[2vw] text-center">
          <a 
            href="https://systemdemo.es/auth/login-external" 
            target="_blank"
            class="inline-flex items-center justify-center gap-[0.8vw] py-[0.8vw] px-[4vw] bg-[#611717] text-white rounded-[0.6vw] font-semibold hover:bg-[#3a060d] transition text-[1.2vw]"
          >
            <span>Iniciar Solicitud en la Plataforma</span>
            <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p class="text-[0.8vw] text-gray-400 mt-[0.8vw]">
            La solicitud debe realizarse con al menos 15 días de anticipación.
          </p>
          <div class="mt-[1.5vw] p-[1.2vw] bg-blue-50 border border-blue-200 rounded-[0.8vw]">
            <div class="flex items-start gap-[0.8vw] justify-center">
              <svg class="w-[1.2vw] h-[1.2vw] text-blue-500 flex-shrink-0 mt-[0.1vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-[0.9vw] text-blue-700">
                  <strong>Importante:</strong> Una vez enviada tu solicitud, recibirás una respuesta a través de la misma plataforma. 
                  El Oficial Mayor te confirmará la fecha y hora de tu visita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- BOTÓN VOLVER                              -->
      <!-- ========================================== -->
      <div class="text-center mt-[3vw]">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-[0.5vw] text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- LIGHTBOX - ZOOM INTERACTIVO               -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="lightboxVisible"
          class="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-[2vw]"
          @click="cerrarLightbox"
        >
          <div class="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center" @click.stop>
            <!-- Contenedor de la imagen con zoom -->
            <div class="relative overflow-hidden rounded-[0.5vw]">
              <img 
                ref="lightboxImgRef"
                :src="lightboxImage" 
                :alt="lightboxAlt"
                class="max-w-[85vw] max-h-[80vh] object-contain transition-transform duration-300 ease-out"
                :style="{ transform: `scale(${zoomLevel})`, cursor: zoomLevel > 1 ? 'grab' : 'default' }"
                @wheel="manejarZoom"
                @mousedown="iniciarArrastre"
                @mousemove="moverArrastre"
                @mouseup="terminarArrastre"
                @mouseleave="terminarArrastre"
              />
            </div>
            
            <!-- Controles -->
            <div class="absolute bottom-[1vw] left-1/2 -translate-x-1/2 flex items-center gap-[1vw] bg-black/60 rounded-full px-[1.5vw] py-[0.6vw]">
              <!-- Título -->
              <span class="text-white text-[0.9vw] font-medium max-w-[30vw] truncate">{{ lightboxAlt }}</span>
              
              <div class="w-[0.1vw] h-[1.5vw] bg-white/30"></div>
              
              <!-- Botón Zoom Out -->
              <button 
                @click="zoomOut"
                class="text-white hover:text-gray-300 transition-colors text-[1.2vw] w-[2vw] h-[2vw] flex items-center justify-center"
                title="Alejar"
              >
                <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              
              <!-- Nivel de zoom -->
              <span class="text-white text-[0.8vw] font-mono min-w-[3vw] text-center">{{ Math.round(zoomLevel * 100) }}%</span>
              
              <!-- Botón Zoom In -->
              <button 
                @click="zoomIn"
                class="text-white hover:text-gray-300 transition-colors text-[1.2vw] w-[2vw] h-[2vw] flex items-center justify-center"
                title="Acercar"
              >
                <svg class="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                </svg>
              </button>
              
              <div class="w-[0.1vw] h-[1.5vw] bg-white/30"></div>
              
              <!-- Botón Restablecer -->
              <button 
                @click="resetearZoom"
                class="text-white/60 hover:text-white transition-colors text-[0.8vw] px-[0.8vw] py-[0.3vw] rounded-[0.3vw] hover:bg-white/10"
                title="Restablecer zoom"
              >
                Reset
              </button>
              
              <!-- Botón Cerrar -->
              <button 
                @click="cerrarLightbox"
                class="text-white hover:text-gray-300 transition-colors text-[1.2vw] w-[2vw] h-[2vw] flex items-center justify-center"
                title="Cerrar (ESC)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ============================================
// LIGHTBOX STATE
// ============================================
const lightboxVisible = ref(false)
const lightboxImage = ref('')
const lightboxAlt = ref('')
const zoomLevel = ref(1)
const lightboxImgRef = ref(null)

// Variables para arrastre
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)
const currentTranslateX = ref(0)
const currentTranslateY = ref(0)

// ============================================
// FUNCIONES DEL LIGHTBOX
// ============================================
const abrirLightbox = (src, alt) => {
  lightboxImage.value = src
  lightboxAlt.value = alt
  lightboxVisible.value = true
  zoomLevel.value = 1
  currentTranslateX.value = 0
  currentTranslateY.value = 0
  document.body.style.overflow = 'hidden'
}

const cerrarLightbox = () => {
  lightboxVisible.value = false
  document.body.style.overflow = 'auto'
  zoomLevel.value = 1
  currentTranslateX.value = 0
  currentTranslateY.value = 0
}

// ============================================
// ZOOM
// ============================================
const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.25, 3)
  actualizarTransformacion()
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.25, 0.5)
  actualizarTransformacion()
}

const resetearZoom = () => {
  zoomLevel.value = 1
  currentTranslateX.value = 0
  currentTranslateY.value = 0
  actualizarTransformacion()
}

const manejarZoom = (event) => {
  event.preventDefault()
  const delta = event.deltaY > 0 ? -0.15 : 0.15
  zoomLevel.value = Math.min(Math.max(zoomLevel.value + delta, 0.5), 3)
  actualizarTransformacion()
}

const actualizarTransformacion = () => {
  if (lightboxImgRef.value) {
    lightboxImgRef.value.style.transform = `scale(${zoomLevel.value}) translate(${currentTranslateX.value}px, ${currentTranslateY.value}px)`
  }
}

// ============================================
// ARRASTRE (para imágenes con zoom)
// ============================================
const iniciarArrastre = (event) => {
  if (zoomLevel.value <= 1) return
  isDragging.value = true
  dragStartX.value = event.clientX - dragOffsetX.value
  dragStartY.value = event.clientY - dragOffsetY.value
  if (lightboxImgRef.value) {
    lightboxImgRef.value.style.cursor = 'grabbing'
  }
}

const moverArrastre = (event) => {
  if (!isDragging.value || zoomLevel.value <= 1) return
  dragOffsetX.value = event.clientX - dragStartX.value
  dragOffsetY.value = event.clientY - dragStartY.value
  
  // Limitar el arrastre
  const maxOffset = 200 * zoomLevel.value
  currentTranslateX.value = Math.min(Math.max(dragOffsetX.value, -maxOffset), maxOffset)
  currentTranslateY.value = Math.min(Math.max(dragOffsetY.value, -maxOffset), maxOffset)
  
  actualizarTransformacion()
}

const terminarArrastre = () => {
  isDragging.value = false
  if (lightboxImgRef.value) {
    lightboxImgRef.value.style.cursor = zoomLevel.value > 1 ? 'grab' : 'default'
  }
}

// ============================================
// TECLADO
// ============================================
const handleKeydown = (e) => {
  if (!lightboxVisible.value) return
  if (e.key === 'Escape') cerrarLightbox()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === 'r' || e.key === 'R') resetearZoom()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>