// mobile-menu.js v5
(function () {
  'use strict';

  var btn     = document.getElementById('navMobileBtn');
  var overlay = document.getElementById('sidebarOverlay');
  var sidebar = document.getElementById('sidebar');

  function open() {
    document.body.classList.add('sidebar-open');
    overlay.style.display = 'block';
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    document.body.classList.remove('sidebar-open');
    overlay.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
  }

  function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.contains('sidebar-open') ? close() : open();
  }

  // Un solo evento evita que los dispositivos táctiles ejecuten toggle dos veces.
  btn.addEventListener('click', toggle);

  overlay.addEventListener('touchstart', function (e) { e.preventDefault(); close(); }, { passive: false });
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Cerrar al tocar cualquier navbtn o el botón de cerrar
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t) return;
    if (t.id === 'sidebarCloseBtn' || (t.parentElement && t.parentElement.id === 'sidebarCloseBtn')) { close(); return; }
    if (t.closest && t.closest('.navbtn')) { close(); return; }
  });

  window.openMobileSidebar  = open;
  window.closeMobileSidebar = close;
})();
