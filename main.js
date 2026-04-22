"use strict";

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    navbar.classList.toggle("scrolled", currentScrollY > 50);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
  });
}

// ===== HAMBURGER =====
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.getElementById("overlay");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Toggle menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Close when clicking link
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  // 🔥 NEW: Click outside (overlay)
  overlay.addEventListener("click", function () {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "hidden"; // lock scroll
    document.body.style.overflow = ""; // prevents background scrolling when menu is open
  });
}

// ===== SCROLL ANIMATION =====
function setupScrollAnimation() {
  const elements = document.querySelectorAll(".fade-in");

  function checkScroll() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight - 50) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
}

// ===== Set up Scroll Spy =====
function setupScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  function activateLink() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateLink);
}

// ===== TYPING EFFECT ===== //
function setupTypingEffect() {
  const text = "Hi, I’m Abdan!";
  const element = document.getElementById("typing-text");

  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 80); // speed (lower = faster)
    }
  }

  type();
}


// ===== INIT (ONLY ONE) =====
function init() {
  handleNavbarScroll();
  setupHamburger();
  setupScrollAnimation();
  setupScrollSpy();
  setupTypingEffect();
}

document.addEventListener("DOMContentLoaded", init);