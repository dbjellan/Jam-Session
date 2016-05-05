var Instruments = (function() {

  var Metronome = function() {

  }

  Metronome.prototype.play = function() {

  }

  //keyboard instrument with
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
              console.log('supercollider created synth, registering id'+ synthID)
            })
           })
         })();
       }
    }
  }

  Keyboard.prototype.keyPressed = function(id) {
    //console.log(JSON.stringify(this))
    if (id in this.synths) {
      console.log("sending key press message to synth " + this.synths[id])
      var synthID = this.synths[id]
      if (ionic.Platform.isAndroid())
        supercollider.setArgs(synthID, {gate: 1})
      if (this.instrumentRecorder) {
        this.instrumentRecorder.recordAction(this.keyPressed, [id])
      }
    } else {
    console.log('id not found:' + id)
  }
  }

  Keyboard.prototype.keyReleased = function(id) {
    //console.log(JSON.stringify(this))
    if (id in this.synths) {
      console.log("sending key release message to synth " + this.synths[id])
      var synthID = this.synths[id]
      if (ionic.Platform.isAndroid())
        supercollider.setArgs(synthID, {gate: 0})
      if (this.instrumentRecorder) {
        console.log('recording action')
        this.instrumentRecorder.recordAction(this.keyReleased, [id])
      }
    } else {
      console.log('id not found: ' + id)
    }
  }

  Keyboard.prototype.drawUI = function(svg, x, y, width, height) {
    //TODO: ?? do we need to check if everything initialized properlly
    this.ui = new Drawing.KeyboardUI(svg, x, y, width, height, this.numKeys,
       this.keyPressed.bind(this), this.keyReleased.bind(this))
  }

  var exports = {
    Keyboard: Keyboard,
    Metronome: Metronome
  }

  return exports
})()
