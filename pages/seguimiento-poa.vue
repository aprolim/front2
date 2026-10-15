<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:chart-line" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">SEGUIMIENTO Y EVALUACIÓN</span>
            </div>
            <h1 class="font-bold my-[.25em] leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              Seguimiento y Evaluación <span class="text-senado-gold">del POA</span>
            </h1>
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              AVANCE FÍSICO Y FINANCIERO — GESTIÓN 2026
            </p>
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

      <!-- Tabs de trimestres -->
      <div class="flex flex-wrap gap-[2.4vw] sm:gap-3 mb-[4.5vw] sm:mb-6">
        <button
          v-for="t in trimestres"
          :key="t.key"
          type="button"
          @click="seleccionarTrimestre(t.key)"
          class="px-[4vw] sm:px-5 py-[2vw] sm:py-2.5 rounded-lg font-semibold transition-all text-[2.7vw] sm:text-sm flex items-center gap-[1.5vw] sm:gap-2"
          :class="trimestreActivo === t.key
            ? 'bg-senado-primary text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'"
        >
          <Icon name="mdi:calendar-range" class="text-[3.6vw] sm:text-base" />
          {{ t.nombre }}
        </button>
      </div>

      <!-- Contenido del trimestre activo -->
      <div v-if="trimestreActual" :key="trimestreActual.key">

        <!-- Resumen general -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-4">
            <div class="text-[5.4vw] sm:text-2xl font-bold text-senado-primary">{{ trimestreActual.resumen.avanceFisico }}%</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm mt-1">Avance Físico</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-4">
            <div class="text-[5.4vw] sm:text-2xl font-bold text-green-600">{{ trimestreActual.resumen.avanceFinanciero }}%</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm mt-1">Avance Financiero</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-4">
            <div class="text-[4.2vw] sm:text-xl font-bold text-gray-700">{{ formatBs(trimestreActual.resumen.presupuesto) }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm mt-1">Presupuesto</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-4">
            <div class="text-[4.2vw] sm:text-xl font-bold text-blue-600">{{ formatBs(trimestreActual.resumen.ejecutado) }}</div>
            <p class="text-gray-500 text-[2.1vw] sm:text-sm mt-1">Ejecutado</p>
          </div>
        </div>

        <!-- Tabla por Acción de Corto Plazo -->
        <div v-for="(accion, idx) in trimestreActual.acciones" :key="`${trimestreActual.key}-accion-${idx}`"
             class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-[4.5vw] sm:mb-6">

          <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
            <div class="flex items-start gap-[2vw] sm:gap-3">
              <span class="bg-senado-gold text-senado-primary-dark font-bold rounded-full w-[6vw] sm:w-8 h-[6vw] sm:h-8 flex items-center justify-center flex-shrink-0 text-[3vw] sm:text-sm">
                {{ idx + 1 }}
              </span>
              <div class="flex-1">
                <p class="text-white/60 text-[1.8vw] sm:text-xs uppercase tracking-wider mb-[0.5vw] sm:mb-0.5">Acción de Corto Plazo</p>
                <h3 class="font-semibold text-white text-[2.7vw] sm:text-sm leading-snug">{{ accion.descripcion }}</h3>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-[2.4vw] sm:text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">Categoría Programática</th>
                  <th class="text-left px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">Descripción</th>
                  <th class="text-center px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">% Físico</th>
                  <th class="text-center px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">% Financiero</th>
                  <th class="text-right px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">Presupuesto (Bs)</th>
                  <th class="text-right px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 font-semibold text-gray-600">Ejecutado (Bs)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fila, i) in accion.filas" :key="`${trimestreActual.key}-${idx}-${i}`"
                    class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-gray-500 font-mono">{{ fila.codigo }}</td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-gray-800">{{ fila.descripcion }}</td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-center">
                    <span class="inline-block px-[1.8vw] sm:px-2 py-[0.3vw] sm:py-0.5 rounded-full text-[2.1vw] sm:text-xs"
                          :class="getBadgeClass(fila.fisico)">
                      {{ fila.fisico }}%
                    </span>
                  </td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-center font-medium text-gray-700">{{ fila.financiero }}%</td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-right text-gray-700">{{ formatBs(fila.presupuesto) }}</td>
                  <td class="px-[2.4vw] sm:px-3 py-[1.8vw] sm:py-2 text-right text-gray-700 font-medium">{{ formatBs(fila.ejecutado) }}</td>
                </tr>
                <tr class="bg-gray-100 font-bold text-gray-800">
                  <td colspan="2" class="px-[2.4vw] sm:px-3 py-[2vw] sm:py-2.5 text-right">Total</td>
                  <td class="px-[2.4vw] sm:px-3 py-[2vw] sm:py-2.5 text-center text-senado-primary">{{ accion.totalFisico }}%</td>
                  <td class="px-[2.4vw] sm:px-3 py-[2vw] sm:py-2.5 text-center text-green-700">{{ accion.totalFinanciero }}%</td>
                  <td class="px-[2.4vw] sm:px-3 py-[2vw] sm:py-2.5 text-right">{{ formatBs(accion.totalPresupuesto) }}</td>
                  <td class="px-[2.4vw] sm:px-3 py-[2vw] sm:py-2.5 text-right text-blue-700">{{ formatBs(accion.totalEjecutado) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Total General -->
        <div class="bg-gradient-to-r from-senado-primary to-senado-primary-dark rounded-xl shadow-lg p-[4vw] sm:p-6 text-white">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-4">
            <div class="flex items-center gap-[2vw] sm:gap-3">
              <Icon name="mdi:sigma" class="text-senado-gold text-[8vw] sm:text-3xl" />
              <h3 class="font-bold text-[3.6vw] sm:text-lg">Total General</h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-[3vw] sm:gap-6 w-full sm:w-auto">
              <div class="text-center sm:text-right">
                <div class="text-[4.2vw] sm:text-xl font-bold text-senado-gold">{{ trimestreActual.resumen.avanceFisico }}%</div>
                <p class="text-white/60 text-[1.8vw] sm:text-xs">Físico</p>
              </div>
              <div class="text-center sm:text-right">
                <div class="text-[4.2vw] sm:text-xl font-bold text-green-300">{{ trimestreActual.resumen.avanceFinanciero }}%</div>
                <p class="text-white/60 text-[1.8vw] sm:text-xs">Financiero</p>
              </div>
              <div class="text-center sm:text-right">
                <div class="text-[3vw] sm:text-base font-bold">{{ formatBs(trimestreActual.resumen.presupuesto) }}</div>
                <p class="text-white/60 text-[1.8vw] sm:text-xs">Presupuesto</p>
              </div>
              <div class="text-center sm:text-right">
                <div class="text-[3vw] sm:text-base font-bold text-blue-200">{{ formatBs(trimestreActual.resumen.ejecutado) }}</div>
                <p class="text-white/60 text-[1.8vw] sm:text-xs">Ejecutado</p>
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-gray-400 text-[2.1vw] sm:text-xs mt-[3vw] sm:mt-4">
          Fuente: Reporte de Seguimiento y Evaluación al {{ trimestreActual.nombre }} — Gestión 2026
        </p>
      </div>

      <div class="text-center mt-[6vw] sm:mt-8">
        <NuxtLink to="/" class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-base font-medium">
          <Icon name="mdi:arrow-left" class="text-[4vw] sm:text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const trimestreActivo = ref('t1')

const trimestreActual = computed(() => {
  return trimestres.find(t => t.key === trimestreActivo.value) || trimestres[0]
})

const seleccionarTrimestre = (key) => {
  trimestreActivo.value = key
}

const trimestres = [
  {
    key: 't1',
    nombre: 'Primer Trimestre 2026',
    resumen: {
      avanceFisico: 17.47,
      avanceFinanciero: 16.91,
      presupuesto: 88555306,
      ejecutado: 14977526.13,
    },
    acciones: [
      {
        descripcion: 'Coadyuvar a la arquitectura del Estado en el 2026; a través de la aprobación, sanción o rechazo del 100% de los proyectos de ley, instrumentos de gestión parlamentaria e instrumentos de fiscalización de manera democrática y participativa.',
        filas: [
          { codigo: '51', descripcion: '01 Directiva Camaral', fisico: 5.64, financiero: 5.64, presupuesto: 351600, ejecutado: 19813 },
          { codigo: '51', descripcion: '02 Secretaría General', fisico: 30.90, financiero: 11.91, presupuesto: 201500, ejecutado: 24000 },
          { codigo: '51', descripcion: '03 Comisiones', fisico: 4.75, financiero: 4.75, presupuesto: 730500, ejecutado: 34695 },
          { codigo: '51', descripcion: '04 Cómites', fisico: 3.39, financiero: 3.39, presupuesto: 1120240, ejecutado: 38007.50 },
          { codigo: '51', descripcion: '05 Bancadas Políticas', fisico: 0, financiero: 0, presupuesto: 16100, ejecutado: 0 },
          { codigo: '51', descripcion: '06 Brigadas Parlamentarias', fisico: 3.73, financiero: 3.73, presupuesto: 437697, ejecutado: 16306.82 },
          { codigo: '51', descripcion: '09 Area Legislativa - Personal Eventual CS', fisico: 12.85, financiero: 12.85, presupuesto: 28130098, ejecutado: 3614728.97 },
        ],
        totalFisico: 10.40,
        totalFinanciero: 12.09,
        totalPresupuesto: 30987735,
        totalEjecutado: 3747551.29,
      },
      {
        descripcion: "Administrar la Cámara de Senadores en la gestión 2026, de manera eficiente, eficaz, económicamente y transparente, a través de la implementación progresiva de herramientas TIC's y mejora de la gestión pública mediante la implementación de los sistemas y reglamentos de la Ley N° 1178.",
        filas: [
          { codigo: '1', descripcion: '01 Administración Central', fisico: 23.64, financiero: 16.13, presupuesto: 53252546, ejecutado: 8590545.06 },
          { codigo: '1', descripcion: '07 Administración Nuevo Edificio ALP', fisico: 100.0, financiero: 96.54, presupuesto: 2519615, ejecutado: 2432410 },
          { codigo: '99', descripcion: 'Participación y Control Social', fisico: 0, financiero: 0, presupuesto: 41000, ejecutado: 0 },
          { codigo: '91', descripcion: 'Personal Discapacitado', fisico: 11.80, financiero: 11.80, presupuesto: 1754410, ejecutado: 207019.78 },
        ],
        totalFisico: 23.99,
        totalFinanciero: 19.51,
        totalPresupuesto: 57567571,
        totalEjecutado: 11229974.84,
      },
    ],
  },
  {
    key: 't2',
    nombre: 'Segundo Trimestre 2026',
    resumen: {
      avanceFisico: 39.03,
      avanceFinanciero: 38.87,
      presupuesto: 88555306,
      ejecutado: 34417987.14,
    },
    acciones: [
      {
        descripcion: 'Coadyuvar a la arquitectura del Estado en el 2026; a través de la aprobación, sanción o rechazo del 100% de los proyectos de ley, instrumentos de gestión parlamentaria e instrumentos de fiscalización de manera democrática y participativa.',
        filas: [
          { codigo: '51', descripcion: '01 Directiva Camaral', fisico: 10.31, financiero: 10.31, presupuesto: 351600, ejecutado: 36242 },
          { codigo: '51', descripcion: '02 Secretaría General', fisico: 53.40, financiero: 23.77, presupuesto: 201500, ejecutado: 47900 },
          { codigo: '51', descripcion: '03 Comisiones', fisico: 23.44, financiero: 23.44, presupuesto: 730500, ejecutado: 171244 },
          { codigo: '51', descripcion: '04 Cómites', fisico: 12.31, financiero: 12.31, presupuesto: 1120240, ejecutado: 137922 },
          { codigo: '51', descripcion: '05 Bancadas Políticas', fisico: 0, financiero: 0, presupuesto: 16100, ejecutado: 0 },
          { codigo: '51', descripcion: '06 Brigadas Parlamentarias', fisico: 19.77, financiero: 19.77, presupuesto: 437697, ejecutado: 86553.35 },
          { codigo: '51', descripcion: '09 Area Legislativa - Personal Eventual CS', fisico: 40.33, financiero: 34.50, presupuesto: 28130098, ejecutado: 9706176.39 },
        ],
        totalFisico: 30.04,
        totalFinanciero: 32.87,
        totalPresupuesto: 30987735,
        totalEjecutado: 10186037.74,
      },
      {
        descripcion: "Administrar la Cámara de Senadores en la gestión 2026, de manera eficiente, eficaz, económicamente y transparente, a través de la implementación progresiva de herramientas TIC's y mejora de la gestión pública mediante la implementación de los sistemas y reglamentos de la Ley N° 1178.",
        filas: [
          { codigo: '1', descripcion: '01 Administración Central', fisico: 47.47, financiero: 39.88, presupuesto: 53252546, ejecutado: 21238591.35 },
          { codigo: '1', descripcion: '07 Administración Nuevo Edificio ALP', fisico: 100.0, financiero: 99.98, presupuesto: 2519615, ejecutado: 2519057.50 },
          { codigo: '99', descripcion: 'Participación y Control Social', fisico: 0, financiero: 0, presupuesto: 41000, ejecutado: 0 },
          { codigo: '91', descripcion: 'Personal Discapacitado', fisico: 27.03, financiero: 27.03, presupuesto: 1754410, ejecutado: 474300.55 },
        ],
        totalFisico: 47.34,
        totalFinanciero: 42.09,
        totalPresupuesto: 57567571,
        totalEjecutado: 24231949.40,
      },
    ],
  },
]

const formatBs = (n) => {
  if (n === undefined || n === null) return '0'
  return new Intl.NumberFormat('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

const getBadgeClass = (valor) => {
  // if (valor >= 75) return 'bg-green-100 text-green-700'
  // if (valor >= 50) return 'bg-blue-100 text-blue-700'
  // if (valor >= 25) return 'bg-yellow-100 text-yellow-700'
  // return 'bg-gray-100 text-gray-600'
  return ''
}

useHead({
  title: 'Seguimiento y Evaluación del POA | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Avance físico y financiero del Plan Operativo Anual (POA) 2026 de la Cámara de Senadores - Seguimiento trimestral.' },
  ],
})
</script>