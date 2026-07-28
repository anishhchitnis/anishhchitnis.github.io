// ============================================================
// Anish Chitnis — portfolio
// Nav behavior, scroll reveals, avatar fallback. No libraries.
// ============================================================

(function () {
  "use strict";

  // ---------- Sticky nav: border on scroll ----------
  const nav = document.getElementById("site-nav");

  function updateNav() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // ---------- Mobile menu ----------
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", function () {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close the menu after tapping a link
  links.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---------- Scroll-reveal animations ----------
  const revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealables.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ---------- Active nav link (scrollspy) ----------
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = links.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  // ---------- Avatar fallback (photo.jpg may not exist yet) ----------
  document.querySelectorAll(".avatar").forEach(function (avatar) {
    const img = avatar.querySelector(".avatar-img");
    if (!img) return;

    function fail() {
      avatar.classList.add("img-failed");
    }

    img.addEventListener("error", fail);
    // the error event may have fired before this script ran
    if (img.complete && img.naturalWidth === 0) fail();
  });
})();
