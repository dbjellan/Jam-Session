angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard")
  var keyboard = new Instruments.Keyboard(24)
  keyboard.drawUI(s, 30, 50, 500, 80, 13)
  $scope.keyboard = keyboard
})

.controller('ComposeCtrl', function($scope) {
  var s = Snap("#sequencerUI");
  var sequencer = new Drawing.SequencerUI();
  var boundary = s.rect(20, 0, 400, 100);
  boundary.attr({
    fill: "yellow",
    stroke: "#000",
    strokeWidth: 2
  })
  //sequencer.drawUI(s, 4)
})
