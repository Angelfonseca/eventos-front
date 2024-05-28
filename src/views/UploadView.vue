<template>
  <BaseLayout>
    <div>
      <h2>Cargar Archivos PDF</h2>
      <input type="file" ref="fileInput" @change="handleFileChange" accept=".pdf" />
      <button @click="uploadFile">Subir PDF</button>
      <div v-if="message" :class="messageType">{{ message }}</div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '../layout/BaseLayout.vue';
import { uploadFile } from "../upload.js";

export default {
  data() {
    return {
      selectedFile: null,
      message: null,
      messageType: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      if (!this.selectedFile) {
        this.showMessage("Por favor, selecciona un archivo PDF.", "error");
        return;
      }

      uploadFile(this.selectedFile)
        .then((response) => {
          this.showMessage(response, "success");
        })
        .catch((error) => {
          this.showMessage("Error al subir el archivo.", "error");
        });
    },
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
    },
  },
};
</script>

<style>
.error {
  color: red;
}

.success {
  color: green;
}
</style>
