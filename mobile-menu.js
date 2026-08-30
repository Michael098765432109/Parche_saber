// mobile-menu.js v6
(function () {
  'use strict';

  var btn = document.getElementById('navMobileBtn');
  var overlay = document.getElementById('sidebarOverlay');
  var sidebar = document.getElementById('sidebar');

  if (!btn || !overlay || !sidebar) {
    return;
  }

  function isMobileView() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function syncVisibility() {
    var shouldHide = document.body.classList.contains('auth-active') || !isMobileView();
    btn.setAttribute('aria-hidden', shouldHide ? 'true' : 'false');
    btn.style.display = shouldHide ? 'none' : 'flex';
    if (!isMobileView() && document.body.classList.contains('sidebar-open')) {
      document.body.classList.remove('sidebar-open');
    }
  }

  function open() {
    if (document.body.classList.contains('auth-active') || !isMobileView()) return;
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (document.body.classList.contains('auth-active')) return;
    if (document.body.classList.contains('sidebar-open')) {
      close();
    } else {
      open();
    }
  }

  btn.addEventListener('click', toggle);
  btn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    toggle(e);
  }, { passive: false });

  overlay.addEventListener('touchstart', function (e) {
    e.preventDefault();
    close();
  }, { passive: false });
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target) return;
    if (target.id === 'sidebarCloseBtn' || (target.parentElement && target.parentElement.id === 'sidebarCloseBtn')) {
      close();
      return;
    }
    if (target.closest && target.closest('.navbtn')) {
      close();
    }
  });

  window.addEventListener('resize', function () {
    syncVisibility();
    if (!isMobileView()) {
      close();
    }
  });

  syncVisibility();

  window.openMobileSidebar = open;
  window.closeMobileSidebar = close;
})();
