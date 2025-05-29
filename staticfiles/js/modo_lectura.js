document.addEventListener("DOMContentLoaded", () => {
  const btnLectura = document.getElementById("btn-lectura");
  let lecturaActiva = false;

  btnLectura.addEventListener("click", () => {
    lecturaActiva = !lecturaActiva;

    // Elementos a ocultar en modo lectura
    const elementosOcultables = [
      document.querySelector(".navbar"),
      document.querySelector(".imagen_portada"),
      document.querySelector(".carrusel_container"),
      document.querySelector(".seccion_apis"),
      document.querySelector(".footer")
    ];

    elementosOcultables.forEach(elem => {
      if (elem) {
        elem.style.display = lecturaActiva ? "none" : "";
      }
    });

    // Cambiar texto del botón
    btnLectura.textContent = lecturaActiva ? "🔙 Salir del modo lectura" : "📖 Modo lectura";
  });
});
