<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white pt-[6vw] sm:pt-[2vw] pb-[22vw] sm:pb-[5vw]">
      <div class="container mx-auto px-4 max-w-[90vw]">
        <div class="max-w-[90vw] sm:max-w-[55vw]">
          <div class="flex items-center gap-[3.12vw] sm:gap-[0.8vw] mb-[3vw] sm:mb-[1.3vw]">
            <Icon name="mdi:file-document" class="text-senado-gold flex-shrink-0 text-[8vw] sm:text-[2.2vw]" />
            <span class="text-senado-gold font-semibold tracking-wider uppercase bg-black/20 px-[3.5vw] sm:px-[1.3vw] py-[1.2vw] sm:py-[0.4vw] rounded-full text-[3.2vw] sm:text-[0.9vw]">
              Acceso a la Información
            </span>
          </div>
          <h1 class="font-bold leading-tight text-[9vw] sm:text-[3vw] mb-[3vw] sm:mb-[1.3vw]">
            Solicitud de <br class="hidden sm:block" />
            <span class="text-senado-gold">Información</span>
          </h1>
          <p class="text-white/80 max-w-[90vw] sm:max-w-[45vw] leading-relaxed text-[4vw] sm:text-[1.1vw]">
            Conoce cómo realizar tu solicitud de información pública a través del sistema de gestión documental con Ciudadanía Digital
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 leading-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" preserveAspectRatio="none" class="w-full block h-[10vw] sm:h-[6vw]">
          <path fill="#f9fafb" fill-opacity="1" d="M0,120L48,112C96,104,192,88,288,88C384,88,480,104,576,112C672,120,768,120,864,104C960,88,1056,56,1152,56C1248,56,1344,88,1392,104L1440,120L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4 max-w-[90vw] py-[7.8vw] sm:py-[3vw]">
      <!-- Información General -->
      <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-[5.85vw] sm:p-[1.5vw] mb-[7.8vw] sm:mb-[3vw] shadow-sm">
        <div class="flex items-start gap-[3.9vw] sm:gap-[1vw]">
          <Icon name="mdi:information-outline" class="text-blue-500 flex-shrink-0 text-[7.8vw] sm:text-[1.6vw]" />
          <div>
            <h3 class="font-semibold text-blue-800 text-[5.46vw] sm:text-[1.2vw] mb-[1.3vw] sm:mb-[0.3vw]">
              ¿Qué es la Solicitud de Información?
            </h3>
            <p class="text-blue-700 leading-relaxed text-[4.68vw] sm:text-[0.95vw]">
              Es el derecho que tiene toda persona a solicitar y acceder a la información pública generada, 
              administrada o en posesión del Senado, en el marco de la <strong>Ley N° 974</strong> de Transparencia y Acceso a la Información Pública.
            </p>
          </div>
        </div>
      </div>

      <!-- Proceso Paso a Paso -->
      <section class="mb-[7.8vw] sm:mb-[3vw]">
        <h2 class="font-bold text-senado-primary flex items-center gap-[3.12vw] sm:gap-[0.8vw] text-[8.58vw] sm:text-[2vw] mb-[7.8vw] sm:mb-[2vw]">
          <Icon name="mdi:timeline-text" class="text-[10.92vw] sm:text-[2.5vw]" />
          Proceso para Solicitar Información
        </h2>

        <div class="space-y-[5.85vw] sm:space-y-[1.5vw]">
          <!-- Paso 1: Ir al sistema -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-[5vw] bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:p-[1.5vw]">
                <span class="font-bold text-senado-primary text-[9.75vw] sm:text-[2vw]">1</span>
              </div>
              <div class="flex-1 p-[5.85vw] sm:p-[1.8vw]">
                <div class="flex items-center gap-[3.12vw] sm:gap-[0.8vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  <div class="bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 w-[10.92vw] sm:w-[2.8vw] h-[10.92vw] sm:h-[2.8vw]">
                    <Icon name="mdi:web" class="text-blue-600 text-[7.02vw] sm:text-[1.3vw]" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[5.46vw] sm:text-[1.4vw]">Ingresa al Sistema de Gestión Documental</h3>
                </div>
                <p class="text-gray-600 text-[4.68vw] sm:text-[1vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  Accede al portal del <strong>Sistema de Gestión Documental</strong> a través del siguiente enlace:
                </p>
                <div class="bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3.12vw] sm:gap-[0.8vw] p-[3.12vw] sm:p-[0.8vw]">
                  <div class="flex items-center gap-[3.12vw] sm:gap-[0.8vw] w-full sm:w-auto">
                    <Icon name="mdi:link-variant" class="text-senado-primary flex-shrink-0 text-[7.02vw] sm:text-[1.3vw]" />
                    <span class="font-mono bg-white px-[3.12vw] sm:px-[0.8vw] py-[1.56vw] sm:py-[0.4vw] rounded border border-gray-300 truncate w-full sm:w-auto text-[3.51vw] sm:text-[0.9vw]">
                      https://systemdemo.es/
                    </span>
                  </div>
                  <a 
                    href="https://systemdemo.es/" 
                    target="_blank"
                    class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors font-medium inline-flex items-center gap-[1.95vw] sm:gap-[0.5vw] w-full sm:w-auto justify-center py-[3.12vw] sm:py-[0.6vw] px-[5.85vw] sm:px-[1.5vw] text-[4.68vw] sm:text-[1vw]"
                  >
                    <Icon name="mdi:open-in-new" class="text-[6.24vw] sm:text-[1.1vw]" />
                    Ir al sistema
                  </a>
                </div>
                <div class="mt-[3.12vw] sm:mt-[0.8vw] flex items-start gap-[2.34vw] sm:gap-[0.6vw] text-gray-500 text-[3.315vw] sm:text-[0.85vw]">
                  <Icon name="mdi:information" class="text-senado-primary flex-shrink-0 text-[4.68vw] sm:text-[1vw]" />
                  <p>Este es el sistema oficial de gestión documental para la presentación de solicitudes de información pública.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 2: Loguearse con Ciudadanía Digital -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-[5vw] bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:p-[1.5vw]">
                <span class="font-bold text-senado-primary text-[9.75vw] sm:text-[2vw]">2</span>
              </div>
              <div class="flex-1 p-[5.85vw] sm:p-[1.8vw]">
                <div class="flex items-center gap-[3.12vw] sm:gap-[0.8vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  <div class="bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 w-[10.92vw] sm:w-[2.8vw] h-[10.92vw] sm:h-[2.8vw]">
                    <Icon name="mdi:shield-account" class="text-green-600 text-[7.02vw] sm:text-[1.3vw]" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[5.46vw] sm:text-[1.4vw]">Inicia sesión con Ciudadanía Digital</h3>
                </div>
                <p class="text-gray-600 text-[4.68vw] sm:text-[1vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  Una vez en el sistema, debes iniciar sesión utilizando tu usuario de 
                  <strong>Ciudadanía Digital</strong>. Este es el sistema oficial de autenticación del Estado.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-[3.12vw] sm:gap-[0.8vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  <div class="bg-blue-50 rounded-lg p-[3.9vw] sm:p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:account-circle" class="text-blue-600 mx-auto text-[9.75vw] sm:text-[1.8vw]" />
                    <p class="font-medium text-gray-700 text-[3.51vw] sm:text-[1vw]">Usuario o CI</p>
                    <p class="text-gray-500 text-[2.925vw] sm:text-[0.8vw]">Ej: 1234567</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[3.9vw] sm:p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:lock" class="text-blue-600 mx-auto text-[9.75vw] sm:text-[1.8vw]" />
                    <p class="font-medium text-gray-700 text-[3.51vw] sm:text-[1vw]">Contraseña</p>
                    <p class="text-gray-500 text-[2.925vw] sm:text-[0.8vw]">Tu contraseña</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[3.9vw] sm:p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:two-factor-authentication" class="text-blue-600 mx-auto text-[9.75vw] sm:text-[1.8vw]" />
                    <p class="font-medium text-gray-700 text-[3.51vw] sm:text-[1vw]">Verificación 2FA</p>
                    <p class="text-gray-500 text-[2.925vw] sm:text-[0.8vw]">Código adicional</p>
                  </div>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-[3.12vw] sm:p-[0.8vw] rounded">
                  <p class="text-yellow-700 flex items-start gap-[2.34vw] sm:gap-[0.6vw] text-[3.51vw] sm:text-[0.9vw]">
                    <Icon name="mdi:alert" class="flex-shrink-0 text-[4.68vw] sm:text-[1vw]" />
                    <span><strong>Importante:</strong> Si aún no tienes usuario en Ciudadanía Digital, debes registrarte previamente en el portal oficial.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 3: Enviar mensaje a la Unidad de Transparencia -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-[5vw] bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:p-[1.5vw]">
                <span class="font-bold text-senado-primary text-[9.75vw] sm:text-[2vw]">3</span>
              </div>
              <div class="flex-1 p-[5.85vw] sm:p-[1.8vw]">
                <div class="flex items-center gap-[3.12vw] sm:gap-[0.8vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  <div class="bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 w-[10.92vw] sm:w-[2.8vw] h-[10.92vw] sm:h-[2.8vw]">
                    <Icon name="mdi:email-send" class="text-purple-600 text-[7.02vw] sm:text-[1.3vw]" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[5.46vw] sm:text-[1.4vw]">Envía tu mensaje a la Unidad de Transparencia</h3>
                </div>
                <p class="text-gray-600 text-[4.68vw] sm:text-[1vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  Una vez autenticado, genera un nuevo documento o solicitud dirigido a la 
                  <strong>Unidad de Transparencia y Lucha contra la Corrupción del Senado</strong> 
                  indicando claramente la información que necesitas.
                </p>

                <div class="bg-senado-gold-lightest rounded-lg border-2 border-senado-gold p-[4.68vw] sm:p-[1.3vw] mb-[3.12vw] sm:mb-[0.8vw]">
                  <h4 class="font-semibold text-senado-primary flex items-center gap-[2.34vw] sm:gap-[0.6vw] text-[4.29vw] sm:text-[1.1vw] mb-[2.34vw] sm:mb-[0.6vw]">
                    <Icon name="mdi:file-document-edit" class="text-[5.46vw] sm:text-[1.3vw]" />
                    ¿Qué debes incluir en tu mensaje?
                  </h4>
                  <ul class="space-y-[1.56vw] sm:space-y-[0.4vw] text-[3.51vw] sm:text-[0.9vw]">
                    <li class="flex items-start gap-[2.34vw] sm:gap-[0.6vw]">
                      <span class="text-senado-gold text-[4.68vw] sm:text-[1vw]">✓</span>
                      <span><strong>Destinatario:</strong> Unidad de Transparencia y Lucha contra la Corrupción - Senado</span>
                    </li>
                    <li class="flex items-start gap-[2.34vw] sm:gap-[0.6vw]">
                      <span class="text-senado-gold text-[4.68vw] sm:text-[1vw]">✓</span>
                      <span><strong>Descripción clara:</strong> Explica detalladamente qué información solicitas</span>
                    </li>
                    <li class="flex items-start gap-[2.34vw] sm:gap-[0.6vw]">
                      <span class="text-senado-gold text-[4.68vw] sm:text-[1vw]">✓</span>
                      <span><strong>Período o fecha:</strong> Indica el rango de tiempo de la información (ej: 2020-2024)</span>
                    </li>
                    <li class="flex items-start gap-[2.34vw] sm:gap-[0.6vw]">
                      <span class="text-senado-gold text-[4.68vw] sm:text-[1vw]">✓</span>
                      <span><strong>Formato:</strong> Especifica si deseas la información en formato digital o físico</span>
                    </li>
                    <li class="flex items-start gap-[2.34vw] sm:gap-[0.6vw]">
                      <span class="text-senado-gold text-[4.68vw] sm:text-[1vw]">✓</span>
                      <span><strong>Datos de contacto:</strong> Correo electrónico y teléfono para respuesta</span>
                    </li>
                  </ul>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-[3.12vw] sm:gap-[0.8vw]">
                  <div class="bg-green-50 rounded-lg p-[3.12vw] sm:p-[0.8vw] border border-green-200">
                    <div class="flex items-center gap-[1.95vw] sm:gap-[0.5vw] text-green-700 text-[3.51vw] sm:text-[0.9vw]">
                      <Icon name="mdi:check-circle" class="text-[5.46vw] sm:text-[1.2vw]" />
                      <span class="font-medium">Confirmación inmediata de recepción</span>
                    </div>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[3.12vw] sm:p-[0.8vw] border border-blue-200">
                    <div class="flex items-center gap-[1.95vw] sm:gap-[0.5vw] text-blue-700 text-[3.51vw] sm:text-[0.9vw]">
                      <Icon name="mdi:clock" class="text-[5.46vw] sm:text-[1.2vw]" />
                      <span class="font-medium">Plazo de respuesta: 30 días hábiles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen Gráfico del Proceso -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-[6.5vw] sm:p-[2vw]">
            <h4 class="font-semibold text-gray-800 text-center text-[4.68vw] sm:text-[1.1vw] mb-[5.85vw] sm:mb-[1.5vw]">Resumen del Proceso</h4>
            <div class="flex flex-col sm:flex-row items-center justify-between gap-[3.12vw] sm:gap-[1vw]">
              <div class="flex flex-col items-center">
                <div class="bg-blue-100 rounded-full flex items-center justify-center w-[15.6vw] sm:w-[4vw] h-[15.6vw] sm:h-[4vw]">
                  <Icon name="mdi:web" class="text-blue-600 text-[8.58vw] sm:text-[1.8vw]" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.95vw] sm:mt-[0.5vw] text-[3.12vw] sm:text-[0.85vw]">1. Systemdemo.es</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[7.02vw] sm:text-[1.8vw]" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[7.02vw] sm:text-[1.8vw]" />
              <div class="flex flex-col items-center">
                <div class="bg-green-100 rounded-full flex items-center justify-center w-[15.6vw] sm:w-[4vw] h-[15.6vw] sm:h-[4vw]">
                  <Icon name="mdi:shield-account" class="text-green-600 text-[8.58vw] sm:text-[1.8vw]" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.95vw] sm:mt-[0.5vw] text-[3.12vw] sm:text-[0.85vw]">2. Ciudadanía Digital</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[7.02vw] sm:text-[1.8vw]" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[7.02vw] sm:text-[1.8vw]" />
              <div class="flex flex-col items-center">
                <div class="bg-purple-100 rounded-full flex items-center justify-center w-[15.6vw] sm:w-[4vw] h-[15.6vw] sm:h-[4vw]">
                  <Icon name="mdi:email-send" class="text-purple-600 text-[8.58vw] sm:text-[1.8vw]" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.95vw] sm:mt-[0.5vw] text-[3.12vw] sm:text-[0.85vw]">3. Enviar solicitud</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[7.02vw] sm:text-[1.8vw]" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[7.02vw] sm:text-[1.8vw]" />
              <div class="flex flex-col items-center">
                <div class="bg-senado-gold-lightest rounded-full flex items-center justify-center w-[15.6vw] sm:w-[4vw] h-[15.6vw] sm:h-[4vw]">
                  <Icon name="mdi:file-document" class="text-senado-gold text-[8.58vw] sm:text-[1.8vw]" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.95vw] sm:mt-[0.5vw] text-[3.12vw] sm:text-[0.85vw]">4. Respuesta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Preguntas Frecuentes -->
      <section class="mb-[7.8vw] sm:mb-[3vw]">
        <h2 class="font-bold text-senado-primary flex items-center gap-[3.12vw] sm:gap-[0.8vw] text-[8.58vw] sm:text-[2vw] mb-[5.85vw] sm:mb-[1.5vw]">
          <Icon name="mdi:help-circle" class="text-[10.92vw] sm:text-[2.5vw]" />
          Preguntas Frecuentes
        </h2>
        <div class="space-y-[3.12vw] sm:space-y-[0.8vw]">
          <div 
            v-for="(faq, index) in preguntasFrecuentes" 
            :key="index"
            class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full p-[4.68vw] sm:p-[1.3vw] text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-800 text-[4.095vw] sm:text-[1.05vw]">{{ faq.pregunta }}</span>
              <span class="text-senado-primary transition-transform flex-shrink-0" :class="faq.abierta ? 'rotate-180' : ''">
                <Icon name="mdi:chevron-down" class="text-[7.02vw] sm:text-[1.3vw]" />
              </span>
            </button>
            <div 
              class="px-[4.68vw] sm:px-[1.3vw] overflow-hidden transition-all duration-300"
              :class="faq.abierta ? 'max-h-40 pb-[4.68vw] sm:pb-[1.3vw]' : 'max-h-0'"
            >
              <p class="text-gray-600 leading-relaxed text-[3.705vw] sm:text-[0.95vw]">{{ faq.respuesta }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Botones de Acción -->
      <section>
        <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark rounded-xl shadow-lg p-[7.8vw] sm:p-[2.5vw] text-center text-white">
          <div class="max-w-[90vw] sm:max-w-[55vw] mx-auto">
            <Icon name="mdi:rocket" class="text-senado-gold text-[15.6vw] sm:text-[3vw] mb-[3.12vw] sm:mb-[0.8vw]" />
            <h3 class="font-bold text-[7.8vw] sm:text-[2vw] mb-[1.95vw] sm:mb-[0.5vw]">¿Listo para realizar tu solicitud?</h3>
            <p class="text-white/80 leading-relaxed text-[4.29vw] sm:text-[1.1vw] mb-[5.85vw] sm:mb-[1.5vw]">
              Ingresa al sistema de gestión documental, autentícate con Ciudadanía Digital y envía tu mensaje a la 
              Unidad de Transparencia del Senado.
            </p>
            <div class="flex flex-wrap justify-center gap-[3.12vw] sm:gap-[0.8vw]">
              <a 
                href="https://systemdemo.es/" 
                target="_blank"
                class="bg-white text-senado-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-[1.95vw] sm:gap-[0.5vw] py-[3.12vw] sm:py-[0.8vw] px-[7.8vw] sm:px-[2vw] text-[4.68vw] sm:text-[1.1vw]"
              >
                <Icon name="mdi:open-in-new" class="text-[6.24vw] sm:text-[1.3vw]" />
                Ir al sistema
              </a>
              <NuxtLink 
                to="/unidad-transparencia"
                class="bg-senado-gold text-senado-primary rounded-lg font-semibold hover:bg-senado-gold-dark transition-colors inline-flex items-center gap-[1.95vw] sm:gap-[0.5vw] py-[3.12vw] sm:py-[0.8vw] px-[7.8vw] sm:px-[2vw] text-[4.68vw] sm:text-[1.1vw]"
              >
                <Icon name="mdi:arrow-left" class="text-[6.24vw] sm:text-[1.3vw]" />
                Volver a Transparencia
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SolicitudInformacion',
  data() {
    return {
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuánto tiempo tengo para recibir respuesta a mi solicitud?',
          respuesta: 'La ley establece un plazo máximo de 30 días hábiles para dar respuesta a tu solicitud. Si la información está disponible, el plazo se reduce a 10 días hábiles.',
          abierta: false
        },
        {
          pregunta: '¿Qué información puedo solicitar al Senado?',
          respuesta: 'Puedes solicitar cualquier información pública generada, administrada o en posesión del Senado, con excepción de aquella que tenga carácter reservado o secreto por ley.',
          abierta: false
        },
        {
          pregunta: '¿Necesito abogado para hacer una solicitud?',
          respuesta: 'No, cualquier ciudadano puede realizar una solicitud de información sin necesidad de representación legal. Solo necesitas tu usuario de Ciudadanía Digital.',
          abierta: false
        },
        {
          pregunta: '¿Qué pasa si mi solicitud es denegada?',
          respuesta: 'Tienes derecho a presentar un recurso de impugnación ante la misma institución o ante el Tribunal Superior de Justicia, conforme a la Ley N° 974.',
          abierta: false
        },
        {
          pregunta: '¿Cómo sé que mi solicitud fue recibida?',
          respuesta: 'El sistema te genera un número de seguimiento y te envía una confirmación a tu correo electrónico registrado.',
          abierta: false
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.preguntasFrecuentes[index].abierta = !this.preguntasFrecuentes[index].abierta
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 90vw;
  margin-left: auto;
  margin-right: auto;
}

.bg-senado-gold-lightest {
  background-color: #fef9e7;
}

.bg-senado-gold-dark {
  background-color: #d4a017;
}

.max-h-0 {
  max-height: 0;
}

.max-h-40 {
  max-height: 10rem;
}

.hover\:shadow-xl {
  transition: box-shadow 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>