class MotorizedVehicle {
  constructor(make, model, wheelsCount) {
    this.make = make;
    this.model = model;
    this.wheelsCount = wheelsCount;
  }
  getWheels() {
    return this.wheelsCount;
  }
  info() {
    return `${this.make} ${this.model}`;
  }
}


class Car extends MotorizedVehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends MotorizedVehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends MotorizedVehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

let prius = new Car('Toyota', 'Prius');
let suzuki = new Motorcycle('Suzuki', 'z1')
let volvo = new Truck('Volvo', 'XC90');

console.log(prius.getWheels());