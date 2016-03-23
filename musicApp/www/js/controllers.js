angular.module('starter.controllers', [])

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  Drawing.drawKeyboard(s, 30, 50, 250, 80, 13); //TODO: define and pass in pressCB and releaseCB

})

.controller('ComposeCtrl', function($scope) {

})
