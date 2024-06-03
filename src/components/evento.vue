<template>
  <div class="evento" :key="evento._id">
    <div class="imagen">
      <img src="/eventimg.jpg" alt="Imagen genérica de evento">
    </div>
    <div class="contenido">
      <h3 class="titulo">{{ evento.title }}</h3>
      <p class="descripcion">{{ evento.description }}</p>
      <p><strong>Fecha:</strong> {{ formatDate(evento.eventDate) }}</p>
      <p><strong>Hora:</strong> {{ formatTime(evento.eventDate) }}</p>
      <p><strong>Para:</strong> {{ evento.designedfor }}</p>
    </div>
    <button v-if="isDocente" @click.stop="deleteEvent" class="boton-rojo">Eliminar Evento</button>
    <button v-if="!isDocente && isRegistered && currentRoute !== '/events'" @click.stop="deleteAssistance"
      class="boton-rojo">Eliminar asistencia</button>

  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const evento = ref(props.evento);
    const user = JSON.parse(localStorage.getItem('user'));
    const isDocente = ref(user ? user.isdocente : false);
    const currentRoute = computed(() => route.path);

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleTimeString(undefined, options);
    };

    const deleteEvent = async () => {
      if (!evento.value._id) {
        console.error('Error: eventId no definido');
        alert('Error: eventId no definido');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/events/${evento.value._id}`, {
          method: 'POST', // Cambiar el método a DELETE
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: user._id }),
        });

        if (response.ok) {
          alert('Evento eliminado exitosamente');
          window.location.reload();
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        alert('Error al eliminar el evento: ' + error.message);
      }
    };

    const deleteAssistance = async () => {
      if (!evento.value._id) {
        console.error('Error: eventId no definido');
        alert('Error: eventId no definido');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/events/assistance/${evento.value._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: user.username }),
        });

        if (response.ok) {
          alert('Asistencia eliminada exitosamente');
          window.location.reload();
        } else {
          const error = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.error('Error al eliminar la asistencia:', error);
        alert('Error al eliminar la asistencia: ' + error.message);
      }
    };

    const isRegistered = () => {
      return evento.value.assistants.some((assistant) => assistant._id === user._id);
    };

    watch(() => props.evento, (newValue) => {
      evento.value = newValue;
    });

    return {
      formatDate,
      formatTime,
      deleteEvent,
      isDocente,
      deleteAssistance,
      isRegistered,
      currentRoute,
    };
  },
};
</script>

<style scoped>
.evento {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.imagen img {
  width: 100%;
  height: auto;
}

.contenido {
  padding: 16px;
}

.titulo {
  font-weight: bold;
  font-size: 1.15rem;
  /* Ajusta el tamaño del título */
}

.boton-rojo {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 10px;
  align-self: flex-end;
  border-radius: 5px;
}

.boton-rojo:hover {
  background-color: darkred;
}
</style>
