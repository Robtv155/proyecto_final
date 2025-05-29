// Función para obtener el token CSRF de la cookie (requisito Django)
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // ¿Esta cookie comienza con el nombre que buscamos?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener('DOMContentLoaded', () => {
  const valoracionDiv = document.querySelector('.valoracion');
  if (!valoracionDiv) return;

  const estrellas = valoracionDiv.querySelectorAll('.estrella');
  const postId = valoracionDiv.getAttribute('data-post-id');

  // Marca visualmente las estrellas hasta la puntuación guardada si la hubiera
  let puntuacionSeleccionada = 0;

  const actualizarEstrellas = (puntuacion) => {
    estrellas.forEach((estrella, i) => {
      if (i < puntuacion) {
        estrella.style.color = 'gold';
      } else {
        estrella.style.color = 'black';
      }
    });
  };

  estrellas.forEach(estrella => {
    estrella.style.cursor = 'pointer';

    estrella.addEventListener('mouseover', () => {
      const valor = parseInt(estrella.getAttribute('data-puntuacion'));
      actualizarEstrellas(valor);
    });

    estrella.addEventListener('mouseout', () => {
      actualizarEstrellas(puntuacionSeleccionada);
    });

    estrella.addEventListener('click', () => {
      puntuacionSeleccionada = parseInt(estrella.getAttribute('data-puntuacion'));
      actualizarEstrellas(puntuacionSeleccionada);
      console.log(`Has votado ${puntuacionSeleccionada} estrellas para post ${postId}`);

      // Enviar la valoración al servidor usando fetch
      fetch(`/guardar_valoracion/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ puntuacion: puntuacionSeleccionada })
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          alert(`Valoración guardada: ${data.puntuacion} estrellas`);
        } else if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert('Error desconocido al guardar la valoración.');
        }
      })
      .catch(error => {
        console.error('Error en fetch:', error);
        alert('Error al conectar con el servidor.');
      });
    });
  });

  // Inicializa sin puntuación marcada
  actualizarEstrellas(puntuacionSeleccionada);
});
