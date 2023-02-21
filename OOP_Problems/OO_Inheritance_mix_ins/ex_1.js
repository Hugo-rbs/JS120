class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

// option 1:
// class Car extends Vehicle {};
// class Truck extends Vehicle {};

// option 2: (showing intent so better)
class Car extends Vehicle {
  constructor (year) {
    super(year);
  }
}

class Truck extends Vehicle {
  constructor (year) {
    super(year);
  }
}


// let truck = new Truck(2003);
// console.log(truck.year); // 2003

let car = new Car(2015);
console.log(car.year); // 2015