var Compose = (function() {


  var Tracks = function() {
    this.tracks = [];
    this.addTrack("instrument1");
    this.addTrack("instrument2");
    this.addTrack("instrument3");
    this.addTrack("instrument4");
    this.addTrack("instrument5");
    this.tracks[0].addClip(30,230);
    this.tracks[1].addClip(70,350);
    this.tracks[3].addClip(60,200);

  };

  Tracks.prototype.addTrack = function(instrument) {
    var track = new Track(instrument, [], false);
    this.tracks.push(track)
  };

  var Track = function(instrument) {
    this.instrument = instrument;
    this.clips = [];
    this.isMuted = false;
    this.volume = 75;
  };

  var Clip = function(startTime, duration) {
    this.startTime = startTime;
    this.duration = duration;
  };

  Track.prototype.addClip = function(startTime, duration) {
    var clip = new Clip(startTime, duration);
    this.clips.push(clip);
  };

  Tracks.prototype.drawUI = function(svg, width, height) {
    this.ui = new ComposeUI.TracksUI(svg, width, height, this.tracks)
  };


  //-----Volume Knobs-------------
  var VolKnobs = function() {
    //this.tracks = [];

  };

  var VolKnob = function(track) {
    //this.rotationAmt = 4;
  };

  VolKnobs.prototype.drawUI = function(svg) {
    this.ui = new ComposeUI.VolKnobsUI(svg);
  };

  var exports = {
    Tracks: Tracks,
    VolKnobs: VolKnobs
  };

  return exports
})();


