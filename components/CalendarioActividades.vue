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

        <!-- Resumen del mes -->
        <div class="resumen-mes" v-if="totalEventosMes > 0">
          <span class="resumen-icon">📋</span>
          <span class="resumen-texto">{{ totalEventosMes }} sesión{{ totalEventosMes > 1 ? 'es' : '' }} este mes</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- DERECHA: VIDEO YOUTUBE + PDF / IMAGEN      -->
      <!-- ========================================== -->
      <div class="timeline-panel">
        <!-- Encabezado del día -->
        <div class="timeline-header">
          <div class="timeline-fecha">
            <span class="timeline-dia-semana">{{ diaSeleccionado?.diaSemana || 'Selecciona' }}</span>
            <span class="timeline-dia-numero">{{ diaSeleccionado?.dia || '' }}</span>
            <span class="timeline-mes">{{ diaSeleccionado?.mesNombre || '' }}</span>
          </div>
          <!-- 🟢 Badge dinámico: en vivo o título de sesión -->
          <div
            class="timeline-badge"
            :class="{ 'badge-live': isLive }"
            v-if="isLive || sesionSeleccionada"
          >
            <span v-if="isLive" class="live-dot"></span>
            {{ isLive ? 'EN VIVO' : sesionSeleccionada.titulo }}
          </div>
        </div>

        <!-- Contenido -->
        <div class="timeline-contenido">
          <!-- 🟢 PRIORIDAD 1: SI HAY TRANSMISIÓN EN VIVO -->
          <div v-if="isLive" class="youtube-section live-section">
            <div class="section-titulo">
              <span>🔴 Transmisión en Vivo</span>
            </div>
            <div class="youtube-container live-container">
              <iframe
                :src="`https://www.youtube.com/embed/${liveYoutubeId}?autoplay=1&rel=0`"
                class="youtube-iframe"
                title="Transmisión en vivo del Senado"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <!-- 🟢 PRIORIDAD 2: COMPORTAMIENTO NORMAL (SIN LIVE) -->
          <template v-else>
            <!-- Estado vacío -->
            <div v-if="!sesionSeleccionada" class="timeline-vacio">
              <p class="vacio-titulo">No hay sesión en esta fecha</p>
              <p class="vacio-subtitulo">Selecciona un día con sesión en el calendario</p>
            </div>

            <!-- Contenido de la sesión -->
            <div v-else class="sesion-contenido">

              <!-- ========================================== -->
              <!-- VISTA CON YOUTUBE (Sesiones normales)      -->
              <!-- ========================================== -->
              <template v-if="sesionSeleccionada.youtubeUrl">
                <!-- YOUTUBE (ARRIBA) -->
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

                <!-- PDF SIMPLE (ABAJO) -->
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
              </template>

              <!-- ========================================== -->
              <!-- VISTA CON IMAGEN (6 de Noviembre)          -->
              <!-- ========================================== -->
              <template v-else>
                <div class="imagen-section">
                  <div class="section-titulo">
                    <span>Imagen de la sesión</span>
                  </div>

                  <!-- Tarjeta clickeable para abrir el modal -->
                  <div
                    class="imagen-card"
                    @click="abrirModalImagen(sesionSeleccionada.pdfUrl)"
                  >
                    <div class="imagen-preview">
                      <img
                        :src="sesionSeleccionada.pdfUrl"
                        alt="Previsualización de la sesión"
                      />
                      <div class="imagen-overlay">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span>Ampliar imagen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL / LIGHTBOX PARA IMAGEN               -->
    <!-- ========================================== -->
    <div
      v-if="modalImagenAbierto"
      class="modal-imagen-overlay"
      @click="cerrarModalImagen"
    >
      <button class="modal-cerrar" @click.stop="cerrarModalImagen" aria-label="Cerrar imagen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        :src="imagenModalActual"
        alt="Imagen de la sesión en grande"
        class="modal-imagen"
        @click.stop
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'

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
// DATA MOCK: 6 SESIONES (5 con video, 1 con imagen)
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
  },
  // NUEVA SESIÓN 6 DE NOVIEMBRE (Solo imagen)
  {
    fecha: '2026-11-06',
    titulo: 'Sesión Camaral 1ª',
    hora: '15:00',
    tipo: 'sesion',
    tipoLabel: 'Sesión',
    modality: 'Salón de Sesiones',
    pdfUrl: '/sesiones/primera session.jpeg',
    youtubeUrl: ''
  }
])

// ========================================== //
// ESTADO
// ========================================== //
const mesActual = ref(new Date().getMonth())
const añoActual = ref(new Date().getFullYear())
const diaSeleccionado = ref(null)

// Estado para el Modal de Imagen
const modalImagenAbierto = ref(false)
const imagenModalActual = ref('')

// 🟢 NUEVO ESTADO: Para el modo "en vivo"
const isLive = ref(false)
const liveYoutubeId = ref('')
let liveInterval = null

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const diasSemanaCompleto = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// ========================================== //
// HELPERS: Formateo de fecha LOCAL (evita bugs de UTC)
// ========================================== //
const formatearFecha = (fecha) => {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const parsearFecha = (str) => {
  // "2026-10-14" -> Date local (no UTC)
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

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
    fechaStr: formatearFecha(ahora)
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
      fechaStr: formatearFecha(fecha),
      tieneEvento: false,
      esSeleccionado: false,
      esHoy: false
    })
  }

  // Días del mes actual
  for (let i = 1; i <= diasEnMes; i++) {
    const fecha = new Date(año, mes, i)
    const fechaStr = formatearFecha(fecha)
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
      fechaStr: formatearFecha(fecha),
      tieneEvento: false,
      esSeleccionado: false,
      esHoy: false
    })
  }

  return resultado
})

// ========================================== //
// 🟢 NUEVA FUNCIÓN: Consultar estado en vivo
// ========================================== //
const fetchLiveStatus = async () => {
  try {
    const response = await fetch('https://demoback.senado.gob.bo/api/sesiones')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    if (data.success && Array.isArray(data.data)) {
      // Buscar el video que esté EN VIVO y ACTIVO
      const liveVideo = data.data.find(v => v.isLive === true && v.isActive === true)

      if (liveVideo && liveVideo.youtubeId) {
        isLive.value = true
        liveYoutubeId.value = liveVideo.youtubeId
        console.log('🔴 Transmisión en vivo detectada:', liveVideo.title)
      } else {
        if (isLive.value) {
          console.log('⚪ Transmisión en vivo finalizada')
        }
        isLive.value = false
        liveYoutubeId.value = ''
      }
    } else {
      isLive.value = false
      liveYoutubeId.value = ''
    }
  } catch (error) {
    console.error('Error al obtener estado en vivo:', error)
    // No apagamos el live si ya estaba encendido por un fallo de red
    // (evita parpadeos). Solo lo apagamos si nunca estuvo encendido.
  }
}

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

// Métodos para el Modal de Imagen
const abrirModalImagen = (url) => {
  imagenModalActual.value = url
  modalImagenAbierto.value = true
}

const cerrarModalImagen = () => {
  modalImagenAbierto.value = false
  imagenModalActual.value = ''
}

// Selecciona el ÚLTIMO día con evento dentro del mes visible (si no hay, limpia)
const seleccionarDiaConEvento = () => {
  const dias = diasDelMes.value
  const diasConEvento = dias.filter(d => d.tieneEvento && d.esMesActual)

  if (diasConEvento.length > 0) {
    // Tomamos el último día con evento del mes
    const ultimoDiaConEvento = diasConEvento[diasConEvento.length - 1]
    seleccionarDia(ultimoDiaConEvento)
  } else {
    // Si no hay eventos en el mes, limpiamos la selección
    diaSeleccionado.value = null
  }
}

// Al cargar: seleccionar SIEMPRE el día de hoy (aunque no tenga evento)
const inicializarCalendario = () => {
  const ahora = new Date()
  const hoyStr = formatearFecha(ahora)

  // Posicionar el calendario en el mes/año actual
  mesActual.value = ahora.getMonth()
  añoActual.value = ahora.getFullYear()

  nextTick(() => {
    const dias = diasDelMes.value
    const diaHoy = dias.find(d => d.esMesActual && d.fechaStr === hoyStr)

    if (diaHoy) {
      seleccionarDia(diaHoy)
    } else {
      // Fallback: si por alguna razón no se encuentra, limpiar selección
      diaSeleccionado.value = null
    }
  })
}

// ========================================== //
// WATCHERS
// ========================================== //
watch(() => sesionesMock.value, () => {
  inicializarCalendario()
}, { deep: true })

// ========================================== //
// LIFECYCLE
// ========================================== //
onMounted(() => {
  fetchLiveStatus()          // 🟢 Primero consultamos el live
  inicializarCalendario()    // 🟢 Después inicializamos el calendario

  // 🟢 Re-consultar cada 60 s
  liveInterval = setInterval(fetchLiveStatus, 60000)
})

onUnmounted(() => {
  if (liveInterval) {
    clearInterval(liveInterval)
    liveInterval = null
  }
})
</script>

<style scoped>
/* ========================================== */
/* CONTENEDOR PRINCIPAL                       */
/* ========================================== */
.calendario-moderno {
  background: white;
  border-radius: 1.5vw;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 62.5vw; /* Equivale a 1200px en 1920px */
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
  padding: 2vw 2vw 1.8vw;
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
  margin-bottom: 1.5vw;
}

.btn-nav {
  width: 2.8vw;
  height: 2.8vw;
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
  width: 1.4vw;
  height: 1.4vw;
  stroke: #611717;
  transition: stroke 0.3s ease;
}

.mes-titulo {
  display: flex;
  align-items: baseline;
  gap: 0.5vw;
}

.mes-nombre {
  font-size: 1.35vw;
  font-weight: 700;
  color: #611717;
  letter-spacing: 0.5px;
}

.mes-año {
  font-size: 1.1vw;
  font-weight: 400;
  color: #8f8f8f;
}

.dias-semana {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3vw;
  margin-bottom: 0.5vw;
}

.dia-semana {
  text-align: center;
  font-size: 0.7vw;
  font-weight: 600;
  color: #8f8f8f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5vw 0;
}

.grid-dias {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3vw;
}

.dia-item {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6vw;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.85vw;
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
  border: 0.1vw solid #E03636;
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
  bottom: 0.25vw;
  width: 0.5vw;
  height: 0.5vw;
  background: #E03636;
  border-radius: 50%;
  z-index: 1;
}

.evento-indicador-seleccionado {
  position: absolute;
  bottom: 0.25vw;
  width: 0.5vw;
  height: 0.5vw;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.hoy-indicador {
  position: absolute;
  top: 0.2vw;
  right: 0.2vw;
  width: 0.45vw;
  height: 0.45vw;
  background: #611717;
  border-radius: 50%;
  z-index: 1;
}

.dia-seleccionado .hoy-indicador {
  background: white;
}

.resumen-mes {
  display: flex;
  align-items: center;
  gap: 0.6vw;
  margin-top: 1vw;
  padding: 0.6vw 1vw;
  background: rgba(97, 23, 23, 0.06);
  border-radius: 0.6vw;
}

.resumen-icon {
  font-size: 0.9vw;
}

.resumen-texto {
  font-size: 0.75vw;
  color: #611717;
  font-weight: 500;
}

/* ========================================== */
/* PANEL DERECHO - YOUTUBE + PDF              */
/* ========================================== */
.timeline-panel {
  padding: 2vw 2vw 1.8vw;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5vw;
  padding-bottom: 1vw;
  border-bottom: 2px solid rgba(97, 23, 23, 0.06);
  flex-shrink: 0;
  gap: 0.8vw;
  flex-wrap: wrap;
}

.timeline-fecha {
  display: flex;
  align-items: baseline;
  gap: 0.6vw;
}

.timeline-dia-semana {
  font-size: 0.7vw;
  font-weight: 600;
  color: #8f8f8f;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-dia-numero {
  font-size: 2vw;
  font-weight: 700;
  color: #611717;
  line-height: 1;
}

.timeline-mes {
  font-size: 0.9vw;
  color: #6b7280;
  font-weight: 500;
}

.timeline-badge {
  background: #611717;
  color: white;
  padding: 0.25vw 0.9vw;
  border-radius: 2vw;
  font-size: 0.7vw;
  font-weight: 600;
}

/* 🟢 Badge EN VIVO con animación */
.timeline-badge.badge-live {
  background: #dc2626;
  animation: pulse-live 2s infinite;
  display: flex;
  align-items: center;
  gap: 0.4vw;
}

.live-dot {
  display: inline-block;
  width: 0.5vw;
  height: 0.5vw;
  background: white;
  border-radius: 50%;
  animation: blink-live 1.5s infinite;
}

@keyframes pulse-live {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
  50%      { box-shadow: 0 0 10px 5px rgba(220, 38, 38, 0.4); }
}

@keyframes blink-live {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
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
  min-height: 15vw;
  color: #9ca3af;
}

.vacio-titulo {
  font-size: 1vw;
  font-weight: 600;
  color: #6b7280;
}

.vacio-subtitulo {
  font-size: 0.8vw;
  color: #9ca3af;
  margin-top: 0.3vw;
}

/* ========================================== */
/* CONTENIDO DE LA SESIÓN                     */
/* ========================================== */
.sesion-contenido {
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
  flex: 1;
  min-height: 0;
}

/* ========================================== */
/* YOUTUBE (ARRIBA)                           */
/* ========================================== */
.youtube-section {
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
  flex: 1;
  min-height: 0;
}

.section-titulo {
  display: flex;
  align-items: center;
  gap: 0.4vw;
  font-size: 0.85vw;
  font-weight: 700;
  color: #611717;
  flex-shrink: 0;
}

.youtube-container {
  width: 100%;
  flex: 1;
  min-height: 11.5vw;
  border-radius: 0.8vw;
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

/* 🟢 Sección EN VIVO */
.live-section {
  justify-content: flex-start;
}

.live-container {
  border: 2px solid #dc2626;
  box-shadow: 0 0 25px rgba(220, 38, 38, 0.35);
}

/* ========================================== */
/* PDF SIMPLE (ABAJO)                         */
/* ========================================== */
.pdf-card {
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1vw 1.2vw;
  background: #f9fafb;
  border: 0.1vw solid rgba(97, 23, 23, 0.12);
  border-radius: 0.8vw;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.pdf-card:hover {
  background: white;
  border-color: #E03636;
  box-shadow: 0 6px 20px rgba(224, 54, 54, 0.12);
  transform: translateY(-0.1vw);
}

.pdf-card-icon {
  width: 2.8vw;
  height: 2.8vw;
  border-radius: 0.6vw;
  background: #fee2e2;
  color: #b91c1c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pdf-card-icon svg {
  width: 1.5vw;
  height: 1.5vw;
}

.pdf-card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15vw;
  min-width: 0;
}

.pdf-card-nombre {
  font-size: 0.85vw;
  font-weight: 700;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pdf-card-tipo {
  font-size: 0.7vw;
  color: #6b7280;
  font-weight: 500;
}

.pdf-card-arrow {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background: rgba(97, 23, 23, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.pdf-card-arrow svg {
  width: 1vw;
  height: 1vw;
  stroke: #611717;
}

.pdf-card:hover .pdf-card-arrow {
  background: #611717;
}

.pdf-card:hover .pdf-card-arrow svg {
  stroke: white;
}

/* ========================================== */
/* NUEVA SECCIÓN: IMAGEN DE LA SESIÓN         */
/* ========================================== */
.imagen-section {
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
  flex: 1;
  min-height: 0;
  justify-content: center;
  align-items: center;
}

.imagen-card {
  width: 100%;
  max-width: 20vw; /* 380px en 1920px */
  height: 22vw; /* 420px en 1920px */
  border-radius: 0.8vw;
  overflow: hidden;
  border: 1.5px solid rgba(97, 23, 23, 0.15);
  position: relative;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.imagen-card:hover {
  border-color: #E03636;
  box-shadow: 0 6px 20px rgba(224, 54, 54, 0.15);
}

.imagen-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f9fafb;
}

.imagen-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  transition: transform 0.4s ease;
}

.imagen-card:hover .imagen-preview img {
  transform: scale(1.03);
}

.imagen-overlay {
  position: absolute;
  inset: 0;
  background: rgba(97, 23, 23, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.imagen-card:hover .imagen-overlay {
  opacity: 1;
}

.imagen-overlay svg {
  width: 2.5vw;
  height: 2.5vw;
  stroke: white;
}

.imagen-overlay span {
  font-size: 0.9vw;
  font-weight: 600;
}

/* ========================================== */
/* MODAL / LIGHTBOX PARA IMAGEN               */
/* ========================================== */
.modal-imagen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  backdrop-filter: blur(4px);
  cursor: zoom-out;
}

.modal-imagen {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 0.5vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
  animation: zoomIn 0.3s ease;
}

.modal-cerrar {
  position: absolute;
  top: 1.5vw;
  right: 1.5vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-cerrar:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-cerrar svg {
  width: 1.5vw;
  height: 1.5vw;
  stroke: white;
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ========================================== */
/* RESPONSIVE (Ajustes para evitar que se deforme) */
/* ========================================== */
@media (max-width: 1024px) {
  .calendario-moderno {
    max-width: 95vw;
    border-radius: 2vw;
  }

  .calendario-grid {
    grid-template-columns: 1fr;
  }

  .calendario-panel {
    border-right: none;
    border-bottom: 1px solid rgba(97, 23, 23, 0.08);
    padding: 4vw;
  }

  .timeline-panel {
    padding: 4vw;
    min-height: 60vw;
  }

  /* Forzar tamaños más legibles en tablet/móvil */
  .mes-nombre { font-size: 4vw; }
  .mes-año { font-size: 3.5vw; }
  .btn-nav { width: 8vw; height: 8vw; }
  .icon-nav { width: 4vw; height: 4vw; }
  .dia-semana { font-size: 2.5vw; }
  .dia-item { font-size: 2.5vw; border-radius: 1.5vw; }
  .evento-indicador, .evento-indicador-seleccionado { width: 1.5vw; height: 1.5vw; bottom: 1vw; }
  .hoy-indicador { width: 1.2vw; height: 1.2vw; top: 0.8vw; right: 0.8vw; }
  .resumen-mes { font-size: 2.5vw; border-radius: 1.5vw; }
  .resumen-texto { font-size: 2.5vw; }
  
  .timeline-dia-numero { font-size: 6vw; }
  .timeline-dia-semana, .timeline-mes { font-size: 2.5vw; }
  .timeline-badge { font-size: 2.5vw; padding: 1vw 3vw; border-radius: 4vw; }

  /* 🟢 Badge EN VIVO responsive */
  .timeline-badge.badge-live {
    gap: 1.2vw;
  }
  .live-dot {
    width: 1.5vw;
    height: 1.5vw;
  }

  .section-titulo { font-size: 3.5vw; }
  
  .youtube-container { min-height: 50vw; border-radius: 2vw; }
  .pdf-card { padding: 3vw; gap: 3vw; border-radius: 2vw; }
  .pdf-card-icon { width: 10vw; height: 10vw; border-radius: 2vw; }
  .pdf-card-icon svg { width: 5vw; height: 5vw; }
  .pdf-card-nombre { font-size: 3vw; }
  .pdf-card-tipo { font-size: 2.5vw; }
  .pdf-card-arrow { width: 6vw; height: 6vw; }
  .pdf-card-arrow svg { width: 3vw; height: 3vw; }

  .imagen-card {
    max-width: 60vw;
    height: 80vw;
    border-radius: 2vw;
  }
  .imagen-overlay svg { width: 10vw; height: 10vw; }
  .imagen-overlay span { font-size: 4vw; }
}
</style>