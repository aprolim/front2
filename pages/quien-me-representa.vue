<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-12">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
          👥 Tus Senadores
        </div>
        <h1 class="text-[4vw] font-bold text-senado-primary leading-tight">
          ¿Quién me representa?
        </h1>
        <p class="text-gray-600 text-lg mt-4 max-w-3xl">
          Selecciona tu departamento para conocer a los senadores titulares y suplentes que te representan en la Cámara de Senadores.
        </p>
        <div class="w-24 h-1 bg-senado-gold-dark mt-4 rounded-full"></div>
      </div>

      <!-- Selector de Departamento -->
      <div class="max-w-2xl mx-auto mb-12">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Selecciona tu departamento
        </label>
        <select
          v-model="departamentoSeleccionado"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-transparent text-gray-700 bg-white shadow-sm text-lg"
          @change="onDepartamentoChange"
        >
          <option value="">— Selecciona un departamento —</option>
          <option
            v-for="dept in departamentosOrdenados"
            :key="dept"
            :value="dept"
          >
            {{ dept }}
          </option>
        </select>
      </div>

      <!-- Contenido -->
      <div v-if="departamentoSeleccionado" class="max-w-5xl mx-auto">
        <!-- Encabezado del departamento -->
        <div class="bg-senado-gold-lightest rounded-2xl p-6 mb-8 border border-senado-gold-light">
          <div class="flex items-center gap-4">
            <img
              :src="getMapaDepartamento(departamentoSeleccionado)"
              :alt="'Mapa de ' + departamentoSeleccionado"
              class="h-16 w-16 object-contain"
              @error="(e) => e.target.src = ''"
            />
            <div>
              <h2 class="text-2xl font-bold text-senado-primary">
                {{ departamentoSeleccionado }}
              </h2>
              <p class="text-gray-600">
                {{ senadoresPorDepartamento.length }} senadores representan a este departamento
                <span class="text-sm text-gray-400">({{ titularesPorDepartamento.length }} titulares, {{ suplentesPorDepartamento.length }} suplentes)</span>
              </p>
            </div>
          </div>
        </div>

        <!-- TITULARES -->
        <div v-if="titularesPorDepartamento.length > 0" class="mb-8">
          <h3 class="text-xl font-bold text-senado-primary mb-4 flex items-center gap-2">
            <span class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">●</span>
            Senadores Titulares
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="senador in titularesPorDepartamento"
              :key="senador.id"
              class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <!-- Cabecera del senador -->
              <div class="flex items-center gap-4 p-4 border-b border-gray-100">
                <img
                  :src="senador.foto || defaultAvatar"
                  :alt="senador.name"
                  class="w-16 h-16 rounded-full object-cover border-2"
                  :style="{ borderColor: senador.partyColor || '#ccc' }"
                  @error="(e) => e.target.src = defaultAvatar"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold text-senado-primary truncate">
                    {{ senador.name }}
                  </h3>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="text-xs font-medium px-2 py-0.5 rounded"
                      :style="{
                        backgroundColor: senador.partyColor + '20',
                        color: senador.partyColor || '#666'
                      }"
                    >
                      {{ senador.partyShort || senador.party || 'Sin partido' }}
                    </span>
                    <span class="text-xs text-gray-500">
                      Asiento {{ senador.seatNumber }}
                    </span>
                  </div>
                </div>
                <NuxtLink
                  :to="`/senador/${senador.slug}`"
                  class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium whitespace-nowrap"
                >
                  Ver perfil →
                </NuxtLink>
              </div>

              <!-- Detalles -->
              <div class="p-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Departamento:</span>
                  <span class="font-medium">{{ senador.department }}</span>
                </div>
                <div v-if="senador.cargo" class="flex justify-between">
                  <span class="text-gray-500">Cargo:</span>
                  <span class="font-medium text-senado-primary">{{ senador.cargo }}</span>
                </div>
                <div v-if="senador.comite || senador.comision" class="flex justify-between">
                  <span class="text-gray-500">Comité/Comisión:</span>
                  <span class="font-medium text-right">{{ senador.comite || senador.comision }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Estado:</span>
                  <span class="font-medium text-green-600">● Titular</span>
                </div>

                <!-- Suplente -->
                <div
                  v-if="senador.suplente && senador.suplente !== 'null'"
                  class="mt-3 pt-3 border-t border-gray-100"
                >
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-gray-500">🔄 Suplente:</span>
                    <NuxtLink
                      :to="`/senador/suplente/${senador.slugSuplente}`"
                      class="font-medium text-senado-primary hover:underline"
                    >
                      {{ senador.suplente }}
                    </NuxtLink>
                  </div>
                </div>
                <div v-else class="mt-3 pt-3 border-t border-gray-100">
                  <span class="text-sm text-gray-400">Sin suplente asignado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SUPLENTES -->
        <div v-if="suplentesPorDepartamento.length > 0">
          <h3 class="text-xl font-bold text-senado-primary mb-4 flex items-center gap-2">
            <span class="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">●</span>
            Senadores Suplentes
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="suplente in suplentesPorDepartamento"
              :key="suplente.id"
              class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow opacity-90"
            >
              <!-- Cabecera del suplente -->
              <div class="flex items-center gap-4 p-4 border-b border-gray-100">
                <img
                  :src="suplente.foto || defaultAvatar"
                  :alt="suplente.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-dashed"
                  :style="{ borderColor: suplente.partyColor || '#ccc' }"
                  @error="(e) => e.target.src = defaultAvatar"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold text-gray-700 truncate">
                    {{ suplente.name }}
                  </h3>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="text-xs font-medium px-2 py-0.5 rounded"
                      :style="{
                        backgroundColor: suplente.partyColor + '20',
                        color: suplente.partyColor || '#666'
                      }"
                    >
                      {{ suplente.partyShort || suplente.party || 'Sin partido' }}
                    </span>
                    <span class="text-xs text-gray-500">
                      Asiento {{ suplente.seatNumber }}
                    </span>
                  </div>
                </div>
                <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Suplente
                </span>
              </div>

              <!-- Detalles -->
              <div class="p-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Departamento:</span>
                  <span class="font-medium">{{ suplente.department }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Estado:</span>
                  <span class="font-medium text-blue-600">● Suplente</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sin senadores -->
        <div v-if="senadoresPorDepartamento.length === 0" class="text-center py-12">
          <div class="text-4xl mb-4">🔍</div>
          <p class="text-gray-600 text-lg">No se encontraron senadores para este departamento</p>
        </div>
      </div>

      <!-- Estado inicial -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-6">🗳️</div>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">Selecciona un departamento</h3>
        <p class="text-gray-500">Elige tu departamento para conocer a tus representantes en el Senado</p>
      </div>

      <!-- Botón volver -->
      <div class="mt-12 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <ClientOnly>
            <Icon name="material-symbols:arrow-back-rounded" class="text-[1.5vw]" />
            <template #fallback>
              <span class="text-[1.5vw]">←</span>
            </template>
          </ClientOnly>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// 🔥 Importar TODOS los senadores (titulares Y suplentes)
import { senadores } from '~/data/senadores-completo'

// ========================================== //
// ESTADO
// ========================================== //
const departamentoSeleccionado = ref('')
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// ========================================== //
// DEPARTAMENTOS
// ========================================== //
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

const departamentosOrdenados = computed(() => {
  return [...departamentos].sort()
})

// ========================================== //
// MAPAS POR DEPARTAMENTO
// ========================================== //
const getMapaDepartamento = (departamento) => {
  const mapas = {
    'Beni': '/mapas/Beni.svg',
    'Cochabamba': '/mapas/Cochabamba.svg',
    'La Paz': '/mapas/LaPaz.svg',
    'Oruro': '/mapas/Oruro.svg',
    'Pando': '/mapas/Pando.svg',
    'Potosí': '/mapas/Potosi.svg',
    'Santa Cruz': '/mapas/SantaCruz.svg',
    'Chuquisaca': '/mapas/Sucre.svg',
    'Tarija': '/mapas/TarijaMapa.svg'
  }
  return mapas[departamento] || ''
}

// ========================================== //
// FILTRAR SENADORES POR DEPARTAMENTO
// ========================================== //
const senadoresPorDepartamento = computed(() => {
  if (!departamentoSeleccionado.value) return []
  return senadores
    .filter(s => s.department === departamentoSeleccionado.value)
    .sort((a, b) => a.seatNumber - b.seatNumber)
})

// ========================================== //
// TITULARES Y SUPLENTES POR DEPARTAMENTO
// ========================================== //
const titularesPorDepartamento = computed(() => {
  return senadoresPorDepartamento.value.filter(s => s.esTitular === true)
})

const suplentesPorDepartamento = computed(() => {
  return senadoresPorDepartamento.value.filter(s => s.esTitular === false)
})

// ========================================== //
// MÉTODOS
// ========================================== //
const onDepartamentoChange = () => {
  if (process.client) {
    localStorage.setItem('departamentoSeleccionado', departamentoSeleccionado.value)
  }
}

// ========================================== //
// RESTAURAR SELECCIÓN GUARDADA
// ========================================== //
onMounted(() => {
  if (process.client) {
    const guardado = localStorage.getItem('departamentoSeleccionado')
    if (guardado && departamentos.includes(guardado)) {
      departamentoSeleccionado.value = guardado
    }
  }
})
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>