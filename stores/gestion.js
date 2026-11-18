// stores/gestion.js
// ============================================================
// 📅 GESTIÓN ACTIVA
// ============================================================
// Guarda la gestión legislativa que el usuario eligió en la portada
// para que se mantenga en todas las páginas de Legislación,
// Fiscalización y Gestión.
//
// Se persiste en localStorage, por lo que sobrevive a recargas,
// cierres del navegador y navegación entre secciones.
// ============================================================
import { defineStore } from 'pinia'
import { GESTIONES, GESTION_DEFAULT, getGestion, esGestionValida } from '~/utils/gestiones'

export const useGestionStore = defineStore('gestion', {
  state: () => ({
    // 🔥 Gestión seleccionada por el usuario
    activa: GESTION_DEFAULT
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
     * Cambia la gestión activa.
     * Ignora ids inválidos para no dejar el store en un estado roto.
     */
    setGestion(id) {
      if (!esGestionValida(id)) return
      this.activa = id
    },

    /** Restablece la gestión por defecto. */
    reset() {
      this.activa = GESTION_DEFAULT
    }
  },

  persist: {
    key: 'senado_gestion',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['activa']
  }
})
