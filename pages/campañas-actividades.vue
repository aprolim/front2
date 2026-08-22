<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-senado-primary mb-4">
          Campañas y Actividades
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Participa en las campañas y actividades organizadas por la Cámara de Senadores
        </p>
        <div class="w-24 h-1 bg-senado-gold mx-auto mt-4"></div>
      </div>

      <!-- Categorías -->
      <div class="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          @click="categoriaActiva = categoria"
          class="px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium"
          :class="categoriaActiva === categoria 
            ? 'bg-senado-primary text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
        >
          {{ categoria }}
        </button>
      </div>

      <!-- Grid de actividades -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="actividad in actividadesFiltradas"
          :key="actividad.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          <!-- Imagen -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="actividad.imagen"
              :alt="actividad.titulo"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              @error="(e) => e.target.src = 'https://via.placeholder.com/400x300/1a3a5c/ffffff?text=Campaña'"
            />
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="{
                  'bg-green-500 text-white': actividad.estado === 'Activa',
                  'bg-yellow-500 text-white': actividad.estado === 'Próximamente',
                  'bg-gray-500 text-white': actividad.estado === 'Finalizada'
                }"
              >
                {{ actividad.estado }}
              </span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span class="text-white text-sm font-medium">
                <Icon name="material-symbols:calendar-today" class="text-lg inline mr-1" />
                {{ actividad.fecha }}
              </span>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 bg-senado-primary/10 text-senado-primary text-xs rounded-full">
                {{ actividad.categoria }}
              </span>
              <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                {{ actividad.duracion }}
              </span>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {{ actividad.titulo }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ actividad.descripcion }}
            </p>

            <!-- Lugar y participantes -->
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span class="flex items-center gap-1">
                <Icon name="material-symbols:location-on" class="text-lg" />
                {{ actividad.lugar }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="material-symbols:group" class="text-lg" />
                {{ actividad.participantes }} participantes
              </span>
            </div>

            <!-- Progreso -->
            <div v-if="actividad.progreso !== undefined" class="mb-4">
              <div class="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progreso</span>
                <span>{{ actividad.progreso }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-500"
                  :class="actividad.progreso >= 80 ? 'bg-green-500' : actividad.progreso >= 50 ? 'bg-yellow-500' : 'bg-blue-500'"
                  :style="{ width: actividad.progreso + '%' }"
                ></div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                @click="verDetalle(actividad)"
                class="flex-1 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors text-sm font-medium"
              >
                Ver detalles
              </button>
              <button
                v-if="actividad.estado === 'Activa'"
                @click="inscribirse(actividad)"
                class="py-2 px-4 border-2 border-senado-primary text-senado-primary rounded-lg hover:bg-senado-primary hover:text-white transition-colors text-sm font-medium"
              >
                Inscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-if="actividadesFiltradas.length === 0" class="text-center py-12">
        <Icon name="material-symbols:event-busy" class="text-6xl text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay actividades disponibles</h3>
        <p class="text-gray-500">Pronto publicaremos nuevas campañas y actividades</p>
      </div>
    </div>

    <!-- Modal de inscripción -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="mostrarModal = false"
    >
      <div class="bg-white rounded-xl max-w-md w-full mx-4 p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Inscribirse a la actividad</h3>
          <button @click="mostrarModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">
            ✕
          </button>
        </div>
        <p class="text-gray-600 mb-4">
          ¿Deseas inscribirte en la actividad <strong>{{ actividadSeleccionada?.titulo }}</strong>?
        </p>
        <form @submit.prevent="confirmarInscripcion">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              v-model="formulario.nombre"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-transparent"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              v-model="formulario.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-transparent"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Cargo / Área</label>
            <input
              v-model="formulario.cargo"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-transparent"
            />
          </div>
          <div class="flex gap-3">
            <button
              type="button"
              @click="mostrarModal = false"
              class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 py-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors"
            >
              Confirmar inscripción
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampanasActividadesPage',
  data() {
    return {
      categoriaActiva: 'Todas',
      mostrarModal: false,
      actividadSeleccionada: null,
      formulario: {
        nombre: '',
        email: '',
        cargo: ''
      },
      categorias: ['Todas', 'Capacitación', 'Salud', 'Cultural', 'Social', 'Deportiva', 'Conmemorativa'],
      actividades: [
        {
          id: 1,
          titulo: 'Campaña de Vacunación contra la Influenza',
          descripcion: 'Campaña de vacunación gratuita para todos los funcionarios de la Cámara de Senadores y sus familias.',
          categoria: 'Salud',
          estado: 'Activa',
          fecha: '25 de agosto de 2026',
          duracion: '2 días',
          lugar: 'Edificio Legislativo - Planta Baja',
          participantes: 156,
          progreso: 72,
          imagen: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          titulo: 'Curso de Oratoria y Comunicación Efectiva',
          descripcion: 'Taller intensivo de oratoria y comunicación efectiva para asesores y personal administrativo.',
          categoria: 'Capacitación',
          estado: 'Próximamente',
          fecha: '1 de septiembre de 2026',
          duracion: '3 semanas',
          lugar: 'Auditorio Principal',
          participantes: 45,
          progreso: 0,
          imagen: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          titulo: 'Festival Cultural por la Diversidad',
          descripcion: 'Celebración cultural con danzas, música y gastronomía típica de las diferentes regiones del país.',
          categoria: 'Cultural',
          estado: 'Activa',
          fecha: '12 de septiembre de 2026',
          duracion: '1 día',
          lugar: 'Patio Central del Legislativo',
          participantes: 320,
          progreso: 45,
          imagen: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          titulo: 'Jornada de Limpieza y Reciclaje',
          descripcion: 'Campaña de concientización sobre el cuidado del medio ambiente con jornada de limpieza y reciclaje.',
          categoria: 'Social',
          estado: 'Finalizada',
          fecha: '15 de agosto de 2026',
          duracion: '1 día',
          lugar: 'Parque Urbano Central',
          participantes: 89,
          progreso: 100,
          imagen: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop'
        },
        {
          id: 5,
          titulo: 'Torneo Deportivo Interinstitucional',
          descripcion: 'Competencia deportiva entre diferentes instituciones del Estado. Fútbol, básquet y vóley.',
          categoria: 'Deportiva',
          estado: 'Próximamente',
          fecha: '5 de octubre de 2026',
          duracion: '2 semanas',
          lugar: 'Complejo Deportivo Municipal',
          participantes: 210,
          progreso: 0,
          imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
        },
        {
          id: 6,
          titulo: 'Conmemoración del Día de la Mujer',
          descripcion: 'Evento especial de reconocimiento a las mujeres legisladoras y funcionarias de la Cámara.',
          categoria: 'Conmemorativa',
          estado: 'Finalizada',
          fecha: '8 de marzo de 2026',
          duracion: '1 día',
          lugar: 'Salón de Sesiones',
          participantes: 180,
          progreso: 100,
          imagen: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop'
        },
        {
          id: 7,
          titulo: 'Taller de Liderazgo Femenino',
          descripcion: 'Taller de desarrollo de habilidades de liderazgo para mujeres en cargos de decisión.',
          categoria: 'Capacitación',
          estado: 'Activa',
          fecha: '15 de septiembre de 2026',
          duracion: '2 días',
          lugar: 'Sala de Conferencias',
          participantes: 35,
          progreso: 28,
          imagen: 'https://images.unsplash.com/photo-1544717305-48b4a1bf2e9d?w=400&h=300&fit=crop'
        },
        {
          id: 8,
          titulo: 'Campaña de Donación de Sangre',
          descripcion: 'Campaña solidaria de donación de sangre para el hospital de la Caja Nacional de Salud.',
          categoria: 'Salud',
          estado: 'Activa',
          fecha: '28 de agosto de 2026',
          duracion: '3 días',
          lugar: 'Unidad de Bienestar Social',
          participantes: 67,
          progreso: 55,
          imagen: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop'
        },
        {
          id: 9,
          titulo: 'Encuentro de Arte y Literatura',
          descripcion: 'Feria de arte, literatura y poesía con la participación de artistas nacionales.',
          categoria: 'Cultural',
          estado: 'Próximamente',
          fecha: '20 de octubre de 2026',
          duracion: '3 días',
          lugar: 'Biblioteca Central',
          participantes: 95,
          progreso: 0,
          imagen: 'https://images.unsplash.com/photo-1471970395442-48b72c1b0e1e?w=400&h=300&fit=crop'
        }
      ]
    }
  },
  computed: {
    actividadesFiltradas() {
      if (this.categoriaActiva === 'Todas') {
        return this.actividades
      }
      return this.actividades.filter(a => a.categoria === this.categoriaActiva)
    }
  },
  methods: {
    verDetalle(actividad) {
      alert(`📋 ${actividad.titulo}\n\n📝 ${actividad.descripcion}\n\n📅 Fecha: ${actividad.fecha}\n📍 Lugar: ${actividad.lugar}\n👥 Participantes: ${actividad.participantes}`)
    },
    inscribirse(actividad) {
      this.actividadSeleccionada = actividad
      this.mostrarModal = true
      this.formulario = { nombre: '', email: '', cargo: '' }
    },
    confirmarInscripcion() {
      alert(`✅ ¡Inscripción confirmada!\n\nActividad: ${this.actividadSeleccionada.titulo}\nNombre: ${this.formulario.nombre}\nEmail: ${this.formulario.email}\n\nTe enviaremos más información a tu correo.`)
      this.mostrarModal = false
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