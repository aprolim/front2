<template>
  <div>
    <!-- ENCABEZADO -->
    <div class="flex items-center justify-between flex-wrap gap-4 mb-4">
      <h2 class="text-2xl font-bold text-senado-primary">
        Explorador Legislativo
      </h2>
      <span class="contexto-pill">
        {{ contextoActual }}
      </span>
    </div>

    <p class="text-gray-600 text-sm mb-6">
      Escriba su consulta en lenguaje natural. El sistema busca en el cuerpo normativo
      y responde citando el documento de origen.
    </p>

    <!-- ÁREA DE CONSULTA -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Consulta
        </label>
        <textarea
          v-model="consulta"
          rows="3"
          placeholder="Ej: ¿Cuáles son los plazos definidos en la Ley 1581?"
          class="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-senado-primary focus:border-transparent transition-colors"
          @keydown.enter.prevent="procesarConsulta"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="procesarConsulta"
          :disabled="loading"
          class="bg-senado-primary text-white font-medium py-2 px-6 rounded-md hover:bg-senado-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ loading ? 'Procesando...' : 'Procesar Consulta' }}</span>
        </button>
        <button
          @click="limpiarConsulta"
          class="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
        >
          Limpiar
        </button>
        <button
          @click="exportarFicha"
          class="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
        >
          Exportar Ficha
        </button>
      </div>
    </div>

    <!-- CONTEXTOS DE BÚSQUEDA -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Contexto de búsqueda
      </label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="ctx in contextos"
          :key="ctx.valor"
          @click="contextoActual = ctx.valor"
          class="px-4 py-2 text-sm font-medium rounded-full transition-all"
          :class="contextoActual === ctx.valor
            ? 'bg-senado-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ ctx.etiqueta }}
        </button>
      </div>
    </div>

    <!-- HISTORIAL -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-bold uppercase tracking-wider text-gray-400">
          Preguntas y respuestas de esta sesión
        </h3>
        <span class="text-xs text-gray-400">
          {{ historial.length }} consulta{{ historial.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="historial.length === 0" class="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-gray-500 font-medium">Aún no hay preguntas</p>
        <p class="text-gray-400 text-sm">Haz una consulta para comenzar</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(item, index) in historial"
          :key="index"
          class="space-y-3"
        >
          <div class="chat-bubble-user">
            {{ item.pregunta }}
          </div>
          <div class="chat-bubble-bot" v-html="item.respuesta"></div>
          <hr v-if="index < historial.length - 1" class="border-gray-200 my-4" />
        </div>
      </div>
    </div>

    <div class="mt-12 text-center text-sm text-gray-400 border-t border-gray-200 pt-6">
      Plataforma de Inteligencia Legislativa — Motor Vectorial con Streaming
      <br />
      <span class="font-medium text-gray-500">Cámara de Senadores · Asamblea Legislativa Plurinacional de Bolivia</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const consulta = ref('')
const loading = ref(false)
const contextoActual = ref('Toda la Base Normativa')
const historial = ref([])

const contextos = [
  { valor: 'Toda la Base Normativa', etiqueta: 'Toda la Base Normativa' },
  { valor: 'Leyes Promulgadas (Vigentes)', etiqueta: 'Leyes Promulgadas' },
  { valor: 'Proyectos En Tratamiento', etiqueta: 'Proyectos en Tratamiento' },
  { valor: 'Proyectos Rechazados', etiqueta: 'Proyectos Rechazados' },
]

const API_URL = '/api/consultar'

const procesarConsulta = async () => {
  const texto = consulta.value.trim()
  if (!texto) {
    alert('Por favor, escribe una consulta.')
    return
  }

  loading.value = true

  try {
    const response = await $fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        consulta: texto,
        contexto: contextoActual.value,
      }
    })

    const respuestaTexto = response.respuesta || response.message || 'No se pudo obtener una respuesta.'

    historial.value.push({
      pregunta: texto,
      respuesta: respuestaTexto,
    })

    consulta.value = ''

  } catch (error) {
    console.error('Error al procesar consulta:', error)
    historial.value.push({
      pregunta: texto,
      respuesta: `<span class="text-red-600">⚠️ Error al procesar la consulta. Por favor, intenta nuevamente.</span>`
    })
  } finally {
    loading.value = false
  }
}

const limpiarConsulta = () => {
  consulta.value = ''
}

const exportarFicha = () => {
  if (historial.value.length === 0) {
    alert('No hay consultas para exportar.')
    return
  }

  let texto = '📋 FICHA DE CONSULTAS LEGISLATIVAS\n'
  texto += `📅 Fecha: ${new Date().toLocaleString()}\n`
  texto += `📚 Contexto: ${contextoActual.value}\n`
  texto += '═'.repeat(50) + '\n\n'

  historial.value.forEach((item, index) => {
    texto += `🔹 CONSULTA ${index + 1}:\n`
    texto += `   ${item.pregunta}\n\n`
    texto += `🔸 RESPUESTA:\n`
    const respuestaPlana = item.respuesta.replace(/<[^>]*>/g, '')
    texto += `   ${respuestaPlana}\n\n`
    texto += '─'.repeat(40) + '\n\n'
  })

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ficha_consultas_${new Date().toISOString().slice(0, 10)}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.chat-bubble-user {
  background: var(--senado-primary);
  color: #ffffff;
  padding: 0.7rem 1.1rem;
  border-radius: 14px 14px 3px 14px;
  margin: 0.4rem 0;
  max-width: 88%;
  margin-left: auto;
  font-size: 0.92rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-bubble-bot {
  background: #ffffff;
  color: #333;
  padding: 0.8rem 1.15rem;
  border-radius: 14px 14px 14px 3px;
  margin: 0.4rem 0;
  max-width: 92%;
  border: 1px solid #e0e0e0;
  font-size: 0.92rem;
  line-height: 1.6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-bubble-bot :deep(p) {
  margin: 0.5rem 0;
}

.chat-bubble-bot :deep(ul),
.chat-bubble-bot :deep(ol) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.chat-bubble-bot :deep(strong) {
  color: var(--senado-primary);
}

.contexto-pill {
  background: var(--senado-gold-soft);
  color: var(--senado-primary);
  font-weight: 600;
  padding: 0.2rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--senado-gold);
  font-size: 0.8rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>