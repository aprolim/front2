<template>
  <!-- 🔥 HEADER CON Z-INDEX ALTO (para que la cúpula lo tape parcialmente) -->
  <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    
    <!-- CONTENEDOR DEL 80% CENTRADO -->
    <div class="mx-auto w-[80%] max-w-[1400px] py-2">
      
      <!-- Fila superior -->
      <div class="flex items-center justify-between gap-4">
        <!-- Botón sandwich -->
        <button @click="toggleMenu" class="text-3xl text-senado-primary hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0">
          <Icon name="material-symbols:menu-rounded" class="text-3xl" v-if="!menuAbierto" />
          <Icon name="material-symbols:close-rounded" class="text-3xl" v-else />
        </button>

        <!-- Logo -->
        <div class="flex-shrink-0">
          <img src="/images/LogoDorado.svg" alt="Senado" class="h-12 w-auto" />
        </div>

        <!-- Título "Cámara de Senadores" -->
        <div class="hidden md:block flex-grow text-left">
          <h1 class="text-2xl font-bold text-senado-primary leading-tight">
            Cámara de<br />
            <span class="text-3xl">Senadores</span>
          </h1>
        </div>

        <!-- Buscador -->
        <div class="hidden lg:block flex-grow max-w-[18vw] z-[1000]">
          <div class="relative">
            <input
              type="text" 
              placeholder="ENCUENTRA TU SENADOR" 
              class="w-full px-4 py-2 border border-[#cdcdcd] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent h-[1.2vw]"
            />
            <!-- <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-senado-primary">
              <Icon name="material-symbols:search-rounded" class="text-xl" />
            </button> -->
          </div>
        </div>

        <!-- Espacio -->
        <div class="hidden lg:block flex-grow max-w-[8vw] z-[1000]">

        </div>

        <!-- ========================================== -->
        <!-- BOTÓN REDES SOCIALES DESPLEGABLE            -->
        <!-- ========================================== -->
        <!-- El contenedor tiene z-index alto para que el botón quede bien -->
        <div class="relative flex-shrink-0 z-[9999]">
          <button 
            @click="toggleRedes"
            class="flex items-center gap-1 text-gray-600 hover:text-senado-primary transition-colors font-medium text-sm px-3 py-1.5 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200 bg-senado-gold-light h-[1.2vw]"
          >
            <span>Redes Sociales</span>
            <Icon 
              :name="redesAbiertas ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'" 
              class="text-lg" 
            />
          </button>

          <!-- 🔥 MENÚ DESPLEGABLE CON Z-INDEX ALTÍSIMO (position: fixed) -->
          <!-- Esto asegura que esté por encima de la cúpula -->
          <div 
            v-if="redesAbiertas"
            class="fixed top-14 right-[5%] bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[180px] flex flex-col gap-2 z-[999999999]"
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
        </div>
        <!-- ========================================== -->

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
    <!-- MENÚ LATERAL CORREGIDO                       -->
    <!-- ========================================== -->
    <div
      v-if="menuAbierto"
      class="fixed inset-0 z-[9999999] bg-black bg-opacity-50 transition-opacity"
      @click.self="toggleMenu"
    >
      <!-- w-96 para que no se corte el texto, y max-w-[90vw] para móviles -->
      <div class="bg-white text-gray-800 w-96 max-w-[90vw] h-full overflow-y-auto shadow-2xl">
        <!-- Header del menú -->
        <div class="bg-senado-primary text-white p-4 flex justify-between items-center sticky top-0 z-10">
          <span class="font-bold text-lg">Menú</span>
          <button @click="toggleMenu" class="text-2xl hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors">
            ✕
          </button>
        </div>

        <nav class="p-4 space-y-6">
          <!-- Actividad Legislativa -->
          <div>
            <button 
              @click="toggleSubmenu('legislativa')" 
              class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors"
            >
              <span>▸ Actividad Legislativa</span>
              <span>{{ submenus.legislativa ? '▼' : '►' }}</span>
            </button>
            <div v-if="submenus.legislativa" class="ml-4 mt-2 space-y-2">
              <!-- Legislación -->
              <div>
                <button 
                  @click="toggleSubmenu('legislacion')" 
                  class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors"
                >
                  <span>Legislación</span>
                  <span>{{ submenus.legislacion ? '▼' : '►' }}</span>
                </button>
                <div v-if="submenus.legislacion" class="ml-4 space-y-1 text-sm text-gray-600">
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Resoluciones Camarales</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Declaraciones Camarales</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Minutas de Comunicación</a>
                </div>
              </div>

              <!-- Gestión -->
              <div>
                <button 
                  @click="toggleSubmenu('gestion')" 
                  class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors"
                >
                  <span>Gestión</span>
                  <span>{{ submenus.gestion ? '▼' : '►' }}</span>
                </button>
                <div v-if="submenus.gestion" class="ml-4 space-y-1 text-sm text-gray-600">
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
                <button 
                  @click="toggleSubmenu('fiscalizacion')" 
                  class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors"
                >
                  <span>Fiscalización</span>
                  <span>{{ submenus.fiscalizacion ? '▼' : '►' }}</span>
                </button>
                <div v-if="submenus.fiscalizacion" class="ml-4 space-y-1 text-sm text-gray-600">
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Escrito</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Peticiones de Informe Oral</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus senadores -->
          <div>
            <button 
              @click="toggleSubmenu('senadores')" 
              class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors"
            >
              <span>▸ Tus senadores</span>
              <span>{{ submenus.senadores ? '▼' : '►' }}</span>
            </button>
            <div v-if="submenus.senadores" class="ml-4 mt-2 space-y-1 text-sm text-gray-600">
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Directiva Camaral</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Senadoras y senadores</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Comisiones y Comités</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Brigadas y Bancadas</a>
            </div>
          </div>

          <!-- Acerca del Senado -->
          <div>
            <button 
              @click="toggleSubmenu('acerca')" 
              class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors"
            >
              <span>▸ Acerca del Senado</span>
              <span>{{ submenus.acerca ? '▼' : '►' }}</span>
            </button>
            <div v-if="submenus.acerca" class="ml-4 mt-2 space-y-2">
              <div>
                <button 
                  @click="toggleSubmenu('funciones')" 
                  class="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-senado-primary transition-colors"
                >
                  <span>Funciones del Senado</span>
                  <span>{{ submenus.funciones ? '▼' : '►' }}</span>
                </button>
                <div v-if="submenus.funciones" class="ml-4 space-y-1 text-sm text-gray-600">
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Atribuciones del Senado</a>
                  <a href="#" class="block hover:text-senado-primary transition-colors py-1">Mandato Constitucional</a>
                </div>
              </div>
              <a href="#" class="block text-gray-600 hover:text-senado-primary transition-colors py-1 font-semibold">Antecedentes históricos</a>
            </div>
          </div>

          <!-- Senado abierto -->
          <div>
            <button 
              @click="toggleSubmenu('abierto')" 
              class="flex items-center justify-between w-full text-left font-bold text-senado-primary hover:text-senado-primary-dark text-lg transition-colors"
            >
              <span>▸ Senado abierto</span>
              <span>{{ submenus.abierto ? '▼' : '►' }}</span>
            </button>
            <div v-if="submenus.abierto" class="ml-4 mt-2 space-y-1 text-sm text-gray-600">
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Noticias</a>
              <a href="#" class="block hover:text-senado-primary transition-colors py-1">Productos Digitales</a>
            </div>
          </div>

          <hr class="border-gray-200">

          <!-- Enlaces rápidos -->
          <div class="space-y-2 text-sm">
            <a href="/" class="block text-gray-600 hover:text-senado-primary transition-colors py-1">🏠 Inicio</a>
            <a href="/contacto" class="block text-gray-600 hover:text-senado-primary transition-colors py-1">📞 Contacto</a>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuAbierto: false,
      redesAbiertas: false, // 👈 Nuevo estado para el botón de redes
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
  methods: {
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto
      if (!this.menuAbierto) {
        Object.keys(this.submenus).forEach(key => {
          this.submenus[key] = false
        })
      }
    },
    toggleRedes() {
      this.redesAbiertas = !this.redesAbiertas
    },
    toggleSubmenu(key) {
      this.submenus[key] = !this.submenus[key]
    }
  }
}
</script>

<style scoped>
/* Estilos para el scroll del menú */
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
</style>