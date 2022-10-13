/*
TicTacToe
game description:

- 2 players board game
- board generated is a 3*3 grid
- Players take turn marking a square with a marker that identifies the player
- Traditionally the player to go first uses the marker 'X' to mark his/her squares, and the plater to go second uses the marker 'O'
- The first player to mark 3 squares in a row with his/her marker wins the game
- A row can be horizontal, vertical or or either one of the two diagonals
- There is one human player and one computer player
- The human player always move (place a marker) first in this version

Indentify verbs and nouns:

Nouns: Board, Grid, Square, Marker, Row, Player, human, computer
Verbs: Play, mark, move, place

Organize:
Game(n)
Board(n)
Row(n)
Square(n)
Marker(n)
Player(n)
 - Mark(v)
 - Play(v)
 - Human(n)
 - Computer(n)


*/

// Scaffolding
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
  constructor () {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play () {

    this.displayWelcomeMessage();
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
      const prompt = `Choose a square (${validChoices.join(', ')}): `;
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
}


let game = new TTTGames();
game.play();
