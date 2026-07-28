<template>
  <div class="container-senado py-10">
    <div v-if="senator" class="max-w-4xl mx-auto">
      <!-- Botón volver -->
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:underline mb-6">
        ← Volver al hemiciclo
      </NuxtLink>

      <!-- Tarjeta del senador -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Foto -->
          <div class="md:col-span-1 bg-senado-primary/10 p-6 flex flex-col items-center justify-center">
            <div 
              class="w-48 h-48 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-lg"
              :style="{ backgroundColor: senator.partyColor }"
            >
              {{ getInitials(senator.name) }}
            </div>
            <span 
              class="mt-4 px-4 py-1 rounded-full text-white font-bold text-sm"
              :style="{ backgroundColor: senator.partyColor }"
            >
              {{ senator.partyShort }}
            </span>
          </div>

          <!-- Información -->
          <div class="md:col-span-2 p-6">
            <h1 class="text-3xl font-bold text-gray-800">{{ senator.name }}</h1>
            
            <div class="mt-4 space-y-3">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Departamento:</span>
                <span class="text-gray-800">{{ senator.department }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Bancada:</span>
                <span class="text-gray-800">{{ senator.bancada }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Partido:</span>
                <span class="text-gray-800">{{ senator.party }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Asiento N°:</span>
                <span class="text-gray-800">{{ senator.seatNumber }}</span>
              </div>
            </div>

            <!-- Comisiones -->
            <div v-if="senator.comision || senator.comite" class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="font-bold text-gray-700 mb-3">Comisiones y Comités</h3>
              <div v-if="senator.comision" class="bg-senado-primary/5 p-3 rounded-lg mb-2">
                <span class="font-semibold text-senado-primary">Comisión:</span>
                <span class="text-gray-700 ml-2">{{ senator.comision }}</span>
              </div>
              <div v-if="senator.comite" class="bg-senado-primary/5 p-3 rounded-lg">
                <span class="font-semibold text-senado-primary">Comité:</span>
                <span class="text-gray-700 ml-2">{{ senator.comite }}</span>
              </div>
            </div>

            <!-- Cargo -->
            <div v-if="senator.cargo" class="mt-4">
              <span class="inline-block bg-senado-primary text-white px-4 py-2 rounded-lg font-semibold">
                {{ senator.cargo }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-600">Senador no encontrado</h2>
      <NuxtLink to="/" class="text-senado-primary hover:underline mt-4 inline-block">
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Definir los mismos senadores que en el componente (o importarlos desde un archivo compartido)
const senators = [
  // ... (todos los senadores igual que en el componente)
]

const route = useRoute()
const id = computed(() => parseInt(route.params.id))

const senator = computed(() => {
  return senators.find(s => s.id === id.value)
})

const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}
</script>