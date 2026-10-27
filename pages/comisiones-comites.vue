<template>
  <div class="min-h-screen bg-white py-[4vw]">
    <div class="mx-auto w-[90%]">

      <!-- Título -->
      <div class="mb-[6vw]">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-[1vw] font-bold px-[2.5vw] py-[0.7vw] rounded-full mb-[1.5vw]">
          📋 Comisiones y Comités
        </div>
        <h1 class="text-[3.2vw] font-bold text-senado-primary leading-tight">
          Comisiones y Comités
        </h1>

        <div class="w-[8vw] h-[0.2vw] bg-senado-gold-dark mt-[2vw] rounded-full"></div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-[8vw]">
        <div class="inline-block w-[3vw] h-[3vw] border-[0.25vw] border-[#611717] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-[1.5vw] text-gray-500 text-[1.1vw]">Cargando comisiones...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-[6vw] bg-red-50 rounded-[0.8vw] border border-red-200">
        <div class="text-[3vw] mb-[1vw]">⚠️</div>
        <p class="text-red-600 font-medium text-[1.1vw]">{{ error }}</p>
        <button @click="fetchComisiones" class="mt-[2vw] px-[3vw] py-[1vw] bg-[#611717] text-white rounded-[0.5vw] hover:bg-[#3a060d] transition text-[1vw]">
          Reintentar
        </button>
      </div>

      <!-- Contenido -->
      <template v-else>
        <!-- Buscador Mejorado -->
        <div class="max-w-[60vw] mx-auto mb-[4vw]">
          <div class="relative flex items-center">
            <div class="absolute left-[2vw] text-gray-400 flex items-center justify-center">
              <Icon name="mdi:magnify" class="text-[1.8vw]" />
            </div>
            
            <input
              v-model="busqueda"
              type="text"
              placeholder="Buscar comisión, comité o senador..."
              class="w-full pl-[5vw] pr-[4vw] py-[1.4vw] border border-gray-300 rounded-full text-[1.1vw] focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent bg-white shadow-sm transition-all"
            />
            
            <button
              v-if="busqueda"
              @click="limpiarBusqueda"
              class="absolute right-[2vw] text-gray-400 hover:text-gray-600 flex items-center justify-center p-[0.5vw]"
              title="Limpiar búsqueda"
            >
              <Icon name="mdi:close" class="text-[1.5vw]" />
            </button>
          </div>
          <div v-if="busqueda" class="text-[0.95vw] text-gray-500 mt-[0.8vw] text-center">
            {{ resultadosCount }} resultado{{ resultadosCount !== 1 ? 's' : '' }} encontrado{{ resultadosCount !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Lista de Comisiones -->
        <div class="max-w-[80vw] mx-auto space-y-[1.2vw]">
          <div
            v-for="comision in comisionesFiltradas"
            :key="comision.nombre"
            class="bg-white rounded-[0.8vw] shadow-md border overflow-hidden hover:shadow-lg transition-shadow"
            :class="comision.destacado ? 'border-senado-primary border-2' : 'border-gray-200'"
          >
            <!-- Cabecera -->
            <div
              @click="toggleItem(comision.nombre)"
              class="flex items-center justify-between px-[3vw] py-[1.2vw] cursor-pointer hover:bg-gray-50 transition-colors"
              :class="isOpen(comision.nombre) ? 'bg-senado-gold-lightest' : ''"
            >
              <div class="flex items-center gap-[1.5vw] flex-wrap">
                <div class="flex items-center gap-[1vw]">
                  <span
                    class="text-[1.2vw] font-bold"
                    :class="isOpen(comision.nombre) ? 'text-senado-primary' : 'text-gray-500'"
                  >
                    {{ isOpen(comision.nombre) ? '▾' : '▸' }}
                  </span>
                  <h2 class="text-[1.2vw] font-bold text-senado-primary" v-html="resaltarTexto(comision.nombre)"></h2>
                </div>
                
                <!-- 🔥 SE ELIMINÓ LA ETIQUETA AZUL DE "Comisión" AQUÍ -->
                
                <span class="text-[0.7vw] text-gray-400">
                  {{ (comision.comites || []).length }} comités
                </span>
                <span v-if="comision.destacado" class="text-[0.65vw] font-semibold px-[0.8vw] py-[0.25vw] rounded-full bg-yellow-100 text-yellow-700">
                  ✦ Coincidencia
                </span>
              </div>
              <div class="text-gray-400 text-[0.75vw]">
                {{ isOpen(comision.nombre) ? 'Cerrar ▲' : 'Abrir ▼' }}
              </div>
            </div>

            <!-- Contenido -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[5000px] opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-[5000px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="isOpen(comision.nombre)" class="overflow-hidden">
                <div class="px-[3vw] pb-[3vw] pt-[1vw]">

                  <!-- Presidente (Centrado) -->
                  <div v-if="comision.presidente" class="mb-[2.5vw]">
                    <div class="w-full bg-gray-50 rounded-[0.8vw] p-[3vw] border border-gray-100 flex flex-col items-center justify-center text-center">
                      
                      <NuxtLink
                        :to="`/senador/${generarSlug(comision.presidente.nombreCompleto)}`"
                        class="flex-shrink-0 mb-[1.5vw]"
                      >
                        <img
                          :src="getImageUrl(comision.presidente.foto)"
                          :alt="comision.presidente.nombreCompleto"
                          class="w-[14vw] h-[14vw] rounded-full object-cover border-[0.25vw] shadow-md hover:scale-105 transition-transform"
                          :style="{ borderColor: comision.presidente.color || '#ccc' }"
                          @error="(e) => e.target.src = defaultAvatar"
                        />
                      </NuxtLink>
                      
                      <div class="flex flex-col items-center gap-[0.5vw]">
                        <NuxtLink
                          :to="`/senador/${generarSlug(comision.presidente.nombreCompleto)}`"
                          class="text-[1.8vw] font-bold text-senado-primary hover:underline mb-[0.5vw] text-center leading-tight"
                        >
                          {{ comision.presidente.nombreCompleto }}
                        </NuxtLink>
                        
                        <span class="text-[1.3vw] font-bold text-gray-800 uppercase tracking-wider">
                          {{ obtenerPrimeraPalabra(comision.presidente.cargo) || 'SENADOR' }}
                        </span>
                        
                        <span
                          class="text-[1.4vw] font-bold px-[2vw] py-[0.5vw] rounded-md whitespace-nowrap tracking-wide shadow-sm mt-[0.2vw]"
                          :style="{
                            backgroundColor: comision.presidente.color + '20',
                            color: comision.presidente.color || '#666',
                            border: `2px solid ${comision.presidente.color || '#ccc'}`
                          }"
                        >
                          {{ comision.presidente.partido }}
                        </span>
                      </div>

                    </div>
                  </div>

                  <!-- Comités (En 2 Columnas, alturas iguales) -->
                  <div v-if="comision.comites && comision.comites.length > 0" class="border-t border-gray-100 pt-[1.5vw]">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-[1.5vw] items-stretch">
                      <div
                        v-for="comite in comision.comites"
                        :key="comite.nombre"
                        class="bg-gray-50 rounded-[0.8vw] p-[2vw] border flex flex-col h-full"
                        :class="comite.destacado ? 'border-senado-primary border-2 bg-senado-gold-lightest' : 'border-gray-100'"
                      >
                        <!-- Título del comité (arriba) -->
                        <div class="flex items-start gap-[0.8vw] flex-wrap mb-[1.5vw]">
                          <h4 class="font-semibold text-gray-800 text-[1.3vw] leading-tight" v-html="resaltarTexto(comite.nombre)"></h4>
                          
                          <span v-if="comite.destacado" class="text-[0.65vw] font-semibold px-[0.7vw] py-[0.15vw] rounded-full bg-yellow-100 text-yellow-700 mt-[0.2vw]">
                            ✦ Coincidencia
                          </span>
                        </div>

                        <!-- Tarjeta del Secretario -->
                        <div v-if="comite.secretario" class="w-full bg-white rounded-[0.8vw] p-[2vw] border border-gray-100 flex items-center gap-[2.5vw] mt-auto">
                          <NuxtLink
                            :to="`/senador/${generarSlug(comite.secretario.nombreCompleto)}`"
                            class="flex-shrink-0"
                          >
                            <img
                              :src="getImageUrl(comite.secretario.foto)"
                              :alt="comite.secretario.nombreCompleto"
                              class="w-[11vw] h-[11vw] rounded-full object-cover border-[0.2vw] flex-shrink-0"
                              :style="{ borderColor: comite.secretario.color || '#ccc' }"
                              @error="(e) => e.target.src = defaultAvatar"
                            />
                          </NuxtLink>
                          <div class="flex-1 min-w-0 flex flex-col gap-[0.5vw]">
                            <div class="flex items-center flex-wrap w-full">
                              <NuxtLink
                                :to="`/senador/${generarSlug(comite.secretario.nombreCompleto)}`"
                                class="text-[1.3vw] font-bold text-senado-primary hover:underline leading-tight break-words"
                              >
                                {{ comite.secretario.nombreCompleto }}
                              </NuxtLink>
                            </div>
                            
                            <!-- Cargo arriba y Partido abajo -->
                            <div class="flex flex-col items-start gap-[0.4vw]">
                              <span class="text-[1.1vw] font-bold text-gray-800 uppercase tracking-wider mt-[0.2vw]">
                                {{ obtenerPrimeraPalabra(comite.secretario.cargo) || 'SENADOR' }}
                              </span>
                              <span
                                class="text-[1.2vw] font-bold px-[1.5vw] py-[0.4vw] rounded-md whitespace-nowrap tracking-wide shadow-sm"
                                :style="{
                                  backgroundColor: comite.secretario.color + '20',
                                  color: comite.secretario.color || '#666',
                                  border: `1px solid ${comite.secretario.color || '#ccc'}`
                                }"
                              >
                                {{ comite.secretario.partido }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Sin resultados -->
        <div v-if="comisionesFiltradas.length === 0" class="text-center py-[8vw]">
          <div class="flex justify-center mb-[1.5vw] text-gray-300">
             <Icon name="mdi:file-search-outline" class="text-[5vw]" />
          </div>
          <h3 class="text-[1.6vw] font-bold text-gray-700 mb-[0.8vw]">No se encontraron resultados</h3>
          <p class="text-gray-500 text-[1.1vw]">No hay comisiones, comités o senadores que coincidan con "<strong>{{ busqueda }}</strong>"</p>
          <button
            @click="limpiarBusqueda"
            class="mt-[2.5vw] text-senado-primary hover:underline text-[1.1vw] font-medium flex items-center gap-[0.5vw] mx-auto"
          >
            <Icon name="mdi:backspace-outline" class="text-[1.2vw]" />
            Limpiar búsqueda
          </button>
        </div>

        <!-- Botón volver -->
        <div class="mt-[5vw] text-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-[0.8vw] text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
          >
            <Icon name="mdi:arrow-left" class="text-[1.4vw]" />
            Volver al inicio
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ========================================== //
// CONSTANTES
// ========================================== //
const API_BASE_URL = 'https://demoback.senado.gob.bo'
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// ========================================== //
// ESTADO
// ========================================== //
const comisionesData = ref([])
const loading = ref(false)
const error = ref(null)
const itemsAbiertos = ref(new Set())
const busqueda = ref('')

// ========================================== //
// FUNCIONES
// ========================================== //
const getImageUrl = (path) => {
  if (!path) return defaultAvatar
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/')) {
    return `${API_BASE_URL}${path}`
  }
  return path
}

const generarSlug = (nombre) => {
  if (!nombre) return ''
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Extrae solo la primera palabra del cargo
const obtenerPrimeraPalabra = (texto) => {
  if (!texto) return ''
  return texto.trim().split(/\s+/)[0]
}

const toggleItem = (nombre) => {
  if (itemsAbiertos.value.has(nombre)) {
    itemsAbiertos.value.delete(nombre)
  } else {
    itemsAbiertos.value.add(nombre)
  }
}

const isOpen = (nombre) => {
  return itemsAbiertos.value.has(nombre)
}

const limpiarBusqueda = () => {
  busqueda.value = ''
}

const normalizarTexto = (texto) => {
  if (!texto) return ''
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const resaltarTexto = (texto) => {
  if (!busqueda.value || !texto) return texto
  const busquedaNormalizada = normalizarTexto(busqueda.value)
  const textoNormalizado = normalizarTexto(texto)
  const index = textoNormalizado.indexOf(busquedaNormalizada)
  if (index === -1) return texto
  const inicio = texto.substring(0, index)
  const coincidencia = texto.substring(index, index + busqueda.value.length)
  const fin = texto.substring(index + busqueda.value.length)
  return `${inicio}<span class="bg-yellow-200 font-bold">${coincidencia}</span>${fin}`
}

// ========================================== //
// FETCH DATA
// ========================================== //
const fetchComisiones = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${API_BASE_URL}/api/legisladores/comisiones`)
    const result = await response.json()

    if (result.success && result.data) {
      comisionesData.value = result.data
      console.log('✅ Comisiones cargadas:', comisionesData.value.length)
    } else {
      throw new Error(result.message || 'Error al cargar comisiones')
    }
  } catch (err) {
    console.error('❌ Error:', err)
    error.value = err.message || 'Error al cargar comisiones'
  } finally {
    loading.value = false
  }
}

// ========================================== //
// FILTRADO MEJORADO
// ========================================== //
const comisionesFiltradas = computed(() => {
  if (!busqueda.value.trim()) {
    return comisionesData.value
  }

  const busquedaNormalizada = normalizarTexto(busqueda.value)
  const palabras = busquedaNormalizada.split(/\s+/).filter(p => p.length > 0)

  return comisionesData.value.map(comision => {
    const comisionNombre = normalizarTexto(comision.nombre)
    const nombrePresidente = comision.presidente ? normalizarTexto(comision.presidente.nombreCompleto) : ''
    
    let comisionCoincide = false
    let presidenteCoincide = false
    let comitesCoinciden = false

    for (const palabra of palabras) {
      if (comisionNombre.includes(palabra)) {
        comisionCoincide = true
        break
      }
    }

    for (const palabra of palabras) {
      if (nombrePresidente.includes(palabra)) {
        presidenteCoincide = true
        comisionCoincide = true
        break
      }
    }

    const comitesFiltrados = (comision.comites || []).map(comite => {
      const comiteNombre = normalizarTexto(comite.nombre)
      const nombreSecretario = comite.secretario ? normalizarTexto(comite.secretario.nombreCompleto) : ''
      
      let comiteCoincide = false
      let secretarioCoincide = false

      for (const palabra of palabras) {
        if (comiteNombre.includes(palabra)) comiteCoincide = true
        if (nombreSecretario.includes(palabra)) secretarioCoincide = true
      }

      if (comiteCoincide || secretarioCoincide) {
        comitesCoinciden = true
        return { ...comite, destacado: true }
      }
      
      if (comisionCoincide || presidenteCoincide) {
         return { ...comite, destacado: false }
      }

      return null
    }).filter(Boolean)

    if (comisionCoincide || comitesCoinciden) {
      return {
        ...comision,
        destacado: comisionCoincide,
        comites: comitesFiltrados
      }
    }

    return null
  }).filter(Boolean)
})

const resultadosCount = computed(() => {
  return comisionesFiltradas.value.length
})

// ========================================== //
// MOUNTED
// ========================================== //
onMounted(() => {
  fetchComisiones()
})
</script>