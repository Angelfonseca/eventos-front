<template>
  <div v-if="isModalOpen" class="popup-overlay" @click.self="closeEventDetail">
    <div class="popup-container">
      <h1 id = "titulo">{{ event.title }}</h1>
      <p class = "campo"><strong>Descripción:</strong> {{ event.description }}</p>
      <p class = "campo"><strong>Fecha:</strong> {{ formatDate(event.eventDate) }}</p>
      <p class = "campo"><strong>Activo:</strong> {{ event.active ? 'Sí' : 'No' }}</p>
      <p class = "campo"><strong>Visualizaciones:</strong> {{ event.visualizedby }}</p>
      <button class="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" v-if="!isRegistered" @click="registrarse" id = "registrarse">Registrarse</button>
      <button class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" @click="closeEventDetail" id = "cerrar" >Cerrar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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

    const closeEventDetail = () => {
      isModalOpen.value = false;
      emit('close');
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

    console.log('Response status:', response.status);
    console.log('Response text:', await response.text());
    useToast().success('Registrado para el evento');
    isRegistered.value = true; 
  } catch (error) {
    console.error('Error registrando para el evento:', error);
    useToast().error('Error registrando para el evento');
  }
};


    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    onMounted(() => {
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
        fetch(`http://localhost:3000/api/events/visualizedby/${eventId}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }

    });

    return {
      isModalOpen,
      isRegistered,
      closeEventDetail,
      formatDate,
      registrarse
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
