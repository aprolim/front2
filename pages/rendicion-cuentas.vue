<template>
  <div class="rendicion-cuentas-container">
    <!-- Header con título -->
    <div 
      class="bg-title-section d-flex justify-content-center align-items-center"
      :style="{ backgroundColor: 'var(--bg-title-section, #8B0000)' }"
    >
      <h3 class="title-section">Rendición Pública de Cuentas</h3>
    </div>

    <!-- Tabla de contenido -->
    <div class="w-100 mt-3">
      <div class="px-5 table-responsive">
        <table class="table table-1 w-100 fg-1">
          <thead>
            <tr class="table-1-header">
              <th>Detalle</th>
              <th>Descripción</th>
              <th>Gestión</th>
              <th>Archivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rendicionData" :key="item.id">
              <td style="width: 300px;">{{ item.detalle }}</td>
              <td>{{ item.descripcion }}</td>
              <td style="width: 100px;">{{ item.gestion }}</td>
              <td style="width: 120px;">
                <div class="d-flex">
                  <a 
                    class="btn download-pdf d-flex justify-content-around"
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.archivo"
                  >
                    <div class="icon mr-2"></div>
                    Descargar
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="rendicionData.length === 0 && !loading" class="text-center py-5">
      <p class="text-muted">No hay documentos de rendición de cuentas disponibles</p>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const rendicionData = ref([])

const fetchData = async () => {
  try {
    // Si tienes API
    // const response = await $fetch('/api/rendicion-cuentas')
    // rendicionData.value = response
    
    // Datos de ejemplo
    rendicionData.value = [
      {
        id: 1,
        detalle: 'INFORME RPC INICIAL 2025',
        descripcion: 'INFORME RPC INICIAL 2025, Gestion Legislativa',
        gestion: '2025',
        archivo: 'https://apisi.senado.gob.bo/images/a00f3403-6f33-4b87-a739-f81e9e7db781_1759871575.pdf'
      },
      {
        id: 2,
        detalle: 'INFORME RPC INICIAL 2024',
        descripcion: 'MODALIDAD VIRTUAL',
        gestion: '2024',
        archivo: 'https://apisi.senado.gob.bo/images/9d7f2f79-9003-4216-a924-253c1634ff1f_1731695829.pdf'
      },
      {
        id: 3,
        detalle: 'INFORME RPC FINAL 2025',
        descripcion: 'INFORME RPC FINAL 2025, PRESENTACIÓN DE RENDICIÓN DE CUENTAS',
        gestion: '2025',
        archivo: 'https://apisi.senado.gob.bo/images/a12e2b67-abaa-48e1-9062-31aac30f70fd_1772196687.pdf'
      },
      {
        id: 4,
        detalle: 'INFORME RPC FINAL 2024',
        descripcion: 'Documento de Rendicion Publica de Cuentas Final Gestion 2024',
        gestion: '2024',
        archivo: 'https://apisi.senado.gob.bo/images/9fbec139-f933-45fa-92f9-121a77b86c1b_1756416344.pdf'
      }
    ]
    loading.value = false
  } catch (error) {
    console.error('Error al cargar datos:', error)
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.rendicion-cuentas-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bg-title-section {
  background-color: #8B0000;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
}

.title-section {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.table-responsive {
  overflow-x: auto;
}

.table-1 {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  width: 100%;
  border-collapse: collapse;
}

.table-1-header {
  background-color: #8B0000;
  color: white;
}

.table-1-header th {
  padding: 15px 20px;
  font-weight: 600;
  text-align: left;
  border: none;
}

.table-1 tbody td {
  padding: 15px 20px;
  vertical-align: middle;
  border-bottom: 1px solid #e9ecef;
}

.table-1 tbody tr:hover {
  background-color: #f8f9fa;
}

.download-pdf {
  background-color: #8B0000;
  color: white !important;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.download-pdf:hover {
  background-color: #a00000;
  color: white !important;
}

.download-pdf .icon {
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z'/%3E%3Cpath d='M12 15l-4-4h2.5V8h3v3H16l-4 4z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.mr-2 {
  margin-right: 8px;
}

.text-muted {
  color: #6c757d;
}

/* Spinner de carga */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8B0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .title-section {
    font-size: 1.2rem;
  }
  
  .table-1 tbody td,
  .table-1-header th {
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  
  .table-1 tbody td[style*="width: 300px"] {
    min-width: 150px;
  }
  
  .download-pdf {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}

@media (max-width: 576px) {
  .px-5 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .table-1 tbody td,
  .table-1-header th {
    padding: 8px 10px;
    font-size: 0.75rem;
  }
}
</style>