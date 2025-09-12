document.addEventListener("DOMContentLoaded", () => {
  const evOne = document.querySelector(".ev-one");
  const hScroll = document.querySelector(".h-scroll");
  const eventsLoader = document.querySelector(".events-loader");
  
  const evTimeline = gsap.timeline();

  evTimeline
    .fromTo(
      evOne, // Animation for ev-one
      {delay:1, opacity: 0 }, // Start with 0 opacity
      { opacity: 1, duration: 1.5, ease: "power3.out" } // Fade in ev-one
    )
    .fromTo(
      hScroll, // Animation for h-scroll
      {delay:1, opacity: 0 }, // Start with 0 opacity
      { opacity: 1, duration: 1, ease: "power3.out" }, // Fade in h-scroll
      "-=0.5" // Overlap the animations slightly
    )
    .to(
      ".ev-one, .h-scroll", // Fade out both ev-one and h-scroll
      { opacity: 0, duration: 0.5, ease: "power3.out", delay: 1 }
    )
    .to(
      eventsLoader, // Fade out events-loader and move it upward
      { opacity: 0, duration: 1, ease: "power3.out" }
    )
    .set(eventsLoader, { display: "none" }); // Set display to none after animations
});
