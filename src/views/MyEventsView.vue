<template>
  <Baselayout>
    <div>
      <h1 class = "titulo" >Mis Eventos</h1>
      <div v-if="loading">Cargando eventos...</div>
      <div v-else class="eventos-container">
        <div class="columna" v-for="(column, index) in columnas" :key="index"
          :class="{ 'ultiple-eventos': column.length > 1 }">
          <Evento v-for="evento in column" :key="evento.id" :evento="evento" class="evento" />
        </div>
      </div>
    </div>
  </Baselayout>
</template>

<script>
import Evento from '../components/evento.vue';
import Baselayout from '../layout/BaseLayout.vue';

export default {
  components: {
    Evento,
    Baselayout,
  },
  data() {
    return {
      eventos: [],
      loading: true,
      userUsername: ''
    };
  },
  computed: {
    columnas() {
      const eventosPorColumna = 2;
      const columnas = [];
      let temp = [];

      for (let i = 0; i < this.eventos.length; i++) {
        temp.push(this.eventos[i]);

        if (temp.length === eventosPorColumna) {
          columnas.push(temp);
          temp = [];
        }
      }

      if (temp.length > 0) {
        columnas.push(temp);
      }

      return columnas;
    },
  },
  async mounted() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.username) {
        throw new Error('No se pudo obtener el nombre de usuario');
      }
      const userUsername = user.username;
      const apiUrl = `http://localhost:3000/api/events/user/${userUsername}`;
      console.log('Ruta de la API:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Verificar que los datos sean un array
      if (!Array.isArray(data)) {
        throw new Error('La respuesta de la API no es un array');
      }

      console.log('Respuesta de la API:', data); // Imprime la respuesta de la API

      this.eventos = data;
      console.log('Eventos cargados:', this.eventos); // Verificar los datos cargados
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.eventos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-auto-rows: minmax(100px, auto); /* Establecer alto mínimo y máximo para cada fila */
  grid-gap: 10px;
}

.columna {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.evento {
  margin-bottom: 10px;
  max-width: 100%; /* Evitar que un evento tome más del ancho de la columna */
}

.columna.multiple-eventos {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(100px, auto)); /* Establecer alto mínimo y máximo para cada fila en la columna */
}
.titulo {
  text-align: center;
  font-size: 3em; /* Ajusta este valor para hacer la letra más grande */
}
</style>