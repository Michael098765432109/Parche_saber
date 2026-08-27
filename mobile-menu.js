// mobile-menu.js — control del sidebar en móvil, independiente de app.js
(function () {
  'use strict';

  function isOpen() {
    return document.body.classList.contains('sidebar-open');
  }

  function open() {
    document.body.classList.add('sidebar-open');
    var btn = document.getElementById('navMobileBtn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    document.body.classList.remove('sidebar-open');
    var btn = document.getElementById('navMobileBtn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggle() {
    isOpen() ? close() : open();
  }

  function bind() {
    var menuBtn = document.getElementById('navMobileBtn');
    var closeBtn = document.getElementById('sidebarCloseBtn');
    var overlay = document.getElementById('sidebarOverlay');
    var navList = document.getElementById('navList');

    if (menuBtn) {
      // Elimina listeners anteriores clonando el nodo
      var fresh = menuBtn.cloneNode(true);
      menuBtn.parentNode.replaceChild(fresh, menuBtn);
      fresh.addEventListener('touchend', function (e) {
        e.preventDefault();
        toggle();
      }, { passive: false });
      fresh.addEventListener('click', function (e) {
        e.preventDefault();
        toggle();
      });
    }

    if (closeBtn) {
      var freshClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(freshClose, closeBtn);
      freshClose.addEventListener('touchend', function (e) {
        e.preventDefault();
        close();
      }, { passive: false });
      freshClose.addEventListener('click', function (e) {
        e.preventDefault();
        close();
      });
    }

    if (overlay) {
      overlay.addEventListener('touchend', function (e) {
        e.preventDefault();
        close();
      }, { passive: false });
      overlay.addEventListener('click', close);
    }

    if (navList) {
      navList.addEventListener('click', function () {
        setTimeout(close, 80);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // Ejecuta bind ahora (por si el DOM ya está listo)
  // y también cuando el app muestra el panel autenticado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // Observa cuando #app deja de tener la clase "hidden"
  // para re-bindear (el botón puede haber sido reemplazado por app.js)
  var appEl = document.getElementById('app');
  if (appEl && typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' && !appEl.classList.contains('hidden')) {
          bind();
        }
      });
    });
    observer.observe(appEl, { attributes: true });
  }

  // Expone close globalmente para que los navbtn de app.js puedan usarlo
  window.closeMobileSidebar = close;
  window.openMobileSidebar = open;
})();
