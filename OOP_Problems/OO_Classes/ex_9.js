/*
Modify the following code so that Hello! I'm a cat! is logged when Cat.genericGreeting is invoked.
*/

class Cat {
  // static genericGreeting() {
  //   console.log('Hello I am a cat!');
  // }
}

// or 

Cat.genericGreeting = function () {
  console.log("Hello I am a cat!");
}

Cat.genericGreeting();();