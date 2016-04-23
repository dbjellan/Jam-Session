var Instruments = (function() {

  var InstrumentController = function() {

  }

  var InstrumentRecorder = function(instrumentConstructor) {
    this.startTime = false
    this.instrumentConstructor = instrumentConstructor
    this.recording = []

  }

  InstrumentRecorder.prototype.startRecording = function() {
    if (! this.startTime) {
      this.startTime = new Date()
    }
  }

  InstrumentRecorder.prototype.getRecording = function() {

  }


  //keyboard instrument with
  var Keyboard = function(numKeys, startingKey) {
    this.numKeys = numKeys ? numKeys : 24
    this.startingKey = startingKey ? startingKey : 49
    this.synths = {}
    for (var i = 0; i < this.numKeys; i++) {
      var frequency = Math.pow(2, (i+this.startingKey-49)/12.0)*440
      console.log(frequency)
      var args = {
        freq: frequency,
        a: .4,
        d: .9,
        s: .1,
        r: .5,
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
              console.log("registered synthID: " + synthID + " associated with key " + j)
              thisobj.synths[j] = synthID
            })
           })
         })();
       }
    }
  }


  Keyboard.prototype.drawUI = function(svg, x, y, width, height) {
    //TODO: ?? do we need to check if everything initialized properlly
    thisobj = this
    var keyPressed = function(id) {
      if (id in thisobj.synths) {
        console.log("sending key press message to synth " + thisobj.synths[id])
        var synthID = thisobj.synths[id]
        if (ionic.Platform.isAndroid())
          supercollider.setArgs(synthID, {gate: 1})
      }
    }

    var keyReleased = function(id) {
      if (id in thisobj.synths) {
        console.log("sending key release message to synth " + thisobj.synths[id])
        var synthID = thisobj.synths[id]
        if (ionic.Platform.isAndroid())
          supercollider.setArgs(synthID, {gate: 0})
      }
    }

    this.ui = new Drawing.KeyboardUI(svg, x, y, width, height, this.numKeys, keyPressed, keyReleased)
  }

  var exports = {
    Keyboard: Keyboard
  }

  return exports
})()
