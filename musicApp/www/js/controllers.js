angular.module('starter.controllers', [])

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  // Lets create big circle in the middle:
  var bigCircle = s.circle(150, 150, 100);
  // By default its black, lets change its attributes
  bigCircle.attr({
      fill: "#bada55",
      stroke: "#000",
      strokeWidth: 5
  });
  // Now lets create another small circle:
  var smallCircle = s.circle(100, 150, 70);
  // Lets put this small circle and another one into a group:
  var discs = s.group(smallCircle, s.circle(200, 150, 70));

})

.controller('ComposeCtrl', function($scope) {

})
