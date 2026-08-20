<!-- pages/solicitud-informacion.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white" style="padding: 4vw 0 3vw 0;">
      <div class="container mx-auto px-4" style="max-width: 90vw;">
        <div class="max-w-4xl">
          <div class="flex items-center gap-[0.8vw] mb-[1.2vw]">
            <Icon name="mdi:file-document" class="text-senado-gold flex-shrink-0" style="font-size: 3.5vw;" />
            <span class="text-senado-gold font-semibold tracking-wider uppercase bg-black/20 px-[1.2vw] py-[0.4vw] rounded-full" style="font-size: 1vw;">
              Acceso a la Información
            </span>
          </div>
          <h1 class="font-bold leading-tight" style="font-size: 5vw; margin-bottom: 1.2vw;">
            Solicitud de <br class="hidden sm:block" />
            <span class="text-senado-gold">Información</span>
          </h1>
          <p class="text-white/80 max-w-2xl leading-relaxed" style="font-size: 1.4vw;">
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

    <div class="container mx-auto px-4" style="max-width: 90vw; padding: 3vw 0;">
      <!-- Información General -->
      <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-[1.5vw] mb-[3vw] shadow-sm" style="border-left-width: 0.4vw;">
        <div class="flex items-start gap-[1vw]">
          <Icon name="mdi:information-outline" class="text-blue-500 flex-shrink-0" style="font-size: 2vw;" />
          <div>
            <h3 class="font-semibold text-blue-800" style="font-size: 1.4vw; margin-bottom: 0.3vw;">
              ¿Qué es la Solicitud de Información?
            </h3>
            <p class="text-blue-700 leading-relaxed" style="font-size: 1vw;">
              Es el derecho que tiene toda persona a solicitar y acceder a la información pública generada, 
              administrada o en posesión del Senado, en el marco de la <strong>Ley N° 974</strong> de Transparencia y Acceso a la Información Pública.
            </p>
          </div>
        </div>
      </div>

      <!-- Proceso Paso a Paso -->
      <section class="mb-[3vw]">
        <h2 class="font-bold text-senado-primary flex items-center gap-[0.8vw]" style="font-size: 2.2vw; margin-bottom: 2vw;">
          <Icon name="mdi:timeline-text" style="font-size: 2.8vw;" />
          Proceso para Solicitar Información
        </h2>

        <div class="space-y-[1.5vw]">
          <!-- Paso 1: Ir al sistema -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow" style="border-radius: 0.8vw;">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4" style="min-width: 5vw; padding: 1.5vw;">
                <span class="font-bold text-senado-primary" style="font-size: 2.5vw;">1</span>
              </div>
              <div class="flex-1" style="padding: 1.8vw;">
                <div class="flex items-center gap-[0.8vw] mb-[0.8vw]">
                  <div class="bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0" style="width: 2.8vw; height: 2.8vw;">
                    <Icon name="mdi:web" class="text-blue-600" style="font-size: 1.8vw;" />
                  </div>
                  <h3 class="font-semibold text-gray-800" style="font-size: 1.4vw;">Ingresa al Sistema de Gestión Documental</h3>
                </div>
                <p class="text-gray-600" style="font-size: 1vw; margin-bottom: 0.8vw;">
                  Accede al portal del <strong>Sistema de Gestión Documental</strong> a través del siguiente enlace:
                </p>
                <div class="bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[0.8vw]" style="padding: 0.8vw 1.2vw;">
                  <div class="flex items-center gap-[0.8vw] w-full sm:w-auto">
                    <Icon name="mdi:link-variant" class="text-senado-primary flex-shrink-0" style="font-size: 1.8vw;" />
                    <span class="font-mono bg-white px-[0.8vw] py-[0.4vw] rounded border border-gray-300 truncate w-full sm:w-auto" style="font-size: 0.9vw;">
                      https://systemdemo.es/
                    </span>
                  </div>
                  <a 
                    href="https://systemdemo.es/" 
                    target="_blank"
                    class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors font-medium inline-flex items-center gap-[0.5vw] w-full sm:w-auto justify-center" 
                    style="padding: 0.6vw 1.5vw; font-size: 0.9vw;"
                  >
                    <Icon name="mdi:open-in-new" style="font-size: 1.2vw;" />
                    Ir al sistema
                  </a>
                </div>
                <div class="mt-[0.8vw] flex items-start gap-[0.6vw] text-gray-500" style="font-size: 0.85vw;">
                  <Icon name="mdi:information" class="text-senado-primary flex-shrink-0" style="font-size: 1.2vw;" />
                  <p>Este es el sistema oficial de gestión documental para la presentación de solicitudes de información pública.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 2: Loguearse con Ciudadanía Digital -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow" style="border-radius: 0.8vw;">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4" style="min-width: 5vw; padding: 1.5vw;">
                <span class="font-bold text-senado-primary" style="font-size: 2.5vw;">2</span>
              </div>
              <div class="flex-1" style="padding: 1.8vw;">
                <div class="flex items-center gap-[0.8vw] mb-[0.8vw]">
                  <div class="bg-green-100 rounded-full flex items-center justify-center flex-shrink-0" style="width: 2.8vw; height: 2.8vw;">
                    <Icon name="mdi:shield-account" class="text-green-600" style="font-size: 1.8vw;" />
                  </div>
                  <h3 class="font-semibold text-gray-800" style="font-size: 1.4vw;">Inicia sesión con Ciudadanía Digital</h3>
                </div>
                <p class="text-gray-600" style="font-size: 1vw; margin-bottom: 0.8vw;">
                  Una vez en el sistema, debes iniciar sesión utilizando tu usuario de 
                  <strong>Ciudadanía Digital</strong>. Este es el sistema oficial de autenticación del Estado.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-[0.8vw] mb-[0.8vw]">
                  <div class="bg-blue-50 rounded-lg p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:account-circle" class="text-blue-600 mx-auto" style="font-size: 2.5vw;" />
                    <p class="font-medium text-gray-700" style="font-size: 0.9vw;">Usuario o CI</p>
                    <p class="text-gray-500" style="font-size: 0.75vw;">Ej: 1234567</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:lock" class="text-blue-600 mx-auto" style="font-size: 2.5vw;" />
                    <p class="font-medium text-gray-700" style="font-size: 0.9vw;">Contraseña</p>
                    <p class="text-gray-500" style="font-size: 0.75vw;">Tu contraseña</p>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[1vw] text-center border border-blue-200">
                    <Icon name="mdi:two-factor-authentication" class="text-blue-600 mx-auto" style="font-size: 2.5vw;" />
                    <p class="font-medium text-gray-700" style="font-size: 0.9vw;">Verificación 2FA</p>
                    <p class="text-gray-500" style="font-size: 0.75vw;">Código adicional</p>
                  </div>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-[0.8vw] rounded" style="border-left-width: 0.3vw;">
                  <p class="text-yellow-700 flex items-start gap-[0.6vw]" style="font-size: 0.9vw;">
                    <Icon name="mdi:alert" class="flex-shrink-0" style="font-size: 1.2vw;" />
                    <span><strong>Importante:</strong> Si aún no tienes usuario en Ciudadanía Digital, debes registrarte previamente en el portal oficial.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 3: Enviar mensaje a la Unidad de Transparencia -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow" style="border-radius: 0.8vw;">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-20 bg-gradient-to-b from-senado-gold to-senado-gold-dark flex items-center justify-center p-4" style="min-width: 5vw; padding: 1.5vw;">
                <span class="font-bold text-senado-primary" style="font-size: 2.5vw;">3</span>
              </div>
              <div class="flex-1" style="padding: 1.8vw;">
                <div class="flex items-center gap-[0.8vw] mb-[0.8vw]">
                  <div class="bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0" style="width: 2.8vw; height: 2.8vw;">
                    <Icon name="mdi:email-send" class="text-purple-600" style="font-size: 1.8vw;" />
                  </div>
                  <h3 class="font-semibold text-gray-800" style="font-size: 1.4vw;">Envía tu mensaje a la Unidad de Transparencia</h3>
                </div>
                <p class="text-gray-600" style="font-size: 1vw; margin-bottom: 0.8vw;">
                  Una vez autenticado, genera un nuevo documento o solicitud dirigido a la 
                  <strong>Unidad de Transparencia y Lucha contra la Corrupción del Senado</strong> 
                  indicando claramente la información que necesitas.
                </p>

                <div class="bg-senado-gold-lightest rounded-lg border-2 border-senado-gold" style="padding: 1.2vw; margin-bottom: 0.8vw;">
                  <h4 class="font-semibold text-senado-primary flex items-center gap-[0.6vw]" style="font-size: 1.1vw; margin-bottom: 0.6vw;">
                    <Icon name="mdi:file-document-edit" style="font-size: 1.4vw;" />
                    ¿Qué debes incluir en tu mensaje?
                  </h4>
                  <ul class="space-y-[0.4vw]" style="font-size: 0.9vw;">
                    <li class="flex items-start gap-[0.6vw]">
                      <span class="text-senado-gold" style="font-size: 1.2vw;">✓</span>
                      <span><strong>Destinatario:</strong> Unidad de Transparencia y Lucha contra la Corrupción - Senado</span>
                    </li>
                    <li class="flex items-start gap-[0.6vw]">
                      <span class="text-senado-gold" style="font-size: 1.2vw;">✓</span>
                      <span><strong>Descripción clara:</strong> Explica detalladamente qué información solicitas</span>
                    </li>
                    <li class="flex items-start gap-[0.6vw]">
                      <span class="text-senado-gold" style="font-size: 1.2vw;">✓</span>
                      <span><strong>Período o fecha:</strong> Indica el rango de tiempo de la información (ej: 2020-2024)</span>
                    </li>
                    <li class="flex items-start gap-[0.6vw]">
                      <span class="text-senado-gold" style="font-size: 1.2vw;">✓</span>
                      <span><strong>Formato:</strong> Especifica si deseas la información en formato digital o físico</span>
                    </li>
                    <li class="flex items-start gap-[0.6vw]">
                      <span class="text-senado-gold" style="font-size: 1.2vw;">✓</span>
                      <span><strong>Datos de contacto:</strong> Correo electrónico y teléfono para respuesta</span>
                    </li>
                  </ul>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-[0.8vw]">
                  <div class="bg-green-50 rounded-lg p-[0.8vw] border border-green-200">
                    <div class="flex items-center gap-[0.5vw] text-green-700" style="font-size: 0.9vw;">
                      <Icon name="mdi:check-circle" style="font-size: 1.4vw;" />
                      <span class="font-medium">Confirmación inmediata de recepción</span>
                    </div>
                  </div>
                  <div class="bg-blue-50 rounded-lg p-[0.8vw] border border-blue-200">
                    <div class="flex items-center gap-[0.5vw] text-blue-700" style="font-size: 0.9vw;">
                      <Icon name="mdi:clock" style="font-size: 1.4vw;" />
                      <span class="font-medium">Plazo de respuesta: 30 días hábiles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen Gráfico del Proceso -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100" style="padding: 2vw;">
            <h4 class="font-semibold text-gray-800 text-center" style="font-size: 1.2vw; margin-bottom: 1.5vw;">Resumen del Proceso</h4>
            <div class="flex flex-col md:flex-row items-center justify-between gap-[1vw]">
              <div class="flex flex-col items-center">
                <div class="bg-blue-100 rounded-full flex items-center justify-center" style="width: 4vw; height: 4vw;">
                  <Icon name="mdi:web" class="text-blue-600" style="font-size: 2.2vw;" />
                </div>
                <p class="font-medium text-gray-600 mt-[0.5vw]" style="font-size: 0.8vw;">1. Systemdemo.es</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden md:block" style="font-size: 1.8vw;" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block md:hidden" style="font-size: 1.8vw;" />
              <div class="flex flex-col items-center">
                <div class="bg-green-100 rounded-full flex items-center justify-center" style="width: 4vw; height: 4vw;">
                  <Icon name="mdi:shield-account" class="text-green-600" style="font-size: 2.2vw;" />
                </div>
                <p class="font-medium text-gray-600 mt-[0.5vw]" style="font-size: 0.8vw;">2. Ciudadanía Digital</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden md:block" style="font-size: 1.8vw;" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block md:hidden" style="font-size: 1.8vw;" />
              <div class="flex flex-col items-center">
                <div class="bg-purple-100 rounded-full flex items-center justify-center" style="width: 4vw; height: 4vw;">
                  <Icon name="mdi:email-send" class="text-purple-600" style="font-size: 2.2vw;" />
                </div>
                <p class="font-medium text-gray-600 mt-[0.5vw]" style="font-size: 0.8vw;">3. Enviar solicitud</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-400 hidden md:block" style="font-size: 1.8vw;" />
              <Icon name="mdi:arrow-down" class="text-gray-400 block md:hidden" style="font-size: 1.8vw;" />
              <div class="flex flex-col items-center">
                <div class="bg-senado-gold-lightest rounded-full flex items-center justify-center" style="width: 4vw; height: 4vw;">
                  <Icon name="mdi:file-document" class="text-senado-gold" style="font-size: 2.2vw;" />
                </div>
                <p class="font-medium text-gray-600 mt-[0.5vw]" style="font-size: 0.8vw;">4. Respuesta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Ejemplo de Solicitud -->
      <section class="mb-[3vw]">
        <h2 class="font-bold text-senado-primary flex items-center gap-[0.8vw]" style="font-size: 2.2vw; margin-bottom: 1.5vw;">
          <Icon name="mdi:format-list-bulleted" style="font-size: 2.8vw;" />
          Ejemplo de Solicitud
        </h2>
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" style="border-radius: 0.8vw;">
          <div class="bg-gray-50 border-b border-gray-200 flex items-center gap-[0.6vw]" style="padding: 0.6vw 1.5vw;">
            <Icon name="mdi:file-document-outline" class="text-senado-primary" style="font-size: 1.4vw;" />
            <span class="font-medium text-gray-700" style="font-size: 1vw;">Modelo de Mensaje</span>
          </div>
          <div class="p-[1.5vw] overflow-x-auto">
            <div class="bg-gray-50 rounded-lg p-[1vw] font-mono text-gray-700 whitespace-pre-wrap" style="font-size: 0.85vw;">
              <p class="text-gray-500" style="font-size: 0.75vw; margin-bottom: 0.5vw;">--- Ejemplo de solicitud ---</p>
              <p><strong>Para:</strong> Unidad de Transparencia y Lucha contra la Corrupción</p>
              <p><strong>Institución:</strong> Cámara de Senadores</p>
              <br>
              <p>Yo, [Nombre completo], con CI N° [Número de identificación],</p>
              <p>en ejercicio del derecho de acceso a la información pública establecido</p>
              <p>en la Ley N° 974, solicito lo siguiente:</p>
              <br>
              <p><strong>Información solicitada:</strong></p>
              <p>- [Descripción detallada de la información]</p>
              <p>- [Período o fechas específicas]</p>
              <p>- [Área o departamento relacionado]</p>
              <br>
              <p><strong>Formato:</strong> Digital (PDF/Excel) o Físico</p>
              <p><strong>Medio de respuesta:</strong> Correo electrónico</p>
              <br>
              <p>Fecha: [dd/mm/aaaa]</p>
              <p>Firma: [Nombre completo]</p>
              <p>Contacto: [Teléfono] - [Correo electrónico]</p>
            </div>
            <div class="mt-[0.8vw] flex items-center gap-[0.5vw] text-gray-500" style="font-size: 0.85vw;">
              <Icon name="mdi:information" class="text-senado-primary" style="font-size: 1.2vw;" />
              <span>Este es solo un ejemplo, tu solicitud debe ser generada dentro del sistema de gestión documental.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Preguntas Frecuentes -->
      <section class="mb-[3vw]">
        <h2 class="font-bold text-senado-primary flex items-center gap-[0.8vw]" style="font-size: 2.2vw; margin-bottom: 1.5vw;">
          <Icon name="mdi:help-circle" style="font-size: 2.8vw;" />
          Preguntas Frecuentes
        </h2>
        <div class="space-y-[0.8vw]">
          <div 
            v-for="(faq, index) in preguntasFrecuentes" 
            :key="index"
            class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100" style="border-radius: 0.6vw;"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full p-[1.2vw] text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-800" style="font-size: 1.05vw;">{{ faq.pregunta }}</span>
              <span class="text-senado-primary transition-transform flex-shrink-0" :class="faq.abierta ? 'rotate-180' : ''">
                <Icon name="mdi:chevron-down" style="font-size: 1.8vw;" />
              </span>
            </button>
            <div 
              class="px-[1.2vw] overflow-hidden transition-all duration-300"
              :class="faq.abierta ? 'max-h-40 pb-[1.2vw]' : 'max-h-0'"
            >
              <p class="text-gray-600 leading-relaxed" style="font-size: 0.95vw;">{{ faq.respuesta }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Botones de Acción -->
      <section>
        <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark rounded-xl shadow-lg p-[2.5vw] text-center text-white" style="border-radius: 0.8vw;">
          <div class="max-w-2xl mx-auto">
            <Icon name="mdi:rocket" class="text-senado-gold" style="font-size: 4vw; margin-bottom: 0.8vw;" />
            <h3 class="font-bold" style="font-size: 2vw; margin-bottom: 0.5vw;">¿Listo para realizar tu solicitud?</h3>
            <p class="text-white/80 leading-relaxed" style="font-size: 1.1vw; margin-bottom: 1.5vw;">
              Ingresa al sistema de gestión documental, autentícate con Ciudadanía Digital y envía tu mensaje a la 
              Unidad de Transparencia del Senado.
            </p>
            <div class="flex flex-wrap justify-center gap-[0.8vw]">
              <a 
                href="https://systemdemo.es/" 
                target="_blank"
                class="bg-white text-senado-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-[0.5vw]" 
                style="padding: 0.7vw 2vw; font-size: 1.1vw;"
              >
                <Icon name="mdi:open-in-new" style="font-size: 1.4vw;" />
                Ir al sistema
              </a>
              <NuxtLink 
                to="/unidad-transparencia"
                class="bg-senado-gold text-senado-primary rounded-lg font-semibold hover:bg-senado-gold-dark transition-colors inline-flex items-center gap-[0.5vw]"
                style="padding: 0.7vw 2vw; font-size: 1.1vw;"
              >
                <Icon name="mdi:arrow-left" style="font-size: 1.4vw;" />
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
}

.bg-senado-gold-lightest {
  background-color: #fef9e7;
}

.bg-senado-gold-dark {
  background-color: #d4a017;
}

/* Transiciones para FAQ */
.max-h-0 {
  max-height: 0;
}

.max-h-40 {
  max-height: 10rem;
}

/* Animaciones */
.hover\:shadow-xl {
  transition: box-shadow 0.3s ease;
}

/* Estilos para el ejemplo de solicitud */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-break: break-word;
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Estilos responsivos adicionales */
@media (max-width: 768px) {
  .md\:w-20 {
    width: 100%;
    padding: 0.75rem;
  }
}
</style>