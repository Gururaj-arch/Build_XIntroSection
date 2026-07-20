document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.querySelector("button.open-menu");
  const closeMenuBtn = document.querySelector("button.close-menu");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  // -------------------------
  // Mobile Menu
  // -------------------------

  function openMenu() {
    nav.classList.add("active");
    overlay.classList.add("active");

    openMenuBtn.style.display = "none";
    closeMenuBtn.style.display = "block";
  }

  function closeMenu() {
    nav.classList.remove("active");
    overlay.classList.remove("active");

    openMenuBtn.style.display = "block";
    closeMenuBtn.style.display = "none";

    navLinks.forEach(link => {
      link.classList.remove("link-open");

      const btn = link.querySelector(".dropdown-btn");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  openMenuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // -------------------------
  // Dropdown
  // -------------------------

  navLinks.forEach(link => {

    const btn = link.querySelector(".dropdown-btn");

    if (!btn) return;

    btn.addEventListener("click", function (e) {

      e.preventDefault();
      e.stopPropagation();

      const isOpen = link.classList.contains("link-open");

      navLinks.forEach(item => {
        if (item !== link) {
          item.classList.remove("link-open");

          const b = item.querySelector(".dropdown-btn");
          if (b) {
            b.setAttribute("aria-expanded", "false");
          }
        }
      });

      if (isOpen) {
        link.classList.remove("link-open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        link.classList.add("link-open");
        btn.setAttribute("aria-expanded", "true");
      }

    });

  });

  // -------------------------
  // Click Outside
  // -------------------------

  document.addEventListener("click", function (e) {

    if (e.target.closest(".nav-link")) return;

    navLinks.forEach(link => {
      link.classList.remove("link-open");

      const btn = link.querySelector(".dropdown-btn");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    });

  });

  // -------------------------
  // Desktop Resize
  // -------------------------

  window.addEventListener("resize", () => {

    if (window.innerWidth >= 768) {
      nav.classList.remove("active");
      overlay.classList.remove("active");

      openMenuBtn.style.display = "";
      closeMenuBtn.style.display = "";
    }

  });

});