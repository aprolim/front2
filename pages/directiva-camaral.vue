<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-12">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
          🏛️ Directiva Camaral
        </div>
        <h1 class="text-[4vw] font-bold text-senado-primary leading-tight">
          Directiva Camaral
        </h1>
        <p class="text-gray-600 text-lg mt-4 max-w-3xl">
          Conoce a los miembros de la Directiva de la Cámara de Senadores para la Legislatura 2025-2026
        </p>
        <div class="w-24 h-1 bg-senado-gold-dark mt-4 rounded-full"></div>
      </div>

      <!-- Presidente -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="text-center mb-8">
          <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Presidente</span>
          <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
        </div>
        <div
          v-if="presidente"
          class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <div class="flex flex-col md:flex-row items-center p-8 gap-8">
            <div class="flex-shrink-0">
              <img
                :src="presidente.foto || defaultAvatar"
                :alt="presidente.name"
                class="w-[14vw] h-[14vw] rounded-full object-cover border-4 shadow-lg"
                :style="{ borderColor: presidente.partyColor || '#e3d194' }"
                @error="(e) => e.target.src = defaultAvatar"
              />
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl md:text-3xl font-bold text-senado-primary">
                {{ presidente.name }}
              </h2>
              <div class="flex items-center justify-center md:justify-start gap-3 mt-2 flex-wrap">
                <span
                  class="text-sm font-medium px-3 py-1 rounded-full"
                  :style="{
                    backgroundColor: presidente.partyColor + '20',
                    color: presidente.partyColor || '#666'
                  }"
                >
                  {{ presidente.partyShort || presidente.party || 'Sin partido' }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ presidente.department }}
                </span>
              </div>
              <p class="text-senado-primary font-semibold mt-3 text-lg">
                Presidente del Senado
              </p>
              <NuxtLink
                :to="`/senador/${presidente.slug}`"
                class="inline-flex items-center gap-2 mt-4 text-senado-primary hover:text-senado-primary-dark font-medium transition-colors"
              >
                Ver perfil completo →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Vicepresidencias -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="text-center mb-8">
          <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Vicepresidencias</span>
          <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="cargo in vicepresidencias"
            :key="cargo.id"
            class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center gap-4 p-6">
              <img
                :src="cargo.foto || defaultAvatar"
                :alt="cargo.name"
                class="w-[12vw] h-[12vw] rounded-full object-cover border-2 flex-shrink-0"
                :style="{ borderColor: cargo.partyColor || '#ccc' }"
                @error="(e) => e.target.src = defaultAvatar"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-senado-primary truncate">
                  {{ cargo.name }}
                </h3>
                <div class="flex items-center gap-2 flex-wrap mt-1">
                  <span
                    class="text-xs font-medium px-2 py-0.5 rounded"
                    :style="{
                      backgroundColor: cargo.partyColor + '20',
                      color: cargo.partyColor || '#666'
                    }"
                  >
                    {{ cargo.partyShort || cargo.party || 'Sin partido' }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ cargo.department }}
                  </span>
                </div>
                <p class="text-sm font-semibold text-senado-primary mt-2">
                  {{ cargo.cargo }}
                </p>
                <NuxtLink
                  :to="`/senador/${cargo.slug}`"
                  class="text-sm text-senado-primary hover:text-senado-primary-dark font-medium transition-colors inline-block mt-1"
                >
                  Ver perfil →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Secretarías -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="text-center mb-8">
          <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Secretarías</span>
          <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="cargo in secretarias"
            :key="cargo.id"
            class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="flex flex-col items-center p-6 text-center">
              <img
                :src="cargo.foto || defaultAvatar"
                :alt="cargo.name"
                class="w-[12vw] h-[12vw] rounded-full object-cover border-2 flex-shrink-0"
                :style="{ borderColor: cargo.partyColor || '#ccc' }"
                @error="(e) => e.target.src = defaultAvatar"
              />
              <h3 class="text-base font-bold text-senado-primary mt-3 truncate w-full">
                {{ cargo.name }}
              </h3>
              <div class="flex items-center gap-2 flex-wrap mt-1 justify-center">
                <span
                  class="text-xs font-medium px-2 py-0.5 rounded"
                  :style="{
                    backgroundColor: cargo.partyColor + '20',
                    color: cargo.partyColor || '#666'
                  }"
                >
                  {{ cargo.partyShort || cargo.party || 'Sin partido' }}
                </span>
              </div>
              <p class="text-sm font-semibold text-senado-primary mt-2">
                {{ cargo.cargo }}
              </p>
              <NuxtLink
                :to="`/senador/${cargo.slug}`"
                class="text-sm text-senado-primary hover:text-senado-primary-dark font-medium transition-colors inline-block mt-2"
              >
                Ver perfil →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center">
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
import { ref, computed } from 'vue'
import { senadores } from '~/data/senadores'

// ========================================== //
// CONSTANTES
// ========================================== //
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// ========================================== //
// IDS DE LA DIRECTIVA
// ========================================== //
const DIRECTIVA_IDS = {
  presidente: 32,      // Diego Esteban Mateo Ávila Navajas
  primeraVice: 6,      // Carmen Soledad Chapeton Tancara
  segundaVice: 12,     // Kathia Lizbeth Quiroga Fernández
  primeraSecretaria: 33, // Yasmín Estivariz Villarroel
  segundaSecretaria: 13, // Rosa Tatiana Áñez Carrasco
  terceraSecretaria: 24 // Julio Diego Romaña Galindo
}

// ========================================== //
// OBTENER SENADOR POR ID
// ========================================== //
const getSenadorById = (id) => {
  return senadores.find(s => s.id === id) || null
}

// ========================================== //
// COMPUTADAS
// ========================================== //
const presidente = computed(() => {
  return getSenadorById(DIRECTIVA_IDS.presidente)
})

const vicepresidencias = computed(() => {
  const cargos = []
  const primera = getSenadorById(DIRECTIVA_IDS.primeraVice)
  const segunda = getSenadorById(DIRECTIVA_IDS.segundaVice)

  if (primera) {
    cargos.push({
      ...primera,
      cargo: 'Primera Vicepresidencia'
    })
  }
  if (segunda) {
    cargos.push({
      ...segunda,
      cargo: 'Segunda Vicepresidencia'
    })
  }
  return cargos
})

const secretarias = computed(() => {
  const cargos = []
  const primera = getSenadorById(DIRECTIVA_IDS.primeraSecretaria)
  const segunda = getSenadorById(DIRECTIVA_IDS.segundaSecretaria)
  const tercera = getSenadorById(DIRECTIVA_IDS.terceraSecretaria)

  if (primera) {
    cargos.push({
      ...primera,
      cargo: 'Primera Secretaria'
    })
  }
  if (segunda) {
    cargos.push({
      ...segunda,
      cargo: 'Segunda Secretaria'
    })
  }
  if (tercera) {
    cargos.push({
      ...tercera,
      cargo: 'Tercera Secretaria'
    })
  }
  return cargos
})
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>