var Playback = (function() {

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
      console.log('returning recording')
      console.log('data:' + JSON.stringify(this.clip))
      var recordingObj = {
        instrumentConstructor: this.instrumentConstructor,
        data: this.clip,
        duration: this.duration
      }
      return recordingObj
     }
  }

  InstrumentRecorder.prototype.stopRecording = function() {
    console.log('stopped recording')
    if (this.startTime) {
      this.duration = new Date() - this.startTime
      this.startTime = false
      return this.getRecording()

    }
  }

  InstrumentRecorder.prototype.recordAction = function(actionCB, args) {
    if (this.startTime) {
      var time = new Date() - this.startTime
      this.clip.push([time, actionCB, args])
      console.log('recording action in instrument recorder: ' + args)
    }
  }

  var Track = function() {
    this.loops = []
  }

  Track.prototype.addLoop = function(loop) {
    var i = 0;
    while (loop.startTime < this.loops[i].startTime) {
      i++
    }
    this.loops.splice(i, 0, loop)
  }

  Track.prototype.play = function() {
    this.startTime = new Date()
    this.loopIndex = 0
    this._play()
  }

  Track.prototype._play = function() {
    var time = new Date() - this.startTime
    while (this.loopIndex < this.loops.length && time > this.loops[this.loopIndex].startTime) {
      this.loops[this.loopIndex].start()
      this.loopIndex++
    }

    if (this.loopIndex < this.loops.length) {
      var nextLoopTime = this.loops[this.loopIndex].startTime - time
      window.setTimeout(this._play.bind(this), nextLoopTime)
    }
  }

  var Loop = function(clip, startTime) {
    var defaultStart = 0;
    this.clip = clip
    this.numLoops = 1
    this.duration = clip.duration
    this.startTime = startTime ? startTime : defaultStart
  }

  Loop.prototype.setNumLoops = function(n) {
    this.numLoops = n
    this.duration = clip.duration * n
  }

  Loop.prototype.play = function() {
    //this.instrument = new this.clip.instrumentConstructor()
    this.instrument = new Instruments.Keyboard(36)
    //for (var i = 0; i < this.clip.data.length; i++) {
    //  this.clip.data[i][1].bind(this.instrument)
    //}
    console.log("playing with instrument: " + JSON.stringify(this.instrument))
    this.loopStart = new Date()
    this.actionIndex = 0
    this.completedLoops = 0
    this.intervalID = window.setInterval(this._play.bind(this), 50)

  }

  Loop.prototype._play = function() {
    var time = new Date() - this.loopStart
    var instrument = this.instrument
    //call callbacks to make noise according to current time
    while(this.actionIndex < this.clip.data.length && this.clip.data[this.actionIndex][0] < time) {
      console.log(JSON.stringify(instrument))
      //apply  action function with correction this and args
      this.clip.data[this.actionIndex][1].apply(instrument,
        this.clip.data[this.actionIndex][2])
      this.actionIndex++
    }

    //we finished one loop, restart if we have more to play, otherwise stop
    if (time > this.duration) {
      this.completedLoops++
      if (this.completedLoops < this.numLoops) {
        this.actionIndex = 0
        this.loopStart = new Date()
      } else {
        this.stop()
      }
    }

  }

  Loop.prototype.stop = function() {
    window.clearInterval(this.intervalID)
  }

  var Sequencer = function() {

  }

  var exports = {
    InstrumentRecorder: InstrumentRecorder,
    Track: Track,
    Loop: Loop,
    Sequencer: Sequencer
  }

  return exports;
})();
