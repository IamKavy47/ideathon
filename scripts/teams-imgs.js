// GSAP Animations for hover and click/touch
const teamMembers = document.querySelectorAll('.team-member');
let activeCard = null; // To track the currently active (visible) card

teamMembers.forEach(member => {
    const card = member.querySelector('.card');

    // Hover effect (works for desktop only)
    member.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            opacity: 1, 
            x: 20, 
            visibility: 'visible',
            duration: 0.3,
            ease: "power2.out" 
        });
    });

    member.addEventListener('mouseleave', () => {
        gsap.to(card, { 
            opacity: 0, 
            x: 10, 
            visibility: 'hidden',
            duration: 0.3,
            ease: "power2.in" 
        });
    });

    // Click/touch effect (for mobile or small screens)
    member.addEventListener('click', event => {
        event.preventDefault(); // Prevent default touch behavior

        // If the clicked card is already active, hide it
        if (activeCard === card) {
            gsap.to(card, { 
                opacity: 0, 
                x: 10, 
                visibility: 'hidden',
                duration: 0.3,
                ease: "power2.in" 
            });
            activeCard = null; // Reset activeCard since no card is now visible
        } else {
            // Hide the currently active card if any
            if (activeCard) {
                gsap.to(activeCard, { 
                    opacity: 0, 
                    x: 10, 
                    visibility: 'hidden',
                    duration: 0.3,
                    ease: "power2.in" 
                });
            }

            // Show the clicked card
            gsap.to(card, { 
                opacity: 1, 
                x: 20, 
                visibility: 'visible',
                duration: 0.3,
                ease: "power2.out" 
            });

            // Set the clicked card as the active one
            activeCard = card;
        }
    });

    member.addEventListener('touchstart', event => {
        event.preventDefault(); // Handle touch events the same way
        member.click(); // Trigger the same logic as click
    });
});
