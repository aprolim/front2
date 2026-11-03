<!-- components/CalendarioActividades.vue -->
<template>
  <div class="calendario-moderno">
    <div class="calendario-grid">
      <!-- ========================================== -->
      <!-- IZQUIERDA: CALENDARIO                      -->
      <!-- ========================================== -->
      <div class="calendario-panel">
        <!-- Header del calendario -->
        <div class="calendario-header">
          <button @click="cambiarMes(-1)" class="btn-nav" aria-label="Mes anterior">
            <svg class="icon-nav" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="mes-titulo">
            <span class="mes-nombre">{{ nombreMes }}</span>
            <span class="mes-año">{{ añoActual }}</span>
          </div>

          <button @click="cambiarMes(1)" class="btn-nav" aria-label="Mes siguiente">
            <svg class="icon-nav" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Días de la semana -->
        <div class="dias-semana">
          <div v-for="dia in diasSemana" :key="dia" class="dia-semana">
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

            <span v-if="dia.tieneEvento && !dia.esSeleccionado" class="evento-indicador"></span>
            <span v-if="dia.tieneEvento && dia.esSeleccionado" class="evento-indicador-seleccionado"></span>
            <span v-if="dia.esHoy && dia.esMesActual" class="hoy-indicador"></span>
          </div>
        </div>

        <!-- Leyenda -->
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
      <!-- DERECHA: PDF SIMPLE + VIDEO YOUTUBE        -->
      <!-- ========================================== -->
      <div class="timeline-panel">
        <!-- Encabezado del día -->
        <div class="timeline-header">
          <div class="timeline-fecha">
            <span class="timeline-dia-semana">{{ diaSeleccionado?.diaSemana || 'Selecciona' }}</span>
            <span class="timeline-dia-numero">{{ diaSeleccionado?.dia || '' }}</span>
            <span class="timeline-mes">{{ diaSeleccionado?.mesNombre || '' }}</span>
          </div>
          <div class="timeline-badge" v-if="sesionSeleccionada">
            {{ sesionSeleccionada.titulo }}
          </div>
        </div>

        <!-- Contenido -->
        <div class="timeline-contenido">
          <!-- Estado vacío -->
          <div v-if="!sesionSeleccionada" class="timeline-vacio">
            <p class="vacio-titulo">No hay sesión en esta fecha</p>
            <p class="vacio-subtitulo">Selecciona un día con sesión en el calendario</p>
          </div>

          <!-- Contenido de la sesión -->
          <div v-else class="sesion-contenido">
            <!-- ========================================== -->
            <!-- PDF SIMPLE (sin visor, solo card + enlace) -->
            <!-- ========================================== -->
            <a
              :href="sesionSeleccionada.pdfUrl"
              target="_blank"
              rel="noopener"
              class="pdf-card"
            >
              <div class="pdf-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="pdf-card-info">
                <span class="pdf-card-nombre">{{ nombreArchivoPdf(sesionSeleccionada.pdfUrl) }}</span>
                <span class="pdf-card-tipo">PDF · Clic para abrir</span>
              </div>
              <div class="pdf-card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-10 10M17 17V7H7" />
                </svg>
              </div>
            </a>

            <!-- ========================================== -->
            <!-- YOUTUBE (debajo del PDF)                    -->
            <!-- ========================================== -->
            <div class="youtube-section">
              <div class="section-titulo">
                <span>Video de la sesión</span>
              </div>
              <div class="youtube-container">
                <iframe
                  :src="sesionSeleccionada.youtubeUrl"
                  class="youtube-iframe"
                  title="Video de la sesión"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

// ========================================== //
// PROPS
// ========================================== //
const props = defineProps({
  fechasSesiones: {
    type: Array,
    default: () => []
  }
})

// ========================================== //
// DATA MOCK: 5 SESIONES CON PDF + YOUTUBE
// ========================================== //
const sesionesMock = ref([
  {
    fecha: '2026-10-14',
    titulo: 'Sesión Camaral 195ª',
    hora: '16:00',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/Sesión Camaral 195ª.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/rmUZwEqxci4'
  },
  {
    fecha: '2026-10-15',
    titulo: 'Sesión Camaral 196ª',
    hora: '10:30',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/Sesión Camaral 196ª.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/ReWQpaerzBM'
  },
  {
    fecha: '2026-10-21',
    titulo: 'Sesión Camaral 200ª',
    hora: '10:00',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/Sesión Camaral 200ª.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/uphj06Fc97U'
  },
  {
    fecha: '2026-10-22',
    titulo: 'Sesión Camaral 201ª',
    hora: '09:30',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/Sesión Camaral 201ª.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/3X5obP1_Lr8'
  },
  {
    fecha: '2026-10-29',
    titulo: 'Sesión Camaral 203ª',
    hora: '10:30',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/Sesión Camaral 203ª.pdf',
    youtubeUrl: 'https://www.youtube.com/embed/O-4ePZSd6Mk'
  }
])

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

// Sesión seleccionada = la que coincide con la fecha del día seleccionado
const sesionSeleccionada = computed(() => {
  if (!diaSeleccionado.value) return null
  return sesionesMock.value.find(s => s.fecha === diaSeleccionado.value.fechaStr) || null
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
      fecha,
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
    const tieneEvento = sesionesMock.value.some(s => s.fecha === fechaStr)
    const esHoy = fechaStr === hoy.value.fechaStr

    resultado.push({
      dia: i,
      esMesActual: true,
      fecha,
      fechaStr,
      tieneEvento,
      esSeleccionado: diaSeleccionado.value &&
        diaSeleccionado.value.dia === i &&
        diaSeleccionado.value.mes === mes &&
        diaSeleccionado.value.año === año,
      esHoy
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
      fecha,
      fechaStr: fecha.toISOString().split('T')[0],
      tieneEvento: false,
      esSeleccionado: false,
      esHoy: false
    })
  }

  return resultado
})

// ========================================== //
// MÉTODOS
// ========================================== //
const cambiarMes = (delta) => {
  const nuevaFecha = new Date(añoActual.value, mesActual.value + delta, 1)
  mesActual.value = nuevaFecha.getMonth()
  añoActual.value = nuevaFecha.getFullYear()
  seleccionarDiaConEvento()
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
    diaSemana,
    mesNombre
  }
}

// Devuelve solo el nombre del archivo desde la ruta
const nombreArchivoPdf = (url) => {
  if (!url) return 'Documento.pdf'
  const partes = url.split('/')
  return decodeURIComponent(partes[partes.length - 1] || 'Documento.pdf')
}

// Selecciona la sesión más reciente disponible
const seleccionarDiaConEvento = () => {
  if (sesionesMock.value.length > 0) {
    const sesionesOrdenadas = [...sesionesMock.value].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    )
    const sesionMasReciente = sesionesOrdenadas[0]
    if (sesionMasReciente) {
      const fechaSesion = new Date(sesionMasReciente.fecha)
      const dia = fechaSesion.getDate()
      const mes = fechaSesion.getMonth()
      const año = fechaSesion.getFullYear()

      mesActual.value = mes
      añoActual.value = año

      nextTick(() => {
        const dias = diasDelMes.value
        const diaEncontrado = dias.find(
          d => d.dia === dia && d.esMesActual && d.fechaStr === sesionMasReciente.fecha
        )
        if (diaEncontrado) {
          seleccionarDia(diaEncontrado)
        } else {
          const diaConEvento = dias.find(d => d.tieneEvento && d.esMesActual)
          if (diaConEvento) seleccionarDia(diaConEvento)
        }
      })
      return
    }
  }
}

// ========================================== //
// WATCHERS
// ========================================== //
watch(() => sesionesMock.value, () => {
  seleccionarDiaConEvento()
}, { deep: true })

// ========================================== //
// LIFECYCLE
// ========================================== //
onMounted(() => {
  seleccionarDiaConEvento()
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

/* Mismo alto para ambos paneles */
.calendario-grid {
  display: grid;
  grid-template-columns: 42% 58%;
  gap: 0;
  align-items: stretch;
}

/* ========================================== */
/* PANEL IZQUIERDO - CALENDARIO               */
/* ========================================== */
.calendario-panel {
  padding: 2rem 2rem 1.8rem;
  background: linear-gradient(180deg, #fdfcf9 0%, #f9f7ee 100%);
  border-right: 1px solid rgba(97, 23, 23, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

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
/* PANEL DERECHO - PDF SIMPLE + YOUTUBE       */
/* ========================================== */
.timeline-panel {
  padding: 2rem 2rem 1.8rem;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(97, 23, 23, 0.06);
  flex-shrink: 0;
  gap: 0.8rem;
  flex-wrap: wrap;
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
  padding: 0.25rem 0.9rem;
  border-radius: 2rem;
  font-size: 0.7rem;
  font-weight: 600;
}

/* Sin scroll: se adapta al alto del calendario */
.timeline-contenido {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.timeline-vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 300px;
  color: #9ca3af;
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

/* ========================================== */
/* CONTENIDO DE LA SESIÓN                     */
/* ========================================== */
.sesion-contenido {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;
  min-height: 0;
}

/* ========================================== */
/* PDF SIMPLE (card, sin visor)               */
/* ========================================== */
.pdf-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: #f9fafb;
  border: 1.5px solid rgba(97, 23, 23, 0.12);
  border-radius: 0.8rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.pdf-card:hover {
  background: white;
  border-color: #E03636;
  box-shadow: 0 6px 20px rgba(224, 54, 54, 0.12);
  transform: translateY(-2px);
}

.pdf-card-icon {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.6rem;
  background: #fee2e2;
  color: #b91c1c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pdf-card-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.pdf-card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.pdf-card-nombre {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pdf-card-tipo {
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 500;
}

.pdf-card-arrow {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(97, 23, 23, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.pdf-card-arrow svg {
  width: 1rem;
  height: 1rem;
  stroke: #611717;
}

.pdf-card:hover .pdf-card-arrow {
  background: #611717;
}

.pdf-card:hover .pdf-card-arrow svg {
  stroke: white;
}

/* ========================================== */
/* YOUTUBE                                    */
/* ========================================== */
.youtube-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  min-height: 0;
}

.section-titulo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #611717;
  flex-shrink: 0;
}

.section-icon {
  font-size: 1rem;
}

.youtube-container {
  width: 100%;
  flex: 1;
  min-height: 220px;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid rgba(97, 23, 23, 0.15);
  background: #000;
}

.youtube-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
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
    min-height: 400px;
  }

  .youtube-container {
    min-height: 260px;
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

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .pdf-card {
    padding: 0.8rem;
    gap: 0.7rem;
  }

  .pdf-card-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
}
</style>