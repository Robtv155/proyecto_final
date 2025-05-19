document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.textContent = '🌙';
  btn.id = 'modo_btn';
  btn.style.position = 'fixed';
  btn.style.top = '1rem';
  btn.style.right = '1rem';
  btn.style.zIndex = '1000';

  document.body.appendChild(btn);

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
