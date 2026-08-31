<!-- pages/auditoria/otras-actividades.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:file-multiple" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">OTRAS ACTIVIDADES</span>
            </div>
            
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              Otras <span class="text-senado-gold">Actividades</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalActividades }}</span>
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

          <!-- Tabla de documentos (estilo tabla) -->
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
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Gestión</th>
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
                      <span class="font-bold" style="font-size: 0.90vw;">{{ item.gestion }}</span>
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
          <span class="font-semibold text-gray-700" style="font-size: 0.7vw;">Tipos de Actividades:</span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #3b82f6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Relevamientos de Información</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #22c55e;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Informes de Seguimientos</span>
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
  name: 'OtrasActividades',
  data() {
    return {
      tabActivo: 'relevamientos',
      tabs: [
        { key: 'relevamientos', nombre: 'Relevamientos de Información', icono: 'mdi:clipboard-search' },
        { key: 'seguimientos', nombre: 'Informes de Seguimientos', icono: 'mdi:file-check' }
      ],
      // 🔥 DATOS COMPLETOS DESDE LOS HTML
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