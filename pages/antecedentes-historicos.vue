<template>
  <div class="min-h-screen bg-white py-12">
    <div class="mx-auto w-[85%]">
      <!-- Título -->
      <div class="mb-12">
        <h1 class="text-[4vw] font-bold text-senado-primary text-center leading-tight">
          Antecedentes Históricos
        </h1>
        <p class="text-center text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Conoce la historia y evolución del Senado de Bolivia, desde sus orígenes hasta la actualidad
        </p>
        <div class="w-24 h-1 bg-senado-gold-dark mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN 1: RESEÑA HISTÓRICA               -->
      <!-- ========================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20">
        <div class="space-y-6 order-2 lg:order-1 flex flex-col justify-center">
          <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full w-fit">
            📜 Reseña Histórica
          </div>
          <h2 class="text-3xl font-bold text-senado-primary">
            Historia del Senado de Bolivia
          </h2>
          <div class="w-16 h-1 bg-senado-gold-dark rounded"></div>
          <div class="prose prose-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              El <strong>9 de febrero de 1825</strong>, por decreto del <strong>Mariscal Antonio José de Sucre</strong>, se convoca a la primera Asamblea Nacional con el objetivo de dirimir el destino de las provincias de la futura República de Bolivia, por lo cual se establece la fundación del Poder Legislativo un <strong>10 de julio de 1825</strong>.
            </p>
            <p>
              El día <strong>6 de agosto de 1825</strong>, se aprobó la independencia de la República de Bolívar por amplia mayoría. En consecuencia, en la sesión del <strong>13 de agosto de 1825</strong>, Bolivia es declarada como una República representativa, la cual contaría con tres poderes: <strong>Ejecutivo, Judicial y Legislativo</strong>.
            </p>
            <div class="bg-senado-gold-lightest p-6 rounded-xl border-l-4 border-senado-primary">
              <p class="text-sm text-gray-600 italic">
                "Luego de varias interrupciones del orden democrático en el país, el día <strong>10 de octubre de 1982</strong> se posesiona al congreso electo en las elecciones realizadas en 1980."
              </p>
              <p class="text-sm text-gray-600 mt-2">
                Desde entonces, la Asamblea Legislativa y el Senado trabajan de manera continua en favor de la <strong>legislación, fiscalización y gestión</strong> de la nación.
              </p>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 flex items-stretch">
          <div class="rounded-xl overflow-hidden shadow-lg w-full flex flex-col">
            <img 
              src="/reseña historica del senado/17.webp" 
              alt="Palacio Legislativo Restaurado - 1940"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => e.target.src = '/images/LogoDorado.svg'"
            />
            <div class="bg-senado-gold-soft px-4 py-2 text-sm text-gray-600 text-center flex-shrink-0">
              🏛️ Palacio Legislativo Restaurado, año 1940
              <br />
              <span class="text-xs text-gray-400">Fuente: Colección Fotográfica de la Vicepresidencia del Estado Plurinacional de Bolivia.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN 2: LÍNEA DE TIEMPO                -->
      <!-- ========================================== -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full">
            📅 Línea de Tiempo
          </div>
          <h2 class="text-3xl font-bold text-senado-primary mt-3">
            Hitos Históricos del Senado
          </h2>
          <p class="text-gray-600 mt-2">Los momentos más importantes en la historia del Senado boliviano</p>
        </div>

        <div class="relative">
          <!-- Línea vertical -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-senado-gold-dark"></div>

          <!-- 1825 - Fundación -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8 text-right">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">9 de febrero 1825</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Convocatoria a la Asamblea</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Por decreto del Mariscal Antonio José de Sucre se convoca a la primera Asamblea Nacional.
                </p>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8"></div>
          </div>

          <!-- 10 de julio 1825 -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8"></div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">10 de julio 1825</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Fundación del Poder Legislativo</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Se establece la fundación del Poder Legislativo de la futura República de Bolivia.
                </p>
              </div>
            </div>
          </div>

          <!-- 6 de agosto 1825 -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8 text-right">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">6 de agosto 1825</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Independencia de Bolivia</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Se aprueba la independencia de la República de Bolívar por amplia mayoría.
                </p>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8"></div>
          </div>

          <!-- 13 de agosto 1825 -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8"></div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">13 de agosto 1825</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Declaración de la República</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Bolivia es declarada como una República representativa con tres poderes: Ejecutivo, Judicial y Legislativo.
                </p>
              </div>
            </div>
          </div>

          <!-- 1940 - Restauración -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8 text-right">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">1940</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Restauración del Palacio</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Restauración del Palacio Legislativo, símbolo de la institucionalidad boliviana.
                </p>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8"></div>
          </div>

          <!-- 1982 - Retorno a la democracia -->
          <div class="relative flex flex-col md:flex-row items-center mb-12">
            <div class="md:w-1/2 pr-8"></div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-primary rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8">
              <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <span class="text-senado-primary font-bold text-sm">10 de octubre 1982</span>
                <h3 class="text-xl font-bold text-senado-primary mt-1">Retorno a la Democracia</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Se posesiona al congreso electo en las elecciones de 1980. El Senado trabaja de manera continua en favor de la legislación, fiscalización y gestión de la nación.
                </p>
              </div>
            </div>
          </div>

          <!-- Actualidad -->
          <div class="relative flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 pr-8 text-right">
              <div class="bg-senado-primary text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <span class="text-senado-gold font-bold text-sm">Actualidad</span>
                <h3 class="text-xl font-bold text-white mt-1">Senado Plurinacional</h3>
                <p class="text-gray-200 text-sm mt-2">
                  36 senadores representan a los 9 departamentos, trabajando por el desarrollo de Bolivia bajo el Estado Plurinacional.
                </p>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-senado-gold-dark rounded-full border-4 border-white shadow-md"></div>
            <div class="md:w-1/2 pl-8"></div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN 3: ANTIGUO HEMICICLO              -->
      <!-- ========================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div class="order-1 lg:order-1">
          <div class="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/reseña historica del senado/63.webp" 
              alt="Antiguo Hemiciclo de la Cámara de Senadores"
              class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => e.target.src = '/images/LogoDorado.svg'"
            />
            <div class="bg-senado-gold-soft px-4 py-2 text-sm text-gray-600 text-center">
              🪑 Antiguo Hemiciclo de la Honorable Cámara de Senadores
              <br />
              <span class="text-xs text-gray-400">Fuente: Colección Fotográfica del Honorable Senado del Estado Plurinacional de Bolivia.</span>
            </div>
          </div>
        </div>
        <div class="space-y-6 order-2 lg:order-2">
          <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full">
            🪑 Historia Parlamentaria
          </div>
          <h2 class="text-3xl font-bold text-senado-primary">
            Antiguo Hemiciclo
          </h2>
          <div class="w-16 h-1 bg-senado-gold-dark rounded"></div>
          <p class="text-gray-700 text-lg leading-relaxed">
            El antiguo hemiciclo de la Cámara de Senadores fue el escenario donde se debatieron y aprobaron las leyes que forjaron la nación boliviana durante décadas.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed">
            Este espacio histórico fue testigo de los momentos más importantes de la vida política del país, desde la consolidación de la democracia hasta las grandes reformas constitucionales.
          </p>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN 4: NUEVO HEMICICLO                -->
      <!-- ========================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div class="space-y-6 order-2 lg:order-1">
          <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full">
            🏛️ Arquitectura Contemporánea
          </div>
          <h2 class="text-3xl font-bold text-senado-primary">
            Nuevo Hemiciclo
          </h2>
          <div class="w-16 h-1 bg-senado-gold-dark rounded"></div>
          <p class="text-gray-700 text-lg leading-relaxed">
            El nuevo hemiciclo de la Cámara de Senadores representa la modernización del Poder Legislativo, con una infraestructura que combina tecnología y funcionalidad para el debate democrático.
          </p>
          <p class="text-gray-700 text-lg leading-relaxed">
            Este espacio renovado refleja el compromiso del Senado con la transparencia, la participación ciudadana y el fortalecimiento de la democracia en el Estado Plurinacional de Bolivia.
          </p>
        </div>
        <div class="order-1 lg:order-2">
          <div class="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/reseña historica del senado/118.webp" 
              alt="Nuevo Hemiciclo de la Cámara de Senadores"
              class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
              @error="(e) => e.target.src = '/images/LogoDorado.svg'"
            />
            <div class="bg-senado-gold-soft px-4 py-2 text-sm text-gray-600 text-center">
              🏛️ Nuevo Hemiciclo de la Honorable Cámara de Senadores
              <br />
              <span class="text-xs text-gray-400">Fuente: Colección Fotográfica del Honorable Senado del Estado Plurinacional de Bolivia.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECCIÓN 5: DATOS CLAVE                    -->
      <!-- ========================================== -->
      <div class="bg-senado-gold-lightest rounded-2xl p-10 mb-16">
        <div class="text-center mb-10">
          <div class="inline-block bg-senado-gold-soft text-senado-primary text-sm font-bold px-4 py-1 rounded-full">
            📊 Datos Clave
          </div>
          <h2 class="text-3xl font-bold text-senado-primary mt-3">
            El Senado en Cifras
          </h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-4xl font-bold text-senado-primary">36</div>
            <p class="text-gray-600 text-sm mt-1">Senadores</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-senado-primary">9</div>
            <p class="text-gray-600 text-sm mt-1">Departamentos</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-senado-primary">200+</div>
            <p class="text-gray-600 text-sm mt-1">Años de historia</p>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-senado-primary">3</div>
            <p class="text-gray-600 text-sm mt-1">Poderes del Estado</p>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- BOTÓN VOLVER                              -->
      <!-- ========================================== -->
      <div class="text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-2 text-senado-primary hover:text-senado-primary-dark transition-colors text-[1.1vw] font-medium"
        >
          <ClientOnly>
            <Icon name="material-symbols:arrow-back-rounded" class="text-[1.5vw]" />
            <template #fallback>
              <span class="text-[1.5vw]">←</span>
            </template>
          </ClientOnly>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica adicional por ahora
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>