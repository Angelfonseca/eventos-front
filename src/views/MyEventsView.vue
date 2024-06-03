<template>
  <Baselayout>
    <div>
      <h1 class="titulo">Mis Eventos</h1>
      <EventDetailView v-if="isEventDetailVisible" :event="selectedEvent" @close="closeEventDetail" />
      <div v-if="loading">Cargando eventos...</div>
      <div v-else class="eventos-container" style="max-height: 750px; overflow-y: auto;">
        <div class="columna" v-for="(column, index) in columnas" :key="index"
          :class="{ 'multiple-eventos': column.length > 1 }">
          <Evento v-for="evento in column" :key="evento.id" :evento="evento" class="evento" @click="openEventDetail(evento)" />
        </div>
      </div>
    </div>
  </Baselayout>
</template>

<script>
import Evento from '../components/evento.vue';
import Baselayout from '../layout/BaseLayout.vue';
import { ref, computed, onMounted } from 'vue';
import EventDetailView from './EventDetailView.vue';

export default {
  components: {
    Evento,
    Baselayout,
    EventDetailView,
  },
  setup() {
    const eventos = ref([]);
    const loading = ref(true);
    const selectedEvent = ref(null);
    const isEventDetailVisible = ref(false);

    // Check if the user is in localStorage and handle if not
    const user = localStorage.getItem('user');
    if (!user) {
      console.error('No user found in localStorage');
      // Handle the case when the user is not found in localStorage, e.g., redirect to login
      // Here we can redirect to login page or show a message
      window.location.href = '/login'; // example of redirecting to a login page
      return;
    }

    const userId = JSON.parse(user).username;

    const columnas = computed(() => {
      const eventosPorColumna = 2;
      const columnas = [];
      let temp = [];

      for (let i = 0; i < eventos.value.length; i++) {
        temp.push(eventos.value[i]);

        if (temp.length === eventosPorColumna) {
          columnas.push(temp);
          temp = [];
        }
      }

      if (temp.length > 0) {
        columnas.push(temp);
      }

      return columnas;
    });

    onMounted(async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/user/${userId}`);
        const data = await response.json();
        eventos.value = data;
        loading.value = false;
        console.log('Eventos cargados:', eventos.value);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
        loading.value = false;
      }
    });

    const openEventDetail = (event) => {
      selectedEvent.value = event;
      isEventDetailVisible.value = true;
    };

    const closeEventDetail = () => {
      selectedEvent.value = null;
      isEventDetailVisible.value = false;
    };

    return {
      eventos,
      loading,
      selectedEvent,
      columnas,
      isEventDetailVisible,
      openEventDetail,
      closeEventDetail,
    };
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
  padding: 10px;
  background-color: #f0f0f0; /* Fondo gris claro para resaltar el evento */
  border-radius: 5px;
  cursor: pointer;
}
.evento-multiple {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #f9f9f9; /* Fondo ligeramente más claro para eventos múltiples */
  border-radius: 3px;
  cursor: pointer;
}
.titulo {
  text-align: center;
  font-size: 3em; /* Ajusta este valor para hacer la letra más grande */
}
</style>