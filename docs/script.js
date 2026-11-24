(function () {
  "use strict";

  /* Mark JS as running so scroll-reveal hiding applies (no-JS keeps content visible) */
  document.documentElement.classList.add("js");

  /* Theme toggle — persisted, respects system preference on first visit */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var stored = null;
  try { stored = localStorage.getItem("sematin-theme"); } catch (e) { /* storage unavailable */ }
  var initial = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.setAttribute("data-theme", initial);
  if (toggle) {
    toggle.setAttribute("aria-pressed", initial === "dark" ? "true" : "false");
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      try { localStorage.setItem("sematin-theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Marquee — duplicate content for a seamless loop */
  var track = document.getElementById("marquee-track");
  if (track) { track.innerHTML += track.innerHTML; }

  /* Hero mockup typing — cycles through filled template lines */
  var typedEl = document.getElementById("mockup-fill-typed");
  var lines = [
    "Halo Aidil, terima kasih sudah menghubungi kami…",
    "Dengan hormat, saya melamar posisi Frontliner…",
    "✨ Kabar baik! Pendaftaran sudah dibuka…"
  ];
  if (typedEl) {
    var lineIdx = 0, charIdx = 0, deleting = false;
    (function tick() {
      var line = lines[lineIdx];
      if (!deleting) {
        charIdx++;
        typedEl.textContent = line.slice(0, charIdx);
        if (charIdx === line.length) { deleting = true; setTimeout(tick, 1800); return; }
        setTimeout(tick, 34);
      } else {
        charIdx = Math.max(0, charIdx - 4);
        typedEl.textContent = line.slice(0, charIdx);
        if (charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; setTimeout(tick, 500); return; }
        setTimeout(tick, 16);
      }
    })();
  }

  /* Interactive demo — fill the template with the typed variables */
  var form = document.getElementById("demo-form");
  var composer = document.getElementById("demo-composer");
  var copyBtn = document.getElementById("demo-copy");
  var lastFilled = "";
  var template = "Halo {{nama}},\n\nTerima kasih sudah menghubungi kami. Lamaran Anda untuk posisi {{posisi}} sudah kami terima pada {{tanggal}}.\n\nKami akan menghubungi Anda kembali setelah proses seleksi awal selesai.\n\nSalam,\nTim Rekrutmen";

  if (form && composer) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama = (document.getElementById("demo-nama").value || "").trim() || "Nama";
      var posisi = (document.getElementById("demo-posisi").value || "").trim() || "Posisi";
      var tanggal = (document.getElementById("demo-tanggal").value || "").trim() || "Tanggal";
      lastFilled = template
        .replace(/\{\{\s*nama\s*\}\}/g, nama)
        .replace(/\{\{\s*posisi\s*\}\}/g, posisi)
        .replace(/\{\{\s*tanggal\s*\}\}/g, tanggal);
      composer.textContent = "";
      var p = document.createElement("p");
      p.style.margin = "0";
      composer.appendChild(p);
      var i = 0;
      (function type() {
        i = Math.min(lastFilled.length, i + 6);
        p.textContent = lastFilled.slice(0, i);
        if (i < lastFilled.length) { setTimeout(type, 14); }
      })();
      copyBtn.disabled = false;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (!lastFilled) { return; }
      var done = function () {
        copyBtn.textContent = "Tersalin ✓";
        setTimeout(function () { copyBtn.textContent = "Salin hasil"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastFilled).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = lastFilled;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* copy unsupported */ }
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* Bento spotlight — cursor position drives the glow */
  document.querySelectorAll(".spotlight-card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--spot-y", (e.clientY - rect.top) + "px");
    });
  });
})();
