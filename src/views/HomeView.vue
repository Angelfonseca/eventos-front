<template>
  <BaseLayout>
      <div class="main-container">
        <section class="nuevo-evento">
          <div class="eventos-contenedor">
            <h2>NUEVO EVENTO</h2>
            <form @submit.prevent="submitEvent" id="formulario-evento">
            <div class="campo">
              <label for="title">Título:</label>
              <input type="text" v-model="formData.title" id="title" name="title" required class="pregunta">
            </div>
            <div class="campo">
              <label for="description">Descripción:</label>
              <textarea v-model="formData.description" id="description" name="description" required class="pregunta"></textarea>
            </div>
            <div class="campo">
              <label for="eventDate">Fecha del Evento:</label>
              <input type="date" v-model="formData.eventDate" id="eventDate" name="eventDate" required class="pregunta">
            </div>
            <div class="campo">
              <label for="eventTime">Hora del Evento:</label>
              <input type="time" v-model="formData.eventTime" id="eventTime" name="eventTime" required class="pregunta">
            </div>
            <div class="campo">
              <label for="type">Tipo:</label>
              <select v-model="formData.type" id="type" name="type" required>
                <option value="email">Email</option>
                <option value="email">ninguno</option>
              </select>
            </div>
            <button type="submit" class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 backdrop-blur-sm ">Crear Evento</button>
          </form>
          
          </div>
        </section>
      </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from '../layout/BaseLayout.vue';
// import { Logged } from '../router/index.js';

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import router from '../router';
const $toast = useToast();
let instance = $toast.success('You did it!');
const teacherAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user.isdocente) {
    router.push('/events');
    console.log('No es docente');
  } else {  
    return true;
  }
}
instance.dismiss();
$toast.clear()

export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
      formData: {
        user: '',
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        type: '',
      },
    };
  },
  methods: {
    submitEvent() {
      const { title, description, eventDate, eventTime, type } = this.formData;
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const eventPayload = {
        user: storedUser._id,
        title,
        description,
        eventDate: eventDateTime.toISOString(),
        type,
        active: true,
        visualizedby: 0,
        aceptedAssistance: [],
      };

      fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      })
        .then((response) => {
          if (response.ok) {
            $toast.success('Evento subido exitosamente');
            this.resetForm();
          } else {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
        })
        .catch((error) => {
          $toast.error('Error al subir el evento: ' + error.message);
        });
      
    },
    resetForm() {
      this.formData = {
        user: '',
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        type: '',
      };
    },
  },
  mounted() {
    // Logged();
    teacherAuth();

  },



};
</script>

<style scoped>

.main-container {
  background-color: rgb(216, 216, 216); /* Fondo gris */

  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
}

.pregunta {
  border-bottom: 1px solid #ccc;

}
.eventos-contenedor {
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  width: 800px;
  height: 600px;
}
#formulario-evento {
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.campo {
  margin-bottom: 15px;
}

.boton-azul {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.boton-azul:hover {
  background-color: #0056b3;
}
</style>