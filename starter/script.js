"use strict";

// Selecting Elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); // works the same
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

let scores;
let currentScore;
let activePlayer;
let playing;

init();

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  diceEl.classList.add(`hidden`);

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
}

// Switching players
function switchPlayers() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = (activePlayer + 1) % 2;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

// Rolling Dice Functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Genereating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: If true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayers();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score >= 100:
    if (scores[activePlayer] >= 100) {
      // 2.1. True - Player won, END game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      playing = false;
      diceEl.classList.add(`hidden`);
    } else {
      // 2.2. False - Switch player
      switchPlayers();
    }
  }
});

// When pressed new game
// Resetting all init conditions
btnNew.addEventListener(`click`, init);
