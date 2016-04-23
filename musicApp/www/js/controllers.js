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
  keyboard.drawUI(s, 30, 50, 500, 80)
  $scope.keyboard = keyboard
})

.controller('ComposeCtrl', function($scope, $ionicPosition) {
  var seqAttr = angular.element(document.querySelector('#sequencer'));
  //$('#sequencer').setAttribute('height', "500");
  seqAttr.attr('height', "100%");
  seqAttr.attr('width', "100px");
  var s = Snap("#sequencer");
  var sequencer = new Sequencer.Sequencer();
  //var viewBox = s.attr("viewBox");
  //alert($ionicPosition.position(seqAttr));
  console.log($ionicPosition.position(seqAttr).top)
  sequencer.drawUI(s, 0, 0, 300, 20);
  //console.log(window.innerHeight)
  //$('#sequencer').setAttribute('height', 500);
});


  //.controller()
