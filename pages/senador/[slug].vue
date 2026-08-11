<template>
  <div class="py-10">
    <div v-if="senator" class="max-w-6xl mx-auto">
      <!-- Botón volver -->
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:underline mb-6">
        ← Volver al hemiciclo
      </NuxtLink>

      <!-- Tarjeta del senador -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- PRIMERA FILA: 3 columnas -->
        <div class="bg-[#EDEEED]">
          <div class="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 w-[80%] mx-auto">
            <!-- Columna 1: Foto -->
            <div class="md:col-span-3 p-[1.2vw] flex flex-col items-center justify-center">
              <img 
                v-if="senator.foto"
                :src="senator.foto" 
                :alt="senator.name"
                class="w-[12vw] h-[12vw] rounded-full object-cover border-[.2vw] shadow-lg"
                :style="{ borderColor: senator.partyColor }"
                @error="(e) => e.target.src = '/images/default-avatar.png'"
              />
              <div 
                v-else
                class="w-40 h-40 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg"
                :style="{ backgroundColor: senator.partyColor }"
              >
                {{ getInitials(senator.name) }}
              </div>
            </div>

            <!-- Columna 2: Nombre y cargo -->
            <div class="md:col-span-6 py-[1.2vw] ml-[-1vw] flex flex-col justify-center">
              <h1 class="text-[1.8vw] font-bold text-senado-primary">{{ senator.name }}</h1>
              <p class="text-[1.1vw] text-black">Senador por {{ senator.department }}</p>
              <p v-if="senator.cargo" class="font-semibold text-[1.0vw] leading-tight">
                {{ senator.cargo }}
              </p>
            </div>

            <!-- Columna 3: Partido -->
            <div class="md:col-span-3 flex flex-col items-center justify-center">
              <div class="relative inline-block group">
                <img 
                  :src="getLogoPartido(senator.partyShort)" 
                  :alt="senator.partyShort"
                  class="h-[8vw] w-auto object-contain transition-opacity duration-300"
                  :class="{'group-hover:opacity-0': getLogoPartidoHover(senator.partyShort)}"
                  @error="(e) => e.target.src = ''"
                />
                <img 
                  :src="getLogoPartidoHover(senator.partyShort)" 
                  :alt="senator.partyShort + ' hover'"
                  class="h-[8vw] w-auto object-contain absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  @error="(e) => e.target.style.display = 'none'"
                />
              </div>
              <span 
                class="px-[.8vw] py-[.2vw] w-[10.8vw] rounded-full text-black text-[0.8vw] mt-[0.8vw] text-center"
              >
                {{ senator.party?.toUpperCase() }}
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
                <div><span class="font-semibold text-gray-600">Fecha de Nacimiento:</span></div>
                <div><span class="font-semibold text-gray-600">Nacido en:</span></div>
                <div><span class="font-semibold text-gray-600">Ocupación:</span></div>
                <div><span class="font-semibold text-gray-600">Brigada:</span></div>
                <div><span class="font-semibold text-gray-600">Contacto:</span></div>
                <div><span class="font-semibold text-gray-600">Senador Suplente:</span></div>
              </div>
              
              <div class="space-y-3 text-[.5em]">
                <div><span class="text-gray-800">{{ senator.fechaNacimiento || 'No disponible' }}</span></div>
                <div><span class="text-gray-800">{{ senator.nacidoEn || senator.department }}</span></div>
                <div><span class="text-gray-800">{{ senator.ocupacion || 'No disponible' }}</span></div>
                <div><span class="text-gray-800">{{ senator.department }}</span></div>
                <div>
                  <div class="flex gap-2 flex-wrap text-[.5em]">
                    <a v-if="senator.facebook" :href="senator.facebook" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a v-if="senator.twitter" :href="senator.twitter" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a v-if="senator.instagram" :href="senator.instagram" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a v-if="senator.youtube" :href="senator.youtube" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg class="w-[1.8em] h-[1.8em] text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a v-if="senator.tiktok" :href="senator.tiktok" target="_blank" rel="noopener noreferrer" class="w-[2.5em] h-[2.5em] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[1.7em] h-[1.7em] text-white"><path d="M19.321 5.562a5.124 5.124 0 0 1-3.16-1.09A5.145 5.145 0 0 1 14.374 1h-3.09v13.195a2.49 2.49 0 1 1-2.49-2.49c.264 0 .518.043.756.12V8.68a5.583 5.583 0 0 0-.756-.05A5.58 5.58 0 1 0 14.374 14V7.545a8.186 8.186 0 0 0 4.947 1.66V5.562z"/></svg>
                    </a>
                  </div>
                </div>
                <div><span class="text-gray-800">{{ senator.suplente || 'No disponible' }}</span></div>
              </div>
            </div>
          </div>

          <!-- Columna 2: Mapa -->
          <div class="p-6 border-r border-gray-200 flex flex-col items-center justify-start">
            <h3 class="text-[1vw] font-semibold text-gray-600 mb-3 text-left w-full">DISTRITO ELECTORAL</h3>
            <img 
              :src="getMapaDepartamento(senator.department)" 
              :alt="'Mapa de ' + senator.department"
              class="h-[12vw] w-auto object-contain"
              @error="(e) => e.target.src = '/images/mapa-default.svg'"
            />
          </div>

          <!-- Columna 3: Asiento en el Hemiciclo -->
          <div class="p-6 flex flex-col justify-center">
            <h3 class="text-[1vw] font-semibold text-gray-600 text-left w-full">ASIENTO EN EL HEMICICLO</h3>
            <div class="flex flex-col items-center">
              <img 
                :src="getAsientoHemiciclo(senator.seatNumber)" 
                :alt="'Asiento ' + senator.seatNumber"
                class="h-[15vw] w-[15vw] object-contain"
                @error="(e) => e.target.src = ''"
              />
              <span class="text-[1vw] font-bold text-senado-primary text-right w-full translate-y-[-2vw]">Asiento {{ senator.seatNumber }}</span>
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
      <h2 class="text-2xl font-bold text-gray-600">Senador no encontrado</h2>
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
const { getSenadorBySlug } = useSenadores()

const slug = computed(() => route.params.slug)

const senator = computed(() => {
  return getSenadorBySlug(slug.value)
})

const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
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