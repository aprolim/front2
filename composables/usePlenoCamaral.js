// composables/usePlenoCamaral.js
//
// Carga el pleno (titulares + suplentes + directiva) desde el backend.
// Sustituye al antiguo `~/data/senadores.js`, que quedaba desactualizado
// cuando se editaba algo desde el CMS.
//
// El endpoint devuelve el MISMO formato que el archivo estático:
//   - titulares: id 1..36
//   - suplentes: id 37..71 (con titularId)
//   - directiva: array de 6 ids
//
// Uso:
//   const { senadores, directivaIds, cargando, error, recargar } = await usePlenoCamaral()

export const usePlenoCamaral = () => {
  const config = useRuntimeConfig()
  const API_HOST = (config.public.apiUrl || 'https://demoback.senado.gob.bo/api')
    .replace(/\/api\/?$/, '')
  const API_URL = `${API_HOST}/api/pleno-camaral/publico`

  // Cache en memoria para que hemiciclo y brigadas no pidan dos veces
  const estado = useState('pleno-camaral', () => ({
    senadores: [],
    directivaIds: [],
    cargada: false,
    cargando: false,
    error: null,
    // Marca de tiempo del ultimo intento: detecta un cargando atascado
    // y permite reintentar en lugar de bloquearse para siempre.
    _inicioCarga: 0
  }))

  /** Resuelve una ruta relativa de foto contra el backend. */
  const resolverFoto = (foto) => {
    if (!foto) return ''
    if (/^https?:\/\//i.test(foto) || foto.startsWith('data:')) return foto
    return `${API_HOST}${foto.startsWith('/') ? '' : '/'}${foto}`
  }

  /** Normaliza las fotos a URLs absolutas una sola vez al cargar. */
  const normalizar = (lista) =>
    (lista || []).map((s) => ({
      ...s,
      foto: resolverFoto(s.foto),
      fotoSuplente: resolverFoto(s.fotoSuplente)
    }))

  // ============================================
  // PRECARGA DE FOTOS
  //
  // Las fotos se muestran en tooltips y tarjetas que solo existen al hacer
  // hover/clic. Sin precarga, el navegador empieza a descargarlas en ese
  // momento y el usuario ve un hueco. Aquí se bajan en segundo plano en
  // cuanto llega la lista, así ya están en caché al interactuar.
  // ============================================
  const precargadas = useState('pleno-camaral-precarga', () => new Set())

  /**
   * Descarga las imágenes con concurrencia limitada.
   * @param {string[]} urls
   * @param {number} concurrencia
   */
  const precargar = async (urls, concurrencia = 8) => {
    const pendientes = urls.filter((u) => u && !precargadas.value.has(u))
    if (pendientes.length === 0) return

    let idx = 0

    const trabajador = async () => {
      while (idx < pendientes.length) {
        const url = pendientes[idx++]

        await new Promise((resolve) => {
          // En SSR no hay Image; se omite silenciosamente.
          if (typeof window === 'undefined') return resolve()

          const img = new Image()
          img.decoding = 'async'
          img.onload = img.onerror = () => {
            precargadas.value.add(url)
            resolve()
          }
          img.src = url
        })
      }
    }

    await Promise.all(
      Array.from({ length: Math.min(concurrencia, pendientes.length) }, trabajador)
    )

    console.log(`🖼️  [usePlenoCamaral] ${pendientes.length} imágenes precargadas`)
  }

  /** URLs de todas las fotos del pleno (titulares + suplentes). */
  const urlsFotos = () => {
    const urls = []
    for (const s of estado.value.senadores) {
      if (s.foto) urls.push(s.foto)
      if (s.fotoSuplente) urls.push(s.fotoSuplente)
    }
    return [...new Set(urls)]
  }

  const cargar = async (forzar = false) => {
    // ⚠️ `cargando` puede quedar atascado en true si el fetch se interrumpió
    // (SSR que cerró la petición, navegación, HMR…). Para no bloquear todas
    // las cargas futuras se ignora ese flag cuando el lanzamiento es antiguo
    // o cuando se fuerza la recarga.
    const ahora = Date.now()
    const atascado = estado.value.cargando && (ahora - (estado.value._inicioCarga || 0) > 20000)

    if (estado.value.cargando && !atascado && !forzar) return
    if (estado.value.cargada && !forzar && !atascado) return

    estado.value.cargando = true
    estado.value._inicioCarga = ahora
    estado.value.error = null

    // Timeout de seguridad: sin esto, una petición que nunca responde
    // dejaba el spinner bloqueado indefinidamente.
    const controlador = new AbortController()
    const temporizador = setTimeout(() => controlador.abort(), 15000)

    try {
      const res = await fetch(API_URL, { signal: controlador.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const json = await res.json()
      if (!json.success || !Array.isArray(json.data)) {
        throw new Error(json.message || 'Respuesta inválida del servidor')
      }

      estado.value.senadores = normalizar(json.data)
      estado.value.directivaIds = Array.isArray(json.directiva) ? json.directiva : []
      estado.value.cargada = true

      console.log(
        `✅ [usePlenoCamaral] ${estado.value.senadores.length} senadores | directiva: ${estado.value.directivaIds.join(',')}`
      )

      // ⚡ Precarga en segundo plano: NO bloquea el render.
      // El usuario aún está mirando el hemiciclo, así que las fotos de los
      // tooltips llegan antes de que mueva el mouse.
      precargar(urlsFotos()).catch((e) =>
        console.warn('⚠️ [usePlenoCamaral] Precarga parcial:', e?.message || e)
      )
    } catch (err) {
      const esTimeout = err?.name === 'AbortError'
      const mensaje = esTimeout
        ? 'El servidor tardó demasiado en responder (15s)'
        : (err?.message || 'Error desconocido')

      console.warn('⚠️ [usePlenoCamaral] No se pudo cargar el pleno:', mensaje)
      estado.value.error = mensaje
    } finally {
      clearTimeout(temporizador)
      estado.value.cargando = false
    }
  }

  const recargar = () => cargar(true)

  return {
    estado,
    cargar,
    recargar,
    resolverFoto,
    precargar,
    urlsFotos
  }
}
