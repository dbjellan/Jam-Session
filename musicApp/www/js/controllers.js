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



.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard")
  var keyboard = new Instruments.Keyboard(24)
  keyboard.drawUI(s, 30, 50, 500, 80, 13)
  $scope.keyboard = keyboard
})

.controller('ComposeCtrl', function($scope) {
  var s = Snap("#sequencer");
  var sequencer = new Sequencer.Sequencer();
  sequencer.drawUI(s, 0, 0, 620, 250)
})


.controller()
