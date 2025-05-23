let totalCompra = 0;

// Función para agregar producto y crear la lista
function agrega_producto() {
  let productoInput = document.getElementById("producto");
  let productoText = productoInput.value.trim();
  let cantidadInput = document.getElementById("cantidad");
  let cantidadNumber = parseInt(cantidadInput.value);

  if (productoText === "") {
    alert("Por favor, ingresa un producto válido.");
    return;
  }
  if (
    cantidadInput.value === "" ||
    isNaN(cantidadNumber) ||
    cantidadNumber <= 0
  ) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  let productoList = document.getElementById("lista_productos");
  let li = document.createElement("li");

  let productoInfo = document.createElement("div");
  productoInfo.className = "producto-info";
  productoInfo.innerHTML = productoText + " x " + cantidadNumber;

  let precioInfo = document.createElement("div");
  precioInfo.className = "precio-info";

  let precioInput = document.createElement("input");
  precioInput.id = "unitario";
  precioInput.type = "number";
  precioInput.placeholder = "Precio unidad";
  precioInput.min = "0";
  precioInput.className = "numb2";

  let comprarBtn = document.createElement("button");
  comprarBtn.id = "comprar";
  comprarBtn.textContent = "Comprar";
  comprarBtn.onclick = function () {
    compra_producto();
    animar_carrito();
    productoList.removeChild(li);
  };

  // Función para hacer el ticket
  function compra_producto() {
    let li_ticket = document.createElement("li");
    let precioUnitario = parseFloat(precioInput.value);
    let precioTotal = precioUnitario * cantidadNumber;

    if (
      precioInput.value === "" ||
      isNaN(precioUnitario) ||
      precioUnitario <= 0
    ) {
      alert("Por favor, ingresa un precio válido.");
      return;
    }

    // Total de la compra
    totalCompra += precioTotal;

    let ticketContent = document.createElement("div");
    ticketContent.className = "ticket_info";
    ticketContent.innerHTML =
      productoText +
      " x " +
      cantidadNumber +
      " = " +
      precioTotal.toFixed(2) +
      " €";

    let eliminarBtn = document.createElement("button");
    eliminarBtn.id = "eliminar";
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = function () {
      ticketList.removeChild(li_ticket);
      totalCompra -= precioTotal;
      actualizar_total();
    };

    ticketContent.appendChild(eliminarBtn);
    li_ticket.appendChild(ticketContent);
    let ticketList = document.getElementById("lista_ticket");
    ticketList.appendChild(li_ticket);

    actualizar_total();
  }

  precioInfo.appendChild(precioInput);
  precioInfo.appendChild(comprarBtn);
  li.appendChild(productoInfo);
  li.appendChild(precioInfo);

  productoList.appendChild(li);

  productoInput.value = "";
  cantidadInput.value = "";

  // Llamar a la función para aplicar las traducciones a los nuevos elementos
  aplicar_traducciones();
}

// Función para aplicar traducciones
function aplicar_traducciones() {
  let idioma = document.getElementById("language").value;

  // Actualizar elementos traducidos sin afectar el contenido dinámico
  let productos = document.querySelectorAll(".producto-info");
  productos.forEach(function (producto) {
    if (producto.innerHTML === "") {
      // Evitar cambiar el nombre del producto
      producto.textContent = textos[idioma].añadir_producto;
    }
  });

  let cantidad = document.querySelectorAll(".precio-info input");
  cantidad.forEach(function (input) {
    input.placeholder = textos[idioma].añadir_precio;
  });

  let botonesComprar = document.querySelectorAll("#comprar");
  botonesComprar.forEach(function (boton) {
    boton.textContent = textos[idioma].comprar_boton;
  });
}

// Actualizar el total en el ticket
function actualizar_total() {
  document.getElementById("total").textContent = totalCompra.toFixed(2) + " €";
}

// Animación del carrito
function animar_carrito() {
  let carrito = document.querySelector(".carrito");
  carrito.style.transition = "transform 0.5s ease-in-out";
  carrito.style.transform = "translateX(100px)";

  setTimeout(() => {
    carrito.style.transform = "translateX(0)";
  }, 500);
}

document.getElementById("modo_btn").addEventListener("click", function () {
  document.body.classList.toggle("modo_oscuro");

  if (document.getElementById("modo_btn").textContent == "🌙") {
    document.getElementById("modo_btn").textContent = "☀️";
  } else {
    document.getElementById("modo_btn").textContent = "🌙";
  }
});

/* Traducciones*/

const textos = {
  es: {
    titulo: "Tu Compra",
    contenedor: "Lista de la Compra",
    añadir_producto: "Añadir nuevo producto",
    añadir_cantidad: "Cantidad",
    añadir_boton: "Agregar",
    añadir_precio: "Precio unidad",
    comprar_boton: "Comprar",
    contenedor_ticket: "Ticket de compra",
    eliminar_boton: "Eliminar",
    total: "Total",
  },
  en: {
    titulo: "Your Purchase",
    contenedor: "Shopping List",
    añadir_producto: "Add new product",
    añadir_cantidad: "Quantity",
    añadir_boton: "Add",
    añadir_precio: "Unit price",
    comprar_boton: "Buy",
    contenedor_ticket: "Purchase receipt",
    eliminar_boton: "Delete",
    total: "Total",
  },
  fr: {
    titulo: "Votre Achat",
    contenedor: "Liste de Courses",
    añadir_producto: "Ajouter un nouveau produit",
    añadir_cantidad: "Quantité",
    añadir_boton: "Ajouter",
    añadir_precio: "Prix unitaire",
    comprar_boton: "Acheter",
    contenedor_ticket: "Reçu d'achat",
    eliminar_boton: "Supprimer",
    total: "Total",
  },
  de: {
    titulo: "Dein Einkauf",
    contenedor: "Einkaufsliste",
    añadir_producto: "Neues Produkt hinzufügen",
    añadir_cantidad: "Menge",
    añadir_boton: "Hinzufügen",
    añadir_precio: "Einzelpreis",
    comprar_boton: "Kaufen",
    contenedor_ticket: "Kaufbeleg",
    eliminar_boton: "Löschen",
    total: "Gesamt",
  },
  it: {
    titulo: "Il Tuo Acquisto",
    contenedor: "Lista della Spesa",
    añadir_producto: "Aggiungi nuovo prodotto",
    añadir_cantidad: "Quantità",
    añadir_boton: "Aggiungi",
    añadir_precio: "Prezzo unitario",
    comprar_boton: "Acquistare",
    contenedor_ticket: "Ricevuta d'acquisto",
    eliminar_boton: "Eliminare",
    total: "Totale",
  },
  kl: {
    titulo: "So'moHmeH",
    contenedor: "Qughpu' QeS",
    añadir_producto: "ghojmeH QumwI'",
    añadir_cantidad: "mInDu'",
    añadir_boton: "Qaddo'",
    añadir_precio: "mu'ghom",
    comprar_boton: "HoH",
    contenedor_ticket: "QumwI' paq",
    eliminar_boton: "chu'",
    total: "Qav",
  },
};

// Cambio de idioma
document.getElementById("language").addEventListener("change", function () {
  let idioma = document.getElementById("language").value;

  document.getElementById("titulo").textContent = textos[idioma].titulo;
  document.getElementById("contenedor").textContent = textos[idioma].contenedor;
  document.getElementById("producto").placeholder =
    textos[idioma].añadir_producto;
  document.getElementById("cantidad").placeholder =
    textos[idioma].añadir_cantidad;
  document.getElementById("agregar").textContent = textos[idioma].añadir_boton;
  document.getElementById("unitario").placeholder =
    textos[idioma].añadir_precio;
  document.getElementById("comprar").textContent = textos[idioma].comprar_boton;
  document.getElementById("ticket").textContent =
    textos[idioma].contenedor_ticket;
  document.getElementById("eliminar").textContent =
    textos[idioma].eliminar_boton;
  document.getElementById("totalt").textContent = textos[idioma].total;
});

//Navegación con TAB
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos correctamente dentro de DOMContentLoaded
  const images = document.querySelectorAll(".sub img");
  const modal = document.getElementById("nav-modal");
  const closeModal = document.getElementById("close-modal");
  const options = document.querySelectorAll("#nav-options li");
  let tabPressed = false;

  // 🟢 Función para abrir el modal
  function openModal() {
    modal.style.display = "block";
    options[0].focus();
  }

  // 🔴 Función para cerrar el modal
  function closeModalHandler() {
    modal.style.display = "none";
  }

  // 🟡 Detectar la primera pulsación de Tab y mostrar el modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && !tabPressed) {
      event.preventDefault();
      tabPressed = true;
      openModal();
    } else if (event.shiftKey && event.key === "Tab") {
      event.preventDefault();
      openModal();
    }
  });

  // 🔴 Cerrar modal con Escape o clic en la "X"
  closeModal.addEventListener("click", closeModalHandler);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModalHandler();
  });

  // 🔵 Navegación en la lista con Tab y flechas ↑ ↓
  options.forEach((option, index) => {
    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        options[(index + 1) % options.length].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        options[(index - 1 + options.length) % options.length].focus();
      } else if (event.key === "Enter") {
        navigateTo(option.getAttribute("data-target"));
      }
    });

    option.addEventListener("click", () => {
      navigateTo(option.getAttribute("data-target"));
    });
  });

  // 🟠 Función para enfocar el primer elemento navegable de la sección elegida
  function navigateTo(target) {
    closeModalHandler();
    let section;

    if (target === "header") {
      section = document.querySelector("header");
    } else if (target === "main") {
      section = document.querySelector("main");
    } else if (target === "footer") {
      section = document.querySelector("footer");
    } else {
      section = document.querySelector(`[data-section="${target}"]`);
    }

    if (section) {
      const focusable = section.querySelector(
        "a, button, input, textarea, select"
      );
      if (focusable) focusable.focus();
    }
  }
});
