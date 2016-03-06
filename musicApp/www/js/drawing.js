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

    var keywidth = width/keys;
    var keyx = 30;

    console.log('drawing keyboard')

    for (var i = 0; i < keys; i++) {

/*     if(((i%2)!=0) || ((i%6)!=0)) {
        console.log('drawing black key')
        drawKey(svg, keyx +(i*keywidth), 50, keywidth, 100, "white"));
        i++;
        drawKey(svg,(keyx -(keywidth/2))+(i*keywidth), 50-20, keywidth, 100-20,"black"));
       }
      else{ //draw white key
        drawKey(svg,keyx+(i*keywidth), 50, keywidth, 100, "white"));
      }*/

      //This is the mess of unfactored code- keeping because it doesn't use the new method

     if(((i%2)!=0) || ((i%6)!=0)) {
      //drawing white keys
      console.log('drawing white key')
      var key = svg.rect(keyx+((i)*keywidth), 50, keywidth, 100);
      key.attr({
        fill: "white",
        stroke: "#000",
        strokeWidth: 2
      })
      i++; //commenting out this line will correct the spacing of white keys, but also draw way too many
      //makes black key
      console.log('drawing black key')
      var key = svg.rect((keyx-(keywidth/2))+((i-1)*keywidth), 50-20, keywidth, 100-20); //3rd and 7th keys have no black keys, use mod
      key.attr({
        fill: "black",
          stroke: "#000",
          strokeWidth: 2
      })
      }

      else{
        //drawing white keys
        console.log('drawing white key')
        var key = svg.rect(keyx+(i*keywidth), 50, keywidth, 100);
        key.attr({
          fill: "white",
          stroke: "#000",
          strokeWidth: 2
        })
        //keyx = keyx+keywidth; //sets up position of next key
      }

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
    //drawKey: drawKey
  };

  return exports;
})();
