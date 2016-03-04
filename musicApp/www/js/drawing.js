var Drawing = (function() {

/*
Draws a keyboard out of svg items(?), position (x,y), and TOTAL size width*height with keys keys.
(Currently not working)
(What Amber did: tried to make it do a full keyboard rather than one rectangle, added a new function to make a generic rectangle. None of it works though.)
*/
  var drawKeyboard = function(svg, x, y, width, height, keys) {
  //Avoids a case where the number of keys is undefined
    if (!keys) {
      keys = 13;
    }

    var keywidth = width/keys
    var keyx = 30;

    console.log('drawing keyboard')

    for (var i = 1; i <= keys; i++) {

      if(i%3 || i%7) { //makes black key
        keyx += (keywidth/2);
        console.log('drawing black key')
        drawKey(svg, keyx, 50-(height*(2/3)), keywidth, 100-(height*(2/3)),"black"));
        keyx += (keywidth/2);
        }
      else{ //draw white key
        keyx += keywidth;
        drawKey(svg, keyx, 50, keywidth,100,"white");
      }

      //This is the mess of unfactored code- keeping because it doesn't use the new method

/*
      console.log('drawing white key')
      //drawing white keys
      var key = svg.rect(keyx, 50, keywidth, 100);
      key.attr({
        fill: "white",
            stroke: "#000",
            strokeWidth: 2
        })

      if(i%3 || i%7) {
      //makes black key
      keyx = keyx+(keywidth/2);
      console.log('drawing black key')
      keyx = keyx+(keywidth/2);
      var key = svg.rect(x, 50-20, keywidth, 100-20); //3rd and 7th keys have no black keys, use mod
      key.attr({
        fill: "black",
          stroke: "#000",
          strokeWidth: 2
      })
      }
      else{keyx = keyx+keywidth;} //updates position of next key
*/
    }
  }

  /*
   Draws a single key with parameters passed by the drawKeyboard function
  */
  var drawKey = function(svg, x, y, width, height, color) {
     var key = svg.rect(x, y, width, height);
          key.attr({
            fill: color,
                stroke: "#000",
                strokeWidth: 2
            });
  }

  var exports = {
    drawKeyboard: drawKeyboard
  };

  return exports;
})();
