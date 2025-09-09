// Get audio element and controls
const audio = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume-slider");

// List of songs with paths
const songs = [
  "../music/Sanity.wav",
  "../music/10.80.wav",
  "../music/YouMightNotKnow.wav",
  "../music/GreetMe.wav",
];
let currentSongIndex = 0;

// Set initial volume to 10%
audio.volume = 0.1;

// Function to play the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Cycle through songs
  audio.src = songs[currentSongIndex];
  audio.play();
}

// Function to play the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Cycle backward
  audio.src = songs[currentSongIndex];
  audio.play();
}

// Function to toggle play/pause
function togglePlayPause() {
  const playPauseButton = document.querySelector(
    "#player-controls button:nth-child(2) img"
  );
  if (audio.paused) {
    audio.play();
    playPauseButton.src = "./assets/pause.png"; // Change to pause image
  } else {
    audio.pause();
    playPauseButton.src = "./assets/play.png"; // Change to play image
  }
}

// Volume fade-in effect (5 seconds duration)
function fadeInVolume() {
  let volume = 0.1; // Start at 10%
  const targetVolume = 0.4; // End at 50%
  const fadeDuration = 5000; // Duration for fade-in effect (5 seconds)

  const incrementPerInterval = (targetVolume - volume) / (fadeDuration / 50); // Calculate increment per interval

  const fadeInterval = setInterval(function () {
    if (volume < targetVolume) {
      volume += incrementPerInterval; // Increment the volume smoothly
      audio.volume = volume; // Set new volume
    } else {
      clearInterval(fadeInterval); // Stop the fade effect once the target volume is reached
    }
  }, 50); // Update every 50ms (to get a smooth transition)
}

// Attempt to autoplay on page load
function playAudioOnLoad() {
  const playPromise = audio.play();

  playPromise
    .then(() => {
      fadeInVolume(); // If autoplay is allowed, fade in the volume
    })
    .catch(() => {
      console.log("Autoplay is blocked. Please click the play button.");
      // If autoplay is blocked, display the play button
      document.getElementById("play-button").style.display = "block";
    });
}

// Ensure audio starts playing and fades in volume as soon as the page loads
window.onload = () => {
  playAudioOnLoad();
};

// Adjust volume dynamically
volumeSlider.addEventListener("input", function () {
  audio.volume = this.value; // Set the volume based on slider value (0 to 1)
});

// Function to open/close the music player with GSAP transition
function openMusicPlayer() {
  const musicPlayer = document.getElementById("music-player");

  if (
    musicPlayer.style.display === "none" ||
    musicPlayer.style.display === ""
  ) {
    gsap.fromTo(
      musicPlayer,
      { y: "100%", opacity: 0 }, // Start off-screen
      { y: "9%", opacity: 1, duration: 0.4, ease: "power2.out" } // Animate to visible position
    );
    musicPlayer.style.display = "block"; // Make sure it's visible after animation
  } else {
    gsap.to(musicPlayer, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        musicPlayer.style.display = "none"; // Hide once animation is complete
      },
    });
  }
}

// Add a click event listener to manually play audio if autoplay is blocked
document.getElementById("play-button").addEventListener("click", () => {
  // Play the audio manually on button click if autoplay was blocked
  audio.play().then(() => {
    fadeInVolume();
  });
});

// Link Hover Music
const hoverElements = document.querySelectorAll(".href-music"); // Select all elements with the class 'href-music'
const audioPlayer = document.getElementById("hover-music");

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    audioPlayer.play();
  });

  element.addEventListener("mouseleave", () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Reset the audio
  });
});
