<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[90%] max-w-7xl">
      
      <!-- Título -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-senado-primary">
          Visitas <span class="text-[#8f1522]">Guiadas</span>
        </h1>
        <div class="w-24 h-1 bg-[#611717] mx-auto mt-4"></div>
        <p class="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Conoce el Palacio Legislativo y la historia del Senado de Bolivia.
          Reserva tu visita guiada gratuita.
        </p>
      </div>

      <!-- ========================================== -->
      <!-- DESCRIPCIÓN DE LA VISITA                   -->
      <!-- ========================================== -->
      <div class="bg-[#f8f6f0] rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
        <p class="text-gray-700 text-center leading-relaxed">
          Las visitas guiadas al edificio legislativo tienen por objetivo generar un espacio de acercamiento al 
          <strong>Poder Legislativo</strong>, para que los visitantes conozcan dónde y cómo trabajan los 
          representantes del pueblo en la confección de las leyes que nos permiten ampliar nuestros derechos 
          y fortalecer la democracia.
        </p>
        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm text-yellow-800 flex items-center gap-2">
            <span class="text-lg">⚠️</span>
            Para la asistencia se deberá cumplir con todas las medidas de prevención del Covid-19: 
            uso correcto del tapabocas, mantener la distancia, uso de alcohol en gel, respeto de las indicaciones.
          </p>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- GRID: INFORMACIÓN + FORMULARIO             -->
      <!-- ========================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- ========================================== -->
        <!-- COLUMNA IZQUIERDA: INFORMACIÓN            -->
        <!-- ========================================== -->
        <div>
          <!-- Visitas Guiadas -->
          <div class="bg-[#f8f6f0] rounded-xl p-6 mb-6">
            <h3 class="text-lg font-bold text-senado-primary mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Visitas Guiadas
            </h3>
            <div class="space-y-4 text-gray-700">
              <div class="bg-white p-4 rounded-lg border border-gray-200">
                <h4 class="font-semibold text-senado-primary mb-2">SISTEMA DE SOLICITUD</h4>
                <p class="text-sm">
                  Para brindarles un mejor servicio, les pedimos que envíen su solicitud con 
                  <strong>15 días de anticipación</strong>, que sean puntuales en su cita y que 
                  atiendan las normas de conducta previstas en el Reglamento del Senado.
                </p>
              </div>
            </div>
          </div>

          <!-- Requisitos -->
          <div class="bg-[#f8f6f0] rounded-xl p-6 mb-6">
            <h3 class="text-lg font-bold text-senado-primary mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              REQUISITOS PARA EL INGRESO
            </h3>
            <p class="text-sm text-gray-600 mb-3">
              Las personas que ingresen al Congreso Nacional en su calidad de visitantes deben cumplir 
              con las siguientes normas:
            </p>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start gap-3">
                <span class="text-senado-primary font-bold">•</span>
                <span>Completar el <strong>Formulario de Registro</strong></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-senado-primary font-bold">•</span>
                <span>Presentar <strong>cédula de identidad</strong> el día de la visita</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-senado-primary font-bold">•</span>
                <span>Respetar las <strong>normas de conducta</strong> del Reglamento del Senado</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-senado-primary font-bold">•</span>
                <span>Uso obligatorio de <strong>tapabocas</strong> y medidas de bioseguridad</span>
              </li>
            </ul>
          </div>

          <!-- Horarios -->
          <div class="bg-[#f8f6f0] rounded-xl p-6 mb-6">
            <h3 class="text-lg font-bold text-senado-primary mb-4 flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Horarios de Visita
            </h3>
            <div class="space-y-2 text-gray-700">
              <div class="flex justify-between py-2 border-b border-gray-200">
                <span class="font-medium">Lunes a Viernes</span>
                <span>09:00 - 12:00 / 14:00 - 17:00</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Sábados y Domingos</span>
                <span class="text-gray-400">Cerrado</span>
              </div>
            </div>
          </div>


        </div>

        <!-- ========================================== -->
        <!-- COLUMNA DERECHA: FORMULARIO DE RESERVA    -->
        <!-- ========================================== -->
        <div>
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8 sticky top-8">
            <h2 class="text-2xl font-bold text-senado-primary mb-2">
              Formulario de Registro
            </h2>
            <p class="text-gray-500 text-sm mb-6">
              Completa el formulario y te confirmaremos tu visita guiada.
            </p>

            <form @submit.prevent="enviarReserva" class="space-y-5">
              <!-- Institución o Entidad -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Institución o Entidad <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.institucion"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="Ej: Colegio Nacional de Bolivia"
                />
              </div>

              <!-- Fecha de visita -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de visita <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.fecha"
                  type="date"
                  required
                  :min="fechaMinima"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                />
                <p class="text-xs text-gray-400 mt-1">Se requiere solicitud con 15 días de anticipación</p>
              </div>

              <!-- Lugar de Procedencia -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Lugar de Procedencia <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.procedencia"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="Ej: La Paz, Bolivia"
                />
              </div>

              <!-- Cantidad de visitantes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de visitantes <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.personas"
                  type="number"
                  required
                  min="1"
                  max="25"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="Ej: 10"
                />
                <p class="text-xs text-gray-400 mt-1">Máximo 25 personas por grupo</p>
              </div>

              <!-- Nombre del coordinador -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del coordinador <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.coordinador"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="Nombre completo del responsable"
                />
              </div>

              <!-- Correo electrónico -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <!-- Teléfono -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono / Celular <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.telefono"
                  type="tel"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition"
                  placeholder="Ej: 78945612"
                />
              </div>

              <!-- Mensaje adicional -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje adicional <span class="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea
                  v-model="form.mensaje"
                  rows="3"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senado-primary focus:border-senado-primary transition resize-none"
                  placeholder="Ej: Somos un grupo de estudiantes de la UMSA, nos gustaría conocer el hemiciclo..."
                ></textarea>
              </div>

              <!-- Aceptar términos -->
              <div class="flex items-start gap-3">
                <input
                  v-model="form.aceptaTerminos"
                  type="checkbox"
                  required
                  class="mt-1 w-4 h-4 text-senado-primary border-gray-300 rounded focus:ring-senado-primary"
                />
                <label class="text-sm text-gray-600">
                  Acepto las <a href="#" class="text-senado-primary hover:underline">normas de conducta</a> y 
                  <a href="#" class="text-senado-primary hover:underline">medidas de bioseguridad</a>
                  <span class="text-red-500">*</span>
                </label>
              </div>

              <!-- Botón enviar -->
              <button
                type="submit"
                :disabled="enviando"
                class="w-full py-3 bg-[#611717] text-white rounded-lg font-semibold hover:bg-[#3a060d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="enviando" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {{ enviando ? 'Enviando...' : 'Solicitar Visita' }}
              </button>
            </form>

            <!-- Mensaje de éxito -->
            <div v-if="exito" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-medium text-green-800">¡Solicitud enviada con éxito!</p>
                  <p class="text-sm text-green-700">Te contactaremos para confirmar tu visita.</p>
                </div>
              </div>
              <button 
                @click="resetearFormulario"
                class="mt-3 text-sm text-green-700 hover:text-green-900 font-medium"
              >
                → Hacer otra solicitud
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón volver -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ============================================
// ESTADO DEL FORMULARIO
// ============================================
const form = ref({
  institucion: '',
  fecha: '',
  procedencia: '',
  personas: 1,
  coordinador: '',
  email: '',
  telefono: '',
  mensaje: '',
  aceptaTerminos: false
})

const enviando = ref(false)
const exito = ref(false)

// Fecha mínima (15 días después)
const fechaMinima = computed(() => {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + 15)
  return fecha.toISOString().split('T')[0]
})

// ============================================
// ENVIAR RESERVA
// ============================================
const enviarReserva = () => {
  // Validar que todos los campos requeridos estén llenos
  if (!form.value.aceptaTerminos) {
    alert('Debes aceptar las normas de conducta y medidas de bioseguridad.')
    return
  }

  enviando.value = true
  
  // Simular envío al backend
  setTimeout(() => {
    enviando.value = false
    exito.value = true
    
    // Aquí iría la llamada a la API real:
    // const response = await fetch('/api/visitas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // })
    
    console.log('📋 Solicitud de visita enviada:', form.value)
  }, 1500)
}

const resetearFormulario = () => {
  form.value = {
    institucion: '',
    fecha: '',
    procedencia: '',
    personas: 1,
    coordinador: '',
    email: '',
    telefono: '',
    mensaje: '',
    aceptaTerminos: false
  }
  exito.value = false
}
</script>