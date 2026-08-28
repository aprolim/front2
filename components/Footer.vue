<template>
  <footer class="bg-senado-gold-light text-senado-dark py-8 mt-10 border-t border-black">
    <div class="mx-auto w-[90%]">
      <!-- Contenedor al 80% máximo y centrado -->
      <div class="max-w-[80%] mx-auto">
        <!-- Grid de 3 columnas con líneas verticales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 text-center">
          <!-- Columna 1: Redes Sociales -->
          <div class="flex flex-col items-center px-4 py-2">
            <h4 class="font-bold mb-3 text-senado-dark text-[.9vw]">Nuestras Redes Sociales:</h4>
            <div class="flex justify-center gap-3">
              <!-- Facebook -->
              <a 
                href="https://www.facebook.com/SenadoBolivia" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="transition-colors hover:opacity-80"
                style="color: #1877F2;"
              >
                <ClientOnly>
                  <Icon name="mdi:facebook" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">f</span>
                  </template>
                </ClientOnly>
              </a>
              
              <!-- Twitter / X -->
              <a 
                href="https://x.com/SenadoBolivia" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="transition-colors hover:opacity-80"
                style="color: #000000;"
              >
                <ClientOnly>
                  <Icon name="ri:twitter-x-line" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">𝕏</span>
                  </template>
                </ClientOnly>
              </a>
              
              <!-- YouTube -->
              <a 
                href="https://www.youtube.com/@senadobolivia2026" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="transition-colors hover:opacity-80"
                style="color: #FF0000;"
              >
                <ClientOnly>
                  <Icon name="mdi:youtube" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">▶️</span>
                  </template>
                </ClientOnly>
              </a>
              
              <!-- Instagram -->
              <a 
                href="https://www.instagram.com/camarasenadores" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="transition-colors hover:opacity-80"
                style="color: #E4405F;"
              >
                <ClientOnly>
                  <Icon name="mdi:instagram" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">📷</span>
                  </template>
                </ClientOnly>
              </a>
              
              <!-- TikTok -->
              <a 
                href="https://www.tiktok.com/@senadobolivia" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="transition-colors hover:opacity-80"
                style="color: #000000;"
              >
                <ClientOnly>
                  <Icon name="ri:tiktok-line" class="text-[1.9vw]" />
                  <template #fallback>
                    <span class="text-[1.9vw]">♪</span>
                  </template>
                </ClientOnly>
              </a>
            </div>
          </div>

          <!-- Columna 2: Contacto -->
          <div class="flex flex-col items-center px-[.2vw] py-[1.vw] border-x border-gray-200">
            <div class="flex-shrink-0 mb-2">
              <img src="/images/LogoBordo.svg" alt="Senado" class="h-[6vw] w-[6vw] object-contain brightness-0 " />
            </div>
            <p class="text-[.8vw] text-senado-dark">Calle Comercio esquina Colón</p>
            <p class="text-[.8vw] text-senado-dark">Telf.: 22143400</p>
            <p class="text-[.8vw] text-senado-dark">La Paz - Bolivia</p>
          </div>

          <!-- Columna 3: Sitios de Interés -->
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