<template>
  <div class="min-h-screen w-full flex flex-col items-center bg-gray-50 pb-12">
    <!-- ========================================== -->
    <!-- HERO                                        -->
    <!-- ========================================== -->
    <header class="w-full bg-gradient-to-br from-[#611717] to-[#8b2020] text-white px-4 pt-12 pb-14 text-center relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
        <div class="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <span class="inline-block text-xs font-semibold tracking-[0.15em] uppercase opacity-85 mb-3">
          Cámara de Senadores
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 leading-tight">
          Pleno Camaral
        </h1>
        <p class="text-sm md:text-lg opacity-90 font-normal leading-relaxed">
          Composición y distribución de escaños del Senado de Bolivia
        </p>
      </div>
    </header>

    <!-- ========================================== -->
    <!-- FILTRO COMPACTO CENTRADO                    -->
    <!-- ========================================== -->
    <section class="w-full flex justify-center -mt-7 relative z-10 px-4">
      <div class="inline-flex flex-wrap items-center justify-center gap-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-5 py-4">
        
        <!-- Título -->
        <div class="flex items-center gap-2 font-bold text-[#611717] text-sm pr-5 border-r border-gray-200 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          <span>Filtrar por departamento</span>
        </div>

        <!-- Select (ancho forzado con :style) -->
        <select
          id="filtro-depto"
          v-model="filtroDepartamento"
          aria-label="Seleccionar departamento"
          :style="{ width: '240px' }"
          class="px-3.5 py-2 border-[1.5px] border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 hover:border-[#611717] focus:outline-none focus:border-[#611717] focus:ring-[3px] focus:ring-[#611717]/15"
        >
          <option :value="null">Todos los departamentos</option>
          <option v-for="dep in departamentos" :key="dep" :value="dep">
            {{ dep }}
          </option>
        </select>

        <!-- Botón limpiar (solo si hay filtro) -->
        <button
          v-if="filtroDepartamento"
          type="button"
          @click="filtroDepartamento = null"
          class="inline-flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Limpiar
        </button>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- COMPONENTE PRINCIPAL                        -->
    <!-- ========================================== -->
    <main class="w-full max-w-[1400px] mx-auto px-4 pt-6">
      <DescubraSenado :filtro-departamento-externo="filtroDepartamento" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ============================================
// ESTADO
// ============================================
const filtroDepartamento = ref(null)

// ============================================
// DEPARTAMENTOS DE BOLIVIA
// ============================================
const departamentos = [
  'Beni',
  'Chuquisaca',
  'Cochabamba',
  'La Paz',
  'Oruro',
  'Pando',
  'Potosí',
  'Santa Cruz',
  'Tarija'
]

// ============================================
// SEO
// ============================================
useHead({
  title: 'Pleno Camaral | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content:
        'Composición del Pleno Camaral del Senado de Bolivia: titulares, suplentes, directiva y distribución de escaños por partido político.'
    },
    { property: 'og:title', content: 'Pleno Camaral | Senado de Bolivia' },
    {
      property: 'og:description',
      content:
        'Explora la composición completa del Senado de Bolivia de forma interactiva.'
    },
    { property: 'og:type', content: 'website' }
  ]
})
</script>