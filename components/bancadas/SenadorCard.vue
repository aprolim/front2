<!-- components/bancadas/SenadorCard.vue -->
<template>
  <NuxtLink
    :to="rutaPerfil"
    class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center gap-3 p-3"
  >
    <!-- Foto -->
    <div class="flex-shrink-0">
      <img
        :src="senador.foto || defaultAvatar"
        :alt="senador.name"
        class="w-16 h-16 rounded-full object-cover border-2 group-hover:scale-105 transition-transform"
        :style="{ borderColor: bancada.color }"
        @error="(e) => (e.target.src = defaultAvatar)"
      />
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <h3
        class="font-bold text-[#611717] text-sm leading-tight truncate group-hover:underline"
      >
        {{ senador.name }}
      </h3>

      <p class="text-xs text-gray-500 mt-0.5 truncate">
        {{ senador.department }}
      </p>

      <div class="flex items-center gap-1.5 mt-1 flex-wrap">
        <span
          class="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
          :style="{ backgroundColor: bancada.color }"
        >
          {{ senador.partyShort }}
        </span>
        <span
          v-if="tipo === 'suplente' && senador.suplenteDe"
          class="text-[10px] text-gray-400 truncate max-w-[120px]"
          :title="'Suplente de: ' + senador.suplenteDe"
        >
          Sup. de {{ senador.suplenteDe }}
        </span>
        <span
          v-else-if="senador.cargo"
          class="text-[10px] text-[#611717] font-medium truncate max-w-[120px]"
          :title="senador.cargo"
        >
          {{ senador.cargo }}
        </span>
      </div>
    </div>

    <!-- Flecha -->
    <Icon
      name="mdi:chevron-right"
      class="text-xl text-gray-300 group-hover:text-[#611717] transition-colors flex-shrink-0"
    />
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  senador: {
    type: Object,
    required: true
  },
  bancada: {
    type: Object,
    required: true
  },
  tipo: {
    type: String,
    default: 'titular' // 'titular' | 'suplente'
  }
})

const defaultAvatar =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

const rutaPerfil = computed(() => {
  if (props.tipo === 'suplente') {
    return `/senador/suplente/${props.senador.slug}`
  }
  return `/senador/${props.senador.slug}`
})
</script>