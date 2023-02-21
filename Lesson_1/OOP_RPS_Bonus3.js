// in progress - see test file 

/*

what I need:
1.get both users choice after each turn and save them 
- When the game is won if the player wants to keep playing we need to {
  round1: [paper, scissors],
  round2: [rock, paper],
  round3: [b, r],
  }
2.offer the player to see an history of the move 
3.print the history of move to the screen

create a moveHistory 

*/
const readline = require('readline-sync');
const possibleChoices = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
const WINNING_COMBINATIONS = {
  scissors: ['paper', 'lizard'],
  paper: ['rock', 'spoke'],
  rock: ['lizard', 'scissors'],
  lizard: ['spock', 'paper'],
  spock: ['rock', 'scissors']
};


function createPlayer() {
  return {
    move: null,
    score: 0,
    moveHistory: [],
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
  roundWinner: null,
  rounds: 0,

  displayWelcomeMessage() {
    console.log(`Welcome to Rock, Paper, Scissors!`);
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  determineRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    if (WINNING_COMBINATIONS[humanMove].some(value => value === computerMove)) {
      this.roundWinner = 'human';
    } else if (WINNING_COMBINATIONS[computerMove].some(value => value === humanMove)) {
      this.roundWinner = 'computer';
    } else {
      this.roundWinner = 'tie';
    }
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    switch (this.roundWinner) {
      case 'human' : console.log(`You choose ${humanMove} computer choose ${computerMove},\nYou win this round!`);
        break;
      case 'computer' : console.log(`You choose ${humanMove} computer choose ${computerMove},\nThe computer wins this round`);
        break;
      case 'tie' : console.log(`You choose ${humanMove} computer choose ${computerMove},\nThis is a tie...`);
    }
  },

  UpdateScore() {
    if (this.roundWinner === 'human') {
      this.human.score += 1;
    } else if (this.roundWinner === 'computer') {
      this.computer.score += 1;
    }
    this.rounds += 1;
  },

  displayScore() {
    console.log(`Rounds played: ${this.rounds}\nYour score: ${this.human.score} | Computer score: ${this.computer.score}`);
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
    this.rounds = 0;
  },

  play () {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.determineRoundWinner();
      this.UpdateScore();
      this.displayRoundWinner();
      this.displayScore();
      if (this.maxScoreReached()) {
        this.displayGrandWinner();
        this.resetScore();
      }
      if (!this.playAgain()) {
        break;
      }
      console.clear();
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();


