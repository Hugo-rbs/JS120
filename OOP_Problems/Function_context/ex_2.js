/*
The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/
// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + ' ' + number;
//     });
//   },
// };



/*
On the code snippet above, the callback function inside the map method is invoked as a stand-alone function.
Therefore when we try to access the 'name' property it looks for a property 'name' on the global object.
to troubleshoot this issue we can restore the context by using the self keyword, using an arrow function or the optional thisArg argument:


*/
// option 1: 

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + ' ' + number;
//     }, this);
//   },
// };

// option 2:

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(number => this.name + ' ' + number);
//   },
// };

//option 3:

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());