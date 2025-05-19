document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('modo_btn'); // botón existente en el HTML

  if (!btn) {
    console.warn('Botón modo oscuro no encontrado en el HTML.');
    return;
  }

  // Recuperar preferencia del usuario
  if (localStorage.getItem('modo') === 'oscuro') {
    document.body.classList.add('dark-mode');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const esOscuro = document.body.classList.contains('dark-mode');
    btn.textContent = esOscuro ? '☀️' : '🌙';
    localStorage.setItem('modo', esOscuro ? 'oscuro' : 'claro');
  });
});
