document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingVideo = document.querySelector("#index-loading-laptop");
  const indexVideo = document.querySelector(".index-vid");
  const indexVideo2 = document.querySelector(".index-vid-2");
  const indexVideo3 = document.querySelector(".index-vid-3");
  const navbar = document.querySelector(".navbar");
  const bottomText = document.querySelector(".bottom-text");
  const evOne = document.querySelector(".ev-one");
  const hScroll = document.querySelector(".h-scroll");
  const hScrollConstant = document.querySelector(".h-scroll-constant");

  const timeline = gsap.timeline();

  loadingVideo.addEventListener("contextmenu", (e) => e.preventDefault());

  const handleLoadedAnimations = () => {
    timeline
      // Play `h-scroll-constant` simultaneously with the video
      .fromTo(hScrollConstant, 
        { opacity: 0, display: "none" ,}, 
        { opacity: 1, display: "block", duration: 2.5, ease: "power3.out"} )
      .to(hScrollConstant, 
        { opacity: 0, duration: 1, ease: "power3.inOut" }
      )

      // Proceed with the rest of the animations
      .to([evOne, hScroll], { display: "none", opacity: 0, duration: 1 })
      .to([evOne, hScroll], { display: "block", opacity: 1, duration: 1, ease: "power3.out" },"-=0.5")
      .to([evOne, hScroll], { opacity: 0, duration: 1, ease: "power3.inOut" })
      .to(loadingScreen, { opacity: 0, duration: 0.5, ease: "power3.inOut", onComplete: () => {
        loadingScreen.style.display = "none";
        window.scrollTo(0, 0);
      }},"-=0.5")
      .fromTo(indexVideo2, 
        { scale: 1, clipPath: "circle(0% at 50% 50%)", opacity: 0, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 0.8, ease: "power3.out" }
      )
      .to(indexVideo2, 
        { clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.5, ease: "power3.inOut", display: "none" }
      )
      .fromTo(indexVideo3, 
        { scale: 1, clipPath: "circle(0% at 50% 50%)", opacity: 0, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 0.8, ease: "power3.out" }
      )
      .to(indexVideo3, 
        { clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.5, ease: "power3.inOut", display: "none" }
      )
      .fromTo(indexVideo, 
        { scale: 1, clipPath: "circle(0% at 50% 50%)", opacity: 0, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 0.8, ease: "power3.out" }
      )
      .fromTo([navbar, bottomText], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.3 }, "-=0.75"
      );
  };

  if (window.innerWidth > 700) {
    const fallbackTimer = setTimeout(() => {
      handleLoadedAnimations();
    }, 2000);

    loadingVideo.addEventListener("loadeddata", () => {
      clearTimeout(fallbackTimer);
      setTimeout(() => {
        handleLoadedAnimations();
      }, 1000);
    });
  } else {
    loadingVideo.querySelector("source").src = "/assets/valo-2-compressed.webm";
    loadingVideo.load();

    const fallbackTimer = setTimeout(() => {
      handleLoadedAnimations();
    }, 2000);

    loadingVideo.addEventListener("loadeddata", () => {
      clearTimeout(fallbackTimer);
      setTimeout(() => {
        handleLoadedAnimations();
      }, 1000);
    });
  }
});
