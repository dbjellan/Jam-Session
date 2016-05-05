var Instruments = (function() {

  var Metronome = function() { //<-- A metronome is not an instrument, what is it doing here?
    this.BPM = 120;
    this.enabled = false
    this.playing = false
    var thisobj = this
    if (ionic.Platform.isAndroid()) {
      ionic.Platform.ready(function() {
        args = {
          tempo: 0.0,
          filterfreq: 1000,
          rq: 1.0
        }
        supercollider.createSynth("metro", args, function(synthID) {
          thisobj.synthID = synthID
          console.log('got synthid : ' + synthID)
        })
      })
    }
  }

  Metronome.prototype.setBPM = function(BPM) {
    this.BPM = BPM
  }

  Metronome.prototype.play = function() {
    if (this.enabled) {
      console.log('starting metronome with temp: ' + this.BPM/60)
      this.playing = true
      if (ionic.Platform.isAndroid()) {
        ionic.Platform.ready(function() {
          var args = {
            tempo: this.BPM/60
          }
          supercollider.setArgs(this.synthID, args)
        })
      }
    }
  }

  Metronome.prototype.toggle = function() {
    this.enabled = ! this.enabled
    if (this.playing) {
      this.playing = false
    }
    console.log('metronome is enabled: ' + this.enabled)
  }

  Metronome.prototype.stop = function() {
    console.log('stopping metronome')
    this.playing = false
    if (ionic.Platform.isAndroid()) {
      ionic.Platform.ready(function() {
        var args = {
          tempo: 0,
        }
        supercollider.setArgs(this.synthID, args)
      })
    }
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
