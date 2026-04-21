(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    document.addEventListener("click", function (e) {
      if (toggle.contains(e.target)) return;
      if (nav.contains(e.target)) {
        if (e.target.closest && e.target.closest("a")) setOpen(false);
        return;
      }
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) setOpen(false);
    });
  }

  function initLogoFallback() {
    document.querySelectorAll(".site-logo img").forEach(function (img) {
      function applyFallback() {
        var link = img.closest(".site-logo");
        if (!link || link.classList.contains("site-logo--text")) return;
        img.remove();
        link.classList.add("site-logo--text");
        link.innerHTML = "<span>Dragon Money</span>";
      }

      if (img.complete && img.naturalWidth === 0) {
        applyFallback();
        return;
      }

      img.addEventListener("error", applyFallback);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initLogoFallback();
  });
})();
