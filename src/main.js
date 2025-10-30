// app.js
const holes = Array.from(document.querySelectorAll('.hole'));
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const messageEl = document.getElementById('message');

let score = 0;
let timeLeft = 30;
let currentMoleIndex = null;
let timerInterval = null;
let moleInterval = null;
let gameRunning = false;

// reset UI and state
function resetGame() {
  score = 0;
  timeLeft = 30;
  currentMoleIndex = null;
  gameRunning = false;
  clearInterval(timerInterval);
  clearInterval(moleInterval);
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  holes.forEach(h => h.classList.remove('active'));
  messageEl.textContent = '';
  messageEl.style.display = "none";

}
function showRandomMole() {
  // 1. Hide previous mole
  if (currentMoleIndex !== null) {
    holes[currentMoleIndex].classList.remove('active');
  }

  // 2. Pick a random new index
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * holes.length);
  } while (randomIndex === currentMoleIndex); // avoid same hole twice

  // 3. Update currentMoleIndex and show mole
  currentMoleIndex = randomIndex;
  holes[currentMoleIndex].classList.add('active');
}

function handleHoleClick(index) {
  if (!gameRunning) return; // ignore clicks if game not started

  if (index === currentMoleIndex) {
    score++;
    scoreEl.textContent = score;

    // hide the mole immediately after hit
    holes[currentMoleIndex].classList.remove('active');
    currentMoleIndex = null;
  }
}


// start game
function startGame() {
  resetGame(); // always start fresh
  gameRunning = true;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  messageEl.textContent = "";

  // Show the first mole immediately
  showRandomMole();

  // 1️⃣ Start mole interval — change mole every 700ms
  moleInterval = setInterval(() => {
    showRandomMole();
  }, 700);

  // 2️⃣ Start countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(moleInterval);
      clearInterval(timerInterval);
      gameRunning = false;
      holes[currentMoleIndex]?.classList.remove("active");
      messageEl.style.display = "block";
      messageEl.textContent = `Game Over — Your Score: ${score}`;
      messageEl.classList.add("show");

    }
  }, 1000);
}
// add click handlers for buttons

startBtn.addEventListener('click', () => {
  if (gameRunning) return;
  startGame();
});

resetBtn.addEventListener('click', resetGame);

// add click handlers for holes
holes.forEach((hole, index) => {
  hole.addEventListener('click', () => handleHoleClick(index));
});


// initialize
resetGame();
