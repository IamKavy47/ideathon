const ROWS = 6;
const COLS = 6;
const BLOCK_SIZE = 50;
const COOLDOWN = 1000;
let isFlipped = false;

function createTiles(row, col) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.innerHTML = `
  <div class="tile-face tile-front"></div>
  <div class="tile-face tile-back"></div>
  `;

  const bgPosition = `${col * 20}% ${row * 20}%`;
  tile.querySelector(".tile-front").style.backgroundPosition = bgPosition;  // Corrected from .title-front to .tile-front
  tile.querySelector(".tile-back").style.backgroundPosition = bgPosition;   // Corrected from .title-back to .tile-back

  return tile;
}

function createBoard() {
  const board = document.querySelector(".board");
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < COLS; j++) {
      row.appendChild(createTiles(i, j));
    }

    board.appendChild(row);
  }
}

function initializeTileAnimation() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    let lastEnterTime = 0;

    tile.addEventListener("mouseenter", () => {
      const currentTime = Date.now();
      if (currentTime - lastEnterTime > COOLDOWN) {
        lastEnterTime = currentTime;

        let tiltY;
        if (index % 6 === 0) {
          tiltY = -40;
        } else if (index % 6 === 5) {
          tiltY = 40;
        } else if (index % 6 === 1) {
          tiltY = -20;
        } else if (index % 6 === 4) {
          tiltY = 20;
        } else if (index % 6 === 2) {
          tiltY = -10;
        } else {
          tiltY = 10;
        }

        animateTile(tile, tiltY);
      }
    });
  });

  const flipButton = document.getElementById("flipButton");
  flipButton.addEventListener("click", () => flipAllTiles(tiles));
}

function animateTile(tile, tiltY) {
  gsap.timeline()  // Corrected from WebGLSampler to gsap
    .set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
    .to(tile, {
      rotateX: isFlipped ? 450 : 270,
      rotateY: tiltY,
      duration: 0.5,
      ease: "power2.out",
    })
    .to(tile, {
      rotateX: isFlipped ? 540 : 360,  // Corrected 'ifFliped' to 'isFlipped'
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.25");
}

function flipAllTiles(tiles) {
  isFlipped = !isFlipped;
  gsap.to(tiles, {
    rotateX: isFlipped ? 180 : 0,
    duration: 1,
    stagger: {
      amount: 0.5,
      from: "random",
    },
    ease: "power2.inOut",
  });
}

function init() {
  createBoard();
  initializeTileAnimation();
}

document.addEventListener("DOMContentLoaded", init);

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const optionsSection = document.querySelector('.optionsSection');
    const optionsHeading = document.querySelector('.optionsHeading');
    const optionButtons = document.querySelectorAll('.optionButton');
    const questionsSection = document.querySelector('.questionsSection');
    const questionsList = document.querySelector('.questionsList');
    const questionsHeading = document.querySelector('.questionsHeading');
    const backToOptionsButton = document.querySelector('.backToOptionsButton');
    const answerSection = document.querySelector('.answerSection');
    const answerText = document.querySelector('.answerText');
    const backToQuestionsButton = document.querySelector('.backToQuestionsButton');

    // Data for questions and answers
    const questionData = {
      registration: [
        { question: "How do I register for Infinitus?", answer: "Through our ticketing partner unifest." },
        { question: "Is the registration free of cost?", answer: "It is free of cost for SRM students though some events have charges." },
        { question: "How much is the event registration fee for students from other universities?", answer: "It is variable based on events ranging from 100 to 300." },
        { question: "When does the registration end?", answer: "Some competitions registrations end on feb 1st, others are open for on spot registrations." },
        { question: "Are on-spot registrations available?", answer: "Yes, they are available for some competitions" },
      ],
      verification: [
        { question: "What is required for identity verification?", answer: "College id card is mandatory for campus entrance." },
        { question: "Do we get a registration confirmation mail?", answer: "Yes, you will get a mail from unifest after payment confirmation." },
      ],
      participation: [
        { question: "Is there a separate participation fee for outside students?", answer: "Yes, it can be found on our ticketing platform, unifest" },
        { question: "How do I contact organizers regarding any questions or concerns?", answer: "You can reach out to the organizers at sc@srmap.edu.in for any questions or concerns." },
      ],
      accommodation: [
        { question: "Will accommodation be provided for participants from other universities?", answer: "Yes, accommodation will be provided for participants from other universities" },
        { question: "Are there any accommodation charges?", answer: "No, the accommodation charges are included with the mess pass." },
        { question: "Will food be included along with the accommodation?", answer: "Yes, the food in the mess is included along with the accommodation." },
      ]
    };

    // Jumble effect and animation for the heading
    const jumbledText = "Lorem ipsum dolor sit amet";
    const finalText = "What can we do for you?";
    
    let currentText = "";
    let index = 0;

    const scrambleText = () => {
      const chars = '0123456789!@#$%^&*()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let jumbled = '';
      
      for (let i = 0; i < finalText.length; i++) {
        if (i < currentText.length) {
          jumbled += finalText[i];
        } else {
          jumbled += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      optionsHeading.textContent = jumbled;
      if (currentText.length < finalText.length) {
        currentText += finalText[currentText.length];
        setTimeout(scrambleText, 100); // Speed of jumbled effect
      } else {
        optionsHeading.textContent = finalText; // Final text after scrambling
      }
    };

    scrambleText();

    // FAQ option buttons
    optionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedOption = button.id;
        questionsHeading.querySelector('span').textContent = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);

        questionsList.innerHTML = '';
        questionData[selectedOption].forEach(q => {
          const questionItem = document.createElement('div');
          questionItem.classList.add('questionItem');
          questionItem.textContent = q.question;
          questionItem.addEventListener('click', () => {
            gsap.to(questionsSection, {
              opacity: 0, duration: 0.5, onComplete: () => {
                questionsSection.style.display = 'none';
                answerText.textContent = '';  // Reset the answer
                gsap.set(answerSection, { display: 'flex' });
                gsap.to(answerSection, { opacity: 1 });

                // Typing effect for the answer
                let index = 0;
                const answer = q.answer;
                const typingInterval = setInterval(() => {
                  if (index < answer.length) {
                    answerText.textContent += answer.charAt(index);
                    index++;
                  } else {
                    clearInterval(typingInterval);
                  }
                }, 50);  // Speed of typing effect
              }
            });
          });
          questionsList.appendChild(questionItem);
        });

        gsap.to(optionsSection, {
          opacity: 0, duration: 0.5, onComplete: () => {
            optionsSection.style.display = 'none';
            gsap.set(questionsSection, { display: 'flex' });
            gsap.to(questionsSection, { opacity: 1, duration: 0.5 });
          }
        });
      });
    });

    // Back to options button
    backToOptionsButton.addEventListener('click', () => {
      gsap.to(questionsSection, {
        opacity: 0, duration: 0.5, onComplete: () => {
          questionsSection.style.display = 'none';
          gsap.set(optionsSection, { display: 'flex' });
          gsap.to(optionsSection, { opacity: 1, duration: 0.5 });
        }
      });
    });

    // Back to questions button
    backToQuestionsButton.addEventListener('click', () => {
      gsap.to(answerSection, {
        opacity: 0, duration: 0.5, onComplete: () => {
          answerSection.style.display = 'none';
          gsap.set(questionsSection, { display: 'flex' });
          gsap.to(questionsSection, { opacity: 1, duration: 0.5 });
        }
      });
    });
  });
})();











// faq section
(function () {
  document.addEventListener('DOMContentLoaded', () => {
      const introSection = document.querySelector('.introSection');
      const introHeading = document.querySelector('.introHeading');
      const skipButton = document.querySelector('.skipButton');
      const optionsSection = document.querySelector('.optionsSection');
      const optionsHeading = document.querySelector('.optionsHeading');
      const optionButtons = document.querySelectorAll('.optionButton');
      const questionsSection = document.querySelector('.questionsSection');
      const questionsList = document.querySelector('.questionsList');
      const questionsHeading = document.querySelector('.questionsHeading');
      const backToOptionsButton = document.querySelector('.backToOptionsButton');
      const answerSection = document.querySelector('.answerSection');
      const answerText = document.querySelector('.answerText');
      const backToQuestionsButton = document.querySelector('.backToQuestionsButton');

      // Data for questions and answers
      const questionData = {
        registration: [
          { question: "How do I register for Infinitus?", answer: "Through our ticketing partner unifest." },
          { question: "Is the registration free of cost?", answer: "It is free of cost for SRM students though some events have charges." },
          { question: "How much is the event registration fee for students from other universities?", answer: "It is variable based on events ranging from 100 to 300." },
          { question: "When does the registration end?", answer: "Some competitions registrations end on feb 1st, others are open for on spot registrations." },
          { question: "Are on-spot registrations available?", answer: "Yes, they are available for some competitions" },
        ],
        verification: [
          { question: "What is required for identity verification?", answer: "College id card is mandatory for campus entrance." },
          { question: "Do we get a registration confirmation mail?", answer: "Yes, you will get a mail from unifest after payment confirmation." },
        ],
        participation: [
          { question: "Is there a separate participation fee for outside students?", answer: "Yes, it can be found on our ticketing platform, unifest" },
          { question: "How do I contact organizers regarding any questions or concerns?", answer: "You can reach out to the organizers at sc@srmap.edu.in for any questions or concerns." },
        ],
        accommodation: [
          { question: "Will accommodation be provided for participants from other universities?", answer: "Yes, accommodation will be provided for participants from other universities" },
          { question: "Are there any accommodation charges?", answer: "No, the accommodation charges are included with the mess pass." },
          { question: "Will food be included along with the accommodation?", answer: "Yes, the food in the mess is included along with the accommodation." },
        ]
      };

      // Animating the intro text and heading
      gsap.timeline()
          .to(introSection, {
              opacity: 0, duration: 1, onComplete: () => {
                  gsap.set(optionsSection, { display: 'flex' });
                  gsap.to(optionsSection, { opacity: 1 });
                  gsap.to(optionsHeading, {
                      duration: 2,
                      text: {
                          value: "What can we do for you?",
                          scrambleText: {
                              chars: '0123456789!@#$%^&*()',
                              speed: 0.2
                          }
                      }
                  });
              }
          });

      // FAQ option buttons
      optionButtons.forEach(button => {
          button.addEventListener('click', () => {
              const selectedOption = button.id;
              questionsHeading.querySelector('span').textContent = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);

              questionsList.innerHTML = '';
              questionData[selectedOption].forEach(q => {
                  const questionItem = document.createElement('div');
                  questionItem.classList.add('questionItem');
                  questionItem.textContent = q.question;
                  questionItem.addEventListener('click', () => {
                      gsap.to(questionsSection, {
                          opacity: 0, duration: 0.5, onComplete: () => {
                              questionsSection.style.display = 'none';
                              answerText.textContent = '';  // Reset the answer
                              gsap.set(answerSection, { display: 'flex' });
                              gsap.to(answerSection, { opacity: 1 });

                              // Typing effect for the answer
                              let index = 0;
                              const answer = q.answer;
                              const typingInterval = setInterval(() => {
                                  if (index < answer.length) {
                                      answerText.textContent += answer.charAt(index);
                                      index++;
                                  } else {
                                      clearInterval(typingInterval);
                                  }
                              }, 50);  // Speed of typing effect
                          }
                      });
                  });
                  questionsList.appendChild(questionItem);
              });

              gsap.to(optionsSection, {
                  opacity: 0, duration: 0.5, onComplete: () => {
                      optionsSection.style.display = 'none';
                      gsap.set(questionsSection, { display: 'flex' });
                      gsap.to(questionsSection, { opacity: 1, duration: 0.5 });
                  }
              });
          });
      });

      // Back to options button
      backToOptionsButton.addEventListener('click', () => {
          gsap.to(questionsSection, {
              opacity: 0, duration: 0.5, onComplete: () => {
                  questionsSection.style.display = 'none';
                  gsap.set(optionsSection, { display: 'flex' });
                  gsap.to(optionsSection, { opacity: 1, duration: 0.5 });
              }
          });
      });

      // Back to questions button
      backToQuestionsButton.addEventListener('click', () => {
          gsap.to(answerSection, {
              opacity: 0, duration: 0.5, onComplete: () => {
                  answerSection.style.display = 'none';
                  gsap.set(questionsSection, { display: 'flex' });
                  gsap.to(questionsSection, { opacity: 1, duration: 0.5 });
              }
          });
      });
  });
})();









