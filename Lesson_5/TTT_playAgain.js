/*
- After each game ends, the program should ask the human player whether they want to play again. 
If they do, then the program should start a new game of TTT. Otherwise, it should end the program.

- The program should accept y or n (in lowercase or uppercase) as valid answers at the "play again?" prompt; all other answers are invalid.

- The program should display the welcome message before the first game starts. It should never display the message again.

- The program should display the results after each game ends, but before asking whether the human player wants to play again.
- The program should display the goodbye message when the human player decides that he doesn't want to play again. 
It should never display the goodbye message before that.


*/

let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor (marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }
  setMarker(marker) {
    this.marker = marker;
  }
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
  getMarker () {
    return this.marker;
  }
}

class Board {
  constructor () {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }
  display () {
    console.log('');
    console.log('     |     |');
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log("     |     |");
    console.log("");
  }
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }
  isFull() {
    return this.unusedSquares().length === 0;
  }
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }
  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
}


class Player {
  constructor (marker) {
    this.marker = marker;
  }
  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor () {
    super (Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor () {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGames {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"], // top row
    ['4', '5', '6'], // middle row
    ['7', '8', '9'], // bottom row
    ['1', '4', '7'], //
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ]

  static joinOr (arr, separator1 = ', ', separator2 = 'or') {
    if (arr.length === 1) {
      return arr[0].toString();
    } else if (arr.length === 2) {
      return `${arr[0]} ${separator1} ${arr[1]}`;
    } else {
      let lastEl = arr[arr.length - 1];
      let result = arr.slice(0, -1).join(separator1);
      return `${result}${separator1}${separator2} ${lastEl}`;
    }
  }

  constructor () {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play () {

    this.displayWelcomeMessage();
    while (true) {
      this.board.display();
      while (true) {
        this.humanMoves();
        if (this.gameOver()) break;

        this.computerMoves();
        if (this.gameOver()) break;

        this.board.displayWithClear();
      }
      this.board.displayWithClear();
      this.displayResults();
      if (!this.playAgain()) break;
      this.resetBoard();
      console.clear();
    }
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage () {
    console.log('Welcome to Tic Tac Toe!');
  }
  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }
  displayResults () {
    if (this.isWinner(this.human)) {
      console.log(`You won! Congratulations!`);
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that human!');
    } else {
      console.log(`A tie game, how boring`);
    }
  }

  isWinner(player) {
    return TTTGames.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
  humanMoves() {
    let choice;
    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGames.joinOr(validChoices, ', ')}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log('');
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }
  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    this.board.markSquareAt(choice, this.computer.getMarker());
  }
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }
  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
  playAgain() {
    let again = readline.question('Would you like to play another round (y/n): ');
    return again.trim().toLowerCase() === 'y';
  }
  resetBoard() {
    this.board = new Board();
  }
}


let game = new TTTGames();
game.play();
