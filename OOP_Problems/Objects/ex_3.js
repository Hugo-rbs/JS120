/*
In JavaScript, comparing two objects either with == or === checks for object identity. 
In other words, the comparison evaluates as true if it's the same object on either side of == or ===. 
This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. 
JavaScript doesn't give us a way to do that.

Write a function objectsEqual that accepts two object arguments and returns true or false 
depending on whether the objects have the same key/value pairs.

input: two objects
- object1
- object2

output: boolean
- true if both objects have the same properties (key/value pairs)
- false otherwise

test cases:
1/ input: {a: 'foo'}, {a: 'foo'}
output: true

2/ input: {a: 'foo', b: 'bar'}, {a: 'foo'}
output: false 

3/ input: {}, {}
output: true 

4/ input: {a: 'foo', b: undefined}, {a: 'foo', c: 1}
output: false

- check if both object have the same count of properties return false if not 
- check if all properties on objA and objB are the same if not return false 
- check if the values on both objects are the same if not return false 

SET objAKeys init to the return value of calling the object.keys method on objA 
SET objBKeys initi to return value of calling the object.keys method on objB
Call the samePropertyCount function to check for equal length
IF it return false 
  return false 
Else call the areKeysEqual function
*/

function objectsEqual(objA, objB) {
  let objAKeys = Object.keys(objA);
  let objBKeys = Object.keys(objB);
  if (sameLength(objAKeys, objBKeys) && sameKeys(objAKeys, objBKeys)) {
    return objAKeys.every(key => objA[key] === objB[key]);
  } else {
    return false;
  }
}

function sameLength(arr1, arr2) {
  return arr1.length === arr2.length;
}

function sameKeys(arr1, arr2) {
  return arr1.every((val, idx) => {
    return val === arr2[idx];
  });
}


console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false