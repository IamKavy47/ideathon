// GSAP Setup
const overlay = document.querySelector("[data-overlay]");
const openButton = document.querySelector(".navbar-right .nav-link");
const closeButton = document.querySelector("[data-close]");

// Open Menu
openButton.addEventListener("click", (e) => {
  e.preventDefault();

  gsap.to(overlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.6,
    ease: "power2.inOut",
    onStart: () => {
      overlay.style.pointerEvents = "auto"; // Enable interaction during animation
    },
  });
});
// Close Menu
closeButton.addEventListener("click", () => {
  gsap.to(overlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Animates closing from top to bottom
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      overlay.style.pointerEvents = "none"; // Disable interaction after animation
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu-links-new .text");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
