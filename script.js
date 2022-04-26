'use strict';

const score_el_0 = document.getElementById('score--0');
const score_el_1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

// Starting Conditions
score_el_0.textContent = 0;
score_el_1.textContent = 0;
dice.classList.add('hidden');


// Start Game:
// ------------------

// Players
const player_0 = document.querySelector('.player--0');
const current_score_0 = document.querySelector('#current--0');
const current_score_player_0 = 0;

const player_1 = document.querySelector('.player--1');
const current_score_1 = document.querySelector('#current--1');
const current_score_player_1 = 0;

const player_turn = document.querySelector('.player--active');


// Buttons
const new_game = document.querySelector('.btn--new');
const roll_game = document.querySelector('.btn--roll');
const hold_game = document.querySelector('.btn--hold');

// Rule buttons
const roll_until_one = document.querySelector('.btn--roll-until-one');
const roll_three = document.querySelector('.btn--roll-three');
const both_rules = document.querySelector('.btn--both-rules');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let rollCounter = 0;

let restriction_bool = false;
let playing = true;


let switchPlayer = () => {
    player_0.classList.toggle('player--active');
    player_1.classList.toggle('player--active');
    // Current score of the player is set to 0 if the dice shows 1
    currentScore = 0;
    rollCounter = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;
};

const rollTheDice = () => {
    // Round the dice by the randomly generated number, 
    // accordingly to which display the corresponding dice image to the document, 
    // and remove the '.hidden' class from the dice image tag
    const diceRoll = Math.floor(Math.random() * 6) + 1; //Math.trunc(Math.random() * 6) + 1;
    // -------------------------------------------
    dice.src = `./dice/dice-${diceRoll}.png`;
    dice.classList.remove('hidden');

    // Every result that the dice shows will be summed in the current score and displayed to the document
    currentScore += diceRoll;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
};

roll_until_one.addEventListener('click', () => {
    restriction_bool = true;
    roll_three.disabled = true;
    roll_three.classList.add('disabled-btn');
    roll_until_one.classList.add('play-btns-shades');

    roll_game.addEventListener('click', () => {
        if (playing) {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            // -------------------------------------------
            dice.src = `./dice/dice-${diceRoll}.png`;
            dice.classList.remove('hidden');

            // Every result that the dice shows will be summed in the current score and displayed to the document
            currentScore += diceRoll;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

            // to disable game rule - diceRoll === 0
            if (diceRoll === 1) {
                switchPlayer();
                // to disable game rule - rollCounter === Infinity
            }

        }

    });

});

roll_three.addEventListener('click', () => {
    restriction_bool = true;
    roll_until_one.disabled = true;
    roll_until_one.classList.add('disabled-btn');
    roll_three.classList.add('play-btns-shades');

    roll_game.addEventListener('click', () => {
        if (playing) {

            const diceRoll = Math.trunc(Math.random() * 6) + 1;
            // -------------------------------------------
            dice.src = `./dice/dice-${diceRoll}.png`;
            dice.classList.remove('hidden');

            // Every result that the dice shows will be summed in the current score and displayed to the document
            currentScore += diceRoll;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            rollCounter++;

            // to disable game rule - diceRoll === 0
            if (rollCounter == 4) {
                switchPlayer();
                // to disable game rule - rollCounter === Infinity
            }
            document.querySelector('.btn--limiter').textContent = rollCounter;
        }

    });

});

hold_game.addEventListener('click', () => {
    if (playing) {
        // If activePlayer is 0 or 1, set the add current score to the total current score of thet certain player
        activePlayer === 0 ? scores[0] += currentScore : '';
        activePlayer === 1 ? scores[1] += currentScore : '';

        // Showing the total score results to the document
        activePlayer === 0 ? score_el_0.textContent = scores[0] : '';
        activePlayer === 1 ? score_el_1.textContent = scores[1] : '';

        // After holding the current scores to the total scores, the current score is resetting to 0
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        // End Game - A Player wins!
        if (activePlayer === 0 && scores[0] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        } else if (activePlayer === 1 && scores[1] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }
    }
});