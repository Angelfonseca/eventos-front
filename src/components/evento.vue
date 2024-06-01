<template>
  <div class="evento" @click="redirectToEvent">
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
export default {
  props: {
    evento: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    redirectToEvent() {
      const eventId = this.evento.id;
      if (eventId) {
        this.$router.push(`/events/${eventId}`);
      } else {
        console.error("Evento ID is undefined or null");
      }
    },
  },
};
</script>

<style scoped>
.evento {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 290px;
  /* Limit the maximum width of the component */
  cursor: pointer;
  /* Add cursor pointer to indicate clickable */
}

.imagen {
  text-align: center;
  margin-bottom: 10px;
  width: 227px;
  height: 227px;
}

.contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: break-word;
  /* Allow the text to break into multiple lines */
  box-sizing: border-box;
  flex-grow: 1;
  /* Allow the div to expand vertically */
}

.titulo {
  font-size: 1.5em;
}

.evento h3,
.evento p {
  margin: 5px 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.evento img {
  max-width: 100%;
  height: auto;
}
</style>
