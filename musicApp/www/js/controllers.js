angular.module('starter.controllers', [])

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  Drawing.drawKeyboard(s, 30, 50, 250, 80, 13);

})

.controller('ComposeCtrl', function($scope) {

})
