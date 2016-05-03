var v = Snap("#volButtons");
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



.controller('InstrumentCtrl', function($scope, $ionicPopup) {
  var s = Snap("#keyboard")
  var instrumentRecorder = new Instruments.InstrumentRecorder(Instruments.Keyboard.bind(null, 36))
  var keyboard = new Instruments.Keyboard(36, instrumentRecorder)

  //width = Math.min(window.innerWidth *.8);
  //leftmargin = (window.innerWidth-width)/2
  width = $("#keyboard-container").width()
  keyboard.drawUI(s, 0, 0, width, 150)
  $('#keyboard').css({'width': width})

  $scope.instrumentRecorder = instrumentRecorder;
  $scope.keyboard = keyboard;
  $scope.BPM = 0;
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
    //$scope.instrumentRecorder.startRecording()
    //console.log("isRecording = "+ this.isRecording + " , hasTrack = " + this.hasTrack);
  }

  $scope.done = function() {
    console.log("done");
    this.isRecording = false;
    this.hasTrack = true;
    //console.log("isRecording = "+ this.isRecording + " , hasTrack = " + this.hasTrack);
  }

  /*Play uncommitted track, if there is one. If no tracks have been recorded/all tracks have been committed, do nothing.*/
  $scope.play = function() {
    console.log("playing");
    //var recording = $scope.instrumentRecorder.getRecording()
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
    //TODO: reroute to the compose page
    //TODO: Clear track
    this.hasTrack = false;
    //console.log('added the track, hasTrack = ' + this.hasTrack);
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

})


.controller('ComposeCtrl', function($scope) {
  var sequencerCanvas = $('#sequencer');
  var volKnobsCanvas = $('#volKnobs');

  var height = sequencerCanvas.parent().height();
  var volKnobsWidth = volKnobsCanvas.parent().width();
  var sequencerWidth = sequencerCanvas.parent().width();

  sequencerCanvas.attr('height', height);
  sequencerCanvas.attr('width', sequencerWidth);
  var s = Snap("#sequencer");
  var sequencer = new Compose.Sequencer();
  sequencer.drawUI(s, 0, 0, sequencerWidth, height);

  volKnobsCanvas.attr('height', height);
  volKnobsCanvas.attr('width', volKnobsWidth);
  var v = Snap("#volKnobs");
  var volKnobs = new Compose.VolKnobs();
  volKnobs.drawUI(v)
});


  //.controller()
