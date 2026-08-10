<template>
  <div class="senate-chamber" @mouseleave="handleMouseLeave">
    <div class="background-container">
      <!-- ========================================== -->
      <!-- BOTÓN TITULARES/SUPLENTES                  -->
      <!-- ========================================== -->
      <div class="flex justify-start mb-4">
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
          >
            <rect width="1000" height="600" fill="#fff" rx="20" />

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
                  :class="{ 'selected': hoveredSeat?.id === 12 }"
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
                  :class="{ 'selected': hoveredSeat?.id === 6 }"
                  @click="goToSenator(6)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(6), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="540" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">6</text>   
                
                <!-- 32 - Presidente -->
                <circle 
                  cx="580" cy="240" r="20" 
                  :fill="getColorDirectiva(32)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 32 }"
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
                  :class="{ 'selected': hoveredSeat?.id === 33 }"
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
                  :class="{ 'selected': hoveredSeat?.id === 24 }"
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
                  :class="{ 'selected': hoveredSeat?.id === 13 }"
                  @click="goToSenator(13)"
                  @mouseenter="handleMouseEnter(getSeatDirectiva(13), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="700" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">13</text>
              </g>

              <!-- ========================================== -->
              <!-- ARCO (36 SENADORES - TODOS)                -->
              <!-- ========================================== -->
              <g v-for="seat in allSeats" :key="seat.id">
                <circle
                  :cx="seat.x" :cy="seat.y" r="20"
                  :fill="seat.partyColor || '#e5e7eb'"
                  stroke="white" stroke-width="2"
                  class="senator-circle"
                  :class="{ 
                    'selected': hoveredSeat?.id === seat.id,
                    'suplente': tipoVisualizacion === 'suplentes' && !seat.isEmpty,
                    'empty-seat': seat.isEmpty
                  }"
                  @click="goToSenator(seat.id)"
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text
                  :x="seat.x" :y="seat.y + 5"
                  text-anchor="middle"
                  fill="white"
                  font-size="14"
                  font-weight="bold"
                  class="seat-number"
                >
                  {{ seat.seatNumber }}
                </text>
              </g>
            </g>
          </svg>

          <!-- TOOLTIP CON FOTO -->
          <div 
            v-if="hoveredSeat && !isNavigating" 
            class="seat-tooltip"
            :style="tooltipStyle"
          >
            <div class="tooltip-header">
              <div class="seat-photo">
                <img 
                  :src="hoveredSeat.fotoActual || '/images/default-avatar.png'" 
                  :alt="hoveredSeat.nombreActual || hoveredSeat.name"
                  class="w-12 h-12 rounded-full object-cover border-2"
                  :style="{ borderColor: hoveredSeat.partyColor || '#ccc' }"
                  @error="(e) => e.target.src = '/images/default-avatar.png'"
                />
              </div>
              <div class="senator-info">
                <h4 class="text-sm font-bold text-gray-800">{{ hoveredSeat.nombreActual || hoveredSeat.name }}</h4>
                <div class="party-badge text-xs px-2 py-0.5 rounded" :style="{ backgroundColor: hoveredSeat.partyColor + '20', color: hoveredSeat.partyColor || '#666' }">
                  {{ hoveredSeat.partyShort || 'Sin partido' }}
                </div>
                <div v-if="tipoVisualizacion === 'suplentes' && !esDirectiva(hoveredSeat.id) && hoveredSeat.suplente" class="text-xs text-gray-500 mt-1">
                  Suplente de: {{ hoveredSeat.name }}
                </div>
                <div v-if="hoveredSeat.isEmpty" class="text-xs text-gray-500 mt-1">
                  Sin suplente
                </div>
              </div>
            </div>
            <div class="tooltip-body">
              <div class="info-row">
                <span class="label">Departamento:</span>
                <span class="value">{{ hoveredSeat.department || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">Bancada:</span>
                <span class="value">{{ hoveredSeat.bancada || '-' }}</span>
              </div>
              <div class="info-row" v-if="hoveredSeat.cargo">
                <span class="label">Cargo:</span>
                <span class="value text-senado-primary font-semibold">{{ hoveredSeat.cargo }}</span>
              </div>
              <div class="hint">🖱️ Click para ver más detalles</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- LEYENDA DE PARTIDOS CON FILTRO             -->
    <!-- ========================================== -->
    <div class="legend-container">
      <div 
        v-for="partido in partidos" 
        :key="partido.nombre"
        class="legend-item clickable"
        :class="{ 'active': filtroPartido === partido.nombre }"
        @click="toggleFiltro(partido.nombre)"
      >
        <span class="legend-number" :style="{ color: filtroPartido === partido.nombre ? partido.color : '#000000' }">
          {{ partido.cantidad }}
        </span>
        <div class="legend-color" :style="{ backgroundColor: partido.color, width: '20px', height: '20px' }"></div>
        <span class="legend-text" :style="{ color: filtroPartido === partido.nombre ? partido.color : '#333' }">
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
// ESTADO
// ============================================
const hoveredSeat = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const isNavigating = ref(false)
const filtroPartido = ref(null)
const tipoVisualizacion = ref('titulares')

// IDs de la directiva (SIEMPRE TITULARES)
const DIRECTIVA_IDS = [6, 12, 13, 24, 32, 33]

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
// COMPUTED - ARCO (36 SENADORES - TODOS)
// ============================================
const allSeats = computed(() => {
  // TODOS los senadores (incluyendo los de la directiva)
  const senadoresOrdenados = [...senadores].sort((a, b) => a.seatNumber - b.seatNumber)
  
  return senadoresOrdenados.map((senator, index) => {
    const pos = seatPositionsArco[index] || { x: 400, y: 300 }
    
    // Si es modo suplentes
    if (tipoVisualizacion.value === 'suplentes') {
      // Si tiene suplente
      if (senator.suplente && senator.suplente !== null) {
        return {
          ...senator,
          nombreActual: senator.suplente,
          fotoActual: senator.fotoSuplente || '/images/default-avatar.png',
          slugSuplente: generarSlug(senator.suplente),
          x: pos.x,
          y: pos.y,
          isEmpty: false,
          partyColor: senator.partyColor,
          esSuplente: true
        }
      } else {
        // No tiene suplente (Teresa Alarcón) - círculo gris vacío
        return {
          ...senator,
          nombreActual: 'Sin suplente',
          fotoActual: '/images/default-avatar.png',
          x: pos.x,
          y: pos.y,
          isEmpty: true,
          partyColor: '#e5e7eb',
          partyShort: 'Sin suplente',
          slugSuplente: null,
          esSuplente: false
        }
      }
    }
    
    // Modo titulares → mostrar titular
    return {
      ...senator,
      nombreActual: senator.name,
      fotoActual: senator.foto,
      x: pos.x,
      y: pos.y,
      isEmpty: false,
      partyColor: senator.partyColor,
      slugSuplente: null,
      esSuplente: false
    }
  })
})

// ============================================
// FUNCIONES PARA LA DIRECTIVA
// ============================================
const getColorDirectiva = (id) => {
  const senador = senadores.find(s => s.id === id)
  return senador?.partyColor || '#cccccc'
}

const getSeatDirectiva = (id) => {
  const senador = senadores.find(s => s.id === id)
  if (!senador) return null
  return {
    ...senador,
    nombreActual: senador.name,
    fotoActual: senador.foto,
    isEmpty: false
  }
}

// ============================================
// PARTIDOS (para la leyenda)
// ============================================
const partidos = computed(() => {
  const conteo = {}
  const baseSenadores = tipoVisualizacion.value === 'suplentes'
    ? senadores.filter(s => s.suplente && s.suplente !== null)
    : senadores
  
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
  
  return Object.entries(conteo).map(([nombre, cantidad]) => ({
    nombre: nombres[nombre] || nombre,
    nombreOriginal: nombre,
    cantidad,
    color: colores[nombre] || '#000000'
  }))
})

// ============================================
// MÉTODOS
// ============================================
const setTipoVisualizacion = (tipo) => {
  tipoVisualizacion.value = tipo
  filtroPartido.value = null
}

const toggleFiltro = (nombrePartido) => {
  const partido = partidos.value.find(p => p.nombre === nombrePartido)
  if (!partido) return
  
  const nombreOriginal = partido.nombreOriginal
  
  if (filtroPartido.value === nombreOriginal) {
    filtroPartido.value = null
  } else {
    filtroPartido.value = nombreOriginal
  }
}

const getColorById = (id) => {
  const senador = allSeats.value.find(s => s.id === id)
  return senador?.partyColor || '#cccccc'
}

const getSeatById = (id) => {
  // Buscar en directiva primero
  if (esDirectiva(id)) {
    return getSeatDirectiva(id)
  }
  const found = allSeats.value.find(s => s.id === id)
  return found || null
}

const handleMouseEnter = (seat, event) => {
  if (seat) {
    hoveredSeat.value = seat
    updateTooltipPosition(event)
  }
}

const handleMouseLeave = () => {
  hoveredSeat.value = null
}

const updateTooltipPosition = (event) => {
  if (event && event.clientX && event.clientY) {
    const offset = event.clientX < 768 ? 35 : -340
    tooltipPosition.value = {
      x: event.clientX + offset,
      y: event.clientY
    }
  }
}

const goToSenator = (id) => {
  // Buscar el asiento
  const seat = allSeats.value.find(s => s.id === id)
  if (!seat) return
  
  // Si está vacío (sin suplente), no hacer nada
  if (seat.isEmpty) return
  
  isNavigating.value = true
  hoveredSeat.value = null
  
  // Si está en modo suplentes y tiene suplente
  if (tipoVisualizacion.value === 'suplentes' && seat.esSuplente && seat.suplente) {
    // Redirigir a la página del suplente usando el nombre como slug
    const slug = generarSlug(seat.suplente)
    router.push(`/senador/suplente/${slug}`)
    return
  }
  
  // Modo titulares o directiva → redirigir al titular
  router.push(`/senador/${id}`)
}

// ============================================
// TOOLTIP STYLE
// ============================================
const tooltipStyle = computed(() => {
  const isMobile = window.innerWidth < 768
  return {
    position: 'fixed',
    left: tooltipPosition.value.x + 'px',
    top: tooltipPosition.value.y + 'px',
    transform: isMobile ? 'translate(-50%, -50%)' : 'translate(10px, -50%)',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
    border: '2px solid ' + (hoveredSeat.value?.partyColor || '#ccc'),
    pointerEvents: 'none',
    zIndex: 9999,
    maxWidth: isMobile ? '90%' : '300px',
    minWidth: '220px',
    animation: 'fadeIn 0.15s ease'
  }
})

// ============================================
// MONTAJE
// ============================================
onMounted(() => {
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
}

.hemicycle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.hemicycle-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hemicycle-svg {
  width: 100%;
  height: auto;
  max-height: 550px;
  cursor: pointer;
}

.senator-circle {
  transition: all 0.2s ease;
  cursor: pointer;
}

.senator-circle:hover {
  r: 26;
  stroke-width: 3;
}

.senator-circle.suplente {
  stroke-dasharray: 4 4;
}

.senator-circle.empty-seat {
  cursor: default;
  opacity: 0.5;
}

.senator-circle.empty-seat:hover {
  r: 20;
  stroke-width: 2;
}

.seat-number {
  pointer-events: none;
  user-select: none;
  font-size: 14px;
}

.legend-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
  padding: 0.5rem 0.5rem 0.25rem 0.5rem;
  margin-top: 0.25rem;
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.05rem;
  min-width: 70px;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  user-select: none;
}

.legend-item:hover {
  background-color: rgba(0,0,0,0.05);
  transform: scale(1.05);
}

.legend-item.active {
  background-color: rgba(0,0,0,0.08);
  box-shadow: 0 0 0 2px currentColor;
}

.legend-number {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000000;
  transition: color 0.3s ease;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.legend-item.active .legend-color {
  transform: scale(1.1);
  box-shadow: 0 0 0 3px currentColor, 0 2px 8px rgba(0,0,0,0.25);
}

.legend-text {
  font-size: 0.6rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  line-height: 1.1;
  max-width: 90px;
  transition: color 0.3s ease;
}

@media (max-width: 640px) {
  .legend-container {
    gap: 0.75rem 1rem;
  }
  .legend-number {
    font-size: 1.25rem;
  }
  .legend-text {
    font-size: 0.5rem;
    max-width: 60px;
  }
  .legend-color {
    width: 16px;
    height: 16px;
  }
}

.seat-tooltip {
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(10px, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(10px, -50%) scale(1);
  }
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.seat-photo {
  flex-shrink: 0;
}

.seat-photo img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  transition: transform 0.2s ease;
}

.seat-photo img:hover {
  transform: scale(1.05);
}

.senator-info h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.party-badge {
  display: inline-block;
  font-weight: 600;
}

.tooltip-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.label {
  color: #6b7280;
}

.value {
  font-weight: 600;
  color: #1f2937;
}

.hint {
  color: #3b82f6;
  font-style: italic;
  font-size: 0.75rem;
  margin-top: 0.4rem;
  text-align: center;
  border-top: 1px dashed #e5e7eb;
  padding-top: 0.4rem;
}

.directive-seat {
  cursor: pointer;
}
</style>