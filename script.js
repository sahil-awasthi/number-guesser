'use strict';

const randomNumGenerator = num => Math.trunc(Math.random() * num) + 1;

let secretNumber = randomNumGenerator(20);
let score = 10;
let highscore = 0;
let scoreStreek = 0;

let scoreSelector = document.querySelector('.score');
let guessSelector = document.querySelector('.guess');
let numberSelector = document.querySelector('.number');
let messageSelector = document.querySelector('.message');
let headerSelector = document.querySelector('.heading');
let againSelector = document.querySelectorAll('.again');
let checkSelector = document.querySelector('.check');

let bodySelectorStyle = document.body.style;
let numberSelectorStyle = numberSelector.style;

const displayMessage = function (className, message) {
  document.querySelector(`.${className}`).textContent = message;
};

const lightEffect = () => {
  document.body.setAttribute('class', 'blink');
  setTimeout(() => {
    document.body.removeAttribute('class', 'blink');
  }, 500);
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessSelector.value);

  // When there is no input
  if (!guess) {
    displayMessage('message', '⛔️ No number!');
    lightEffect();
    window.navigator.vibrate([300]);

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('message', '🎉 Correct Number!');
    displayMessage('number', '');

    bodySelectorStyle.backgroundColor = '#60b347';

    checkSelector.disabled = true;
    guessSelector.disabled = true;
    checkSelector.style.cursor = 'not-allowed';
    numberSelectorStyle.backgroundImage = 'url(./img/success.gif)';
    againSelector.forEach(node => {
      node.style.backgroundColor = '#3b5bdb';
      node.style.color = '#eee';
    });
    window.navigator.vibrate([300]);

    if (score > highscore) {
      highscore = score;
      displayMessage('highscore', highscore);
    }

    scoreStreek++;
    displayMessage('streak', `🥳 Streak! ${scoreStreek}`);

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        'message',
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      displayMessage('score', score);
      lightEffect();
      window.navigator.vibrate([300]);
    } else {
      bodySelectorStyle.backgroundColor = '#c92a2a';
      displayMessage('message', '💥 You lost the game!');
      displayMessage('score', 0);

      numberSelector.textContent = '';
      headerSelector.textContent = 'You lost!';
      numberSelectorStyle.backgroundImage = 'url(./img/lost.gif)';
      window.navigator.vibrate([600]);
    }
  }
});

document.querySelectorAll('.again').forEach(node => {
  node.addEventListener('click', function () {
    score = 10;
    secretNumber = randomNumGenerator(20);

    displayMessage('message', '🤔 Start guessing...');
    displayMessage('score', score);
    displayMessage('number', '?');
    guessSelector.value = '';

    checkSelector.disabled = false;
    guessSelector.disabled = false;
    checkSelector.style.cursor = 'pointer';
    node.style.color = '#222';
    bodySelectorStyle.backgroundColor = '#3b5bdb';
    numberSelectorStyle.backgroundColor = '#eee';
    numberSelectorStyle.backgroundImage = '';
    node.style.backgroundColor = '#eee';
  });
});
