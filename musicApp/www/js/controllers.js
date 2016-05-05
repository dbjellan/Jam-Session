angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {
  //For the sidemenu. I believe this is the right place to put it?
  $scope.save = function(){
    //this will be able to save a song
  };

  $scope.load = function(){
    //this is will be able to load saved songs
  };
})



.controller('InstrumentCtrl', ['$scope', 'ClipProvider', '$ionicPopup',
'$location', function($scope, ClipProvider, $ionicPopup, $location) {
  var s = Snap("#keyboard")
  var instrumentRecorder = new Playback.InstrumentRecorder(Instruments.Keyboard.bind(null, 36))
  var keyboard = new Instruments.Keyboard(36, instrumentRecorder)

  //width = Math.min(window.innerWidth *.8);
  //leftmargin = (window.innerWidth-width)/2
  width = $("#keyboard-container").width()
  keyboard.drawUI(s, 0, 0, width, 150)
  $('#keyboard').css({'width': width})

  $scope.instrumentRecorder = instrumentRecorder;
  $scope.keyboard = keyboard;
  $scope.BPM = 120;
  $scope.isRecording = false;
  $scope.hasTrack = false;

  $scope.recordLogic = function() {
    if(this.isRecording){this.done();}
    else{
      if(this.hasTrack){this.showConfirm();}
      else{this.record();}
    }
  }

 /*Record the keyboard*/
  $scope.record = function() {
    console.log("recording");
    this.isRecording = true;
    $scope.instrumentRecorder.startRecording()
    //console.log("isRecording = "+ this.isRecording + " , hasTrack = " + this.hasTrack);
  }

  $scope.done = function() {
    this.isRecording = false
    this.hasTrack = true;
    $scope.recording = $scope.instrumentRecorder.stopRecording()
    console.log("done recording: " + JSON.stringify($scope.recording) );
    //console.log("isRecording = "+ this.isRecording + " , hasTrack = " + this.hasTrack);
  }

  /*Play uncommitted track, if there is one. If no tracks have been recorded/all tracks have been committed, do nothing.*/
  $scope.play = function() {
    console.log("playing");
    console.log($scope.recording)
    $scope.currentLoop = new Playback.Loop($scope.recording)
    $scope.currentLoop.play()
    //console.log("isRecording = "+ this.isRecording + " , hasTrack = " + this.hasTrack);
  }

  $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
           title: 'Are you sure?',
           template: 'If you record without adding your previous recorded track, it will be overwritten. Is that okay?'
        });

        confirmPopup.then(function(res) {
           if(res) {
            console.log('Overwritten');
            $scope.record();

           } else {
            console.log('Not recording');
           }
        });

     };

  //Adds a track to the compose page and takes the user to the compose page
  $scope.addTrack = function() {
    ClipProvider.addClip($scope.recording)
    $location.path('/compose')
  }


  //Plays the metronome noises, passing the BPM value to supercolider
  $scope.playMetronome = function(BPM){
    if (this.metronome.value == 'ON') {
        //TODO: stuff to play the metronome

        //var speed = document.getElementById($scope.BPM);
        //var num = speed.options[speed.selectedIndex].value;

        console.log(BPM); //test to see if we can get the BPM from the select
    }
  }

  //These may not be used if the BPM values stay hard-coded
  this.numbers1 = new Array();
  for (var i = 1; i <= 119; i++) {
    this.numbers1.push(i);
  }

  this.numbers2 = new Array();
    for (var i = 121; i <= 240; i++) {
      this.numbers1.push(i);
    }

}])


.controller('ComposeCtrl', ['$scope', 'ClipProvider', function($scope, ClipProvider) {
  $scope.tracksCanvas = $('#tracks');
  $scope.volKnobsCanvas = $('#volKnobs');

  //TODO: eventually make canvas dimensions dependent on number of tracks (h) and song length (w)
  // dimensions of svg canvas containing tracks
  $scope.tracksCanvWidth = 1000;
  $scope.tracksCanvHeight = 1000;

  // dimensions of viewport containing the tracks. Will scroll if smaller than canvas dimensions
  $scope.tracksVPWidth = $scope.tracksCanvas.parent().width();
  $scope.tracksVPHeight = $('#compose-scrollbox-y').height();
  $scope.volKnobsCanvWidth = $scope.volKnobsCanvas.parent().width();
  $scope.volKnobsCanvHeight = 1000;

  $scope.tracksCanvas.attr('width', $scope.tracksCanvWidth);
  $scope.tracksCanvas.attr('height', $scope.tracksCanvHeight);
  var t = Snap("#tracks");
  $scope.tracks = new Playback.Tracks();

  //var ui = new ComposeUI.TracksUI(t, tracksVPWidth, height, tracks)
  //var sequencer = new Compose.Tracks();
  //sequencer.drawUI(t, tracksVPWidth, tracksVPHeight);

  $scope.volKnobsCanvas.attr('width', $scope.volKnobsCanvWidth);
  $scope.volKnobsCanvas.attr('height', $scope.volKnobsCanvHeight);

  //var volKnob = function(track) {
  //  this.ui = new ComposeUI.VolKnobsUI(svg)
  //}

  $scope.volKnobs = null
  var v = Snap("#volKnobs");
  $scope.drawVolKnobs = function() {
    this.ui = new ComposeUI.VolKnobsUI(v);
  }
  $scope.drawVolKnobs()
  //var volKnobs = new Compose.VolKnobs();
  //volKnobs.drawUI(v)

  $scope.ui = new ComposeUI.TracksUI(t, $scope.volKnobsCanvWidth, $scope.volKnobsCanvHeight, $scope.tracks);


  $scope.muteTrack = function(num) {
    //depending on the number passed in (1-4), mute the corresponding track
    //track.isMuted = true;
    console.log(num)
  }
}]);
