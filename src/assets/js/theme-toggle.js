(function () {
  var KEY = 'prototype-theme';
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  function updateToggle() {
    var isDark = document.body.classList.contains('dark-mode');
    btn.setAttribute('aria-checked', isDark ? 'true' : 'false');
  }

  updateToggle();

  btn.addEventListener('click', function () {
    var isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem(KEY, 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem(KEY, 'dark');
    }
    updateToggle();
  });
})();
