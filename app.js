document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.querySelector("button.open-menu");
  const closeMenuBtn = document.querySelector("button.close-menu");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // ---- Mobile menu open/close ----
  const openMenu = () => {
    nav.classList.add("active");
    overlay.classList.add("active");
    openMenuBtn.style.display = "none";
    closeMenuBtn.style.display = "block";
  };

  const closeMenu = () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    openMenuBtn.style.display = "block";
    closeMenuBtn.style.display = "none";

    // Also collapse any open dropdowns when the menu closes
    navLinks.forEach((link) => link.classList.remove("link-open"));
  };

  openMenuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // ---- Dropdown toggle (click only, not hover) ----
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentLink = btn.closest(".nav-link");
      const isActive = parentLink.classList.contains("link-open");

      // Close any other open dropdowns first
      navLinks.forEach((link) => {
        if (link !== parentLink) link.classList.remove("link-open");
      });

      parentLink.classList.toggle("link-open", !isActive);
      btn.setAttribute("aria-expanded", String(!isActive));
    });
  });

  // Close dropdowns when clicking outside of them (desktop)
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-link")) {
      navLinks.forEach((link) => link.classList.remove("link-open"));
      dropdownBtns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    }
  });

  // Reset mobile menu state on resize to desktop
  const desktopMediaQuery = window.matchMedia("(min-width: 768px)");
  desktopMediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      nav.classList.remove("active");
      overlay.classList.remove("active");
      openMenuBtn.style.display = "";
      closeMenuBtn.style.display = "";
    }
  });
});
