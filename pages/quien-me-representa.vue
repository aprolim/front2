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
      <div class="max-w-2xl mx-auto mb-8">
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

      <!-- Buscador de Senadores -->
      <div class="max-w-2xl mx-auto mb-12">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Buscar senador por nombre
        </label>
        <div class="relative">
          <input
            v-model="terminoBusqueda"
            type="text"
            placeholder="Ej: García, Mamani, Quispe..."
            class="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-transparent text-gray-700 bg-white shadow-sm text-lg"
          />
          <ClientOnly>
            <Icon
              name="mdi:magnify"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <template #fallback>
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </template>
          </ClientOnly>
          <button
            v-if="terminoBusqueda"
            @click="terminoBusqueda = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            ✕
          </button>
        </div>
        <p v-if="terminoBusqueda" class="mt-2 text-sm text-gray-500">
          {{ resultadosBusqueda.length }} resultado(s) encontrado(s)
          <span v-if="!departamentoSeleccionado"> en toda Bolivia</span>
        </p>
      </div>

      <!-- Resultados de Búsqueda -->
      <div v-if="terminoBusqueda && resultadosBusqueda.length > 0" class="max-w-5xl mx-auto mb-8">
        <h3 class="text-xl font-bold text-senado-primary mb-4 flex items-center gap-2">
          <span class="bg-senado-gold-soft text-senado-primary text-sm px-3 py-1 rounded-full">🔍</span>
          Resultados de búsqueda
          <span v-if="departamentoSeleccionado" class="text-sm font-normal text-gray-500">
            (en {{ departamentoSeleccionado }})
          </span>
          <span v-else class="text-sm font-normal text-gray-500">
            (todos los departamentos)
          </span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="senador in resultadosBusqueda"
            :key="senador.id"
            class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center gap-4 p-4 border-b border-gray-100">
              <NuxtLink
                :to="senador.tipo === 'suplente' ? `/senador/suplente/${senador.slug}` : `/senador/${senador.slug}`"
                class="flex-shrink-0"
              >
                <img
                  :src="senador.foto || defaultAvatar"
                  :alt="senador.name"
                  class="w-16 h-16 rounded-full object-cover border-2 hover:opacity-80 transition-opacity cursor-pointer"
                  :style="{ borderColor: senador.partyColor || '#ccc' }"
                  @error="(e) => e.target.src = defaultAvatar"
                />
              </NuxtLink>
              <div class="flex-1 min-w-0">
                <NuxtLink
                  :to="senador.tipo === 'suplente' ? `/senador/suplente/${senador.slug}` : `/senador/${senador.slug}`"
                  class="hover:underline"
                >
                  <h3 class="text-lg font-bold text-senado-primary truncate">
                    {{ senador.name }}
                  </h3>
                </NuxtLink>
                <div class="flex items-center gap-2 flex-wrap mt-1">
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
                    {{ senador.department }} · Asiento {{ senador.seatNumber }}
                  </span>
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded"
                    :class="senador.tipo === 'titular' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'"
                  >
                    {{ senador.tipo === 'titular' ? 'Titular' : 'Suplente' }}
                  </span>
                </div>
              </div>
              <NuxtLink
                :to="senador.tipo === 'suplente' ? `/senador/suplente/${senador.slug}` : `/senador/${senador.slug}`"
                class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium whitespace-nowrap"
              >
                Ver perfil →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin resultados de búsqueda -->
      <div v-else-if="terminoBusqueda && resultadosBusqueda.length === 0" class="max-w-5xl mx-auto mb-8 text-center py-8">
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-gray-600 text-lg">
          No se encontraron senadores que coincidan con "<strong>{{ terminoBusqueda }}</strong>"
        </p>
        <p class="text-gray-400 text-sm mt-1">Intenta con otro nombre o apellido</p>
      </div>

      <!-- Contenido por departamento (ocultar si hay búsqueda activa) -->
      <div v-if="departamentoSeleccionado && !terminoBusqueda" class="max-w-5xl mx-auto">
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
                {{ departamentoSeleccionado }} (Brigada Parlamentaria)
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
                <NuxtLink
                  :to="`/senador/${senador.slug}`"
                  class="flex-shrink-0"
                >
                  <img
                    :src="senador.foto || defaultAvatar"
                    :alt="senador.name"
                    class="w-16 h-16 rounded-full object-cover border-2 hover:opacity-80 transition-opacity cursor-pointer"
                    :style="{ borderColor: senador.partyColor || '#ccc' }"
                    @error="(e) => e.target.src = defaultAvatar"
                  />
                </NuxtLink>
                <div class="flex-1 min-w-0">
                  <NuxtLink
                    :to="`/senador/${senador.slug}`"
                    class="hover:underline"
                  >
                    <h3 class="text-lg font-bold text-senado-primary truncate">
                      {{ senador.name }}
                    </h3>
                  </NuxtLink>
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
                  <span class="text-gray-500"></span>
                  <span class="font-medium text-green-600">● Titular</span>
                </div>

                <!-- Suplente: buscar por suplenteId -->
                <div
                  v-if="senador.suplenteId"
                  class="mt-3 pt-3 border-t border-gray-100"
                >
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-gray-500"> Suplente:</span>
                    <NuxtLink
                      :to="`/senador/suplente/${getSuplenteSlugById(senador.suplenteId)}`"
                      class="font-medium text-senado-primary hover:underline"
                    >
                      {{ getSuplenteNombreById(senador.suplenteId) }}
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
                <NuxtLink
                  :to="`/senador/suplente/${suplente.slug}`"
                  class="flex-shrink-0"
                >
                  <img
                    :src="suplente.foto || defaultAvatar"
                    :alt="suplente.name"
                    class="w-16 h-16 rounded-full object-cover border-2 border-dashed hover:opacity-80 transition-opacity cursor-pointer"
                    :style="{ borderColor: suplente.partyColor || '#ccc' }"
                    @error="(e) => e.target.src = defaultAvatar"
                  />
                </NuxtLink>
                <div class="flex-1 min-w-0">
                  <NuxtLink
                    :to="`/senador/suplente/${suplente.slug}`"
                    class="hover:underline"
                  >
                    <h3 class="text-lg font-bold text-gray-700 truncate">
                      {{ suplente.name }}
                    </h3>
                  </NuxtLink>
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
                <NuxtLink
                  :to="`/senador/suplente/${suplente.slug}`"
                  class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium whitespace-nowrap"
                >
                  Ver perfil →
                </NuxtLink>
              </div>

              <!-- Detalles -->
              <div class="p-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Departamento:</span>
                  <span class="font-medium">{{ suplente.department }}</span>
                </div>
                <!-- Mostrar de quién es suplente -->
                <div v-if="suplente.suplenteDe" class="flex justify-between">
                  <span class="text-gray-500">Titular:</span>
                  <NuxtLink
                    :to="`/senador/${getTitularSlugById(suplente.titularId)}`"
                    class="font-medium text-senado-primary hover:underline"
                  >
                    {{ suplente.suplenteDe }}
                  </NuxtLink>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500"></span>
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
      <div v-else-if="!departamentoSeleccionado && !terminoBusqueda" class="text-center py-16">
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
import { senadores } from '~/data/senadores'

// ========================================== //
// ESTADO
// ========================================== //
const departamentoSeleccionado = ref('')
const terminoBusqueda = ref('')
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
// FUNCIONES PARA OBTENER DATOS DE SUPLENTES POR ID
// ========================================== //
const getSuplenteById = (suplenteId) => {
  if (!suplenteId) return null
  return senadores.find(s => s.id === suplenteId && s.tipo === 'suplente')
}

const getSuplenteNombreById = (suplenteId) => {
  const suplente = getSuplenteById(suplenteId)
  return suplente?.name || null
}

const getSuplenteSlugById = (suplenteId) => {
  const suplente = getSuplenteById(suplenteId)
  return suplente?.slug || null
}

const getTitularSlugById = (titularId) => {
  if (!titularId) return ''
  const titular = senadores.find(s => s.id === titularId && s.tipo === 'titular')
  return titular?.slug || ''
}

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
  return senadoresPorDepartamento.value.filter(s => s.tipo === 'titular')
})

const suplentesPorDepartamento = computed(() => {
  return senadoresPorDepartamento.value.filter(s => s.tipo === 'suplente')
})

// ========================================== //
// BUSCADOR TOLERANTE A ERRORES Y ACENTOS
// ========================================== //

/**
 * Normaliza un texto:
 * - minúsculas
 * - sin acentos (NFD + elimina diacríticos)
 * - sin espacios extra
 */
const normalizar = (texto) => {
  if (!texto) return ''
  return texto
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes/acentos
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Distancia de Levenshtein: cuántos cambios mínimos
 * se necesitan para transformar `a` en `b`.
 * Sirve para tolerar errores de escritura.
 */
const levenshtein = (a, b) => {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // sustitución
          matrix[i][j - 1] + 1,     // inserción
          matrix[i - 1][j] + 1      // eliminación
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

/**
 * Calcula la tolerancia según el largo del término.
 * - 1-3 letras: 0 errores (muy corto para tolerar)
 * - 4-6 letras: 1 error
 * - 7+ letras:  2 errores
 */
const toleranciaPara = (termino) => {
  if (termino.length <= 3) return 0
  if (termino.length <= 6) return 1
  return 2
}

/**
 * Verifica si `texto` contiene `termino` permitiendo:
 * - coincidencia exacta normalizada (substring)
 * - coincidencia aproximada por Levenshtein en cada palabra
 */
const coincide = (texto, termino) => {
  const textoNorm = normalizar(texto)
  const terminoNorm = normalizar(termino)
  if (!terminoNorm) return true

  // 1) Coincidencia directa (substring)
  if (textoNorm.includes(terminoNorm)) return true

  // 2) Coincidencia por palabras con tolerancia a errores
  const tolerancia = toleranciaPara(terminoNorm)
  const palabrasTexto = textoNorm.split(' ').filter(Boolean)
  const palabrasTermino = terminoNorm.split(' ').filter(Boolean)

  // Cada palabra del término debe "parecerse" a alguna palabra del texto
  return palabrasTermino.every(palabraTermino => {
    return palabrasTexto.some(palabraTexto => {
      // Si la palabra del texto contiene a la del término (parcial)
      if (palabraTexto.includes(palabraTermino)) return true
      // Si la distancia de edición es aceptable
      if (levenshtein(palabraTexto, palabraTermino) <= tolerancia) return true
      // Comparar también contra el inicio de la palabra (prefijos)
      const prefijo = palabraTexto.slice(0, palabraTermino.length)
      if (levenshtein(prefijo, palabraTermino) <= tolerancia) return true
      return false
    })
  })
}

/**
 * Resultados de búsqueda:
 * - Si hay departamento seleccionado, busca solo ahí.
 * - Si no, busca en todos los senadores.
 */
const resultadosBusqueda = computed(() => {
  if (!terminoBusqueda.value.trim()) return []
  const base = departamentoSeleccionado.value
    ? senadoresPorDepartamento.value
    : senadores
  return base.filter(s => coincide(s.name, terminoBusqueda.value))
})

// ========================================== //
// MÉTODOS
// ========================================== //
const onDepartamentoChange = () => {
  terminoBusqueda.value = '' // limpia búsqueda al cambiar de departamento
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