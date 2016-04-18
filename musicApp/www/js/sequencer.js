var Sequencer = (function() {


  var Sequencer = function() {
    this.tracks = [];
    this.addTrack("track1");
    this.addTrack("track2");
    this.addTrack("track3");
    this.addTrack("track4");
    this.addTrack("track5");
  };

  Sequencer.prototype.addTrack = function(name) {
    var track = {
      name: name
    };
    this.tracks.push(track)
  };


  Sequencer.prototype.drawUI = function(svg, x, y, width, height) {
    this.ui = new Drawing.SequencerUI(svg, x, y, width, height, this.tracks)
  };

  var exports = {
    Sequencer: Sequencer
  };

  return exports
})();
