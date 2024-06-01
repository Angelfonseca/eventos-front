<template>
  <div v-if="isModalOpen" class="popup-overlay" @click.self="closeEventDetail">
    <div class="popup-container">
      <h1 id="titulo">{{ event.title }}</h1>
      <p class="campo"><strong>Descripción:</strong> {{ event.description }}</p>
      <p class="campo"><strong>Fecha:</strong> {{ formatDate(event.eventDate) }}</p>
      <p class="campo"><strong>Hora:</strong> {{ formatTime(event.eventDate) }}</p>
      <p class="campo"><strong>Activo:</strong> {{ isActive ? 'Sí' : 'No' }}</p>
      <p class="campo"><strong>Visualizaciones:</strong> {{ visualizations }}</p>
      <button class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" v-if="isActive && !isRegistered && !isDocente()" @click="registrarse" id="registrarse">Registrarse</button>
      <button class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" @click="closeEventDetail" id="cerrar">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toast-notification';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isModalOpen = ref(true);
    const isRegistered = ref(false);
    const visualizations = ref(props.event.visualizedby);

    const closeEventDetail = () => {
      isModalOpen.value = false;
      emit('close');
    };

    const isDocente = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.isdocente;
    };

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleTimeString(undefined, options);
    };

    const isActive = () => {
      return new Date(props.event.eventDate) > new Date();
    };

    const registrarse = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const eventId = props.event._id;
        const username = user.username;

        const response = await fetch(`http://localhost:3000/api/events/accept/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify({ username })
        });

        if (!response.ok) {
          throw new Error('Error registrando para el evento');
        }
        const result = await response.json();
        useToast().success('Registrado para el evento');
        isRegistered.value = true;
      } catch (error) {
        console.error('Error registrando para el evento:', error);
        useToast().error('Error registrando para el evento');
      }
    };

    const incrementVisualizations = async () => {
      try {
        const eventId = props.event._id;
        const response = await fetch(`http://localhost:3000/api/events/visualizedby/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          visualizations.value = data.visualizedby;
        } else {
          console.error('Error incrementando las visualizaciones:', await response.text());
        }
      } catch (error) {
        console.error('Error incrementando las visualizaciones:', error);
      }
    };

    onMounted(async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const eventId = props.event._id;
      const username = user.username;

      fetch(`http://localhost:3000/api/events/isregistered/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ eventId, username })
      })
        .then(response => response.json())
        .then(data => {
          isRegistered.value = data.isRegistered;
        })
        .catch(error => {
          console.error('Error fetching event registration status:', error);
        });

      await incrementVisualizations();
    });

    watch(() => props.event.visualizedby, (newVal) => {
      visualizations.value = newVal;
    });

    return {
      isModalOpen,
      isRegistered,
      closeEventDetail,
      formatDate,
      formatTime,
      registrarse,
      isDocente,
      visualizations,
      isActive
    };
  }
};
</script>

<style scoped>
#titulo {
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 375px; /* Establece el ancho máximo del contenedor */
  width: 100%; /* Asegura que el contenedor ocupe el 100% del ancho disponible */
}
#registrarse {
  margin-top: 10px;
}
#cerrar {
  margin-top: 10px;
}
.campo {
  margin-bottom: 10px;
  font-size: 1rem;
  text-align: center;
}
</style>
