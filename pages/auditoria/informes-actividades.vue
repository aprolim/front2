<!-- pages/auditoria/informes-actividades.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <!-- Badge -->
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:file-report" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">INFORMES</span>
            </div>
            
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              Informes de <span class="text-senado-gold">Actividades</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <!-- Resumen -->
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalInformes }}</span>
              <p class="text-white/60" style="font-size: 0.6vw;">TOTAL</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Onda inferior -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </section>

    <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2vw 0;">
      <!-- Tabs de navegación -->
      <div class="grid grid-cols-1 md:grid-cols-2" style="gap: 0.8vw; margin-bottom: 1.5vw;">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="tabActivo = tab.key"
          class="relative rounded-xl transition-all duration-300 text-left overflow-hidden group"
          :class="tabActivo === tab.key 
            ? 'ring-2 ring-senado-primary shadow-lg transform scale-[1.02]' 
            : 'hover:shadow-md hover:scale-[1.01]'"
          style="padding: 0.8vw 1vw;"
        >
          <!-- Fondo -->
          <div 
            class="absolute inset-0 transition-all duration-300"
            :class="tabActivo === tab.key 
              ? 'bg-gradient-to-r from-senado-primary to-senado-primary-dark opacity-10' 
              : 'bg-white opacity-100'"
          ></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex items-center" style="gap: 0.6vw;">
              <div 
                class="rounded-full flex items-center justify-center transition-all duration-300"
                :class="tabActivo === tab.key 
                  ? 'bg-senado-primary text-white' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'"
                style="width: 2.2vw; height: 2.2vw;"
              >
                <Icon :name="tab.icono" style="font-size: 1.2vw;" />
              </div>
              
              <div>
                <h3 
                  class="font-semibold transition-colors duration-300"
                  :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-700'"
                  style="font-size: 0.85vw;"
                >
                  {{ tab.nombre }}
                </h3>
                <div class="flex items-center" style="gap: 0.5vw; margin-top: 0.1vw;">
                  <span 
                    class="font-bold"
                    :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-500'"
                    style="font-size: 1.2vw;"
                  >
                    {{ obtenerTotalPorTipo(tab.key) }}
                  </span>
                  <span class="text-gray-400" style="font-size: 0.55vw;">documentos</span>
                  <span 
                    v-if="tabActivo === tab.key"
                    class="px-1.5 py-0.5 rounded-full bg-senado-primary text-white font-bold"
                    style="font-size: 0.45vw;"
                  >
                    ACTIVO
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              class="transition-all duration-300"
              :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-300'"
            >
              <Icon 
                name="mdi:chevron-right" 
                style="font-size: 1.3vw;"
                :class="tabActivo === tab.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
              />
            </div>
          </div>
          
          <!-- Barra de progreso inferior -->
          <div 
            class="absolute bottom-0 left-0 h-1 transition-all duration-300"
            :class="tabActivo === tab.key ? 'bg-senado-primary' : 'bg-transparent group-hover:bg-gray-200'"
            :style="tabActivo === tab.key ? 'width: 100%;' : 'width: 0%;'"
          ></div>
        </button>
      </div>

      <!-- Contenido de los tabs -->
      <div v-for="tab in tabs" :key="tab.key">
        <div v-show="tabActivo === tab.key">
          <!-- Estadísticas del tipo -->
          <div class="grid grid-cols-2 md:grid-cols-4" style="gap: 0.8vw; margin-bottom: 1.5vw;">
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-senado-primary" style="font-size: 1.8vw;">{{ obtenerTotalPorTipo(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Total</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-blue-600" style="font-size: 1.8vw;">{{ obtenerUltimoAnio(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Último año</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-green-600" style="font-size: 1.8vw;">{{ obtenerAniosUnicos(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Años distintos</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100" style="padding: 0.8vw;">
              <div class="font-bold text-yellow-600" style="font-size: 1.8vw;">{{ obtenerRangoAnios(tab.key) }}</div>
              <p class="text-gray-500" style="font-size: 0.65vw;">Rango de años</p>
            </div>
          </div>

          <!-- Tarjetas de informes -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style="gap: 1vw;">
            <div 
              v-for="(item, index) in obtenerDocumentosOrdenados(tab.key)" 
              :key="index"
              class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              @click="verPDF(item)"
              style="border-radius: 0.6vw;"
            >
              <!-- Header con año -->
              <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white" style="padding: 0.6vw 0.8vw;">
                <div class="flex items-center justify-between">
                  <span class="font-bold" style="font-size: 1.2vw;">{{ item.anio }}</span>
                  <span 
                    class="px-1.5 py-0.5 rounded-full bg-white/20 text-white font-medium"
                    style="font-size: 0.5vw;"
                  >
                    {{ item.tipo }}
                  </span>
                </div>
              </div>
              
              <!-- Contenido -->
              <div style="padding: 0.8vw;">
                <div class="flex items-center" style="gap: 0.6vw; margin-bottom: 0.4vw;">
                  <Icon name="mdi:file-pdf-box" class="text-red-500" style="font-size: 2vw;" />
                  <div>
                    <h4 class="font-semibold text-gray-800" style="font-size: 0.8vw;">{{ item.titulo }}</h4>
                    <p class="text-gray-500" style="font-size: 0.6vw;">{{ item.descripcion }}</p>
                  </div>
                </div>
                
                <!-- Metadatos -->
                <div class="flex flex-wrap items-center" style="gap: 0.4vw; margin-top: 0.4vw; padding-top: 0.4vw; border-top: 1px solid #f3f4f6;">
                  <span class="text-gray-400" style="font-size: 0.55vw;">
                    <Icon name="mdi:calendar" style="font-size: 0.7vw;" />
                    {{ item.fecha }}
                  </span>
                  <span class="w-px h-3 bg-gray-200"></span>
                  <span class="text-gray-400" style="font-size: 0.55vw;">
                    <Icon name="mdi:file" style="font-size: 0.7vw;" />
                    {{ item.paginas }} páginas
                  </span>
                  <span class="w-px h-3 bg-gray-200"></span>
                  <span class="text-gray-400" style="font-size: 0.55vw;">
                    <Icon name="mdi:file-pdf-box" style="font-size: 0.7vw;" />
                    {{ item.tamano }}
                  </span>
                </div>
                
                <!-- Acciones -->
                <div class="flex items-center justify-end" style="gap: 0.5vw; margin-top: 0.5vw;">
                  <button 
                    class="text-senado-primary hover:text-senado-primary-dark transition-colors flex items-center" 
                    style="gap: 0.2vw; font-size: 0.6vw;"
                    @click.stop="verPDF(item)"
                  >
                    <Icon name="mdi:eye" style="font-size: 1vw;" />
                    Ver
                  </button>
                  <button 
                    class="text-gray-500 hover:text-gray-700 transition-colors flex items-center" 
                    style="gap: 0.2vw; font-size: 0.6vw;"
                    @click.stop="descargarPDF(item)"
                  >
                    <Icon name="mdi:download" style="font-size: 1vw;" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leyenda -->
      <div class="mt-8 bg-gray-50 rounded-xl border border-gray-200" style="padding: 0.8vw 1.2vw;">
        <div class="flex flex-wrap items-center" style="gap: 1vw;">
          <span class="font-semibold text-gray-700" style="font-size: 0.7vw;">Tipos de Informes:</span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #3b82f6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Anuales</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #22c55e;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Semestrales</span>
          </span>
          <span class="flex items-center ml-auto" style="gap: 0.3vw;">
            <span style="font-size: 0.55vw; color: #9ca3af;">💡 Haz clic en cualquier tarjeta para ver el PDF</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformesActividades',
  data() {
    return {
      tabActivo: 'anuales',
      tabs: [
        { key: 'anuales', nombre: 'Informes Anuales', icono: 'mdi:calendar-year' },
        { key: 'semestrales', nombre: 'Informes Semestrales', icono: 'mdi:calendar-split' }
      ],
      informes: {
        anuales: [
          {
            id: 1,
            anio: 2025,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2025',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2026',
            paginas: 156,
            tamano: '2.4 MB'
          },
          {
            id: 2,
            anio: 2024,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2024',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2025',
            paginas: 142,
            tamano: '2.1 MB'
          },
          {
            id: 3,
            anio: 2023,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2023',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2024',
            paginas: 138,
            tamano: '1.9 MB'
          },
          {
            id: 4,
            anio: 2022,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2022',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2023',
            paginas: 125,
            tamano: '1.7 MB'
          },
          {
            id: 5,
            anio: 2021,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2021',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2022',
            paginas: 118,
            tamano: '1.5 MB'
          },
          {
            id: 6,
            anio: 2020,
            tipo: 'Anual',
            titulo: 'Informe Anual de Actividades 2020',
            descripcion: 'Informe de gestión anual de la Unidad de Auditoría Interna',
            fecha: '15/01/2021',
            paginas: 110,
            tamano: '1.3 MB'
          }
        ],
        semestrales: [
          {
            id: 7,
            anio: 2025,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2025 - 2do Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/07/2025',
            paginas: 78,
            tamano: '1.2 MB'
          },
          {
            id: 8,
            anio: 2025,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2025 - 1er Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/01/2025',
            paginas: 72,
            tamano: '1.1 MB'
          },
          {
            id: 9,
            anio: 2024,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2024 - 2do Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/07/2024',
            paginas: 75,
            tamano: '1.0 MB'
          },
          {
            id: 10,
            anio: 2024,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2024 - 1er Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/01/2024',
            paginas: 68,
            tamano: '0.9 MB'
          },
          {
            id: 11,
            anio: 2023,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2023 - 2do Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/07/2023',
            paginas: 70,
            tamano: '0.9 MB'
          },
          {
            id: 12,
            anio: 2023,
            tipo: 'Semestral',
            titulo: 'Informe Semestral de Actividades 2023 - 1er Semestre',
            descripcion: 'Informe de gestión semestral de la Unidad de Auditoría Interna',
            fecha: '15/01/2023',
            paginas: 65,
            tamano: '0.8 MB'
          }
        ]
      }
    }
  },
  computed: {
    totalInformes() {
      return this.informes.anuales.length + this.informes.semestrales.length
    }
  },
  methods: {
    obtenerDocumentosOrdenados(tipo) {
      const docs = this.informes[tipo] || []
      return [...docs].sort((a, b) => b.anio - a.anio)
    },
    obtenerTotalPorTipo(tipo) {
      return this.informes[tipo]?.length || 0
    },
    obtenerUltimoAnio(tipo) {
      const docs = this.informes[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.anio)
      return Math.max(...anios)
    },
    obtenerAniosUnicos(tipo) {
      const docs = this.informes[tipo] || []
      if (docs.length === 0) return 0
      const anios = new Set(docs.map(d => d.anio))
      return anios.size
    },
    obtenerRangoAnios(tipo) {
      const docs = this.informes[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.anio)
      const min = Math.min(...anios)
      const max = Math.max(...anios)
      if (min === max) return `${min}`
      return `${min} - ${max}`
    },
    verPDF(item) {
      console.log('Ver PDF:', item)
      alert(`📄 Ver PDF: ${item.titulo}\n\nAño: ${item.anio}\nPáginas: ${item.paginas}\nTamaño: ${item.tamano}`)
    },
    descargarPDF(item) {
      console.log('Descargar PDF:', item)
      alert(`⬇️ Descargando: ${item.titulo}\n\n${item.tamano}`)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Transiciones */
.hover\:shadow-lg {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.group:hover .transform {
  transform: scale(1.02);
}

/* Efecto hover en tarjetas */
.bg-white {
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.bg-white:hover {
  transform: translateY(-0.2vw);
  box-shadow: 0 0.5vw 1.5vw rgba(0, 0, 0, 0.1);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>