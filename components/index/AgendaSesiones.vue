<template>
  <div>
    <h2 class="text-[6.6vw] md:text-[2.2vw] font-bold text-senado-primary mb-6 flex items-center gap-3">
      <Icon name="mdi:calendar-month" class="text-[7.5vw] md:text-[2.5vw] text-senado-primary" />
      Agenda de Sesiones
    </h2>
    
    <CalendarioActividades 
      :fechas-sesiones="fechasSesiones"
      :actividades="actividadesExtra"
    />
  </div>
</template>

<script setup>
import CalendarioActividades from '~/components/CalendarioActividades.vue'

defineProps({
  fechasSesiones: {
    type: Array,
    default: () => []
  },
  actividadesExtra: {
    type: Array,
    default: () => []
  }
})
</script>