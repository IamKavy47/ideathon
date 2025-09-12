let culturalTarget = 0;
        let culturalCurrent = 0;
        let culturalEase = 0.075; // How smooth the transition is

        // Velocity-based settings
        let velocity = 0; // current speed
        let friction = 0.9; // how quickly the velocity slows down
        let velocityMultiplier = 0.2; // how much deltaY affects velocity
        let mobileVelocityMultiplier = 0.05; // Slow down touch scrolling for mobile

        const culturalSlider = document.querySelector(".slider");
        const culturalSliderWrapper = document.querySelector(".slider-wrapper");
        let slides = Array.from(document.querySelectorAll(".slide"));
        let singleSetWidth = 0;
        let totalSlides = slides.length;

        // Variables for touch events
        let touchStartX = 0;
        let touchEndX = 0;
        let touchDeltaX = 0;
        let isMobile = false;

        function detectMobileDevice() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                isMobile = true;
            }
        }

        /* 1) Duplicate slides to create a seamless "double" set */
        function duplicateSlides() {
            slides.forEach((slide) => {
                const clone = slide.cloneNode(true);
                culturalSliderWrapper.appendChild(clone);
            });
        }

        /* 2) Measure the width of one full set of slides */
        function measureSingleSetWidth() {
            singleSetWidth = 0;
            slides.forEach((slide) => {
                singleSetWidth += slide.offsetWidth;
            });
            // Add gaps between slides if any
            singleSetWidth += (totalSlides - 1) * 100; // assuming 100px gap
        }

        /* Simple LERP function for smooth transitions */
        function culturalLerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        /* 3) Main animation loop */
        function culturalUpdate() {
            velocity *= friction;
            culturalTarget += velocity;
            culturalCurrent = culturalLerp(culturalCurrent, culturalTarget, culturalEase);

            // Handle infinite loop for sliding
            if (culturalCurrent > singleSetWidth) {
                culturalCurrent -= singleSetWidth;
                culturalTarget -= singleSetWidth;
            } else if (culturalCurrent < 0) {
                culturalCurrent += singleSetWidth;
                culturalTarget += singleSetWidth;
            }

            gsap.set(culturalSliderWrapper, {
                x: -culturalCurrent,
            });

            requestAnimationFrame(culturalUpdate);
        }

        /* 4) Event listeners */

        // Recompute set width on resize
        window.addEventListener("resize", () => {
            measureSingleSetWidth();
        });

        // Mouse wheel -> adjust velocity
        window.addEventListener("wheel", (e) => {
            velocity += e.deltaY * velocityMultiplier;
        });

        // Touch events -> adjust velocity for mobile (horizontal scrolling only)
        window.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
        });

        window.addEventListener("touchmove", (e) => {
            touchEndX = e.touches[0].clientX;
            touchDeltaX = touchStartX - touchEndX;

            // Only affect horizontal movement on mobile devices
            if (isMobile) {
                velocity += touchDeltaX * mobileVelocityMultiplier;
                e.preventDefault(); // Prevent vertical scrolling on mobile devices
            }
        });

        window.addEventListener("touchend", () => {
            touchStartX = 0;
            touchEndX = 0;
            touchDeltaX = 0;
        });

        /* 5) Initialize */
        detectMobileDevice(); // Check if user is on mobile
        duplicateSlides(); // Duplicate slides for looping
        slides = Array.from(document.querySelectorAll(".slide")); // Update slide list after duplicating
        measureSingleSetWidth(); // Measure the original set width

        // Set the wrapper width to accommodate two full sets of slides
        culturalSliderWrapper.style.width = 2 * singleSetWidth + "px";

        // Start animation
        culturalUpdate();