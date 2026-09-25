<!-- pages/bancadas.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- ========================================== -->
    <!-- HERO                                       -->
    <!-- ========================================== -->
    <header class="relative bg-gradient-to-br from-[#611717] to-[#8b2020] text-white overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
        <div class="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div class="relative container mx-auto px-4 max-w-6xl py-12 md:py-16 text-center">
        <span class="inline-block text-xs font-semibold tracking-[0.2em] uppercase opacity-80 mb-3">
          Cámara de Senadores
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-3">
          Bancadas
        </h1>
        <p class="text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
          Conoce las fuerzas políticas representadas en el Senado y a los senadores que las integran
        </p>
      </div>

      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" class="w-full">
          <path fill="#f9fafb" fill-opacity="1" d="M0,48L48,42.7C96,37,192,27,288,24C384,21,480,27,576,29.3C672,32,768,27,864,24C960,21,1056,21,1152,24C1248,27,1344,32,1392,34.7L1440,37L1440,60L1392,60C1344,60,1248,60,1152,60C1056,60,960,60,864,60C768,60,672,60,576,60C480,60,384,60,288,60C192,60,96,60,48,60L0,60Z"></path>
        </svg>
      </div>
    </header>

    <!-- ========================================== -->
    <!-- CONTENIDO                                  -->
    <!-- ========================================== -->
    <main class="container mx-auto px-4 max-w-6xl py-8 md:py-12">

      <!-- Botón "Ver todas" -->
      <div v-if="bancadaSeleccionada" class="mb-6 flex items-center justify-between flex-wrap gap-3">
        <button
          @click="bancadaSeleccionada = null"
          class="inline-flex items-center gap-2 text-[#611717] hover:text-[#3a060d] font-semibold text-sm md:text-base transition-colors"
        >
          <Icon name="mdi:arrow-left" class="text-lg" />
          Ver todas las bancadas
        </button>
        <span class="text-sm text-gray-500">
          Mostrando: <strong class="text-[#611717]">{{ bancadaSeleccionada.nombreDisplay }}</strong>
        </span>
      </div>

      <!-- ========================================== -->
      <!-- TARJETAS DE BANCADAS                       -->
      <!-- ========================================== -->
      <div
        class="grid gap-4 md:gap-5 mb-10"
        :class="bancadaSeleccionada ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'"
      >
        <button
          v-for="bancada in bancadasConConteo"
          :key="bancada.id"
          @click="toggleBancada(bancada)"
          class="group relative bg-white rounded-2xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left cursor-pointer flex flex-col"
          :class="[
            bancadaSeleccionada?.id === bancada.id
              ? 'border-[#611717] shadow-xl scale-[1.02]'
              : 'border-gray-100 hover:border-gray-300 hover:-translate-y-1'
          ]"
          :style="bancadaSeleccionada?.id === bancada.id ? { borderColor: bancada.color } : {}"
        >
          <!-- Barra superior del color del partido -->
          <div
            class="absolute top-0 left-0 right-0 h-1.5"
            :style="{ backgroundColor: bancada.color }"
          ></div>

          <!-- Cuerpo -->
          <div class="p-4 md:p-5 flex-1 flex flex-col">
            <!-- Fila superior: logo + nombre + badge -->
            <div class="flex items-start gap-3">
              <!-- Logo SIN borde dorado -->
              <div
                class="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 logo-bancada"
                :style="{ color: bancada.color }"
                v-html="bancada.icono"
              ></div>

              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-[#611717] text-sm md:text-base leading-tight mb-1.5">
                  {{ bancada.nombreDisplay }}
                </h3>
                <span
                  class="inline-block text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  :style="{ backgroundColor: bancada.color }"
                >
                  {{ bancada.nombreCorto }}
                </span>
              </div>

              <Icon
                :name="bancadaSeleccionada?.id === bancada.id ? 'mdi:chevron-up' : 'mdi:chevron-right'"
                class="text-xl text-gray-300 group-hover:text-[#611717] transition-colors flex-shrink-0 mt-1"
              />
            </div>

            <!-- Contadores alineados -->
            <div class="grid grid-cols-2 gap-2 mt-3 mb-3">
              <div class="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                <div class="text-base md:text-lg font-bold text-[#611717] leading-none">
                  {{ bancada.totalTitulares }}
                </div>
                <div class="text-[10px] text-gray-500 mt-0.5">Titulares</div>
              </div>
              <div class="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                <div class="text-base md:text-lg font-bold text-gray-600 leading-none">
                  {{ bancada.totalSuplentes }}
                </div>
                <div class="text-[10px] text-gray-500 mt-0.5">Suplentes</div>
              </div>
            </div>

            <!-- Barra de progreso -->
            <div class="flex items-center gap-2 text-xs text-gray-500 mt-auto">
              <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :style="{
                    width: ((bancada.totalTitulares / totalTitulares) * 100) + '%',
                    backgroundColor: bancada.color
                  }"
                ></div>
              </div>
              <span class="font-mono text-[10px] text-gray-400">
                {{ porcentaje(bancada.totalTitulares) }}%
              </span>
            </div>
          </div>
        </button>
      </div>

      <!-- ========================================== -->
      <!-- DETALLE DE BANCADA SELECCIONADA            -->
      <!-- ========================================== -->
      <section v-if="bancadaSeleccionada" class="space-y-10">

        <!-- TITULARES -->
        <div v-if="titularesDeBancada.length > 0">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-1.5 h-8 rounded-full"
              :style="{ backgroundColor: bancadaSeleccionada.color }"
            ></div>
            <h2 class="text-xl md:text-2xl font-bold text-[#611717]">
              Senadores Titulares
            </h2>
            <span
              class="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              :style="{ backgroundColor: bancadaSeleccionada.color }"
            >
              {{ titularesDeBancada.length }}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink
              v-for="senador in titularesDeBancada"
              :key="senador.id"
              :to="`/senador/${senador.slug}`"
              class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center gap-3 p-3"
            >
              <div class="flex-shrink-0">
                <img
                  :src="senador.foto || defaultAvatar"
                  :alt="senador.name"
                  class="w-16 h-16 rounded-full object-cover border-2 group-hover:scale-105 transition-transform"
                  :style="{ borderColor: bancadaSeleccionada.color }"
                  @error="(e) => (e.target.src = defaultAvatar)"
                />
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-[#611717] text-sm leading-tight truncate group-hover:underline">
                  {{ senador.name }}
                </h3>
                <p class="text-xs text-gray-500 mt-0.5 truncate">
                  {{ senador.department }}
                </p>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span
                    class="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                    :style="{ backgroundColor: bancadaSeleccionada.color }"
                  >
                    {{ senador.partyShort }}
                  </span>
                  <span
                    v-if="senador.cargo"
                    class="text-[10px] text-[#611717] font-medium truncate max-w-[120px]"
                    :title="senador.cargo"
                  >
                    {{ senador.cargo }}
                  </span>
                </div>
              </div>

              <Icon
                name="mdi:chevron-right"
                class="text-xl text-gray-300 group-hover:text-[#611717] transition-colors flex-shrink-0"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- SUPLENTES -->
        <div v-if="suplentesDeBancada.length > 0">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-1.5 h-8 rounded-full opacity-60"
              :style="{ backgroundColor: bancadaSeleccionada.color }"
            ></div>
            <h2 class="text-xl md:text-2xl font-bold text-[#611717]">
              Senadores Suplentes
            </h2>
            <span
              class="text-xs font-bold px-2.5 py-1 rounded-full text-white opacity-80"
              :style="{ backgroundColor: bancadaSeleccionada.color }"
            >
              {{ suplentesDeBancada.length }}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink
              v-for="suplente in suplentesDeBancada"
              :key="suplente.id"
              :to="`/senador/suplente/${suplente.slug}`"
              class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center gap-3 p-3"
            >
              <div class="flex-shrink-0">
                <img
                  :src="suplente.foto || defaultAvatar"
                  :alt="suplente.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-dashed group-hover:scale-105 transition-transform"
                  :style="{ borderColor: bancadaSeleccionada.color }"
                  @error="(e) => (e.target.src = defaultAvatar)"
                />
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-700 text-sm leading-tight truncate group-hover:underline">
                  {{ suplente.name }}
                </h3>
                <p class="text-xs text-gray-500 mt-0.5 truncate">
                  {{ suplente.department }}
                </p>
                <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span
                    class="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                    :style="{ backgroundColor: bancadaSeleccionada.color }"
                  >
                    {{ suplente.partyShort }}
                  </span>
                  <span
                    v-if="suplente.suplenteDe"
                    class="text-[10px] text-gray-400 truncate max-w-[140px]"
                    :title="'Suplente de: ' + suplente.suplenteDe"
                  >
                    Sup. de {{ suplente.suplenteDe }}
                  </span>
                </div>
              </div>

              <Icon
                name="mdi:chevron-right"
                class="text-xl text-gray-300 group-hover:text-[#611717] transition-colors flex-shrink-0"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- Sin senadores -->
        <div
          v-if="titularesDeBancada.length === 0 && suplentesDeBancada.length === 0"
          class="text-center py-12 bg-white rounded-2xl border border-gray-100"
        >
          <Icon name="mdi:account-off-outline" class="text-5xl text-gray-300 mb-3" />
          <p class="text-gray-500">No hay senadores en esta bancada</p>
        </div>
      </section>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-[#611717] hover:text-[#3a060d] transition-colors text-sm md:text-base font-medium"
        >
          <Icon name="mdi:arrow-left" class="text-lg" />
          Volver al inicio
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { senadores } from '~/data/senadores'
import { partidosData } from '~/data/partidos'

useHead({
  title: 'Bancadas | Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Conoce las bancadas políticas del Senado de Bolivia y los senadores titulares y suplentes que las integran.'
    },
    { property: 'og:title', content: 'Bancadas | Senado de Bolivia' },
    { property: 'og:description', content: 'Fuerzas políticas representadas en la Cámara de Senadores.' },
    { property: 'og:type', content: 'website' }
  ]
})

const defaultAvatar =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// ============================================
// ESTADO
// ============================================
const bancadaSeleccionada = ref(null)

// ============================================
// COMPUTED
// ============================================
const totalTitulares = computed(
  () => senadores.filter(s => s.tipo === 'titular').length
)

const bancadasConConteo = computed(() => {
  return partidosData
    .map(partido => {
      const titulares = senadores.filter(
        s => s.party === partido.nombre && s.tipo === 'titular'
      ).length
      const suplentes = senadores.filter(
        s => s.party === partido.nombre && s.tipo === 'suplente'
      ).length
      return {
        ...partido,
        totalTitulares: titulares,
        totalSuplentes: suplentes
      }
    })
    .sort((a, b) => a.orden - b.orden)
})

const titularesDeBancada = computed(() => {
  if (!bancadaSeleccionada.value) return []
  return senadores
    .filter(s => s.party === bancadaSeleccionada.value.nombre && s.tipo === 'titular')
    .sort((a, b) => a.seatNumber - b.seatNumber)
})

const suplentesDeBancada = computed(() => {
  if (!bancadaSeleccionada.value) return []
  return senadores
    .filter(s => s.party === bancadaSeleccionada.value.nombre && s.tipo === 'suplente')
    .sort((a, b) => a.seatNumber - b.seatNumber)
})

// ============================================
// MÉTODOS
// ============================================
const toggleBancada = (bancada) => {
  if (bancadaSeleccionada.value?.id === bancada.id) {
    bancadaSeleccionada.value = null
  } else {
    bancadaSeleccionada.value = bancada
    if (process.client) {
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' })
      }, 100)
    }
  }
}

const porcentaje = (cantidad) => {
  if (totalTitulares.value === 0) return 0
  return Math.round((cantidad / totalTitulares.value) * 100)
}
</script>

<style scoped>
.logo-bancada {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-bancada :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>