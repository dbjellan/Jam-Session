angular.module('starter.controllers', [])


.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  Drawing.drawKeyboard(s, 30, 50, 125, 40, 13); //TODO: define and pass in pressCB and releaseCB
  //NOTE: change (125,40) back to (250, 80) once the keyboard is showing if it fits?
 //Consider finding a way to resize the keyboard relatively

})

.controller('ComposeCtrl', function($scope) {

})
