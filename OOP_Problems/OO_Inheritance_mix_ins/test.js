/*
Write a function that acts like the built-in Array.prototype.reduce method. 
For this problem, you only need to emulate the most basic behavior: 
reducing the elements of an array down to a single value based on the original array values. 
The result may be a primitive value, an object, or another array. 

reduce 
array | callback function | starting value
SET variable index to 0
IF no starting value is provided
  SET variable accumulator to array at iterator index
  REASSIGN index to its value + 1
IF a starting value is provided
  SET variable accumulator to the starting value
WHILE iterator is smaller than the array's length
  rassign accumulator to its current value + value of the element at current index of the array 
  increase iterator by one
RETURN accumulator
*/

function reduce(array, callback, startingValue) {
  let index = 0;
  let accumulator = startingValue;
  if (accumulator === undefined) {
    accumulator = array[0];
    index += 1;
  }
  while (index < array.length) {
    accumulator = callback(accumulator, array[index]);
    index += 1;
  }
  return accumulator;
}

let numbers = [1, 2, 3, 4, 5];
console.log(reduce(numbers, (accum, number) => accum + number));   // => 15
console.log(reduce(numbers, (prod, number) => prod * number));     // => 120
console.log(reduce(numbers, (prod, number) => prod * number, 3));  // => 360
console.log(reduce([], (accum, number) => accum + number, 10));    // => 10
console.log(reduce([], (accum, number) => accum + number));
// => undefined

let stooges = ["Mo", "Larry", "Curly"];
console.log(reduce(stooges, (reversedStooges, stooge) => {
  reversedStooges.unshift(stooge);
  return reversedStooges;
}, []));
// => ["Curly", "Larry", "Mo"]