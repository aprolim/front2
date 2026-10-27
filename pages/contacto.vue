<template>
  <div class="min-h-screen bg-gray-50">
    <!-- ============================================ -->
    <!-- HERO / BANNER (CONTACTO)                     -->
    <!-- ============================================ -->
    <section 
      class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white"
      role="banner"
      aria-labelledby="contacto-titulo"
    >
      <div class="container mx-auto px-4 py-8 md:py-16 lg:py-20">
        <div class="flex flex-col items-center text-center">
          <!-- Badge -->
          <div 
            class="inline-flex items-center bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-3"
            aria-hidden="true"
          >
            <Icon name="mdi:email" class="text-senado-gold text-lg md:text-xl lg:text-2xl" />
            <span class="text-white/80 tracking-wider font-medium text-xs md:text-sm ml-2">CONTACTO Y VISITAS</span>
          </div>
          
          <h1 
            id="contacto-titulo"
            class="font-bold leading-tight text-3xl md:text-5xl lg:text-6xl"
          >
            ¿Cómo podemos <span class="text-senado-gold">ayudarte</span>?
          </h1>
          
          <p class="text-white/70 max-w-2xl text-sm md:text-base lg:text-lg mt-2 md:mt-3">
            Estamos aquí para escucharte, brindarte información y recibir tu visita en el Palacio Legislativo.
          </p>
        </div>
      </div>
      
      <!-- Onda inferior -->
      <div class="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full" role="presentation">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <main class="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-7xl">
      
      <!-- ============================================ -->
      <!-- TARJETAS DE CONTACTO RÁPIDO                  -->
      <!-- ============================================ -->
      <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 -mt-6 md:-mt-10 relative z-10"
        role="list"
      >
        <div 
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          role="listitem"
        >
          <div class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto" aria-hidden="true">
            <Icon name="mdi:phone" class="text-3xl text-senado-primary" />
          </div>
          <h3 class="text-center font-bold text-gray-800 text-base md:text-lg">Teléfono</h3>
          <p class="text-center text-gray-600 text-sm md:text-base">
            <a href="tel:+59122143400" class="hover:text-senado-primary transition-colors">
              (591-2) 2143400
            </a>
          </p>
        </div>

        <div 
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          role="listitem"
        >
          <div class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto" aria-hidden="true">
            <Icon name="mdi:email" class="text-3xl text-senado-primary" />
          </div>
          <h3 class="text-center font-bold text-gray-800 text-base md:text-lg">Correo Electrónico</h3>
          <p class="text-center text-gray-600 text-sm md:text-base">
            <a href="mailto:info@senado.gob.bo" class="hover:text-senado-primary transition-colors">
              info@senado.gob.bo
            </a>
          </p>
        </div>

        <div 
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          role="listitem"
        >
          <div class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto" aria-hidden="true">
            <Icon name="mdi:clock" class="text-3xl text-senado-primary" />
          </div>
          <h3 class="text-center font-bold text-gray-800 text-base md:text-lg">Horario de Atención</h3>
          <p class="text-center text-gray-600 text-sm md:text-base">Lunes a Viernes</p>
          <p class="text-center text-gray-600 text-sm md:text-base">08:30 - 16:30 hrs</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- ENCARGADOS DE RECIBIR MENSAJES (16.1)        -->
      <!-- ============================================ -->
      <section class="mt-8 md:mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-[#1a3a6c] to-[#0f2347] text-white px-4 py-3 md:px-6 md:py-4">
          <h2 class="font-bold text-lg md:text-xl flex items-center gap-2">
            <Icon name="mdi:account-tie" />
            Encargados de recibir y contestar mensajes y llamadas
          </h2>
        </div>
        <div class="p-4 md:p-6">
          <p class="text-gray-600 text-sm md:text-base mb-4">
            Conforme a los Lineamientos de Contenidos Mínimos de Portales y Páginas Web Institucionales
            (R.M. 067/2025), la institución designa a los siguientes responsables para la atención
            de consultas ciudadanas:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="(enc, i) in encargados" 
              :key="i" 
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-full bg-senado-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:account-circle" class="text-2xl text-senado-primary" />
                </div>
                <div class="min-w-0">
                  <h3 class="font-semibold text-gray-800 text-sm truncate">{{ enc.nombre }}</h3>
                  <p class="text-xs text-gray-500 leading-tight">{{ enc.cargo }}</p>
                </div>
              </div>
              <div class="space-y-1.5 text-xs">
                <div class="flex items-center gap-2 text-gray-600">
                  <Icon name="mdi:phone" class="text-senado-primary flex-shrink-0 text-sm" />
                  <span>{{ enc.telefono }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                  <Icon name="mdi:email" class="text-senado-primary flex-shrink-0 text-sm" />
                  <a :href="`mailto:${enc.email}`" class="hover:text-senado-primary truncate">
                    {{ enc.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================ -->
      <!-- 🔥 SECCIÓN FUSIONADA: VISITAS GUIADAS        -->
      <!-- ============================================ -->
      <section class="mt-8 md:mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-[#611717] to-[#8f1522] text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between flex-wrap gap-2">
          <h2 class="font-bold text-lg md:text-xl flex items-center gap-2">
            <Icon name="mdi:bank" />
            Visitas Guiadas al Palacio Legislativo
          </h2>
          <span class="text-xs md:text-sm bg-white/20 px-3 py-1 rounded-full">
            Acceso Gratuito
          </span>
        </div>
        
        <div class="p-4 md:p-6">
          <p class="text-gray-600 text-sm md:text-base mb-6 text-center max-w-3xl mx-auto">
            Las visitas guiadas tienen por objetivo generar un espacio de acercamiento al <strong>Poder Legislativo</strong>, 
            para que conozcas dónde y cómo trabajan los representantes del pueblo en la confección de las leyes que fortalecen la democracia.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Requisitos -->
            <div class="bg-[#f8f6f0] rounded-xl p-5 md:p-6">
              <h3 class="text-base md:text-lg font-bold text-senado-primary mb-4 flex items-center gap-2">
                <Icon name="mdi:clipboard-check" class="text-xl" />
                Requisitos para el Ingreso
              </h3>
              <ul class="space-y-3 text-sm md:text-base text-gray-700">
                <li class="flex items-start gap-3">
                  <span class="text-senado-primary font-bold mt-0.5">•</span>
                  <span>Completar la <strong>solicitud en la plataforma digital</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-senado-primary font-bold mt-0.5">•</span>
                  <span>Presentar <strong>cédula de identidad</strong> el día de la visita</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-senado-primary font-bold mt-0.5">•</span>
                  <span>Respetar las <strong>normas de conducta</strong> del Reglamento del Senado</span>
                </li>

              </ul>
            </div>

            <!-- Horarios -->
            <div class="bg-[#f8f6f0] rounded-xl p-5 md:p-6">
              <h3 class="text-base md:text-lg font-bold text-senado-primary mb-4 flex items-center gap-2">
                <Icon name="mdi:clock-outline" class="text-xl" />
                Horarios de Visita
              </h3>
              <div class="space-y-2 text-sm md:text-base text-gray-700">
                <div class="flex justify-between py-2 border-b border-gray-300">
                  <span class="font-medium">Lunes a Viernes</span>
                  <span>08:30 - 16:30</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="font-medium">Sábados y Domingos</span>
                  <span class="text-gray-400">Cerrado</span>
                </div>
              </div>
            </div>
          </div>



          <!-- Botón de Solicitud -->
          <div class="text-center">
            <a 
              href="https://systemdemo.es/auth/login-external" 
              target="_blank"
              class="inline-flex items-center justify-center gap-2 py-3 px-8 bg-[#611717] text-white rounded-lg font-semibold hover:bg-[#3a060d] transition text-sm md:text-base"
            >
              <span>Iniciar Solicitud de Visita en la Plataforma</span>
              <Icon name="mdi:open-in-new" class="text-lg" />
            </a>
            <p class="text-xs text-gray-400 mt-3">
              La solicitud debe realizarse con al menos 15 días de anticipación.
            </p>
          </div>
        </div>
      </section>

      <!-- ============================================ -->
      <!-- MAPA + DIRECCIÓN                             -->
      <!-- ============================================ -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
        <!-- Mapa -->
        <section class="bg-white rounded-xl shadow-lg overflow-hidden" aria-labelledby="mapa-titulo">
          <div class="bg-senado-primary text-white px-4 py-3 md:px-6 md:py-4">
            <h2 id="mapa-titulo" class="font-bold text-lg md:text-xl flex items-center gap-2">
              <Icon name="mdi:map-marker" />
              Ubicación
            </h2>
          </div>
          <div class="h-64 md:h-80 lg:h-96 w-full">
            <iframe
              title="Mapa de ubicación del Senado - Casa Grande del Pueblo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.123456789!2d-68.13359296560174!3d-16.496656424958083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21d1a1f1f1f1%3A0x0!2zMTbCsDI5JzQ4LjAiUyA2OMCsMDgnMDAuMCJX!5e0!3m2!1ses!2sbo!4v1234567890&markers=color:red%7C-16.496656424958083,-68.13359296560174"
              width="100%"
              height="100%"
              style="border:0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <!-- Dirección detallada -->
        <section class="bg-white rounded-xl shadow-lg p-4 md:p-6" aria-labelledby="direccion-titulo">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 id="direccion-titulo" class="font-bold text-senado-primary text-base flex items-center gap-2 mb-2">
                <Icon name="mdi:map-marker" />
                Dirección
              </h3>
              <address class="not-italic text-gray-600 text-sm">
                <strong>Casa Grande del Pueblo</strong><br />
                Calle Comercio esquina Colón<br />
                La Paz, Bolivia
              </address>
              <p class="text-gray-600 text-sm mt-2">
                <Icon name="mdi:phone" class="inline text-senado-primary" />
                <a href="tel:+59122143400" class="hover:text-senado-primary transition-colors">
                  (591-2) 2143400
                </a>
              </p>
            </div>
            <div>
              <h4 class="font-bold text-senado-primary text-base flex items-center gap-2 mb-2">
                <Icon name="mdi:car" />
                Cómo llegar
              </h4>
              <p class="text-gray-600 text-sm">
                🚗 Estacionamiento cercano disponible<br />
                🚌 Transporte público: Líneas que pasan por la Plaza Murillo
              </p>
              <div class="mt-3">
                <a 
                  href="https://maps.app.goo.gl/4gpVed8ix3dF2mdV6" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-senado-primary hover:underline focus:outline-none focus:ring-2 focus:ring-senado-primary rounded text-sm"
                >
                  <Icon name="mdi:open-in-new" />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-200">
            <a 
              href="https://maps.app.goo.gl/4gpVed8ix3dF2mdV6" 
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 bg-senado-primary text-white text-center rounded-lg hover:bg-senado-primary-dark transition font-medium flex items-center justify-center gap-2 px-4 py-2 text-sm"
            >
              <Icon name="mdi:google-maps" />
              Google Maps
            </a>
          </div>
        </section>
      </div>


      <!-- ============================================ -->
      <!-- ENLACES DE INTERÉS                           -->
      <!-- ============================================ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-12" role="list">
        <div class="bg-senado-gold-lightest rounded-xl border border-senado-gold p-4 md:p-5" role="listitem">
          <div class="flex items-center gap-3">
            <Icon name="mdi:headset" class="text-senado-primary text-2xl md:text-3xl" aria-hidden="true" />
            <div>
              <h4 class="font-bold text-senado-primary text-sm md:text-base">Atención al Ciudadano</h4>
              <p class="text-gray-600 text-sm">
                <a href="tel:+59122143400" class="hover:text-senado-primary transition-colors">
                  (591-2) 2143400
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-senado-primary/5 rounded-xl border border-senado-primary/20 p-4 md:p-5" role="listitem">
          <div class="flex items-center gap-3">
            <Icon name="mdi:file-document" class="text-senado-primary text-2xl md:text-3xl" aria-hidden="true" />
            <div>
              <h4 class="font-bold text-senado-primary text-sm md:text-base">Transparencia</h4>
              <p class="text-gray-600 text-sm">
                <NuxtLink to="/solicitud-informacion" class="text-senado-primary hover:underline focus:outline-none focus:ring-2 focus:ring-senado-primary rounded">
                  Solicita información
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- PREGUNTAS FRECUENTES                         -->
      <!-- ============================================ -->
      <section class="bg-white rounded-xl shadow-lg p-4 md:p-6 mt-8 md:mt-12" aria-labelledby="faq-titulo">
        <h3 id="faq-titulo" class="text-center font-bold text-gray-800 text-xl md:text-2xl mb-4">
          ❓ Preguntas Frecuentes
        </h3>
        <dl class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base mb-1">¿Cómo agendo una visita guiada?</dt>
            <dd class="text-gray-600 text-sm">
              <a href="https://systemdemo.es/auth/login-external" target="_blank" class="text-senado-primary hover:underline">
                Ingresa a la plataforma digital
              </a> y completa tu solicitud con 15 días de anticipación.
            </dd>
          </div>
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base mb-1">¿Cómo solicito información pública?</dt>
            <dd class="text-gray-600 text-sm">
              <NuxtLink to="/solicitud-informacion" class="text-senado-primary hover:underline">
                Solicita información aquí
              </NuxtLink>
            </dd>
          </div>
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base mb-1">¿Horario de atención?</dt>
            <dd class="text-gray-600 text-sm">Lunes a Viernes 08:30 - 16:30 hrs</dd>
          </div>
        </dl>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ============================================
// ESTADO
// ============================================
const busquedaRespuestas = ref('')

// ============================================
// ENCARGADOS DE RECIBIR MENSAJES (16.1)
// ============================================
const encargados = [
  {
    nombre: 'Unidad de Transparencia',
    cargo: 'Atención de consultas de acceso a la información',
    telefono: '(591-2) 2143400 int. 101',
    email: 'transparencia@senado.gob.bo'
  },
  {
    nombre: 'Dirección de Comunicación',
    cargo: 'Consulta de prensa y comunicación institucional',
    telefono: '(591-2) 2143400 int. 202',
    email: 'comunicacion@senado.gob.bo'
  },
  {
    nombre: 'Atención al Ciudadano',
    cargo: 'Consultas generales, orientación y visitas',
    telefono: '(591-2) 2143400 int. 303',
    email: 'ciudadano@senado.gob.bo'
  },
]

// ============================================
// REGISTRO DE RESPUESTAS ENVIADAS (16.2)
// Datos de ejemplo - reemplazar con datos reales de la UTLCC
// ============================================
const respuestas = ref([
  {
    fecha: '15/10/2026',
    tipo: 'Solicitud de información pública',
    canal: 'Formulario web',
    icono: 'mdi:web',
    respuesta: 'Respuesta enviada por correo electrónico',
    estado: 'Atendida'
  },
  {
    fecha: '14/10/2026',
    tipo: 'Consulta sobre trámite legislativo',
    canal: 'Correo electrónico',
    icono: 'mdi:email',
    respuesta: 'Respuesta enviada por correo electrónico',
    estado: 'Atendida'
  },
  {
    fecha: '12/10/2026',
    tipo: 'Denuncia por presunta corrupción',
    canal: 'SITPRECO S2+',
    icono: 'mdi:shield-alert',
    respuesta: 'Derivada al sistema SITPRECO S2+',
    estado: 'Derivada'
  },
  {
    fecha: '10/10/2026',
    tipo: 'Consulta sobre visita guiada',
    canal: 'Teléfono',
    icono: 'mdi:phone',
    respuesta: 'Información brindada por teléfono',
    estado: 'Atendida'
  },
  {
    fecha: '08/10/2026',
    tipo: 'Solicitud de información pública',
    canal: 'Formulario web',
    icono: 'mdi:web',
    respuesta: 'Respuesta enviada por correo electrónico',
    estado: 'Atendida'
  },
  {
    fecha: '05/10/2026',
    tipo: 'Consulta sobre POA y presupuesto',
    canal: 'Correo electrónico',
    icono: 'mdi:email',
    respuesta: 'Respuesta enviada con enlace a la sección de Transparencia',
    estado: 'Atendida'
  },
])

// ============================================
// COMPUTED
// ============================================
const respuestasFiltradas = computed(() => {
  if (!busquedaRespuestas.value.trim()) return respuestas.value
  const t = busquedaRespuestas.value.toLowerCase()
  return respuestas.value.filter(r =>
    r.tipo.toLowerCase().includes(t) ||
    r.canal.toLowerCase().includes(t) ||
    r.estado.toLowerCase().includes(t)
  )
})

// ============================================
// SEO
// ============================================
useHead({
  title: 'Contacto y Visitas | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Contáctate con la Cámara de Senadores de Bolivia o solicita tu visita guiada. Dirección, teléfonos, correos y registro de respuestas.'
    },
    { property: 'og:title', content: 'Contacto y Visitas | Senado de Bolivia' },
    { property: 'og:description', content: 'Dirección, teléfonos, correos, visitas guiadas y encargados de atención al ciudadano.' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<style scoped>
/* Focus visible para accesibilidad */
*:focus-visible {
  outline: 2px solid #1a3c6e;
  outline-offset: 2px;
}

/* Animaciones con preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>