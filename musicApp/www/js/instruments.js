var Instruments = (function() {

  var InstrumentController = function() {

  }

  var InstrumentRecorder = function(instrumentConstructor) {
    this.startTime = null
    this.instrumentConstructor = instrumentConstructor
    this.clip = []

  }

  InstrumentRecorder.prototype.startRecording = function() {
    if (! this.startTime) {
      this.startTime = new Date()
    }
  }

  InstrumentRecorder.prototype.getRecording = function() {
    if (this.duration) {
      var recordingObj = {
        instrumentConstructor: this.instrumentConstructor,
        data: this.clip,
        duration: this.duration
      }
      return recordingObj
     }
  }

  InstrumentRecorder.prototype.stopRecording = function() {
    if (this.startTime) {
      this.duration = new Date() - this.startTime
      return this.getRecording()
    }
  }

  InstrumentRecorder.prototype.recordAction = function(actionCB) {
    if (this.startTime) {
      var time = new Date() - this.startTime
      this.clip.push([time, actionCB])
    }
  }

  var Loop = function(clip) {
    this.clip = clip
    this.numLoops = 1
  }

  Loop.prototype.setNumLoops = function(n) {
    this.numLoops = n
  }

  Loop.prototype.play = function() {
    var instrument = new this.clip.instrumentConstructor()
    for (var i = 0; i < this.clip.data.length; i++) {
      this.recording.data[i].bind(instrument)
    }
    this.startTime = new Date()
    this.actionIndex = 0
    window.setInterval(this._play.bind(this), 50)

  }

  Loop.prototype._play = function() {
    var time = new Date() - this.startTime
    while(this.recording.data[this.actionIndex][0] < time) {
      this.recording.data[this.actionIndex][1]()
      this.actionIndex++
    }
  }

  var Sequencer = function() {

  }

  //keyboard instrument with
  var Keyboard = function(numKeys, startingKey, instrumentRecorder) {
    var defaultKeys = 24
    var defaultStartingKey = 49
    this.numKeys = numKeys ? numKeys : defaultKeys
    this.startingKey = startingKey ? startingKey : defaultStartingKey
    this.instrumentRecorder = instrumentRecorder
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
          thisobj.instrumentRecorder.recordAction(keyReleased.bind(undefined, id))
        }
      }
    }

    this.ui = new Drawing.KeyboardUI(svg, x, y, width, height, this.numKeys, keyPressed, keyReleased)
  }

  var exports = {
    Keyboard: Keyboard,
    InstrumentRecorder: InstrumentRecorder
  }

  return exports
})()
