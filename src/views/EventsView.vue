<template>
  <Baselayout>
    <div>
      <h1 class = "titulo">Eventos</h1>
      <div v-if="loading">Cargando eventos...</div>
      <div v-else class="eventos-container">
        <div class="columna" v-for="(column, index) in columnas" :key="index"
          :class="{ 'ultiple-eventos': column.length > 1 }">
          <Evento v-for="evento in column" :key="evento.id" :evento="evento" />
        </div>
      </div>
      <router-view :event="selectedEvent" v-if="selectedEvent" />
    </div>
  </Baselayout>
</template>

<script>
import Evento from '../components/evento.vue';
import Baselayout from '../layout/BaseLayout.vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  components: {
    Evento,
    Baselayout,
  },
  setup() {
    const router = useRouter();

    const navigateToEvent = (evento) => {
      const eventId = evento.id;
      router.push(`/events/${eventId}`);
    };

    return {
      navigateToEvent,
    };
  },
  data() {
    return {
      eventos: [],
      loading: true,
      selectedEvent : null,
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
      const response = await fetch('http://localhost:3000/api/events');
      const data = await response.json();
      this.eventos = data;
      this.loading = false;
       
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.loading = false;
    }
  },
  watch: {
    $route(to, from) {
      const eventId = parseInt(to.params.id);
      this.selectedEvent = this.eventos.find((evento) => evento.id === eventId);
    }
  }
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
  cursor: pointer;
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
