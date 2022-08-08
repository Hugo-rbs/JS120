/*
A grocery store uses a JavaScript function to calculate discounts on various items. 
They are testing out various percentage discounts but are getting unexpected results. 
Go over the code, and identify the reason why they aren't getting the expected discounted prices 
from the function. Then, modify the code so that it produces the correct results.
*/

// original code 

// let item = {
//   name: 'Foo',
//   description: 'Fusce consequat dui est, semper.',
//   price: 50,
//   quantity: 100,
//   discount: function(percent) {
//     let discount = this.price * percent / 100;
//     this.price -= discount;
    
//     return this.price;
//   },
// };

/*
The values returned by calling the discount method are not the ones expected because the method
updates the value of the price property instead of returning a new discounted value. 
The first method call with the number 20 as an argument returns the correct value, a 20% is applied 
on the $50 original price, that value is updated under the price property though so whne the second
method call runs, the value of it's argument to which price is pointing to is now 40
// solution

// let item = {
//   name: 'Foo',
//   description: 'Fusce consequat dui est, semper.',
//   price: 50,
//   quantity: 100,
//   discount: function(percent) {
//     let discount = this.price * percent / 100;
//     return this.price - discount;
//   },
// };

console.log(item.discount(20));   // should return 40
console.log(item.discount(50));   // should return 25
console.log(item.discount(25));   // should return 37.5