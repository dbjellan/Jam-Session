var Drawing = (function() {
/*
Draws a keyboard out of svg vector rectangles, position (x,y), and TOTAL size width*height with keys keys.
TODO: deal with multitouch??
*/
  var KeyboardUI = function(svg, x, y, width, height, keys, pressCB, releaseCB) {
    this.height = height
    this.width = width

    //sets defaults if arguments not passed in
    this.keys = keys ? keys : 24
    this.pressCB = pressCB ? pressCB : console.log
    this.releaseCB = releaseCB ? releaseCB : console.log

    var whiteKeys = Math.floor(keys/12)*7 //only correct for even number of octaves
    this.keywidth = width/whiteKeys;

    this.blackKeyBuffer = []

    console.log('drawing keyboard with ' + this.keys + ' keys');

    var drawnKeys = 0;
    var i = 0;
    while(drawnKeys < keys) {
      console.log('drawing white key')
      this.drawWhiteKey(svg, i*this.keywidth, y, drawnKeys);
      drawnKeys++;
      if (i%7 !== 2  && i%7 !== 6) {
        console.log('drawing black key')
        //add black key to be drawn after white keys so drawn on top
        this.addBlackKey(svg,this.keywidth*0.75+(i*this.keywidth), y, drawnKeys);
        drawnKeys++;
      }
      i++;
    }
    this.drawBlackKeys()
  }

  KeyboardUI.prototype.addBlackKey = function(svg, x, y, id) {
    this.blackKeyBuffer.push(this.drawKey.bind(this, svg, x, y, this.keywidth/2, this.height*(3/5), "black", id));
  }

  KeyboardUI.prototype.drawBlackKeys = function() {
    for (var i = 0; i < this.blackKeyBuffer.length; i++) {
      this.blackKeyBuffer[i]()
    }
  }

  KeyboardUI.prototype.drawWhiteKey = function(svg, x, y, id) {
    this.drawKey(svg, x, y, this.keywidth, this.height, "white", id);
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
        id: idNum,
      });

    var pressCB = this.pressCB;
    var releaseCB = this.releaseCB;

    /*Reacts to button presses by changing color and calling the supercolider sound method*/
    var keyPressed = function(event) {
      var key = event.target;
      key.attributes.fill.value = "grey";
      console.log('pressed key #' + key.attributes.id.value)
      pressCB(key.attributes.id.value);
    }

    /*Reacts to button release by reverting color and stopping the supercolider sound method*/
    var keyReleased = function(event) {
      var targetKey = event.target;
      targetKey.attributes.fill.value = color;
      console.log('released Key #' + targetKey.attributes.id.value)
      releaseCB(targetKey.attributes.id.value);
    }

    //TODO: check if bind is needed here
    key.mousedown(keyPressed);
    key.mouseover(keyReleased);
    key.mouseup(keyReleased);
  }

  KeyboardUI.prototype.drawKey = drawKey;

  var exports = {
    KeyboardUI: KeyboardUI,
  };

  return exports;
})();
