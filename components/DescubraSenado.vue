<template>
  <div class="senate-chamber" @mouseleave="handleMouseLeave">
    <div class="background-container">
      <!-- ========================================== -->
      <!-- BOTÓN TITULARES/SUPLENTES                  -->
      <!-- ========================================== -->
      <div class="botones-padre">
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            @click="setTipoVisualizacion('titulares')"
            class="px-4 py-2 text-sm font-medium rounded-l-lg transition-colors"
            :class="tipoVisualizacion === 'titulares' 
              ? 'bg-senado-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'"
          >
            Titulares
          </button>
          <button
            @click="setTipoVisualizacion('suplentes')"
            class="px-4 py-2 text-sm font-medium rounded-r-lg transition-colors"
            :class="tipoVisualizacion === 'suplentes' 
              ? 'bg-senado-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 border-l-0'"
          >
            Suplentes
          </button>
        </div>
        
        <!-- Indicador de filtro activo -->
        <div v-if="filtroPartido" class="filtro-activo">
          <span class="filtro-label">Filtrando por:</span>
          <span class="filtro-nombre">{{ getNombrePartido(filtroPartido) }}</span>
          <span class="filtro-count">({{ filteredSeats.filter(s => !s.filteredOut).length }} senadores)</span>
          <button @click="filtroPartido = null" class="filtro-cerrar">✕</button>
        </div>
      </div>

      <div class="hemicycle-wrapper">
        <div class="hemicycle-container">
          <!-- SVG del hemiciclo -->
          <svg 
            class="hemicycle-svg" 
            viewBox="250 200 700 400" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            @mousemove="updateTooltipPosition"
            style="cursor: default;"
          >
            <rect width="100%" height="100%" fill="#fff" rx="20" />

            <g>
              <!-- ========================================== -->
              <!-- DIRECTIVA (CENTRO) - SIEMPRE TITULARES     -->
              <!-- ========================================== -->
              <g>
                <!-- 12 - 2da Vicepresidencia -->
                <circle 
                  cx="500" cy="240" r="20" 
                  :fill="getColorDirectiva(12)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 12,
                    'filtered-out': getSeatFilteredOut(12)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(12)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(12), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="500" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">12</text>
                
                <!-- 6 - 1ra Vicepresidencia -->
                <circle 
                  cx="540" cy="240" r="20" 
                  :fill="getColorDirectiva(6)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 6,
                    'filtered-out': getSeatFilteredOut(6)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(6)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(6), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="540" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">6</text>   
                
                <!-- 32 - Presidente -->
                <circle 
                  cx="580" cy="240" r="22" 
                  :fill="getColorDirectiva(32)" 
                  stroke="white" stroke-width="2.5" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 32,
                    'filtered-out': getSeatFilteredOut(32)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(32)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(32), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="580" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">32</text>
                
                <!-- 33 - 1ra Secretaria -->
                <circle 
                  cx="620" cy="240" r="20" 
                  :fill="getColorDirectiva(33)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 33,
                    'filtered-out': getSeatFilteredOut(33)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(33)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(33), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="620" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">33</text>
                
                <!-- 24 - Julio Diego Romaña Galindo -->
                <circle 
                  cx="660" cy="240" r="20" 
                  :fill="getColorDirectiva(24)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 24,
                    'filtered-out': getSeatFilteredOut(24)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(24)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(24), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="660" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">24</text>
                
                <!-- 13 - 2da Secretaria -->
                <circle 
                  cx="700" cy="240" r="20" 
                  :fill="getColorDirectiva(13)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 
                    'selected': hoveredSeat?.id === 13,
                    'filtered-out': getSeatFilteredOut(13)
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(13)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(13), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="700" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">13</text>
              </g>

              <!-- ========================================== -->
              <!-- ARCO (36 SENADORES - TODOS)                -->
              <!-- ========================================== -->
              <g v-for="seat in filteredSeats" :key="seat.id">
                <circle
                  :cx="seat.x" :cy="seat.y" r="20"
                  :fill="seat.filteredOut ? '#e5e7eb' : (seat.partyColor || '#e5e7eb')"
                  stroke="white" stroke-width="2"
                  class="senator-circle"
                  :class="{ 
                    'selected': hoveredSeat?.id === seat.id,
                    'suplente': tipoVisualizacion === 'suplentes' && !seat.isEmpty,
                    'empty-seat': seat.isEmpty,
                    'filtered-out': seat.filteredOut
                  }"
                  style="cursor: pointer;"
                  @click="goToSenator(seat.id)"
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text
                  :x="seat.x" :y="seat.y + 5"
                  text-anchor="middle"
                  :fill="seat.filteredOut ? '#ccc' : 'white'"
                  font-size="14"
                  font-weight="bold"
                  class="seat-number"
                  :class="{ 'text-muted': seat.filteredOut }"
                >
                  {{ seat.seatNumber }}
                </text>
              </g>
            </g>
          </svg>
          
          <!-- ========================================== -->
          <!-- TOOLTIP - CON POSICIÓN INTELIGENTE         -->
          <!-- ========================================== -->
          <div 
            v-if="hoveredSeat && !isNavigating" 
            class="tooltip-padre"
            :style="tooltipStyle"
          >
            <div class="tooltip-header">
              <div class="seat-photo">
                <img 
                  :src="hoveredSeat.fotoActual || defaultAvatar" 
                  :alt="hoveredSeat.nombreActual || hoveredSeat.name"
                  class="foto-senador"
                  :style="{ borderColor: hoveredSeat.partyColor || '#ccc' }"
                  @error="(e) => e.target.src = defaultAvatar"
                />
              </div>
              <div class="senator-info">
                <h4 class="nombre-senador">{{ hoveredSeat.nombreActual || hoveredSeat.name }}</h4>
                <div class="party-badge" :style="{ backgroundColor: hoveredSeat.partyColor + '20', color: hoveredSeat.partyColor || '#666' }">
                  {{ hoveredSeat.partyShort || 'Sin partido' }}
                </div>
                <div v-if="tipoVisualizacion === 'suplentes' && !esDirectiva(hoveredSeat.id) && hoveredSeat.suplente" class="suplente-de">
                  Suplente de: {{ hoveredSeat.name }}
                </div>
                <div v-if="hoveredSeat.isEmpty" class="sin-suplente">
                  Sin suplente
                </div>
              </div>
            </div>
            <div class="tooltip-body">
              <!-- DEPARTAMENTO -->
              <div class="info-row">
                <span class="label">Departamento:</span>
                <span class="value">{{ hoveredSeat.department || '-' }}</span>
              </div>
              
              <!-- COMITÉ O COMISIÓN -->
              <div class="info-row" v-if="hoveredSeat.comite || hoveredSeat.comision">
                <span class="label">Comité/Comisión:</span>
                <span class="value">{{ hoveredSeat.comite || hoveredSeat.comision }}</span>
              </div>
              
              <!-- CARGO -->
              <div class="info-row" v-if="hoveredSeat.cargo">
                <span class="label">Cargo:</span>
                <span class="value cargo-value" :style="{ color: hoveredSeat.partyColor || '#611717' }">
                  {{ hoveredSeat.cargo }}
                </span>
              </div>
              
              <!-- 🔥 ENLACE AL SUPLENTE (si existe y NO es modo suplentes) -->
              <div class="info-row link-row" v-if="tipoVisualizacion !== 'suplentes' && hoveredSeat.suplente && hoveredSeat.suplente !== null && hoveredSeat.suplente !== 'null'">
                <span class="label">Suplente:</span>
                <NuxtLink 
                  :to="`/senador/suplente/${generarSlug(hoveredSeat.suplente)}`" 
                  class="value link-value"
                >
                  {{ hoveredSeat.suplente }}
                </NuxtLink>
              </div>
              
              <!-- 🔥 ENLACE AL TITULAR (si es modo suplentes y NO es directiva) -->
              <div class="info-row link-row" v-if="tipoVisualizacion === 'suplentes' && !esDirectiva(hoveredSeat.id) && hoveredSeat.suplente && hoveredSeat.suplente !== null && hoveredSeat.suplente !== 'null'">
                <span class="label">Titular:</span>
                <NuxtLink 
                  :to="`/senador/${hoveredSeat.slug}`" 
                  class="value link-value"
                >
                  {{ hoveredSeat.name }}
                </NuxtLink>
              </div>
              
              <div class="hint">🖱️ Click para ver más detalles</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- LEYENDA DE PARTIDOS - ORDENADA             -->
    <!-- ========================================== -->
    <div class="leyenda-padre">
      <div 
        v-for="partido in partidosOrdenados" 
        :key="partido.nombre"
        class="legend-item"
        :class="{ 'active': filtroPartido === partido.nombreOriginal }"
        @click="toggleFiltro(partido.nombreOriginal)"
      >
        <span class="legend-number" :style="{ color: filtroPartido === partido.nombreOriginal ? partido.color : '#000000' }">
          {{ partido.cantidad }}
        </span>
        <div class="legend-color" :style="{ backgroundColor: partido.color }"></div>
        <span class="legend-text" :style="{ color: filtroPartido === partido.nombreOriginal ? partido.color : '#333' }">
          {{ partido.nombre }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { senadores } from '~/data/senadores'

const router = useRouter()

// ============================================
// CONSTANTES
// ============================================
const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23e5e7eb%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2240%22 font-family=%22sans-serif%22%3E👤%3C/text%3E%3C/svg%3E'

// IDs de la directiva (SIEMPRE TITULARES)
const DIRECTIVA_IDS = [6, 12, 13, 24, 32, 33]

// ============================================
// ESTADO
// ============================================
const hoveredSeat = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipSide = ref('right')
const isNavigating = ref(false)
const filtroPartido = ref(null)
const tipoVisualizacion = ref('titulares')

// ============================================
// FUNCIONES PARA GUARDAR/RESTAURAR ESTADO
// ============================================
const guardarEstado = () => {
  if (process.client) {
    sessionStorage.setItem('tipoVisualizacion', tipoVisualizacion.value)
    if (filtroPartido.value) {
      sessionStorage.setItem('filtroPartido', filtroPartido.value)
    } else {
      sessionStorage.removeItem('filtroPartido')
    }
    sessionStorage.setItem('scrollPosicion', window.scrollY.toString())
  }
}

const restaurarEstado = () => {
  if (process.client) {
    const tipoGuardado = sessionStorage.getItem('tipoVisualizacion')
    if (tipoGuardado === 'titulares' || tipoGuardado === 'suplentes') {
      tipoVisualizacion.value = tipoGuardado
    }
    
    const filtroGuardado = sessionStorage.getItem('filtroPartido')
    if (filtroGuardado) {
      filtroPartido.value = filtroGuardado
    }
    
    const scrollPos = sessionStorage.getItem('scrollPosicion')
    if (scrollPos) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(scrollPos),
          behavior: 'smooth'
        })
        sessionStorage.removeItem('scrollPosicion')
      }, 300)
    }
  }
}

// ============================================
// SEAT POSITIONS PARA EL ARCO (36 posiciones)
// ============================================
const seatPositionsArco = [
  // upperLeft (7)
  { x: 399, y: 303 }, { x: 405, y: 343 }, { x: 421, y: 380 },
  { x: 445, y: 412 }, { x: 477, y: 436 }, { x: 513, y: 455 },
  { x: 553, y: 465 },
  // upperRight (7)
  { x: 647, y: 465 }, { x: 687, y: 455 }, { x: 723, y: 436 },
  { x: 755, y: 412 }, { x: 779, y: 380 }, { x: 795, y: 343 },
  { x: 801, y: 303 },
  // lowerLeft (11)
  { x: 280, y: 252 }, { x: 283, y: 301 }, { x: 292, y: 349 },
  { x: 307, y: 395 }, { x: 328, y: 438 }, { x: 355, y: 477 },
  { x: 388, y: 511 }, { x: 423, y: 538 }, { x: 464, y: 559 },
  { x: 507, y: 573 }, { x: 553, y: 580 },
  // lowerRight (11)
  { x: 647, y: 580 }, { x: 693, y: 573 }, { x: 736, y: 559 },
  { x: 777, y: 538 }, { x: 812, y: 511 }, { x: 845, y: 477 },
  { x: 872, y: 438 }, { x: 893, y: 395 }, { x: 908, y: 349 },
  { x: 917, y: 301 }, { x: 920, y: 252 }
]

// ============================================
// FUNCIÓN PARA VERIFICAR SI ES DIRECTIVA
// ============================================
const esDirectiva = (id) => {
  return DIRECTIVA_IDS.includes(id)
}

// ============================================
// FUNCIÓN PARA GENERAR SLUG
// ============================================
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

// ============================================
// FUNCIÓN PARA OBTENER NOMBRE DE PARTIDO
// ============================================
const getNombrePartido = (nombreOriginal) => {
  const nombres = {
    'Partido Demócrata Cristiano': 'Partido Demócrata Cristiano',
    'Libre': 'Alianza Libre',
    'Unidad': 'Alianza Unidad',
    'Autonomía para Bolivia Súmate': 'Autonomía Para Bolivia Súmate'
  }
  return nombres[nombreOriginal] || nombreOriginal
}

// ============================================
// FUNCIÓN PARA VERIFICAR SI UN ASIENTO ESTÁ FILTRADO
// ============================================
const getSeatFilteredOut = (id) => {
  if (!filtroPartido.value) return false
  const seat = allSeats.value.find(s => s.id === id)
  if (!seat) return false
  return seat.filteredOut
}

// ============================================
// COMPUTED - ARCO (36 SENADORES CON FILTRO)
// ============================================
const allSeats = computed(() => {
  const senadoresOrdenados = [...senadores].sort((a, b) => a.seatNumber - b.seatNumber)
  
  return senadoresOrdenados.map((senator, index) => {
    const pos = seatPositionsArco[index] || { x: 400, y: 300 }
    const isDirectiva = esDirectiva(senator.id)
    
    // ===== MODO SUPLENTES =====
    if (tipoVisualizacion.value === 'suplentes') {
      // 🔥 DIRECTIVA: SIEMPRE muestra al TITULAR
      if (isDirectiva) {
        return {
          ...senator,
          nombreActual: senator.name,
          fotoActual: senator.foto,
          x: pos.x,
          y: pos.y,
          isEmpty: false,
          partyColor: senator.partyColor,
          esSuplente: false,
          comite: senator.comite || null,
          comision: senator.comision || null,
          cargo: senator.cargo || null,
          suplente: senator.suplente || null,
          esDirectiva: true,
          filteredOut: false
        }
      }
      
      // 🔥 NO DIRECTIVA: muestra el SUPLENTE si existe
      if (senator.suplente && senator.suplente !== null && senator.suplente !== 'null') {
        return {
          ...senator,
          nombreActual: senator.suplente,
          fotoActual: senator.fotoSuplente || DEFAULT_AVATAR,
          slugSuplente: generarSlug(senator.suplente),
          x: pos.x,
          y: pos.y,
          isEmpty: false,
          partyColor: senator.partyColor,
          esSuplente: true,
          comite: senator.comite || null,
          comision: senator.comision || null,
          cargo: senator.cargo || null,
          esDirectiva: false,
          filteredOut: false
        }
      } else {
        return {
          ...senator,
          nombreActual: 'Sin suplente',
          fotoActual: DEFAULT_AVATAR,
          x: pos.x,
          y: pos.y,
          isEmpty: true,
          partyColor: '#e5e7eb',
          partyShort: 'Sin suplente',
          slugSuplente: null,
          esSuplente: false,
          comite: null,
          comision: null,
          cargo: null,
          esDirectiva: false,
          filteredOut: false
        }
      }
    }
    
    // ===== MODO TITULARES =====
    return {
      ...senator,
      nombreActual: senator.name,
      fotoActual: senator.foto,
      x: pos.x,
      y: pos.y,
      isEmpty: false,
      partyColor: senator.partyColor,
      slugSuplente: null,
      esSuplente: false,
      comite: senator.comite || null,
      comision: senator.comision || null,
      cargo: senator.cargo || null,
      esDirectiva: isDirectiva,
      filteredOut: false
    }
  })
})

// ============================================
// FILTRO POR PARTIDO
// ============================================
const filteredSeats = computed(() => {
  if (!filtroPartido.value) {
    return allSeats.value
  }
  
  return allSeats.value.map(seat => {
    const seatParty = seat.party || ''
    const filterParty = filtroPartido.value || ''
    const matches = seatParty === filterParty
    
    return { ...seat, filteredOut: !matches }
  })
})

// ============================================
// FUNCIONES PARA LA DIRECTIVA
// ============================================
const getColorDirectiva = (id) => {
  const senador = senadores.find(s => s.id === id)
  if (filtroPartido.value) {
    const seat = allSeats.value.find(s => s.id === id)
    if (seat && seat.filteredOut) {
      return '#e5e7eb'
    }
  }
  return senador?.partyColor || '#cccccc'
}

const getSeatDirectiva = (id) => {
  const senador = senadores.find(s => s.id === id)
  if (!senador) return null
  
  const seat = allSeats.value.find(s => s.id === id)
  const isFilteredOut = seat?.filteredOut || false
  
  return {
    ...senador,
    nombreActual: senador.name,
    fotoActual: senador.foto,
    isEmpty: false,
    comite: senador.comite || null,
    comision: senador.comision || null,
    cargo: senador.cargo || null,
    suplente: senador.suplente || null,
    esDirectiva: true,
    esSuplente: false,
    filteredOut: isFilteredOut
  }
}

// ============================================
// PARTIDOS (para la leyenda) - ORDENADOS
// ============================================
const partidosOrdenados = computed(() => {
  const conteo = {}
  let baseSenadores
  
  if (tipoVisualizacion.value === 'suplentes') {
    baseSenadores = senadores.filter(s => {
      if (esDirectiva(s.id)) return true
      return s.suplente && s.suplente !== null && s.suplente !== 'null'
    })
  } else {
    baseSenadores = senadores
  }
  
  baseSenadores.forEach(s => {
    conteo[s.party] = (conteo[s.party] || 0) + 1
  })
  
  const colores = {
    'Partido Demócrata Cristiano': '#2E7078',
    'Libre': '#DB3737',
    'Unidad': '#EFCD04',
    'Autonomía para Bolivia Súmate': '#611789'
  }
  
  const nombres = {
    'Partido Demócrata Cristiano': 'Partido Demócrata Cristiano',
    'Libre': 'Alianza Libre',
    'Unidad': 'Alianza Unidad',
    'Autonomía para Bolivia Súmate': 'Autonomía Para Bolivia Súmate'
  }
  
  // 🔥 ORDEN PERSONALIZADO - Cambia este array según el orden que quieras
  const orden = [
    'Partido Demócrata Cristiano',
    'Libre',
    'Unidad',
    'Autonomía para Bolivia Súmate'
  ]
  
  let partidosArray = Object.entries(conteo).map(([nombre, cantidad]) => ({
    nombre: nombres[nombre] || nombre,
    nombreOriginal: nombre,
    cantidad,
    color: colores[nombre] || '#000000',
    ordenIndex: orden.indexOf(nombre) === -1 ? 999 : orden.indexOf(nombre)
  }))
  
  // Ordenar por el índice definido
  partidosArray.sort((a, b) => a.ordenIndex - b.ordenIndex)
  
  return partidosArray
})

// ============================================
// MÉTODOS
// ============================================
const setTipoVisualizacion = (tipo) => {
  tipoVisualizacion.value = tipo
  filtroPartido.value = null
  guardarEstado()
}

const toggleFiltro = (nombrePartido) => {
  if (filtroPartido.value === nombrePartido) {
    filtroPartido.value = null
  } else {
    filtroPartido.value = nombrePartido
  }
  guardarEstado()
}

const getColorById = (id) => {
  const senador = allSeats.value.find(s => s.id === id)
  return senador?.partyColor || '#cccccc'
}

const getSeatById = (id) => {
  if (esDirectiva(id)) {
    return getSeatDirectiva(id)
  }
  const found = allSeats.value.find(s => s.id === id)
  return found || null
}

const handleMouseEnter = (seat, event) => {
  if (seat && !seat.filteredOut) {
    hoveredSeat.value = seat
    updateTooltipPosition(event)
  }
}

const handleMouseLeave = () => {
  hoveredSeat.value = null
}

const updateTooltipPosition = (event) => {
  if (event && event.clientX && event.clientY) {
    const isMobile = window.innerWidth < 768
    const mouseX = event.clientX
    const windowWidth = window.innerWidth
    const tooltipWidth = isMobile ? 300 : 400
    
    if (mouseX + tooltipWidth > windowWidth - 20) {
      tooltipSide.value = 'left'
    } else {
      tooltipSide.value = 'right'
    }
    
    const offsetX = isMobile ? 0 : (tooltipSide.value === 'left' ? -tooltipWidth + 350 : 25)
    const offsetY = isMobile ? -20 : -20
    
    tooltipPosition.value = {
      x: event.clientX + offsetX,
      y: event.clientY + offsetY
    }
  }
}

const goToSenator = (id) => {
  const seat = allSeats.value.find(s => s.id === id)
  if (!seat) return
  if (seat.isEmpty) return
  if (seat.filteredOut) return
  
  guardarEstado()
  
  isNavigating.value = true
  hoveredSeat.value = null
  
  if (tipoVisualizacion.value === 'suplentes' && seat.esSuplente && seat.suplente && !seat.esDirectiva) {
    router.push(`/senador/suplente/${seat.slugSuplente}`)
    return
  }
  
  router.push(`/senador/${seat.slug}`)
}

// ============================================
// TOOLTIP STYLE CON POSICIÓN INTELIGENTE
// ============================================
const tooltipStyle = computed(() => {
  const isMobile = window.innerWidth < 768
  const transform = isMobile 
    ? 'translate(-50%, -100%)' 
    : (tooltipSide.value === 'left' ? 'translate(-100%, -50%)' : 'translate(0, -50%)')
  
  return {
    position: 'fixed',
    left: tooltipPosition.value.x + 'px',
    top: tooltipPosition.value.y + 'px',
    transform: transform,
    backgroundColor: 'white',
    borderRadius: '0.7em',
    padding: '1.15em',
    boxShadow: '0 0.5em 1.8em rgba(0, 0, 0, 0.25)',
    border: '0.15em solid ' + (hoveredSeat.value?.partyColor || '#ccc'),
    pointerEvents: 'none',
    zIndex: 9999,
    maxWidth: isMobile ? '92vw' : '28em',
    minWidth: isMobile ? '16em' : '20em',
    animation: 'fadeIn 0.15s ease'
  }
})

// ============================================
// MONTAJE
// ============================================
onMounted(() => {
  restaurarEstado()
  console.log('✅ SenateChamber montado')
})
</script>

<style scoped>
.senate-chamber {
  width: 100%;
  background: rgba(255,255,255,0.3);
  border-radius: 12px;
  overflow: hidden;
}

.background-container {
  background: rgba(255,255,255,0.2);
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ========================================== */
/* BOTONES CON INDICADOR DE FILTRO           */
/* ========================================== */
.botones-padre {
  font-size: 1vw;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
}

.botones-padre .inline-flex {
  font-size: 1em;
}

.botones-padre button {
  padding: 0.4em 0.75em;
  font-size: 0.9em;
  border-radius: 0.375em;
}

.filtro-activo {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  background: #f0f0f0;
  padding: 0.3em 0.8em;
  border-radius: 2em;
  font-size: 0.8em;
  border: 1px solid #ddd;
}

.filtro-label {
  color: #666;
  font-weight: 500;
}

.filtro-nombre {
  font-weight: 700;
  color: #611717;
}

.filtro-count {
  color: #888;
  font-size: 0.85em;
}

.filtro-cerrar {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 1.2em;
  padding: 0 0.2em;
  line-height: 1;
}

.filtro-cerrar:hover {
  color: #333;
}

/* ========================================== */
/* HEMICICLO                                  */
/* ========================================== */
.hemicycle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.hemicycle-container {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hemicycle-svg {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 700 / 400;
}

.senator-circle {
  transition: all 0.2s ease;
  cursor: pointer;
}

.senator-circle:hover {
  stroke-width: 3;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.senator-circle.suplente {
  stroke-dasharray: 4 4;
}

.senator-circle.empty-seat {
  cursor: default !important;
  opacity: 0.5;
}

.senator-circle.empty-seat:hover {
  stroke-width: 2;
  filter: none;
}

.senator-circle.filtered-out {
  opacity: 0.2 !important;
  cursor: default !important;
}

.senator-circle.filtered-out:hover {
  stroke-width: 2;
  filter: none;
}

.seat-number {
  pointer-events: none;
  user-select: none;
  font-size: 14px;
  font-weight: 700;
}

.seat-number.text-muted {
  opacity: 0.3;
}

/* ========================================== */
/* PADRE 2: TOOLTIP                          */
/* ========================================== */
.tooltip-padre {
  font-size: 1.15vw;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
}

.tooltip-padre .tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.8em;
  margin-bottom: 0.7em;
  padding-bottom: 0.7em;
  border-bottom: 0.1em solid #e5e7eb;
}

.tooltip-padre .foto-senador {
  width: 4em;
  height: 4em;
  border-radius: 50%;
  object-fit: cover;
  border: 0.15em solid #e5e7eb;
}

.tooltip-padre .senator-info {
  flex: 1;
  min-width: 0;
}

.tooltip-padre .nombre-senador {
  font-size: 1em;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.15em 0;
  line-height: 1.3;
}

.tooltip-padre .party-badge {
  font-size: 0.7em;
  font-weight: 600;
  padding: 0.15em 0.6em;
  border-radius: 0.25em;
  display: inline-block;
}

.tooltip-padre .suplente-de,
.tooltip-padre .sin-suplente {
  font-size: 0.65em;
  color: #6b7280;
  margin-top: 0.2em;
}

.tooltip-padre .tooltip-body {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
}

.tooltip-padre .info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  align-items: baseline;
  gap: 0.5em;
}

.tooltip-padre .label {
  color: #6b7280;
  font-weight: 500;
  flex-shrink: 0;
}

.tooltip-padre .value {
  font-weight: 600;
  color: #1f2937;
  text-align: right;
  font-size: 0.9em;
}

.tooltip-padre .cargo-value {
  color: #611717;
  font-weight: 700;
  font-size: 0.9em;
}

.tooltip-padre .link-value {
  color: #611717;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  text-align: right;
  font-size: 0.9em;
}

.tooltip-padre .link-value:hover {
  text-decoration: underline;
}

.tooltip-padre .hint {
  color: #3b82f6;
  font-style: italic;
  font-size: 0.7em;
  margin-top: 0.4em;
  text-align: center;
  border-top: 0.05em dashed #e5e7eb;
  padding-top: 0.4em;
}

/* ========================================== */
/* PADRE 3: LEYENDA                          */
/* ========================================== */
.leyenda-padre {
  font-size: 2vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em 1.5em;
  padding: 0.8em 0.8em;
  margin-top: 0.8em;
}

.leyenda-padre .legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15em;
  min-width: 5em;
  cursor: pointer;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  transition: all 0.3s ease;
  user-select: none;
}

.leyenda-padre .legend-item:hover {
  background-color: rgba(0,0,0,0.05);
  transform: scale(1.05);
}

.leyenda-padre .legend-item.active {
  background-color: rgba(0,0,0,0.08);
  box-shadow: 0 0 0 0.12em currentColor;
}

.leyenda-padre .legend-number {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1;
  color: #000000;
  transition: color 0.3s ease;
}

.leyenda-padre .legend-color {
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  border: 0.1em solid white;
  box-shadow: 0 0.1em 0.2em rgba(0,0,0,0.15);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.leyenda-padre .legend-item.active .legend-color {
  transform: scale(1.1);
  box-shadow: 0 0 0 0.15em currentColor, 0 0.1em 0.4em rgba(0,0,0,0.25);
}

.leyenda-padre .legend-text {
  font-size: 0.55em;
  font-weight: 500;
  color: #333;
  text-align: center;
  line-height: 1.2;
  max-width: 6em;
  transition: color 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>