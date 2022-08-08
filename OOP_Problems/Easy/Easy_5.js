/*
Given a class Animal create two classes Cat and Dog that inherit from it.
The Cat constructor should take 3 arguments, name, age and status. 
Cats should always have a leg count of 4 and a species of cat. 
Also, the introduce method should be identical to the original except, after the phrase there should be a single space and the words Meow meow!. 
For example:
*/



/*
The Dog constructor should take 4 arguments, name, age and status and master. 
Dogs should always have a leg count of 4 and a species of dog. Dogs have the same introduce method as any other animal, 
but they have their own method called greetMaster(), which accepts no arguments and returns Hello (master's name)! Woof, woof!. 
(Make sure you replace (master's name) with the name of the dog's master.)
*/

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor (name, age, status) {
    super (name, age, 4, 'cat', status);
  }
  // static legs = 4;
  // static species = 'cat';
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}. Meow meow!"`;
  }
}

Cat.legs = 4;
Cat.species = 'cat';

class Dog extends Animal {
  constructor (name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }
  static legs = 4;
  static species = 'dog';
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce()); // === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true
console.log(cat.species);
console.log(cat.legs);
console.log(cat);