var Sequencer = (function() {


  var Sequencer = function() {
    this.tracks = [];
    this.addTrack("instrument1");
    this.addTrack("instrument2");
    this.addTrack("instrument3");
    this.addTrack("instrument4");
    this.addTrack("instrument5");
  };

  Sequencer.prototype.addTrack = function(instrument) {
    //var track = {
    //  name: instrument,
    //  clips: []
    //};
    var track = new Track(instrument, [], false);
    this.tracks.push(track)
  };

  var Track = function(instrument, clips, isMuted) {
    this.instrument = instrument;
    this.clips = clips;
    this.isMuted = isMuted;
  }
  //
  //var Clip = function(startTime, endTime) {
  //
  //}

  Sequencer.prototype.drawUI = function(svg, x, y, width, height) {
    this.ui = new Drawing.SequencerUI(svg, x, y, width, height, this.tracks)
  };

  var exports = {
    Sequencer: Sequencer
  };

  return exports
})();
