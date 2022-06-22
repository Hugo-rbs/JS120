/*
Keeping score
Right now, the game doesn't have any dramatic flair.
It would be more interesting if we were playing up to, say, 5 points.
Whoever reaches 5 points first wins. Can you build this functionality? We have a new noun -- a score.
Is that a new object type, or a state of an existing class? Explore both options and see which works better.


- update createPlayer to add a state to keep track of the score
- update the current diplayWinner method to determineWinner method
- set displayRoundWinner create a method to display the winner of the round and the total score
- set condition in the RPS logic so that if one player's score is equal to 5 the player is returned as the winner
- reset scores to 0


*/

const readline = require('readline-sync');
const possibleChoices = ['rock', 'paper', 'scissors'];


function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}


function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose() {
      let randomIndex = Math.floor(Math.random() * possibleChoices.length);
      this.move = possibleChoices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose () {
      let choice = readline.question(`Please choose: ${possibleChoices.join(', ')}\n`);
      while (!possibleChoices.includes(choice)) {
        choice = readline.question(`Please provide a valid choice:\n`);
      }
      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame  = {
  human: createHuman(),
  computer: createComputer(),
  // score: {
  //   human: 0,
  //   computer: 0,
  // },

  displayWelcomeMessage() {
    console.log(`Welcome to Rock, Paper, Scissors!`);
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You choosed: ${humanMove}\nComputer choosed: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You Win!');
      this.human.score += 1;
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
                    (computerMove === 'paper' && humanMove === 'rock') ||
                    (computerMove === 'scissors' && humanMove === 'paper')) {
      console.log('Computer wins!');
      this.computer.score += 1;
    } else {
      console.log(`it's a tie.`);
    }
  },

  displayScore() {
    console.log(`Your score: ${this.human.score} | Computer score: ${this.computer.score}`);
  },

  playAgain () {
    let again = readline.question(`Would you like to play another game (y/n)?\n`);
    while (again.trim().toLowerCase() !== 'y' && again.trim().toLowerCase() !== 'n') {
      again = readline.question('Please provide a valid anwser.\n');
    }
    return again === 'y';
  },

  maxScoreReached () {
    return this.computer.score === 5 || this.human.score === 5;
  },

  displayGrandWinner() {
    if (this.computer.score === 5) {
      console.log(`Computer wins the game`);
    } else if (this.human.score === 5) {
      console.log('You win the game');
    }
  },

  resetScore() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  play () {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayRoundWinner();
      this.displayScore();
      if (this.maxScoreReached()) {
        this.displayGrandWinner();
        this.resetScore();
      }
      if (!this.playAgain()) {
        break;
      }
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();


