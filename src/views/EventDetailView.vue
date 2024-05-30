<template>
  <div>
    <h1>{{ event.name }}</h1>
    <p><strong>Fecha:</strong> {{ event.date }}</p>
    <p><strong>Lugar:</strong> {{ event.location }}</p>
    <p><strong>Descripción:</strong> {{ event.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
};
</script>
