// utils/gestiones.js
// ============================================================
// 📅 GESTIONES LEGISLATIVAS
// ============================================================
// Fuente única de verdad de las gestiones del sitio público.
//
// El filtro se aplica sobre `createdAt` (cuándo se cargó el documento
// en el sistema), NO sobre `fechaIngreso`.
//
// Para añadir una gestión nueva basta con agregar un objeto al array.
// La última gestión siempre debe tener `hasta: null` (abierta).
//
// - `desde` / `hasta` van en ISO 8601 y se envían al backend como
//   `creadoDesde` / `creadoHasta`.
// - `hasta` es EXCLUSIVO: un documento creado justo en esa fecha
//   pertenece a la gestión siguiente.
// ============================================================

export const GESTIONES = [
  {
    id: '2025-2026',
    label: '2025-2026',
    // Todo lo cargado hasta el 18/11/2026 (incluye la carga inicial)
    desde: null,
    hasta: '2026-11-18T00:00:00.000Z'
  },
  {
    id: '2026-2027',
    label: '2026-2027',
    // Todo lo que se cargue desde el 18/11/2026 en adelante
    desde: '2026-11-18T00:00:00.000Z',
    hasta: null
  }
]

/** Gestión por defecto (la que se muestra al entrar por primera vez). */
export const GESTION_DEFAULT = GESTIONES[GESTIONES.length - 1].id

/** Devuelve la configuración de una gestión por su id. */
export const getGestion = (id) => {
  return GESTIONES.find((g) => g.id === id) || GESTIONES[GESTIONES.length - 1]
}

/** Indica si un id de gestión es válido. */
export const esGestionValida = (id) => GESTIONES.some((g) => g.id === id)
