<template>
  <div class="senate-chamber" @mouseleave="handleMouseLeave">
    <div class="background-container">
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
              <!-- BOLITAS DE LA DIRECTIVA (CENTRO) -->
              <g>
                <!-- 32 - Presidente -->
                <circle 
                  v-if="mostrarSenador(32)"
                  cx="520" cy="240" r="20" 
                  :fill="getColorById(32)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 32 }"
                  @click="goToSenator(32)"
                  @mouseenter="handleMouseEnter(getSeatById(32), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text v-if="mostrarSenador(32)" x="520" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">32</text>
                
                <!-- 6 - 1ra Vicepresidencia -->
                <circle 
                  v-if="mostrarSenador(6)"
                  cx="560" cy="240" r="20" 
                  :fill="getColorById(6)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 6 }"
                  @click="goToSenator(6)"
                  @mouseenter="handleMouseEnter(getSeatById(6), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text v-if="mostrarSenador(6)" x="560" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">6</text>   
                
                <!-- 12 - 2da Vicepresidencia -->
                <circle 
                  v-if="mostrarSenador(12)"
                  cx="599" cy="240" r="20" 
                  :fill="getColorById(12)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 12 }"
                  @click="goToSenator(12)"
                  @mouseenter="handleMouseEnter(getSeatById(12), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text v-if="mostrarSenador(12)" x="599" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">12</text>
                
                <!-- 33 - 1ra Secretaria -->
                <circle 
                  v-if="mostrarSenador(33)"
                  cx="638" cy="240" r="20" 
                  :fill="getColorById(33)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 33 }"
                  @click="goToSenator(33)"
                  @mouseenter="handleMouseEnter(getSeatById(33), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text v-if="mostrarSenador(33)" x="638" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">33</text>
                
                <!-- 13 - 2da Secretaria -->
                <circle 
                  v-if="mostrarSenador(13)"
                  cx="678" cy="240" r="20" 
                  :fill="getColorById(13)" 
                  stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 13 }"
                  @click="goToSenator(13)"
                  @mouseenter="handleMouseEnter(getSeatById(13), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text v-if="mostrarSenador(13)" x="678" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">13</text>
              </g>

              <!-- BOLITAS DE SENADORES (36) -->
              <g v-for="seat in allSeats" :key="seat.id">
                <circle
                  v-if="mostrarSenador(seat.id)"
                  :cx="seat.x" :cy="seat.y" r="20"
                  :fill="seat.partyColor"
                  stroke="white" stroke-width="2"
                  class="senator-circle"
                  :class="{ 'selected': hoveredSeat?.id === seat.id, 'filtered-out': !mostrarSenador(seat.id) }"
                  @click="goToSenator(seat.id)"
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text
                  v-if="mostrarSenador(seat.id)"
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

          <!-- TOOLTIP -->
          <div 
            v-if="hoveredSeat && !isNavigating" 
            class="seat-tooltip"
            :style="tooltipStyle"
          >
            <div class="tooltip-header">
              <div class="seat-number-indicator" :style="{ backgroundColor: hoveredSeat.partyColor }">
                {{ hoveredSeat.seatNumber }}
              </div>
              <div class="senator-info">
                <h4 class="text-sm font-bold text-gray-800">{{ hoveredSeat.name }}</h4>
                <div class="party-badge text-xs px-2 py-0.5 rounded" :style="{ backgroundColor: hoveredSeat.partyColor + '20', color: hoveredSeat.partyColor }">
                  {{ hoveredSeat.partyShort }}
                </div>
              </div>
            </div>
            <div class="tooltip-body">
              <div class="info-row">
                <span class="label">Departamento:</span>
                <span class="value">{{ hoveredSeat.department }}</span>
              </div>
              <div class="info-row">
                <span class="label">Bancada:</span>
                <span class="value">{{ hoveredSeat.bancada }}</span>
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

const router = useRouter()

// ============================================
// ESTADO
// ============================================
const hoveredSeat = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const isNavigating = ref(false)
const filtroPartido = ref(null) // null = mostrar todos

// ============================================
// SEAT POSITIONS
// ============================================
const seatPositions = {
  upperLeft: [
    { x: 399, y: 303 }, { x: 405, y: 343 }, { x: 421, y: 380 },
    { x: 445, y: 412 }, { x: 477, y: 436 }, { x: 513, y: 455 },
    { x: 553, y: 465 }
  ],
  upperRight: [
    { x: 647, y: 465 }, { x: 687, y: 455 }, { x: 723, y: 436 },
    { x: 755, y: 412 }, { x: 779, y: 380 }, { x: 795, y: 343 },
    { x: 801, y: 303 }
  ],
  lowerLeft: [
    { x: 280, y: 252 }, { x: 283, y: 301 }, { x: 292, y: 349 },
    { x: 307, y: 395 }, { x: 328, y: 438 }, { x: 355, y: 477 },
    { x: 388, y: 511 }, { x: 423, y: 538 }, { x: 464, y: 559 },
    { x: 507, y: 573 }, { x: 553, y: 580 }
  ],
  lowerRight: [
    { x: 647, y: 580 }, { x: 693, y: 573 }, { x: 736, y: 559 },
    { x: 777, y: 538 }, { x: 812, y: 511 }, { x: 845, y: 477 },
    { x: 872, y: 438 }, { x: 893, y: 395 }, { x: 908, y: 349 },
    { x: 917, y: 301 }, { x: 920, y: 252 }
  ]
}

// ============================================
// SENADORES
// ============================================
const senators = [
  { id: 1, seatNumber: 1, name: "Wilder Véliz Armas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Cochabamba", bancada: "Gobierno", comite: "Comité de Justicia Plural y Consejo de la Magistratura.", cargo: "Secretario de Comite" },
  { id: 2, seatNumber: 2, name: "Judith Rosario García Coca", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Cochabamba", bancada: "Gobierno", comision: "Comisión de Seguridad del Estado", cargo: "Presidente de Comisión" },
  { id: 3, seatNumber: 3, name: "Claudia Mallón Vargas", party: "Autonomía para Bolivia Súmate", partyShort: "APB", partyColor: "#611789", department: "Cochabamba", bancada: "Aliados", comite: "Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social", cargo: "Secretaria de Comite" },
  { id: 4, seatNumber: 4, name: "Wanda Ximena Medrano Hervas", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Cochabamba", bancada: "Oposición", comite: "Comité de Relaciones Económicas Internacionales", cargo: "Secretaria de Comite" },
  { id: 5, seatNumber: 5, name: "José Manuel Ormachea Mendieta", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "La Paz", bancada: "Oposición", comision: "Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad", cargo: "Presidente de Comisión" },
  { id: 6, seatNumber: 6, name: "Carmen Soledad Chapeton Tancara", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "La Paz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Vicepresidencia" },
  { id: 7, seatNumber: 7, name: "Nicanor Gonzalo Cochi Condorí", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Política Internacional y Protección al Migrante", cargo: "Presidente de Comisión" },
  { id: 8, seatNumber: 8, name: "Tomasa Yarhui Jacome", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Sistema Electoral, Derechos Humanos y Equidad Social", cargo: "Secretaria de Comite" },
  { id: 9, seatNumber: 9, name: "Abdon Porcel Arancibia", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Políticas Financiera, Monetaria, Tributaria y Seguros", cargo: "Secretario de Comite" },
  { id: 10, seatNumber: 10, name: "Bertha Cartagena Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Chuquisaca", bancada: "Gobierno", comite: "Comité de Culturas, Interculturalidad y Patrimonio Cultural", cargo: "Secretaria de Comite" },
  { id: 11, seatNumber: 11, name: "Branko Goran Marinković Jovicevic", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Santa Cruz", bancada: "Oposición", comision: "Comisión de Tierra y Territorio / Región Amazónica", cargo: "Presidente de Comisión" },
  { id: 12, seatNumber: 12, name: "Kathia Lizbeth Quiroga Fernández", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Santa Cruz", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Vicepresidencia" },
  { id: 13, seatNumber: 13, name: "Rosa Tatiana Áñez Carrasco", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Santa Cruz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Tercera Secretaria" },
  { id: 14, seatNumber: 14, name: "Paola Limbania López Zeballos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Santa Cruz", bancada: "Gobierno", comite: "Comité de Seguridad del Estado y Lucha Contra el Narcotráfico", cargo: "Secretaria de Comite" },
  { id: 15, seatNumber: 15, name: "Betty Canaviri Villanueva", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Potosí", bancada: "Oposición", comite: "Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura", cargo: "Secretaria de Comite" },
  { id: 16, seatNumber: 16, name: "Teresa Alarcón Arana", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Potosí", bancada: "Oposición", comite: "Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales", cargo: "Secretaria de Comite" },
  { id: 17, seatNumber: 17, name: "Marcelino Flores Ordoñez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Potosí", bancada: "Gobierno", comite: "Comité de Energía, Hidrocarburos, Minería y Metalurgia", cargo: "Secretario de Comite" },
  { id: 18, seatNumber: 18, name: "Bertha Nurmy Gutiérrez Meneces", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Potosí", bancada: "Gobierno", comite: "Comité de Naciones y Pueblos Indígena Originario Campesinos", cargo: "Secretaria de Comite" },
  { id: 19, seatNumber: 19, name: "Erick Nelson Soruco Alpire", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Beni", bancada: "Gobierno", comision: "Comisión de Justicia Plural, Ministerio Público y Defensa del Estado", cargo: "Presidente de Comisión" },
  { id: 20, seatNumber: 20, name: "José Roca Haensel", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Beni", bancada: "Aliados", comite: "Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales", cargo: "Secretario de Comite" },
  { id: 21, seatNumber: 21, name: "Ana Karina Velasco Añez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Beni", bancada: "Aliados", comite: "Comité de Fuerzas Armadas y Policía Boliviana", cargo: "Secretaria de comite" },
  { id: 22, seatNumber: 22, name: "Ernesto Suarez Sattori", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Beni", bancada: "Oposición", comite: "Comité de Autonomías Departamentales", cargo: "Secretario de Comite" },
  { id: 23, seatNumber: 23, name: "Ana María Crispin Choque", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Economía Plural, Producción e Industria", cargo: "Presidente de Comisión" },
  { id: 24, seatNumber: 24, name: "Julio Diego Romaña Galindo", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Pando", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Secretaria" },
  { id: 25, seatNumber: 25, name: "Carol Carlo Durán", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Pando", bancada: "Oposición", comite: "Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca", cargo: "Secretaria de Comite" },
  { id: 26, seatNumber: 26, name: "Cinthia Mónica Puerta Campos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Pando", bancada: "Gobierno", comite: "Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático", cargo: "Secretaria de Comite" },
  { id: 27, seatNumber: 27, name: "Eliana Rina Acosta Quispe", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Pando", bancada: "Aliados", comision: "Comisión de Planificación, Política Económica y Finanzas", cargo: "Presidente de Comisión" },
  { id: 28, seatNumber: 28, name: "Daniel Antonio Ortiz Velásquez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Chuquisaca", bancada: "Gobierno", comision: "Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral", cargo: "Presidente de Comisión" },
  { id: 29, seatNumber: 29, name: "María Isabel Moreno Cortez", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Tarija", bancada: "Oposición", comite: "Comité de Ministerio Público y Defensa Legal del Estado", cargo: "Secretaria de Comite" },
  { id: 30, seatNumber: 30, name: "César Mentasti Padilla", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Tarija", bancada: "Aliados", comision: "Comisión de Organización Territorial del Estado y Autonomías", cargo: "Presidente de Comisión" },
  { id: 31, seatNumber: 31, name: "Leonor Rosalva Romero Gutiérrez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#EFCD04", department: "Tarija", bancada: "Aliados", comite: "Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado", cargo: "Secretaria de Comite" },
  { id: 32, seatNumber: 32, name: "Diego Esteban Mateo Ávila Navajas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Tarija", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Presidente" },
  { id: 33, seatNumber: 33, name: "Yasmín Estivariz Villarroel", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Oruro", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Secretaria" },
  { id: 34, seatNumber: 34, name: "Freddy Castillo Chávez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Oruro", bancada: "Gobierno", comite: "Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.", cargo: "Secretario de Comite" },
  { id: 35, seatNumber: 35, name: "Maria Antonieta Alcón Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#2E7078", department: "Oruro", bancada: "Gobierno", comite: "Comité de Educación, Salud, Ciencia, Tecnología y Deporte", cargo: "Secretaria de Comite" },
  { id: 36, seatNumber: 36, name: "José Sánchez Aguilar", party: "Libre", partyShort: "LIBRE", partyColor: "#DB3737", department: "Oruro", bancada: "Gobierno", comision: "Comisión de Política Social", cargo: "Presidente de Comisión" },
]

// ============================================
// COMPUTED
// ============================================
const allSeats = computed(() => {
  const allPositions = [
    ...seatPositions.upperLeft,
    ...seatPositions.upperRight,
    ...seatPositions.lowerLeft,
    ...seatPositions.lowerRight
  ]
  
  return senators.map((senator, i) => ({
    ...senator,
    x: allPositions[i]?.x || 400,
    y: allPositions[i]?.y || 300
  }))
})

// ============================================
// PARTIDOS (para la leyenda)
// ============================================
const partidos = computed(() => {
  const conteo = {}
  senators.forEach(s => {
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
const toggleFiltro = (nombrePartido) => {
  // Buscar el nombre original del partido
  const partido = partidos.value.find(p => p.nombre === nombrePartido)
  if (!partido) return
  
  const nombreOriginal = partido.nombreOriginal
  
  if (filtroPartido.value === nombreOriginal) {
    filtroPartido.value = null // Desactivar filtro
  } else {
    filtroPartido.value = nombreOriginal // Activar filtro
  }
}

const mostrarSenador = (id) => {
  if (!filtroPartido.value) return true // Mostrar todos
  
  const senador = allSeats.value.find(s => s.id === id)
  if (!senador) return false
  
  return senador.party === filtroPartido.value
}

const getColorById = (id) => {
  const senador = allSeats.value.find(s => s.id === id)
  return senador?.partyColor || '#cccccc'
}

const getSeatById = (id) => {
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
  const seat = allSeats.value.find(s => s.id === id)
  if (!seat) return
  
  isNavigating.value = true
  hoveredSeat.value = null
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

.senator-circle.filtered-out {
  opacity: 0.1;
  pointer-events: none;
}

.seat-number {
  pointer-events: none;
  user-select: none;
  font-size: 14px;
}

/* ========================================== */
/* LEYENDA DE PARTIDOS CON FILTRO             */
/* ========================================== */
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

/* Tooltip styles */
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

.seat-number-indicator {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
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