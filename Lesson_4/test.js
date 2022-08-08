let fooA = { bar: 1};
let fooB =  Object.create(fooA);
let fooC = Object.create(fooB);


function assignProperty(obj, prop, newVal) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = newVal;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

assignProperty(fooC, 'bar', 2);
console.log(fooC.bar); // 2 
console.log(fooA.bar); // 2

assignProperty(fooC, 'qux', 3);
console.log(fooA.qux); // undefined
console.log(fooB.qux); // undefined

console.log(fooA.hasOwnProperty('qux')); // false
