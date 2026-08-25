<template>
  <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="mx-auto w-[80%] py-[.5vw]">
      <div class="flex items-center justify-between gap-[1vw]">
        <!-- Botón sandwich -->
        <button 
          @click="toggleMenu"
          @mouseenter="handleMenuHoverEnter"
          @mouseleave="handleMenuHoverLeave"
          class="text-[2vw] text-senado-primary hover:bg-gray-100 p-[.5vw] rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
          ref="menuButton"
        >
          <ClientOnly>
            <Icon 
              name="material-symbols:menu-rounded" 
              class="text-[5vw]" 
              v-if="!menuAbierto" 
              style="font-variation-settings: 'wght' 900;"
            />
            <Icon 
              name="material-symbols:close-rounded" 
              class="text-[3vw]" 
              v-else 
            />
            <template #fallback>
              <span class="text-[3vw]">☰</span>
            </template>
          </ClientOnly>
        </button>

        <!-- Logo -->
        <div class="w-[1vw]"></div>
        <NuxtLink to="/" class="flex-shrink-0 spin-coin block">
          <img src="/images/LogoDorado.svg" alt="Senado" class="h-[7.5vw] w-auto" />
        </NuxtLink>

        <!-- Título -->
        <div class="hidden md:block flex-shrink-0 text-left">
          <h1 class="text-[2.5vw] font-bold text-senado-primary leading-tight font-montserrat-light" style="line-height: 0.9;">
            Cámara de<br />
            <span class="font-montserrat-bold">Senadores</span>
          </h1>
        </div>
        <div class="flex-shrink-0 w-[13vw]"></div>

        <!-- Redes Sociales -->
        <div 
          class="hidden lg:block flex-grow z-[1000] relative"
          @mouseenter="handleRedesHoverEnter"
          @mouseleave="handleRedesHoverLeave"
        >
          <div class="relative flex items-center">
            <!-- Botón Redes Sociales - Solo texto -->
            <button 
              ref="redesButton"
              class="text-gray-600 hover:text-senado-primary transition-colors font-medium text-[1.2vw]"
            >
              Redes Sociales
            </button>
            
            <!-- Menú de redes - Efecto vanish (aparición gradual) -->
            <transition
              enter-active-class="transition-all duration-[1900ms] ease-in"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-[1900ms] ease-out"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div 
                v-if="redesAbiertas"
                ref="redesMenu"
                class="absolute bg-white rounded-lg p-3 flex flex-row items-center gap-3 whitespace-nowrap "
                style="top: 50%; left: calc(35% + 8px); transform: translateY(-50%); right: auto; z-index: 9999999999;"
              >
                <a href="https://www.facebook.com/SenadoBolivia" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ClientOnly>
                    <Icon name="mdi:facebook" class="text-[2vw] text-blue-600" />
                    <template #fallback>
                      <span class="text-2xl">f</span>
                    </template>
                  </ClientOnly>
                </a>
                <a href="https://x.com/SenadoBolivia" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ClientOnly>
                    <Icon name="ri:twitter-x-line" class="text-[2vw] text-[#222222]" />
                    <template #fallback>
                      <span class="text-2xl">𝕏</span>
                    </template>
                  </ClientOnly>
                </a>
                <a href="https://www.youtube.com/@senadobolivia2026" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ClientOnly>
                    <Icon name="mdi:youtube" class="text-[2vw] text-red-600" />
                    <template #fallback>
                      <span class="text-2xl">▶️</span>
                    </template>
                  </ClientOnly>
                </a>
                <a href="https://www.instagram.com/camarasenadores" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ClientOnly>
                    <Icon name="mdi:instagram" class="text-[2vw] text-pink-600" />
                    <template #fallback>
                      <span class="text-2xl">📷</span>
                    </template>
                  </ClientOnly>
                </a>
                <a href="https://www.tiktok.com/@senadobolivia" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <ClientOnly>
                    <Icon name="ri:tiktok-line" class="text-[2vw] text-black" />
                    <template #fallback>
                      <span class="text-2xl">♪</span>
                    </template>
                  </ClientOnly>
                </a>
              </div>
            </transition>
          </div>
        </div>
        <div class="hidden lg:block flex-grow max-w-[2vw] z-[1000]"></div>
      </div>

      <!-- Mobile -->
      <div class="md:hidden flex flex-col items-center gap-2 mt-2">
        <h1 class="text-xl font-bold text-senado-primary leading-tight text-center">
          Cámara de<br />
          <span class="text-2xl">Senadores</span>
        </h1>
        <p class="text-xs text-gray-500 font-medium tracking-wider">
          ENCUENTRA TU SENADOR
        </p>
        <div class="w-full max-w-xs relative">
          <div class="relative">
            <input 
              ref="searchInputMobile"
              type="text" 
              placeholder="Buscar senador..." 
              class="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent"
              v-model="searchQuery"
              @input="handleSearch"
              @focus="handleFocus"
              @blur="handleBlur"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-senado-primary">
              <ClientOnly>
                <Icon name="material-symbols:search-rounded" class="text-xl" />
                <template #fallback>
                  <span class="text-xl">🔍</span>
                </template>
              </ClientOnly>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MENÚ LATERAL - Efecto Vanish              -->
    <!-- ========================================== -->
    <transition
      enter-active-class="transition-opacity duration-1000 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-700 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuAbierto"
        class="fixed inset-0 z-[99999999] bg-black/50"
        @click.self="toggleMenu"
        @mouseenter="handleOverlayHoverEnter"
        @mouseleave="handleOverlayHoverLeave"
      >
        <transition
          enter-active-class="transition-all duration-1000 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-700 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="menuAbierto"
            class="bg-white text-gray-800 w-96 max-w-[90vw] h-full overflow-y-auto shadow-2xl rounded-r-2xl ml-4"
            @mouseenter="handleMenuPanelHoverEnter"
            @mouseleave="handleMenuPanelHoverLeave"
          >
            <div class="bg-senado-primary text-white p-4 flex justify-between items-center sticky top-0 z-10">
              <span class="font-bold text-lg">Menú</span>
              <button @click="toggleMenu" class="text-2xl hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors">
                ✕
              </button>
            </div>
            <nav class="p-4 space-y-6">
              <!-- ========================================== -->
              <!-- INSTITUCIONAL                              -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('institucional')"
                @mouseleave="handleSubmenuHoverLeave('institucional')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('institucional')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Institucional</span>
                    <span class="transition-transform duration-300" :class="submenus.institucional ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 mt-2 space-y-0 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
                  :class="submenus.institucional ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/mision-vision-valores-principios" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Misión, Vision, Valores y Principios</NuxtLink>
                  <NuxtLink to="/antecedentes-historicos" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Reseña histórica</NuxtLink>
                  <NuxtLink to="/memoria-institucional" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Memoria Institucional - Redactor</NuxtLink>
                  
                  <!-- Funciones del Senado -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('funciones')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Funciones del Senado</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.funciones ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1.0vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                      :class="submenus.funciones ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/funciones-del-senado" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Atribuciones del Senado</NuxtLink>
                      <NuxtLink to="/mandato-constitucional" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Mandato Constitucional</NuxtLink>
                    </div>
                  </div>

                  <!-- Auditoría -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('auditoriaInstitucional')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Auditoría</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.auditoriaInstitucional ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600]"
                      :class="submenus.auditoriaInstitucional ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/auditoria/poa-uai" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">POA-UAI</NuxtLink>
                      <NuxtLink to="/auditoria/auditorias-ejecutadas" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Auditorías Ejecutadas</NuxtLink>
                      <NuxtLink to="/auditoria/informes-actividades" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Informes de Actividades</NuxtLink>
                      <NuxtLink to="/auditoria/otras-actividades" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Otras Actividades</NuxtLink>
                    </div>
                  </div>

                  <!-- Transparencia -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('transparenciaInstitucional')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Transparencia y Lucha contra la Corrupción</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.transparenciaInstitucional ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600]"
                      :class="submenus.transparenciaInstitucional ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/unidad-transparencia" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Unidad de Transparencia y Lucha contra la Corrupción</NuxtLink>
                      <a href="https://sitpreco.s2plus.transparencia.gob.bo/" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Gestión de Denuncia de Actos/Hechos de Corrupción</a>
                      <NuxtLink to="/solicitud-informacion" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Solicitud de Información</NuxtLink>
                      <a href="https://observatorio.gob.bo/#/" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Rendición Pública de Cuentas</a>
                    </div>
                  </div>
                  
                  <NuxtLink to="/marco-normativo" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Marco Normativo</NuxtLink>
                  <NuxtLink to="/galeria-de-imagenes" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Galeria de Imagenes</NuxtLink>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- TRÁMITES Y SERVICIOS                      -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('tramites')"
                @mouseleave="handleSubmenuHoverLeave('tramites')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('tramites')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Trámites y Servicios</span>
                    <span class="transition-transform duration-300" :class="submenus.tramites ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 mt-2 space-y-0 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
                  :class="submenus.tramites ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <a href="https://systemdemo.es/track-document" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Consulta tu trámite</a>
                  <NuxtLink to="https://systemdemo.es/auth/login-external" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Plataforma Digital</NuxtLink>
                  <NuxtLink to="/visita-senado" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Visita el Senado</NuxtLink>
                  <a href="https://www.youtube.com/watch?v=ARVGab48kkw&list=PLa1BPhXlaW2fX3iN-hn6O5nPBHrSYEL5Y" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Productos Digitales</a>
                  <NuxtLink to="/cursos-capacitacion" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Cursos y Capacitación</NuxtLink>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- COMUNICACIÓN                              -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('comunicacion')"
                @mouseleave="handleSubmenuHoverLeave('comunicacion')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('comunicacion')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Comunicación</span>
                    <span class="transition-transform duration-300" :class="submenus.comunicacion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 mt-2 space-y-0 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
                  :class="submenus.comunicacion ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/comunicados" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Comunicados</NuxtLink>
                  <NuxtLink to="/noticias" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Notas de Prensa</NuxtLink>
                  <NuxtLink to="https://www.youtube.com/watch?v=ARVGab48kkw&list=PLa1BPhXlaW2fX3iN-hn6O5nPBHrSYEL5Y" target="_blank" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Publicaciones</NuxtLink>
                  <NuxtLink to="/campanas-actividades" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Campañas y Actividades</NuxtLink>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- FACULTADES LEGISLATIVAS                    -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('legislativa')"
                @mouseleave="handleSubmenuHoverLeave('legislativa')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('legislativa')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Facultades Legislativas</span>
                    <span class="transition-transform duration-300" :class="submenus.legislativa ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                
                <div 
                  class="ml-4 mt-2 space-y-0 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
                  :class="submenus.legislativa ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <!-- Legislación -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('legislacion')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Legislación</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.legislacion ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                      :class="submenus.legislacion ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/proyectos-en-tratamiento" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Proyectos de Ley en Tratamiento</NuxtLink>
                      <NuxtLink to="/proyectos-aprobados" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Proyectos de Ley Aprobados</NuxtLink>
                      <NuxtLink to="/leyes-sancionadas" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Leyes Sancionadas</NuxtLink>
                      <NuxtLink to="/leyes-promulgadas" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Leyes Promulgadas</NuxtLink>
                      <NuxtLink to="/proyectos-modificaciones" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Proyectos de Ley con Modificaciones</NuxtLink>
                      <NuxtLink to="/proyectos-rechazados" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Proyectos de Ley Rechazados</NuxtLink>
                    </div>
                  </div>

                  <!-- Fiscalización -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('fiscalizacion')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Fiscalización</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.fiscalizacion ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                      :class="submenus.fiscalizacion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/peticiones-informe-escrito" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Peticiones de Informe Escrito</NuxtLink>
                      <NuxtLink to="/peticiones-informe-oral" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Peticiones de Informe Oral</NuxtLink>
                    </div>
                  </div>

                  <!-- Gestión -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <div 
                      @click="toggleSubmenu('gestion')"
                      class="cursor-pointer py-2 px-3 flex items-center justify-between"
                    >
                      <span class="font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">Gestión</span>
                      <span class="transition-transform duration-300 text-gray-500" :class="submenus.gestion ? 'rotate-180' : ''">▼</span>
                    </div>
                    <div 
                      class="ml-6 space-y-0 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                      :class="submenus.gestion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <NuxtLink to="/resoluciones-camarales" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Resoluciones Camarales</NuxtLink>
                      <NuxtLink to="/declaraciones-camarales" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Declaraciones Camarales</NuxtLink>
                      <NuxtLink to="/minutas-comunicacion" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Minutas de Comunicación</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- TUS SENADORES                              -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('senadores')"
                @mouseleave="handleSubmenuHoverLeave('senadores')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('senadores')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Tus senadores</span>
                    <span class="transition-transform duration-300" :class="submenus.senadores ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 mt-2 space-y-0 text-[1.1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600] rounded-lg overflow-hidden"
                  :class="submenus.senadores ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/quien-me-representa" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">¿Quién me representa?</NuxtLink>
                  <NuxtLink to="/directiva-camaral" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Directiva Camaral</NuxtLink>
                  <NuxtLink to="/comisiones-comites" class="block hover:text-senado-primary transition-colors py-2 px-3 even:bg-senado-gold-lightest odd:bg-white" @click="closeMenu">Comisiones y Comités</NuxtLink>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- RECURSOS HUMANOS                           -->
              <!-- ========================================== -->
              <div 
                @mouseenter="handleSubmenuHoverEnter('recursosHumanos')"
                @mouseleave="handleSubmenuHoverLeave('recursosHumanos')"
                class="menu-item-wrapper"
              >
                <div 
                  @click="toggleSubmenu('recursosHumanos')"
                  class="cursor-pointer menu-item"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                    <span>▸ Recursos Humanos</span>
                    <span class="transition-transform duration-300" :class="submenus.recursosHumanos ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 mt-2 space-y-0 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
                  :class="submenus.recursosHumanos ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <!-- Escala Salarial -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <NuxtLink 
                      to="/escala-salarial" 
                      class="block hover:text-senado-primary transition-colors py-2 px-3" 
                      @click="closeMenu"
                    >
                      Escala Salarial
                    </NuxtLink>
                  </div>
                  
                  <!-- POAI -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <NuxtLink 
                      to="/poai" 
                      class="block hover:text-senado-primary transition-colors py-2 px-3" 
                      @click="closeMenu"
                    >
                      Plan Operativo Anual Individual - POAI
                    </NuxtLink>
                  </div>

                  <!-- Contrataciones y Oportunidades de Empleo (un solo enlace) -->
                  <div class="even:bg-senado-gold-lightest odd:bg-white">
                    <NuxtLink 
                      to="/contrataciones-oportunidades" 
                      class="block hover:text-senado-primary transition-colors py-2 px-3" 
                      @click="closeMenu"
                    >
                      Contrataciones y Oportunidades de Empleo
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- ========================================== -->
              <!-- INICIO Y CONTACTO                          -->
              <!-- ========================================== -->
              <div class="space-y-3 mt-2">
                <NuxtLink 
                  to="/" 
                  class="flex items-center gap-3 bg-senado-gold-lightest text-senado-primary hover:bg-senado-gold hover:text-senado-primary-dark transition-all duration-300 py-3.5 px-4 rounded-lg font-[900] text-[1.4vw] shadow-sm hover:shadow-md"
                  @click="closeMenu"
                >
                  <span>Inicio</span>
                </NuxtLink>
                
                <NuxtLink 
                  to="/contacto" 
                  class="flex items-center gap-3 text-senado-primary hover:bg-senado-gold-soft hover:border-senado-gold transition-all duration-300 py-3 px-4 rounded-lg font-[800] text-[1.4vw]"
                  @click="closeMenu"
                >
                  <span>Contacto</span>
                </NuxtLink>
              </div>
            </nav>
          </div>
        </transition>
      </div>
    </transition>

    <!-- ========================================== -->
    <!-- RESULTADOS DE BÚSQUEDA - Solo para mobile -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-400 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="showResults && searchResults.length > 0 && isMobile"
          class="fixed bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-[99999999]"
          :style="searchResultsStyle"
        >
          <div class="max-h-[60vh] overflow-y-auto">
            <div 
              v-for="result in searchResults" 
              :key="result.id + (result.esSuplente ? '-suplente' : '')"
              class="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
              @mousedown.prevent="selectResult(result)"
            >
              <img 
                :src="result.foto || defaultAvatar" 
                :alt="result.name"
                class="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                @error="(e) => e.target.src = defaultAvatar"
              />
              <div class="flex-1 min-w-0">
                <div class="text-base font-semibold text-gray-800 truncate">{{ result.name }}</div>
                <div class="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
                  <span>{{ result.department || 'Sin departamento' }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></span>
                  <span 
                    class="px-2 py-0.5 rounded text-[11px] font-medium"
                    :style="{ backgroundColor: result.partyColor + '20', color: result.partyColor || '#666' }"
                  >
                    {{ result.partyShort || result.party || 'Sin partido' }}
                  </span>
                  <span v-if="result.esSuplente" class="text-[11px] text-orange-500 font-medium bg-orange-50 px-2 py-0.5 rounded flex-shrink-0">Suplente</span>
                </div>
              </div>
              <ClientOnly>
                <Icon name="material-symbols:chevron-right-rounded" class="text-gray-400 text-2xl flex-shrink-0" />
                <template #fallback>
                  <span class="text-gray-400 text-2xl">›</span>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Sin resultados - Solo para mobile -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-400 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="showResults && searchQuery && searchResults.length === 0 && isMobile"
          class="fixed bg-white rounded-lg shadow-xl border border-gray-200 p-6 text-center z-[99999999]"
          :style="searchResultsStyle"
        >
          <div class="text-5xl mb-3">🔍</div>
          <p class="text-base text-gray-600 font-medium">No se encontraron senadores</p>
          <p class="text-sm text-gray-400 mt-1">Intenta con otro término de búsqueda</p>
        </div>
      </transition>
    </Teleport>

  </header>
</template>

<script>
import { senadores } from '~/data/senadores'

export default {
  data() {
    return {
      menuAbierto: false,
      redesAbiertas: false,
      searchQuery: '',
      showResults: false,
      searchResults: [],
      defaultAvatar: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E',
      submenus: {
        institucional: false,
        tramites: false,
        comunicacion: false,
        legislativa: false,
        legislacion: false,
        fiscalizacion: false,
        gestion: false,
        senadores: false,
        funciones: false,
        administrativa: false,
        auditoriaInstitucional: false,
        transparenciaInstitucional: false,
        auditoriaAdministrativa: false,
        transparenciaAdministrativa: false,
        recursosHumanos: false
      },
      hoverOpenTimer: null,
      hoverCloseTimer: null,
      submenuHoverTimers: {},
      isDesktop: false,
      isMobile: false,
      isMenuHoverOpen: false,
      redesHoverTimer: null
    }
  },
  computed: {
    searchResultsStyle() {
      if (process.client) {
        const input = this.$refs.searchInputMobile
        if (input) {
          const rect = input.getBoundingClientRect()
          const isMobile = window.innerWidth < 768
          
          return {
            top: (rect.bottom + 4) + 'px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90vw',
            maxWidth: isMobile ? '90vw' : '40vw',
            minWidth: isMobile ? '280px' : '20vw',
            zIndex: 9999999999
          }
        }
      }
      return {
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90vw',
        maxWidth: '40vw',
        minWidth: '280px',
        zIndex: 9999999999
      }
    }
  },
  methods: {
    // Métodos para hover de redes sociales
    handleRedesHoverEnter() {
      if (!this.isDesktop) return
      if (this.redesHoverTimer) {
        clearTimeout(this.redesHoverTimer)
        this.redesHoverTimer = null
      }
      this.redesAbiertas = true
    },
    handleRedesHoverLeave() {
      if (!this.isDesktop) return
      this.redesHoverTimer = setTimeout(() => {
        this.redesAbiertas = false
        this.redesHoverTimer = null
      }, 300)
    },
    toggleMenu() {
      this.clearAllTimers()
      this.menuAbierto = !this.menuAbierto
      if (!this.menuAbierto) {
        Object.keys(this.submenus).forEach(key => {
          this.submenus[key] = false
        })
        this.isMenuHoverOpen = false
      }
    },
    closeMenu() {
      this.clearAllTimers()
      this.menuAbierto = false
      Object.keys(this.submenus).forEach(key => {
        this.submenus[key] = false
      })
      this.isMenuHoverOpen = false
    },
    toggleSubmenu(key) {
      this.clearSubmenuTimer(key)
      this.submenus[key] = !this.submenus[key]
    },
    clearAllTimers() {
      if (this.hoverOpenTimer) {
        clearTimeout(this.hoverOpenTimer)
        this.hoverOpenTimer = null
      }
      if (this.hoverCloseTimer) {
        clearTimeout(this.hoverCloseTimer)
        this.hoverCloseTimer = null
      }
      if (this.redesHoverTimer) {
        clearTimeout(this.redesHoverTimer)
        this.redesHoverTimer = null
      }
      Object.keys(this.submenuHoverTimers).forEach(key => {
        if (this.submenuHoverTimers[key]) {
          clearTimeout(this.submenuHoverTimers[key])
          delete this.submenuHoverTimers[key]
        }
      })
    },
    clearSubmenuTimer(key) {
      if (this.submenuHoverTimers[key]) {
        clearTimeout(this.submenuHoverTimers[key])
        delete this.submenuHoverTimers[key]
      }
    },
    handleMenuHoverEnter() {
      if (!this.isDesktop) return
      this.clearAllTimers()
      if (this.menuAbierto && !this.isMenuHoverOpen) return
      this.hoverOpenTimer = setTimeout(() => {
        this.menuAbierto = true
        this.isMenuHoverOpen = true
        this.hoverOpenTimer = null
      }, 700)
    },
    handleMenuHoverLeave() {
      if (!this.isDesktop) return
      if (this.hoverOpenTimer) {
        clearTimeout(this.hoverOpenTimer)
        this.hoverOpenTimer = null
        return
      }
      if (this.isMenuHoverOpen && this.menuAbierto) {
        this.hoverCloseTimer = setTimeout(() => {
          if (this.isMenuHoverOpen && this.menuAbierto) {
            this.menuAbierto = false
            this.isMenuHoverOpen = false
            Object.keys(this.submenus).forEach(key => {
              this.submenus[key] = false
            })
          }
          this.hoverCloseTimer = null
        }, 2000)
      }
    },
    handleOverlayHoverEnter() {
      if (!this.isDesktop) return
      if (this.hoverCloseTimer) {
        clearTimeout(this.hoverCloseTimer)
        this.hoverCloseTimer = null
      }
    },
    handleOverlayHoverLeave() {},
    handleMenuPanelHoverEnter() {
      if (!this.isDesktop) return
      if (this.hoverCloseTimer) {
        clearTimeout(this.hoverCloseTimer)
        this.hoverCloseTimer = null
      }
    },
    handleMenuPanelHoverLeave(e) {
      if (!this.isDesktop) return
      if (this.isMenuHoverOpen && this.menuAbierto) {
        const relatedTarget = e.relatedTarget
        const isOverlay = relatedTarget && relatedTarget.classList && 
                          relatedTarget.classList.contains('fixed')
        if (!isOverlay) {
          this.hoverCloseTimer = setTimeout(() => {
            if (this.isMenuHoverOpen && this.menuAbierto) {
              this.menuAbierto = false
              this.isMenuHoverOpen = false
              Object.keys(this.submenus).forEach(key => {
                this.submenus[key] = false
              })
            }
            this.hoverCloseTimer = null
          }, 2000)
        }
      }
    },
    handleSubmenuHoverEnter(key) {
      if (!this.isDesktop) return
      this.clearSubmenuTimer(key)
      if (this.submenus[key]) return
      this.submenuHoverTimers[key] = setTimeout(() => {
        this.submenus[key] = true
        delete this.submenuHoverTimers[key]
      }, 700)
    },
    handleSubmenuHoverLeave(key) {
      if (!this.isDesktop) return
      if (this.submenuHoverTimers[key]) {
        clearTimeout(this.submenuHoverTimers[key])
        delete this.submenuHoverTimers[key]
        return
      }
      if (this.submenus[key]) {
        this.submenuHoverTimers[key] = setTimeout(() => {
          this.submenus[key] = false
          delete this.submenuHoverTimers[key]
        }, 2000)
      }
    },
    checkDesktop() {
      if (process.client) {
        const wasDesktop = this.isDesktop
        this.isDesktop = window.innerWidth > 1024
        this.isMobile = window.innerWidth < 768
        if (!this.isDesktop && wasDesktop) {
          this.clearAllTimers()
          if (this.isMenuHoverOpen) {
            this.menuAbierto = false
            this.isMenuHoverOpen = false
            Object.keys(this.submenus).forEach(key => {
              this.submenus[key] = false
            })
          }
          this.redesAbiertas = false
        }
      }
    },
    generarSlug(nombre) {
      if (!nombre) return ''
      return nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    },
    normalizeText(text) {
      if (!text) return ''
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
    },
    levenshteinDistance(a, b) {
      if (a.length === 0) return b.length
      if (b.length === 0) return a.length
      const matrix = []
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i]
      }
      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j
      }
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b[i - 1] === a[j - 1]) {
            matrix[i][j] = matrix[i - 1][j - 1]
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            )
          }
        }
      }
      return matrix[b.length][a.length]
    },
    getSimilarity(text1, text2) {
      if (!text1 || !text2) return 0
      const maxLen = Math.max(text1.length, text2.length)
      if (maxLen === 0) return 1
      const distance = this.levenshteinDistance(text1, text2)
      return 1 - (distance / maxLen)
    },
    handleSearch() {
      const query = this.searchQuery.trim()
      if (!query) {
        this.searchResults = []
        this.showResults = false
        return
      }
      const queryNormalized = this.normalizeText(query)
      const searchTerms = queryNormalized.split(/\s+/).filter(term => term.length > 0)
      const allCandidates = []
      if (!senadores || senadores.length === 0) {
        this.searchResults = []
        this.showResults = true
        return
      }
      senadores.forEach(s => {
        allCandidates.push({
          ...s,
          esSuplente: false,
          tipo: 'titular',
          foto: s.foto || this.defaultAvatar,
          nameNormalized: this.normalizeText(s.name),
          departmentNormalized: this.normalizeText(s.department),
          partyNormalized: this.normalizeText(s.party),
          partyShortNormalized: this.normalizeText(s.partyShort)
        })
        if (s.suplente && s.suplente !== 'null' && s.suplente !== null && s.suplente.trim() !== '') {
          const suplenteNormalized = this.normalizeText(s.suplente)
          allCandidates.push({
            id: s.id,
            name: s.suplente,
            nameNormalized: suplenteNormalized,
            slug: s.slug,
            slugSuplente: this.generarSlug(s.suplente),
            department: s.department,
            departmentNormalized: this.normalizeText(s.department),
            party: s.party,
            partyNormalized: this.normalizeText(s.party),
            partyColor: s.partyColor,
            partyShort: s.partyShort,
            partyShortNormalized: this.normalizeText(s.partyShort),
            foto: s.fotoSuplente || this.defaultAvatar,
            esSuplente: true,
            tipo: 'suplente',
            titular: s.name,
            titularSlug: s.slug,
            titularNormalized: this.normalizeText(s.name)
          })
        }
      })
      const results = allCandidates.filter(candidate => {
        const textsToCheck = [
          { text: candidate.nameNormalized, weight: 1.0 },
          { text: candidate.departmentNormalized, weight: 0.6 },
          { text: candidate.partyNormalized, weight: 0.5 },
          { text: candidate.partyShortNormalized, weight: 0.5 },
          { text: candidate.titularNormalized, weight: 0.8 }
        ].filter(item => item.text && item.text.length > 0)
        let bestMatch = false
        for (const term of searchTerms) {
          for (const item of textsToCheck) {
            if (item.text.includes(term)) {
              bestMatch = true
              break
            }
            const similarity = this.getSimilarity(term, item.text)
            if (similarity > 0.65) {
              bestMatch = true
              break
            }
          }
          if (bestMatch) break
        }
        return bestMatch
      })
      const getRelevance = (candidate) => {
        let score = 0
        const name = candidate.nameNormalized || ''
        const queryLower = queryNormalized
        if (name === queryLower) score += 100
        const nameParts = name.split(' ')
        const lastName = nameParts[nameParts.length - 1] || ''
        if (lastName === queryLower) score += 80
        const firstName = nameParts[0] || ''
        if (firstName === queryLower) score += 70
        if (name.startsWith(queryLower)) score += 50
        if (name.includes(queryLower)) score += 30
        const similarity = this.getSimilarity(queryLower, name)
        if (similarity > 0.7) {
          score += Math.round(similarity * 40)
        }
        if ((candidate.departmentNormalized || '').includes(queryLower)) score += 20
        if ((candidate.partyNormalized || '').includes(queryLower)) score += 15
        if (candidate.tipo === 'titular') score += 10
        return score
      }
      results.sort((a, b) => {
        const scoreA = getRelevance(a)
        const scoreB = getRelevance(b)
        if (scoreA !== scoreB) return scoreB - scoreA
        return (a.nameNormalized || '').localeCompare(b.nameNormalized || '')
      })
      this.searchResults = results.slice(0, 10)
      this.lastSearchQuery = query
      this.showResults = true
    },
    handleFocus() {
      if (this.searchQuery.trim() && this.searchResults.length > 0) {
        this.showResults = true
        return
      }
      if (this.searchQuery.trim()) {
        this.handleSearch()
      }
    },
    handleBlur() {
      setTimeout(() => {
        this.showResults = false
      }, 200)
    },
    selectResult(result) {
      this.searchQuery = ''
      this.searchResults = []
      this.showResults = false
      if (result.esSuplente) {
        this.$router.push(`/senador/suplente/${result.slugSuplente}`)
      } else {
        this.$router.push(`/senador/${result.slug}`)
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.showResults = false
      }
    },
    handleResize() {
      this.checkDesktop()
    }
  },
  mounted() {
    console.log('✅ Header montado, senadores disponibles:', senadores ? senadores.length : 0)
    document.addEventListener('keydown', this.handleKeydown)
    this.checkDesktop()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('resize', this.handleResize)
    this.clearAllTimers()
  }
}
</script>

<style scoped>
.menu-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.menu-scroll::-webkit-scrollbar {
  width: 4px;
}
.menu-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
@keyframes spin-coin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
.spin-coin {
  animation: spin-coin 6s linear infinite;
  transform-style: preserve-3d;
  perspective: 1000px;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>