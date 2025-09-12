document.addEventListener("DOMContentLoaded", function () {
    const slideLinks = document.querySelectorAll(".slide-link");
    const oneDescPanel = document.querySelector(".one-desc");
    const closeBtn = document.querySelector(".one-desc-close");
  
    // Elements inside .one-desc
    const descImg = document.querySelector(".desc-img");
    const descText = document.querySelector(".desc-text");
    const titleText = document.querySelector(".title-text");
  
    // PART A: Show/hide
    slideLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const parentSlide = link.closest(".slide");
  
        // Grab the slide data
        const slideTitle = parentSlide.dataset.title; // NEW
        const slideDescription = parentSlide.dataset.desc;
        const slideImagePath = parentSlide.dataset.img;
  
        // Update panel content
        titleText.textContent = slideTitle; // NEW
        descText.textContent = slideDescription;
        descImg.src = slideImagePath;
  
        // Show the panel
        oneDescPanel.classList.add("active");
      });
    });
  
    closeBtn.addEventListener("click", () => {
      oneDescPanel.classList.remove("active");
    });
  
    // PART B: GSAP Animation
    gsap.set(oneDescPanel, { x: "0", opacity: 0 });
    const panelTimeline = gsap.timeline({ paused: true }).to(oneDescPanel, {
      x: "0%",
      opacity: 1,
      duration: 0.2,
      ease: "power3.out",
    });
  
    slideLinks.forEach((link) => {
      link.addEventListener("click", () => {
        panelTimeline.play();
      });
    });
  
    closeBtn.addEventListener("click", () => {
      panelTimeline.reverse();
    });
  });
  