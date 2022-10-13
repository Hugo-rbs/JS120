class Cat {
  constructor(name) {
    this.name = name;
  }
  rename () {
    this.name = 'Chloe';
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name); // Sophie
kitty.rename('Chloe');
console.log(kitty.name); // Chloe

/*
Expected output: 
Sophie
Chloe
*/