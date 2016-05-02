var Drawing = (function() {
/*
Draws a keyboard out of svg vector rectangles, position (x,y), and TOTAL size width*height with keys keys.
TODO: deal with multitouch??
*/
  var KeyboardUI = function(svg, x, y, width, height, keys, pressCB, releaseCB) {
    this.height = height
    this.width = width

    //sets defaults if arguments not passed in
    this.keys = keys ? keys : 24
    this.pressCB = pressCB ? pressCB : console.log
    this.releaseCB = releaseCB ? releaseCB : console.log

    var whiteKeys = Math.floor(keys/12)*7 //only correct for even number of octaves
    this.keywidth = width/whiteKeys;

    this.blackKeyBuffer = []

    console.log('drawing keyboard with ' + this.keys + ' keys');

    var drawnKeys = 0;
    var i = 0;
    while(drawnKeys < keys) {
      console.log('drawing white key')
      this.drawWhiteKey(svg, i*this.keywidth, y, drawnKeys);
      drawnKeys++;
      if (i%7 !== 2  && i%7 !== 6) {
        console.log('drawing black key')
        //add black key to be drawn after white keys so drawn on top
        this.addBlackKey(svg,this.keywidth*0.75+(i*this.keywidth), y, drawnKeys);
        drawnKeys++;
      }
      i++;
    }
    this.drawBlackKeys()
  }

  KeyboardUI.prototype.addBlackKey = function(svg, x, y, id) {
    this.blackKeyBuffer.push(this.drawKey.bind(this, svg, x, y, this.keywidth/2, this.height*(3/5), "black", id));
  }

  KeyboardUI.prototype.drawBlackKeys = function() {
    for (var i = 0; i < this.blackKeyBuffer.length; i++) {
      this.blackKeyBuffer[i]()
    }
  }

  KeyboardUI.prototype.drawWhiteKey = function(svg, x, y, id) {
    this.drawKey(svg, x, y, this.keywidth, this.height, "white", id);
  }

  /*
   Draws a single key with parameters passed by the drawKeyboard function
  */
  var drawKey = function(svg, x, y, width, height, color, idNum) {
    var key = svg.rect(x, y, width, height);
      key.attr({
        fill: color,
        stroke: "#000",
        strokeWidth: 2,
        id: idNum,
      });

    var pressCB = this.pressCB;
    var releaseCB = this.releaseCB;

    /*Reacts to button presses by changing color and calling the supercolider sound method*/
    var keyPressed = function(event) {
      var key = event.target;
      key.attributes.fill.value = "grey";
      console.log('pressed key #' + key.attributes.id.value)
      pressCB(key.attributes.id.value);
    }

    /*Reacts to button release by reverting color and stopping the supercolider sound method*/
    var keyReleased = function(event) {
      var targetKey = event.target;
      targetKey.attributes.fill.value = color;
      console.log('released Key #' + targetKey.attributes.id.value)
      releaseCB(targetKey.attributes.id.value);
    }

    //TODO: check if bind is needed here
    key.mousedown(keyPressed);
    key.mouseover(keyReleased);
    key.mouseup(keyReleased);
  }

  KeyboardUI.prototype.drawKey = drawKey;

  //--------- Compose UI -----------------

  var SequencerUI = function(svg, x, y, width, height, tracks) {
    var numVisibleTracks = 4;
    var startingTrack = 0;
    var canvasWidth = width;
    var canvasHeight = height;
    var trackHeight = canvasHeight/numVisibleTracks;
    this.clipColor = 'white';
    this.trackColor = 'gray';
    this.drawTracks(svg, tracks, numVisibleTracks, startingTrack, canvasWidth, trackHeight)
  };

  SequencerUI.prototype.drawTracks = function(svg, tracks, numVisibleTracks, startingTrack, trackWidth, trackHeight) {
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


  SequencerUI.prototype.drawClips = function(svg, track, trackHeight, offsetY) {
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

  SequencerUI.prototype.addNewClip = function(event) {
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


  SequencerUI.prototype.newClipSelected = function(event) {
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
    KeyboardUI: KeyboardUI,
    SequencerUI: SequencerUI,
    VolKnobsUI: VolKnobsUI
  };

  return exports;
})();
