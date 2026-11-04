<template>
  <div class="min-h-screen bg-senado-gold-lightest3 py-[10vw] sm:py-12">
    <div class="mx-auto w-[90%] sm:w-[80%]">
      <!-- Título y Subtítulo -->
      <h1 class="text-[8vw] sm:text-[3vw] font-bold text-senado-primary text-center mb-[2vw] sm:mb-2 leading-tight">
        Ejecución Presupuestaria
      </h1>
      <p class="text-[3.6vw] sm:text-[1.2vw] text-senado-primary-dark text-center mb-[6vw] sm:mb-8 font-medium">
        (EXPRESADO EN BOLIVIANOS)
      </p>

      <div class="space-y-[6vw] sm:space-y-8">
        
        <!-- Tabla Principal (Áreas y Unidades) -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-[1vw] sm:border-l-8 border-senado-primary">
          <div class="p-[4vw] sm:p-8">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <!-- Encabezado de 2 niveles -->
                  <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw] text-center">
                    <th rowspan="2" class="p-[2vw] sm:p-3 border border-white/20 align-middle">ÁREA</th>
                    <th rowspan="2" class="p-[2vw] sm:p-3 border border-white/20 align-middle">DESCRIPCIÓN</th>
                    <th colspan="4" class="p-[2vw] sm:p-3 border border-white/20 border-b-0">PRESUPUESTO</th>
                  </tr>
                  <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw] text-center">
                    <th class="p-[2vw] sm:p-3 border border-white/20">VIGENTE</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">EJECUTADO AL<br>31/10/2026</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">TOTAL ÁREA</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">% EJECUCIÓN</th>
                  </tr>
                </thead>
                <tbody class="text-[3.3vw] sm:text-[1.1vw] text-gray-700">
                  
                  <!-- Área Administrativa (2 filas) -->
                  <tr class="bg-senado-gold-lightest/30">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center font-medium align-middle" rowspan="2">Administrativa</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Administración Central</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">43.365.739</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">20.395.000</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right font-bold align-middle" rowspan="2">21.272.354</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center font-bold align-middle" rowspan="2">47,15%</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Personal con Discapacidad</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">1.754.410</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">877.353</td>
                  </tr>

                  <!-- Área Legislativa (11 filas) -->
                  <tr class="bg-senado-gold-lightest/30">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center font-medium align-middle" rowspan="11">Legislativa</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Secretaría General</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">4.297.684</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.285.812</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right font-bold align-middle" rowspan="11">38.324.266</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center font-bold align-middle" rowspan="11">61,90%</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Directiva Camaral</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">351.600</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">138.138</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Sueldos Senadores</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">17.177.069</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">11.907.254</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Comisiones</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">3.064.087</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">1.968.160</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Comités</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">1.120.240</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">558.745</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Bancadas Políticas</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">16.100</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">3.994</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Brigadas Parlamentarias</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">437.697</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">150.366</td>
                  </tr>
                  <tr class="bg-senado-gold-lightest/30 font-medium">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Área Legislativa — Personal Eventual</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">28.130.098</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">18.055.359</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Pasajes al interior y exterior del país</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">4.823.321</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.200.586</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Viáticos al interior y exterior del país</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">1.072.798</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">476.223</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Combustible (Gasolina)</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">1.624.848</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">579.630</td>
                  </tr>

                  <!-- Fila Total Parcial -->
                  <tr class="bg-senado-gold-light/40 text-senado-primary-dark font-bold">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center" colspan="2">TOTAL</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">107.035.691</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">59.596.620</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">59.596.620</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center text-[3.6vw] sm:text-[1.2vw]">55,68%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tabla 2: NEALP y Total General -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-[1vw] sm:border-l-8 border-senado-gold-dark mt-[6vw] sm:mt-8">
          <div class="p-[4vw] sm:p-8">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <!-- Encabezado de 2 niveles -->
                  <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw] text-center">
                    <th rowspan="2" class="p-[2vw] sm:p-3 border border-white/20 align-middle">ÁREA</th>
                    <th rowspan="2" class="p-[2vw] sm:p-3 border border-white/20 align-middle">UNIDAD EJECUTORA</th>
                    <th colspan="4" class="p-[2vw] sm:p-3 border border-white/20 border-b-0">PRESUPUESTO</th>
                  </tr>
                  <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw] text-center">
                    <th class="p-[2vw] sm:p-3 border border-white/20">VIGENTE</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">EJECUTADO AL<br>31/10/2026</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">TOTAL ÁREA</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20">%</th>
                  </tr>
                </thead>
                <tbody class="text-[3.3vw] sm:text-[1.1vw] text-gray-700">
                  
                  <!-- Fila NEALP -->
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 font-bold">Administración Nuevo Edificio ALP</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Administración NEALP</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right font-bold">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center font-bold">100%</td>
                  </tr>

                  <!-- Fila Total Parcial NEALP -->
                  <tr class="bg-senado-gold-light/40 text-senado-primary-dark font-bold">
                    <td class="p-[2vw] sm:p-3 border border-gray-300"></td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center">TOTAL</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center text-[3.6vw] sm:text-[1.2vw]">100%</td>
                  </tr>

                  <!-- Fila de Separación -->
                  <tr>
                    <td colspan="6" class="p-0 bg-white h-[3vw] sm:h-4"></td>
                  </tr>

                  <!-- Fila TOTAL GENERAL -->
                  <tr class="bg-senado-primary text-white font-bold text-[3.6vw] sm:text-[1.2vw]">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center align-middle" colspan="2">TOTAL GENERAL</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">109.555.306</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">62.116.235</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">62.116.235</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-center">56,7%</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- Botón de volver -->
      <div class="mt-[8vw] sm:mt-12 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-[1.1vw] font-medium">
          <Icon name="material-symbols:arrow-back-rounded" class="text-[4.5vw] sm:text-[1.5vw]" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// No requiere lógica adicional
</script>