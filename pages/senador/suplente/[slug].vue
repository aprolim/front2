<template>
  <div class="py-10">
    <div v-if="suplente" class="max-w-6xl mx-auto">
      <!-- Botón volver con history.back() y fallback -->
      <button 
        @click="volver"
        class="inline-flex items-center gap-2 text-senado-primary hover:underline mb-6 cursor-pointer"
      >
        ← Volver al hemiciclo
      </button>

      <!-- Tarjeta del suplente -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- PRIMERA FILA: 3 columnas -->
        <div class="bg-[#EDEEED]">
          <div class="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 w-[80%] mx-auto">
            <!-- Columna 1: Foto -->
            <div class="md:col-span-3 p-[1.2vw] flex flex-col items-center justify-center">
              <img 
                :src="suplente.fotoSuplente || '/images/default-avatar.png'" 
                :alt="suplente.nombreSuplente"
                class="w-[12vw] h-[12vw] rounded-full object-cover border-[.2vw] shadow-lg"
                :style="{ borderColor: suplente.partyColor }"
                @error="(e) => e.target.src = '/images/default-avatar.png'"
              />
            </div>

            <!-- Columna 2: Nombre y cargo -->
            <div class="md:col-span-6 py-[1.2vw] ml-[-1vw] flex flex-col justify-center">
              <h1 class="text-[1.8vw] font-bold text-senado-primary">{{ suplente.nombreSuplente }}</h1>
              <p class="text-[1.1vw] text-black">Senador Suplente por {{ suplente.department }}</p>
              <p class="text-[0.9vw] text-gray-500">Suplente de: {{ suplente.name }}</p>
              <p v-if="suplente.cargo" class="font-semibold text-[1.0vw] leading-tight">
                {{ suplente.cargo }}
              </p>
            </div>

            <!-- Columna 3: Partido -->
            <div class="md:col-span-3 flex flex-col items-center justify-center">
              <div class="relative inline-block group">
                <img 
                  :src="getLogoPartido(suplente.partyShort)" 
                  :alt="suplente.partyShort"
                  class="h-[8vw] w-auto object-contain transition-opacity duration-300"
                  :class="{'group-hover:opacity-0': getLogoPartidoHover(suplente.partyShort)}"
                  @error="(e) => e.target.src = ''"
                />
                <img 
                  :src="getLogoPartidoHover(suplente.partyShort)" 
                  :alt="suplente.partyShort + ' hover'"
                  class="h-[8vw] w-auto object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  @error="(e) => e.target.style.display = 'none'"
                />
              </div>
              <span 
                class="px-[.8vw] py-[.2vw] w-[10.8vw] rounded-full text-black text-[0.8vw] mt-[0.8vw] text-center"
              >
                {{ suplente.party?.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>

        <!-- SEGUNDA FILA: 3 columnas iguales -->
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Columna 1: Datos personales -->
          <div class="p-[.2vw] border-r border-gray-200">
            <div class="grid grid-cols-2 text-[1.8vw] pt-[2vw]">
              <div class="space-y-3 text-[.5em]">
                <div><span class="font-semibold text-gray-600">Nombres:</span></div>
                <div><span class="font-semibold text-gray-600">Departamento:</span></div>
                <div><span class="font-semibold text-gray-600">Partido:</span></div>
                <div><span class="font-semibold text-gray-600">Bancada:</span></div>
                <div><span class="font-semibold text-gray-600">Suplente de:</span></div>
              </div>
              
              <div class="space-y-3 text-[.5em]">
                <div><span class="text-gray-800">{{ suplente.nombreSuplente }}</span></div>
                <div><span class="text-gray-800">{{ suplente.department }}</span></div>
                <div><span class="text-gray-800">{{ suplente.party }}</span></div>
                <div><span class="text-gray-800">{{ suplente.bancada }}</span></div>
                <div>
                  <NuxtLink :to="`/senador/${suplente.slug}`" class="text-senado-primary hover:underline">
                    {{ suplente.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna 2: Mapa -->
          <div class="p-6 border-r border-gray-200 flex flex-col items-center justify-start">
            <h3 class="text-[1vw] font-semibold text-gray-600 mb-3 text-left w-full">DISTRITO ELECTORAL</h3>
            <img 
              :src="getMapaDepartamento(suplente.department)" 
              :alt="'Mapa de ' + suplente.department"
              class="h-[12vw] w-auto object-contain"
              @error="(e) => e.target.src = '/images/mapa-default.svg'"
            />
          </div>

          <!-- Columna 3: Asiento en el Hemiciclo -->
          <div class="p-6 flex flex-col justify-center">
            <h3 class="text-[1vw] font-semibold text-gray-600 text-left w-full">ASIENTO EN EL HEMICICLO</h3>
            <div class="flex flex-col items-center">
              <img 
                :src="getAsientoHemiciclo(suplente.seatNumber)" 
                :alt="'Asiento ' + suplente.seatNumber"
                class="h-[15vw] w-[15vw] object-contain"
                @error="(e) => e.target.src = ''"
              />
              <span class="text-[1vw] font-bold text-senado-primary text-right w-full translate-y-[-2vw]">Asiento {{ suplente.seatNumber }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- LÍNEA CON IMAGEN PEQUEÑA CENTRADA -->
      <div class="flex items-center justify-center my-10">
        <div class="flex-1 h-px bg-[#000]"></div>
        <div class="flex-shrink-0">
          <img src="/images/LogoBordo.svg" alt="Senado" class="h-[2vw] w-auto object-contain brightness-0 opacity-100" />
        </div>
        <div class="flex-1 h-px bg-[#000]"></div>
      </div>
      <MandatoFuncionesAntecedentes />
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-600">Suplente no encontrado</h2>
      <NuxtLink to="/" class="text-senado-primary hover:underline mt-4 inline-block">
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSenadores } from '~/composables/useSenadores'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'

const route = useRoute()
const { getSuplenteBySlug } = useSenadores()

const slug = computed(() => route.params.slug)

const suplente = computed(() => {
  return getSuplenteBySlug(slug.value)
})

// Función para volver atrás o ir al inicio
const volver = () => {
  // Si hay historial (viene de otra página), volver atrás
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // Si no hay historial (ej: abierto en nueva pestaña), ir a inicio
    navigateTo('/')
  }
}

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
  return mapas[departamento] || '/mapas/default.svg'
}

const getLogoPartido = (partyShort) => {
  const logos = {
    'PDC': '/logos FuerzasPoliticas/PDC.svg',
    'UNIDAD': '/logos FuerzasPoliticas/AlianzaUnidad.svg',
    'LIBRE': '/logos FuerzasPoliticas/Libre.svg',
    'APB': '/logos FuerzasPoliticas/Sumate.svg'
  }
  return logos[partyShort] || ''
}

const getLogoPartidoHover = (partyShort) => {
  const logosHover = {
    'PDC': '/logos FuerzasPoliticas/PDCHover.svg',
    'UNIDAD': '/logos FuerzasPoliticas/AlianzaUnidadHover.svg',
    'LIBRE': '/logos FuerzasPoliticas/LibreHover.svg',
    'APB': '/logos FuerzasPoliticas/SumateHover.svg'
  }
  return logosHover[partyShort] || ''
}

const getAsientoHemiciclo = (seatNumber) => {
  const asientos = {
    1: '/hemiciclo/1WilderVeliz.svg',
    2: '/hemiciclo/2JudithGarci╠üa.svg',
    3: '/hemiciclo/3ClaudiaMallon.svg',
    4: '/hemiciclo/4WandaMedrano.svg',
    5: '/hemiciclo/5JoseOrmachea.svg',
    6: '/hemiciclo/6SoledadChapeton.svg',
    7: '/hemiciclo/7NicanorCochisvg.svg',
    8: '/hemiciclo/8TomasaYarhui.svg',
    9: '/hemiciclo/9AbdonPorcel.svg',
    10: '/hemiciclo/10BerthaCartagena.svg',
    11: '/hemiciclo/11BrankoMarinkovic.svg',
    12: '/hemiciclo/12KhatiaQuiroga.svg',
    13: '/hemiciclo/13TatianaAnez.svg',
    14: '/hemiciclo/14PaolaLopez.svg',
    15: '/hemiciclo/15BettyCanaviri.svg',
    16: '/hemiciclo/16TeresaAlarcon.svg',
    17: '/hemiciclo/17MarcelinoFlores.svg',
    18: '/hemiciclo/18BerthaNurmy.svg',
    19: '/hemiciclo/19ErickSoruco.svg',
    20: '/hemiciclo/20JoseRoca.svg',
    21: '/hemiciclo/21KarinaVelasco.svg',
    22: '/hemiciclo/22ErnestoSuarez.svg',
    23: '/hemiciclo/23AnaCrispin.svg',
    24: '/hemiciclo/24DiegoRomana.svg',
    25: '/hemiciclo/25CarolCarlo.svg',
    26: '/hemiciclo/26MonicaPuerta.svg',
    27: '/hemiciclo/27ElianaAcosta.svg',
    28: '/hemiciclo/28DanielOrtiz.svg',
    29: '/hemiciclo/29IsabelMoreno.svg',
    30: '/hemiciclo/30CesarMentasti.svg',
    31: '/hemiciclo/31RosalvaRomero.svg',
    32: '/hemiciclo/32DiegoAvila.svg',
    33: '/hemiciclo/33YasminEstivariz.svg',
    34: '/hemiciclo/34FreddyCastillo.svg',
    35: '/hemiciclo/35MariaAlcon.svg',
    36: '/hemiciclo/36JoseSanchez.svg'
  }
  return asientos[seatNumber] || ''
}
</script>

<style scoped>
</style>