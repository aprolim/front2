<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:file-multiple" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">OTRAS ACTIVIDADES</span>
            </div>
            
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              Otras <span class="text-senado-gold">Actividades</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center px-[3vw] sm:px-4 py-[1.8vw] sm:py-2 min-w-[12vw] sm:min-w-[80px]">
              <span class="font-bold text-senado-gold text-[5.4vw] sm:text-2xl">{{ totalActividades }}</span>
              <p class="text-white/60 text-[1.8vw] sm:text-xs">TOTAL</p>
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

    <div class="container mx-auto px-4 max-w-[90vw] py-[6vw] sm:py-8">
      <!-- Tabs de navegación -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="tabActivo = tab.key"
          class="relative rounded-xl transition-all duration-300 text-left overflow-hidden group px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-3"
          :class="tabActivo === tab.key 
            ? 'ring-2 ring-senado-primary shadow-lg transform scale-[1.02]' 
            : 'hover:shadow-md hover:scale-[1.01]'"
        >
          <div 
            class="absolute inset-0 transition-all duration-300"
            :class="tabActivo === tab.key 
              ? 'bg-gradient-to-r from-senado-primary to-senado-primary-dark opacity-10' 
              : 'bg-white opacity-100'"
          ></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex items-center gap-[1.8vw] sm:gap-3">
              <div 
                class="rounded-full flex items-center justify-center transition-all duration-300 w-[6.6vw] sm:w-11 h-[6.6vw] sm:h-11"
                :class="tabActivo === tab.key 
                  ? 'bg-senado-primary text-white' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'"
              >
                <Icon :name="tab.icono" class="text-[3.6vw] sm:text-xl" />
              </div>
              
              <div>
                <h3 
                  class="font-semibold transition-colors duration-300 text-[2.55vw] sm:text-base"
                  :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-700'"
                >
                  {{ tab.nombre }}
                </h3>
                <div class="flex items-center gap-[1.5vw] sm:gap-2 mt-[0.3vw] sm:mt-0.5">
                  <span 
                    class="font-bold text-[3.6vw] sm:text-xl"
                    :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-500'"
                  >
                    {{ obtenerTotalPorTipo(tab.key) }}
                  </span>
                  <span class="text-gray-400 text-[1.65vw] sm:text-xs">documentos</span>
                  <span 
                    v-if="tabActivo === tab.key"
                    class="px-[1.5vw] sm:px-2 py-[0.15vw] sm:py-0.5 rounded-full bg-senado-primary text-white font-bold text-[1.35vw] sm:text-[10px]"
                  >
                    ACTIVO
                  </span>
                </div>
              </div>
            </div>
            
            <div 
              class="transition-all duration-300 text-[3.9vw] sm:text-xl"
              :class="tabActivo === tab.key ? 'text-senado-primary' : 'text-gray-300'"
            >
              <Icon 
                name="mdi:chevron-right" 
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
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-3">
              <div class="font-bold text-senado-primary text-[5.4vw] sm:text-2xl">{{ obtenerTotalPorTipo(tab.key) }}</div>
              <p class="text-gray-500 text-[2.1vw] sm:text-sm">Total</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-3">
              <div class="font-bold text-blue-600 text-[5.4vw] sm:text-2xl">{{ obtenerUltimoAnio(tab.key) }}</div>
              <p class="text-gray-500 text-[2.1vw] sm:text-sm">Último año</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-3">
              <div class="font-bold text-green-600 text-[5.4vw] sm:text-2xl">{{ obtenerAniosUnicos(tab.key) }}</div>
              <p class="text-gray-500 text-[2.1vw] sm:text-sm">Años distintos</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm text-center border border-gray-100 px-[2.4vw] sm:px-4 py-[2.4vw] sm:py-3">
              <div class="font-bold text-yellow-600 text-[5.4vw] sm:text-2xl">{{ obtenerRangoAnios(tab.key) }}</div>
              <p class="text-gray-500 text-[2.1vw] sm:text-sm">Rango de años</p>
            </div>
          </div>

          <!-- Tabla de documentos -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div class="border-b border-gray-100 flex items-center justify-between px-[3.6vw] sm:px-4 py-[1.8vw] sm:py-2">
              <h2 class="font-bold text-senado-primary flex items-center gap-[1.2vw] sm:gap-2 text-[3.3vw] sm:text-base">
                <Icon :name="tab.icono" class="text-[4.2vw] sm:text-xl" />
                {{ tab.nombre }}
              </h2>
              <span class="text-gray-400 flex items-center gap-[0.6vw] sm:gap-1 text-[1.8vw] sm:text-xs">
                Ordenados: más reciente a más antiguo
                <Icon name="mdi:arrow-down" class="text-[2.1vw] sm:text-sm" />
              </span>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Título</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Gestión</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Descripción</th>
                    <th class="text-center text-gray-500 font-semibold uppercase tracking-wider px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 text-[1.8vw] sm:text-xs">Archivo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(item, index) in obtenerDocumentosOrdenados(tab.key)" 
                    :key="index"
                    class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    @click="verPDF(item)"
                  >
                    <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2 min-w-[30vw] sm:min-w-[220px]">
                      <span class="font-mono font-medium text-senado-primary text-[2.7vw] sm:text-sm">{{ item.titulo }}</span>
                    </td>
                    <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                      <span class="font-bold text-[2.7vw] sm:text-sm">{{ item.gestion }}</span>
                    </td>
                    <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                      <span class="text-[2.55vw] sm:text-sm text-gray-700">{{ item.descripcion }}</span>
                    </td>
                    <td class="px-[2.4vw] sm:px-3 py-[1.5vw] sm:py-2">
                      <div class="flex items-center justify-center gap-[1.8vw] sm:gap-3">
                        <a 
                          v-if="item.url"
                          :href="item.url" 
                          target="_blank"
                          class="bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors inline-flex items-center font-medium px-[2.4vw] sm:px-3 py-[1.2vw] sm:py-1.5 text-[2.1vw] sm:text-xs gap-[0.9vw] sm:gap-1.5"
                          @click.stop
                        >
                          <Icon name="mdi:download" class="text-[2.7vw] sm:text-sm" />
                          Descargar
                        </a>
                        <span v-else class="text-gray-300 text-[1.8vw] sm:text-xs">Sin PDF</span>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Sin datos -->
                  <tr v-if="obtenerDocumentosOrdenados(tab.key).length === 0">
                    <td colspan="4" class="text-center py-[4vw] sm:py-8 text-gray-500 text-[2.7vw] sm:text-sm">
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
      <div class="mt-[6vw] sm:mt-8 bg-gray-50 rounded-xl border border-gray-200 px-[3vw] sm:px-5 py-[2.4vw] sm:py-3">
        <div class="flex flex-wrap items-center gap-[3vw] sm:gap-4">
          <span class="font-semibold text-gray-700 text-[2.1vw] sm:text-sm">Tipos de Actividades:</span>
          <span class="flex items-center gap-[1.2vw] sm:gap-2">
            <span class="rounded-full w-[2.1vw] sm:w-2.5 h-[2.1vw] sm:h-2.5 bg-blue-500"></span>
            <span class="text-[1.8vw] sm:text-xs text-gray-600">Relevamientos de Información</span>
          </span>
          <span class="flex items-center gap-[1.2vw] sm:gap-2">
            <span class="rounded-full w-[2.1vw] sm:w-2.5 h-[2.1vw] sm:h-2.5 bg-green-500"></span>
            <span class="text-[1.8vw] sm:text-xs text-gray-600">Informes de Seguimientos</span>
          </span>
          <span class="flex items-center ml-auto gap-[0.9vw] sm:gap-1">
            <span class="text-[1.65vw] sm:text-xs text-gray-400">💡 Haz clic en cualquier fila para ver el PDF</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtrasActividades',
  data() {
    return {
      tabActivo: 'relevamientos',
      tabs: [
        { key: 'relevamientos', nombre: 'Relevamientos de Información', icono: 'mdi:clipboard-search' },
        { key: 'seguimientos', nombre: 'Informes de Seguimientos', icono: 'mdi:file-check' }
      ],
      actividades: {
        relevamientos: [
          {
            titulo: 'INF-UAI-REL-N°001-2025',
            gestion: 2025,
            descripcion: 'RELEVAMIENTO DE INFORMACIÓN ESPECIFICA – ADMINISTRACIÓN Y REPOSICIÓN DE ACTIVOS FIJOS',
            url: 'https://apisi.senado.gob.bo/images/a01d7987-0118-4533-878a-911a49e059fd_1760484533.pdf'
          },
          {
            titulo: 'INF-UAI-REL.-N°002-2024',
            gestion: 2024,
            descripcion: 'RELEVAMIENTO DE INFORMACION AL SERVICIO DE SEGURIDAD FISICA ESTATAL, GESTION 2023',
            url: 'https://apisi.senado.gob.bo/images/9dfc2285-f565-4475-8812-e326d653cf05_1737062365.pdf'
          },
          {
            titulo: 'INF-UAI-REL.-N° 001-2024',
            gestion: 2024,
            descripcion: 'RELEVAMIENTO DE INFORMACIÓN AL SERVICIO DE FOTOCOPIAS, GESTIÓN 2023',
            url: 'https://apisi.senado.gob.bo/images/9dfb8dec-2166-4196-b2e7-a056ee8306f7_1737037434.pdf'
          }
        ],
        seguimientos: [
          {
            titulo: 'INF/UAI/SCI/N°006/2026',
            gestion: 2026,
            descripcion: 'SEGUNDO SEGUIMIENTO AL INFORME DE CONFIABILIDAD DE ESTADOS FINANCIEROS Y DEFICIENCIAS DE CONTROL INTERNO DE LA CÁMARA DE SENADORES, GESTIÓN 2023',
            url: 'https://apisi.senado.gob.bo/images/a253fd6e-f2f0-43be-89b7-63bafe2a5a23_1784816178.pdf'
          },
          {
            titulo: 'INF/UAI/SCI/N°005/2026',
            gestion: 2026,
            descripcion: 'PRIMER SEGUIMIENTO AL INFORME DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS Y LAS DEFICIENCIAS DE CONTROL INTERNO DE LA CÁMARA DE SENADORES, GESTIÓN 2024',
            url: 'https://apisi.senado.gob.bo/images/a253fb9f-c3aa-4a30-8576-9d289add9a0f_1784815875.pdf'
          },
          {
            titulo: 'INF/UAI/SCI/N°004/2026',
            gestion: 2026,
            descripcion: 'SEGUNDOSEGUIMIENTO AL INFORME DE CONTROL INTERNO DE LA AUDITORIA OPERACIONAL SOBRE LA EFICACIA DE LAS ACTIVIDADES PROGRAMADAS QUE EJECUTO LA UNIDAD DE EVALUACIÓN, DESARROLLO Y CAPACITACIÓN DEL PERSONAL DE LA CÁMARA DE SENADORES, GESTIÓN 2022',
            url: 'https://apisi.senado.gob.bo/images/a253fa4c-9669-4019-82f7-0c8682780024_1784815653.pdf'
          },
          {
            titulo: 'INF/UAI/SCI/N°003/2026',
            gestion: 2026,
            descripcion: 'SEGUNDO SEGUIMIENTO AL INFORME DE CONTROL INTERNO RESULTADO DE LA AUDITORIA DE CUMPLIMIENTO A LOS GASTOS EJECUTADOS CON FONDOS EN AVANCE Y FONDO ROTATIVO DE LA CAMARA DE SENADORES, GESTION 2022',
            url: 'https://apisi.senado.gob.bo/images/a253f910-b994-4de7-813c-31a34cf54dfe_1784815446.pdf'
          },
          {
            titulo: 'INF/UAI/SCI/N°002/2026',
            gestion: 2026,
            descripcion: 'SEGUNDO SEGUIMIENTO AL INFORME DE CONFIABILIDAD DE REGISTROS Y DEFICIENCIAS DE CONTROL INTERNO DE LA CAMARA DE SENADORES, GESTION 2023',
            url: 'https://apisi.senado.gob.bo/images/a253f754-b5ff-457c-8683-ec588ca99c1e_1784815155.pdf'
          },
          {
            titulo: 'INF/UAI/SCI/N°001/2026',
            gestion: 2026,
            descripcion: 'PRIMER SEGUIMIENTO AL INFORME DE CONFIABILIDAD DE REGISTROS Y DEFICIENCIAS DE CONTROL INTERNO DE LA CAMARA DE SENADORES, GESTION 2024',
            url: 'https://apisi.senado.gob.bo/images/a253f630-5f57-493d-b332-39ed086f6383_1784814963.pdf'
          },
          {
            titulo: 'POA 2026 (REFORMULADO)',
            gestion: 2026,
            descripcion: 'PLAN OPERATIVO ANUAL (POA 2026 - REFORMULADO)',
            url: 'https://apisi.senado.gob.bo/images/a2540509-cabb-492b-b139-2aab331738a8_1784817454.pdf'
          },
          {
            titulo: 'INF-UAI-SCI-N°007-2025',
            gestion: 2025,
            descripcion: 'SEGUNDO SEGUIMIENTO AL INFORME DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS Y LAS DEFICIENCIAS DE CONTROL INTERNO DE LA CÁMARA DE SENADORES, GESTIÓN 2022',
            url: 'https://apisi.senado.gob.bo/images/a03b868a-b47b-45b3-9513-1d8aeec2971d_1761775207.pdf'
          },
          {
            titulo: 'INF-UAI-SCI-N°006-2025',
            gestion: 2025,
            descripcion: 'SEGUNDO SEGUIMIENTO AL INFORME DE REVISIÓN ANUAL AL CUMPLIMIENTO DEL PROCEDIMIENTO PARA EL CONTROL OPORTUNO DE LAS DECLARACIONES JURADAS DE BIENES Y RENTAS DE LA CÁMARA DE SENADORES, GESTIÓN 2022',
            url: 'https://apisi.senado.gob.bo/images/a02b7552-fafc-4be9-a7bc-e5a2bb9d3a2c_1761085124.pdf'
          },
          {
            titulo: 'INF-UAI-SCI-N°005-2025',
            gestion: 2025,
            descripcion: 'PRIMER SEGUIMIENTO AL INFORME DE CONTROL INTERNO DE LA AUDITORÍA OPERACIONAL SOBRE LA EFICACIA DE LAS ACTIVIDADES PROGRAMADAS QUE EJECUTO LA UNIDAD DE EVALUACIÓN, DESARROLLO Y CAPACITACIÓN DEL PERSONAL DE LA CÁMARA DE SENADORES, GESTIÓN 2022',
            url: 'https://apisi.senado.gob.bo/images/9fe4e65a-401f-4358-9d8c-616e0e75a1cd_1758054660.pdf'
          },
          {
            titulo: 'UAI-NRO225/2025',
            gestion: 2025,
            descripcion: '1er Seguimento al Informe de Confiabilidad de los Estados Financieros y las Deficiencias de Control Interno de la CS, 2023',
            url: 'https://apisi.senado.gob.bo/images/9f59bff2-014c-421c-b7c5-3b0d79e551a3_1752078212.pdf'
          },
          {
            titulo: 'POA 2026',
            gestion: 2025,
            descripcion: 'PLAN OPERATIVO ANUAL - GESTION 2026',
            url: 'https://apisi.senado.gob.bo/images/a0dff120-d778-4550-9276-31221fbec2df_1768836836.pdf'
          },
          {
            titulo: 'INF-UAI-SCI-N°004-2024',
            gestion: 2024,
            descripcion: 'PRIMER SEGUIMIENTO A DECLARACIONES JURADAS DE BIENES Y RENTAS , GESTION 2022',
            url: 'https://apisi.senado.gob.bo/images/9ecb6d3a-458c-464a-8c53-059b0eff8b52_1745965480.pdf'
          },
          {
            titulo: 'UAI-NRO224/2025',
            gestion: 2023,
            descripcion: '1er Seguimiento al Informe de Confiabilidad de los Registros y Deficiencia de control interno Camara Senadores 2023',
            url: 'https://apisi.senado.gob.bo/images/9f59be72-6329-4d56-ad08-e995f3440b99_1752077960.pdf'
          },
          {
            titulo: 'UAI-NRO226/2025',
            gestion: 2022,
            descripcion: '2do Seguimiento al Informe de Confiabilidad de los Registros y Deficiencia de control interno Camara Senadores 2022',
            url: 'https://apisi.senado.gob.bo/images/9f59c29c-486a-4642-8f05-69ab3f784345_1752078659.pdf'
          },
          {
            titulo: 'UAI-NRO226/2025',
            gestion: 2022,
            descripcion: '1er Seguimiento al Informe de Control interno cumplimineto de gastos ejecutados con fondos en avance y fondo rotativo de la Camara Senadores 2022',
            url: 'https://apisi.senado.gob.bo/images/9f59c666-e38d-4337-be56-123c584ce031_1752079295.pdf'
          },
          {
            titulo: 'UAI-N° 008-2014',
            gestion: 2014,
            descripcion: 'PRIMER SEGUIMIENTO A LA IMPLANTACIÓN, INF. UAI-N° 002-2012 2011 Y 30 DE JUNIO DE',
            url: 'https://apisi.senado.gob.bo/images/9d5c90ed-034a-4350-8d53-5c5e2c75c3b1_1730208940.pdf'
          }
        ]
      }
    }
  },
  computed: {
    totalActividades() {
      return this.actividades.relevamientos.length + this.actividades.seguimientos.length
    }
  },
  methods: {
    obtenerDocumentosOrdenados(tipo) {
      const docs = this.actividades[tipo] || []
      return [...docs].sort((a, b) => b.gestion - a.gestion)
    },
    obtenerTotalPorTipo(tipo) {
      return this.actividades[tipo]?.length || 0
    },
    obtenerUltimoAnio(tipo) {
      const docs = this.actividades[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
      return Math.max(...anios)
    },
    obtenerAniosUnicos(tipo) {
      const docs = this.actividades[tipo] || []
      if (docs.length === 0) return 0
      const anios = new Set(docs.map(d => d.gestion))
      return anios.size
    },
    obtenerRangoAnios(tipo) {
      const docs = this.actividades[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
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
  margin-left: auto;
  margin-right: auto;
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
</style>