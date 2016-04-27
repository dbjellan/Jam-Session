angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) { //can add , $ionicSideMenuDelegate to revert
  //consider using ionicModal for the confirm for recording a song +
  //in which case, edit according to the slidemenu template app

/*  //I don't know that this is neccessary anymore
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }*/

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

  $scope.record = function() {
    //Record the keyboard until the button is clicked again (seperate method?)
    $scope.instrumentRecorder.startRecording()
  }

  $scope.done = function() {

  }

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
              //record as normal
              console.log('Overwritten');
           } else {
              //TODO: Stop button from changing! Stop it from calling the record function!!
              console.log('Not recording');
           }
        });

     };


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
