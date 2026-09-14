<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mostrar"
        class="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
        @click.self="cerrar"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/85 backdrop-blur-sm"></div>

        <!-- Contenido -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[94vh] flex flex-col animate-scale-in"
        >
          <!-- Botón cerrar -->
          <button
            @click="cerrar"
            class="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
            aria-label="Cerrar comunicado"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>

          <!-- ============================================ -->
          <!-- SCROLL ÚNICO: TODO EL CONTENIDO              -->
          <!-- ============================================ -->
          <div class="flex-1 overflow-y-auto">
            <!-- IMAGEN -->
            <div
              v-if="comunicado?.imagen?.url"
              class="relative w-full bg-gray-100"
            >
              <img
                :src="comunicado.imagen.url"
                :alt="comunicado.imagen.alt || comunicado.titulo"
                class="w-full h-auto block cursor-zoom-in"
                @click="abrirLightbox"
                @error="(e) => (e.target.style.display = 'none')"
              />

              <!-- Botón de descarga -->
              <a
                :href="comunicado.imagen.url"
                :download="nombreDescarga"
                target="_blank"
                rel="noopener noreferrer"
                class="absolute top-3 right-16 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 hover:bg-[#611717] text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 shadow-lg"
                title="Descargar imagen"
                @click.stop
              >
                <Icon name="mdi:download" class="w-4 h-4" />
                <span class="hidden sm:inline">Descargar</span>
              </a>
            </div>

            <!-- CONTENIDO -->
            <div class="p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#611717] leading-tight mb-4">
                {{ comunicado.titulo }}
              </h2>

              <div class="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {{ comunicado.contenido }}
              </div>
            </div>
          </div>

          <!-- ============================================ -->
          <!-- ACCIONES RESPONSIVAS                          -->
          <!-- ============================================ -->
          <div
            class="flex-shrink-0 border-t border-gray-200 px-[4vw] sm:px-5 py-[2.5vw] sm:py-3 flex flex-col sm:flex-row gap-[2vw] sm:gap-3 bg-gray-50"
          >
            <a
              v-if="comunicado?.pdf?.url"
              :href="comunicado.pdf.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 inline-flex items-center justify-center gap-[1.5vw] sm:gap-2 px-[4vw] sm:px-5 py-[2.5vw] sm:py-2 rounded-lg bg-[#611717] text-white font-medium hover:bg-[#3a060d] transition-colors text-[3.2vw] sm:text-sm"
            >
              <Icon name="mdi:file-pdf-box" class="w-[4vw] sm:w-4 h-[4vw] sm:h-4" />
              Ver PDF adjunto
            </a>
            <button
              @click="cerrar"
              class="flex-1 px-[4vw] sm:px-5 py-[2.5vw] sm:py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors text-[3.2vw] sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ============================================ -->
  <!-- LIGHTBOX - IMAGEN EN PANTALLA COMPLETA       -->
  <!-- ============================================ -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxAbierto"
        class="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center p-4"
        @click.self="cerrarLightbox"
      >
        <!-- Botón cerrar -->
        <button
          @click="cerrarLightbox"
          class="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
          aria-label="Cerrar imagen"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>

        <!-- Botón descargar -->
        <a
          :href="comunicado?.imagen?.url"
          :download="nombreDescarga"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute top-4 right-20 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
          title="Descargar imagen"
        >
          <Icon name="mdi:download" class="w-6 h-6" />
        </a>

        <!-- Imagen en tamaño completo -->
        <img
          :src="comunicado?.imagen?.url"
          :alt="comunicado?.imagen?.alt || comunicado?.titulo"
          class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          @click.stop
        />

        <!-- Pie con el título -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-5 py-2 rounded-full backdrop-blur-sm max-w-[80vw] truncate">
          {{ comunicado?.titulo }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useComunicadosStore } from '~/stores/comunicados'

// ==========================================
// STORE
// ==========================================
const comunicadosStore = useComunicadosStore()
const { comunicado, nombreDescarga } = storeToRefs(comunicadosStore)

// ==========================================
// ESTADO LOCAL
// ==========================================
const mostrar = ref(false)
const lightboxAbierto = ref(false)

// ==========================================
// WATCH: Cuando el store tiene comunicado, mostrar
// ==========================================
watch(comunicado, (nuevoComunicado) => {
  if (nuevoComunicado) {
    mostrar.value = true
    document.body.style.overflow = 'hidden'
    console.log('✅ [ModalComunicado] Modal abierto:', nuevoComunicado.titulo)
  }
}, { immediate: true })

// ==========================================
// MÉTODOS
// ==========================================
const cerrar = () => {
  mostrar.value = false
  lightboxAbierto.value = false
  document.body.style.overflow = ''
}

const abrirLightbox = () => {
  lightboxAbierto.value = true
}

const cerrarLightbox = () => {
  lightboxAbierto.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (lightboxAbierto.value) {
      cerrarLightbox()
    } else if (mostrar.value) {
      cerrar()
    }
  }
}

// ==========================================
// LIFECYCLE
// ==========================================
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  // Delay para no competir con la carga inicial de la home
  setTimeout(() => {
    comunicadosStore.ensureLoaded()
  }, 800)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
</style>