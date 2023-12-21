#!/usr/bin/env node

import readlineSync from 'readline-sync';
import { getPlayerChoice, getComputerChoice } from './src/choices.js';
import { launchMenu, launchCredits } from './src/menu.js';

const figures = ['rock', 'paper', 'scissors'];

const makeVictory = (results, playerChoice, computerChoice) => {
  console.log(`You win! ${playerChoice} breaks ${computerChoice}.`);
  results.push(1);
};

const makeLose = (results, playerChoice, computerChoice) => {
  console.log(`Wrong answer. ${playerChoice} can't break ${computerChoice}`);
  results.push(-1);
};

const startRound = (results) => {
  const playerChoice = getPlayerChoice(figures);
  const computerChoice = getComputerChoice(figures);

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
};

const getArraySum = (array) => {
  const sum = array.reduce((temp, x) => temp + x, 0);
  return sum;
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
