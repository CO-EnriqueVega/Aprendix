// JS (archivo externo), asegúrate de cargarlo con defer
function goTo(sectionId) {
  // Ocultar todas las pantallas
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Mostrar la pantalla seleccionada
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');

  // Controlar visibilidad del menú superior
  const superiorMenu = document.getElementById('superior');
  if (!superiorMenu) return; // por si el elemento no existe aún

  const hideOn = ['login', 'register'];
  if (hideOn.includes(sectionId)) {
    superiorMenu.classList.add('hidden');
  } else {
    superiorMenu.classList.remove('hidden');
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const activeScreen = document.querySelector('.screen.active');

  console.log("Pantalla activa:", activeScreen ? activeScreen.id : "ninguna");

  // Si estamos en login o register, mostrar mensaje en vez de abrir
  if (activeScreen && (activeScreen.id === 'login' || activeScreen.id === 'register')) {
    alert("Para acceder al menú, Inicia sesión");
    return;
  }

  // Si no estamos en login/register, alternar sidebar
  sidebar.classList.toggle('active');
}


function goBack() {
  // Regresa a la página anterior en el historial
  window.history.back();
  // Alternativa: window.history.go(-1);
}

document.addEventListener('DOMContentLoaded', () => {
  const superiorMenu = document.getElementById('superior');
  const activeScreen = document.querySelector('.screen.active');

  if (superiorMenu && activeScreen) {
    const hideOn = ['login', 'register'];
    if (hideOn.includes(activeScreen.id)) {
      superiorMenu.classList.add('hidden');
    } else {
      superiorMenu.classList.remove('hidden');
    }
  }
});