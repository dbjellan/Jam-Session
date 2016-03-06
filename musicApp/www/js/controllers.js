angular.module('starter.controllers', [])

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  Drawing.drawKeyboard(s, 30, 50, 250, 80, 13);
  // Lets create big circle in the middle:
  // By default its black, lets change its attributes
  // Now lets create another small circle:
  //var smallCircle = s.circle(100, 150, 70);
  // Lets put this small circle and another one into a group:
  //var discs = s.group(smallCircle, s.circle(200, 150, 70));

})

.controller('ComposeCtrl', function($scope) {

})
