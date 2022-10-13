/*
Let's give the computer some smarts -- a touch of Artificial Intelligence if you will.
We'll make the computer defensive-minded.

If there's an immediate threat on the board, the computer should defend against that threat. 
An immediate threat is present when the human has 2 squares in a row with an unused square in the 3rd 
position of that row. The computer needs to defend that square; 
it must block that move by claiming the unused square. 
That is, the computer should place its marker on the unused square.

set movesToCounter:
[[1, 2], [2, 3], [1, 3], // first line horizontal
 [4, 5], [5, 6], [4, 6], // second line horizontal
 [7, 8], [8, 9], [7, 9], // third line horizontal
 [1, 4], [4, 7], [1, 7], // first line vertical
 [2, 5], [5, 8], [2, 8], // second line vertical
 [3, 6], [6, 9], [3, 9], // third line vertical
 [1, 5], [5, 9], [1, 9], // first diagonal
 [3, 5], [5, 7], [3, 7]] // second diagonal

The computer can continue to select random squares when there is no immediate threat.

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
