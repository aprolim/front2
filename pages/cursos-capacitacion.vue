<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-senado-primary mb-4">
          Cursos y Capacitación
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Formación continua para el desarrollo de habilidades y conocimientos
        </p>
        <div class="w-24 h-1 bg-senado-gold mx-auto mt-4"></div>
      </div>

      <!-- Filtros -->
      <div class="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          @click="filtroCategoria = categoria"
          class="px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium"
          :class="filtroCategoria === categoria 
            ? 'bg-senado-primary text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
        >
          {{ categoria }}
        </button>
        <button
          @click="filtroCategoria = 'todos'"
          class="px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium"
          :class="filtroCategoria === 'todos' 
            ? 'bg-senado-primary text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
        >
          Todos
        </button>
      </div>

      <!-- Grid de cursos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="curso in cursosFiltrados" 
          :key="curso.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Imagen -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="curso.imagen" 
              :alt="curso.titulo"
              class="w-full h-full object-cover"
              @error="(e) => e.target.src = 'https://via.placeholder.com/400x200/1a3a5c/ffffff?text=Curso'"
            />
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-senado-primary text-white text-xs font-semibold rounded-full">
                {{ curso.categoria }}
              </span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span class="text-white text-sm font-medium">
                {{ curso.duracion }}
              </span>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {{ curso.titulo }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ curso.descripcion }}
            </p>
            
            <!-- Detalles -->
            <div class="flex flex-wrap gap-3 mb-4 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ curso.horas }} horas
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                {{ curso.modalidad }}
              </span>
            </div>

            <!-- Nivel y estado -->
            <div class="flex items-center justify-between mb-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="curso.nivel === 'Básico' ? 'bg-green-100 text-green-800' :
                        curso.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'"
              >
                {{ curso.nivel }}
              </span>
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="curso.estado === 'Disponible' ? 'bg-blue-100 text-blue-800' :
                        curso.estado === 'Próximamente' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'"
              >
                {{ curso.estado }}
              </span>
            </div>

            <!-- Botón -->
            <button 
              @click="verDetalle(curso)"
              class="w-full py-2.5 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-colors duration-300 font-medium"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay cursos -->
      <div v-if="cursosFiltrados.length === 0" class="text-center py-12">
        <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay cursos disponibles</h3>
        <p class="text-gray-500">Pronto agregaremos nuevos cursos para ti</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CursosCapacitacion',
  data() {
    return {
      filtroCategoria: 'todos',
      categorias: [
        'Desarrollo Profesional',
        'Liderazgo',
        'Tecnología',
        'Comunicación',
        'Gestión Pública'
      ],
      cursos: [
        {
          id: 1,
          titulo: 'Liderazgo y Gestión de Equipos Efectivos',
          descripcion: 'Desarrolla habilidades de liderazgo para gestionar equipos de alto rendimiento en el sector público.',
          categoria: 'Liderazgo',
          nivel: 'Intermedio',
          duracion: '4 semanas',
          horas: 32,
          modalidad: 'Virtual',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=200&fit=crop'
        },
        {
          id: 2,
          titulo: 'Transformación Digital en el Sector Público',
          descripcion: 'Aprende a implementar estrategias de transformación digital para mejorar la gestión pública.',
          categoria: 'Tecnología',
          nivel: 'Avanzado',
          duracion: '6 semanas',
          horas: 48,
          modalidad: 'Mixta',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop'
        },
        {
          id: 3,
          titulo: 'Comunicación Política y Oratoria',
          descripcion: 'Domina las técnicas de comunicación política y desarrolla habilidades de oratoria efectiva.',
          categoria: 'Comunicación',
          nivel: 'Básico',
          duracion: '3 semanas',
          horas: 24,
          modalidad: 'Presencial',
          estado: 'Próximamente',
          imagen: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop'
        },
        {
          id: 4,
          titulo: 'Gestión de Proyectos Públicos',
          descripcion: 'Aprende a planificar, ejecutar y evaluar proyectos de inversión pública con metodologías ágiles.',
          categoria: 'Gestión Pública',
          nivel: 'Intermedio',
          duracion: '5 semanas',
          horas: 40,
          modalidad: 'Virtual',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop'
        },
        {
          id: 5,
          titulo: 'Inteligencia Artificial y Análisis de Datos',
          descripcion: 'Introducción a la IA y el análisis de datos para la toma de decisiones en el sector público.',
          categoria: 'Tecnología',
          nivel: 'Avanzado',
          duracion: '8 semanas',
          horas: 64,
          modalidad: 'Virtual',
          estado: 'Próximamente',
          imagen: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=200&fit=crop'
        },
        {
          id: 6,
          titulo: 'Desarrollo de Habilidades Directivas',
          descripcion: 'Fortalece tus competencias directivas para liderar con efectividad en la administración pública.',
          categoria: 'Desarrollo Profesional',
          nivel: 'Intermedio',
          duracion: '4 semanas',
          horas: 30,
          modalidad: 'Presencial',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop'
        },
        {
          id: 7,
          titulo: 'Negociación y Resolución de Conflictos',
          descripcion: 'Domina técnicas de negociación y resolución de conflictos en el ámbito institucional.',
          categoria: 'Desarrollo Profesional',
          nivel: 'Básico',
          duracion: '3 semanas',
          horas: 20,
          modalidad: 'Virtual',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=200&fit=crop'
        },
        {
          id: 8,
          titulo: 'Gestión de Recursos Públicos',
          descripcion: 'Optimiza la gestión de recursos públicos con herramientas y técnicas modernas.',
          categoria: 'Gestión Pública',
          nivel: 'Avanzado',
          duracion: '6 semanas',
          horas: 45,
          modalidad: 'Mixta',
          estado: 'Disponible',
          imagen: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=200&fit=crop'
        },
        {
          id: 9,
          titulo: 'Storytelling y Narrativa Digital',
          descripcion: 'Aprende a contar historias efectivas para comunicar mensajes institucionales.',
          categoria: 'Comunicación',
          nivel: 'Básico',
          duracion: '2 semanas',
          horas: 16,
          modalidad: 'Virtual',
          estado: 'Próximamente',
          imagen: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop'
        }
      ]
    }
  },
  computed: {
    cursosFiltrados() {
      if (this.filtroCategoria === 'todos') {
        return this.cursos
      }
      return this.cursos.filter(curso => curso.categoria === this.filtroCategoria)
    }
  },
  methods: {
    verDetalle(curso) {
      // Por ahora solo mostraremos una alerta
      // En el futuro esto redirigirá a una página de detalle
      alert(`Curso: ${curso.titulo}\nDescripción: ${curso.descripcion}\nDuración: ${curso.duracion}\nModalidad: ${curso.modalidad}`)
      
      // Cuando tengas la página de detalle:
      // this.$router.push(`/cursos-capacitacion/${curso.id}`)
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