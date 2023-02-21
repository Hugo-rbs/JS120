let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    },this);
  },
};

console.log(franchise.allMovies()); // this will return undefined 1... and so one the reason for this behavior is
// that the callback function within the map method is executed as a stand-alone function. In order to troubleshoot this issue we can restore 
// the execution context with the this keyword