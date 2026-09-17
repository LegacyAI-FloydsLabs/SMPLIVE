/* TVDS — capability-first vertical selection (Three-Vertical Device Standard v1.0)
   Fine pointer + hover => desktop (touchscreen laptops are desktops).
   Touch-primary => mobile or tablet by smallest viewport dimension (+ iPad shim).
   Manual override persisted in localStorage('tvds-vertical'). Debounce + hysteresis
   on resize; swap only on class change. Shared state untouched (static site). */
(function () {
  var KEY = 'tvds-vertical';
  var THEME_KEY = 'simple-man-theme';
  var doc = document.documentElement;

  function savedTheme() {
    try { var v = localStorage.getItem(THEME_KEY); return (v === 'light' || v === 'dark') ? v : null; }
    catch (e) { return null; }
  }

  function systemTheme() {
    try { return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
    catch (e) { return 'dark'; }
  }

  function applyTheme(theme) {
    doc.setAttribute('data-theme', theme);
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    var isDark = theme === 'dark';
    toggle.textContent = isDark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  function classify() {
    try {
      var fine = matchMedia('(pointer: fine)').matches;
      var hover = matchMedia('(hover: hover)').matches;
      if (fine && hover) return 'desktop';                       // rule 1
      var smallest = Math.min(screen.width, screen.height, innerWidth, innerHeight);
      // iPad shim: iPadOS Safari reports a "Macintosh" (desktop) UA. Real iPhones
      // say "iPhone" and must NEVER match — /Mac/ alone catches "like Mac OS X"
      // in every iPhone UA (bug found on real glass 2026-08-06).
      var iPadShim = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
      if (iPadShim) return 'tablet';
      return smallest >= 600 ? 'tablet' : 'mobile';              // rule 2
    } catch (e) { return 'desktop'; }
  }

  function stored() {
    try { var v = localStorage.getItem(KEY); return (v === 'mobile' || v === 'tablet' || v === 'desktop') ? v : null; }
    catch (e) { return null; }
  }

  function apply(v) {
    if (doc.getAttribute('data-vertical') === v) return;
    doc.setAttribute('data-vertical', v);
    var sw = document.querySelector('.tvds-switch');
    if (sw) sw.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.v === v));
    });
  }

  function fromUrl() {
    try {
      var v = new URLSearchParams(location.search).get('tvds');
      return (v === 'mobile' || v === 'tablet' || v === 'desktop') ? v : null;
    } catch (e) { return null; }
  }

  // initial: URL param (per-load QA/preview) > stored override > capability
  apply(fromUrl() || stored() || classify());
  applyTheme(savedTheme() || systemTheme());

  // resize / orientation: debounce 250ms + only swap on class change; overrides stick
  var t;
  addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () { if (!stored() && !fromUrl()) apply(classify()); }, 250);
  }, { passive: true });

  // override widget
  addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.className = 'theme-toggle';
    themeToggle.addEventListener('click', function () {
      var next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      applyTheme(next);
    });
    document.body.appendChild(themeToggle);
    applyTheme(doc.getAttribute('data-theme') || systemTheme());

    var sw = document.createElement('div');
    sw.className = 'tvds-switch';
    sw.setAttribute('role', 'group');
    sw.setAttribute('aria-label', 'Layout preview');
    ['mobile', 'tablet', 'desktop'].forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = v[0].toUpperCase(); b.title = v; b.dataset.v = v;
      b.setAttribute('aria-pressed', String(doc.getAttribute('data-vertical') === v));
      b.addEventListener('click', function () {
        var cur; try { cur = localStorage.getItem(KEY); } catch (e) {}
        if (cur === v) { try { localStorage.removeItem(KEY); } catch (e) {} apply(classify()); }
        else { try { localStorage.setItem(KEY, v); } catch (e) {} apply(v); }
      });
      sw.appendChild(b);
    });
    document.body.appendChild(sw);

    // mobile bottom nav (injected so all 15 pages get it without markup edits)
    var nav = document.createElement('nav');
    nav.className = 'tvds-bottomnav';
    nav.setAttribute('aria-label', 'Primary');
    var here = location.pathname.split('/').pop() || 'index.html';
    var items = [
      ['index.html', 'Home', 'M3 12 L14 3 L25 12 M5 12 V25 H23 V12'],
      ['services.html', 'Services', 'M14 4 C 9 11 9 16 14 22 C 19 16 19 11 14 4 Z'],
      ['areas.html', 'Areas', 'M14 3 C9 3 5 7 5 12 C5 18 14 25 14 25 C14 25 23 18 23 12 C23 7 19 3 14 3 Z M14 14 A2.5 2.5 0 1 0 14 9 A2.5 2.5 0 0 0 14 14'],
      ['contact.html', 'Contact', 'M4 6 H24 V22 H4 Z M4 7 L14 15 L24 7']
    ];
    items.forEach(function (it) {
      var a = document.createElement('a');
      a.href = it[0];
      if (here === it[0]) a.className = 'current';
      a.innerHTML = '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="' + it[2] + '"/></svg>' + it[1];
      nav.appendChild(a);
    });
    var call = document.createElement('a');
    call.href = 'tel:7658608667'; call.className = 'call';
    call.innerHTML = '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4 L11 4 L13 10 L10 12 C11.5 15 13 16.5 16 18 L18 15 L24 17 L24 22 C24 23 23 24 22 24 C13 23.5 4.5 15 4 6 C4 5 5 4 6 4 Z"/></svg>Call';
    nav.appendChild(call);
    document.body.appendChild(nav);
  });
})();
