<template>
  <div class="min-h-screen bg-senado-gold-lightest3 py-[10vw] sm:py-12">
    <div class="mx-auto w-[90%] sm:w-[80%]">
      
      <!-- Títulos y Subtítulos (Estilo Documento Oficial) -->
      <div class="text-center mb-[6vw] sm:mb-10">
        <h1 class="text-[5.5vw] sm:text-[2.2vw] font-bold text-senado-primary leading-tight uppercase mb-[1vw] sm:mb-2">
          Presupuesto Institucional de Recursos 2026
        </h1>
        <h2 class="text-[4.5vw] sm:text-[1.8vw] font-bold text-senado-primary-dark leading-tight uppercase mb-[1vw] sm:mb-2">
          Fuente de Financiamiento: 41 - 111
        </h2>
        <p class="text-[3.6vw] sm:text-[1.2vw] text-gray-700 font-medium">
          (EXPRESADO EN BOLIVIANOS)
        </p>
      </div>

      <!-- Tabla de Fuentes de Financiamiento -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <!-- Encabezado usando bg-senado-primary para asegurar el color -->
            <thead>
              <tr class="bg-senado-primary text-white text-[3vw] sm:text-[1vw] text-center uppercase">
                <th class="p-[2vw] sm:p-4 border border-white/30 w-[20%]">Concepto</th>
                <th class="p-[2vw] sm:p-4 border border-white/30 w-[15%]">Fuente</th>
                <th class="p-[2vw] sm:p-4 border border-white/30 w-[30%]">Descripción</th>
                <th class="p-[2vw] sm:p-4 border border-white/30 w-[20%] leading-tight">
                  Presupuesto<br>Vigente
                </th>
                <th class="p-[2vw] sm:p-4 border border-white/30 w-[15%]">% Part.</th>
              </tr>
            </thead>
            <tbody class="text-[3.3vw] sm:text-[1.1vw] text-black font-mono">
              <!-- Fila Corriente -->
              <tr class="bg-[#fdfcf9] hover:bg-[#f0e6cc] transition-colors">
                <td class="p-[2vw] sm:p-4 border border-gray-400 font-semibold">CORRIENTE</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center">41</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400">Transferencias TGN</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-right font-bold">109.555.306</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center">100%</td>
              </tr>
              <!-- Fila Inversión -->
              <tr class="bg-white hover:bg-[#f9f7ee] transition-colors">
                <td class="p-[2vw] sm:p-4 border border-gray-400 font-semibold">INVERSIÓN</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center">-</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400">-</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-right font-bold">0</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center">0%</td>
              </tr>
              <!-- Fila Total -->
              <tr class="bg-[#fdfcf9] font-bold text-[3.6vw] sm:text-[1.2vw]">
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center" colspan="3">TOTAL</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-right text-senado-primary">109.555.306</td>
                <td class="p-[2vw] sm:p-4 border border-gray-400 text-center text-senado-primary">100%</td>
              </tr>
            </tbody>
          </table>
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