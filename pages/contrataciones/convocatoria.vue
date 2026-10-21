<template>
  <div class="min-h-screen bg-senado-gold-lightest3 py-[10vw] sm:py-12">
    <div class="mx-auto w-[90%] sm:w-[80%]">
      
      <!-- Título y Subtítulo -->
      <h1 class="text-[8vw] sm:text-[3vw] font-bold text-senado-primary text-center mb-[2vw] sm:mb-2 leading-tight uppercase">
        Convocatoria de Adquisición de Bienes y Servicios
      </h1>
      <p class="text-[3.6vw] sm:text-[1.2vw] text-senado-primary-dark text-center mb-[6vw] sm:mb-10 font-medium">
        Unidad Administrativa - Cámara de Senadores
      </p>

      <div class="max-w-[800px] mx-auto">
        
        <!-- Tarjeta del Formulario -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-[1vw] sm:border-l-8 border-senado-primary flex flex-col sm:flex-row items-center justify-between p-[6vw] sm:p-8 gap-[4vw] sm:gap-6 hover:shadow-xl transition-shadow duration-300">
          
          <!-- Ícono -->
          <div class="bg-senado-gold-lightest p-[4vw] sm:p-4 rounded-full flex-shrink-0">
            <Icon name="mdi:file-document-edit-outline" class="text-senado-primary text-[12vw] sm:text-5xl" />
          </div>
          
          <!-- Textos -->
          <div class="flex-grow text-center sm:text-left">
            <h2 class="text-[5vw] sm:text-[1.6vw] font-bold text-senado-primary mb-[1vw] sm:mb-2">
              Formulario PAC
            </h2>
            <p class="text-[3.3vw] sm:text-[1vw] text-gray-600">
              Descargue el Programa Anual de Contrataciones (PAC) correspondiente a la gestión actual en formato PDF.
            </p>
          </div>

          <!-- Botón de descarga -->
          <a 
            href="/contrataciones/FORMULARIO PAC.pdf" 
            target="_blank" 
            download
            class="flex items-center justify-center gap-[2vw] sm:gap-2 bg-senado-primary text-white rounded-lg hover:bg-senado-primary-dark transition-all duration-300 py-[3vw] sm:py-3 px-[6vw] sm:px-6 text-[3.6vw] sm:text-[1vw] font-semibold shadow-md hover:shadow-lg w-full sm:w-auto mt-[2vw] sm:mt-0"
          >
            <Icon name="mdi:download" class="text-[5vw] sm:text-xl" />
            Descargar
          </a>
        </div>

      </div>

      <!-- Botón de volver -->
      <div class="mt-[8vw] sm:mt-12 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[3.3vw] sm:text-[1.1vw] font-medium">
          <Icon name="material-symbols:arrow-back-rounded" class="text-[4.5vw] sm:text-[1.5vw]" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// No requiere lógica adicional
</script>