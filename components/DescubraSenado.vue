<template>
  <div class="senate-chamber" @mouseleave="handleMouseLeave">
    <div class="background-container">
      <div class="hemicycle-wrapper">
        <div class="hemicycle-container">
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
                  cx="520" cy="240" r="20" 
                  fill="#016167" stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 32 }"
                  @click="goToSenator(32)"
                  @mouseenter="handleMouseEnter(getSeatById(32), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="520" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">32</text>
                
                <!-- 6 - 1ra Vicepresidencia -->
                <circle 
                  cx="560" cy="240" r="20" 
                  fill="#FFB848" stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 6 }"
                  @click="goToSenator(6)"
                  @mouseenter="handleMouseEnter(getSeatById(6), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="560" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">6</text>   
                
                <!-- 12 - 2da Vicepresidencia -->
                <circle 
                  cx="599" cy="240" r="20" 
                  fill="#FF0000" stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 12 }"
                  @click="goToSenator(12)"
                  @mouseenter="handleMouseEnter(getSeatById(12), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="599" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">12</text>
                
                <!-- 33 - 1ra Secretaria -->
                <circle 
                  cx="638" cy="240" r="20" 
                  fill="#016167" stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 33 }"
                  @click="goToSenator(33)"
                  @mouseenter="handleMouseEnter(getSeatById(33), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="638" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">33</text>
                
                <!-- 13 - 2da Secretaria -->
                <circle 
                  cx="678" cy="240" r="20" 
                  fill="#FFB848" stroke="white" stroke-width="2" 
                  class="senator-circle directive-seat"
                  :class="{ 'selected': hoveredSeat?.id === 13 }"
                  @click="goToSenator(13)"
                  @mouseenter="handleMouseEnter(getSeatById(13), $event)"
                  @mouseleave="handleMouseLeave"
                />
                <text x="678" y="245" text-anchor="middle" fill="white" font-size="14" font-weight="bold" class="seat-number">13</text>
              </g>

              <!-- BOLITAS DE SENADORES (36) -->
              <g v-for="seat in allSeats" :key="seat.id">
                <circle
                  :cx="seat.x" :cy="seat.y" r="20"
                  :fill="seat.partyColor"
                  stroke="white" stroke-width="2"
                  class="senator-circle"
                  :class="{ 'selected': hoveredSeat?.id === seat.id }"
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
  { id: 1, seatNumber: 1, name: "Wilder Véliz Armas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Cochabamba", bancada: "Gobierno", comite: "Comité de Justicia Plural y Consejo de la Magistratura.", cargo: "Secretario de Comite" },
  { id: 2, seatNumber: 2, name: "Judith Rosario García Coca", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Cochabamba", bancada: "Gobierno", comision: "Comisión de Seguridad del Estado", cargo: "Presidente de Comisión" },
  { id: 3, seatNumber: 3, name: "Claudia Mallón Vargas", party: "Autonomía para Bolivia Súmate", partyShort: "APB", partyColor: "#511966", department: "Cochabamba", bancada: "Aliados", comite: "Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social", cargo: "Secretaria de Comite" },
  { id: 4, seatNumber: 4, name: "Wanda Ximena Medrano Hervas", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Cochabamba", bancada: "Oposición", comite: "Comité de Relaciones Económicas Internacionales", cargo: "Secretaria de Comite" },
  { id: 5, seatNumber: 5, name: "José Manuel Ormachea Mendieta", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "La Paz", bancada: "Oposición", comision: "Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad", cargo: "Presidente de Comisión" },
  { id: 6, seatNumber: 6, name: "Carmen Soledad Chapeton Tancara", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "La Paz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Vicepresidencia" },
  { id: 7, seatNumber: 7, name: "Nicanor Gonzalo Cochi Condorí", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Política Internacional y Protección al Migrante", cargo: "Presidente de Comisión" },
  { id: 8, seatNumber: 8, name: "Tomasa Yarhui Jacome", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Sistema Electoral, Derechos Humanos y Equidad Social", cargo: "Secretaria de Comite" },
  { id: 9, seatNumber: 9, name: "Abdon Porcel Arancibia", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Políticas Financiera, Monetaria, Tributaria y Seguros", cargo: "Secretario de Comite" },
  { id: 10, seatNumber: 10, name: "Bertha Cartagena Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Chuquisaca", bancada: "Gobierno", comite: "Comité de Culturas, Interculturalidad y Patrimonio Cultural", cargo: "Secretaria de Comite" },
  { id: 11, seatNumber: 11, name: "Branko Goran Marinković Jovicevic", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Santa Cruz", bancada: "Oposición", comision: "Comisión de Tierra y Territorio / Región Amazónica", cargo: "Presidente de Comisión" },
  { id: 12, seatNumber: 12, name: "Kathia Lizbeth Quiroga Fernández", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Santa Cruz", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Vicepresidencia" },
  { id: 13, seatNumber: 13, name: "Rosa Tatiana Áñez Carrasco", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Santa Cruz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Tercera Secretaria" },
  { id: 14, seatNumber: 14, name: "Paola Limbania López Zeballos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Santa Cruz", bancada: "Gobierno", comite: "Comité de Seguridad del Estado y Lucha Contra el Narcotráfico", cargo: "Secretaria de Comite" },
  { id: 15, seatNumber: 15, name: "Betty Canaviri Villanueva", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Potosí", bancada: "Oposición", comite: "Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura", cargo: "Secretaria de Comite" },
  { id: 16, seatNumber: 16, name: "Teresa Alarcón Arana", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Oposición", comite: "Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales", cargo: "Secretaria de Comite" },
  { id: 17, seatNumber: 17, name: "Marcelino Flores Ordoñez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Gobierno", comite: "Comité de Energía, Hidrocarburos, Minería y Metalurgia", cargo: "Secretario de Comite" },
  { id: 18, seatNumber: 18, name: "Bertha Nurmy Gutiérrez Meneces", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Gobierno", comite: "Comité de Naciones y Pueblos Indígena Originario Campesinos", cargo: "Secretaria de Comite" },
  { id: 19, seatNumber: 19, name: "Erick Nelson Soruco Alpire", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Beni", bancada: "Gobierno", comision: "Comisión de Justicia Plural, Ministerio Público y Defensa del Estado", cargo: "Presidente de Comisión" },
  { id: 20, seatNumber: 20, name: "José Roca Haensel", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Beni", bancada: "Aliados", comite: "Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales", cargo: "Secretario de Comite" },
  { id: 21, seatNumber: 21, name: "Ana Karina Velasco Añez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Beni", bancada: "Aliados", comite: "Comité de Fuerzas Armadas y Policía Boliviana", cargo: "Secretaria de comite" },
  { id: 22, seatNumber: 22, name: "Ernesto Suarez Sattori", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Beni", bancada: "Oposición", comite: "Comité de Autonomías Departamentales", cargo: "Secretario de Comite" },
  { id: 23, seatNumber: 23, name: "Ana María Crispin Choque", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Economía Plural, Producción e Industria", cargo: "Presidente de Comisión" },
  { id: 24, seatNumber: 24, name: "Julio Diego Romaña Galindo", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Pando", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Secretaria" },
  { id: 25, seatNumber: 25, name: "Carol Carlo Durán", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Pando", bancada: "Oposición", comite: "Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca", cargo: "Secretaria de Comite" },
  { id: 26, seatNumber: 26, name: "Cinthia Mónica Puerta Campos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Pando", bancada: "Gobierno", comite: "Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático", cargo: "Secretaria de Comite" },
  { id: 27, seatNumber: 27, name: "Eliana Rina Acosta Quispe", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Pando", bancada: "Aliados", comision: "Comisión de Planificación, Política Económica y Finanzas", cargo: "Presidente de Comisión" },
  { id: 28, seatNumber: 28, name: "Daniel Antonio Ortiz Velásquez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Chuquisaca", bancada: "Gobierno", comision: "Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral", cargo: "Presidente de Comisión" },
  { id: 29, seatNumber: 29, name: "María Isabel Moreno Cortez", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Tarija", bancada: "Oposición", comite: "Comité de Ministerio Público y Defensa Legal del Estado", cargo: "Secretaria de Comite" },
  { id: 30, seatNumber: 30, name: "César Mentasti Padilla", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Tarija", bancada: "Aliados", comision: "Comisión de Organización Territorial del Estado y Autonomías", cargo: "Presidente de Comisión" },
  { id: 31, seatNumber: 31, name: "Leonor Rosalva Romero Gutiérrez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Tarija", bancada: "Aliados", comite: "Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado", cargo: "Secretaria de Comite" },
  { id: 32, seatNumber: 32, name: "Diego Esteban Mateo Ávila Navajas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Tarija", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Presidente" },
  { id: 33, seatNumber: 33, name: "Yasmín Estivariz Villarroel", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Secretaria" },
  { id: 34, seatNumber: 34, name: "Freddy Castillo Chávez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comite: "Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.", cargo: "Secretario de Comite" },
  { id: 35, seatNumber: 35, name: "Maria Antonieta Alcón Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comite: "Comité de Educación, Salud, Ciencia, Tecnología y Deporte", cargo: "Secretaria de Comite" },
  { id: 36, seatNumber: 36, name: "José Sánchez Aguilar", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Oruro", bancada: "Gobierno", comision: "Comisión de Política Social", cargo: "Presidente de Comisión" },
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
// MÉTODOS CON DEBUG
// ============================================
const getSeatById = (id) => {
  const found = allSeats.value.find(s => s.id === id)
  console.log(`🔍 Buscando senador con ID: ${id}`, found || '❌ NO ENCONTRADO')
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
    const offset = window.innerWidth < 768 ? 15 : -340
    tooltipPosition.value = {
      x: event.clientX + offset,
      y: event.clientY
    }
  }
}

const goToSenator = (id) => {
  console.log(`🟢 Click en senador ID: ${id}`)
  
  // Buscar el senador en allSeats
  const seat = allSeats.value.find(s => s.id === id)
  
  if (!seat) {
    console.error(`❌ ERROR: Senador con ID ${id} NO ENCONTRADO en allSeats`)
    console.log('📋 Lista de IDs disponibles:', allSeats.value.map(s => s.id).sort((a,b) => a - b))
    return
  }
  
  console.log(`✅ Senador encontrado: ${seat.name} (ID: ${seat.id})`)
  console.log(`🔗 Redirigiendo a: /senador/${id}`)
  
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
// MONTAJE - Verificar todos los IDs
// ============================================
onMounted(() => {
  console.log('✅ SenateChamber montado')
  console.log('📋 Total de senadores:', allSeats.value.length)
  console.log('📋 IDs disponibles:', allSeats.value.map(s => s.id).sort((a,b) => a - b))
  console.log('📋 IDs en el centro: [32, 6, 12, 33, 13]')
  
  // Verificar que los IDs del centro existen
  const centerIds = [32, 6, 12, 33, 13]
  centerIds.forEach(id => {
    const exists = allSeats.value.some(s => s.id === id)
    console.log(`  ${exists ? '✅' : '❌'} ID ${id} ${exists ? 'encontrado' : 'NO encontrado'}`)
  })
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
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.senator-circle:hover {
  r: 26;
  stroke-width: 3;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.senator-circle.selected {
  r: 26;
  stroke: #f59e0b;
  stroke-width: 3;
  filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.5));
}

/* 🔥 ELIMINAMOS EL EFECTO DE CLIC (transform: scale) */
.senator-circle:active {
  /* transform: scale(0.95);  <-- ELIMINADO */
}

.seat-number {
  pointer-events: none;
  user-select: none;
  font-size: 14px;
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