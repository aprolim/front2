<template>
  <footer class="bg-white text-senado-dark py-8 mt-10 border-t border-black" style="background: #ffffff !important;">
    <div class="mx-auto w-[90%]">
      <!-- Contenedor al 80% máximo y centrado -->
      <div class="max-w-[80%] mx-auto">
        <!-- Grid de 3 columnas con líneas verticales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 text-center">
          <div class="flex flex-col items-center px-4 py-2">
            <h4 class="font-bold mb-3 text-senado-dark text-[.9vw]">Nuestras Redes Sociales:</h4>
            <div class="flex justify-center gap-3">
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <ClientOnly>
                  <Icon name="mdi:facebook" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">f</span>
                  </template>
                </ClientOnly>
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <ClientOnly>
                  <Icon name="ri:twitter-x-line" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">𝕏</span>
                  </template>
                </ClientOnly>
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <ClientOnly>
                  <Icon name="mdi:youtube" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">▶️</span>
                  </template>
                </ClientOnly>
              </a>
              <a href="#" class="text-senado-dark hover:text-senado-dark-light transition-colors">
                <ClientOnly>
                  <Icon name="mdi:instagram" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">📷</span>
                  </template>
                </ClientOnly>
              </a>
            </div>
          </div>

          <!-- Columna 2: Contacto (Con borde a ambos lados) -->
          <div class="flex flex-col items-center px-[.2vw] py-[1.vw] border-x border-gray-200">
            <div class="flex-shrink-0 mb-2">
              <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] w-[6vw] object-contain brightness-0 opacity-50" />
            </div>
            <p class="text-[.8vw] text-senado-dark">Calle Comercio esquina Colón</p>
            <p class="text-[.8vw] text-senado-dark">Telf.: (591) 2158701</p>
            <p class="text-[.8vw] text-senado-dark">La Paz - Bolivia</p>
          </div>

          <!-- Columna 3: Sitios de Interés (Sin borde derecho) -->
          <div class="flex flex-col items-center px-4 py-2">
            <h4 class="font-bold mb-3 text-senado-dark text-[.9vw]">Sitios de interés</h4>
            <ul class="text-[.8vw] space-y-1">
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
    </div>
  </footer>
</template>