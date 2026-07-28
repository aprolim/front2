<template>
  <footer class="bg-white text-senado-dark py-8 mt-10 border-t border-senado-dark-light">
    <div class="mx-auto w-[90%]">
      <!-- Contenedor al 80% máximo y centrado -->
      <div class="max-w-[80%] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <!-- Columna 1: Redes Sociales -->
          <div class="flex flex-col items-center">
            <h4 class="font-bold mb-3 text-senado-dark">Redes Sociales</h4>
            <div class="flex justify-center gap-3">
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <Icon name="mdi:facebook" class="text-2xl" />
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <Icon name="mdi:twitter" class="text-2xl" />
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <Icon name="mdi:youtube" class="text-2xl" />
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <Icon name="mdi:instagram" class="text-2xl" />
              </a>
            </div>
          </div>

          <!-- Columna 2: Contacto -->
          <div class="flex flex-col items-center">
            <h4 class="font-bold mb-3 text-senado-dark">Contacto</h4>
            <p class="text-sm text-senado-dark">Calle Comercio esquina Colón</p>
            <p class="text-sm text-senado-dark">Telf.: (591) 2158701</p>
            <p class="text-sm text-senado-dark">La Paz - Bolivia</p>
          </div>

          <!-- Columna 3: Sitios de Interés -->
          <div class="flex flex-col items-center">
            <h4 class="font-bold mb-3 text-senado-dark">Sitios de interés</h4>
            <ul class="text-sm space-y-1">
              <li>
                <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                  Portal del Estado
                </a>
              </li>
              <li>
                <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                  Cámara de Diputados
                </a>
              </li>
              <li>
                <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                  Órgano Judicial
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-xs mt-8 border-t border-senado-dark-light pt-4 text-senado-dark">
        © 2026 Senado de Bolivia - Todos los derechos reservados
      </div>
    </div>
  </footer>
</template>