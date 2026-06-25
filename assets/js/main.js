/* HN Transportes — interações do site. Sem dependências de build; carrega o Google Maps apenas após consentimento de cookies. */
(function () {
  "use strict";
  var body = document.body;

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("navtoggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (open) {
        var first = nav.querySelector("a, button");
        if (first) first.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("nav-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ---------- Header fixo com sombra ---------- */
  var header = document.querySelector(".header");
  var totop = document.getElementById("totop");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      // Histerese: aumentar/encolher em limiares diferentes (>80 / <20) evita o
      // "tremor" no ponto de transição — encolher o header desloca o scroll e, com
      // um único limiar, o estado oscilava em loop.
      if (y > 80) header.classList.add("is-stuck");
      else if (y < 20) header.classList.remove("is-stuck");
    }
    if (totop) totop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (totop) {
    totop.addEventListener("click", function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---------- Logótipo → topo da página ---------- */
  var brand = document.querySelector(".brand");
  if (brand && (brand.getAttribute("href") || "").charAt(0) === "#") {
    brand.addEventListener("click", function (e) {
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      if (window.history && location.hash) history.replaceState(null, "", location.pathname + location.search);
    });
  }

  /* ---------- Animações de entrada ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Navegação ativa por secção ---------- */
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  var sections = [];
  navLinks.forEach(function (l) {
    var id = l.getAttribute("href").slice(1);
    var sec = id && document.getElementById(id);
    if (sec) sections.push({ link: l, sec: sec });
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          var match = sections.filter(function (s) { return s.sec === en.target; })[0];
          if (match) match.link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s.sec); });
  }

  /* ---------- Lightbox da galeria ---------- */
  var gallery = document.getElementById("gallery");
  var lb = document.getElementById("lightbox");
  if (gallery && lb) {
    var lbImg = document.getElementById("lb-img");
    var btnClose = document.getElementById("lb-close");
    var btnPrev = document.getElementById("lb-prev");
    var btnNext = document.getElementById("lb-next");
    var triggers = Array.prototype.slice.call(gallery.querySelectorAll("button"));
    var items = triggers.map(function (b) {
      var img = b.querySelector("img");
      return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
    });
    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      lbImg.setAttribute("src", it.src);
      lbImg.setAttribute("alt", it.alt);
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add("is-open");
      body.style.overflow = "hidden";
      btnClose.focus();
    }
    function close() {
      lb.classList.remove("is-open");
      body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    triggers.forEach(function (b, i) {
      b.addEventListener("click", function () { open(i); });
    });
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", function () { show(current - 1); });
    btnNext.addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "Tab") {
        // mantém o foco dentro do diálogo (3 controlos)
        var f = [btnClose, btnPrev, btnNext];
        var idx = f.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? (idx <= 0 ? f.length - 1 : idx - 1) : (idx === f.length - 1 ? 0 : idx + 1);
        f[next].focus();
      }
    });
  }

  /* ---------- Consentimento de cookies + mapa Google ---------- */
  var CK = "hn-cookie-consent";
  var bar = document.getElementById("cookiebar");
  var mapBox = document.getElementById("map-embed");

  function loadMap() {
    if (!mapBox || mapBox.querySelector("iframe")) return;
    var url = mapBox.getAttribute("data-maps");
    if (!url) return;
    var ph = document.getElementById("map-placeholder");
    var ifr = document.createElement("iframe");
    ifr.src = url;
    ifr.title = "Mapa da localização da HN Transportes (Google Maps)";
    ifr.loading = "lazy";
    ifr.allowFullscreen = true;
    ifr.referrerPolicy = "no-referrer-when-downgrade";
    if (ph) ph.remove();
    mapBox.appendChild(ifr);
  }
  function setConsent(v) { try { localStorage.setItem(CK, v); } catch (e) {} }
  function getConsent() { try { return localStorage.getItem(CK); } catch (e) { return null; } }
  function acceptCookies() { setConsent("accepted"); if (bar) bar.hidden = true; loadMap(); }
  function rejectCookies() { setConsent("rejected"); if (bar) bar.hidden = true; }

  var consent = getConsent();
  if (consent === "accepted") loadMap();
  else if (consent !== "rejected" && bar) bar.hidden = false;

  var elAccept = document.getElementById("cookie-accept");
  var elReject = document.getElementById("cookie-reject");
  var elMapAccept = document.getElementById("map-accept");
  var elSettings = document.getElementById("cookie-settings");
  if (elAccept) elAccept.addEventListener("click", acceptCookies);
  if (elReject) elReject.addEventListener("click", rejectCookies);
  if (elMapAccept) elMapAccept.addEventListener("click", acceptCookies);
  if (elSettings) elSettings.addEventListener("click", function (e) { e.preventDefault(); if (bar) bar.hidden = false; });
})();
