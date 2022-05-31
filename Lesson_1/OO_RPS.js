const readline = require('readline-sync');
const possibleChoices = ['rock', 'paper', 'scissors'];


function createPlayer() {
  return {
    move: null,
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

  displayWelcomeMessage() {
    console.log(`Welcome to Rock, Paper, Scissors!`);
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You choosed: ${humanMove}\nComputer choosed: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You Win!');
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
                    (computerMove === 'paper' && humanMove === 'rock') ||
                    (computerMove === 'scissors' && humanMove === 'paper')) {
      console.log('Computer wins!');
    } else {
      console.log(`it's a tie.`);
    }
  },

  playAgain () {
    let again = readline.question(`Would you like to play another game (y/n)?\n`);
    while (again.trim().toLowerCase() !== 'y' && again.trim().toLowerCase() !== 'n') {
      again = readline.question('Please provide a valid anwser.\n');
    }
    return again === 'y';
  },

  play () {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) {
        break;
      }
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();