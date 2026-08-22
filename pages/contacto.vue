<!-- pages/contacto.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner con ARIA -->
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
            <span class="text-white/80 tracking-wider font-medium text-xs md:text-sm ml-2">CONTACTO</span>
          </div>
          
          <h1 
            id="contacto-titulo"
            class="font-bold leading-tight text-3xl md:text-5xl lg:text-6xl"
          >
            ¿Cómo podemos <span class="text-senado-gold">ayudarte</span>?
          </h1>
          
          <p class="text-white/70 max-w-2xl text-sm md:text-base lg:text-lg mt-2 md:mt-3">
            Estamos aquí para escucharte y brindarte la información que necesitas
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
      
      <!-- Tarjetas de contacto rápido -->
      <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 -mt-6 md:-mt-10 relative z-10"
        role="list"
      >
        <div 
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          role="listitem"
        >
          <div 
            class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto"
            aria-hidden="true"
          >
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
          <div 
            class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto"
            aria-hidden="true"
          >
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
          <div 
            class="flex items-center justify-center w-14 h-14 bg-senado-primary/10 rounded-full mb-4 mx-auto"
            aria-hidden="true"
          >
            <Icon name="mdi:clock" class="text-3xl text-senado-primary" />
          </div>
          <h3 class="text-center font-bold text-gray-800 text-base md:text-lg">Horario de Atención</h3>
          <p class="text-center text-gray-600 text-sm md:text-base">Lunes a Viernes</p>
          <p class="text-center text-gray-600 text-sm md:text-base">08:30 - 16:30 hrs</p>
        </div>
      </div>

      <!-- Grid: Mapa + Dirección -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
        
        <!-- Mapa -->
        <section 
          class="bg-white rounded-xl shadow-lg overflow-hidden"
          aria-labelledby="mapa-titulo"
        >
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
        <section 
          class="bg-white rounded-xl shadow-lg p-4 md:p-6"
          aria-labelledby="direccion-titulo"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 id="direccion-titulo" class="font-bold text-senado-primary text-base flex items-center gap-2">
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
              <h4 class="font-bold text-senado-primary text-base flex items-center gap-2">
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

      <!-- Enlaces de interés -->
      <div 
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 md:mt-12"
        role="list"
      >
        <div 
          class="bg-senado-gold-lightest rounded-xl border border-senado-gold p-4 md:p-5"
          role="listitem"
        >
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

        <div 
          class="bg-senado-primary/5 rounded-xl border border-senado-primary/20 p-4 md:p-5"
          role="listitem"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:file-document" class="text-senado-primary text-2xl md:text-3xl" aria-hidden="true" />
            <div>
              <h4 class="font-bold text-senado-primary text-sm md:text-base">Transparencia</h4>
              <p class="text-gray-600 text-sm">
                <NuxtLink 
                  to="/solicitud-informacion" 
                  class="text-senado-primary hover:underline focus:outline-none focus:ring-2 focus:ring-senado-primary rounded"
                >
                  Solicita información
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ rápido -->
      <section 
        class="bg-white rounded-xl shadow-lg p-4 md:p-6 mt-8 md:mt-12"
        aria-labelledby="faq-titulo"
      >
        <h3 id="faq-titulo" class="text-center font-bold text-gray-800 text-xl md:text-2xl mb-4">
          ❓ Preguntas Frecuentes
        </h3>
        <dl class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base">¿Cómo puedo visitar el Senado?</dt>
            <NuxtLink to="/visita-senado" class="text-senado-primary hover:underline">
                Agenda tu visita en nuestra página de visitas
              </NuxtLink>
          </div>
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base">¿Cómo solicito información?</dt>
            <dd class="text-gray-600 text-sm">
              <NuxtLink to="/solicitud-informacion" class="text-senado-primary hover:underline">
                Solicita información aquí
              </NuxtLink>
            </dd>
          </div>
          <div>
            <dt class="font-semibold text-senado-primary text-sm md:text-base">¿Horario de atención?</dt>
            <dd class="text-gray-600 text-sm">Lunes a Viernes 08:00 - 17:00 hrs</dd>
          </div>
        </dl>
      </section>

    </main>
  </div>
</template>

<script>
export default {
  name: 'Contacto'
}
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