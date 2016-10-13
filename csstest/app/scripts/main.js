$(document).ready(function(){
  // Create a new color every two seconds
  /**var colorPads = ["first","second","third","fourth","fifth",
  "sixth","seventh","eighth","ninth","tenth",
  "eleventh","twelfth","thirteenth","fourteenth","fifteenth"];
  **/

  setInterval(function(){
    $(".inner").each(function() {
      var currentDiv = $(this);
      $.when(generateRandomColor()).done(function (colorReturned){
        console.log("Function has executed for inner div" + colorReturned);
        currentDiv.css("background-color", colorReturned);
      });
    })
  }, 2501);

})


// SUPER NOT OPTIMIZED
// Function that generates a random color;
function generateRandomColor(){
  return $.Deferred(function (){
    var self = this;

    // Randomt time between 1000 and 2500 milliseconds
    var randomTime = (Math.random() * 2500) + 1000;
    setTimeout(function (){
      // Generate a random value between 0 and 16 and then cast to hexa ?
      var hexaValues = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
      var resultingColor = "#";
      // Run it 6 consecutive times and append values to a string
      for (var i = 0; i < 6; i++) {
        var randomIndex = Math.round(Math.random() * 15);
        //console.log("Random value " + hexaValues[randomIndex]);
        resultingColor = resultingColor.concat(hexaValues[randomIndex].toString());
      }
      self.resolve(resultingColor);
      //console.log("Color is " + resultingColor);
    }, randomTime);
  });
}
