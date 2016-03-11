var Drawing = (function() {

/*
Draws a keyboard out of svg vector rectangles, position (x,y), and TOTAL size width*height with keys keys.
TODO: change signature to drawKeyboard(svg, x, y, width, height, keys, pressCB, releaseCB)
TODO: and modify the code so when nth key is pressed pressCB(n) is called and when you release it, releaseCB(n) is called
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
    /*For those using the indexes in these arrays to play notes:
      Indexes for whiteKeys should be 0-7
      Indexs*/

    console.log('drawing keyboard')

     for (var i = 0; i < (keys-((keys/13)*5)); i++) {
      console.log('drawing white key')
      drawKey(svg,keyx+(i*keywidth), y, keywidth, height, "white");
      }

    for(var i = 0; i < ((keys/13)*7); i++) {
      if( i%7 === 2  || i%7 === 6 ) continue;
        console.log('drawing black key')
        drawKey(svg,(keyx+(keywidth*0.75))+(i*keywidth), y, (keywidth/2), height*(3/5), "black");
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
/*     if(color = "white") {whiteKeys.push(key);}
     else {blackKeys.push(key);}

     key.click(clickCallBack);*/
  }

  /*Reacts to button presses and calls the supercolider*/
  var clickCallBack = function(pressCB) {
    //what do I dooo???
  }


  var exports = {
    drawKeyboard: drawKeyboard
    //drawKey: drawKey
  };

  return exports;
})();
