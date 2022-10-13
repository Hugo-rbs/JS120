/*
needed: 
1. constructor function/class to build pet instances
input:
- animal: string 
- name: string 
output:
return a pet instance with two properties: animal and name 

2. constructor function/class build owner instances 
input: 
- name 
output:
new person instance with a name property and a numberOfPets method that will return the number of pets owned by the owner 

3.shelter constructor/class to build shelter instances: 
input: none
output: new instance of the sheleter constructor 

the shelter instances should have access to two methods:
adopt: 
input:
- new owner name
- pet name 

*/

class Pet {
  constructor (animal, name) {
    this.animal = animal;
    this.name = name;
  }
  info () {
    return `a ${this.animal} named ${this.name}.`;
  }
}

class Owner {
  constructor (name) {
    this.name = name;
    this.pets = [];
  }
  addPets (pet) {
    this.pets.push(pet);
  }
  numberOfPets() {
    return this.pets.length;
  }
  printPets() {
    this.pets.forEach(pet => console.log(pet.info()));
  }
}

class Shelter {
  constructor () {
    this.owners = {};
  }
  adopt (owner, pet) {
    owner.addPets(pet);
    if (!this.owners[owner.name]) {
      this.owners[owner.name] = owner;
    }
  }
  printAdoptions() {
    for (let owner in this.owners) {
      console.log(`${owner} has adopted the following pets:`);
      this.owners[owner].printPets();
      console.log('');

    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();




shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// console.log(phanson.numberOfPets());
/*
P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.
*/

// let gogo = {
//   name: 'gogo',
//   age: 7,
//   size: 'small',
// }

// for (let prop in gogo) {
//   console.log(`${prop}: ${gogo[prop]}`);
// }