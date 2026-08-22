<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-senado-primary mb-4">
          Comunicados Oficiales
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Información institucional y comunicados oficiales de la Cámara de Senadores
        </p>
        <div class="w-24 h-1 bg-senado-gold mx-auto mt-4"></div>
      </div>

      <!-- Filtros -->
      <div class="mb-8 flex flex-wrap gap-4 justify-between items-center">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filtro in filtros"
            :key="filtro"
            @click="filtroActivo = filtro"
            class="px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
            :class="filtroActivo === filtro 
              ? 'bg-senado-primary text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
          >
            {{ filtro }}
          </button>
        </div>
        
        <div class="flex items-center gap-4">
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar comunicados..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-senado-primary text-sm w-64"
          />
          <button
            @click="alternarVista"
            class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Icon :name="vista === 'grid' ? 'material-symbols:view-list' : 'material-symbols:grid-view'" class="text-2xl text-gray-600" />
          </button>
        </div>
      </div>

      <!-- Contador -->
      <div class="mb-4 text-sm text-gray-500">
        Mostrando {{ comunicadosFiltrados.length }} de {{ comunicados.length }} comunicados
      </div>

      <!-- Grid de comunicados -->
      <div v-if="vista === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="comunicado in comunicadosFiltrados"
          :key="comunicado.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Tipo -->
          <div class="px-6 pt-4 flex justify-between items-start">
            <span
              class="px-3 py-1 rounded-full text-xs font-semibold"
              :class="{
                'bg-red-100 text-red-700': comunicado.tipo === 'Urgente',
                'bg-yellow-100 text-yellow-700': comunicado.tipo === 'Importante',
                'bg-blue-100 text-blue-700': comunicado.tipo === 'Informativo',
                'bg-green-100 text-green-700': comunicado.tipo === 'Normal'
              }"
            >
              {{ comunicado.tipo }}
            </span>
            <span class="text-xs text-gray-400">{{ comunicado.fecha }}</span>
          </div>

          <!-- Contenido -->
          <div class="p-6 pt-2">
            <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
              {{ comunicado.titulo }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ comunicado.descripcion }}
            </p>
            
            <!-- Etiquetas -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in comunicado.tags"
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- Botones -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                @click="verDetalle(comunicado)"
                class="text-senado-primary hover:text-senado-primary-dark text-sm font-medium transition-colors"
              >
                Leer más →
              </button>
              <button
                v-if="comunicado.pdfId"
                @click="descargarPDF(comunicado)"
                class="flex items-center gap-1 text-gray-500 hover:text-senado-primary transition-colors text-sm"
              >
                <Icon name="material-symbols:file-download" class="text-lg" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista de lista -->
      <div v-else class="space-y-4">
        <div
          v-for="comunicado in comunicadosFiltrados"
          :key="comunicado.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
        >
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <span
                  class="px-2 py-0.5 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-red-100 text-red-700': comunicado.tipo === 'Urgente',
                    'bg-yellow-100 text-yellow-700': comunicado.tipo === 'Importante',
                    'bg-blue-100 text-blue-700': comunicado.tipo === 'Informativo',
                    'bg-green-100 text-green-700': comunicado.tipo === 'Normal'
                  }"
                >
                  {{ comunicado.tipo }}
                </span>
                <span class="text-xs text-gray-400">{{ comunicado.fecha }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 truncate">
                {{ comunicado.titulo }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2">
                {{ comunicado.descripcion }}
              </p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="tag in comunicado.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <button
                @click="verDetalle(comunicado)"
                class="px-4 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors text-sm"
              >
                Ver
              </button>
              <button
                v-if="comunicado.pdfId"
                @click="descargarPDF(comunicado)"
                class="p-2 text-gray-500 hover:text-senado-primary transition-colors"
              >
                <Icon name="material-symbols:file-download" class="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="comunicadosFiltrados.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center gap-2">
          <button
            @click="paginaActual > 1 && paginaActual--"
            class="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
            :disabled="paginaActual === 1"
          >
            Anterior
          </button>
          <span class="px-3 py-1 text-sm text-gray-600">
            Página {{ paginaActual }} de {{ totalPaginas }}
          </span>
          <button
            @click="paginaActual < totalPaginas && paginaActual++"
            class="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
            :disabled="paginaActual === totalPaginas"
          >
            Siguiente
          </button>
        </nav>
      </div>

      <!-- Sin resultados -->
      <div v-if="comunicadosFiltrados.length === 0" class="text-center py-12">
        <Icon name="material-symbols:search-off" class="text-6xl text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay comunicados</h3>
        <p class="text-gray-500">Intenta con otros filtros o términos de búsqueda</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComunicadosPage',
  data() {
    return {
      vista: 'grid',
      filtroActivo: 'Todos',
      busqueda: '',
      paginaActual: 1,
      itemsPorPagina: 12,
      filtros: ['Todos', 'Urgente', 'Importante', 'Informativo', 'Normal'],
      comunicados: [
        {
          id: 1,
          titulo: 'Convocatoria a Sesión Extraordinaria',
          descripcion: 'Se convoca a sesión extraordinaria para el día 25 de agosto de 2026 a las 10:00 AM. Tratamiento de proyectos de ley pendientes.',
          tipo: 'Urgente',
          fecha: '21/08/2026',
          tags: ['Sesión', 'Legislativo', 'Convocatoria'],
          pdfId: '6a85bd37bb125a0a5c58c9a5'
        },
        {
          id: 2,
          titulo: 'Nuevo Reglamento de Funcionamiento Interno',
          descripcion: 'Se aprueba el nuevo reglamento de funcionamiento interno de la Cámara de Senadores, que entrará en vigencia a partir del 1 de septiembre.',
          tipo: 'Importante',
          fecha: '20/08/2026',
          tags: ['Reglamento', 'Interno', 'Normativa'],
          pdfId: '7b96ce48cc236b1b6d69dab6'
        },
        {
          id: 3,
          titulo: 'Curso de Capacitación para Asesores',
          descripcion: 'Se dictará un curso de capacitación en técnicas legislativas para asesores de la Cámara. Inscripciones abiertas hasta el 30 de agosto.',
          tipo: 'Informativo',
          fecha: '19/08/2026',
          tags: ['Capacitación', 'Asesores', 'Formación'],
          pdfId: null
        },
        {
          id: 4,
          titulo: 'Comunicado sobre Rendición de Cuentas',
          descripcion: 'Se informa a la ciudadanía sobre el proceso de rendición de cuentas de la gestión 2025-2026. Fecha límite: 15 de septiembre.',
          tipo: 'Normal',
          fecha: '18/08/2026',
          tags: ['Rendición', 'Cuentas', 'Transparencia'],
          pdfId: '8c07df59dd347c2c7e7aebc7'
        },
        {
          id: 5,
          titulo: 'Conmemoración del Bicentenario',
          descripcion: 'La Cámara de Senadores se une a la conmemoración del Bicentenario de la Independencia con una sesión especial el 6 de agosto.',
          tipo: 'Importante',
          fecha: '05/08/2026',
          tags: ['Bicentenario', 'Independencia', 'Historia'],
          pdfId: '9d18eg60ee458d3d8f8bfcd8'
        },
        {
          id: 6,
          titulo: 'Llamado a Concurso Público',
          descripcion: 'Se convoca a concurso público para la contratación de personal administrativo. Las postulaciones estarán abiertas del 1 al 15 de septiembre.',
          tipo: 'Normal',
          fecha: '03/08/2026',
          tags: ['Concurso', 'Empleo', 'Selección'],
          pdfId: null
        },
        {
          id: 7,
          titulo: 'Modificación de la Ley N° 123',
          descripcion: 'Se presenta proyecto de ley para la modificación de la Ley N° 123 sobre regulación de servicios públicos.',
          tipo: 'Importante',
          fecha: '30/07/2026',
          tags: ['Legislación', 'Servicios', 'Públicos'],
          pdfId: '0a29fh71ff569e4e9g9gcfd9'
        },
        {
          id: 8,
          titulo: 'Suspensión de Actividades por Fumigación',
          descripcion: 'Las actividades en el edificio legislativo se suspenderán el día 25 de agosto por trabajos de fumigación y mantenimiento.',
          tipo: 'Informativo',
          fecha: '28/07/2026',
          tags: ['Fumigación', 'Mantenimiento', 'Suspensión'],
          pdfId: null
        },
        {
          id: 9,
          titulo: 'Nuevo Sistema de Gestión Documental',
          descripcion: 'Se implementa un nuevo sistema de gestión documental para mejorar la eficiencia en el manejo de expedientes.',
          tipo: 'Normal',
          fecha: '25/07/2026',
          tags: ['Tecnología', 'Gestión', 'Documentos'],
          pdfId: '1b3agi82gg670f5f0h0hdeg0'
        },
        {
          id: 10,
          titulo: 'Asueto por Día del Funcionario Público',
          descripcion: 'Se declara asueto el día 5 de agosto en conmemoración al Día del Funcionario Público.',
          tipo: 'Informativo',
          fecha: '24/07/2026',
          tags: ['Asueto', 'Funcionario', 'Público'],
          pdfId: null
        }
      ]
    }
  },
  computed: {
    comunicadosFiltrados() {
      let resultado = this.comunicados

      // Filtro por tipo
      if (this.filtroActivo !== 'Todos') {
        resultado = resultado.filter(c => c.tipo === this.filtroActivo)
      }

      // Filtro por búsqueda
      if (this.busqueda) {
        const busq = this.busqueda.toLowerCase()
        resultado = resultado.filter(c =>
          c.titulo.toLowerCase().includes(busq) ||
          c.descripcion.toLowerCase().includes(busq) ||
          c.tags.some(tag => tag.toLowerCase().includes(busq))
        )
      }

      return resultado
    },
    totalPaginas() {
      return Math.ceil(this.comunicadosFiltrados.length / this.itemsPorPagina)
    }
  },
  methods: {
    alternarVista() {
      this.vista = this.vista === 'grid' ? 'lista' : 'grid'
    },
    verDetalle(comunicado) {
      // En el futuro: this.$router.push(`/comunicados/${comunicado.id}`)
      alert(`Comunicado: ${comunicado.titulo}\n\n${comunicado.descripcion}`)
    },
    descargarPDF(comunicado) {
      if (comunicado.pdfId) {
        // Simular descarga
        alert(`Descargando PDF del comunicado: ${comunicado.titulo}`)
        // En el futuro: window.open(`https://api.senado.bo/api_rrhh/readRelease/${comunicado.pdfId}`, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>