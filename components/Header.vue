<template>
  <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="mx-auto w-[80%] py-[1vw]">
      <div class="flex items-center justify-between gap-[1vw]">
        <!-- Botón sandwich -->
        <button 
          @click="toggleMenu"
          class="text-[2vw] text-senado-primary hover:bg-gray-100 p-[.5vw] rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
        >
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
        </button>

        <!-- Logo -->
        <div class="flex-shrink-0 spin-coin">
          <img src="/images/LogoDorado.svg" alt="Senado" class="h-[4vw] w-auto ml-[2vw] mr-[.5vw]" />
        </div>

        <!-- Título -->
        <div class="hidden md:block flex-grow text-left">
          <h1 class="text-[1.7vw] font-bold text-senado-primary leading-tight font-montserrat-light" style="line-height: 0.9;">
            Cámara de<br />
            <span class="font-montserrat-bold">Senadores</span>
          </h1>
        </div>

        <!-- Buscador -->
        <div class="hidden lg:block flex-grow z-[1000] ml-auto">
          <div class="relative text-right">
            <input
              type="text" 
              placeholder="ENCUENTRA TU SENADOR" 
              class="w-[12vw] px-[.5vw] py-2 border border-[#cdcdcd] rounded-full focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent h-[1.2vw] text-[0.75vw]"
            />
          </div>
        </div>

        <div class="hidden lg:block flex-grow max-w-[8vw] z-[1000]"></div>

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
          ENCONTRA TU GANCHO
        </p>
        <div class="w-full max-w-xs">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              class="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-senado-primary">
              <Icon name="material-symbols:search-rounded" class="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MENÚ LATERAL - VERSIÓN CLICK              -->
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
          <!-- FACULTADES LEGISLATIVAS                    -->
          <!-- ========================================== -->
          <div>
            <div 
              @click="toggleSubmenu('legislativa')"
              class="cursor-pointer"
            >
              <div class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
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
                  <div class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors">
                    <span>Legislación</span>
                    <span class="transition-transform duration-300" :class="submenus.legislacion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.legislacion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Resoluciones Camarales</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Declaraciones Camarales</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Minutas de Comunicación</a>
                </div>
              </div>

              <!-- Gestión -->
              <div>
                <div 
                  @click="toggleSubmenu('gestion')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors">
                    <span>Gestión</span>
                    <span class="transition-transform duration-300" :class="submenus.gestion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.gestion ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley en Tratamiento</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley Aprobados</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Leyes Sancionadas</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Leyes Promulgadas</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley con Modificaciones</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Proyectos de Ley Rechazados</a>
                </div>
              </div>

              <!-- Fiscalización -->
              <div>
                <div 
                  @click="toggleSubmenu('fiscalizacion')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors">
                    <span>Fiscalización</span>
                    <span class="transition-transform duration-300" :class="submenus.fiscalizacion ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.fiscalizacion ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Escrito</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Oral</a>
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
              <div class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Tus senadores</span>
                <span class="transition-transform duration-300" :class="submenus.senadores ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.senadores ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Quien me representa?</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Directiva Camaral</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Comisiones y Comités</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Brigadas y Bancadas</a>
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
              <div class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Acerca del Senado</span>
                <span class="transition-transform duration-300" :class="submenus.acerca ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.acerca ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <div>
                <div 
                  @click="toggleSubmenu('funciones')"
                  class="cursor-pointer"
                >
                  <div class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors">
                    <span>Funciones del Senado</span>
                    <span class="transition-transform duration-300" :class="submenus.funciones ? 'rotate-180' : ''">▼</span>
                  </div>
                </div>
                <div 
                  class="ml-4 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
                  :class="submenus.funciones ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'"
                >
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Atribuciones del Senado</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Mandato Constitucional</a>
                </div>
              </div>
              <a href="#" class="block text-gray-600 hover:text-senado-primary transition-colors py-1 font-semibold">Antecedentes históricos</a>
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
              <div class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors">
                <span>▸ Senado abierto</span>
                <span class="transition-transform duration-300" :class="submenus.abierto ? 'rotate-180' : ''">▼</span>
              </div>
            </div>
            <div 
              class="ml-4 mt-2 space-y-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
              :class="submenus.abierto ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'"
            >
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Noticias</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Productos Digitales</a>
            </div>
          </div>

          <hr class="border-gray-200">

          <div class="space-y-2 text-sm">
            <a href="/" class="block text-gray-600 hover:text-senado-primary transition-colors py-1">🏠 Inicio</a>
            <a href="/contacto" class="block text-gray-600 hover:text-senado-primary transition-colors py-1">📞 Contacto</a>
          </div>
        </nav>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MENÚ REDES SOCIALES                        -->
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
            <Icon name="mdi:facebook" class="text-2xl text-blue-600" />
            <span class="text-sm font-medium">Facebook</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Icon name="mdi:twitter" class="text-2xl text-sky-500" />
            <span class="text-sm font-medium">Twitter / X</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Icon name="mdi:youtube" class="text-2xl text-red-600" />
            <span class="text-sm font-medium">YouTube</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Icon name="mdi:instagram" class="text-2xl text-pink-600" />
            <span class="text-sm font-medium">Instagram</span>
          </a>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuAbierto: false,
      redesAbiertas: false,
      submenus: {
        legislativa: false,
        legislacion: false,
        gestion: false,
        fiscalizacion: false,
        senadores: false,
        acerca: false,
        funciones: false,
        abierto: false
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
    }
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