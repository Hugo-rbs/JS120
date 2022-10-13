/*
When running the code snippet provided, a ReferenceError is return stating that morning has not been defined
The reason for this behavior is that we omitted the this keyword inside the greet function declaration.
Therefore, when we run the code, and the function looks for the variables we are trying to access, it looks on the global object
but since those variables have not been declared the ReferenceError arise.
Below is the code modify to return the exepcted values.
*/
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}


let helloVictor = createGreeter('Victor');
helloVictor.greet('morning'); // Good Morning Victor
