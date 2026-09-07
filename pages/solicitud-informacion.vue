<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white pt-[8vw] sm:pt-16 pb-[6vw] sm:pb-12">
      <div class="container mx-auto px-4 max-w-[90vw]">
        <div class="max-w-4xl">
          <div class="flex items-center gap-[2.4vw] sm:gap-3 mb-[3.6vw] sm:mb-5">
            <Icon name="mdi:file-document" class="text-senado-gold flex-shrink-0 text-[10.5vw] sm:text-4xl" />
            <span class="text-senado-gold font-semibold tracking-wider uppercase bg-black/20 px-[3.6vw] sm:px-5 py-[1.2vw] sm:py-1.5 rounded-full text-[3.6vw] sm:text-sm">
              Acceso a la Información
            </span>
          </div>
          <h1 class="font-bold leading-tight text-[10vw] sm:text-5xl mb-[3.6vw] sm:mb-5">
            Solicitud de <br class="hidden sm:block" />
            <span class="text-senado-gold">Información</span>
          </h1>
          <p class="text-white/80 max-w-2xl leading-relaxed text-[4.2vw] sm:text-lg">
            Conoce cómo realizar tu solicitud de información pública a través del sistema de gestión documental con Ciudadanía Digital
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-12">
      <!-- Información General -->
      <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-[4.5vw] sm:p-6 mb-[6vw] sm:mb-12 shadow-sm">
        <div class="flex items-start gap-[3vw] sm:gap-4">
          <Icon name="mdi:information-outline" class="text-blue-500 flex-shrink-0 text-[6vw] sm:text-2xl" />
          <div>
            <h3 class="font-semibold text-blue-800 text-[4.2vw] sm:text-lg mb-[1vw] sm:mb-1">
              ¿Qué es la Solicitud de Información?
            </h3>
            <p class="text-blue-700 leading-relaxed text-[3.6vw] sm:text-sm">
              Es el derecho que tiene toda persona a solicitar y acceder a la información pública generada, 
              administrada o en posesión del Senado, en el marco de la <strong>Ley N° 974</strong> de Transparencia y Acceso a la Información Pública.
            </p>
          </div>
        </div>
      </div>

      <!-- Proceso Paso a Paso -->
      <section class="mb-[6vw] sm:mb-12">
        <h2 class="font-bold text-senado-primary flex items-center gap-[2.4vw] sm:gap-3 text-[6.6vw] sm:text-2xl mb-[6vw] sm:mb-8">
          <Icon name="mdi:timeline-text" class="text-[8.4vw] sm:text-3xl" />
          Proceso para Solicitar Información
        </h2>

        <div class="space-y-[4.5vw] sm:space-y-6">
          <!-- Paso 1: Ir al sistema -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:min-w-[5vw] sm:p-6">
                <span class="font-bold text-senado-primary text-[7.5vw] sm:text-2xl">1</span>
              </div>
              <div class="flex-1 p-[4.5vw] sm:p-7">
                <div class="flex items-center gap-[2.4vw] sm:gap-3 mb-[2.4vw] sm:mb-3">
                  <div class="bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 w-[8.4vw] sm:w-11 h-[8.4vw] sm:h-11">
                    <Icon name="mdi:web" class="text-blue-600 text-[5.4vw] sm:text-xl" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[4.2vw] sm:text-lg">Ingresa al Sistema de Gestión Documental</h3>
                </div>
                <p class="text-gray-600 text-[3.6vw] sm:text-sm mb-[2.4vw] sm:mb-3">
                  Accede al portal del <strong>Sistema de Gestión Documental</strong> a través del siguiente enlace:
                </p>
                <div class="bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[2.4vw] sm:gap-3 p-[2.4vw] sm:p-3">
                  <div class="flex items-center gap-[2.4vw] sm:gap-3 w-full sm:w-auto">
                    <Icon name="mdi:link-variant" class="text-senado-primary flex-shrink-0 text-[5.4vw] sm:text-xl" />
                    <span class="font-mono bg-white px-[2.4vw] sm:px-3 py-[1.2vw] sm:py-1.5 rounded border border-gray-300 truncate w-full sm:w-auto text-[2.7vw] sm:text-sm">
                      https://systemdemo.es/
                    </span>
                  </div>
                  <a 
                    href="https://systemdemo.es/" 
                    target="_blank"
                    class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors font-medium inline-flex items-center gap-[1.5vw] sm:gap-2 w-full sm:w-auto justify-center py-[2.4vw] sm:py-2 px-[4.5vw] sm:px-6 text-[3.6vw] sm:text-sm"
                  >
                    <Icon name="mdi:open-in-new" class="text-[4.8vw] sm:text-lg" />
                    Ir al sistema
                  </a>
                </div>
                <div class="mt-[2.4vw] sm:mt-3 flex items-start gap-[1.8vw] sm:gap-2 text-gray-500 text-[2.55vw] sm:text-sm">
                  <Icon name="mdi:information" class="text-senado-primary flex-shrink-0 text-[3.6vw] sm:text-base" />
                  <p>Este es el sistema oficial de gestión documental para la presentación de solicitudes de información pública.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 2: Loguearse con Ciudadanía Digital -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:min-w-[5vw] sm:p-6">
                <span class="font-bold text-senado-primary text-[7.5vw] sm:text-2xl">2</span>
              </div>
              <div class="flex-1 p-[4.5vw] sm:p-7">
                <div class="flex items-center gap-[2.4vw] sm:gap-3 mb-[2.4vw] sm:mb-3">
                  <div class="bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 w-[8.4vw] sm:w-11 h-[8.4vw] sm:h-11">
                    <Icon name="mdi:shield-account" class="text-green-600 text-[5.4vw] sm:text-xl" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[4.2vw] sm:text-lg">Inicia sesión con Ciudadanía Digital</h3>
                </div>
                <p class="text-gray-600 text-[3.6vw] sm:text-sm mb-[2.4vw] sm:mb-3">
                  Una vez en el sistema, debes iniciar sesión utilizando tu usuario de 
                  <strong>Ciudadanía Digital</strong>. Este es el sistema oficial de autenticación del Estado.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-[2.4vw] sm:gap-3 mb-[2.4vw] sm:mb-3">
                  <div class="bg-blue-50 rounded-lg p-[3vw] sm:p-4 text-center border border-blue-200">
                    <Icon name="mdi:account-circle" class="text-blue-600 mx-auto text-[7.5vw] sm:text-3xl" />
                    <p class="font-medium text-gray-700 text-[2.7vw] sm:text-sm">Usuario o CI</p>
                    <p class="text-gray-500 text-[2.25vw] sm:text-xs">Ej: 1234567</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[3vw] sm:p-4 text-center border border-blue-200">
                    <Icon name="mdi:lock" class="text-blue-600 mx-auto text-[7.5vw] sm:text-3xl" />
                    <p class="font-medium text-gray-700 text-[2.7vw] sm:text-sm">Contraseña</p>
                    <p class="text-gray-500 text-[2.25vw] sm:text-xs">Tu contraseña</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[3vw] sm:p-4 text-center border border-blue-200">
                    <Icon name="mdi:two-factor-authentication" class="text-blue-600 mx-auto text-[7.5vw] sm:text-3xl" />
                    <p class="font-medium text-gray-700 text-[2.7vw] sm:text-sm">Verificación 2FA</p>
                    <p class="text-gray-500 text-[2.25vw] sm:text-xs">Código adicional</p>
                  </div>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-[2.4vw] sm:p-3 rounded">
                  <p class="text-yellow-700 flex items-start gap-[1.8vw] sm:gap-2 text-[2.7vw] sm:text-sm">
                    <Icon name="mdi:alert" class="flex-shrink-0 text-[3.6vw] sm:text-base" />
                    <span><strong>Importante:</strong> Si aún no tienes usuario en Ciudadanía Digital, debes registrarte previamente en el portal oficial.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 3: Enviar mensaje a la Unidad de Transparencia -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="flex flex-col sm:flex-row">
              <div class="sm:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4 sm:min-w-[5vw] sm:p-6">
                <span class="font-bold text-senado-primary text-[7.5vw] sm:text-2xl">3</span>
              </div>
              <div class="flex-1 p-[4.5vw] sm:p-7">
                <div class="flex items-center gap-[2.4vw] sm:gap-3 mb-[2.4vw] sm:mb-3">
                  <div class="bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 w-[8.4vw] sm:w-11 h-[8.4vw] sm:h-11">
                    <Icon name="mdi:email-send" class="text-purple-600 text-[5.4vw] sm:text-xl" />
                  </div>
                  <h3 class="font-semibold text-gray-800 text-[4.2vw] sm:text-lg">Envía tu mensaje a la Unidad de Transparencia</h3>
                </div>
                <p class="text-gray-600 text-[3.6vw] sm:text-sm mb-[2.4vw] sm:mb-3">
                  Una vez autenticado, genera un nuevo documento o solicitud dirigido a la 
                  <strong>Unidad de Transparencia y Lucha contra la Corrupción del Senado</strong> 
                  indicando claramente la información que necesitas.
                </p>

                <div class="bg-senado-gold-lightest rounded-lg border-2 border-senado-gold p-[3.6vw] sm:p-5 mb-[2.4vw] sm:mb-3">
                  <h4 class="font-semibold text-senado-primary flex items-center gap-[1.8vw] sm:gap-2 text-[3.3vw] sm:text-base mb-[1.8vw] sm:mb-2">
                    <Icon name="mdi:file-document-edit" class="text-[4.2vw] sm:text-xl" />
                    ¿Qué debes incluir en tu mensaje?
                  </h4>
                  <ul class="space-y-[1.2vw] sm:space-y-1.5 text-[2.7vw] sm:text-sm">
                    <li class="flex items-start gap-[1.8vw] sm:gap-2">
                      <span class="text-senado-gold text-[3.6vw] sm:text-base">✓</span>
                      <span><strong>Destinatario:</strong> Unidad de Transparencia y Lucha contra la Corrupción - Senado</span>
                    </li>
                    <li class="flex items-start gap-[1.8vw] sm:gap-2">
                      <span class="text-senado-gold text-[3.6vw] sm:text-base">✓</span>
                      <span><strong>Descripción clara:</strong> Explica detalladamente qué información solicitas</span>
                    </li>
                    <li class="flex items-start gap-[1.8vw] sm:gap-2">
                      <span class="text-senado-gold text-[3.6vw] sm:text-base">✓</span>
                      <span><strong>Período o fecha:</strong> Indica el rango de tiempo de la información (ej: 2020-2024)</span>
                    </li>
                    <li class="flex items-start gap-[1.8vw] sm:gap-2">
                      <span class="text-senado-gold text-[3.6vw] sm:text-base">✓</span>
                      <span><strong>Formato:</strong> Especifica si deseas la información en formato digital o físico</span>
                    </li>
                    <li class="flex items-start gap-[1.8vw] sm:gap-2">
                      <span class="text-senado-gold text-[3.6vw] sm:text-base">✓</span>
                      <span><strong>Datos de contacto:</strong> Correo electrónico y teléfono para respuesta</span>
                    </li>
                  </ul>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-[2.4vw] sm:gap-3">
                  <div class="bg-green-50 rounded-lg p-[2.4vw] sm:p-3 border border-green-200">
                    <div class="flex items-center gap-[1.5vw] sm:gap-2 text-green-700 text-[2.7vw] sm:text-sm">
                      <Icon name="mdi:check-circle" class="text-[4.2vw] sm:text-lg" />
                      <span class="font-medium">Confirmación inmediata de recepción</span>
                    </div>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[2.4vw] sm:p-3 border border-blue-200">
                    <div class="flex items-center gap-[1.5vw] sm:gap-2 text-blue-700 text-[2.7vw] sm:text-sm">
                      <Icon name="mdi:clock" class="text-[4.2vw] sm:text-lg" />
                      <span class="font-medium">Plazo de respuesta: 30 días hábiles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen Gráfico del Proceso -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-[5vw] sm:p-8">
            <h4 class="font-semibold text-gray-800 text-center text-[3.6vw] sm:text-base mb-[4.5vw] sm:mb-6">Resumen del Proceso</h4>
            <div class="flex flex-col sm:flex-row items-center justify-between gap-[2.4vw] sm:gap-4">
              <div class="flex flex-col items-center">
                <div class="bg-blue-100 rounded-full flex items-center justify-center w-[12vw] sm:w-16 h-[12vw] sm:h-16">
                  <Icon name="mdi:web" class="text-blue-600 text-[6.6vw] sm:text-2xl" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.5vw] sm:mt-2 text-[2.4vw] sm:text-sm">1. Systemdemo.es</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[5.4vw] sm:text-2xl" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[5.4vw] sm:text-2xl" />
              <div class="flex flex-col items-center">
                <div class="bg-green-100 rounded-full flex items-center justify-center w-[12vw] sm:w-16 h-[12vw] sm:h-16">
                  <Icon name="mdi:shield-account" class="text-green-600 text-[6.6vw] sm:text-2xl" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.5vw] sm:mt-2 text-[2.4vw] sm:text-sm">2. Ciudadanía Digital</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[5.4vw] sm:text-2xl" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[5.4vw] sm:text-2xl" />
              <div class="flex flex-col items-center">
                <div class="bg-purple-100 rounded-full flex items-center justify-center w-[12vw] sm:w-16 h-[12vw] sm:h-16">
                  <Icon name="mdi:email-send" class="text-purple-600 text-[6.6vw] sm:text-2xl" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.5vw] sm:mt-2 text-[2.4vw] sm:text-sm">3. Enviar solicitud</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden sm:block text-[5.4vw] sm:text-2xl" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block sm:hidden text-[5.4vw] sm:text-2xl" />
              <div class="flex flex-col items-center">
                <div class="bg-senado-gold-lightest rounded-full flex items-center justify-center w-[12vw] sm:w-16 h-[12vw] sm:h-16">
                  <Icon name="mdi:file-document" class="text-senado-gold text-[6.6vw] sm:text-2xl" />
                </div>
                <p class="font-medium text-gray-600 mt-[1.5vw] sm:mt-2 text-[2.4vw] sm:text-sm">4. Respuesta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Preguntas Frecuentes -->
      <section class="mb-[6vw] sm:mb-12">
        <h2 class="font-bold text-senado-primary flex items-center gap-[2.4vw] sm:gap-3 text-[6.6vw] sm:text-2xl mb-[4.5vw] sm:mb-6">
          <Icon name="mdi:help-circle" class="text-[8.4vw] sm:text-3xl" />
          Preguntas Frecuentes
        </h2>
        <div class="space-y-[2.4vw] sm:space-y-3">
          <div 
            v-for="(faq, index) in preguntasFrecuentes" 
            :key="index"
            class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full p-[3.6vw] sm:p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-800 text-[3.15vw] sm:text-base">{{ faq.pregunta }}</span>
              <span class="text-senado-primary transition-transform flex-shrink-0" :class="faq.abierta ? 'rotate-180' : ''">
                <Icon name="mdi:chevron-down" class="text-[5.4vw] sm:text-xl" />
              </span>
            </button>
            <div 
              class="px-[3.6vw] sm:px-5 overflow-hidden transition-all duration-300"
              :class="faq.abierta ? 'max-h-40 pb-[3.6vw] sm:pb-5' : 'max-h-0'"
            >
              <p class="text-gray-600 leading-relaxed text-[2.85vw] sm:text-sm">{{ faq.respuesta }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Botones de Acción -->
      <section>
        <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark rounded-xl shadow-lg p-[6vw] sm:p-10 text-center text-white">
          <div class="max-w-2xl mx-auto">
            <Icon name="mdi:rocket" class="text-senado-gold text-[12vw] sm:text-4xl mb-[2.4vw] sm:mb-3" />
            <h3 class="font-bold text-[6vw] sm:text-2xl mb-[1.5vw] sm:mb-2">¿Listo para realizar tu solicitud?</h3>
            <p class="text-white/80 leading-relaxed text-[3.3vw] sm:text-base mb-[4.5vw] sm:mb-6">
              Ingresa al sistema de gestión documental, autentícate con Ciudadanía Digital y envía tu mensaje a la 
              Unidad de Transparencia del Senado.
            </p>
            <div class="flex flex-wrap justify-center gap-[2.4vw] sm:gap-3">
              <a 
                href="https://systemdemo.es/" 
                target="_blank"
                class="bg-white text-senado-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-[1.5vw] sm:gap-2 py-[2.4vw] sm:py-3 px-[6vw] sm:px-8 text-[3.6vw] sm:text-base"
              >
                <Icon name="mdi:open-in-new" class="text-[4.8vw] sm:text-xl" />
                Ir al sistema
              </a>
              <NuxtLink 
                to="/unidad-transparencia"
                class="bg-senado-gold text-senado-primary rounded-lg font-semibold hover:bg-senado-gold-dark transition-colors inline-flex items-center gap-[1.5vw] sm:gap-2 py-[2.4vw] sm:py-3 px-[6vw] sm:px-8 text-[3.6vw] sm:text-base"
              >
                <Icon name="mdi:arrow-left" class="text-[4.8vw] sm:text-xl" />
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
  max-width: 1200px;
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