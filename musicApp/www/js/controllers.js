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

  $scope.instrumentRecorder = instrumentRecorder
  $scope.keyboard = keyboard


  $scope.recordLogic = function() {
    //??? If recording, then stop recording, turn button to record
    //If hasTrack,
    showConfirm();
    //If !hasTrack, change the button to stop and,
    record();
   }

  $scope.record = function() {
    //Record the keyboard until the button is clicked again (seperate method?)
    $scope.instrumentRecorder.startRecording()
  }

  $scope.done = function() {}

  $scope.play = function() {
     //Play uncommitted track, if there is one. If no tracks have been recorded/all tracks have been committed, do nothing.
     var recording = $scope.instrumentRecorder.getRecording()
  }

  $scope.showConfirm = function() {
    //TODO: If the Add Track button is active (there is an uncommitted track)
        var confirmPopup = $ionicPopup.confirm({
           title: 'Are you sure?',
           template: 'If you record without adding your previous recorded track, it will be overwritten. Is that okay?'
        });

        confirmPopup.then(function(res) {
           if(res) {
              this.record();
              console.log('Overwritten');
           } else {
              //TODO: Stop button from changing! Stop it from calling the record function!!
              console.log('Not recording');
           }
        });

     };

  //Adds a track to the compose page and takes the user to the compose page
  $scope.addTrack = function() {
    console.log('added the track');
    //TODO: reroute to the compose page
    //TODO: Clear track, change hasTrack to false.
  }

  //Plays the metronome noises, passing the BPM value to supercolider
  $scope.playMetronome = function(BPM){
    console.log(BPM);
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
  var s = Snap("#sequencer");
  var sequencer = new Sequencer.Sequencer();
  sequencer.drawUI(s, 0, 0, 620, 250)
})


.controller()
