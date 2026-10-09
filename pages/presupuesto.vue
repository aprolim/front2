<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-r from-senado-primary to-senado-primary-dark text-white">
      <div class="container mx-auto px-4 max-w-[90vw] py-[5vw] sm:py-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[3vw] sm:gap-6">
          <div>
            <div class="inline-flex items-center bg-white/10 rounded-full gap-[1.2vw] sm:gap-1 px-[2.4vw] sm:px-3 py-[0.6vw] sm:py-1 mb-[1.5vw] sm:mb-2">
              <Icon name="mdi:cash-multiple" class="text-senado-gold text-[3.6vw] sm:text-lg" />
              <span class="text-white/80 tracking-wider font-medium text-[2.1vw] sm:text-xs">INFORMACIÓN FINANCIERA</span>
            </div>
            <h1 class="font-bold leading-tight text-[10.5vw] sm:text-4xl md:text-5xl">
              Presupuesto y <span class="text-senado-gold">Ejecución</span>
            </h1>
            <p class="text-white/60 tracking-widest font-light text-[2.7vw] sm:text-sm">
              CÁMARA DE SENADORES — GESTIÓN 2026
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

      <!-- Cards de resumen -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-[2.4vw] sm:gap-4 mb-[4.5vw] sm:mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-5">
          <Icon name="mdi:wallet" class="text-senado-primary text-[6vw] sm:text-3xl mb-[1.5vw] sm:mb-2 mx-auto" />
          <div class="text-[3.6vw] sm:text-lg font-bold text-gray-800">{{ formatBs(presupuestoTotal) }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-1">Presupuesto Asignado (Bs)</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-5">
          <Icon name="mdi:chart-line" class="text-green-600 text-[6vw] sm:text-3xl mb-[1.5vw] sm:mb-2 mx-auto" />
          <div class="text-[3.6vw] sm:text-lg font-bold text-green-700">{{ formatBs(ejecutadoTotal) }}</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-1">Ejecutado (Bs)</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-5">
          <Icon name="mdi:percent" class="text-blue-600 text-[6vw] sm:text-3xl mb-[1.5vw] sm:mb-2 mx-auto" />
          <div class="text-[3.6vw] sm:text-lg font-bold text-blue-700">{{ porcentajeEjecucion }}%</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-1">% Ejecución</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 text-center px-[2.4vw] sm:px-4 py-[3vw] sm:py-5">
          <Icon name="mdi:calendar" class="text-senado-gold text-[6vw] sm:text-3xl mb-[1.5vw] sm:mb-2 mx-auto" />
          <div class="text-[3.6vw] sm:text-lg font-bold text-gray-800">2026</div>
          <p class="text-gray-500 text-[2.1vw] sm:text-xs mt-1">Gestión</p>
        </div>
      </div>

      <!-- Sección: Presupuesto Institucional -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-[4.5vw] sm:mb-6">
        <div class="bg-gradient-to-r from-[#1a3a6c] to-[#0f2347] px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
          <h2 class="font-bold text-white flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:file-document" class="text-senado-gold text-[4.5vw] sm:text-xl" />
            Presupuesto Institucional 2026
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-[2.4vw] sm:text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left px-[2.4vw] sm:px-4 py-[1.8vw] sm:py-2.5 font-semibold text-gray-600">Categoría Programática</th>
                <th class="text-right px-[2.4vw] sm:px-4 py-[1.8vw] sm:py-2.5 font-semibold text-gray-600">Presupuesto (Bs)</th>
                <th class="text-right px-[2.4vw] sm:px-4 py-[1.8vw] sm:py-2.5 font-semibold text-gray-600">Ejecutado (Bs)</th>
                <th class="text-center px-[2.4vw] sm:px-4 py-[1.8vw] sm:py-2.5 font-semibold text-gray-600">% Ejecución</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fila, i) in presupuestoInstitucional" :key="i"
                  class="border-b border-gray-100 hover:bg-gray-50/50">
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-2.5 text-gray-800">{{ fila.categoria }}</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-2.5 text-right text-gray-700">{{ formatBs(fila.presupuesto) }}</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-2.5 text-right text-gray-700">{{ formatBs(fila.ejecutado) }}</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-2.5 text-center">
                  <span class="inline-block px-[2vw] sm:px-2.5 py-[0.3vw] sm:py-1 rounded-full text-[2.1vw] sm:text-xs font-semibold"
                        :class="getBadgeClass(fila.porcentaje)">
                    {{ fila.porcentaje }}%
                  </span>
                </td>
              </tr>
              <tr class="bg-gray-100 font-bold text-gray-800">
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-3">Total</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-3 text-right">{{ formatBs(presupuestoTotal) }}</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-3 text-right">{{ formatBs(ejecutadoTotal) }}</td>
                <td class="px-[2.4vw] sm:px-4 py-[2vw] sm:py-3 text-center text-senado-primary">{{ porcentajeEjecucion }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sección: Fuentes de Financiamiento -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-[4.5vw] sm:mb-6">
        <div class="bg-gradient-to-r from-[#8f1522] to-[#611717] px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
          <h2 class="font-bold text-white flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:source-branch" class="text-senado-gold text-[4.5vw] sm:text-xl" />
            Fuentes de Financiamiento
          </h2>
        </div>
        <div class="p-[4vw] sm:p-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[3vw] sm:gap-4">
            <div v-for="(fuente, i) in fuentesFinanciamiento" :key="i"
                 class="border border-gray-200 rounded-lg p-[3vw] sm:p-4 hover:shadow-sm transition-shadow">
              <div class="flex items-center gap-[2vw] sm:gap-3 mb-[2vw] sm:mb-2">
                <Icon :name="fuente.icono" class="text-senado-primary text-[5.4vw] sm:text-2xl" />
                <h3 class="font-semibold text-gray-800 text-[2.7vw] sm:text-base">{{ fuente.nombre }}</h3>
              </div>
              <p class="text-gray-600 text-[2.4vw] sm:text-sm mb-[1.5vw] sm:mb-2">{{ fuente.descripcion }}</p>
              <p class="text-[3vw] sm:text-base font-bold text-senado-primary">{{ formatBs(fuente.monto) }} Bs</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección: Programas y Proyectos de Inversión -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-[4.5vw] sm:mb-6">
        <div class="bg-gradient-to-r from-[#c9a84c] to-[#8f7320] px-[3.6vw] sm:px-5 py-[2.4vw] sm:py-3">
          <h2 class="font-bold text-white flex items-center gap-[1.5vw] sm:gap-2 text-[3.3vw] sm:text-lg">
            <Icon name="mdi:briefcase" class="text-white text-[4.5vw] sm:text-xl" />
            Programas y Proyectos de Inversión
          </h2>
        </div>
        <div class="p-[4vw] sm:p-5">
          <div class="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg px-[3.6vw] sm:px-4 py-[3vw] sm:py-3">
            <div class="flex items-start gap-[2vw] sm:gap-3">
              <Icon name="mdi:information" class="text-yellow-600 text-[5.4vw] sm:text-xl flex-shrink-0" />
              <p class="text-yellow-800 text-[2.4vw] sm:text-sm leading-relaxed">
                La Cámara de Senadores no cuenta con gastos de inversión pública en la gestión 2026.
                Su presupuesto está destinado íntegramente a gastos de funcionamiento
                (servicios personales, servicios no personales, materiales y suministros, y activos reales).
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Descargas -->
      <div class="bg-senado-gold-lightest rounded-xl border border-senado-gold p-[4vw] sm:p-5 mb-[4.5vw] sm:mb-6">
        <h3 class="font-bold text-senado-primary text-[3vw] sm:text-base mb-[2.4vw] sm:mb-3 flex items-center gap-[1.5vw] sm:gap-2">
          <Icon name="mdi:download" class="text-[4.5vw] sm:text-xl" />
          Documentos Descargables
        </h3>
        <div class="flex flex-wrap gap-[2.4vw] sm:gap-3">
          <a v-for="(doc, i) in documentosDescargables" :key="i"
             :href="doc.url" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-[1.5vw] sm:gap-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors px-[4vw] sm:px-4 py-[2vw] sm:py-2 text-[2.7vw] sm:text-sm font-medium">
            <Icon name="mdi:file-pdf-box" class="text-[4vw] sm:text-base" />
            {{ doc.nombre }}
          </a>
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-[1.5vw] sm:gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-base font-medium">
          <Icon name="mdi:arrow-left" class="text-[4vw] sm:text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const presupuestoTotal = 88555306
const ejecutadoTotal = 34417987.14
const porcentajeEjecucion = 38.87

const presupuestoInstitucional = [
  { categoria: 'Servicios Personales', presupuesto: 62000000, ejecutado: 25000000, porcentaje: 40.32 },
  { categoria: 'Servicios No Personales', presupuesto: 15000000, ejecutado: 6000000, porcentaje: 40.00 },
  { categoria: 'Materiales y Suministros', presupuesto: 6000000, ejecutado: 2100000, porcentaje: 35.00 },
  { categoria: 'Activos Reales', presupuesto: 5555306, ejecutado: 1317987.14, porcentaje: 23.73 },
]

const fuentesFinanciamiento = [
  {
    nombre: 'Tesoro General de la Nación (TGN)',
    descripcion: 'Recursos asignados por el Tesoro General de la Nación para el funcionamiento institucional.',
    monto: 88555306,
    icono: 'mdi:bank',
  },
]

const documentosDescargables = [
  { nombre: 'Presupuesto 2026', url: '/pdfs/presupuesto/Presupuesto_2026.pdf' },
  { nombre: 'Ejecución Presupuestaria 2T 2026', url: '/pdfs/presupuesto/Ejecucion_2T_2026.pdf' },
  { nombre: 'Seguimiento POA 1T 2026', url: '/pdfs/presupuesto/Seguimiento_1T_2026.pdf' },
]

const formatBs = (n) => {
  if (n === undefined || n === null) return '0,00'
  return new Intl.NumberFormat('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

const getBadgeClass = (valor) => {
  if (valor >= 75) return 'bg-green-100 text-green-700'
  if (valor >= 50) return 'bg-blue-100 text-blue-700'
  if (valor >= 25) return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-600'
}

useHead({
  title: 'Presupuesto y Ejecución | Senado de Bolivia',
  meta: [
    { name: 'description', content: 'Presupuesto Institucional, Ejecución Presupuestaria y Fuentes de Financiamiento de la Cámara de Senadores - Gestión 2026.' },
  ],
})
</script>