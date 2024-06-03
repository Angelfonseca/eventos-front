<template>
  <main>
    <footer class="footer">
      <div class="texto-izquierda">
        © Losklk <br>
        Email: L201050207@pabellon.tecnm.mx <br>
        Tel: 4495026831
      </div>
      <div class="imagen-derecha">
        <img src="../assets/footer.png" alt="FooterImg">
      </div>
    </footer>
  </main>
</template>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px; /* Reduced padding for a smaller footer */
  background-color: #3c78e7; /* Add background color if needed */
  border-top: 1px solid #ddd; /* Optional border */
}

.texto-izquierda {
  flex: 1;
  padding: 5px; /* Reduced padding */
  font-size: 0.9rem; /* Smaller font size */
  line-height: 1.2; /* Reduced line height for compact text */
}

.imagen-derecha {
  width: 100px; /* Reduced width for a smaller image */
  margin: 0; /* Removed margin to make it more compact */
}

body {
  overflow-x: hidden;
}
</style>
