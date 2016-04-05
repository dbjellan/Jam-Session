var Drawing = (function() {

/*
Draws a keyboard out of svg vector rectangles, position (x,y), and TOTAL size width*height with keys keys.
*/
  var drawKeyboard = function(svg, x, y, width, height, keys, pressCB, releaseCB) {
  //Avoids a case where the number of keys is undefined
    if (!keys) {
      keys = 13;
    }

    var keywidth = width/keys;
    var keyx = 30;
    whiteKeys = []; //both of these arrays are global to reach the drawKeys function
    blackKeys = []; //this could be dangerous- how do you global only within a file again?

    console.log('drawing keyboard')

     for (var i = 0; i < (keys-((keys/13)*5)); i++) {
      console.log('drawing white key')
      drawKey(svg,keyx+(i*keywidth), y, keywidth, height, "white", i);
      }

    for(var j = 0; j < ((keys/13)*7); j++) {
      if( j%7 === 2  || j%7 === 6 ) continue;
        var k = i+j;
        console.log('drawing black key')
        drawKey(svg,(keyx+(keywidth*0.75))+(j*keywidth), y, (keywidth/2), height*(3/5), "black", k);
    }
  }

  /*
   Draws a single key with parameters passed by the drawKeyboard function
  */
  var drawKey = function(svg, x, y, width, height, color, idNum) {
     var key = svg.rect(x, y, width, height);
          key.attr({
            fill: color,
            stroke: "#000",
            strokeWidth: 2,
            id: idNum
          });

     key.mousedown(keyPressed);
     key.mouseup(keyReleased);
  }

  /*Reacts to button presses by changing color and calling the supercolider sound method*/
  var keyPressed = function(event) {
    var key = event.target;
    key.attributes.fill.value = "grey";
    console.log('pressed a key')

    //pressCB(key.attributes.id.value);
  }

  /*Reacts to button release by reverting color and stopping the supercolider sound method*/
  var keyReleased = function(event) {
    var key = event.target;
    if(key.attributes.id.value <= 7) {
      key.attributes.fill.value = "white";
    }
    else {key.attributes.fill.value = "black";}
    console.log('released a key')
    //releaseCB(key.attributes.id.value);
  }


  var exports = {
    drawKeyboard: drawKeyboard
  };

  return exports;
})();
