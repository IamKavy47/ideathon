const scrollText = document.querySelector(".scroll-text");
const slider = document.querySelector(".slider");

if (scrollText && slider) {
  let texts = ["Scroll", "Scroll", "scroll"]; // Default texts
  let index = 0;
  let textUpdateTimeout = null;

  // Update the texts array based on screen width
  function updateTextsBasedOnScreenWidth() {
    if (window.innerWidth <= 1000) {
      texts = ["Horizontal Scroll", "Horizontal Scroll", "Horizontal Scroll"];
    } else {
      texts = ["Scroll", "Scroll", "scroll"];
    }
  }

  // Call this function initially to set the texts array
  updateTextsBasedOnScreenWidth();

  // Also, update the texts if the window is resized
  window.addEventListener("resize", updateTextsBasedOnScreenWidth);

  function isElementInViewport(element, threshold = 0.5) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;
    const visibleHeight = Math.min(
      window.innerHeight - rect.top,
      rect.bottom
    );
    return visibleHeight >= elementHeight * threshold;
  }

  function updateScrollText() {
    if (textUpdateTimeout) return; // Prevent rapid updates
    scrollText.textContent = texts[index];
    index = (index + 1) % texts.length;
    textUpdateTimeout = setTimeout(() => (textUpdateTimeout = null), 2000); // Increased delay for slower updates
  }

  // Add text update to the animation loop
  function culturalUpdate() {
    velocity *= friction;
    culturalTarget += velocity;
    culturalCurrent = culturalLerp(culturalCurrent, culturalTarget, culturalEase);

    // Slow down the movement
    velocity *= 0.98;  // Reduce speed for smoother transition

    // Ensure the movement is smooth and continuous
    if (culturalCurrent > singleSetWidth) {
      culturalCurrent -= singleSetWidth;
      culturalTarget -= singleSetWidth;
    } else if (culturalCurrent < 0) {
      culturalCurrent += singleSetWidth;
      culturalTarget += singleSetWidth;
    }

    // Apply smoother transition using GSAP with easing
    gsap.set(culturalSliderWrapper, {
      x: -culturalCurrent,
      ease: "power2.inOut", // Smooth easing effect
      duration: 1 // Slow down the duration of the transition
    });
    culturalUpdateScaleAndPosition();

    if (isElementInViewport(slider, 0.5)) {
      updateScrollText();
    }

    requestAnimationFrame(culturalUpdate);
  }

  culturalUpdate(); // Start animation
}
