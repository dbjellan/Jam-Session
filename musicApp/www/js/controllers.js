angular.module('starter.controllers', [])

.controller('InstrumentCtrl', function($scope) {
  var s = Snap("#keyboard");
  // Lets create big circle in the middle:
  var key = s.rect(30, 50, 30, 100);
  // By default its black, lets change its attributes
  key.attr({
      fill: "white",
      stroke: "#000",
      strokeWidth: 5
  });
  // Now lets create another small circle:
  //var smallCircle = s.circle(100, 150, 70);
  // Lets put this small circle and another one into a group:
  //var discs = s.group(smallCircle, s.circle(200, 150, 70));

})

.controller('ComposeCtrl', function($scope) {

})
