<template>
  <BaseLayout>
    <div class="main-container">
      <h1 id = "titulo">NUEVO EVENTO</h1>
      <section class="nuevo-evento">
        <div class="eventos-contenedor">
          <form @submit.prevent="submitEvent" id="formulario-evento">
            <div class="campo">
              <label for="title" class = "preg">Título:</label>
              <input type="text" v-model="formData.title" id="title" name="title" required class="pregunta">
            </div>
            <div class="campo">
              <label for="description" class = "preg">Descripción:</label>
              <textarea v-model="formData.description" id="description" name="description" required
                class="pregunta"></textarea>
            </div>
            <div class="campo">
              <label for="eventDate" class = "preg">Fecha del Evento:</label>
              <input type="date" v-model="formData.eventDate" id="eventDate" name="eventDate" required class="pregunta">
            </div>
            <div class="campo">
              <label for="eventTime" class = "preg">Hora del Evento:</label>
              <input type="time" v-model="formData.eventTime" id="eventTime" name="eventTime" required class="pregunta">
            </div>
            <div class="campo">
              <label class = "preg">Para:</label>
              <div class="checkbox-group">
                <input type="checkbox" id="ITIC" class="checkbox" v-model="formData.designedfor" value="ITIC">
                <label for="designedfor-ITIC">ITIC</label>
                <input type="checkbox" id="Mecatronica" class="checkbox" v-model="formData.designedfor" value="Mecatronica">
                <label for="Mecatronica">Mecatronica</label>
                <input type="checkbox" id="Logistica" class="checkbox" v-model="formData.designedfor" value="Logistica">
                <label for="Logistica">Logistica</label>
                <input type="checkbox" id="Industrial" class="checkbox" v-model="formData.designedfor" value="Industrial">
                <label for="Industrial">Industrial</label>
                <input type="checkbox" id="Getion" class="checkbox" v-model="formData.designedfor" value="Getion">
                <label for="Getion">Gestión Empresarial</label>
              </div>
            </div>
            <button type="submit" class="boton-azul">Crear Evento</button>
          </form>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '../layout/BaseLayout.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import router from '../router';

const $toast = useToast();

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
        designedfor: [],
      },
    };
  },
  methods: {
    submitEvent() {
      const { title, description, eventDate, eventTime, designedfor } = this.formData;
      const eventDateTime = new Date(`${eventDate}T${eventTime}`);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const eventPayload = {
        user: storedUser._id,
        title,
        description,
        eventDate: eventDateTime.toISOString(),
        designedfor,
        active: true,
        visualizedby: 0,
        aceptedAssistance: [],
      };
      if (!title || !description || !eventDate || !eventTime || !designedfor.length) {
        $toast.error('Por favor, llena todos los campos');
        return;
      }

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
        designedfor: [],
      };
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isdocente) {
      router.push('/events');
      $toast.error('No tienes permisos para acceder a esta página.');
    }
  },
};
</script>

<style scoped>
#descripcion {
  height: 100px;
  max-height: 200px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.main-container {
  background-color: rgb(216, 216, 216);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  flex-direction: column;
}

.campo {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.preg {
  font-size: 1.2rem;
  font-weight: bold;
}
.pregunta {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

#description {
  width: 75%;
}

#title {
  width: 55%;
}

#titulo {
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.eventos-contenedor {
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  width: 800px;
  height: min-content;
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
  border: none;
  cursor: pointer;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
}

.boton-azul:hover {
  background-color: #0056b3;
}
</style>
