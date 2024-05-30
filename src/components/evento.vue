<template>
  <div class="evento" @click="redirectToEvent" :key="evento._id">
    <div class="imagen">
      <img src="/eventimg.jpg" alt="Imagen genérica de evento">
    </div>
    <div class="contenido">
      <h3 class="titulo">{{ evento.title }}</h3>
      <p class="descripcion">{{ evento.description }}</p>
      <p>Fecha: {{ formatDate(evento.eventDate) }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue'; // Importa 'watch' de Vue

export default {
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const evento = ref(props.evento);

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    // Utiliza watch para observar cambios en la prop 'evento'
    watch(() => props.evento, (newValue) => {
      evento.value = newValue;
    });

    // const redirectToEvent = () => {
    //   const eventId = evento.value._id || '';
    //   if (eventId) {
    //     router.push(`/events/${eventId}`);
    //   } else {
    //     console.error("Evento ID is undefined or null");
    //   }
    // };

    return {
      formatDate,
      // redirectToEvent,
    };
  },
};
</script>

<style scoped>
/* Estilos */
</style>
