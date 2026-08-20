<template>
  <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="mx-auto w-[80%] py-[.5vw]">
      <div class="flex items-center justify-between gap-[1vw]">
        <!-- Botón sandwich -->
        <button 
          @click="toggleMenu"
          class="text-[2vw] text-senado-primary hover:bg-gray-100 p-[.5vw] rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
        >
          <ClientOnly>
            <Icon 
              name="material-symbols:menu-rounded" 
              class="text-[3vw]" 
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
        <div class="hidden md:block flex-grow text-left">
          <h1 class="text-[1.7vw] font-bold text-senado-primary leading-tight font-montserrat-light" style="line-height: 0.9;">
            Cámara de<br />
            <span class="font-montserrat-bold">Senadores</span>
          </h1>
        </div>

        <!-- Buscador -->
        <div class="hidden lg:block flex-grow z-[1000] ml-auto relative">
          <div class="relative text-right">
            <input
              ref="searchInput"
              type="text" 
              placeholder="ENCUENTRA TU SENADOR" 
              class="w-[16vw] mr-[3.5vw] py-2 pl-[1vw] border border-[#cdcdcd] rounded-full focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent h-[1.2vw] text-[0.75vw]"
              v-model="searchQuery"
              @input="handleSearch"
              @focus="handleFocus"
              @blur="handleBlur"
            />
          </div>
        </div>

        <div class="hidden lg:block flex-grow max-w-[4vw] z-[1000]"></div>

        <!-- Redes Sociales -->
        <div class="relative flex-shrink-0 z-[9999]">
          <button 
            ref="redesButton"
            @click="toggleRedes"
            class="flex items-center gap-[.5vw] text-gray-600 hover:text-senado-primary transition-colors font-medium text-[1.0vw] px-[.5vw] py-1.5 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 bg-senado-gold-light h-[1.2vw]"
          >
            <span>Redes Sociales</span>
            <span class="transition-transform duration-300" :class="redesAbiertas ? 'rotate-180' : ''">▼</span>
          </button>
        </div>
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
    <!-- MENÚ LATERAL                              -->
    <!-- ========================================== -->
    <div
      v-if="menuAbierto"
      class="fixed inset-0 z-[99999999] transition-opacity duration-300 bg-black bg-opacity-50"
      @click.self="toggleMenu"
    >
      <div 
        class="bg-white text-gray-800 w-96 max-w-[90vw] h-full overflow-y-auto shadow-2xl transition-transform duration-300 ease-out"
        :class="menuAbierto ? 'translate-x-0' : '-translate-x-full'"
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
          <div>
            <div 
              @click="toggleSubmenu('institucional')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Institucional</span>
                <span class="transition-transform duration-300" :class="submenus.institucional ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-1 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.institucional ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <NuxtLink to="/mision" class="block hover:text-senado-primary transition-colors py-1">Misión</NuxtLink>
              <NuxtLink to="/vision" class="block hover:text-senado-primary transition-colors py-1">Visión</NuxtLink>
              <NuxtLink to="/marco-normativo" class="block hover:text-senado-primary transition-colors py-1">Marco Normativo</NuxtLink>
              <NuxtLink to="/galeria-de-imagenes" class="block hover:text-senado-primary transition-colors py-1">Galeria de Imagenes</NuxtLink>
              <NuxtLink to="/memoria-institucional" class="block hover:text-senado-primary transition-colors py-1">Memoria Institucional - Redactor</NuxtLink>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- FACULTADES LEGISLATIVAS                    -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('legislativa')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Facultades Legislativas</span>
                <span class="transition-transform duration-300" :class="submenus.legislativa ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            
            <div 
              class="ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.legislativa ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <!-- Legislación -->
              <div>
                <div 
                  @click="toggleSubmenu('legislacion')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">
                    <span>Legislación</span>
                    <span class="transition-transform duration-300" :class="submenus.legislacion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.legislacion ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/proyectos-en-tratamiento" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley en Tratamiento</NuxtLink>
                  <NuxtLink to="/proyectos-aprobados" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley Aprobados</NuxtLink>
                  <NuxtLink to="/leyes-sancionadas" class="block hover:text-senado-primary transition-colors py-1">Leyes Sancionadas</NuxtLink>
                  <NuxtLink to="/leyes-promulgadas" class="block hover:text-senado-primary transition-colors py-1">Leyes Promulgadas</NuxtLink>
                  <NuxtLink to="/proyectos-modificaciones" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley con Modificaciones</NuxtLink>
                  <NuxtLink to="/proyectos-rechazados" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley Rechazados</NuxtLink>
                </div>
              </div>

              <!-- Fiscalización -->
              <div>
                <div 
                  @click="toggleSubmenu('fiscalizacion')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">
                    <span>Fiscalización</span>
                    <span class="transition-transform duration-300" :class="submenus.fiscalizacion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.fiscalizacion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/peticiones-informe-escrito" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Escrito</NuxtLink>
                  <NuxtLink to="/peticiones-informe-oral" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Oral</NuxtLink>
                </div>
              </div>

              <!-- Gestión -->
              <div>
                <div 
                  @click="toggleSubmenu('gestion')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">
                    <span>Gestión</span>
                    <span class="transition-transform duration-300" :class="submenus.gestion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.gestion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/resoluciones-camarales" class="block hover:text-senado-primary transition-colors py-1">Resoluciones Camarales</NuxtLink>
                  <NuxtLink to="/declaraciones-camarales" class="block hover:text-senado-primary transition-colors py-1">Declaraciones Camarales</NuxtLink>
                  <NuxtLink to="/minutas-comunicacion" class="block hover:text-senado-primary transition-colors py-1">Minutas de Comunicación</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- TUS SENADORES                              -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('senadores')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Tus senadores</span>
                <span class="transition-transform duration-300" :class="submenus.senadores ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-1 text-[1.1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600]"
              :class="submenus.senadores ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <NuxtLink to="/quien-me-representa" class="block hover:text-senado-primary transition-colors py-1">¿Quién me representa?</NuxtLink>
              <NuxtLink to="/directiva-camaral" class="block hover:text-senado-primary transition-colors py-1">Directiva Camaral</NuxtLink>
              <NuxtLink to="/comisiones-comites" class="block hover:text-senado-primary transition-colors py-1">Comisiones y Comités</NuxtLink>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- ACERCA DEL SENADO                          -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('acerca')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Acerca del Senado</span>
                <span class="transition-transform duration-300" :class="submenus.acerca ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out text-[1.1vw]"
              :class="submenus.acerca ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <div>
                <div 
                  @click="toggleSubmenu('funciones')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors">
                    <span>Funciones del Senado</span>
                    <span class="transition-transform duration-300" :class="submenus.funciones ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1.0vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.funciones ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/funciones-del-senado" class="block hover:text-senado-primary transition-colors py-1">Atribuciones del Senado</NuxtLink>
                  <NuxtLink to="/mandato-constitucional" class="block hover:text-senado-primary transition-colors py-1">Mandato Constitucional</NuxtLink>
                </div>
              </div>
              <NuxtLink to="/antecedentes-historicos" class="block text-gray-600 hover:text-senado-primary transition-colors py-1 font-[600]">Antecedentes históricos</NuxtLink>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- SENADO ABIERTO                             -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('abierto')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Senado abierto</span>
                <span class="transition-transform duration-300" :class="submenus.abierto ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-1 text-[1.1vw] font-[600] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.abierto ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <NuxtLink to="/noticias" class="block hover:text-senado-primary transition-colors py-1">Noticias</NuxtLink>
              <NuxtLink to="https://www.youtube.com/watch?v=ARVGab48kkw&list=PLa1BPhXlaW2fX3iN-hn6O5nPBHrSYEL5Y" target="_blank" class="block hover:text-senado-primary transition-colors py-1">Productos Digitales</NuxtLink>
              <NuxtLink to="https://systemdemo.es/track-document" class="block hover:text-senado-primary transition-colors py-1">Consulta tus trámites</NuxtLink>
              <NuxtLink to="/visita-senado" class="block hover:text-senado-primary transition-colors py-1">Visita el Senado</NuxtLink>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- ÁREA ADMINISTRATIVA                        -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('administrativa')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-[600] text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Área Administrativa</span>
                <span class="transition-transform duration-300" :class="submenus.administrativa ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.administrativa ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <!-- Auditoría -->
              <div>
                <div 
                  @click="toggleSubmenu('auditoria')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">
                    <span>Auditoría</span>
                    <span class="transition-transform duration-300" :class="submenus.auditoria ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600]"
                  :class="submenus.auditoria ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/auditoria/poa-uai" class="block hover:text-senado-primary transition-colors py-1">POA-UAI</NuxtLink>
                  <NuxtLink to="/auditoria/auditorias-ejecutadas" class="block hover:text-senado-primary transition-colors py-1">Auditorías Ejecutadas</NuxtLink>
                  <NuxtLink to="/auditoria/informes-actividades" class="block hover:text-senado-primary transition-colors py-1">Informes de Actividades</NuxtLink>
                  <NuxtLink to="/auditoria/otras-actividades" class="block hover:text-senado-primary transition-colors py-1">Otras Actividades</NuxtLink>
                </div>
              </div>

              <!-- Transparencia y Lucha contra la Corrupción -->
              <div>
                <div 
                  @click="toggleSubmenu('transparencia')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-[600] text-gray-700 hover:text-senado-primary transition-colors text-[1.1vw]">
                    <span>Transparencia y Lucha contra la Corrupción</span>
                    <span class="transition-transform duration-300" :class="submenus.transparencia ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-[1vw] text-gray-600 overflow-hidden transition-all duration-300 ease-in-out font-[600]"
                  :class="submenus.transparencia ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <NuxtLink to="/unidad-transparencia" class="block hover:text-senado-primary transition-colors py-1">Unidad de Transparencia y Lucha contra la Corrupción</NuxtLink>
                  <NuxtLink to="https://sitpreco.s2plus.transparencia.gob.bo/" target="_blank" class="block hover:text-senado-primary transition-colors py-1">Gestión de Denuncia de Actos/Hechos de Corrupción</NuxtLink>
                  <NuxtLink to="/solicitud-informacion" class="block hover:text-senado-primary transition-colors py-1">Solicitud de Información</NuxtLink>
                  <NuxtLink to="https://observatorio.gob.bo/#/" target="_blank" class="block hover:text-senado-primary transition-colors py-1">Rendición Pública de Cuentas</NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <hr class="border-gray-200">

          <!-- ========================================== -->
          <!-- INICIO Y CONTACTO (CON COLORES DE LA PALETA) -->
          <!-- ========================================== -->
          <div class="space-y-3 mt-2">
            <!-- 🔥 INICIO CON DORADO -->
            <NuxtLink 
              to="/" 
              class="flex items-center gap-3 bg-senado-gold-lightest text-senado-primary hover:bg-senado-gold hover:text-senado-primary-dark transition-all duration-300 py-3.5 px-4 rounded-lg font-[900] text-[1.4vw] shadow-sm hover:shadow-md"
            >
              <span>Inicio</span>
            </NuxtLink>
            
            <!-- 🔥 CONTACTO CON BORDE DORADO -->
            <NuxtLink 
              to="/contacto" 
              class="flex items-center gap-3 text-senado-primary hover:bg-senado-gold-soft hover:border-senado-gold transition-all duration-300 py-3 px-4 rounded-lg font-[800] text-[1.4vw]"
            >
              <span>Contacto</span>
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MENÚ REDES SOCIALES (con Teleport)        -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
      >
        <div 
          v-if="redesAbiertas"
          ref="redesMenu"
          class="fixed bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[180px] flex flex-col gap-2"
          :style="menuStyle"
        >
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <ClientOnly>
              <Icon name="mdi:facebook" class="text-2xl text-blue-600" />
              <template #fallback>
                <span class="text-2xl">f</span>
              </template>
            </ClientOnly>
            <span class="text-sm font-medium">Facebook</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <ClientOnly>
              <Icon name="mdi:twitter" class="text-2xl text-sky-500" />
              <template #fallback>
                <span class="text-2xl">𝕏</span>
              </template>
            </ClientOnly>
            <span class="text-sm font-medium">Twitter / X</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <ClientOnly>
              <Icon name="mdi:youtube" class="text-2xl text-red-600" />
              <template #fallback>
                <span class="text-2xl">▶️</span>
              </template>
            </ClientOnly>
            <span class="text-sm font-medium">YouTube</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <ClientOnly>
              <Icon name="mdi:instagram" class="text-2xl text-pink-600" />
              <template #fallback>
                <span class="text-2xl">📷</span>
              </template>
            </ClientOnly>
            <span class="text-sm font-medium">Instagram</span>
          </a>
        </div>
      </transition>
    </Teleport>

    <!-- ========================================== -->
    <!-- RESULTADOS DE BÚSQUEDA (con Teleport)      -->
    <!-- ========================================== -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
      >
        <div 
          v-if="showResults && searchResults.length > 0"
          class="fixed bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-[99999999]"
          :style="searchResultsStyle"
        >
          <div class="max-h-[50vh] overflow-y-auto">
            <div 
              v-for="result in searchResults" 
              :key="result.id + (result.esSuplente ? '-suplente' : '')"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
              @mousedown.prevent="selectResult(result)"
            >
              <img 
                :src="result.foto || defaultAvatar" 
                :alt="result.name"
                class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                @error="(e) => e.target.src = defaultAvatar"
              />
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-gray-800 truncate">{{ result.name }}</div>
                <div class="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
                  <span>{{ result.department || 'Sin departamento' }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></span>
                  <span 
                    class="px-2 py-0.5 rounded text-[10px] font-medium"
                    :style="{ backgroundColor: result.partyColor + '20', color: result.partyColor || '#666' }"
                  >
                    {{ result.partyShort || result.party || 'Sin partido' }}
                  </span>
                  <span v-if="result.esSuplente" class="text-[10px] text-orange-500 font-medium bg-orange-50 px-2 py-0.5 rounded flex-shrink-0">Suplente</span>
                </div>
              </div>
              <ClientOnly>
                <Icon name="material-symbols:chevron-right-rounded" class="text-gray-400 text-xl flex-shrink-0" />
                <template #fallback>
                  <span class="text-gray-400 text-xl">›</span>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Sin resultados con Teleport -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
      >
        <div 
          v-if="showResults && searchQuery && searchResults.length === 0"
          class="fixed bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center z-[99999999]"
          :style="searchResultsStyle"
        >
          <div class="text-4xl mb-2">🔍</div>
          <p class="text-sm text-gray-600 font-medium">No se encontraron senadores</p>
          <p class="text-xs text-gray-400 mt-1">Intenta con otro término de búsqueda</p>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script>
// Importar los senadores
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
        legislativa: false,
        legislacion: false,
        fiscalizacion: false,
        gestion: false,
        senadores: false,
        acerca: false,
        funciones: false,
        abierto: false,
        administrativa: false,
        auditoria: false,
        transparencia: false
      }
    }
  },
  computed: {
    menuStyle() {
      if (process.client) {
        const button = this.$refs.redesButton
        if (button) {
          const rect = button.getBoundingClientRect()
          return {
            top: (rect.bottom + 8) + 'px',
            left: (rect.left - 10) + 'px',
            zIndex: 9999999999
          }
        }
      }
      return {
        top: '50px',
        right: '20px',
        zIndex: 9999999999
      }
    },
    searchResultsStyle() {
      if (process.client) {
        const input = this.$refs.searchInput
        if (input) {
          const rect = input.getBoundingClientRect()
          const isMobile = window.innerWidth < 768
          
          const marginRightVw = 3.5
          const marginRightPx = (window.innerWidth * marginRightVw) / 100
          
          return {
            top: (rect.bottom + 4) + 'px',
            right: (window.innerWidth - rect.right - marginRightPx) + 'px',
            left: 'auto',
            transform: 'none',
            width: (rect.width) + 'px',
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
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto
      if (!this.menuAbierto) {
        Object.keys(this.submenus).forEach(key => {
          this.submenus[key] = false
        })
      }
    },
    toggleSubmenu(key) {
      this.submenus[key] = !this.submenus[key]
    },
    toggleRedes() {
      this.redesAbiertas = !this.redesAbiertas
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
    }
  },
  mounted() {
    console.log('✅ Header montado, senadores disponibles:', senadores ? senadores.length : 0)
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
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

.max-h-\[50vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[50vh\]::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

.max-h-\[50vh\]::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>