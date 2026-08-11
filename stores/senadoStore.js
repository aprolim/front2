// stores/senadoStore.js
import { defineStore } from 'pinia'

export const useSenadoStore = defineStore('senado', {
  state: () => ({
    tipoVisualizacion: 'titulares', // 'titulares' | 'suplentes'
    filtroPartido: null,
    scrollPosicion: 0
  }),
  
  actions: {
    setTipoVisualizacion(tipo) {
      this.tipoVisualizacion = tipo
    },
    
    setFiltroPartido(filtro) {
      this.filtroPartido = filtro
    },
    
    toggleFiltroPartido(nombrePartido) {
      if (this.filtroPartido === nombrePartido) {
        this.filtroPartido = null
      } else {
        this.filtroPartido = nombrePartido
      }
    },
    
    guardarScrollPosicion() {
      if (process.client) {
        this.scrollPosicion = window.scrollY
      }
    },
    
    restaurarScrollPosicion() {
      if (process.client && this.scrollPosicion > 0) {
        setTimeout(() => {
          window.scrollTo({
            top: this.scrollPosicion,
            behavior: 'smooth'
          })
        }, 300)
      }
    },
    
    reset() {
      this.tipoVisualizacion = 'titulares'
      this.filtroPartido = null
      this.scrollPosicion = 0
    }
  },
  
  persist: true // Si usas persistencia
})