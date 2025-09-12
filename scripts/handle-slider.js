
window.addEventListener('DOMContentLoaded', () => {
    const screenWidth = window.innerWidth;
    let script;

    // Remove any previously added scripts if necessary
    const existingScript = document.getElementById('dynamicScript');
    if (existingScript) {
        existingScript.remove();
    }

    // Create the script element dynamically
    script = document.createElement('script');
    script.id = 'dynamicScript'; // Give it an ID for easy removal later

    if (screenWidth > 900) {
        // Load desktop version script
        script.src = '/scripts/events-slider.js';
    } else {
        // Load mobile version script
        script.src = '/scripts/carosel-slider.js';
    }

    // Append the script to the document's body
    document.body.appendChild(script);
});

