// composables/useSenadores.js
//
// Datos de senadores servidos por el BACKEND.
//
// Antes este composable leía `~/data/senadores.js`, una copia estática en el
// frontend: los cambios hechos desde el CMS (fotos, redes, cargos…) no se
// reflejaban en los perfiles de senador.
//
// Ahora usa `usePlenoCamaral()`, que consulta
// GET /api/pleno-camaral/publico y cachea la respuesta.
//
// La interfaz pública del composable se mantiene igual, así las páginas
// `/senador/:slug` y `/senador/suplente/:slug` no necesitan cambios:
// sus `computed` se recalculan solos cuando llegan los datos.

import { computed } from 'vue'

/** Genera el slug de un nombre (misma regla que el backend). */
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

export const useSenadores = () => {
  const { estado, cargar } = usePlenoCamaral()

  // Lista reactiva (se llena cuando responde el API)
  const senadores = computed(() => estado.value.senadores)

  // ============================================
  // CARGA
  //
  // El composable debe poder llamarse en cualquier momento (incluso dentro
  // de un computed o tras cambiar de ruta), por eso NO usa onMounted ni
  // useAsyncData: esos hooks solo funcionan dentro de un setup activo y su
  // uso indebido lanzaba "Unhandled error during execution of setup function".
  //
  // `cargar()` ya es idempotente y SSR-safe por si mismo:
  //   - si ya hay datos o hay una carga en curso, no hace nada
  //   - si falla, captura el error y lo deja en `estado.error`
  // Se dispara aqui mismo, sin esperar al montaje.
  // ============================================
  const iniciarCarga = () => {
    if (estado.value.cargada || estado.value.cargando) return
    try {
      const p = cargar()
      if (p && typeof p.catch === 'function') {
        p.catch((err) => {
          console.warn('⚠️ [useSenadores] No se pudo cargar el pleno:', err?.message || err)
        })
      }
    } catch (err) {
      console.warn('⚠️ [useSenadores] Error al iniciar la carga del pleno:', err?.message || err)
    }
  }

  iniciarCarga()

  // ============================================
  // BÚSQUEDAS INTERNAS
  // ============================================
  const todos = () => senadores.value

  const getTitulares = () => todos().filter((s) => s.tipo === 'titular')
  const getSuplentes = () => todos().filter((s) => s.tipo === 'suplente')

  const getTitularById = (id) =>
    todos().find((s) => s.id === id && s.tipo === 'titular') || null

  const getSuplenteById = (id) =>
    todos().find((s) => s.id === id && s.tipo === 'suplente') || null

  /** Busca por slug exacto o, si no hay, por slug generado desde el nombre. */
  const buscarPorSlug = (slug, tipo = null) => {
    if (!slug) return null

    const universo = tipo ? todos().filter((s) => s.tipo === tipo) : todos()

    // 1) coincidencia directa con el slug guardado
    let encontrado = universo.find((s) => s.slug === slug)
    if (encontrado) return encontrado

    // 2) coincidencia con slug generado desde el nombre
    encontrado = universo.find((s) => generarSlug(s.name) === slug)
    return encontrado || null
  }

  const getSenadorBySlug = (slug) => buscarPorSlug(slug)

  const getSuplenteBySlug = (slug) => {
    const suplente = buscarPorSlug(slug, 'suplente')
    if (!suplente) return null

    const titular = todos().find(
      (s) => s.id === suplente.titularId && s.tipo === 'titular'
    )

    return {
      ...suplente,
      titularNombre: titular?.name || 'No disponible',
      titularSlug: titular?.slug || null,
      titularFoto: titular?.foto || null,
      titularParty: titular?.party || null,
      titularPartyShort: titular?.partyShort || null,
      titularPartyColor: titular?.partyColor || null,
      esSuplente: true,
      esTitular: false
    }
  }

  const getSuplenteByTitularId = (titularId) => {
    if (!titularId) return null
    return todos().find((s) => s.tipo === 'suplente' && s.titularId === titularId) || null
  }

  const getTitularBySuplenteId = (suplenteId) => {
    if (!suplenteId) return null
    const suplente = todos().find((s) => s.id === suplenteId && s.tipo === 'suplente')
    if (!suplente) return null
    return todos().find((s) => s.id === suplente.titularId && s.tipo === 'titular') || null
  }

  // Compatibilidad
  const getTodosLosSenadores = () => getTitulares()
  const getTodosLosSuplentes = () => getSuplentes()

  // ============================================
  // PROYECTOS DE LEY
  //
  // ⚠️ IMPORTANTE: `proyectosLey` NO existe en el modelo `Senador` del backend
  // ni en su seed. Solo vivía en el antiguo `~/data/senadores.js`.
  // Al migrar los datos al API, esta información desaparece y las secciones
  // que la muestran se ocultan solas (todas van con v-if).
  //
  // Si se quiere recuperar, hay que:
  //   1. añadir `proyectosLey` al modelo Senador
  //   2. exponerlo en GET /api/pleno-camaral/publico
  //   3. permitir editarlo desde el CMS
  //
  // Mientras tanto estas funciones devuelven estructuras vacías para que
  // las plantillas no fallen.
  // ============================================
  const VACIO = { cantidad: 0, lista: [] }

  const getProyectosLeyBySenadorId = (id) => {
    const senador = todos().find((s) => s.id === id)
    if (!senador) return null
    return senador.proyectosLey || VACIO
  }

  const getProyectosLeyBySlug = (slug) => {
    const senador = getSenadorBySlug(slug)
    if (!senador) return null
    return senador.proyectosLey || VACIO
  }

  const getResumenProyectosPorDepartamento = () => {
    const resumen = {}
    for (const s of getTitulares()) {
      if (!resumen[s.department]) {
        resumen[s.department] = { totalProyectos: 0, senadores: [] }
      }
      resumen[s.department].totalProyectos += s.proyectosLey?.cantidad || 0
      resumen[s.department].senadores.push({
        nombre: s.name,
        cantidad: s.proyectosLey?.cantidad || 0,
        proyectos: s.proyectosLey?.lista || []
      })
    }
    return resumen
  }

  const getRankingSenadoresPorProyectos = (limite = 10) => {
    return getTitulares()
      .filter((s) => (s.proyectosLey?.cantidad || 0) > 0)
      .sort((a, b) => (b.proyectosLey?.cantidad || 0) - (a.proyectosLey?.cantidad || 0))
      .slice(0, limite)
      .map((s) => ({
        id: s.id,
        nombre: s.name,
        department: s.department,
        party: s.party,
        partyColor: s.partyColor,
        cantidad: s.proyectosLey?.cantidad || 0,
        proyectos: s.proyectosLey?.lista || []
      }))
  }

  return {
    // Estado (útil para mostrar loads en las páginas)
    senadores,
    cargando: computed(() => {
      // Mientras no haya datos cargados se considera "cargando",
      // pero NUNCA indefinidamente: si hubo error se deja de mostrar.
      if (estado.value.cargada) return false
      if (estado.value.error) return false
      return true
    }),
    error: computed(() => estado.value.error),

    // Funciones principales (misma interfaz que antes)
    getSenadorBySlug,
    getSuplenteBySlug,
    getTodosLosSenadores,
    getTodosLosSuplentes,

    getTitulares,
    getSuplentes,
    getTitularById,
    getSuplenteById,
    getSuplenteByTitularId,
    getTitularBySuplenteId,

    getProyectosLeyBySenadorId,
    getProyectosLeyBySlug,
    getResumenProyectosPorDepartamento,
    getRankingSenadoresPorProyectos
  }
}
