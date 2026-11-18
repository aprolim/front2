<!-- components/FacultadesLegislativas.vue -->
<template>
  <div>
    <!-- Título condicional -->
    <h2 v-if="mostrarEncabezado" class="text-[6.6vw] md:text-[2.2vw] font-bold text-senado-primary mb-6">
      Facultades Constitucionales
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
    </div>

    <!-- ========================================== -->
    <!-- BOTONES DE GESTIÓN LEGISLATIVA             -->
    <!-- ========================================== -->
    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        v-for="g in gestiones"
        :key="g.id"
        @click="cambiarGestion(g.id)"
        class="px-5 py-2 rounded-full text-[3.4vw] md:text-[1vw] font-semibold border-2 transition-all duration-200"
        :class="esGestionActiva(g.id)
          ? 'bg-senado-primary text-white border-senado-primary shadow-md'
          : 'bg-senado-gold-lightest3 text-senado-primary border-senado-gold-light hover:bg-senado-gold-light'"
        :title="`Ver legislación de la gestión ${g.label}`"
      >
        Legislación {{ g.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDocumentosLegislativos } from '~/composables/useDocumentosLegislativos'
import { useGestionStore } from '~/stores/gestion'

// ============================================
// PROPS (Nuevo: controla el encabezado)
// ============================================
defineProps({
  mostrarEncabezado: {
    type: Boolean,
    default: true
  }
})

const { getStats } = useDocumentosLegislativos()

// ============================================
// GESTIÓN ACTIVA (persistida en localStorage)
// ============================================
const gestionStore = useGestionStore()
const { activa, gestiones } = storeToRefs(gestionStore)

const esGestionActiva = (id) => activa.value === id

const cambiarGestion = (id) => {
  if (activa.value === id) return
  gestionStore.setGestion(id)
}

// ============================================
// ESTADO DE CONTADORES (por tipo)
// ============================================
const counts = ref({
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
  'proyecto-ley-revision-diputados': 0,
  'proyecto-ley-aprobados': 0,
  'proyecto-ley-modificaciones': 0,
  'proyecto-ley-rechazados': 0
})

// ============================================
// ITEMS DE CADA BLOQUE (con rutas corregidas)
// ============================================
const legislacionItems = computed(() => [
  {
    label: 'Proyectos de Ley Aprobados',
    count: counts.value['proyecto-ley-aprobados'] || 0,
    link: '/proyectos-aprobados'
  },
  {
    label: 'Proyectos de Ley en Tratamiento (Origen Senado)',
    count: counts.value['proyecto-ley-tratamiento-senado'] || 0,
    link: '/proyectos-tratamiento'
  },
  {
    label: 'Proyectos de Ley en Revisión (Origen Diputados)',
    count: counts.value['proyecto-ley-revision-diputados'] || 0,
    link: '/proyectos-revision-diputados'
  },
  {
    label: 'Proyectos de Ley con Modificaciones (Devueltos a la Camara de Diputados)',
    count: counts.value['proyecto-ley-modificaciones'] || 0,
    link: '/proyectos-modificaciones'
  },
  {
    label: 'Proyectos de Ley Rechazados',
    count: counts.value['proyecto-ley-rechazados'] || 0,
    link: '/proyectos-rechazados'
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
  },
  {
    label: 'Homenajes Camarales',
    count: counts.value['homenaje-camaral'] || 0,
    link: '/homenajes-camarales'
  }
])

// ============================================
// CARGA DE CONTADORES
// ============================================
const cargarContadores = async () => {
  const tipos = Object.keys(counts.value)
  // 🔥 Los contadores respetan la gestión activa
  const filtro = gestionStore.filtro

  console.log('🔎 [Contadores] gestión activa =', gestionStore.activa, '| filtro =', JSON.stringify(filtro))

  const results = await Promise.allSettled(
    tipos.map((tipo) => getStats(tipo, filtro))
  )

  const nuevos = { ...counts.value }
  results.forEach((result, idx) => {
    const tipo = tipos[idx]
    if (result.status === 'fulfilled' && result.value) {
      // useApi desenvuelve `data.data`, así que aquí ya llega
      // { total, activos, eliminados } directamente.
      const r = result.value
      const valor = r?.total ?? r?.data?.total ?? 0
      nuevos[tipo] = valor || 0
    } else if (result.status === 'rejected') {
      console.warn(`⚠️ [Contadores] ${tipo}:`, result.reason?.message || result.reason)
    }
  })
  console.log('🔎 [Contadores] resultado:', JSON.stringify(nuevos))

  // ⚠️ Sin esta asignación los contadores no se actualizan
  counts.value = nuevos
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  // ⚠️ En SSR el store se crea en el servidor (sin localStorage), y esa
  // instancia se reutiliza al hidratar. Por eso re-sincronizamos la
  // gestión desde el almacenamiento ANTES de pedir los contadores.
  gestionStore.sincronizarDesdeStorage()
  cargarContadores()
})

// 🔥 Recargar contadores cuando cambia la gestión
watch(activa, () => {
  cargarContadores()
})
</script>