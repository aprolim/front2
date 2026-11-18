// stores/gestion.js
// ============================================================
// 📅 GESTIÓN ACTIVA
// ============================================================
// Guarda la gestión legislativa que el usuario eligió en la portada
// para que se mantenga en todas las páginas de Legislación,
// Fiscalización y Gestión.
//
// La persistencia es MANUAL sobre localStorage (no usamos el plugin
// de pinia-persistedstate) para garantizar que el valor se lea de
// forma síncrona al crear el store. Así la PRIMERA petición de cada
// página ya sale con el filtro correcto, sin depender de que el
// plugin termine de hidratar.
// ============================================================
import { defineStore } from 'pinia'
import { GESTIONES, GESTION_DEFAULT, getGestion, esGestionValida } from '~/utils/gestiones'

// 🔑 Clave en localStorage
const STORAGE_KEY = 'senado_gestion'

/**
 * Lee la gestión guardada de localStorage de forma SÍNCRONA.
 * Se ejecuta en la creación del store, antes de cualquier petición.
 */
function leerGestionGuardada() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return GESTION_DEFAULT
    const id = window.localStorage.getItem(STORAGE_KEY)
    return esGestionValida(id) ? id : GESTION_DEFAULT
  } catch {
    return GESTION_DEFAULT
  }
}

/** Persiste la gestión de forma síncrona. */
function guardarGestion(id) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* ignora cuotas o modo privado */
  }
}

export const useGestionStore = defineStore('gestion', {
  state: () => ({
    // 🔥 Se lee del almacenamiento en el momento de crear el store
    activa: leerGestionGuardada()
  }),

  getters: {
    /** Lista completa de gestiones disponibles (para los botones). */
    gestiones: () => GESTIONES,

    /** Configuración de la gestión activa (label, desde, hasta). */
    config: (state) => getGestion(state.activa),

    /** Parámetros de filtro para el backend (`creadoDesde` / `creadoHasta`). */
    filtro: (state) => {
      const g = getGestion(state.activa)
      const params = {}
      if (g.desde) params.creadoDesde = g.desde
      if (g.hasta) params.creadoHasta = g.hasta
      return params
    },

    /** Etiqueta legible de la gestión activa. */
    label: (state) => getGestion(state.activa).label
  },

  actions: {
    /**
     * Cambia la gestión activa y la persiste inmediatamente.
     * Ignora ids inválidos para no dejar el store en un estado roto.
     */
    setGestion(id) {
      if (!esGestionValida(id)) return
      this.activa = id
      guardarGestion(id)
    },

    /**
     * Re-lee la gestión desde localStorage.
     * Necesario al montar en cliente porque en SSR el store se crea
     * en el servidor, donde no existe localStorage, y esa instancia
     * se reutiliza durante la hidratación.
     */
    sincronizarDesdeStorage() {
      const guardada = leerGestionGuardada()
      if (guardada !== this.activa) {
        this.activa = guardada
      }
    },

    /** Restablece la gestión por defecto y la persiste. */
    reset() {
      this.activa = GESTION_DEFAULT
      guardarGestion(GESTION_DEFAULT)
    }
  }
})
