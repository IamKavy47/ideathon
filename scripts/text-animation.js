// Include GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation for "about-us-txt"
gsap.fromTo(
  ".about-us-txt",
  { opacity: 0 }, // Starting state (y-axis for sliding up)
  { opacity: 1, duration: 1.5, scrollTrigger: {
      trigger: ".about-us-txt",
      start: "top 80%", // When the element enters the viewport
      end: "top 60%",   // End point of the animation
      scrub: true, 
    },
  }
);

// Animation for "about-us-para"
gsap.fromTo(
  ".about-us-para",
  { opacity: 0 }, // Starting state (y-axis for sliding up)
  { opacity: 1, duration: 1.5, scrollTrigger: {
      trigger: ".about-us-para",
      start: "top 80%", // When the element enters the viewport
      end: "top 60%",   // End point of the animation
      scrub: true,      // Smooth scrub effect
    },
  }
);

