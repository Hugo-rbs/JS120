// The code below is expected to output the following when run:

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
          msg += `${morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
console.log(helloVictor);

// helloVictor.greet('morning'); // Good Morning is expected

// However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

/*
anwser:
When the code snippet above is ran, an error message occurs as soon as the greet method is being invoked - Stating that morning variable
has not been defined. The reason for this behavior is that when we define the function greet, we did not explicitly provide an execution context.
functions ran as stand alone function have an implicit execution context set to the global object. therefore when the function is executed 



*/