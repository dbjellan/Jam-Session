var ComposeUI = (function() {

  //--------- Compose UI -----------------
  var TracksUI = function(svg, viewportWidth, viewportHeight, tracks) {
    var numVisibleTracks = 4;
    var startingTrack = 0;
    //var canvasWidth = width;
    //var canvasHeight = height;
    var trackHeight = viewportHeight/numVisibleTracks;
    this.clipColor = 'white';
    this.trackColor = 'gray';
    this.drawTracks(svg, tracks, numVisibleTracks, startingTrack, viewportWidth, trackHeight)
  };

  TracksUI.prototype.drawTracks = function(svg, tracks, numVisibleTracks, startingTrack, trackWidth, trackHeight) {
    var color = this.trackColor;
    for(var i = 0; i<numVisibleTracks; i++) {
      var offsetY = trackHeight * i;
      var track = svg.rect(startingTrack, offsetY, trackWidth, trackHeight);
      track.attr({
        fill: color,
        stroke: "black",
        strokeWidth: 2,
        svgType: "track"
      });
      this.drawClips(svg, tracks[i], trackHeight, offsetY);
    }
  };


  /*Draws the clips of music that represent each recorded track*/
  TracksUI.prototype.drawClips = function(svg, track, trackHeight, offsetY) {
    var color = this.clipColor;
    //console.log(track);
    for(var i = 0; i < track.clips.length; i++) {
      var clip = svg.rect(track.clips[i].startTime, offsetY, track.clips[i].duration, trackHeight * 0.8);
      clip.attr({
        fill: color,
        svgType: "clip"
      })
    }
    svg.mouseup(this.newClipSelected.bind(this));
    svg.dblclick(this.addNewClip)
  };

  /*Adds a new clip to the compose page*/
  TracksUI.prototype.addNewClip = function(event) {
    var svgElement = event.target;
    var clipColor = this.clipColor;
    var selectedClipColor = "purple";
    if(svgElement.attributes.svgType.value === "track") {
      if(this.selectedClip !== undefined) {
        this.selectedClip.attributes.fill.value = clipColor;
      }
      this.selectedClip = svgElement;
      this.selectedClip.attributes.fill.value = selectedClipColor;
    }
  };


  TracksUI.prototype.newClipSelected = function(event) {
    var svgElement = event.target;
    var clipColor = this.clipColor;
    var selectedClipColor = "purple";
    if(svgElement.attributes.svgType.value === "clip") {
      if(this.selectedClip !== undefined) {
        this.selectedClip.attributes.fill.value = clipColor;
      }
      this.selectedClip = svgElement;
      this.selectedClip.attributes.fill.value = selectedClipColor;
    }
  };


  var VolKnobsUI = function(svg) {
    this.drawVolKnob(svg)
  };

  VolKnobsUI.prototype.drawVolKnob = function(svg) {
    var height = 63;
    var width = 63;
    var centerX = width/2;
    var centerY = height/2;
    var circleRadius = centerX * 0.6;


    // help from http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }

    /*What does this do???*/
    function describeArc(x, y, radius, startAngle, endAngle){
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
      ].join(" ");
    }
    var arcRadius = centerX * 0.8;
    var startAngle = 247.5;
    var maxAngle = 472.5;
    var volume = 100;
    var angleDiff = maxAngle-startAngle;
    var endAngle = (angleDiff * volume/100) + startAngle;
    var arcPath = describeArc(centerX, centerY, arcRadius, startAngle, endAngle);


    var circle = svg.circle(centerX, centerY, circleRadius);
    circle.attr({
      fill: 'white',
      stroke: "black",
      strokeWidth: 3
    });

    var dash = svg.line(centerX, centerY - circleRadius/2, centerX, centerY-circleRadius);
    dash.attr({
      stroke: "black",
      strokeWidth: 2,
      strokeLinecap:"round"
    });

    var arc = svg.path(arcPath);
    arc.attr({
      fill: "none",
      stroke: "white",
      strokeWidth: 2,
      strokeLinecap:"round"
    });





    //var rotAmt = 0;
    //var newRotAmt = 0;
    var volButton = svg.group(circle, dash);
    var startVol = volume;

    var moveFunc = function (dx, dy) {
      volume = startVol -dy;
      if(volume > 100) {
        volume = 100;
      } else if (volume < 0) {
        volume = 0;
      }

      var matrix = new Snap.Matrix();
      matrix.rotate(volume, centerX, centerY);
      this.attr({
        transform: matrix
      });
    };

    volButton.drag( moveFunc,
      function(){
      },
      function(){
        startVol = volume;
      }
    );
  };



  var exports = {
    TracksUI: TracksUI,
    VolKnobsUI: VolKnobsUI
  };

  return exports;
})();
