const faviconImages = []; // Array to hold the image paths
const totalFrames = 20;    // Total number of frames (from favicon.1.png to favicon.20.png)
let faviconIndex = 0;      // Current index of the frame
const fps = 4;            // Frames per second
const frameInterval = 1000 / fps; // Time interval between frames (50ms for 20 FPS)

// Load all the image paths into the array
for (let i = 1; i <= totalFrames; i++) {
    faviconImages.push(`../favicon/${i}.webp`); // Assuming the images are named favicon.1.png, favicon.2.png, etc.
}

// Create a <link> element to hold the favicon
const faviconElement = document.createElement('link');
faviconElement.rel = 'icon';
document.head.appendChild(faviconElement);

// Function to update the favicon
function updateFavicon() {
    faviconElement.href = faviconImages[faviconIndex]; // Set the current favicon

    // Increment the index (loop back to the first frame when reaching the last one)
    faviconIndex = (faviconIndex + 1) % totalFrames;
}

// Set up the interval to change the favicon at the desired frame rate (20 FPS)
setInterval(updateFavicon, frameInterval);