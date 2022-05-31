// Question 1 //
//
// The code should return one. On line 1 the variable qux is declared and initialized to the object value  // { foo: 1},
// On line 2, the variable baz is declared and initialized to the return value of calling the Object.create() method on the object to which qux is pointing to
// which generates a new object with the following property {foo : 1}
// On line 3 the console.log method is invoked to print the return value of using the '+' operator on the value held by the foo key in both object held by the variables qux and baz



// question 2 // 
//
// The code will log: 3. On line 1 the variable qux is declared and initialized to the object value  // { foo: 1}.
// On line 2, the variable baz is declared and initialized to the return value of calling the Object.create() method on the object to which qux is pointing to
// which generates a new object that inherits from the properties of the object to which the variable qux is pointing to
// On line 3 the property 'qux' of the object to which the variable baz is pointing to gets overwritten with the following number value: 2
// On line 5 the console.log method is invoked to print the return value of using the '+' operator on the value held by the foo key in both object held by the variables qux and baz
// which return 3

// question 3 // 
//
// The code will log: 4. On line 1 the variable qux is declared and initialized to the object value  // { foo: 1}.
// On line 2, the variable baz is declared and initialized to the return value of calling the Object.create() method on the object to which qux is pointing to
// which generates a new object that inherits from the properties of the object to which the variable qux is pointing to
// On line 3 the property 'qux' of the object to which the variable qux is pointing to gets overwritten with the following number value: 2
// On line 5 the console.log method is invoked to print the return value of using the '+' operator on the value held by the foo key in both object held by the variables qux and baz
// which return 3

// question 4 // 
// function assignProperty(obj, key, value) {
//   while (obj !== null) {
//     if (obj.hasOwnProperty(key)) {
//       obj[key] = value;
//       break;
//     }
//     obj = Object.getPrototypeOf(obj);
//   }
//   return obj;
// }

// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// for (let prop in fooC) {
//   console.log(`${prop}: ${fooC[prop]}`);
// }

// console.log(fooC.propertyIsEnumerable('bar'));
// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false


// Question 5 //
// These loops will not return the same information when iterating over an object that relay on a prototype object.
// The for..in loop will return all the properties even the ones that are part of a prototype whereas
// the forEach method will only log the properties that belong to the object on which we are iterating 


// question 6 // 
// let a = Object.create(null);
// console.log(a);
// console.log(Object.getPrototypeOf(a));