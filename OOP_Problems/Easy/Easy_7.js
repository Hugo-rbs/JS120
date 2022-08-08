// What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); // ByeBye we are calling the static dupData method on the Something constructor
console.log(thing.dupData()); // HelloHello, we are calling the instance method dupData on the instance named thing 