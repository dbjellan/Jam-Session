angular.module('starter.controllers', [])


.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard")
  var keyboard = new Instruments.Keyboard(24)
  keyboard.drawUI(s, 30, 50, 500, 80)
  $scope.keyboard = keyboard
})

.controller('ComposeCtrl', function($scope) {

})
