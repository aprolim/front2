<!-- pages/campanas.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Contenedor -->
    <div class="container mx-auto px-4" style="max-width: 75vw; padding: 3vw 0;">
      
      <!-- ========================================== -->
      <!-- ENCABEZADO                                -->
      <!-- ========================================== -->
      <div class="text-center mb-10">
        <div class="inline-block bg-gradient-to-r from-senado-gold-light to-senado-gold px-6 py-1.5 rounded-full mb-3">
          <span class="text-[0.8vw] font-bold text-senado-primary uppercase tracking-wider flex items-center gap-2">
            <Icon name="mdi:bullhorn" class="text-[1.2vw] hidden sm:inline-block" />
            Campañas Institucionales
          </span>
        </div>
        <h1 class="text-[4.5vw] font-bold text-senado-primary mb-2 tracking-tight">
          Campañas y Programas
        </h1>
        <p class="text-gray-600 text-[1.2vw] max-w-3xl mx-auto leading-relaxed">
          Conoce las campañas y programas impulsados por la Cámara de Senadores
        </p>
        <div class="w-[8vw] h-[0.25vw] bg-gradient-to-r from-transparent via-senado-gold to-transparent mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- ========================================== -->
      <!-- BUSCADOR Y FILTROS                        -->
      <!-- ========================================== -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="relative flex-1 w-full">
            <Icon name="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.4vw]" />
            <input 
              v-model="busqueda"
              type="text" 
              placeholder="Buscar campaña..."
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-[0.9vw] focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent transition bg-gray-50/50"
            />
          </div>
          
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="estado in ['Todas', 'Activa', 'Próximamente', 'Finalizada']"
              :key="estado"
              @click="filtro = estado"
              class="px-5 py-2 rounded-full text-[0.8vw] font-semibold transition-all duration-300"
              :class="filtro === estado 
                ? 'bg-senado-primary text-white shadow-lg shadow-senado-primary/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ estado }}
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-5 mt-3 text-[0.75vw] text-gray-500 border-t border-gray-100 pt-3">
          <span class="flex items-center gap-2">
            <span class="bg-senado-primary text-white text-[0.65vw] font-bold px-3 py-0.5 rounded-full">{{ campanas.length }}</span>
            campañas disponibles
          </span>
          <span class="w-px h-5 bg-gray-200"></span>
          <span>Mostrando {{ inicio }} - {{ fin }} de {{ filtrados.length }}</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- GRID DE CAMPAÑAS                          -->
      <!-- ========================================== -->
      <div v-if="paginados.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="campana in paginados" 
          :key="campana.id"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
          :class="{ 
            'ring-2 ring-senado-gold ring-offset-2 shadow-xl': campana.destacado,
            'opacity-60 grayscale-[0.2]': campana.estado === 'Finalizada'
          }"
        >
          <!-- Badge destacado -->
          <div v-if="campana.destacado" class="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[0.7vw] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Icon name="mdi:star" class="text-[1vw]" />
            DESTACADO
          </div>

          <!-- Imagen -->
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-200 cursor-pointer flex-shrink-0" @click="abrirImagen(campana.imagen, campana.titulo)">
            <img 
              :src="campana.imagen" 
              :alt="campana.titulo"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              @error="(e) => e.target.src = '/images/campana-default.jpg'"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <!-- Info sobre imagen -->
            <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 class="text-[1.4vw] font-bold leading-tight mb-2 drop-shadow-lg line-clamp-2">
                {{ campana.titulo }}
              </h3>
              
              <div class="flex items-center gap-2 text-[0.85vw] text-white/90 drop-shadow-lg">
                <Icon name="mdi:calendar-range" class="text-[0.9vw]" />
                <span>{{ campana.periodo }}</span>
              </div>
            </div>

            <!-- Badge de estado -->
            <div class="absolute top-4 right-4 z-10">
              <span 
                class="text-[0.9vw] font-bold px-5 py-2 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-2"
                :class="{
                  'bg-green-500/95 text-white': campana.estado === 'Activa',
                  'bg-blue-500/95 text-white': campana.estado === 'Próximamente',
                  'bg-gray-600/95 text-white': campana.estado === 'Finalizada'
                }"
              >
                <span v-if="campana.estado === 'Activa'" class="inline-block w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                <Icon v-else-if="campana.estado === 'Próximamente'" name="mdi:clock-outline" class="text-[1.1vw]" />
                <Icon v-else name="mdi:check" class="text-[1.1vw]" />
                {{ campana.estado }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="mdi:calendar" class="text-[0.8vw] text-gray-400" />
                <span class="text-[0.6vw] text-gray-400">{{ campana.periodo }}</span>
              </div>
              <button 
                @click="verDetalle(campana)"
                class="text-[0.7vw] font-semibold text-senado-primary hover:text-senado-primary-dark flex items-center gap-2 group-hover:gap-3 transition-all duration-300 bg-senado-gold-lightest px-4 py-1.5 rounded-full hover:bg-senado-gold"
              >
                Ver más
                <Icon name="mdi:arrow-right" class="text-[0.8vw]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- PAGINACIÓN                                -->
      <!-- ========================================== -->
      <div v-if="totalPaginas > 1" class="flex flex-wrap items-center justify-center gap-2 mt-8">
        <button 
          @click="pagina--" 
          :disabled="pagina === 1"
          class="px-5 py-2.5 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          :class="pagina === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-senado-primary hover:text-white'"
        >
          <Icon name="mdi:chevron-left" class="text-[1vw]" /> Anterior
        </button>

        <button 
          v-for="p in totalPaginas" 
          :key="p"
          @click="pagina = p"
          class="w-10 h-10 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold"
          :class="p === pagina 
            ? 'bg-senado-primary text-white shadow-md shadow-senado-primary/30' 
            : 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50'"
        >
          {{ p }}
        </button>

        <button 
          @click="pagina++" 
          :disabled="pagina === totalPaginas"
          class="px-5 py-2.5 rounded-xl transition-all duration-300 text-[0.8vw] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          :class="pagina === totalPaginas ? 'bg-gray-100 text-gray-400' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-senado-primary hover:text-white'"
        >
          Siguiente <Icon name="mdi:chevron-right" class="text-[1vw]" />
        </button>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="filtrados.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
        <Icon name="mdi:file-search" class="text-[4vw] text-gray-300" />
        <h3 class="text-[2.5vw] font-bold text-gray-700 mb-2">No se encontraron campañas</h3>
        <p class="text-[1.1vw] text-gray-500">Intenta con otros términos de búsqueda</p>
        <button @click="busqueda = ''; filtro = 'Todas'" class="mt-5 text-senado-primary hover:underline text-[1vw] font-semibold">
          Limpiar búsqueda
        </button>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL DE IMAGEN - ZOOM Y ARRASTRE         -->
    <!-- ========================================== -->
    <Teleport to="body">
      <div 
        v-if="imagenModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
        @click.self="cerrarImagen"
      >
        <div 
          class="relative flex flex-col items-center justify-center select-none bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
          style="width: 65vw; height: 92vh;"
          @click.self="cerrarImagen"
        >
          <button @click="cerrarImagen" class="absolute top-2 right-2 z-20 text-white/70 hover:text-white transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2.5">
            <Icon name="mdi:close" class="text-[1.8vw]" />
          </button>

          <div class="absolute top-2 left-2 z-20 text-white/80 text-[1vw] font-medium max-w-[60vw] truncate bg-black/50 px-3 py-1.5 rounded-lg">
            {{ imagenTitulo }}
          </div>

          <div 
            class="w-full h-full flex items-center justify-center overflow-hidden"
            @mousedown="iniciarArrastre"
            @mousemove="moverArrastre"
            @mouseup="terminarArrastre"
            @mouseleave="terminarArrastre"
            @wheel.prevent="manejarZoom"
            :class="{ 'cursor-grab': zoom > 1, 'cursor-grabbing': isDragging }"
          >
            <img 
              :src="imagenSrc" 
              :alt="imagenTitulo"
              class="object-contain"
              :style="{
                maxWidth: '80vw',
                maxHeight: '80vh',
                transform: `scale(${zoom}) translate(${posX}px, ${posY}px)`,
                cursor: zoom > 1 ? 'grab' : 'default'
              }"
              draggable="false"
              @error="(e) => e.target.src = '/images/campana-default.jpg'"
            />
          </div>

          <div class="absolute bottom-[1.2vw] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
            <button @click="zoomOut" class="text-white hover:text-senado-gold transition-colors p-1.5 rounded-full hover:bg-white/10">
              <Icon name="mdi:minus" class="text-[1.2vw]" />
            </button>
            <span class="text-white text-[0.7vw] font-mono min-w-[3.5vw] text-center">{{ Math.round(zoom * 100) }}%</span>
            <button @click="zoomIn" class="text-white hover:text-senado-gold transition-colors p-1.5 rounded-full hover:bg-white/10">
              <Icon name="mdi:plus" class="text-[1.2vw]" />
            </button>
            <div class="w-px h-4 bg-white/20"></div>
            <button @click="resetZoom" class="text-white/70 hover:text-white transition-colors text-[0.6vw] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20">
              Reset
            </button>
            <div class="w-px h-4 bg-white/20"></div>
            <button @click="cerrarImagen" class="text-white/70 hover:text-white transition-colors text-[0.6vw] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 flex items-center gap-1">
              <Icon name="mdi:close" class="text-[0.8vw]" />
              Cerrar
            </button>
          </div>

          <div v-if="zoom > 1" class="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/15 text-[0.5vw] pointer-events-none flex items-center gap-1.5 bg-black/30 px-2.5 py-0.5 rounded-full">
            <Icon name="mdi:cursor-move" class="text-[0.6vw]" />
            Arrastra para mover
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================== -->
    <!-- MODAL DE DETALLE - SIMPLE                 -->
    <!-- ========================================== -->
    <Teleport to="body">
      <div 
        v-if="modal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        @click.self="modal = false"
      >
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          
          <!-- Header -->
          <div class="flex-shrink-0 bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Icon name="mdi:bullhorn" class="text-[1.8vw]" />
                <h2 class="text-[1.8vw] font-bold">{{ campanaActual?.titulo }}</h2>
              </div>
              <button @click="modal = false" class="hover:bg-white/20 rounded-lg p-2 transition-colors">
                <Icon name="mdi:close" class="text-[1.8vw]" />
              </button>
            </div>
          </div>
          
          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 space-y-5">
            
            <!-- Descripción -->
            <div>
              <h3 class="text-[1.2vw] font-bold text-senado-primary mb-3 flex items-center gap-2">
                <Icon name="mdi:information-outline" class="text-[1.4vw]" />
                Descripción
              </h3>
              <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p class="text-[0.95vw] text-gray-700 leading-relaxed text-justify">
                  {{ campanaActual?.descripcion }}
                </p>
              </div>
            </div>

            <!-- Información -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:calendar" class="text-[0.9vw]" /> Período
                </div>
                <p class="text-[0.95vw] font-semibold text-gray-800">{{ campanaActual?.periodo }}</p>
              </div>
              
              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div class="flex items-center gap-2 text-[0.7vw] text-gray-500 mb-1">
                  <Icon name="mdi:information" class="text-[0.9vw]" /> Estado
                </div>
                <span class="px-3 py-1 rounded-full text-[0.8vw] font-semibold inline-block"
                  :class="{
                    'bg-green-500/20 text-green-700': campanaActual?.estado === 'Activa',
                    'bg-blue-500/20 text-blue-700': campanaActual?.estado === 'Próximamente',
                    'bg-gray-500/20 text-gray-700': campanaActual?.estado === 'Finalizada'
                  }"
                >
                  {{ campanaActual?.estado }}
                </span>
              </div>
            </div>

            <!-- Contacto -->
            <div class="border-t border-gray-200 pt-4 mt-2">
              <div class="flex items-center gap-3 text-[0.85vw] text-gray-500">
                <Icon name="mdi:phone" class="text-[1vw] text-senado-primary" />
                <span>Más información: <strong class="text-gray-700">73088068</strong></span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex-shrink-0 border-t border-gray-200 p-4 flex justify-end">
            <button @click="modal = false" class="px-6 py-2 rounded-lg bg-senado-primary text-white hover:bg-senado-primary-dark transition-colors font-medium text-[0.9vw]">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'Campanas',
  data() {
    return {
      busqueda: '',
      filtro: 'Todas',
      pagina: 1,
      porPagina: 9,
      modal: false,
      campanaActual: null,
      imagenModal: false,
      imagenSrc: '',
      imagenTitulo: '',
      zoom: 1,
      posX: 0,
      posY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      campanas: [
        // {
        //   id: 1,
        //   titulo: 'Lucha contra el Sarampión',
        //   descripcion: 'Campaña de vacunación y prevención contra el sarampión, con el objetivo de proteger a la población boliviana. Se realizarán jornadas de vacunación en todo el país, con énfasis en zonas de difícil acceso.',
        //   periodo: '10 ENE - 15 MAR 2026',
        //   fechaInicio: '2026-01-10',
        //   fechaFin: '2026-03-15',
        //   estado: 'Finalizada',
        //   destacado: false,
        //   imagen: '/campanas/sarampion.jpg'
        // },
        
      ]
    }
  },
  computed: {
    campanasConEstado() {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      
      return this.campanas.map(campana => {
        const inicio = new Date(campana.fechaInicio)
        const fin = new Date(campana.fechaFin)
        
        let estado = 'Próximamente'
        
        if (inicio > hoy) {
          estado = 'Próximamente'
        } else if (hoy >= inicio && hoy <= fin) {
          estado = 'Activa'
        } else if (fin < hoy) {
          estado = 'Finalizada'
        }
        
        return {
          ...campana,
          estado
        }
      }).sort((a, b) => {
        const orden = { 'Activa': 0, 'Próximamente': 1, 'Finalizada': 2 }
        const diff = orden[a.estado] - orden[b.estado]
        if (diff !== 0) return diff
        
        const fechaA = new Date(a.fechaInicio)
        const fechaB = new Date(b.fechaInicio)
        return fechaA - fechaB
      })
    },
    filtrados() {
      return this.campanasConEstado.filter(c => {
        const normalizar = (texto) => {
          if (!texto) return ''
          return texto.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ñ/g, 'n')
        }
        
        const busquedaNormalizada = normalizar(this.busqueda)
        
        const matchBusqueda = busquedaNormalizada === '' || 
          normalizar(c.titulo).includes(busquedaNormalizada) ||
          normalizar(c.descripcion).includes(busquedaNormalizada)
        
        const matchFiltro = this.filtro === 'Todas' || c.estado === this.filtro
        
        return matchBusqueda && matchFiltro
      })
    },
    totalPaginas() {
      return Math.ceil(this.filtrados.length / this.porPagina)
    },
    paginados() {
      const inicio = (this.pagina - 1) * this.porPagina
      return this.filtrados.slice(inicio, inicio + this.porPagina)
    },
    inicio() {
      return this.filtrados.length ? (this.pagina - 1) * this.porPagina + 1 : 0
    },
    fin() {
      return Math.min(this.pagina * this.porPagina, this.filtrados.length)
    }
  },
  watch: {
    busqueda() { this.pagina = 1 },
    filtro() { this.pagina = 1 }
  },
  methods: {
    abrirImagen(src, titulo) {
      this.imagenSrc = src
      this.imagenTitulo = titulo
      this.zoom = 1
      this.posX = 0
      this.posY = 0
      this.lastX = 0
      this.lastY = 0
      this.imagenModal = true
      if (this.modal) this.modal = false
    },
    cerrarImagen() {
      this.imagenModal = false
      this.isDragging = false
    },
    zoomIn() {
      if (this.zoom < 3) {
        this.zoom = Math.min(this.zoom + 0.2, 3)
      }
    },
    zoomOut() {
      if (this.zoom > 0.5) {
        this.zoom = Math.max(this.zoom - 0.2, 0.5)
        if (this.zoom <= 1) {
          this.posX = 0
          this.posY = 0
          this.lastX = 0
          this.lastY = 0
        }
      }
    },
    resetZoom() {
      this.zoom = 1
      this.posX = 0
      this.posY = 0
      this.lastX = 0
      this.lastY = 0
    },
    manejarZoom(event) {
      const delta = event.deltaY > 0 ? -0.15 : 0.15
      const nuevoZoom = Math.min(Math.max(this.zoom + delta, 0.5), 3)
      if (nuevoZoom <= 1) {
        this.posX = 0
        this.posY = 0
        this.lastX = 0
        this.lastY = 0
      }
      this.zoom = nuevoZoom
    },
    iniciarArrastre(event) {
      if (this.zoom <= 1) return
      this.isDragging = true
      this.startX = event.clientX
      this.startY = event.clientY
      this.lastX = this.posX
      this.lastY = this.posY
      event.preventDefault()
    },
    moverArrastre(event) {
      if (!this.isDragging || this.zoom <= 1) return
      const deltaX = event.clientX - this.startX
      const deltaY = event.clientY - this.startY
      const maxOffset = 300 * this.zoom
      this.posX = Math.min(Math.max(this.lastX + deltaX, -maxOffset), maxOffset)
      this.posY = Math.min(Math.max(this.lastY + deltaY, -maxOffset), maxOffset)
    },
    terminarArrastre() {
      this.isDragging = false
    },
    verDetalle(campana) {
      this.campanaActual = campana
      this.modal = true
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.group:hover { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(201,168,76,0.3); }
  50% { box-shadow: 0 0 30px rgba(201,168,76,0.6); }
}
.ring-2.ring-senado-gold { animation: glow 2.5s ease-in-out infinite; }
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
.animate-pulse { animation: pulse-dot 1.5s ease-in-out infinite; }
.cursor-grab { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
</style>