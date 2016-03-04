var Drawing = (function() {


  var drawKeyboard = function(svg, x, y, width, height, keys) {
    if (!keys) {
      keys = 8;
    }
    var keywidth = width/keys
    console.log('drawing keyboard')
    for (var i = 0; i < keys; i++) {
      console.log('drawing key')
      var key = svg.rect(30, 50, 30, 100);
      key.attr({
        fill: "white",
            stroke: "#000",
            strokeWidth: 2
        });
    }
  }

  var exports = {
    drawKeyboard: drawKeyboard
  };

  return exports;
})();
