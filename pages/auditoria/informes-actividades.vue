<!-- pages/auditoria/informes-actividades.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
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
          
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalInformes }}</span>
              <p class="text-white/60" style="font-size: 0.6vw;">TOTAL</p>
            </div>
          </div>
        </div>
      </div>
      
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
          <div 
            class="absolute inset-0 transition-all duration-300"
            :class="tabActivo === tab.key 
              ? 'bg-gradient-to-r from-senado-primary to-senado-primary-dark' 
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
                  :class="tabActivo === tab.key ? 'text-senado-gold' : 'text-gray-700'"
                  style="font-size: 0.85vw;"
                >
                  {{ tab.nombre }}
                </h3>
                <div class="flex items-center" style="gap: 0.5vw; margin-top: 0.1vw;">
                  <span 
                    class="font-bold"
                    :class="tabActivo === tab.key ? 'text-senado-gold' : 'text-gray-500'"
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
          <!-- Estadísticas -->
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

          <!-- Tabla de informes -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div class="border-b border-gray-100 flex items-center justify-between" style="padding: 0.5vw 1vw;">
              <h2 class="font-bold text-senado-primary flex items-center" style="font-size: 1vw; gap: 0.4vw;">
                <Icon :name="tab.icono" style="font-size: 1.2vw;" />
                {{ tab.nombre }}
              </h2>
              <span class="text-gray-400 flex items-center" style="font-size: 0.6vw; gap: 0.2vw;">
                Ordenados: más reciente a más antiguo
                <Icon name="mdi:arrow-down" style="font-size: 0.7vw;" />
              </span>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Título</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Año</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Descripción</th>
                    <th class="text-center text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Archivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(item, index) in obtenerDocumentosOrdenados(tab.key)" 
                    :key="index"
                    class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    @click="verPDF(item)"
                  >
                    <td style="padding: 0.35vw 0.6vw; width: 22vw;">
                      <span class="font-mono font-medium text-senado-primary" style="font-size: 0.90vw;">{{ item.titulo }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw; width: 8vw;">
                      <span class="font-bold" style="font-size: 0.90vw;">{{ item.anio }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw;">
                      <span style="font-size: 0.85vw; color: #374151;">{{ item.descripcion }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw; width: 10vw;">
                      <div class="flex items-center justify-center" style="gap: 0.9vw;">
                        <a 
                          v-if="item.url"
                          :href="item.url" 
                          target="_blank"
                          class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium" 
                          style="padding: 0.3vw 0.8vw; font-size: 0.7vw; gap: 0.3vw;"
                          @click.stop
                        >
                          <Icon name="mdi:download" style="font-size: 0.9vw;" />
                          Descargar
                        </a>
                        <span v-else class="text-gray-300 text-xs" style="font-size: 0.6vw;">Sin PDF</span>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Sin datos -->
                  <tr v-if="obtenerDocumentosOrdenados(tab.key).length === 0">
                    <td colspan="4" class="text-center py-8 text-gray-500" style="font-size: 0.9vw;">
                      No hay documentos disponibles para {{ tab.nombre }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <span style="font-size: 0.55vw; color: #9ca3af;">💡 Haz clic en cualquier fila para ver el PDF</span>
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
      // 🔥 DATOS DE EJEMPLO PARA INFORMES
      informes: {
        anuales: [
          // {
          //   titulo: 'INF-UAI-IA-006/2025',
          //   anio: 2025,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2025',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IA-005/2024',
          //   anio: 2024,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2024',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IA-004/2023',
          //   anio: 2023,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2023',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IA-003/2022',
          //   anio: 2022,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2022',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IA-002/2021',
          //   anio: 2021,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2021',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IA-001/2020',
          //   anio: 2020,
          //   descripcion: 'INFORME ANUAL DE ACTIVIDADES DE LA UNIDAD DE AUDITORÍA INTERNA - GESTIÓN 2020',
          //   url: ''
          // }
        ],
        semestrales: [
          // {
          //   titulo: 'INF-UAI-IS-012/2025',
          //   anio: 2025,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - SEGUNDO SEMESTRE 2025',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IS-011/2025',
          //   anio: 2025,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - PRIMER SEMESTRE 2025',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IS-010/2024',
          //   anio: 2024,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - SEGUNDO SEMESTRE 2024',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IS-009/2024',
          //   anio: 2024,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - PRIMER SEMESTRE 2024',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IS-008/2023',
          //   anio: 2023,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - SEGUNDO SEMESTRE 2023',
          //   url: ''
          // },
          // {
          //   titulo: 'INF-UAI-IS-007/2023',
          //   anio: 2023,
          //   descripcion: 'INFORME SEMESTRAL DE ACTIVIDADES - PRIMER SEMESTRE 2023',
          //   url: ''
          // }
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
      if (item.url) {
        window.open(item.url, '_blank')
      } else {
        alert(`📄 ${item.titulo}\n\n${item.descripcion}\n\n⚠️ No hay PDF disponible para este documento.`)
      }
    },
    descargarPDF(item) {
      if (item.url) {
        window.open(item.url, '_blank')
      } else {
        alert(`⚠️ No hay PDF disponible para: ${item.titulo}`)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.hover\:bg-gray-50\/50:hover {
  background-color: rgba(249, 250, 251, 0.5);
}

tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f9fafb;
}

.transform {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group:hover .transform {
  transform: scale(1.02);
}

.bg-senado-primary {
  background-color: #611717;
}

.bg-senado-primary:hover {
  background-color: #3a060d;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  [style*="font-size: 1vw;"] {
    font-size: 2.5vw !important;
  }
  
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: 1fr 1fr;
  }
  
  .overflow-x-auto {
    overflow-x: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>