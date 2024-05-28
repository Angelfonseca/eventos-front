<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'

</script>
<template>
  <header>
    <NavBar></NavBar>
  </header>
  <slot/>
  <main> 
    <Footer></Footer>
  </main>
</template>
<style>

@import url('../assets/estilo.css');
</style>
