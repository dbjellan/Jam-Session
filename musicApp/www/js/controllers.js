angular.module('starter.controllers', [])


.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  Drawing.drawKeyboard(s, 30, 50, 250, 80, 13); //TODO: define and pass in pressCB and releaseCB
 //Consider finding a way to resize the keyboard relatively (screen percentage/cb versus pixels)

})

.controller('ComposeCtrl', function($scope) {

})
