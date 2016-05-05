var Instruments = (function() {

  var Metronome = function() { //<-- A metronome is not an instrument, what is it doing here?

  }

  Metronome.prototype.play = function() {

  }

  //keyboard instrument with numKeys keys, [WHAT ARE THESE OTHER PARAMETERS DOING]
  var Keyboard = function(numKeys, instrumentRecorder, startingKey) {
    var defaultKeys = 24
    var defaultStartingKey = 49
    this.numKeys = numKeys ? numKeys : defaultKeys
    this.startingKey = startingKey ? startingKey : defaultStartingKey
    this.instrumentRecorder = instrumentRecorder
    this.synths = {}
    for (var i = 0; i < this.numKeys; i++) {
      var frequency = Math.pow(2, (i+this.startingKey-49)/12.0)*440
      var args = {
        freq: frequency,
        a: 0.4,
        d: 0.9,
        s: 0.1,
        r: 0.5,
        gate: 0
      }
      var thisobj = this;
      if (ionic.Platform.isAndroid()) {
        (function(){
          //copy variables into new closures to not overwritten on as loop iterates
          var j = i;
          var thisargs = args;
          ionic.Platform.ready(function() {
            console.log("creating synth:" + JSON.stringify(thisargs))
            supercollider.createSynth("pianoKey", thisargs, function(synthID) {
              thisobj.synths[j] = synthID
            })
           })
         })();
       }
    }
  }


  Keyboard.prototype.drawUI = function(svg, x, y, width, height) {
    //TODO: ?? do we need to check if everything initialized properly
    thisobj = this
    var keyPressed = function(id) {
      if (id in thisobj.synths) {
        console.log("sending key press message to synth " + thisobj.synths[id])
        var synthID = thisobj.synths[id]
        if (ionic.Platform.isAndroid())
          supercollider.setArgs(synthID, {gate: 1})
        if (thisobj.instrumentRecorder) {
          thisobj.instrumentRecorder.recordAction(keyPressed.bind(thisobj, id))
        }
      }
    }

    var keyReleased = function(id) {
      if (id in thisobj.synths) {
        console.log("sending key release message to synth " + thisobj.synths[id])
        var synthID = thisobj.synths[id]
        if (ionic.Platform.isAndroid())
          supercollider.setArgs(synthID, {gate: 0})
        if (thisobj.instrumentRecorder) {
          console.log('recording action')
          thisobj.instrumentRecorder.recordAction(keyReleased.bind(undefined, id))
        }
      }
    }

    this.ui = new Drawing.KeyboardUI(svg, x, y, width, height, this.numKeys, keyPressed, keyReleased)
  }

  var exports = {
    Keyboard: Keyboard,
    Metronome: Metronome
  }

  return exports
})()
