function uploadFile(file) {
    const formData = new FormData();
    formData.append("archivo", file);
  
    return fetch("/subirpdf", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  
  export { uploadFile };