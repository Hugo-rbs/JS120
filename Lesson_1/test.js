let obj = {};
let obj2 = {
  a: 1,
  b: 2,
}
global.Object = obj;
console.log(global.Object.__proto__);
console.log(global.Object.constructor); // logs TypeError: Object.keys is not a function

console.log(Object.keys(obj));