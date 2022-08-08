/*
Write a function objectsEqual that accepts two object arguments and returns true or false 
depending on whether the objects have the same key/value pairs.

input: 
- Object 1
- Object 2

output:
- boolean true if both objects hold the same key/value pairs false otherwise

- SET keys1 init to the return value of calling the Object.keys method on Obj1
- SET keys2 init to the return value of calling the Object.keys method on Obj1

*/
function objectsEqual(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj1Values = Object.values(obj1);
  let obj2Keys = Object.keys(obj2);
  let obj2Values = Object.values(obj2);
  if (obj1Keys.length === obj2Keys.length) {
    if (obj2Keys.every((key, idx) => key === obj1Keys[idx]) && 
    obj2Values.every((value, idx) => value === obj1Values[idx])) {
      return true;
    }
  } 
  return false;
}



console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false