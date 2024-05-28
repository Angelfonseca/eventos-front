<script setup>
import BaseLayout from '../layout/BaseLayout.vue'
import {Logged} from '../router/index.js'
Logged()
</script>

<template>
  <BaseLayout>
    <main>
      <h1 class="text-center">Welcome about</h1>
      <!-- <div>
      <h1>Subir Archivos</h1>
      <form enctype="multipart/form-data" action="#" method="post">
          <input type="file" name="archivo" id="archivo">
          <input type="submit" value="Subir Archivo">
      </form>
    </div> -->
    </main>
  </BaseLayout>
</template>
