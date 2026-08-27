// mobile-menu.js v4 — sidebar y botón siempre en el DOM, lógica mínima
(function () {
  'use strict';

  var btn     = document.getElementById('navMobileBtn');
  var overlay = document.getElementById('sidebarOverlay');

  function open()  { document.body.classList.add('sidebar-open');    btn.setAttribute('aria-expanded','true');  }
  function close() { document.body.classList.remove('sidebar-open'); btn.setAttribute('aria-expanded','false'); }
  function toggle(){ document.body.classList.contains('sidebar-open') ? close() : open(); }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', close);
  overlay.addEventListener('touchstart', function(e){ e.preventDefault(); close(); }, { passive: false });

  document.addEventListener('click', function(e){
    var t = e.target;
    if (!t) return;
    if (t.id === 'sidebarCloseBtn' || (t.parentElement && t.parentElement.id === 'sidebarCloseBtn')) { close(); return; }
    if (t.closest && t.closest('.navbtn')) { close(); return; }
  });

  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

  window.openMobileSidebar  = open;
  window.closeMobileSidebar = close;
})();
