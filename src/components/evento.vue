<template>
  <div class="evento" @click="redirectToEvent" :key="evento._id">
    <div class="imagen">
      <img src="/eventimg.jpg" alt="Imagen genérica de evento">
    </div>
    <div class="contenido">
      <h3 class="titulo">{{ evento.title }}</h3>
      <p class="descripcion">{{ evento.description }}</p>
      <p><strong>Fecha:</strong> {{ formatDate(evento.eventDate) }}</p>
      <p><strong>Hora:</strong> {{ formatTime(evento.eventDate) }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const evento = ref(props.evento);

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleTimeString(undefined, options);
    };

    watch(() => props.evento, (newValue) => {
      evento.value = newValue;
    });


    return {
      formatDate,
      formatTime,
    };
  },
};
</script>
<style scoped>
.titulo {
  font-weight: bold;
  font-size: 1.15rem; /* Ajusta el tamaño del título */
}
</style>