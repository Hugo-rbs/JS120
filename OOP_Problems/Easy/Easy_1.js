//1. factory function

// function Rectangle(width, length) {
//   return {
//     width,
//     length,
//     getWidth() {
//       return this.width;
//     },
//     getLength() {
//       return this.length;
//     },
//     getArea() {
//       return this.length * this.width;
//     }
//   }
// }

// let rect = Rectangle(4, 5);

//2. Constructor/prototype 
// function Rectangle (width, length) {
//   if (!(this instanceof Rectangle)) {
//     return new Rectangle(width, length);
//   }
//   this.width = width;
//   this.length = length;
// }

// Rectangle.prototype.getLength = function () {
//   return this.length;
// };

// Rectangle.prototype.getWidth = function () {
//   return this.width;
// };

// Rectangle.prototype.getArea = function () {
//   return this.length * this.width;
// };

// let rect = new Rectangle(4, 5);
// let rect = Rectangle(4, 5);

//3. class declaration 

// class Rectangle {
//   constructor (width, length) {
//     this.width = width;
//     this.length = length;
//   }
//   getWidth() {
//     return this.width;
//   }
//   getLength () {
//     return this.length;
//   }
//   getArea() {
//     return this.width * this.length;
//   }
// }

//4. class expression

// let Rectangle = class {
//   constructor (width, length) {
//     this.width = width;
//     this.length = length;
//   }
//   getWidth() {
//     return this.width;
//   }
//   getLength() {
//     return this.length;
//   }
//   getArea() {
//     return this.width * this.length;
//   }
// }

// let rect = new Rectangle(4, 5);


// let rect = new Rectangle(4, 5);

//5. OLOO pattern //

let Rectangle = {
  init (length, width) {
    this.length = length;
    this.width = width;
    return this;
  },
  getLength() {
    return this.length;
  },
  getWidth() {
    return this.width;
  },
  getArea() {
    return this.length * this.width;
  }
};

let rect = Object.create(Rectangle).init(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20