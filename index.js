#!/usr/bin/env node

import _ from 'lodash';
import readlineSync from 'readline-sync';

const figures = ['rock', 'scissors', 'paper'];

const getPlayerChoice = () => {
  const index = readlineSync.keyInSelect(figures, 'Choose your figure: ');
  const playerChoice = figures[index];
  console.log(`Your choice: ${index + 1}`);
  console.log(`You chose: ${playerChoice}`);
  return playerChoice;
};

const getComputerChoice = () => {
  const randomNumber = _.random(0, 2);
  const computerChoice = figures[randomNumber];
  console.log(`Computer chose: ${computerChoice}`);
  return computerChoice;
};

const makeVictory = (results, playerChoice, computerChoice) => {
  console.log(`You win! ${playerChoice} breaks ${computerChoice}.`);
  results.push(1);
};

const makeLose = (results, playerChoice, computerChoice) => {
  console.log(`Wrong answer. ${playerChoice} can't break ${computerChoice}`);
  results.push(-1);
};

const startRound = (results) => {
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();

  if (playerChoice === computerChoice) {
    console.log('It was a draw dude');
    results.push(0);
  }

  if (playerChoice === 'rock') {
    switch (computerChoice) {
      case 'scissors':
        makeVictory(results, playerChoice, computerChoice);
        break;

      case 'paper':
        makeLose(results, playerChoice, computerChoice);
        break;

      default:
        break;
    }

    if (playerChoice === 'scissors') {
      switch (computerChoice) {
        case 'paper':
          makeVictory(results, playerChoice, computerChoice);
          break;

        case 'rock':
          makeLose(results, playerChoice, computerChoice);
          break;

        default:
          break;
      }
    }

    if (playerChoice === 'paper') {
      switch (computerChoice) {
        case 'rock':
          makeVictory(results, playerChoice, computerChoice);
          break;

        case 'scissors':
          makeLose(results, playerChoice, computerChoice);
          break;

        default:
          break;
      }
    }
  }
};

const getArraySum = (array) => {
  const sum = array.reduce((temp, x) => temp + x, 0);
  return sum;
};

const launchMenu = () => {
  const menuItems = ['Start Game', 'Credits', 'Exit'];
  const playerChoice = readlineSync.keyInSelect(menuItems) + 1;
  return playerChoice;
};

const launchCredits = () => {
  console.log('Original Story/Planning/Game Design --- Hideo Kojima');
  console.log('Original Idea --- SaulBadman');
  console.log('Big Boss --- The Man Who Sold The World');
};

const launchGame = () => {
  let launched = 0;
  const score = [];

  while (launched !== 3) {
    launched = launchMenu();

    if (launched === 2) {
      launchCredits();
      launched = launchMenu();
    }

    if (launched === 1) {
      const roundsCount = readlineSync.question('How many rounds? ');

      for (let i = 0; i < roundsCount; i += 1) {
        startRound(score);
      }

      launched = 3;
    }
  }

  if (launched === 3) {
    console.log(`Oh, you're leaving now? Your score: ${getArraySum(score)}, results: ${score.join(', ')}`);
  }
};

launchGame();