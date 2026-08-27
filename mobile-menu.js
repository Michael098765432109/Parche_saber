// mobile-menu.js — delegación de eventos, no depende de ningún botón específico
(function () {
  'use strict';

  function isOpen() {
    return document.body.classList.contains('sidebar-open');
  }

  function openSidebar() {
    document.body.classList.add('sidebar-open');
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
  }

  // Delegación sobre document: detecta el elemento tocado por su id
  function handleTap(e) {
    var t = e.target;

    // Busca el botón más cercano con id relevante (por si el toque cae en un hijo)
    var btn = t.closest
      ? (t.closest('#navMobileBtn') || t.closest('#sidebarCloseBtn') || t.closest('#sidebarOverlay'))
      : null;

    if (!btn) {
      // Fallback para navegadores sin closest
      var id = t.id || (t.parentElement && t.parentElement.id) || '';
      if (id === 'navMobileBtn')      { e.preventDefault(); isOpen() ? closeSidebar() : openSidebar(); return; }
      if (id === 'sidebarCloseBtn')   { e.preventDefault(); closeSidebar(); return; }
      if (id === 'sidebarOverlay')    { e.preventDefault(); closeSidebar(); return; }
      return;
    }

    e.preventDefault();
    if (btn.id === 'navMobileBtn')    { isOpen() ? closeSidebar() : openSidebar(); return; }
    if (btn.id === 'sidebarCloseBtn') { closeSidebar(); return; }
    if (btn.id === 'sidebarOverlay')  { closeSidebar(); return; }
  }

  // Cierra al tocar un navbtn dentro del sidebar
  function handleNavClick(e) {
    var t = e.target;
    var navBtn = t.closest ? t.closest('.navbtn') : null;
    if (navBtn && document.getElementById('sidebar') && document.getElementById('sidebar').contains(navBtn)) {
      setTimeout(closeSidebar, 60);
    }
  }

  // Cierra con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  // touchstart en el overlay para respuesta inmediata en iOS
  document.addEventListener('touchstart', function (e) {
    var t = e.target;
    var overlay = t.closest ? t.closest('#sidebarOverlay') : (t.id === 'sidebarOverlay' ? t : null);
    if (overlay) { e.preventDefault(); closeSidebar(); }
  }, { passive: false });

  document.addEventListener('touchend', handleTap, { passive: false });
  document.addEventListener('click',    handleTap);
  document.addEventListener('click',    handleNavClick);

  window.closeMobileSidebar = closeSidebar;
  window.openMobileSidebar  = openSidebar;
})();
