<!-- components/CalendarioActividades.vue -->
<template>
  <div class="calendario-moderno">
    <div class="calendario-grid">
      <!-- ========================================== -->
      <!-- IZQUIERDA: CALENDARIO MEJORADO            -->
      <!-- ========================================== -->
      <div class="calendario-panel">
        <!-- Header del calendario -->
        <div class="calendario-header">
          <button 
            @click="cambiarMes(-1)" 
            class="btn-nav"
            aria-label="Mes anterior"
          >
            <svg class="icon-nav" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="mes-titulo">
            <span class="mes-nombre">{{ nombreMes }}</span>
            <span class="mes-año">{{ añoActual }}</span>
          </div>
          
          <button 
            @click="cambiarMes(1)" 
            class="btn-nav"
            aria-label="Mes siguiente"
          >
            <svg class="icon-nav" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Días de la semana -->
        <div class="dias-semana">
          <div 
            v-for="dia in diasSemana" 
            :key="dia"
            class="dia-semana"
          >
            {{ dia }}
          </div>
        </div>

        <!-- Grid de días -->
        <div class="grid-dias">
          <div
            v-for="(dia, index) in diasDelMes"
            :key="index"
            @click="seleccionarDia(dia)"
            class="dia-item"
            :class="{
              'dia-otro-mes': !dia.esMesActual,
              'dia-actual': dia.esMesActual && !dia.tieneEvento && !dia.esSeleccionado,
              'dia-seleccionado': dia.esSeleccionado,
              'dia-con-evento': dia.tieneEvento && !dia.esSeleccionado,
              'dia-hoy': dia.esHoy
            }"
          >
            <span class="dia-numero">{{ dia.dia }}</span>
            
            <!-- Indicador de evento -->
            <span 
              v-if="dia.tieneEvento && !dia.esSeleccionado"
              class="evento-indicador"
            ></span>
            
            <!-- Indicador de evento seleccionado -->
            <span 
              v-if="dia.tieneEvento && dia.esSeleccionado"
              class="evento-indicador-seleccionado"
            ></span>

            <!-- Círculo de hoy -->
            <span 
              v-if="dia.esHoy && dia.esMesActual"
              class="hoy-indicador"
            ></span>
          </div>
        </div>

        <!-- Leyenda mejorada -->
        <div class="leyenda">
          <div class="leyenda-item">
            <span class="leyenda-dot dot-evento"></span>
            <span class="leyenda-texto">Con sesión</span>
          </div>
          <div class="leyenda-item">
            <span class="leyenda-dot dot-seleccionado"></span>
            <span class="leyenda-texto">Seleccionado</span>
          </div>
          <div class="leyenda-item">
            <span class="leyenda-dot dot-hoy"></span>
            <span class="leyenda-texto">Hoy</span>
          </div>
        </div>

        <!-- Resumen del mes -->
        <div class="resumen-mes" v-if="totalEventosMes > 0">
          <span class="resumen-icon">📋</span>
          <span class="resumen-texto">{{ totalEventosMes }} sesión{{ totalEventosMes > 1 ? 'es' : '' }} este mes</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- DERECHA: LÍNEA DE TIEMPO MEJORADA        -->
      <!-- ========================================== -->
      <div class="timeline-panel">
        <!-- Encabezado del día -->
        <div class="timeline-header">
          <div class="timeline-fecha">
            <span class="timeline-dia-semana">{{ diaSeleccionado?.diaSemana || 'Selecciona' }}</span>
            <span class="timeline-dia-numero">{{ diaSeleccionado?.dia || '' }}</span>
            <span class="timeline-mes">{{ diaSeleccionado?.mesNombre || '' }}</span>
          </div>
          <div class="timeline-badge" v-if="actividadesDelDia.length > 0">
            {{ actividadesDelDia.length }} actividad{{ actividadesDelDia.length > 1 ? 'es' : '' }}
          </div>
        </div>

        <!-- Contenido de la línea de tiempo -->
        <div class="timeline-contenido">
          <!-- Estado vacío -->
          <div v-if="actividadesDelDia.length === 0" class="timeline-vacio">
            <div class="vacio-icono">📅</div>
            <p class="vacio-titulo">No hay actividades</p>
            <p class="vacio-subtitulo">Selecciona un día con sesión en el calendario</p>
          </div>

          <!-- Línea de tiempo con actividades -->
          <div v-else class="timeline-lista">
            <!-- Línea vertical -->
            <div class="timeline-linea"></div>

            <!-- Actividades -->
            <div
              v-for="(actividad, index) in actividadesDelDia"
              :key="index"
              class="timeline-item"
              :class="{ 'item-actual': actividad.esSesionActual }"
            >
              <!-- Punto en la línea -->
              <div class="timeline-punto" :class="{ 'punto-actual': actividad.esSesionActual }">
                <div class="punto-interior" :class="{ 'punto-interior-actual': actividad.esSesionActual }"></div>
              </div>

              <!-- Card de actividad -->
              <div class="timeline-card" :class="{ 'card-actual': actividad.esSesionActual }">
                <div class="card-header">
                  <div class="card-tiempo">
                    <svg class="card-icon-tiempo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ actividad.hora || '--:--' }}</span>
                  </div>
                  <div class="card-tags">
                    <span 
                      class="card-tag"
                      :style="{
                        backgroundColor: getTipoColor(actividad.tipo).bg,
                        color: getTipoColor(actividad.tipo).text
                      }"
                    >
                      {{ actividad.tipoLabel || 'Actividad' }}
                    </span>
                    <span 
                      v-if="actividad.esSesionActual"
                      class="card-tag-actual"
                    >
                      ● ACTUAL
                    </span>
                  </div>
                </div>
                
                <h5 class="card-titulo">
                  {{ actividad.titulo }}
                </h5>
                
                <p v-if="actividad.descripcion" class="card-descripcion">
                  {{ actividad.descripcion }}
                </p>
                
                <div v-if="actividad.detalles && actividad.detalles.length > 0" class="card-detalles">
                  <div 
                    v-for="(detalle, idx) in actividad.detalles" 
                    :key="idx" 
                    class="card-detalle"
                  >
                    <span class="detalle-bullet">•</span>
                    <span>{{ detalle }}</span>
                  </div>
                </div>

                <!-- Estado -->
                <div class="card-footer">
                  <span 
                    class="card-estado"
                    :class="{
                      'estado-completado': actividad.estado === 'completado',
                      'estado-en-curso': actividad.estado === 'en_curso',
                      'estado-pendiente': actividad.estado === 'pendiente'
                    }"
                  >
                    <span class="estado-dot"></span>
                    {{ actividad.estadoLabel || actividad.estado || 'Pendiente' }}
                  </span>
                  
                  <!-- Botón de detalles (simulado) -->
                  <button 
                    v-if="actividad.tipo === 'sesion'"
                    class="btn-ver-detalle"
                    @click="verDetalleSesion(actividad)"
                  >
                    Ver detalles
                    <svg class="btn-icon-detalle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// ========================================== //
// PROPS
// ========================================== //
const props = defineProps({
  fechasSesiones: {
    type: Array,
    default: () => []
  },
  actividades: {
    type: Array,
    default: () => []
  }
})

// ========================================== //
// EMITS
// ========================================== //
const emit = defineEmits(['verDetalleSesion'])

// ========================================== //
// ESTADO
// ========================================== //
const mesActual = ref(new Date().getMonth())
const añoActual = ref(new Date().getFullYear())
const diaSeleccionado = ref(null)

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const diasSemanaCompleto = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// ========================================== //
// COMPUTED
// ========================================== //
const nombreMes = computed(() => meses[mesActual.value])

const hoy = computed(() => {
  const ahora = new Date()
  return {
    dia: ahora.getDate(),
    mes: ahora.getMonth(),
    año: ahora.getFullYear(),
    fechaStr: ahora.toISOString().split('T')[0]
  }
})

const totalEventosMes = computed(() => {
  return diasDelMes.value.filter(d => d.tieneEvento && d.esMesActual).length
})

const diasDelMes = computed(() => {
  const año = añoActual.value
  const mes = mesActual.value
  
  const primerDia = new Date(año, mes, 1).getDay()
  const diasEnMes = new Date(año, mes + 1, 0).getDate()
  const diasEnMesAnterior = new Date(año, mes, 0).getDate()
  const diasAnteriores = primerDia === 0 ? 6 : primerDia - 1
  
  const resultado = []
  
  // Días del mes anterior
  for (let i = diasAnteriores - 1; i >= 0; i--) {
    const diaNum = diasEnMesAnterior - i
    const fecha = new Date(año, mes - 1, diaNum)
    resultado.push({
      dia: diaNum,
      esMesActual: false,
      fecha: fecha,
      fechaStr: fecha.toISOString().split('T')[0],
      tieneEvento: false,
      esSeleccionado: false,
      esHoy: false
    })
  }
  
  // Días del mes actual
  for (let i = 1; i <= diasEnMes; i++) {
    const fecha = new Date(año, mes, i)
    const fechaStr = fecha.toISOString().split('T')[0]
    const tieneEvento = props.fechasSesiones.some(f => f.fecha === fechaStr)
    const esHoy = fechaStr === hoy.value.fechaStr
    
    resultado.push({
      dia: i,
      esMesActual: true,
      fecha: fecha,
      fechaStr: fechaStr,
      tieneEvento: tieneEvento,
      esSeleccionado: diaSeleccionado.value && 
                      diaSeleccionado.value.dia === i && 
                      diaSeleccionado.value.mes === mes && 
                      diaSeleccionado.value.año === año,
      esHoy: esHoy
    })
  }
  
  // Días del mes siguiente
  const totalActual = resultado.length
  const diasFaltantes = 42 - totalActual
  
  for (let i = 1; i <= diasFaltantes; i++) {
    const fecha = new Date(año, mes + 1, i)
    resultado.push({
      dia: i,
      esMesActual: false,
      fecha: fecha,
      fechaStr: fecha.toISOString().split('T')[0],
      tieneEvento: false,
      esSeleccionado: false,
      esHoy: false
    })
  }
  
  return resultado
})

const actividadesDelDia = computed(() => {
  if (!diaSeleccionado.value) return []
  
  const fechaSeleccionada = new Date(
    diaSeleccionado.value.año,
    diaSeleccionado.value.mes,
    diaSeleccionado.value.dia
  )
  const fechaStr = fechaSeleccionada.toISOString().split('T')[0]
  
  const sesiones = props.fechasSesiones
    .filter(f => f.fecha === fechaStr)
    .map(f => ({
      titulo: f.titulo || 'Sesión del Senado',
      descripcion: f.descripcion || '',
      hora: f.hora || '09:00',
      tipo: 'sesion',
      tipoLabel: 'Sesión',
      estado: f.estado || 'pendiente',
      estadoLabel: f.estadoLabel || 'Pendiente',
      detalles: f.detalles || [],
      esSesionActual: f.esSesionActual || false,
      location: f.location || '',
      modality: f.modality || ''
    }))
  
  const otrasActividades = props.actividades
    .filter(a => a.fecha === fechaStr)
    .map(a => ({
      titulo: a.titulo,
      descripcion: a.descripcion || '',
      hora: a.hora || '10:00',
      tipo: a.tipo || 'evento',
      tipoLabel: a.tipoLabel || 'Evento',
      estado: a.estado || 'pendiente',
      estadoLabel: a.estadoLabel || 'Pendiente',
      detalles: a.detalles || [],
      esSesionActual: false,
      location: a.location || '',
      modality: a.modality || ''
    }))
  
  return [...sesiones, ...otrasActividades].sort((a, b) => {
    if (a.hora < b.hora) return -1
    if (a.hora > b.hora) return 1
    return 0
  })
})

// ========================================== //
// MÉTODOS
// ========================================== //
const cambiarMes = (delta) => {
  const nuevaFecha = new Date(añoActual.value, mesActual.value + delta, 1)
  mesActual.value = nuevaFecha.getMonth()
  añoActual.value = nuevaFecha.getFullYear()
  seleccionarDiaMasCercanoConEvento()
}

const seleccionarDia = (dia) => {
  if (!dia.esMesActual) return
  
  const fecha = dia.fecha
  const diaSemana = diasSemanaCompleto[fecha.getDay()]
  const mesNombre = meses[fecha.getMonth()]
  
  diaSeleccionado.value = {
    dia: dia.dia,
    mes: mesActual.value,
    año: añoActual.value,
    fecha: dia.fecha,
    fechaStr: dia.fechaStr,
    diaSemana: diaSemana,
    mesNombre: mesNombre,
    fechaFormateada: dia.fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
}

const seleccionarDiaMasCercanoConEvento = () => {
  const diasConEvento = diasDelMes.value.filter(d => d.tieneEvento && d.esMesActual)
  
  if (diasConEvento.length === 0) {
    buscarEventoEnMesesCercanos()
    return
  }
  
  const hoyDate = new Date()
  let diaSeleccionadoEncontrado = null
  let distanciaMinima = Infinity
  
  for (const dia of diasConEvento) {
    const fechaDia = new Date(dia.fechaStr)
    const diffTime = fechaDia.getTime() - hoyDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays >= 0 && diffDays < distanciaMinima) {
      distanciaMinima = diffDays
      diaSeleccionadoEncontrado = dia
    }
  }
  
  if (!diaSeleccionadoEncontrado && diasConEvento.length > 0) {
    const ordenados = [...diasConEvento].sort((a, b) => {
      return new Date(b.fechaStr) - new Date(a.fechaStr)
    })
    diaSeleccionadoEncontrado = ordenados[0]
  }
  
  if (diaSeleccionadoEncontrado) {
    seleccionarDia(diaSeleccionadoEncontrado)
  }
}

const buscarEventoEnMesesCercanos = () => {
  const mesSiguiente = mesActual.value + 1
  const añoSiguiente = mesSiguiente > 11 ? añoActual.value + 1 : añoActual.value
  const mesReal = mesSiguiente > 11 ? 0 : mesSiguiente
  
  const fechaInicio = new Date(añoSiguiente, mesReal, 1)
  const fechaFin = new Date(añoSiguiente, mesReal + 1, 0)
  
  for (const sesion of props.fechasSesiones) {
    const fechaSesion = new Date(sesion.fecha)
    if (fechaSesion >= fechaInicio && fechaSesion <= fechaFin) {
      mesActual.value = mesReal
      añoActual.value = añoSiguiente
      seleccionarDiaMasCercanoConEvento()
      return
    }
  }
  
  if (props.fechasSesiones.length > 0) {
    const primeraSesion = props.fechasSesiones[0]
    const fecha = new Date(primeraSesion.fecha)
    mesActual.value = fecha.getMonth()
    añoActual.value = fecha.getFullYear()
    seleccionarDiaMasCercanoConEvento()
  }
}

const getTipoColor = (tipo) => {
  const colores = {
    sesion: { bg: '#dcfce7', text: '#166534' },
    comision: { bg: '#dbeafe', text: '#1e40af' },
    evento: { bg: '#fef3c7', text: '#92400e' },
    default: { bg: '#f3f4f6', text: '#374151' }
  }
  return colores[tipo] || colores.default
}

const verDetalleSesion = (actividad) => {
  emit('verDetalleSesion', actividad)
}

// ========================================== //
// WATCHERS
// ========================================== //
watch(() => props.fechasSesiones, () => {
  seleccionarDiaMasCercanoConEvento()
}, { deep: true, immediate: true })

// ========================================== //
// LIFECYCLE
// ========================================== //
onMounted(() => {
  seleccionarDiaMasCercanoConEvento()
})
</script>

<style scoped>
/* ========================================== */
/* CONTENEDOR PRINCIPAL                       */
/* ========================================== */
.calendario-moderno {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid rgba(97, 23, 23, 0.08);
}

.calendario-grid {
  display: grid;
  grid-template-columns: 42% 58%;
  gap: 0;
  min-height: 600px;
}

/* ========================================== */
/* PANEL IZQUIERDO - CALENDARIO              */
/* ========================================== */
.calendario-panel {
  padding: 2rem 2rem 1.8rem;
  background: linear-gradient(180deg, #fdfcf9 0%, #f9f7ee 100%);
  border-right: 1px solid rgba(97, 23, 23, 0.08);
}

/* Header */
.calendario-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.btn-nav {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: 1px solid rgba(97, 23, 23, 0.15);
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #611717;
}

.btn-nav:hover {
  background: #611717;
  border-color: #611717;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(97, 23, 23, 0.3);
}

.btn-nav:hover .icon-nav {
  stroke: white;
}

.icon-nav {
  width: 1.4rem;
  height: 1.4rem;
  stroke: #611717;
  transition: stroke 0.3s ease;
}

.mes-titulo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.mes-nombre {
  font-size: 1.35rem;
  font-weight: 700;
  color: #611717;
  letter-spacing: 0.5px;
}

.mes-año {
  font-size: 1.1rem;
  font-weight: 400;
  color: #8f8f8f;
}

/* Días de la semana */
.dias-semana {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.dia-semana {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #8f8f8f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5rem 0;
}

/* Grid de días */
.grid-dias {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
}

.dia-item {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.85rem;
  font-weight: 500;
  user-select: none;
}

.dia-otro-mes {
  color: #d1d5db;
  cursor: default;
}

.dia-otro-mes:hover {
  background: transparent !important;
}

.dia-actual {
  color: #1f2937;
}

.dia-actual:hover {
  background: rgba(97, 23, 23, 0.06);
  transform: scale(1.05);
}

.dia-con-evento {
  color: #611717;
  font-weight: 600;
  border: 2px solid #E03636;
}

.dia-con-evento:hover {
  background: rgba(224, 54, 54, 0.08);
  transform: scale(1.05);
  box-shadow: 0 2px 10px rgba(224, 54, 54, 0.2);
}

.dia-seleccionado {
  background: #611717;
  color: white !important;
  font-weight: 700;
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(97, 23, 23, 0.4);
}

.dia-seleccionado:hover {
  background: #3a060d;
  transform: scale(1.08);
}

.dia-hoy {
  font-weight: 700;
  color: #611717;
}

.dia-numero {
  position: relative;
  z-index: 2;
}

/* Indicadores */
.evento-indicador {
  position: absolute;
  bottom: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background: #E03636;
  border-radius: 50%;
  z-index: 1;
}

.evento-indicador-seleccionado {
  position: absolute;
  bottom: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.hoy-indicador {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  width: 0.45rem;
  height: 0.45rem;
  background: #611717;
  border-radius: 50%;
  z-index: 1;
}

.dia-seleccionado .hoy-indicador {
  background: white;
}

/* Leyenda */
.leyenda {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(97, 23, 23, 0.08);
  flex-wrap: wrap;
}

.leyenda-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.leyenda-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-evento {
  background: #E03636;
  border: 1px solid #E03636;
}

.dot-seleccionado {
  background: #611717;
}

.dot-hoy {
  background: #611717;
  width: 0.5rem;
  height: 0.5rem;
  border: 2px solid #611717;
  box-shadow: 0 0 0 2px white, 0 0 0 3px #611717;
}

.leyenda-texto {
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 500;
}

/* Resumen del mes */
.resumen-mes {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: rgba(97, 23, 23, 0.06);
  border-radius: 0.6rem;
}

.resumen-icon {
  font-size: 0.9rem;
}

.resumen-texto {
  font-size: 0.75rem;
  color: #611717;
  font-weight: 500;
}

/* ========================================== */
/* PANEL DERECHO - LÍNEA DE TIEMPO           */
/* ========================================== */
.timeline-panel {
  padding: 2rem 2rem 1.8rem;
  background: white;
  display: flex;
  flex-direction: column;
}

/* Encabezado del timeline */
.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(97, 23, 23, 0.06);
}

.timeline-fecha {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.timeline-dia-semana {
  font-size: 0.7rem;
  font-weight: 600;
  color: #8f8f8f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-dia-numero {
  font-size: 2rem;
  font-weight: 700;
  color: #611717;
  line-height: 1;
}

.timeline-mes {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.timeline-badge {
  background: #611717;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.7rem;
  font-weight: 600;
}

/* Contenido del timeline */
.timeline-contenido {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.3rem;
  max-height: 450px;
}

.timeline-contenido::-webkit-scrollbar {
  width: 4px;
}

.timeline-contenido::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 10px;
}

.timeline-contenido::-webkit-scrollbar-thumb {
  background: #611717;
  border-radius: 10px;
}

/* Estado vacío */
.timeline-vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  color: #9ca3af;
}

.vacio-icono {
  font-size: 3.5rem;
  margin-bottom: 0.8rem;
}

.vacio-titulo {
  font-size: 1rem;
  font-weight: 600;
  color: #6b7280;
}

.vacio-subtitulo {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 0.3rem;
}

/* Línea de tiempo */
.timeline-lista {
  position: relative;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-linea {
  position: absolute;
  left: 0.6rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: linear-gradient(180deg, #611717 0%, rgba(97, 23, 23, 0.2) 100%);
  border-radius: 2px;
}

/* Item del timeline */
.timeline-item {
  position: relative;
  padding-left: 1.5rem;
}

.timeline-punto {
  position: absolute;
  left: -2.5rem;
  top: 0.25rem;
  width: 1.2rem;
  height: 1.2rem;
  background: white;
  border: 2px solid #611717;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.punto-interior {
  width: 0.5rem;
  height: 0.5rem;
  background: #611717;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.punto-actual {
  border-color: #E03636;
  box-shadow: 0 0 0 4px rgba(224, 54, 54, 0.15);
  animation: pulse-punto 2s ease-in-out infinite;
}

.punto-interior-actual {
  background: #E03636;
}

@keyframes pulse-punto {
  0%, 100% { box-shadow: 0 0 0 4px rgba(224, 54, 54, 0.15); }
  50% { box-shadow: 0 0 0 8px rgba(224, 54, 54, 0.05); }
}

/* Card de actividad */
.timeline-card {
  background: #f9fafb;
  border-radius: 0.8rem;
  padding: 1.2rem 1.2rem 1rem;
  border: 1px solid rgba(97, 23, 23, 0.06);
  transition: all 0.3s ease;
}

.timeline-card:hover {
  background: white;
  border-color: rgba(97, 23, 23, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transform: translateX(4px);
}

.card-actual {
  background: linear-gradient(135deg, #fdf2f2 0%, #fef9f9 100%);
  border-color: #E03636;
  border-left: 3px solid #E03636;
}

.card-actual:hover {
  border-color: #E03636;
  box-shadow: 0 4px 20px rgba(224, 54, 54, 0.1);
}

/* Card header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-tiempo {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #611717;
}

.card-icon-tiempo {
  width: 0.9rem;
  height: 0.9rem;
  stroke: #611717;
}

.card-tags {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.card-tag {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.15rem 0.6rem;
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.card-tag-actual {
  font-size: 0.55rem;
  font-weight: 700;
  color: #E03636;
  background: rgba(224, 54, 54, 0.1);
  padding: 0.1rem 0.5rem;
  border-radius: 2rem;
  animation: pulse-text 1.5s ease-in-out infinite;
}

@keyframes pulse-text {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Card título */
.card-titulo {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.3rem 0;
  line-height: 1.3;
}

.card-descripcion {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0.2rem 0 0.4rem 0;
  line-height: 1.5;
}

/* Card detalles */
.card-detalles {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin: 0.4rem 0 0.5rem 0;
  padding: 0.5rem 0.8rem;
  background: rgba(97, 23, 23, 0.04);
  border-radius: 0.4rem;
}

.card-detalle {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #4b5563;
}

.detalle-bullet {
  color: #611717;
  font-weight: 700;
}

/* Card footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(97, 23, 23, 0.06);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-estado {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem 0.2rem 0.4rem;
  border-radius: 2rem;
}

.estado-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
}

.estado-completado {
  color: #16a34a;
  background: #dcfce7;
}
.estado-completado .estado-dot {
  background: #16a34a;
}

.estado-en-curso {
  color: #ca8a04;
  background: #fef3c7;
}
.estado-en-curso .estado-dot {
  background: #ca8a04;
}

.estado-pendiente {
  color: #6b7280;
  background: #f3f4f6;
}
.estado-pendiente .estado-dot {
  background: #6b7280;
}

.btn-ver-detalle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: #611717;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  transition: all 0.3s ease;
}

.btn-ver-detalle:hover {
  background: rgba(97, 23, 23, 0.08);
}

.btn-icon-detalle {
  width: 0.8rem;
  height: 0.8rem;
  stroke: #611717;
  transition: transform 0.3s ease;
}

.btn-ver-detalle:hover .btn-icon-detalle {
  transform: translateX(3px);
}

/* ========================================== */
/* RESPONSIVE                                 */
/* ========================================== */
@media (max-width: 1024px) {
  .calendario-grid {
    grid-template-columns: 1fr;
  }
  
  .calendario-panel {
    border-right: none;
    border-bottom: 1px solid rgba(97, 23, 23, 0.08);
  }
  
  .timeline-panel {
    min-height: 350px;
  }
}

@media (max-width: 640px) {
  .calendario-panel,
  .timeline-panel {
    padding: 1.2rem;
  }
  
  .mes-nombre {
    font-size: 1.1rem;
  }
  
  .dia-item {
    font-size: 0.75rem;
  }
  
  .timeline-dia-numero {
    font-size: 1.5rem;
  }
  
  .timeline-item {
    padding-left: 1rem;
  }
  
  .timeline-lista {
    padding-left: 2rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>