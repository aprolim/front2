<!-- pages/directiva-camaral.vue -->
<template>
  <div class="min-h-screen bg-white py-12 relative overflow-hidden">
    <!-- Fondo de marca de agua -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
      style="background-image: url('/background/fondo3.png');"
    ></div>
    <div class="absolute inset-0 bg-white/70"></div>

    <div class="relative z-10 mx-auto w-[85%]">
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

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-4 text-gray-500">Cargando directiva...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-xl border border-red-200">
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button @click="fetchDirectiva" class="mt-4 px-6 py-2 bg-[#611717] text-white rounded-lg hover:bg-[#3a060d] transition text-sm">
          Reintentar
        </button>
      </div>

      <!-- Contenido -->
      <template v-else>
        <!-- Presidente -->
        <div class="max-w-4xl mx-auto mb-16" v-if="directiva.presidente">
          <div class="text-center mb-8">
            <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Presidente</span>
            <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
          </div>
          <div
            class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div class="flex flex-col md:flex-row items-center p-8 gap-8">
              <div class="flex-shrink-0">
                <img
                  :src="getImageUrl(directiva.presidente.foto)"
                  :alt="directiva.presidente.name"
                  class="w-[14vw] h-[14vw] rounded-full object-cover border-4 shadow-lg"
                  :style="{ borderColor: directiva.presidente.partyColor || '#e3d194' }"
                  @error="(e) => e.target.src = defaultAvatar"
                />
              </div>
              <div class="flex-1 text-center md:text-left">
                <h2 class="text-2xl md:text-3xl font-bold text-senado-primary">
                  {{ directiva.presidente.name }}
                </h2>
                <div class="flex items-center justify-center md:justify-start gap-3 mt-2 flex-wrap">
                  <span
                    class="text-sm font-medium px-3 py-1 rounded-full"
                    :style="{
                      backgroundColor: (directiva.presidente.partyColor || '#2E7078') + '20',
                      color: directiva.presidente.partyColor || '#2E7078'
                    }"
                  >
                    {{ directiva.presidente.partyShort || directiva.presidente.party || 'Sin partido' }}
                  </span>
                  <span class="text-sm text-gray-500">
                    {{ directiva.presidente.department }}
                  </span>
                </div>
                <p class="text-senado-primary font-semibold mt-3 text-lg">
                  Presidente del Senado
                </p>
                <NuxtLink
                  :to="`/senador/${directiva.presidente.slug}`"
                  class="inline-flex items-center gap-2 mt-4 text-senado-primary hover:text-senado-primary-dark font-medium transition-colors"
                >
                  Ver perfil completo →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Vicepresidencias -->
        <div class="max-w-5xl mx-auto mb-16" v-if="directiva.vicepresidencias && directiva.vicepresidencias.length > 0">
          <div class="text-center mb-8">
            <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Vicepresidencias</span>
            <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="cargo in directiva.vicepresidencias"
              :key="cargo.id"
              class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div class="flex items-center gap-4 p-6">
                <img
                  :src="getImageUrl(cargo.foto)"
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
                        backgroundColor: (cargo.partyColor || '#2E7078') + '20',
                        color: cargo.partyColor || '#2E7078'
                      }"
                    >
                      {{ cargo.partyShort || cargo.party || 'Sin partido' }}
                    </span>
                    <span class="text-xs text-gray-500">
                      {{ cargo.department }}
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-senado-primary mt-2">
                    {{ cargo.cargo || 'Vicepresidencia' }}
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
        <div class="max-w-5xl mx-auto mb-16" v-if="directiva.secretarias && directiva.secretarias.length > 0">
          <div class="text-center mb-8">
            <span class="text-sm font-bold text-senado-gold-dark uppercase tracking-wider">Secretarías</span>
            <div class="w-16 h-0.5 bg-senado-gold-dark mx-auto mt-2"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="cargo in directiva.secretarias"
              :key="cargo.id"
              class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div class="flex flex-col items-center p-6 text-center">
                <img
                  :src="getImageUrl(cargo.foto)"
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
                      backgroundColor: (cargo.partyColor || '#2E7078') + '20',
                      color: cargo.partyColor || '#2E7078'
                    }"
                  >
                    {{ cargo.partyShort || cargo.party || 'Sin partido' }}
                  </span>
                </div>
                <p class="text-sm font-semibold text-senado-primary mt-2">
                  {{ cargo.cargo || 'Secretaría' }}
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
      </template>

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
import { ref, onMounted } from 'vue'

const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// 🔥 URL del backend donde están las imágenes
const API_BASE_URL = 'https://demoback.senado.gob.bo'

const directiva = ref({
  presidente: null,
  vicepresidencias: [],
  secretarias: []
})
const loading = ref(false)
const error = ref(null)

// 🔥 Función para construir la URL completa de la imagen
const getImageUrl = (path) => {
  if (!path) return defaultAvatar
  // Si ya es una URL completa, devolverla
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  // Si es una ruta relativa (empieza con /), agregar la URL del backend
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`
  }
  return path
}

const fetchDirectiva = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/api/legisladores/directiva`)
    const result = await response.json()

    if (result.success && result.data) {
      directiva.value = result.data
      console.log('✅ Directiva cargada:', directiva.value)
    } else {
      throw new Error(result.message || 'Error al cargar la directiva')
    }
  } catch (err) {
    console.error('❌ Error:', err)
    error.value = err.message || 'Error al cargar la directiva'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDirectiva()
})
</script>