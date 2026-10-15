<template>
  <div>
    <h2 class="text-[6.6vw] md:text-[2.2vw] font-bold text-senado-primary mb-6">
      Facultades Legislativas
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- ========================================== -->
      <!-- LEGISLACIÓN                               -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest3 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">
          LEGISLACIÓN
        </div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li
              v-for="item in legislacionItems"
              :key="item.label"
              class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800"
            >
              <NuxtLink
                :to="item.link"
                class="flex items-center gap-2 hover:text-senado-primary w-full"
              >
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">
                {{ item.count }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- FISCALIZACIÓN                             -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest2 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">
          FISCALIZACIÓN
        </div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li
              v-for="item in fiscalizacionItems"
              :key="item.link"
              class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800"
            >
              <NuxtLink
                :to="item.link"
                class="flex items-center gap-2 hover:text-senado-primary w-full"
              >
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">
                {{ item.count }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- GESTIÓN                                   -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest2 rounded-[4.5vw] md:rounded-[1.5vw] hover:shadow-lg transition-shadow overflow-hidden">
        <div class="bg-senado-gold-light text-black px-4 py-2 text-[4.2vw] md:text-[1.4vw] text-center font-[500]">
          GESTIÓN
        </div>
        <div class="p-4">
          <ul class="mt-3 space-y-2 text-[3.6vw] md:text-[1.2vw]">
            <li
              v-for="item in gestionItems"
              :key="item.link"
              class="flex items-center justify-between hover:text-senado-primary transition-colors text-gray-800"
            >
              <NuxtLink
                :to="item.link"
                class="flex items-center gap-2 hover:text-senado-primary w-full"
              >
                <span class="text-senado-gold-dark font-bold">></span>
                <span>{{ item.label }}</span>
              </NuxtLink>
              <span class="bg-senado-primary text-white text-[2.4vw] md:text-[0.8vw] px-2 py-0.5 rounded-full min-w-[9.6vw] md:min-w-[3.2vw] text-center font-medium">
                {{ item.count }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDocumentosLegislativos } from '~/composables/useDocumentosLegislativos'

const { getStats } = useDocumentosLegislativos()

// ============================================
// ESTADO DE CONTADORES (por tipo)
// ============================================
const counts = ref<Record<string, number>>({
  // Fiscalización
  'peticion-informe-escrito': 0,
  'peticion-informe-oral': 0,
  // Gestión
  'resolucion-camaral': 0,
  'declaracion-camaral': 0,
  'minuta-comunicacion': 0,
  'homenaje-camaral': 0,
  // Legislación
  'proyecto-ley-tratamiento-senado': 0,
  'proyecto-ley-aprobados': 0,
  'proyecto-ley-sancionados': 0,
  'proyecto-ley-modificaciones': 0,
  'proyecto-ley-rechazados': 0,
  'ley-promulgada': 0
})

// ============================================
// ITEMS DE CADA BLOQUE (usando counts)
// ============================================
const legislacionItems = computed(() => [
  {
    label: 'Proyectos de Ley en Tratamiento',
    count: counts.value['proyecto-ley-tratamiento-senado'] || 0,
    link: '/facultades-legislativas/proyectos-tratamiento'
  },
  {
    label: 'Proyectos de Ley Aprobados',
    count: counts.value['proyecto-ley-aprobados'] || 0,
    link: '/facultades-legislativas/proyectos-aprobados'
  },
  {
    label: 'Leyes Sancionadas',
    count: counts.value['proyecto-ley-sancionados'] || 0,
    link: '/facultades-legislativas/leyes-sancionadas'
  },
  {
    label: 'Proyectos de Ley con Modificaciones',
    count: counts.value['proyecto-ley-modificaciones'] || 0,
    link: '/facultades-legislativas/proyectos-modificaciones'
  },
  {
    label: 'Proyectos de Ley Rechazados',
    count: counts.value['proyecto-ley-rechazados'] || 0,
    link: '/facultades-legislativas/proyectos-rechazados'
  }
])

const fiscalizacionItems = computed(() => [
  {
    label: 'Peticiones de Informe Escrito',
    count: counts.value['peticion-informe-escrito'] || 0,
    link: '/peticiones-informe-escrito'
  },
  {
    label: 'Peticiones de Informe Oral',
    count: counts.value['peticion-informe-oral'] || 0,
    link: '/peticiones-informe-oral'
  }
])

const gestionItems = computed(() => [
  {
    label: 'Resoluciones Camarales',
    count: counts.value['resolucion-camaral'] || 0,
    link: '/resoluciones-camarales'
  },
  {
    label: 'Declaraciones Camarales',
    count: counts.value['declaracion-camaral'] || 0,
    link: '/declaraciones-camarales'
  },
  {
    label: 'Minutas de Comunicación',
    count: counts.value['minuta-comunicacion'] || 0,
    link: '/minutas-comunicacion'
  }
])

// ============================================
// CARGA DE CONTADORES
// ============================================
const cargarContadores = async () => {
  const tipos = Object.keys(counts.value)

  // Cargar todos los stats en paralelo, sin que uno bloquee a los otros
  const results = await Promise.allSettled(
    tipos.map((tipo) => getStats(tipo as any))
  )

  const nuevos = { ...counts.value }
  results.forEach((result, idx) => {
    const tipo = tipos[idx]
    if (result.status === 'fulfilled' && result.value) {
      nuevos[tipo] = result.value.total || 0
    }
  })
  counts.value = nuevos
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  cargarContadores()
})
</script>