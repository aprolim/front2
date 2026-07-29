<template>
  <div class="container-senado py-10">
    <div v-if="senator" class="max-w-4xl mx-auto">
      <!-- Botón volver -->
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-senado-primary hover:underline mb-6">
        ← Volver al hemiciclo
      </NuxtLink>

      <!-- Tarjeta del senador -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Foto -->
          <div class="md:col-span-1 bg-senado-primary/10 p-6 flex flex-col items-center justify-center">
            <div 
              class="w-48 h-48 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-lg"
              :style="{ backgroundColor: senator.partyColor }"
            >
              {{ getInitials(senator.name) }}
            </div>
            <span 
              class="mt-4 px-4 py-1 rounded-full text-white font-bold text-sm"
              :style="{ backgroundColor: senator.partyColor }"
            >
              {{ senator.partyShort }}
            </span>
          </div>

          <!-- Información -->
          <div class="md:col-span-2 p-6">
            <h1 class="text-3xl font-bold text-gray-800">{{ senator.name }}</h1>
            
            <div class="mt-4 space-y-3">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Departamento:</span>
                <span class="text-gray-800">{{ senator.department }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Bancada:</span>
                <span class="text-gray-800">{{ senator.bancada }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Partido:</span>
                <span class="text-gray-800">{{ senator.party }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-600 w-32">Asiento N°:</span>
                <span class="text-gray-800">{{ senator.seatNumber }}</span>
              </div>
            </div>

            <!-- Comisiones -->
            <div v-if="senator.comision || senator.comite" class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="font-bold text-gray-700 mb-3">Comisiones y Comités</h3>
              <div v-if="senator.comision" class="bg-senado-primary/5 p-3 rounded-lg mb-2">
                <span class="font-semibold text-senado-primary">Comisión:</span>
                <span class="text-gray-700 ml-2">{{ senator.comision }}</span>
              </div>
              <div v-if="senator.comite" class="bg-senado-primary/5 p-3 rounded-lg">
                <span class="font-semibold text-senado-primary">Comité:</span>
                <span class="text-gray-700 ml-2">{{ senator.comite }}</span>
              </div>
            </div>

            <!-- Cargo -->
            <div v-if="senator.cargo" class="mt-4">
              <span class="inline-block bg-senado-primary text-white px-4 py-2 rounded-lg font-semibold">
                {{ senator.cargo }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-600">Senador no encontrado</h2>
      <NuxtLink to="/" class="text-senado-primary hover:underline mt-4 inline-block">
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// ============================================
// SENADORES (datos completos - IGUAL QUE EN EL COMPONENTE)
// ============================================
const senators = [
  // PDC - GOBIERNO (16 senadores)
  { id: 1, seatNumber: 1, name: "Wilder Véliz Armas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Cochabamba", bancada: "Gobierno", comite: "Comité de Justicia Plural y Consejo de la Magistratura.", cargo: "Secretario de Comite" },
  { id: 2, seatNumber: 2, name: "Judith Rosario García Coca", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Cochabamba", bancada: "Gobierno", comision: "Comisión de Seguridad del Estado", cargo: "Presidente de Comisión" },
  { id: 3, seatNumber: 3, name: "Claudia Mallón Vargas", party: "Autonomía para Bolivia Súmate", partyShort: "APB", partyColor: "#511966", department: "Cochabamba", bancada: "Aliados", comite: "Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social", cargo: "Secretaria de Comite" },
  { id: 4, seatNumber: 4, name: "Wanda Ximena Medrano Hervas", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Cochabamba", bancada: "Oposición", comite: "Comité de Relaciones Económicas Internacionales", cargo: "Secretaria de Comite" },
  { id: 5, seatNumber: 5, name: "José Manuel Ormachea Mendieta", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "La Paz", bancada: "Oposición", comision: "Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad", cargo: "Presidente de Comisión" },
  { id: 6, seatNumber: 6, name: "Carmen Soledad Chapeton Tancara", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "La Paz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Vicepresidencia" },
  { id: 7, seatNumber: 7, name: "Nicanor Gonzalo Cochi Condorí", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Política Internacional y Protección al Migrante", cargo: "Presidente de Comisión" },
  { id: 8, seatNumber: 8, name: "Tomasa Yarhui Jacome", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Sistema Electoral, Derechos Humanos y Equidad Social", cargo: "Secretaria de Comite" },
  { id: 9, seatNumber: 9, name: "Abdon Porcel Arancibia", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Chuquisaca", bancada: "Oposición", comite: "Comité de Políticas Financiera, Monetaria, Tributaria y Seguros", cargo: "Secretario de Comite" },
  { id: 10, seatNumber: 10, name: "Bertha Cartagena Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Chuquisaca", bancada: "Gobierno", comite: "Comité de Culturas, Interculturalidad y Patrimonio Cultural", cargo: "Secretaria de Comite" },
  { id: 11, seatNumber: 11, name: "Branko Goran Marinković Jovicevic", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Santa Cruz", bancada: "Oposición", comision: "Comisión de Tierra y Territorio / Región Amazónica", cargo: "Presidente de Comisión" },
  { id: 12, seatNumber: 12, name: "Kathia Lizbeth Quiroga Fernández", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Santa Cruz", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Vicepresidencia" },
  { id: 13, seatNumber: 13, name: "Rosa Tatiana Áñez Carrasco", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Santa Cruz", bancada: "Aliados", comision: "Directiva Legislatura 2025-2026", cargo: "Tercera Secretaria" },
  { id: 14, seatNumber: 14, name: "Paola Limbania López Zeballos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Santa Cruz", bancada: "Gobierno", comite: "Comité de Seguridad del Estado y Lucha Contra el Narcotráfico", cargo: "Secretaria de Comite" },
  { id: 15, seatNumber: 15, name: "Betty Canaviri Villanueva", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Potosí", bancada: "Oposición", comite: "Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura", cargo: "Secretaria de Comite" },
  { id: 16, seatNumber: 16, name: "Teresa Alarcón Arana", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Oposición", comite: "Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales", cargo: "Secretaria de Comite" },
  { id: 17, seatNumber: 17, name: "Marcelino Flores Ordoñez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Gobierno", comite: "Comité de Energía, Hidrocarburos, Minería y Metalurgia", cargo: "Secretario de Comite" },
  { id: 18, seatNumber: 18, name: "Bertha Nurmy Gutiérrez Meneces", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Potosí", bancada: "Gobierno", comite: "Comité de Naciones y Pueblos Indígena Originario Campesinos", cargo: "Secretaria de Comite" },
  { id: 19, seatNumber: 19, name: "Erick Nelson Soruco Alpire", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Beni", bancada: "Gobierno", comision: "Comisión de Justicia Plural, Ministerio Público y Defensa del Estado", cargo: "Presidente de Comisión" },
  { id: 20, seatNumber: 20, name: "José Roca Haensel", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Beni", bancada: "Aliados", comite: "Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales", cargo: "Secretario de Comite" },
  { id: 21, seatNumber: 21, name: "Ana Karina Velasco Añez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Beni", bancada: "Aliados", comite: "Comité de Fuerzas Armadas y Policía Boliviana", cargo: "Secretaria de comite" },
  { id: 22, seatNumber: 22, name: "Ernesto Suarez Sattori", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Beni", bancada: "Oposición", comite: "Comité de Autonomías Departamentales", cargo: "Secretario de Comite" },
  { id: 23, seatNumber: 23, name: "Ana María Crispin Choque", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "La Paz", bancada: "Gobierno", comision: "Comisión de Economía Plural, Producción e Industria", cargo: "Presidente de Comisión" },
  { id: 24, seatNumber: 24, name: "Julio Diego Romaña Galindo", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Pando", bancada: "Oposición", comision: "Directiva Legislatura 2025-2026", cargo: "Segunda Secretaria" },
  { id: 25, seatNumber: 25, name: "Carol Carlo Durán", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Pando", bancada: "Oposición", comite: "Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca", cargo: "Secretaria de Comite" },
  { id: 26, seatNumber: 26, name: "Cinthia Mónica Puerta Campos", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Pando", bancada: "Gobierno", comite: "Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático", cargo: "Secretaria de Comite" },
  { id: 27, seatNumber: 27, name: "Eliana Rina Acosta Quispe", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Pando", bancada: "Aliados", comision: "Comisión de Planificación, Política Económica y Finanzas", cargo: "Presidente de Comisión" },
  { id: 28, seatNumber: 28, name: "Daniel Antonio Ortiz Velásquez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Chuquisaca", bancada: "Gobierno", comision: "Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral", cargo: "Presidente de Comisión" },
  { id: 29, seatNumber: 29, name: "María Isabel Moreno Cortez", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Tarija", bancada: "Oposición", comite: "Comité de Ministerio Público y Defensa Legal del Estado", cargo: "Secretaria de Comite" },
  { id: 30, seatNumber: 30, name: "César Mentasti Padilla", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Tarija", bancada: "Aliados", comision: "Comisión de Organización Territorial del Estado y Autonomías", cargo: "Presidente de Comisión" },
  { id: 31, seatNumber: 31, name: "Leonor Rosalva Romero Gutiérrez", party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", department: "Tarija", bancada: "Aliados", comite: "Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado", cargo: "Secretaria de Comite" },
  { id: 32, seatNumber: 32, name: "Diego Esteban Mateo Ávila Navajas", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Tarija", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Presidente" },
  { id: 33, seatNumber: 33, name: "Yasmín Estivariz Villarroel", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comision: "Directiva Legislatura 2025-2026", cargo: "Primera Secretaria" },
  { id: 34, seatNumber: 34, name: "Freddy Castillo Chávez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comite: "Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.", cargo: "Secretario de Comite" },
  { id: 35, seatNumber: 35, name: "Maria Antonieta Alcón Sánchez", party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", department: "Oruro", bancada: "Gobierno", comite: "Comité de Educación, Salud, Ciencia, Tecnología y Deporte", cargo: "Secretaria de Comite" },
  { id: 36, seatNumber: 36, name: "José Sánchez Aguilar", party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", department: "Oruro", bancada: "Gobierno", comision: "Comisión de Política Social", cargo: "Presidente de Comisión" },
  
  // UNIDAD - ALIADOS (7 senadores)
  // APB SÚMATE - ALIADOS (1 senador)
  // LIBRE - OPOSICIÓN (12 senadores)
]

const route = useRoute()
const id = computed(() => parseInt(route.params.id))

const senator = computed(() => {
  return senators.find(s => s.id === id.value)
})

const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}
</script>