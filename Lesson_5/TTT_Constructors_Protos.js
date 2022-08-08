let readline = require("readline-sync");

function Square (marker) {
  this.marker = marker || Square.UNUSED_SQUARE;
}

Square.UNUSED_SQUARE = ' ';
Square.HUMAN_MARKER = 'X';
Square.COMPUTER_MARKER = 'O';

Square.prototype = {
  toString() {
    return this.marker;
  },
  setMarker(marker) {
    this.marker = marker;
  },
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },
  getMarker () {
    return this.marker;
  }
};

Square.prototype.constructor = Square;

function Board () {
  this.squares = {};
  for (let counter = 1; counter <= 9; ++counter) {
    this.squares[String(counter)] = new Square();
  }
}

Board.prototype = {
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
  },
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },
  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },
  isFull() {
    return this.unusedSquares().length === 0;
  },
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  },
  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
};

Board.prototype.constructor = Board;

function Player (marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function () {
  return this.marker;
};

function Human () {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer () {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGames () {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}
TTTGames.POSSIBLE_WINNING_ROWS = [
  ["1", "2", "3"], // top row
  ['4', '5', '6'], // middle row
  ['7', '8', '9'], // bottom row
  ['1', '4', '7'], //
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
];

TTTGames.prototype = {
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
  },
  displayWelcomeMessage () {
    console.log('Welcome to Tic Tac Toe!');
  },
  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  },
  displayResults () {
    if (this.isWinner(this.human)) {
      console.log(`You won! Congratulations!`);
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that human!');
    } else {
      console.log(`A tie game, how boring`);
    }
  },
  isWinner(player) {
    return TTTGames.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
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
  },
  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));
    this.board.markSquareAt(choice, this.computer.getMarker());
  },
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },
  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
};


let game = new TTTGames();
game.play();
