let readline = require("readline-sync");

let Square = {
  UNUSED_SQUARE: ' ',
  HUMAN_MARKER: 'X',
  COMPUTER_MARKER: 'O',
  init (marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },
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

let Board = {
  init () {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = Object.create(Square).init();
    }
    return this;
  },
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


let Player = {
  init (marker) {
    this.marker = marker;
    return this;
  },
  getMarker() {
    return this.marker;
  }
};

// let Human = Object.create(Player).init(Square.HUMAN_MARKER);
// let Computer = Object.create(Player).init(Square.COMPUTER_MARKER);

let TTTGames = {
  POSSIBLE_WINNING_ROWS: [
    ["1", "2", "3"], // top row
    ['4', '5', '6'], // middle row
    ['7', '8', '9'], // bottom row
    ['1', '4', '7'], //
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ],
  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Player).init(Square.HUMAN_MARKER);
    this.computer = Object.create(Player).init(Square.COMPUTER_MARKER);
    return this;
  },
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



let game = Object.create(TTTGames).init();
game.play();
