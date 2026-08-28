// composables/useSessionData.js
import { ref, reactive } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const useSessionData = () => {
  const sessionData = ref(null)
  const formattedDate = ref('')
  const isLoading = ref(true)
  const errorMessage = ref('')
  const showModal = ref(false)
  const modalData = ref(null)
  const hasValidData = ref(false)

  const estadisticas = reactive({
    enTratamiento: 15,
    aprobados: 42,
    sancionadas: 28,
    promulgadas: 18,
    modificaciones: 7,
    rechazados: 5,
    peticionesEscrito: 0,
    peticionesOral: 0,
    peticionesInforme: 20,
    resoluciones: 0,      // 🔥 Cambiado de 45 a 0
    declaraciones: 0,     // 🔥 Cambiado de 23 a 0
    minutas: 0            // 🔥 Cambiado de 67 a 0
  })

  // ========================================== //
  // 🔥 FUNCIONES PARA OBTENER TOTALES         //
  // ========================================== //

  // Obtener total de peticiones de informe escrito
  const fetchPeticionesEscrito = async () => {
    try {
      const response = await fetch('https://apisi.senado.gob.bo/page/peticion-informe-escrito?page=1')
      if (!response.ok) {
        console.warn('Error al obtener peticiones escrito:', response.status)
        return 0
      }
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.peticionesEscrito = total
      return total
    } catch (error) {
      console.error('Error obteniendo peticiones escrito:', error)
      estadisticas.peticionesEscrito = 0
      return 0
    }
  }

  // Obtener total de peticiones de informe oral
  const fetchPeticionesOral = async () => {
    try {
      const response = await fetch('https://apisi.senado.gob.bo/page/peticion-informe-oral?page=1')
      if (!response.ok) {
        console.warn('Error al obtener peticiones oral:', response.status)
        return 0
      }
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.peticionesOral = total
      return total
    } catch (error) {
      console.error('Error obteniendo peticiones oral:', error)
      estadisticas.peticionesOral = 0
      return 0
    }
  }

  // 🔥 NUEVA: Obtener total de resoluciones camarales
  const fetchResoluciones = async () => {
    try {
      const response = await fetch('https://apisi.senado.gob.bo/page/resolucion-camarales?page=1')
      if (!response.ok) {
        console.warn('Error al obtener resoluciones:', response.status)
        return 0
      }
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.resoluciones = total
      return total
    } catch (error) {
      console.error('Error obteniendo resoluciones:', error)
      estadisticas.resoluciones = 0
      return 0
    }
  }

  // 🔥 NUEVA: Obtener total de declaraciones camarales
  const fetchDeclaraciones = async () => {
    try {
      const response = await fetch('https://apisi.senado.gob.bo/page/declaraciones-camarales?page=1')
      if (!response.ok) {
        console.warn('Error al obtener declaraciones:', response.status)
        return 0
      }
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.declaraciones = total
      return total
    } catch (error) {
      console.error('Error obteniendo declaraciones:', error)
      estadisticas.declaraciones = 0
      return 0
    }
  }

  // 🔥 NUEVA: Obtener total de minutas de comunicación
  const fetchMinutas = async () => {
    try {
      const response = await fetch('https://apisi.senado.gob.bo/page/minutas-comunicacion?page=1')
      if (!response.ok) {
        console.warn('Error al obtener minutas:', response.status)
        return 0
      }
      const data = await response.json()
      const total = data.data?.total || 0
      estadisticas.minutas = total
      return total
    } catch (error) {
      console.error('Error obteniendo minutas:', error)
      estadisticas.minutas = 0
      return 0
    }
  }

  // 🔥 Función principal para cargar todas las estadísticas
  const fetchEstadisticas = async () => {
    try {
      await Promise.all([
        fetchPeticionesEscrito(),
        fetchPeticionesOral(),
        fetchResoluciones(),    // 🔥 NUEVO
        fetchDeclaraciones(),   // 🔥 NUEVO
        fetchMinutas()          // 🔥 NUEVO
      ])
      console.log('✅ Estadísticas actualizadas:', {
        peticionesEscrito: estadisticas.peticionesEscrito,
        peticionesOral: estadisticas.peticionesOral,
        resoluciones: estadisticas.resoluciones,
        declaraciones: estadisticas.declaraciones,
        minutas: estadisticas.minutas
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    }
  }

  // ========================================== //
  // FUNCIONES EXISTENTES (sin cambios)         //
  // ========================================== //

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }
      let formatted = date.toLocaleDateString('es-ES', options)
      return formatted.replace(/\b\w/g, l => l.toUpperCase())
    } catch (error) {
      console.error('Error formateando fecha:', error)
      return dateString
    }
  }

  const formatDateShort = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }
      let formatted = date.toLocaleDateString('es-ES', options)
      return formatted.toUpperCase()
    } catch (error) {
      console.error('Error formateando fecha:', error)
      return dateString
    }
  }

  const extractNote = (description) => {
    if (!description) return null
    const noteMatch = description.match(/Nota:\s*(.*)/i)
    if (noteMatch) {
      return noteMatch[0].trim()
    }
    const modalityMatch = description.match(/modalidad\s*(presencial|virtual|mixta)/i)
    if (modalityMatch) {
      return `Nota: La sesión se desarrollará bajo la modalidad ${modalityMatch[1]}.`
    }
    return null
  }

  const parseDescription = (description) => {
    if (!description) return null
    try {
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
    } catch (error) {
      console.error('Error parseando descripción:', error)
      return null
    }
  }

  const prepareModalData = (session) => {
    if (!session) return null
    
    const agendaItems = parseDescription(session.description)
    let note = extractNote(session.description)
    
    if (!note) {
      note = `Nota: La sesión se desarrollará bajo la modalidad ${session.modality || 'presencial'}.`
    }
    
    return {
      title: session.title,
      dateFormatted: formatDate(session.date),
      dateFormattedShort: formatDateShort(session.date),
      time: session.startTime || '10:00',
      location: session.location,
      agendaItems: agendaItems || [
        'Correspondencia.',
        'Asuntos del día.',
        'Asuntos en mesa.',
        'Informes de comisiones.',
        'Asuntos varios.'
      ],
      note: note,
      modality: session.modality,
      path: session.path,
      sessionNumber: session.title.match(/(\d+)/)?.[0] || '159'
    }
  }

  const getLastApprovedSession = (data) => {
    if (!data || !Array.isArray(data)) return null
    const approvedSessions = data.filter(item => item.status_agenda === "APROBADO")
    return approvedSessions.length > 0 ? approvedSessions[approvedSessions.length - 1] : null
  }

  const fetchSessionData = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      hasValidData.value = false
      
      const response = await fetch('https://systemdemo.es/api/v1/public/sessions')
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
      }
      
      const jsonData = await response.json()
      
      if (jsonData.status !== 'Success') {
        throw new Error(`API Error: ${jsonData.message || 'Unknown error'}`)
      }
      
      const lastApproved = getLastApprovedSession(jsonData.data)
      
      if (lastApproved) {
        sessionData.value = lastApproved
        formattedDate.value = formatDate(lastApproved.date)
        modalData.value = prepareModalData(lastApproved)
        hasValidData.value = true
        console.log('✅ Última sesión aprobada:', lastApproved.title)
      } else {
        console.warn('⚠️ No se encontraron sesiones aprobadas')
        sessionData.value = null
        formattedDate.value = 'No hay sesiones aprobadas'
        modalData.value = null
        hasValidData.value = false
        errorMessage.value = 'No se encontraron sesiones aprobadas'
      }
      
    } catch (error) {
      console.error('❌ Error:', error)
      errorMessage.value = error.message
      sessionData.value = null
      formattedDate.value = 'Error al cargar datos'
      modalData.value = null
      hasValidData.value = false
    } finally {
      isLoading.value = false
    }
  }

  // ========================================== //
  // 🔥 GENERAR PDF SOLO SI HAY DATOS VÁLIDOS  //
  // ========================================== //
  const downloadPDF = async () => {
    if (!hasValidData.value || !modalData.value) {
      alert('⚠️ No hay datos disponibles para generar el PDF. Por favor, verifique la conexión a la API.')
      console.error('❌ Intento de generar PDF sin datos válidos')
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
      alert('⚠️ No hay información de sesión disponible. Por favor, recargue la página.')
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
    fetchSessionData,
    fetchEstadisticas,
    openModal,
    closeModal,
    handleKeydown,
    downloadPDF
  }
}