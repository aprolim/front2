<template>
  <div class="min-h-screen bg-white py-[2vw]">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-[3vw]">
        <div class="inline-block bg-senado-gold-soft text-senado-primary text-[0.9vw] font-bold px-[1.2vw] py-[0.4vw] rounded-full mb-[0.8vw]">
          📋 Comisiones y Comités
        </div>
        <h1 class="text-[4.5vw] font-bold text-senado-primary leading-tight">
          Comisiones y Comités
        </h1>
        <p class="text-gray-600 text-[1.5vw] mt-[0.8vw] max-w-3xl">
          Conoce las comisiones y comités de la Cámara de Senadores y los senadores que las integran.
          <span class="block text-gray-400 text-[1.1vw] mt-[0.3vw]">Haz clic en una comisión para ver sus miembros.</span>
        </p>
        <div class="w-[6vw] h-[0.2vw] bg-senado-gold-dark mt-[1vw] rounded-full"></div>
      </div>

      <!-- Buscador -->
      <div class="max-w-3xl mx-auto mb-[2vw]">
        <div class="relative">
          <input
            v-model="busqueda"
            type="text"
            placeholder="🔍 Buscar comisión o comité..."
            class="w-full px-[1.8vw] py-[1vw] border border-gray-300 rounded-full text-[1.1vw] focus:outline-none focus:ring-2 focus:ring-senado-primary focus:border-transparent bg-white shadow-sm"
            @input="filtrarComisiones"
          />
          <button
            v-if="busqueda"
            @click="limpiarBusqueda"
            class="absolute right-[1.8vw] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[1.5vw]"
          >
            ✕
          </button>
        </div>
        <div v-if="busqueda" class="text-[1vw] text-gray-500 mt-[0.5vw] text-center">
          {{ resultadosCount }} resultado{{ resultadosCount !== 1 ? 's' : '' }} encontrado{{ resultadosCount !== 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Lista de Comisiones -->
      <div class="max-w-6xl mx-auto space-y-[0.8vw]">
        <div
          v-for="comision in comisionesFiltradas"
          :key="comision.nombre"
          class="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          :class="comision.destacado ? 'border-senado-primary border-2' : ''"
        >
          <!-- Cabecera -->
          <div
            @click="toggleItem(comision.nombre)"
            class="flex items-center justify-between px-[2vw] py-[0.7vw] cursor-pointer hover:bg-gray-50 transition-colors"
            :class="isOpen(comision.nombre) ? 'bg-senado-gold-lightest' : ''"
          >
            <div class="flex items-center gap-[1vw] flex-wrap">
              <div class="flex items-center gap-[0.6vw]">
                <span
                  class="text-[1.3vw] font-bold"
                  :class="isOpen(comision.nombre) ? 'text-senado-primary' : 'text-gray-500'"
                >
                  {{ isOpen(comision.nombre) ? '▾' : '▸' }}
                </span>
                <h2 class="text-[1.3vw] font-bold text-senado-primary" v-html="resaltarTexto(comision.nombre)">
                </h2>
              </div>
              <span class="text-[0.7vw] font-semibold px-[0.7vw] py-[0.15vw] rounded-full bg-blue-100 text-blue-700">
                Comisión
              </span>
              <span class="text-[0.7vw] text-gray-400">
                {{ (comision.comites || []).length }} comités
              </span>
              <span v-if="comision.destacado" class="text-[0.6vw] font-semibold px-[0.5vw] py-[0.1vw] rounded-full bg-yellow-100 text-yellow-700">
                ✦ Coincidencia
              </span>
            </div>
            <div class="text-gray-400 text-[0.8vw]">
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
              <div class="px-[1.8vw] pb-[1.8vw] pt-[0.5vw]">
                <!-- Presidente y Suplente LADO A LADO -->
                <div v-if="comision.presidente" class="mb-[1vw]">
                  <div class="flex flex-wrap gap-[0.8vw]">
                    <!-- Titular (Presidente) -->
                    <div class="flex-1 min-w-[40%] bg-gray-50 rounded-lg p-[0.8vw] border border-gray-100">
                      <div class="flex items-center gap-[1.2vw]">
                        <NuxtLink
                          :to="`/senador/${generarSlug(comision.presidente.nombreCompleto)}`"
                          class="flex-shrink-0"
                        >
                          <img
                            :src="comision.presidente.foto || defaultAvatar"
                            :alt="comision.presidente.nombreCompleto"
                            class="foto-titular mx-[1vw]"
                            :style="{ borderColor: comision.presidente.color || '#ccc' }"
                            @error="(e) => e.target.src = defaultAvatar"
                          />
                        </NuxtLink>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-[0.2vw] flex-wrap">
                            <NuxtLink
                              :to="`/senador/${generarSlug(comision.presidente.nombreCompleto)}`"
                              class="text-[1.1vw] font-bold text-senado-primary hover:underline truncate"
                            >
                              {{ comision.presidente.nombreCompleto }}
                            </NuxtLink>
                            <span class="badge-titular">Titular</span>
                          </div>
                          <div class="flex items-center gap-[0.2vw] flex-wrap">
                            <span
                              class="badge-partido"
                              :style="{
                                backgroundColor: comision.presidente.color + '20',
                                color: comision.presidente.color || '#666'
                              }"
                            >
                              {{ comision.presidente.partido }}
                            </span>
                            <span class="text-[0.7vw] text-gray-500 font-medium">
                              {{ comision.presidente.cargo }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Suplente del Presidente -->
                    <div v-if="comision.presidente.suplente" class="flex-1 min-w-[40%] bg-gray-50 rounded-lg p-[0.8vw] border border-gray-100">
                      <div class="flex items-center gap-[1.2vw]">
                        <NuxtLink
                          :to="`/senador/suplente/${generarSlug(comision.presidente.suplenteNombre)}`"
                          class="flex-shrink-0"
                        >
                          <img
                            :src="comision.presidente.fotoSuplente || defaultAvatar"
                            :alt="comision.presidente.suplenteNombre"
                            class="foto-suplente mx-[1vw]"
                            :style="{ borderColor: comision.presidente.color || '#ccc' }"
                            @error="(e) => e.target.src = defaultAvatar"
                          />
                        </NuxtLink>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-[0.2vw] flex-wrap">
                            <NuxtLink
                              :to="`/senador/suplente/${generarSlug(comision.presidente.suplenteNombre)}`"
                              class="text-[0.95vw] font-semibold text-gray-700 hover:text-senado-primary hover:underline truncate"
                            >
                              {{ comision.presidente.suplenteNombre }}
                            </NuxtLink>
                            <span class="badge-suplente">Suplente</span>
                          </div>
                          <div class="flex items-center gap-[0.2vw] flex-wrap">
                            <span
                              class="badge-partido"
                              :style="{
                                backgroundColor: comision.presidente.color + '20',
                                color: comision.presidente.color || '#666'
                              }"
                            >
                              {{ comision.presidente.partido }}
                            </span>
                            <span class="text-[0.7vw] text-gray-500 font-medium">
                              {{ comision.presidente.cargoSuplente || 'Senador Suplente' }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Comités -->
                <div v-if="comision.comites && comision.comites.length > 0" class="border-t border-gray-100 pt-[0.8vw]">
                  <div class="space-y-[0.6vw]">
                    <div
                      v-for="comite in comision.comites"
                      :key="comite.nombre"
                      class="bg-gray-50 rounded-lg p-[0.8vw] border border-gray-100"
                      :class="comite.destacado ? 'border-senado-primary border-2 bg-senado-gold-lightest' : ''"
                    >
                      <div class="flex items-center gap-[0.4vw] flex-wrap mb-[0.4vw]">
                        <h4 class="font-semibold text-gray-800 text-[1vw]" v-html="resaltarTexto(comite.nombre)">
                        </h4>
                        <span class="text-[0.55vw] font-semibold px-[0.4vw] py-[0.08vw] rounded-full bg-green-100 text-green-700">
                          Comité
                        </span>
                        <span v-if="comite.destacado" class="text-[0.5vw] font-semibold px-[0.35vw] py-[0.08vw] rounded-full bg-yellow-100 text-yellow-700">
                          ✦ Coincidencia
                        </span>
                      </div>

                      <!-- Secretario y Suplente LADO A LADO -->
                      <div v-if="comite.secretario" class="flex flex-wrap gap-[0.8vw]">
                        <!-- Secretario (Titular) -->
                        <div class="flex-1 min-w-[40%] bg-white rounded-lg p-[0.6vw] border border-gray-100">
                          <div class="flex items-center gap-[1vw]">
                            <NuxtLink
                              :to="`/senador/${generarSlug(comite.secretario.nombreCompleto)}`"
                              class="flex-shrink-0"
                            >
                              <img
                                :src="comite.secretario.foto || defaultAvatar"
                                :alt="comite.secretario.nombreCompleto"
                                class="foto-secretario mx-[1vw]"
                                :style="{ borderColor: comite.secretario.color || '#ccc' }"
                                @error="(e) => e.target.src = defaultAvatar"
                              />
                            </NuxtLink>
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-[0.2vw] flex-wrap">
                                <NuxtLink
                                  :to="`/senador/${generarSlug(comite.secretario.nombreCompleto)}`"
                                  class="text-[0.95vw] font-bold text-senado-primary hover:underline truncate"
                                >
                                  {{ comite.secretario.nombreCompleto }}
                                </NuxtLink>
                                <span class="badge-titular-sm">Titular</span>
                              </div>
                              <div class="flex items-center gap-[0.2vw] flex-wrap">
                                <span
                                  class="badge-partido-sm"
                                  :style="{
                                    backgroundColor: comite.secretario.color + '20',
                                    color: comite.secretario.color || '#666'
                                  }"
                                >
                                  {{ comite.secretario.partido }}
                                </span>
                                <span class="text-[0.6vw] text-gray-500 font-medium">
                                  {{ comite.secretario.cargo }}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Suplente del Secretario -->
                        <div v-if="comite.secretario.suplente" class="flex-1 min-w-[40%] bg-white rounded-lg p-[0.6vw] border border-gray-100">
                          <div class="flex items-center gap-[1vw]">
                            <NuxtLink
                              :to="`/senador/suplente/${generarSlug(comite.secretario.suplenteNombre)}`"
                              class="flex-shrink-0"
                            >
                              <img
                                :src="comite.secretario.fotoSuplente || defaultAvatar"
                                :alt="comite.secretario.suplenteNombre"
                                class="foto-suplente-sm mx-[1vw]"
                                :style="{ borderColor: comite.secretario.color || '#ccc' }"
                                @error="(e) => e.target.src = defaultAvatar"
                              />
                            </NuxtLink>
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-[0.2vw] flex-wrap">
                                <NuxtLink
                                  :to="`/senador/suplente/${generarSlug(comite.secretario.suplenteNombre)}`"
                                  class="text-[0.85vw] font-semibold text-gray-700 hover:text-senado-primary hover:underline truncate"
                                >
                                  {{ comite.secretario.suplenteNombre }}
                                </NuxtLink>
                                <span class="badge-suplente-sm">Suplente</span>
                              </div>
                              <div class="flex items-center gap-[0.2vw] flex-wrap">
                                <span
                                  class="badge-partido-sm"
                                  :style="{
                                    backgroundColor: comite.secretario.color + '20',
                                    color: comite.secretario.color || '#666'
                                  }"
                                >
                                  {{ comite.secretario.partido }}
                                </span>
                                <span class="text-[0.6vw] text-gray-500 font-medium">
                                  {{ comite.secretario.cargoSuplente || 'Senador Suplente' }}
                                </span>
                              </div>
                            </div>
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
      <div v-if="comisionesFiltradas.length === 0" class="text-center py-[4vw]">
        <div class="text-[4vw] mb-[1vw]">🔍</div>
        <h3 class="text-[2.2vw] font-bold text-gray-700 mb-[0.5vw]">No se encontraron resultados</h3>
        <p class="text-gray-500 text-[1.2vw]">No hay comisiones o comités que coincidan con "<strong>{{ busqueda }}</strong>"</p>
        <button
          @click="limpiarBusqueda"
          class="mt-[1.5vw] text-senado-primary hover:underline text-[1.1vw] font-medium"
        >
          Limpiar búsqueda
        </button>
      </div>

      <!-- Botón volver -->
      <div class="mt-[3vw] text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-[0.5vw] text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
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
import { ref, computed } from 'vue'

// ========================================== //
// CONSTANTES
// ========================================== //
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// ========================================== //
// ESTADO
// ========================================== //
const itemsAbiertos = ref(new Set())
const busqueda = ref('')

// ========================================== //
// FUNCIONES
// ========================================== //
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
// DATOS DE COMISIONES Y COMITÉS
// ========================================== //
const comisionesData = [
  {
    nombre: 'Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral',
    presidente: {
      nombre: 'Daniel Antonio',
      nombreCompleto: 'Daniel Antonio Ortiz Velasquez',
      foto: '/senadores/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png',
      partido: 'PDC',
      color: '#2E7078',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Reina Isabel Pallares Morales',
      fotoSuplente: '/senadores/suplentes/g1/REINA ISABEL PALLARES MORALES.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE CONSTITUCIÓN, LEGISLACIÓN E INTERPRETACIÓN LEGISLATIVA Y CONSTITUCIONAL',
        secretario: {
          nombre: 'Freddy',
          nombreCompleto: 'Freddy Castillo Chavez',
          foto: '/senadores/titulares/g2/FREDDY CASTILLO CHAVEZ.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Villma Colque Camacho',
          fotoSuplente: '/senadores/suplentes/g2/VILLMA COLQUE CAMACHO.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE SISTEMA ELECTORAL, DERECHOS HUMANOS Y EQUIDAD SOCIAL',
        secretario: {
          nombre: 'Tomasa',
          nombreCompleto: 'Tomasa Yarhui Jacome',
          foto: '/senadores/titulares/g1/TOMASA YARHUI JACOME.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Hugo Marcelo Cortez Calvimontes',
          fotoSuplente: '/senadores/suplentes/g1/HUGO MARCELO CORTEZ CALVIMONTES.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Justicia Plural, Ministerio Público y Defensa Legal del Estado',
    presidente: {
      nombre: 'Erick Nelson',
      nombreCompleto: 'Erick Nelson Soruco Alpire',
      foto: '/senadores/titulares/g3/ERICK NELSON SORUCO ALPIRE.png',
      partido: 'PDC',
      color: '#2E7078',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Cesia Roca Escalante',
      fotoSuplente: '/senadores/suplentes/g3/CESIA ROCA ESCALANTE.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE JUSTICIA PLURAL Y CONSEJO DE LA MAGISTRATURA',
        secretario: {
          nombre: 'Wilder',
          nombreCompleto: 'Wilder Veliz Armas',
          foto: '/senadores/titulares/g1/WILDER VELIZ ARMAS.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Lenny Mayra Ayala Justiniano',
          fotoSuplente: '/senadores/suplentes/g1/LENNY MAYRA AYALA JUSTINIANO.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE MINISTERIO PÚBLICO Y DEFENSA LEGAL DEL ESTADO',
        secretario: {
          nombre: 'Maria Isabel',
          nombreCompleto: 'Maria Isabel Moreno Cortez',
          foto: '/senadores/titulares/g2/MARIA ISABEL MORENO CORTEZ.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Rolando Vacaflor Gabriel Arana',
          fotoSuplente: '/senadores/suplentes/g2/ROLANDO VACAFLOR GABRIEL ARANA.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Seguridad del Estado, Fuerzas Armadas y Policía Boliviana',
    presidente: {
      nombre: 'Judith Rosario',
      nombreCompleto: 'Judith Rosario Garcia Coca',
      foto: '/senadores/titulares/g1/JUDITH ROSARIO GARCIA COCA.png',
      partido: 'PDC',
      color: '#2E7078',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Royer Ivan Mamani Garcia',
      fotoSuplente: '/senadores/suplentes/g1/ROYER IVAN MAMANI GARCIA.png',
      cargoSuplente: 'SENADOR SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE FUERZAS ARMADAS Y POLICÍA BOLIVIANA',
        secretario: {
          nombre: 'Ana Karina',
          nombreCompleto: 'Ana Karina Velasco Áñez',
          foto: '/senadores/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png',
          partido: 'UNIDAD',
          color: '#EFCD04',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Marcelo Matias Cardona Ibañez',
          fotoSuplente: '/senadores/suplentes/g3/MARCELO MATIAS CARDONA IBAÑEZ.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE SEGURIDAD DEL ESTADO Y LUCHA CONTRA EL NARCOTRÁFICO',
        secretario: {
          nombre: 'Paola Limbania',
          nombreCompleto: 'Paola Limbania Lopez Zeballos',
          foto: '/senadores/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Richard Espada Ugarte',
          fotoSuplente: '/senadores/suplentes/g3/RICHARD ESPADA UGARTE.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Organización Territorial del Estado y Autonomías',
    presidente: {
      nombre: 'Cesar',
      nombreCompleto: 'Cesar Mentasti Padilla',
      foto: '/senadores/titulares/g2/CESAR MENTASTI PADILLA.png',
      partido: 'UNIDAD',
      color: '#EFCD04',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Marcela Guerrero Vilca',
      fotoSuplente: '/senadores/suplentes/g2/MARCELA GUERRERO VILCA.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE AUTONOMÍAS MUNICIPALES, INDÍGENA ORIGINARIO CAMPESINAS Y REGIONALES',
        secretario: {
          nombre: 'Jose',
          nombreCompleto: 'Jose Roca Haensel',
          foto: '/senadores/titulares/g3/JOSE ROCA HAENSEL.png',
          partido: 'UNIDAD',
          color: '#EFCD04',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Mabel Giordano Sonnenschein',
          fotoSuplente: '/senadores/suplentes/g3/MABEL GIORDANO SONNENSCHEIN.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE AUTONOMÍAS DEPARTAMENTALES',
        secretario: {
          nombre: 'Ernesto',
          nombreCompleto: 'Ernesto Suarez Sattori',
          foto: '/senadores/titulares/g3/ERNESTO SUAREZ SATTORI.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Claudia Cardenas Velasquez',
          fotoSuplente: '/senadores/suplentes/g3/CLAUDIA CARDENAS VELASQUEZ.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Planificación, Política Económica y Finanzas',
    presidente: {
      nombre: 'Eliana Rina',
      nombreCompleto: 'Eliana Rina Acosta Quispe',
      foto: '/senadores/titulares/g3/ELIANA RINA ACOSTA QUISPE.png',
      partido: 'UNIDAD',
      color: '#EFCD04',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Sichard Hans Soraide Castedo',
      fotoSuplente: '/senadores/suplentes/g3/SICHARD HANS SORAIDE CASTEDO.png',
      cargoSuplente: 'SENADOR SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE PLANIFICACIÓN, PRESUPUESTO, INVERSIÓN PÚBLICA Y CONTRALORÍA GENERAL DEL ESTADO',
        secretario: {
          nombre: 'Leonor Rosalva',
          nombreCompleto: 'Leonor Rosalva Romero Gutierrez',
          foto: '/senadores/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png',
          partido: 'UNIDAD',
          color: '#EFCD04',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Marco Antonio Segovia Vargas',
          fotoSuplente: '/senadores/suplentes/g2/MARCO ANTONIO SEGOVIA VARGAS.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE POLÍTICAS FINANCIERA, MONETARIA, TRIBUTARIA Y SEGUROS',
        secretario: {
          nombre: 'Abdon',
          nombreCompleto: 'Abdon Porcel Arancibia',
          foto: '/senadores/titulares/g1/ABDON PORCEL ARANCIBIA.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Ilse Fatima Davila Arancibia',
          fotoSuplente: '/senadores/suplentes/g1/ILSE FATIMA DAVILA ARANCIBIA.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Economía Plural, Producción, Industria e Industrialización',
    presidente: {
      nombre: 'Ana Maria',
      nombreCompleto: 'Ana Maria Crispin Choque',
      foto: '/senadores/titulares/g1/ANA MARIA CRISPIN CHOQUE.png',
      partido: 'PDC',
      color: '#2E7078',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Victor Severo Quispe Santander',
      fotoSuplente: '/senadores/suplentes/g1/VICTOR SEVERO QUISPE SANTANDER.png',
      cargoSuplente: 'SENADOR SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE ENERGÍA, HIDROCARBUROS, MINERÍA Y METALURGIA',
        secretario: {
          nombre: 'Marcelino',
          nombreCompleto: 'Marcelino Flores Ordoñez',
          foto: '/senadores/titulares/g2/MARCELINO FLORES ORDOÑEZ.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIO DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Susana Gabriela Ruiz Zuleta',
          fotoSuplente: '/senadores/suplentes/g2/SUSANA GABRIELA RUIZ ZULETA.png',
          cargoSuplente: 'SENADORA SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE ECONOMÍA PLURAL, DESARROLLO PRODUCTIVO, OBRAS PÚBLICAS E INFRAESTRUCTURA',
        secretario: {
          nombre: 'Betty',
          nombreCompleto: 'Betty Canaviri Villanueva',
          foto: '/senadores/titulares/g2/BETTY CANAVIRI VILLANUEVA.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Roger Mamani Coronado',
          fotoSuplente: '/senadores/suplentes/g2/ROGER MAMANI CORONADO.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Naciones y Pueblos Indígena Originario Campesinos e Interculturalidad',
    presidente: {
      nombre: 'Jose Manuel',
      nombreCompleto: 'Jose Manuel Ormachea Mendieta',
      foto: '/senadores/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png',
      partido: 'LIBRE',
      color: '#DB3737',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Maria Elena Pachacute Ticona',
      fotoSuplente: '/senadores/suplentes/g1/MARIA ELENA PACHACUTE TICONA.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE NACIONES Y PUEBLOS INDÍGENA ORIGINARIO CAMPESINOS',
        secretario: {
          nombre: 'Bertha Nurmy',
          nombreCompleto: 'Bertha Nurmy Gutierrez Meneses',
          foto: '/senadores/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Freddy Rioja Melgar',
          fotoSuplente: '/senadores/suplentes/g2/FREDDY RIOJA MELGAR.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE CULTURAS, INTERCULTURALIDAD Y PATRIMONIO CULTURAL',
        secretario: {
          nombre: 'Bertha',
          nombreCompleto: 'Bertha Cartagena Sanchez',
          foto: '/senadores/titulares/g1/BERTHA CARTAGENA SANCHEZ.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Manfred Leo Perez Hassenteufel',
          fotoSuplente: '/senadores/suplentes/g1/MANFRED LEO PEREZ HASSENTEUFEL.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Política Social, Educación y Salud',
    presidente: {
      nombre: 'Jose',
      nombreCompleto: 'Jose Sanchez Aguilar',
      foto: '/senadores/titulares/g2/JOSE SANCHEZ AGUILAR.png',
      partido: 'LIBRE',
      color: '#DB3737',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Cinthya Inga Gutierrez Guzman',
      fotoSuplente: '/senadores/suplentes/g2/CINTHYA INGA GUTIERREZ GUZMAN.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE EDUCACIÓN, SALUD, CIENCIA, TECNOLOGÍA Y DEPORTES',
        secretario: {
          nombre: 'Maria Antonieta',
          nombreCompleto: 'Maria Antonieta Alcon Sanchez',
          foto: '/senadores/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Edwin Lopez Quiroga',
          fotoSuplente: '/senadores/suplentes/g2/EDWIN LOPEZ QUIROGA.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE VIVIENDA, RÉGIMEN LABORAL, SEGURIDAD INDUSTRIAL Y SEGURIDAD SOCIAL',
        secretario: {
          nombre: 'Claudia',
          nombreCompleto: 'Claudia Mallon Vargas',
          foto: '/senadores/titulares/g1/CLAUDIA MALLON VARGAS.png',
          partido: 'APB SUMATE',
          color: '#611789',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Apolinar Rivera Muñoz',
          fotoSuplente: '/senadores/suplentes/g1/APOLINAR RIVERA MUÑOZ.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Política Internacional',
    presidente: {
      nombre: 'Nicanor Gonzalo',
      nombreCompleto: 'Nicanor Gonzalo Cochi Condori',
      foto: '/senadores/titulares/g1/NICANOR GONZALO COCHI CONDORI.png',
      partido: 'PDC',
      color: '#2E7078',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Roxana Mamani Colquehuanca',
      fotoSuplente: '/senadores/suplentes/g1/ROXANA MAMANI COLQUEHUANCA.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE ASUNTOS EXTERIORES, INTERPARLAMENTARIOS Y ORGANISMOS INTERNACIONALES',
        secretario: {
          nombre: 'Teresa',
          nombreCompleto: 'Teresa Alarcon Arana',
          foto: '/senadores/titulares/g2/TERESA ALARCON ARANA.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: false
        }
      },
      {
        nombre: 'COMITÉ DE RELACIONES ECONÓMICAS INTERNACIONALES',
        secretario: {
          nombre: 'Wanda Ximena',
          nombreCompleto: 'Wanda Ximena Medrano Hervas',
          foto: '/senadores/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Aldo Sergio Villegas Mora',
          fotoSuplente: '/senadores/suplentes/g1/ALDO SERGIO VILLEGAS MORA.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  },
  {
    nombre: 'Comisión de Tierra y Territorio, Recursos Naturales y Medio Ambiente',
    presidente: {
      nombre: 'Branko Goran',
      nombreCompleto: 'Branko Goran Marinkovic Jovicevic',
      foto: '/senadores/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png',
      partido: 'LIBRE',
      color: '#DB3737',
      cargo: 'PRESIDENTE DE COMISIÓN',
      suplente: true,
      suplenteNombre: 'Kathia Natalia Miserendino Romero',
      fotoSuplente: '/senadores/suplentes/g3/KATHIA NATALIA MISERENDINO ROMERO.png',
      cargoSuplente: 'SENADORA SUPLENTE'
    },
    comites: [
      {
        nombre: 'COMITÉ DE TIERRA Y TERRITORIO, RECURSOS NATURALES Y HOJA DE LA COCA',
        secretario: {
          nombre: 'Carol',
          nombreCompleto: 'Carol Carlo Duran',
          foto: '/senadores/titulares/g3/CAROL CARLO DURAN.png',
          partido: 'LIBRE',
          color: '#DB3737',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Jorge Antonio Quispe Flores',
          fotoSuplente: '/senadores/suplentes/g3/JORGE ANTONIO QUISPE FLORES.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      },
      {
        nombre: 'COMITÉ DE MEDIO AMBIENTE, BIODIVERSIDAD, AMAZONÍA, ÁREAS PROTEGIDAS Y CAMBIO CLIMÁTICO',
        secretario: {
          nombre: 'Cintia Monica',
          nombreCompleto: 'Cintia Monica Puerta Campos',
          foto: '/senadores/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png',
          partido: 'PDC',
          color: '#2E7078',
          cargo: 'SECRETARIA DE COMITÉ',
          suplente: true,
          suplenteNombre: 'Jesus Humberto Suarez Eguez',
          fotoSuplente: '/senadores/suplentes/g3/JESUS HUMBERTO SUAREZ EGUEZ.png',
          cargoSuplente: 'SENADOR SUPLENTE'
        }
      }
    ]
  }
]

// ========================================== //
// FILTRADO
// ========================================== //
const comisionesFiltradas = computed(() => {
  if (!busqueda.value.trim()) {
    return comisionesData
  }

  const busquedaNormalizada = normalizarTexto(busqueda.value)
  const palabras = busquedaNormalizada.split(/\s+/).filter(p => p.length > 0)

  return comisionesData.map(comision => {
    const comisionNombre = normalizarTexto(comision.nombre)
    let comisionCoincide = false
    let comitesCoinciden = false

    for (const palabra of palabras) {
      if (comisionNombre.includes(palabra)) {
        comisionCoincide = true
        break
      }
    }

    const comitesFiltrados = (comision.comites || []).map(comite => {
      const comiteNombre = normalizarTexto(comite.nombre)
      let coincide = false
      for (const palabra of palabras) {
        if (comiteNombre.includes(palabra)) {
          coincide = true
          comitesCoinciden = true
          break
        }
      }
      return { ...comite, destacado: coincide }
    })

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
</script>

<style scoped>
/* ========================================== */
/* TAMAÑOS DE FOTOS - DOBLE DE TAMAÑO        */
/* ========================================== */
.foto-titular {
  width: 12vw !important;
  height: 12vw !important;
  min-width: 12vw !important;
  min-height: 12vw !important;
  max-width: 12vw !important;
  max-height: 12vw !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  flex-shrink: 0;
}

.foto-suplente {
  width: 10.8vw !important;
  height: 10.8vw !important;
  min-width: 10.8vw !important;
  min-height: 10.8vw !important;
  max-width: 10.8vw !important;
  max-height: 10.8vw !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  flex-shrink: 0;
}

.foto-secretario {
  width: 10.8vw !important;
  height: 10.8vw !important;
  min-width: 10.8vw !important;
  min-height: 10.8vw !important;
  max-width: 10.8vw !important;
  max-height: 10.8vw !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  flex-shrink: 0;
}

.foto-suplente-sm {
  width: 9.6vw !important;
  height: 9.6vw !important;
  min-width: 9.6vw !important;
  min-height: 9.6vw !important;
  max-width: 9.6vw !important;
  max-height: 9.6vw !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  flex-shrink: 0;
}

/* ========================================== */
/* BADGES                                     */
/* ========================================== */
.badge-titular {
  font-size: 0.75vw;
  color: #16a34a;
  font-weight: 600;
  background: #dcfce7;
  padding: 0.08vw 0.5vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

.badge-suplente {
  font-size: 0.75vw;
  color: #ea580c;
  font-weight: 600;
  background: #ffedd5;
  padding: 0.08vw 0.5vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

.badge-titular-sm {
  font-size: 0.65vw;
  color: #16a34a;
  font-weight: 600;
  background: #dcfce7;
  padding: 0.06vw 0.4vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

.badge-suplente-sm {
  font-size: 0.65vw;
  color: #ea580c;
  font-weight: 600;
  background: #ffedd5;
  padding: 0.06vw 0.4vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

.badge-partido {
  font-size: 0.75vw;
  font-weight: 500;
  padding: 0.08vw 0.5vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

.badge-partido-sm {
  font-size: 0.65vw;
  font-weight: 500;
  padding: 0.06vw 0.4vw;
  border-radius: 0.3vw;
  white-space: nowrap;
}

/* ========================================== */
/* TRANSICIONES                               */
/* ========================================== */
.max-h-0 {
  max-height: 0;
}
.max-h-\[5000px\] {
  max-height: 5000px;
}
.transition-all {
  transition-property: all;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-out {
  transition-timing-function: ease-out;
}
.ease-in {
  transition-timing-function: ease-in;
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}

/* ========================================== */
/* RESPONSIVE - MÓVIL                         */
/* ========================================== */
@media (max-width: 768px) {
  .foto-titular {
    width: 25vw !important;
    height: 25vw !important;
    min-width: 25vw !important;
    min-height: 25vw !important;
    max-width: 25vw !important;
    max-height: 25vw !important;
  }
  .foto-suplente {
    width: 22vw !important;
    height: 22vw !important;
    min-width: 22vw !important;
    min-height: 22vw !important;
    max-width: 22vw !important;
    max-height: 22vw !important;
  }
  .foto-secretario {
    width: 22vw !important;
    height: 22vw !important;
    min-width: 22vw !important;
    min-height: 22vw !important;
    max-width: 22vw !important;
    max-height: 22vw !important;
  }
  .foto-suplente-sm {
    width: 19vw !important;
    height: 19vw !important;
    min-width: 19vw !important;
    min-height: 19vw !important;
    max-width: 19vw !important;
    max-height: 19vw !important;
  }
  .badge-titular,
  .badge-suplente {
    font-size: 2.5vw;
  }
  .badge-titular-sm,
  .badge-suplente-sm {
    font-size: 2.2vw;
  }
  .badge-partido,
  .badge-partido-sm {
    font-size: 2.2vw;
  }
}
</style>