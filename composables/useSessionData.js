// composables/useSessionData.js
import { ref, reactive, computed } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const useSessionData = () => {
  const sessionData = ref(null)
  const formattedDate = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')
  const showModal = ref(false)
  const modalData = ref(null)
  const hasValidData = ref(false)

  const API_NORMATIVA = 'https://asistente.senado.gob.bo/ciudadana-api/api/v1'
  const API_SESSIONS = 'https://systemdemo.es/api/v1/public/sessions'

  const estadisticas = reactive({
    enTratamiento: 0,
    aprobados: 0,
    sancionadas: 0,
    promulgadas: 0,
    modificaciones: 0,
    rechazados: 0,
    peticionesEscrito: 0,
    peticionesOral: 0,
    peticionesInforme: 0,
    resoluciones: 0,
    declaraciones: 0,
    minutas: 0
  })

  // ==========================================
  // 🔥 HELPER: fetch con timeout
  // ==========================================
  const fetchConTimeout = async (url, timeoutMs = 4000) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  // ==========================================
  // 🔥 FUNCIÓN PARA OBTENER DATOS DE NORMATIVA
  // ==========================================
  const fetchNormativaData = async () => {
    try {
      const response = await fetchConTimeout(`${API_NORMATIVA}/estados`, 4000)

      if (!response.ok) {
        console.warn('⚠️ API normativa no respondió bien:', response.status)
        return null
      }

      const data = await response.json()

      if (data.estados && Array.isArray(data.estados)) {
        const enTratamiento = data.estados.find(e => e.slug === 'en-tratamiento')
        const aprobados = data.estados.find(e => e.slug === 'aprobado')
        const sancionadas = data.estados.find(e => e.slug === 'sancionada')
        const promulgadas = data.estados.find(e => e.slug === 'promulgada')
        const modificaciones = data.estados.find(e => e.slug === 'devuelto')
        const rechazados = data.estados.find(e => e.slug === 'rechazada')

        estadisticas.enTratamiento = enTratamiento?.cantidad || 0
        estadisticas.aprobados = aprobados?.cantidad || 0
        estadisticas.sancionadas = sancionadas?.cantidad || 0
        estadisticas.promulgadas = promulgadas?.cantidad || 0
        estadisticas.modificaciones = modificaciones?.cantidad || 0
        estadisticas.rechazados = rechazados?.cantidad || 0
      }

      return data
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar datos de normativa:', error.message)
      return null
    }
  }

  // ==========================================
  // 🔥 COMPUTED: TODAS LAS SESIONES
  // ==========================================
  const todasLasSesiones = computed(() => {
    if (!sessionData.value) return []

    const agendaItems = obtenerOrdenDelDia(sessionData.value.description)
    const nota = obtenerNota(sessionData.value)

    return [{
      fecha: sessionData.value.date,
      titulo: sessionData.value.title,
      descripcion: sessionData.value.description,
      hora: sessionData.value.startTime,
      estado: sessionData.value.status_agenda,
      estadoLabel: sessionData.value.status_agenda === 'APROBADO' ? 'Aprobada' : 'Pendiente',
      detalles: agendaItems || [
        'Correspondencia.',
        'Asuntos del día.',
        'Asuntos en mesa.',
        'Informes de comisiones.',
        'Asuntos varios.'
      ],
      nota: nota || `Nota: La sesión se desarrollará bajo la modalidad ${sessionData.value.modality || 'presencial'}.`,
      esSesionActual: sessionData.value.date === new Date().toISOString().split('T')[0],
      modality: sessionData.value.modality,
      location: sessionData.value.location,
      path: sessionData.value.path
    }]
  })

  // ==========================================
  // FUNCIONES PARA OBTENER EL ORDEN DEL DÍA
  // ==========================================
  const obtenerOrdenDelDia = (description) => {
    if (!description) return null

    const lines = description.split('\n').map(line => line.trim()).filter(line => line)

    const orderIndex = lines.findIndex(line =>
      line.toUpperCase().includes('ORDEN DEL DÍA') ||
      line.toUpperCase().includes('ORDEN DEL DIA')
    )

    if (orderIndex === -1) return null

    const items = []
    let currentIndex = orderIndex + 1

    while (currentIndex < lines.length) {
      const line = lines[currentIndex]

      if (line.toLowerCase().includes('nota:')) break

      const match = line.match(/^(\d+)\.\s*(.*)/)
      if (match) {
        items.push(match[2] || match[0])
      } else if (line.match(/^[A-ZÁÉÍÓÚÑ]/) && items.length > 0) {
        items[items.length - 1] += ' ' + line
      } else if (line.match(/^[•\-*]\s*(.*)/)) {
        const bulletMatch = line.match(/^[•\-*]\s*(.*)/)
        if (bulletMatch) items.push(bulletMatch[1])
      }
      currentIndex++
    }

    return items.length > 0 ? items : null
  }

  const obtenerNota = (session) => {
    if (!session) return null

    if (session.description) {
      const lines = session.description.split('\n').map(line => line.trim())
      const notaLine = lines.find(line =>
        line.toLowerCase().includes('nota:') ||
        line.toLowerCase().includes('modalidad')
      )
      if (notaLine) return notaLine
    }

    return `Nota: La sesión se desarrollará bajo la modalidad ${session.modality || 'presencial'}.`
  }

  // ==========================================
  // 🔥 FETCH DE TOTALES (NO BLOQUEANTES)
  // ==========================================

  const fetchPeticionesEscrito = async () => {
    try {
      const response = await fetchConTimeout('https://apisi.senado.gob.bo/page/peticion-informe-escrito?page=1', 4000)
      if (!response.ok) return 0
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.peticionesEscrito = total
      return total
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar peticiones escrito:', error.message)
      return 0
    }
  }

  const fetchPeticionesOral = async () => {
    try {
      const response = await fetchConTimeout('https://apisi.senado.gob.bo/page/peticion-informe-oral?page=1', 4000)
      if (!response.ok) return 0
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.peticionesOral = total
      return total
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar peticiones oral:', error.message)
      return 0
    }
  }

  const fetchResoluciones = async () => {
    try {
      const response = await fetchConTimeout('https://apisi.senado.gob.bo/page/resolucion-camarales?page=1', 4000)
      if (!response.ok) return 0
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.resoluciones = total
      return total
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar resoluciones:', error.message)
      return 0
    }
  }

  const fetchDeclaraciones = async () => {
    try {
      const response = await fetchConTimeout('https://apisi.senado.gob.bo/page/declaraciones-camarales?page=1', 4000)
      if (!response.ok) return 0
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.declaraciones = total
      return total
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar declaraciones:', error.message)
      return 0
    }
  }

  const fetchMinutas = async () => {
    try {
      const response = await fetchConTimeout('https://apisi.senado.gob.bo/page/minutas-comunicacion?page=1', 4000)
      if (!response.ok) return 0
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.minutas = total
      return total
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar minutas:', error.message)
      return 0
    }
  }

  // ==========================================
  // 🔥 ESTADÍSTICAS (NO BLOQUEANTE)
  // ==========================================
  const fetchEstadisticas = async () => {
    try {
      await fetchNormativaData()

      await Promise.allSettled([
        fetchPeticionesEscrito(),
        fetchPeticionesOral(),
        fetchResoluciones(),
        fetchDeclaraciones(),
        fetchMinutas()
      ])

      estadisticas.peticionesInforme = estadisticas.peticionesEscrito + estadisticas.peticionesOral

      console.log('✅ Estadísticas cargadas:', {
        'En Tratamiento': estadisticas.enTratamiento,
        'Aprobados': estadisticas.aprobados,
        'Sancionadas': estadisticas.sancionadas,
        'Peticiones Informe': estadisticas.peticionesInforme
      })
    } catch (error) {
      console.warn('⚠️ No se pudieron cargar todas las estadísticas:', error.message)
    }
  }

  // ==========================================
  // 🔥 FUNCIONES DE FORMATEO
  // ==========================================

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString + 'T00:00:00Z')
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      }
      let formatted = date.toLocaleDateString('es-ES', options)
      return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    } catch (error) {
      console.warn('Error formateando fecha:', error)
      return dateString
    }
  }

  const formatDateShort = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString + 'T00:00:00Z')
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      }
      let formatted = date.toLocaleDateString('es-ES', options)
      return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    } catch (error) {
      console.warn('Error formateando fecha:', error)
      return dateString
    }
  }

  // ==========================================
  // 🔥 PREPARAR DATA DEL MODAL
  // ==========================================
  const prepareModalData = (session) => {
    if (!session) return null

    let agendaItems = obtenerOrdenDelDia(session.description)
    let nota = obtenerNota(session)

    if (!agendaItems) {
      agendaItems = [
        'Correspondencia.',
        'Asuntos del día.',
        'Asuntos en mesa.',
        'Informes de comisiones.',
        'Asuntos varios.'
      ]
    }

    return {
      title: session.title,
      dateFormatted: formatDate(session.date),
      dateFormattedShort: formatDateShort(session.date),
      time: session.startTime || '10:00',
      location: session.location || 'NEAL, LA PAZ',
      agendaItems: agendaItems,
      note: nota || `Nota: La sesión se desarrollará bajo la modalidad ${session.modality || 'presencial'}.`,
      modality: session.modality || 'PRESENCIAL',
      path: session.path,
      sessionNumber: session.title?.match(/(\d+)/)?.[0] || '159'
    }
  }

  const getLastApprovedSession = (data) => {
    if (!data || !Array.isArray(data)) return null
    const approvedSessions = data.filter(item => item.status_agenda === 'APROBADO')
    return approvedSessions.length > 0 ? approvedSessions[approvedSessions.length - 1] : null
  }

  // ==========================================
  // 🔥 FETCH SESSION DATA - NO BLOQUEANTE
  // ==========================================
  // Estrategia:
  // - Timeout AGRESIVO de 1.5s. Si no responde en ese tiempo, se aborta.
  // - mode: 'no-cors' → no espera respuesta CORS válida, libera el slot HTTP rápido
  // - Cualquier error se ignora silenciosamente
  // - El resto de la página sigue funcionando con estado por defecto
  const fetchSessionData = async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1500)

    try {
      console.log('📅 [Sessions] Intentando cargar sesiones...')

      const response = await fetch(API_SESSIONS, {
        signal: controller.signal,
        mode: 'no-cors',       // 🔥 no bloquea esperando CORS
        cache: 'no-store',
      })

      clearTimeout(timeoutId)

      // Con no-cors la respuesta es opaca, no podemos leerla.
      // Solo llegamos aquí si la petición se completó (raro con no-cors).
      console.log('ℹ️ [Sessions] Respuesta opaca recibida (no-cors)')
      return

    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        console.log('⏱️ [Sessions] Timeout de 1.5s alcanzado, abortado (no bloquea)')
      } else {
        console.log('ℹ️ [Sessions] No se pudo cargar (ignorado):', error.message)
      }
      // No propagamos el error, la UI sigue funcionando
    }
  }

  // ==========================================
  // GENERAR PDF
  // ==========================================
  const downloadPDF = async () => {
    if (!hasValidData.value || !modalData.value) {
      alert('⚠️ No hay datos disponibles para generar el PDF.')
      return
    }

    try {
      const container = document.createElement('div')
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 520px;
        background: white;
        padding: 30px;
        font-family: Arial, sans-serif;
        z-index: 99999;
      `

      container.innerHTML = `
        <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;padding:30px 25px 25px 25px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
          <div style="width:100%;height:8px;display:flex;border-radius:4px;overflow:hidden;margin-bottom:18px;">
            <div style="flex:1;background:#D52B1E;"></div>
            <div style="flex:1;background:#F9E300;"></div>
            <div style="flex:1;background:#007A36;"></div>
          </div>

          <img src="/logo/log2_colores.png" style="width:100px;height:auto;display:block;margin:0 auto 12px auto;" />

          <div style="font-size:20px;font-weight:700;color:#1a2b4c;text-align:center;letter-spacing:0.5px;margin-bottom:8px;">
            ${modalData.value.title || 'SESIÓN ORDINARIA'}
          </div>

          <div style="width:60px;height:3px;background:#c9a84c;margin:0 auto 16px auto;border-radius:2px;"></div>

          <div style="font-size:14px;font-weight:600;color:#1a2b4c;text-align:center;letter-spacing:1.5px;margin-bottom:14px;">
            - ORDEN DEL DÍA -
          </div>

          <div style="max-width:400px;margin:0 auto;padding:0 5px;">
            ${modalData.value.agendaItems.map((item, i) =>
              `<div style="display:flex;align-items:flex-start;gap:12px;padding:5px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#333;line-height:1.4;">
                <span style="color:#c9a84c;font-weight:700;min-width:22px;font-size:13px;">${i + 1}.</span>
                <span style="flex:1;">${item}</span>
              </div>`
            ).join('')}
          </div>

          <div style="text-align:center;font-style:italic;font-size:12.5px;color:#666;margin:14px 0 16px 0;padding:0 10px;">
            ${modalData.value.note || 'Nota: La sesión se desarrollará bajo la modalidad presencial.'}
          </div>

          <div style="text-align:center;border-top:1px solid #e0e0e0;padding-top:14px;margin-top:4px;">
            <div style="font-size:14px;font-weight:700;color:#1a2b4c;letter-spacing:0.5px;">
              ${modalData.value.dateFormattedShort || 'FECHA NO DISPONIBLE'}
            </div>
            <div style="font-size:13px;font-weight:600;color:#555;margin-top:2px;">
              HORA: ${modalData.value.time || '--:--'}
            </div>
          </div>

          <div style="text-align:center;font-size:10px;color:#aaa;letter-spacing:0.5px;border-top:1px solid #e0e0e0;padding-top:14px;margin-top:14px;">
            Dirección de Comunicación y Prensa
          </div>
        </div>
      `

      document.body.appendChild(container)

      const img = container.querySelector('img')
      if (img) {
        await new Promise((resolve) => {
          if (img.complete) {
            resolve()
          } else {
            img.onload = resolve
            img.onerror = resolve
          }
        })
      }

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 520,
        height: container.scrollHeight,
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: false
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.98)
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

      pdf.save(`ORDEN_DIA_${modalData.value.sessionNumber || 'SESION'}.pdf`)

      setTimeout(() => {
        if (container.parentNode) {
          document.body.removeChild(container)
        }
      }, 2000)

    } catch (error) {
      console.error('Error generando PDF:', error)
      alert('❌ Error al generar el PDF. Por favor, intente nuevamente.')
    }
  }

  const openModal = () => {
    if (!hasValidData.value || !modalData.value) {
      alert('⚠️ No hay información de sesión disponible.')
      return
    }
    showModal.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    showModal.value = false
    document.body.style.overflow = 'auto'
  }

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && showModal.value) {
      closeModal()
    }
  }

  return {
    sessionData,
    formattedDate,
    isLoading,
    errorMessage,
    showModal,
    modalData,
    estadisticas,
    hasValidData,
    todasLasSesiones,
    fetchSessionData,
    fetchEstadisticas,
    openModal,
    closeModal,
    handleKeydown,
    downloadPDF
  }
}