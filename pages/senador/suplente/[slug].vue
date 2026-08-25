<template>
  <div class="py-[2vw]">
    <div v-if="suplente" class="w-[80%] mx-auto">
      <!-- Botón volver -->
      <button 
        @click="volver"
        class="inline-flex items-center text-senado-primary hover:underline mb-[1vw] text-[1.1vw] cursor-pointer"
      >
        ← Volver atras
      </button>

      <!-- Tarjeta del suplente -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- PRIMERA FILA: 3 columnas -->
        <div class="bg-[#EDEEED]">
          <div class="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 w-[80%] mx-auto">
            <!-- Columna 1: Foto del suplente -->
            <div class="md:col-span-3 p-[1.2vw] flex flex-col items-center justify-center">
              <img 
                :src="suplente.fotoSuplente || '/images/default-avatar.png'" 
                :alt="suplente.suplente"
                class="w-[12vw] h-[12vw] rounded-full object-cover border-[.2vw] shadow-lg"
                :style="{ borderColor: suplente.partyColor }"
                @error="(e) => e.target.src = '/images/default-avatar.png'"
              />
            </div>

            <!-- Columna 2: Nombre y cargo -->
            <div class="md:col-span-6 py-[1.2vw] ml-[-1vw] flex flex-col justify-center">
              <h1 class="text-[1.8vw] font-bold text-senado-primary">{{ suplente.suplente }}</h1>
              <p class="text-[1.1vw] text-black">Senador Suplente por {{ suplente.department }}</p>
              <p class="text-[0.9vw] text-gray-500">
                Senador Titular: 
                <NuxtLink 
                  :to="`/senador/${suplente.slugTitular}`" 
                  class="text-senado-primary hover:underline font-medium"
                >
                  {{ suplente.name }}
                </NuxtLink>
              </p>
              <p v-if="suplente.cargoSuplente && suplente.cargoSuplente !== 'No disponible'" class="font-semibold text-[1.0vw] leading-tight">
                {{ suplente.cargoSuplente }}
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
          <!-- Columna 1: Datos personales del suplente -->
          <div class="p-[1.2vw] border-r border-gray-200">
            <div class="space-y-[1.4vw] text-[0.9vw]">
              <!-- Fila 1: Fecha de Nacimiento -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Fecha de Nacimiento:</span>
                <span class="text-gray-800">{{ suplente.fechaNacimientoSuplente || 'No disponible' }}</span>
              </div>
              <!-- Fila 2: Nacido en -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Nacido en:</span>
                <span class="text-gray-800">{{ suplente.nacidoEnSuplente || suplente.department }}</span>
              </div>
              <!-- Fila 3: Ocupación -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Ocupación:</span>
                <span class="text-gray-800">{{ suplente.ocupacionSuplente || 'No disponible' }}</span>
              </div>
              <!-- Fila 4: Comité -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Comité:</span>
                <span class="text-gray-800">{{ suplente.comiteSuplente || 'No disponible' }}</span>
              </div>
              <!-- Fila 5: Contacto -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Contacto:</span>
                <div class="flex gap-[.2vw] flex-wrap">
                  <a v-if="suplente.facebookSuplente" :href="suplente.facebookSuplente" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a v-if="suplente.twitterSuplente" :href="suplente.twitterSuplente" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a v-if="suplente.instagramSuplente" :href="suplente.instagramSuplente" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a v-if="suplente.youtubeSuplente" :href="suplente.youtubeSuplente" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a v-if="suplente.tiktokSuplente" :href="suplente.tiktokSuplente" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[1.7em] h-[1.7em] text-white"><path d="M19.321 5.562a5.124 5.124 0 0 1-3.16-1.09A5.145 5.145 0 0 1 14.374 1h-3.09v13.195a2.49 2.49 0 1 1-2.49-2.49c.264 0 .518.043.756.12V8.68a5.583 5.583 0 0 0-.756-.05A5.58 5.58 0 1 0 14.374 14V7.545a8.186 8.186 0 0 0 4.947 1.66V5.562z"/></svg>
                  </a>
                </div>
              </div>
              <!-- Fila 6: Senador Titular -->
              <div class="grid grid-cols-[40%_60%]">
                <span class="font-semibold text-gray-600">Senador Titular:</span>
                <NuxtLink 
                  :to="`/senador/${suplente.slugTitular}`" 
                  class="text-senado-primary hover:underline font-medium"
                >
                  {{ suplente.name }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Columna 2: Mapa -->
          <div class="p-[1.2vw] border-r border-gray-200 flex flex-col items-center justify-start">
            <h3 class="text-[1vw] font-semibold text-gray-600 mb-[0.8vw] text-left w-full">DISTRITO ELECTORAL</h3>
            <img 
              :src="getMapaDepartamento(suplente.department)" 
              :alt="'Mapa de ' + suplente.department"
              class="h-[12vw] w-auto object-contain"
              @error="(e) => e.target.src = '/images/mapa-default.svg'"
            />
          </div>

          <!-- Columna 3: Asiento en el Hemiciclo -->
          <div class="p-[1.2vw] flex flex-col justify-center">
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

      <!-- 🔥 NOTICIAS RELACIONADAS CON EL SUPLENTE (usa el ID del titular) -->
      <NoticiasSenador 
        :senador-id="suplente.id" 
        :nombre-senador="suplente.suplente"
        :limit="6"
      />


      
    </div>

    <div v-else class="text-center py-[5vw]">
      <h2 class="text-[2vw] font-bold text-gray-600">Suplente no encontrado</h2>
      <NuxtLink to="/" class="text-senado-primary hover:underline mt-[1vw] inline-block text-[1.2vw]">
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSenadores } from '~/composables/useSenadores'
import MandatoFuncionesAntecedentes from '~/components/MandatoFuncionesAntecedentes.vue'
import NoticiasSenador from '~/components/NoticiasSenador.vue'

const route = useRoute()
const { getSuplenteBySlug } = useSenadores()

const slug = computed(() => route.params.slug)

const suplente = computed(() => {
  return getSuplenteBySlug(slug.value)
})

const volver = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
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