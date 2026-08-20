<!-- pages/auditoria/auditorias-ejecutadas.vue -->
<template>
  <div class="min-h-screen bg-gray-50" style="font-size: 1vw;">
    <!-- Hero / Banner -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4" style="max-width: 90vw; padding: 2.5vw 0;">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between" style="gap: 1.5vw;">
          <div>
            <!-- Badge -->
            <div class="inline-flex items-center bg-white/10 rounded-full" style="gap: 0.4vw; padding: 0.2vw 0.8vw; margin-bottom: 0.5vw;">
              <Icon name="mdi:file-search" class="text-senado-gold" style="font-size: 1.2vw;" />
              <span class="text-white/80 tracking-wider font-medium" style="font-size: 0.7vw;">AUDITORÍAS</span>
            </div>
            
            <h1 class="font-bold leading-tight" style="font-size: 3.5vw;">
              Auditorías <span class="text-senado-gold">Ejecutadas</span>
            </h1>
            
            <p class="text-white/60 tracking-widest font-light" style="font-size: 0.9vw;">
              UNIDAD DE AUDITORÍA INTERNA
            </p>
          </div>
          
          <!-- Resumen -->
          <div class="flex gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg text-center" style="padding: 0.6vw 1.5vw; min-width: 6vw;">
              <span class="font-bold text-senado-gold" style="font-size: 1.8vw;">{{ totalAuditorias }}</span>
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
      <!-- Tabs de navegación - Versión mejorada clickeable -->
      <div class="grid grid-cols-1 md:grid-cols-3" style="gap: 0.8vw; margin-bottom: 1.5vw;">
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
          <!-- Fondo con gradiente según estado -->
          <div 
            class="absolute inset-0 transition-all duration-300"
            :class="tabActivo === tab.key 
              ? 'bg-gradient-to-r from-senado-primary to-senado-primary-dark' 
              : 'bg-white opacity-100'"
          ></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="flex items-center" style="gap: 0.6vw;">
              <!-- Icono con círculo -->
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
                  style="font-size: 1.10vw;"
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
            
            <!-- Flecha indicadora -->
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

          <!-- Tabla de documentos -->
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
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Código</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Gestión</th>
                    <th class="text-left text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Descripción</th>
                    <th class="text-center text-gray-500 font-semibold uppercase tracking-wider" style="padding: 0.4vw 0.6vw; font-size: 0.85vw;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(item, index) in obtenerDocumentosOrdenados(tab.key)" 
                    :key="index"
                    class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    @click="verPDF(item)"
                  >
                    <td style="padding: 0.35vw 0.6vw;">
                      <span class="font-mono font-medium text-senado-primary" style="font-size: 0.90vw;">{{ item.codigo }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw;">
                      <span class="font-bold" style="font-size: 0.90vw;">{{ item.gestion }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw;">
                      <span style="font-size: 0.90vw; color: #374151;">{{ item.descripcion }}</span>
                    </td>
                    <td style="padding: 0.35vw 0.6vw;">
                      <div class="flex items-center justify-center" style="gap: 0.9vw;">
                        <button 
                          class="text-senado-primary hover:text-senado-primary-dark transition-colors" 
                          title="Ver PDF"
                          @click.stop="verPDF(item)"
                        >
                          <Icon name="mdi:eye" style="font-size: 1.5vw;" />
                        </button>
                        <button 
                          class="text-gray-400 hover:text-gray-600 transition-colors" 
                          title="Descargar PDF"
                          @click.stop="descargarPDF(item)"
                        >
                          <Icon name="mdi:download" style="font-size: 1.5vw;" />
                        </button>
                      </div>
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
          <span class="font-semibold text-gray-700" style="font-size: 0.7vw;">Tipos de Auditoría:</span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #3b82f6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Cumplimiento</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #22c55e;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Operacionales</span>
          </span>
          <span class="flex items-center" style="gap: 0.4vw;">
            <span class="rounded-full" style="width: 0.7vw; height: 0.7vw; background-color: #8b5cf6;"></span>
            <span style="font-size: 0.6vw; color: #4b5563;">Confiabilidad</span>
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
  name: 'AuditoriasEjecutadas',
  data() {
    return {
      tabActivo: 'cumplimiento',
      tabs: [
        { key: 'cumplimiento', nombre: 'Auditorías de Cumplimiento', icono: 'mdi:clipboard-check' },
        { key: 'operacionales', nombre: 'Auditorías Operacionales', icono: 'mdi:cog' },
        { key: 'confiabilidad', nombre: 'Auditorías de Confiabilidad', icono: 'mdi:shield-check' }
      ],
      auditorias: {
        cumplimiento: [
          { codigo: 'UAI/ACU/CI-002/2025', gestion: 2025, descripcion: 'INFORME DE CONTROL INTERNO PRODUCTO DE LA AUDITORIA DE CUMPLIMIENTO AL SISTEMA DE PRESUPUESTOS DE LA CAMARA DE SENADORES - GESTION 2024' },
          { codigo: 'UAI/ACU/CI-001/2025', gestion: 2025, descripcion: 'INFORME DE CONTROL INTERNO PRODUCTO DE LA AUDITORIA DE CUMPLIMIENTO AL PROCEDIMIENTO ESPECÍFICO PARA EL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS EN LAS PLANILLASSALARIALES Y LOS REGISTROS INDIVIDUALES Y PROCEDIMIENTOS IMPLANTADOS PARA EVITAR LA DOBLE PERCEPCIÓN POR PARTE DEL PERSONAL PERMANENTE Y EVENTUAL DE LA CÁMARA DE SENADORES - GESTIÓN 2024' },
          { codigo: 'INF-UAI-VC-N° 001-2024', gestion: 2024, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS' },
          { codigo: 'INF-UAI-VC-N° 002-2023', gestion: 2023, descripcion: 'REVISIÓN ANUAL DJBR 2022' },
          { codigo: 'INF-UAI-VC-N° 001-2023', gestion: 2023, descripcion: 'VERIFICACION DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACION DE DATOS LIQUIDADOS' },
          { codigo: 'INF-UAI-CI-N° 004-2023', gestion: 2023, descripcion: 'INF. CONTROL INTERNO AUD. CUMP. FONDOS EN AVANCE Y FONDO ROTATIVO GESTIÓN 2022' },
          { codigo: 'INF-UAI-VC-N° 002-2022', gestion: 2022, descripcion: 'REVISIÓN ANUAL DJBR 2021' },
          { codigo: 'INF-UAI-VC-N° 001-2022', gestion: 2022, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS' },
          { codigo: 'INF-UAI-CV-N° 002-2021', gestion: 2021, descripcion: 'REVISIÓN ANUAL DJBR 2020' },
          { codigo: 'INF-UAI-CV N° 001-2021', gestion: 2021, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS' },
          { codigo: 'INF-UAI-VC-N° 002-2020', gestion: 2020, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL PROCEDIMIENTO ESPECIFICO PARA EL CONTROL Y' },
          { codigo: 'INF-UAI-VC-N° 001-2020', gestion: 2020, descripcion: 'REVISIÓN ANUAL DECLARACIONES JURADAS DE BIENES Y RENTAS GESTIÓN 2019' },
          { codigo: 'INF-UAI-PREL.-N° 001-2020', gestion: 2020, descripcion: 'INF. PREL. AUDITORIA ESPECIAL AL PROCESO DE CONCENTRACIÓN Y PAGOS EMERGENTES DE' },
          { codigo: 'INF-UAI-VC-N° 002-2019', gestion: 2019, descripcion: 'REVISIÓN ANUAL-DECLARACIONES JURADAS DE BIENES Y RENTAS, GESTION 2018' },
          { codigo: 'INF-UAI-VC-N° 001-2019', gestion: 2019, descripcion: 'VERIFICACIÓN DEL CUMPLIMIENTO DEL CONTROL Y CONCILIACIÓN DE DATOS LIQUIDADOS' },
          { codigo: 'INF-UAI-PREL.-N° 001-2019', gestion: 2019, descripcion: 'INF. PREL. AUDITORIA ESPECIAL PAGO POR DEMANDA DE REINCORPORACIÓN' },
          { codigo: 'INF-UAI-COM-N° 001-2019', gestion: 2019, descripcion: 'INF. COMPLEMENTARIO AUDITORIA ESPECIAL IMPUESTOS RC-IVA 1994' },
          { codigo: 'INF-UAI-AE-N° 001-2018', gestion: 2018, descripcion: 'AUDITORIA ESPECIAL SOBRE EL CUMPLIMIENTO DE DATOS LIQUIDADOS DE PLANILLAS SALA' },
          { codigo: 'INF-UAI-CI-N° 003-2016', gestion: 2016, descripcion: 'AUDITORIA ESPECIAL PROCEDIMIENTO DJBR 2015' },
          { codigo: 'INF-UAI-CI-N° 005-2015', gestion: 2015, descripcion: 'AUDITORIA ESPECIAL PROCEDIMIENTO DJBR 2014' }
        ],
        operacionales: [
          { codigo: 'INF-UAI-P-N° 002-2023', gestion: 2023, descripcion: 'PRONUNCIAMENTO SOBRE LA AUD. OP. SOBRE LA EFICACIA DE LAS ACTIVIDADES DE LA UNI.' },
          { codigo: 'INF-UAI-CI-N° 003/2023', gestion: 2023, descripcion: 'INF. CONTROL INTERNO AUD. OP. SOBRE LA EFICACIA DE LAS ACTIVIDADES DE LA UNI' },
          { codigo: 'INF-UAI-SY-N° 002-2016', gestion: 2017, descripcion: 'EVALUACIÓN DEL SISTEMA DE PROGRAMACIÓN DE OPERACIÓN 2015' },
          { codigo: 'INF-UAI-SY-N° 001-2016', gestion: 2017, descripcion: 'EVALUACIÓN DEL SISTEMA DE PRESUPUESTOS 2015, 2016' },
          { codigo: 'INF-UAI-OP-N° 001-2016', gestion: 2016, descripcion: 'AUDITORIA OPERATIVA AL PROCESO DE ASESORAMIENTO EN LOS PROCESOS DE COMPRAS Y' },
          { codigo: 'INF-UAI-OP-N° 001-2015', gestion: 2016, descripcion: 'AUDITORIA OPERATIVA A LA UNIDAD DE ANÁLISIS LEGISLATIVO 2014' },
          { codigo: 'INF-UAI-SY-N° 001-2015', gestion: 2015, descripcion: 'EVALUACIÓN DEL SISTEMA DE PROGRAMACIÓN DE OPERACINES 2014, FORMULACIÓN DEL' }
        ],
        confiabilidad: [
          { codigo: 'UAI/CI/01/2026', gestion: 2026, descripcion: 'INFORME DE CONFIABILIDAD DE LOS REGISTROS DE LA CÁMARA DE SENADORES Y DEFICIENCIAS DE CONTROL INTERNO EMERGENTES DE SU EVALUACIÓN CORRESPONDIENTES A LA GESTIÓN 2025' },
          { codigo: 'INF-UAI-P-N°002-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS Y LAS DEFICIENCIAS DE CONTROL INTERNO DE LA ASAMBLEA LEGISLATIVA PLURINACIONAL DE BOLIVIA, GESTION 2024' },
          { codigo: 'INF-UAI-P-N°001-2025', gestion: 2025, descripcion: 'PRONUNCIAMIENTO SOBRE LA CONFIABILIDAD, GESTIÓN 2024' },
          { codigo: 'INF-UAI-CI-N°002-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE ESTADOS FINANCIEROS 2024' },
          { codigo: 'INF-UAI-CI-N°001-2025', gestion: 2025, descripcion: 'INFORME DE CONFIABILIDAD DE REGISTROS 2024' },
          { codigo: 'INF-UAI-CI-N° 002-2024', gestion: 2024, descripcion: 'EXAMEN DE CONFIABILIDAD 2023' },
          { codigo: 'INF-UAI-P-N° 001-2023', gestion: 2023, descripcion: 'PRONUNCIAMIENTO DEL EXAMEN DE CONFIABILIDAD 2022' },
          { codigo: 'INF-UAI-CI-N° 002-2023', gestion: 2023, descripcion: 'EXAMEN DE CONFIABILIDAD 20222' },
          { codigo: 'INF-UAI-OP-N° 001-2022', gestion: 2022, descripcion: 'OPINIÓN CONFIA 2021' },
          { codigo: 'INF-UAI-CI-N° 001-2022', gestion: 2022, descripcion: 'EXAMEN DE CONFIABILIDAD 2021' },
          { codigo: 'INF-UAI-OP-N° 002-2021', gestion: 2021, descripcion: 'OPINIÓN CONFIA 2020-2019 (CONSOLIDADO)' },
          { codigo: 'INF-UAI-OP-N° 001-2021', gestion: 2021, descripcion: 'OPINIÓN CONFIA 2020-2019' },
          { codigo: 'INF-UAI-CI-N° 001-2021 (2)', gestion: 2021, descripcion: 'EXAMEN DE CONFIABILIDAD 2020' },
          { codigo: 'INF-UAI-OP-N° 001-2020', gestion: 2020, descripcion: 'OPINIÓN CONFIA 2019-2018' },
          { codigo: 'INF-UAI-CI-N° 001-2020', gestion: 2020, descripcion: 'INF.CONTROL INTERNO DEL EXAMEN DE CONF, EJECUCIÓN PRESUPUESTARIA DE RECURSOS' },
          { codigo: 'INF-UAI-CI-N° 001-2019', gestion: 2019, descripcion: 'EXAMEN DE CONFIABILIDAD-REGISTRO DE EJECUCIÓN PRESUPUESTARIA DE RECURSOS, GAST' },
          { codigo: 'INF-UAI-CI-N° 001-2018', gestion: 2018, descripcion: 'INF. EXAMEN DE CONFIABILIDAD 2017' },
          { codigo: 'INF-UAI-CI-N° 001-2017', gestion: 2017, descripcion: 'INF. CONTROL INTERNO DEL EXAMEN DE CONF. EJECUCIÓN PRESUPUESTARIO DE RECURSOS' },
          { codigo: 'INF-UAI-CI-N° 001-2016', gestion: 2016, descripcion: 'INF. CONTROL INTERNO DEL EXAMEN DE CONF. EJECUCIÓN PRESUPUESTARIO DE RECURSOS' },
          { codigo: 'UAI-INF-O-01-2016', gestion: 2016, descripcion: 'OPINIÓN CONFIA 2015-2014' },
          { codigo: 'UAI-N° 02-2015', gestion: 2015, descripcion: 'INF. AUDITOR INTERNO, EXAMEN DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS 2014' },
          { codigo: 'INF-UAI-CI-N° 003-2015', gestion: 2015, descripcion: 'INF. CONTROL INTERNO, REGISTROS DE EJECUCIÓN PRESUPUESTARIA DE RECURSOS, GASTOS' },
          { codigo: 'UAI-N° 003-2014', gestion: 2014, descripcion: 'EXAMEN DE CONFIABILIDAD DE LOS ESTADOS FINANCIEROS 2013' }
        ]
      }
    }
  },
  computed: {
    totalAuditorias() {
      return this.auditorias.cumplimiento.length + 
             this.auditorias.operacionales.length + 
             this.auditorias.confiabilidad.length
    }
  },
  methods: {
    obtenerDocumentosOrdenados(tipo) {
      const docs = this.auditorias[tipo] || []
      return [...docs].sort((a, b) => b.gestion - a.gestion)
    },
    obtenerTotalPorTipo(tipo) {
      return this.auditorias[tipo]?.length || 0
    },
    obtenerUltimoAnio(tipo) {
      const docs = this.auditorias[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
      return Math.max(...anios)
    },
    obtenerAniosUnicos(tipo) {
      const docs = this.auditorias[tipo] || []
      if (docs.length === 0) return 0
      const anios = new Set(docs.map(d => d.gestion))
      return anios.size
    },
    obtenerRangoAnios(tipo) {
      const docs = this.auditorias[tipo] || []
      if (docs.length === 0) return '-'
      const anios = docs.map(d => d.gestion)
      const min = Math.min(...anios)
      const max = Math.max(...anios)
      if (min === max) return `${min}`
      return `${min} - ${max}`
    },
    verPDF(item) {
      console.log('Ver PDF:', item)
      alert(`📄 Ver PDF: ${item.codigo}\n\n${item.descripcion}`)
    },
    descargarPDF(item) {
      console.log('Descargar PDF:', item)
      alert(`⬇️ Descargar PDF: ${item.codigo}\n\n${item.descripcion}`)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Transiciones */
.hover\:bg-gray-50\/50:hover {
  background-color: rgba(249, 250, 251, 0.5);
}

/* Efecto hover en filas de tabla */
tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f9fafb;
}

/* Animación de escala en tabs */
.transform {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.group:hover .transform {
  transform: scale(1.02);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>