<template>
  <div class="min-h-screen bg-senado-gold-lightest3 py-[10vw] sm:py-12">
    <div class="mx-auto w-[90%] sm:w-[80%]">
      <!-- Título y Subtítulo -->
      <h1 class="text-[8vw] sm:text-[3vw] font-bold text-senado-primary text-center mb-[2vw] sm:mb-2 leading-tight">
        Presupuesto Institucional 2026
      </h1>
      <p class="text-[3.6vw] sm:text-[1.2vw] text-senado-primary-dark text-center mb-[6vw] sm:mb-8 font-medium">
        (EXPRESADO EN BOLIVIANOS)
      </p>

      <!-- Contenido -->
      <div class="grid grid-cols-1 gap-[4vw] sm:gap-8">
        
        <!-- Tarjeta: Desglose de Gastos -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-[1vw] sm:border-l-8 border-senado-primary">
          <div class="p-[4vw] sm:p-8">
            <h2 class="text-[5vw] sm:text-[1.8vw] font-bold text-senado-primary mb-[2vw] sm:mb-2">
              Entidad 650 “Asamblea Legislativa Plurinacional”
            </h2>
            <p class="text-[3.3vw] sm:text-[1.1vw] text-gray-600 mb-[4vw] sm:mb-6">
              Presupuesto de Recursos 2026
            </p>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw]">
                    <th class="p-[2vw] sm:p-3 border border-white/20">CONCEPTO</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20 text-right">PRESUPUESTO INICIAL</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20 text-right">MODIFICACIONES APROBADAS</th>
                    <th class="p-[2vw] sm:p-3 border border-white/20 text-right">PRESUPUESTO VIGENTE</th>
                  </tr>
                </thead>
                <tbody class="text-[3.3vw] sm:text-[1.1vw] text-gray-700">
                  <!-- Fila Gastos de Funcionamiento en Negrilla Completa -->
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors font-bold">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">Gastos de Funcionamiento</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">86.035.691</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">21.000.000</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-senado-primary">107.035.691</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 pl-[4vw] sm:pl-6">Grupo 10000 "Servicios Personales"</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">70.263.003</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">8.338.198</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">78.601.201</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 pl-[4vw] sm:pl-6">Resto de Gastos (20000, 30000, 40000 y 80000)</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">15.772.688</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">12.661.802</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">28.434.490</td>
                  </tr>
                  <!-- Fila Gastos NEALP en Negrilla Completa -->
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors font-bold">
                    <td class="p-[2vw] sm:p-3 border border-gray-300">GASTOS NEALP</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">0</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-senado-primary">2.519.615</td>
                  </tr>
                  <tr class="hover:bg-senado-gold-lightest/50 transition-colors">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 pl-[4vw] sm:pl-6">Administración Nuevo Edificio ALP (20000)</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">0</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right">2.519.615</td>
                  </tr>
                  <!-- Fila Total en Negrilla Completa -->
                  <tr class="bg-senado-gold-light/40 text-senado-primary-dark font-bold">
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-[3.6vw] sm:text-[1.2vw]">TOTAL TGN - GASTOS CORRIENTES</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">86.035.691</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">23.519.615</td>
                    <td class="p-[2vw] sm:p-3 border border-gray-300 text-right text-[3.6vw] sm:text-[1.2vw]">109.555.306</td>
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