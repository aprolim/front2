<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner - Versión Compacta -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-12 sm:px-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <!-- Badge pequeño -->
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:file-pdf-box" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">PLAN OPERATIVO ANUAL</span>
            </div>
            
            <!-- Título en línea -->
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              POA - <span class="text-senado-gold">UAI</span>
            </h1>
            
            <!-- Subtítulo -->
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <!-- Año actual destacado -->
          <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-center px-[6vw] sm:px-8 py-[1.8vw] sm:py-3">
            <span class="font-bold text-senado-gold text-[7.5vw] sm:text-3xl">{{ añoActual }}</span>
            <p class="text-white/60 tracking-wider text-[1.8vw] sm:text-xs">VIGENTE</p>
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

    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">
      <!-- Tarjeta del Año Actual -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 relative z-10 px-[3.6vw] sm:px-6 py-[3.6vw] sm:py-4 -mt-[2.4vw] sm:-mt-4 mb-[4.5vw] sm:mb-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-4">
          <div class="flex items-center gap-[2.4vw] sm:gap-4">
            <div class="bg-senado-primary text-white rounded-lg px-[3.6vw] sm:px-4 py-[1.5vw] sm:py-2">
              <span class="font-bold text-[5.4vw] sm:text-2xl">{{ añoActual }}</span>
            </div>
            <div>
              <h3 class="font-bold text-senado-primary text-[3.3vw] sm:text-lg">POA - UAI {{ añoActual }}</h3>
              <p class="text-gray-500 text-[2.1vw] sm:text-sm">Plan Operativo Anual vigente</p>
            </div>
          </div>
          <a 
            :href="poaActual?.pdfUrl || '#'" 
            :download="poaActual?.pdfUrl ? 'POA_UAI_' + añoActual + '.pdf' : ''"
            target="_blank"
            class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium whitespace-nowrap px-[4.5vw] sm:px-4 py-[1.5vw] sm:py-2 text-[2.4vw] sm:text-sm gap-[1.2vw] sm:gap-2"
          >
            <Icon name="mdi:download" class="text-[3.3vw] sm:text-lg" />
            Descargar PDF
          </a>
        </div>
      </div>

      <!-- ESTADÍSTICAS CALCULADAS AUTOMÁTICAMENTE -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
          <div class="font-bold text-senado-primary text-[6vw] sm:text-2xl">{{ totalPoas }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-sm">Total POAs</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
          <div class="font-bold text-green-600 text-[6vw] sm:text-2xl">{{ totalVigentes }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-sm">Vigentes</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
          <div class="font-bold text-blue-600 text-[6vw] sm:text-2xl">{{ totalPublicados }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-sm">Publicados</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-4">
          <div class="font-bold text-yellow-600 text-[6vw] sm:text-2xl">{{ totalEnRevision }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-sm">En Revisión</p>
        </div>
      </div>

      <!-- Tabla de Documentos -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div class="border-b border-gray-100 px-[3.6vw] sm:px-4 py-[1.8vw] sm:py-3">
          <h2 class="font-bold text-senado-primary flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:file-document" class="text-[4.2vw] sm:text-xl" />
            Documentos POA - UAI
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Año</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Documento</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Fecha</th>
                <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Estado</th>
                <th class="text-center text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(poa, index) in poasOrdenados" 
                :key="index" 
                class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                :class="poa.activo ? 'bg-yellow-50/50' : ''"
              >
                <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                  <span class="font-bold text-[2.55vw] sm:text-sm">{{ poa.anio }}</span>
                  <span v-if="poa.activo" class="ml-1 font-bold text-yellow-600 bg-yellow-100 rounded-full px-[1.5vw] sm:px-2 py-[0.15vw] sm:py-0.5 text-[1.5vw] sm:text-[10px]">VIGENTE</span>
                </td>
                <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                  <div class="flex items-center gap-[1.2vw] sm:gap-2">
                    <Icon name="mdi:file-pdf-box" class="text-red-500 text-[4.2vw] sm:text-xl" />
                    <span class="text-[2.1vw] sm:text-sm">{{ poa.titulo }}</span>
                  </div>
                </td>
                <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[2.1vw] sm:text-sm text-gray-500">{{ poa.fecha }}</td>
                <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                  <span 
                    class="rounded-full font-medium px-[1.8vw] sm:px-2 py-[0.3vw] sm:py-0.5 text-[1.8vw] sm:text-xs"
                    :class="{
                      'bg-green-100 text-green-700': poa.estado === 'Publicado',
                      'bg-yellow-100 text-yellow-700': poa.estado === 'En Revisión',
                      'bg-gray-100 text-gray-700': poa.estado === 'Borrador'
                    }"
                  >
                    {{ poa.estado }}
                  </span>
                </td>
                <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                  <div class="flex items-center justify-center gap-[1.8vw] sm:gap-3">
                    <button 
                      @click="verPDF(poa)"
                      class="text-senado-primary hover:text-senado-primary-dark transition-colors" 
                      title="Ver"
                    >
                      <Icon name="mdi:eye" class="text-[3.9vw] sm:text-lg" />
                    </button>
                    <a 
                      v-if="poa.pdfUrl"
                      :href="poa.pdfUrl" 
                      download
                      target="_blank"
                      class="text-gray-400 hover:text-gray-600 transition-colors" 
                      title="Descargar"
                    >
                      <Icon name="mdi:download" class="text-[3.9vw] sm:text-lg" />
                    </a>
                    <span v-else class="text-gray-300 text-[1.8vw] sm:text-xs">Sin PDF</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Información Adicional -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-[3vw] sm:gap-6 mt-[4.5vw] sm:mt-6">
        <!-- Proceso -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-[3vw] sm:px-6 py-[3vw] sm:py-6">
          <h3 class="font-bold text-senado-primary flex items-center gap-[1.2vw] sm:gap-2 text-[2.7vw] sm:text-base mb-[1.8vw] sm:mb-3">
            <Icon name="mdi:timeline" class="text-[3.6vw] sm:text-xl" />
            Proceso de Elaboración
          </h3>
          <div class="flex flex-col gap-[1.2vw] sm:gap-2">
            <div class="flex items-start gap-[1.8vw] sm:gap-3">
              <div class="bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center flex-shrink-0 w-[4.8vw] sm:w-8 h-[4.8vw] sm:h-8 text-[2.1vw] sm:text-sm">1</div>
              <div>
                <h4 class="font-semibold text-gray-800 text-[2.25vw] sm:text-sm">Planificación</h4>
                <p class="text-gray-500 text-[1.8vw] sm:text-xs">Definición de objetivos, actividades y metas</p>
              </div>
            </div>
            <div class="flex items-start gap-[1.8vw] sm:gap-3">
              <div class="bg-yellow-100 text-yellow-600 font-bold rounded-full flex items-center justify-center flex-shrink-0 w-[4.8vw] sm:w-8 h-[4.8vw] sm:h-8 text-[2.1vw] sm:text-sm">2</div>
              <div>
                <h4 class="font-semibold text-gray-800 text-[2.25vw] sm:text-sm">Revisión y Validación</h4>
                <p class="text-gray-500 text-[1.8vw] sm:text-xs">Revisión por la UAI y validación institucional</p>
              </div>
            </div>
            <div class="flex items-start gap-[1.8vw] sm:gap-3">
              <div class="bg-green-100 text-green-600 font-bold rounded-full flex items-center justify-center flex-shrink-0 w-[4.8vw] sm:w-8 h-[4.8vw] sm:h-8 text-[2.1vw] sm:text-sm">3</div>
              <div>
                <h4 class="font-semibold text-gray-800 text-[2.25vw] sm:text-sm">Publicación</h4>
                <p class="text-gray-500 text-[1.8vw] sm:text-xs">Publicación del POA aprobado</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Marco Legal -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 px-[3vw] sm:px-6 py-[3vw] sm:py-6">
          <h3 class="font-bold text-senado-primary flex items-center gap-[1.2vw] sm:gap-2 text-[2.7vw] sm:text-base mb-[1.8vw] sm:mb-3">
            <Icon name="mdi:scale-balance" class="text-[3.6vw] sm:text-xl" />
            Marco Legal
          </h3>
          <div class="flex flex-col gap-[1.8vw] sm:gap-3">
            <div class="border-l-2 border-senado-gold pl-[1.8vw] sm:pl-3">
              <h4 class="font-semibold text-gray-800 text-[2.25vw] sm:text-sm">Ley N° 1178</h4>
              <p class="text-gray-500 text-[1.8vw] sm:text-xs">Ley SAFCO - Administración y Control Gubernamentales</p>
            </div>
            <div class="border-l-2 border-senado-gold pl-[1.8vw] sm:pl-3">
              <h4 class="font-semibold text-gray-800 text-[2.25vw] sm:text-sm">DS N° 23318-A</h4>
              <p class="text-gray-500 text-[1.8vw] sm:text-xs">Reglamento - Normas Básicas de Auditoría</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contacto -->
      <div class="bg-gray-50 rounded-xl border border-gray-200 px-[3vw] sm:px-6 py-[3vw] sm:py-6 mt-[4.5vw] sm:mt-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[2.4vw] sm:gap-4">
          <div class="flex items-center gap-[2.4vw] sm:gap-4">
            <div class="bg-senado-primary rounded-full flex items-center justify-center flex-shrink-0 w-[6.6vw] sm:w-12 h-[6.6vw] sm:h-12">
              <Icon name="mdi:email" class="text-white text-[3.6vw] sm:text-xl" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-800 text-[2.55vw] sm:text-sm">¿Necesitas más información?</h4>
              <p class="text-gray-500 text-[1.95vw] sm:text-xs">Contacta a la Unidad de Auditoría Interna</p>
            </div>
          </div>
          <a 
            href="mailto:auditoria@senado.gob.bo" 
            class="text-senado-primary hover:text-senado-primary-dark font-medium inline-flex items-center gap-[0.9vw] sm:gap-2 text-[2.4vw] sm:text-sm"
          >
            <Icon name="mdi:email" class="text-[3vw] sm:text-base" />
            auditoria@senado.gob.bo
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoaUai',
  data() {
    return {
      poas: [
        // {
        //   anio: 2026,
        //   titulo: 'Plan Operativo Anual - UAI 2026',
        //   fecha: '15/01/2026',
        //   estado: 'Publicado',
        //   activo: true,
        //   pdfUrl: '/pdfs/poa/POA_UAI_2026.pdf'
        // },
        // {
        //   anio: 2025,
        //   titulo: 'Plan Operativo Anual - UAI 2025',
        //   fecha: '10/01/2025',
        //   estado: 'Publicado',
        //   activo: false,
        //   pdfUrl: '/pdfs/poa/POA_UAI_2025.pdf'
        // }
      ]
    }
  },
  computed: {
    añoActual() {
      const hoy = new Date()
      return hoy.getFullYear()
    },
    totalPoas() {
      return this.poas.length
    },
    totalVigentes() {
      return this.poas.filter(p => p.activo === true).length
    },
    totalPublicados() {
      return this.poas.filter(p => p.estado === 'Publicado').length
    },
    totalEnRevision() {
      return this.poas.filter(p => p.estado === 'En Revisión').length
    },
    poaActual() {
      return this.poas.find(p => p.activo === true) || null
    },
    poasOrdenados() {
      return [...this.poas].sort((a, b) => b.anio - a.anio)
    }
  },
  methods: {
    verPDF(poa) {
      if (poa.pdfUrl) {
        window.open(poa.pdfUrl, '_blank')
      } else {
        alert(`El documento POA ${poa.anio} no tiene PDF disponible.`)
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>