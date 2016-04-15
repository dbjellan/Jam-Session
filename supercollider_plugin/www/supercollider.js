console.log('Supercollider plugin initialized')
//sends messages to supercollider engine
//for command reference see: http://danielnouri.org/docs/SuperColliderHelp/ServerArchitecture/Server-Command-Reference.html
//ie supercollider.createSynth("node", {freq: 440}) sends the message
//["\s_new", "node", nodeid, 0, 1, "\freq", 440]

module.exports = {
  createSynth: function(name, args, successCB, errorCB) {
    if (! errorCB) errorCB = null
    cordova.exec(
      successCB,
      errorCB,
      "supercollider",
      "createSynth",
      [name, args]);
   },
  freeSynth: function(nodeId, successCB, errorCB) {
    if (! errorCB) errorCB = null
    if (! successCB) successCB = null
    cordova.exec(
      successCB,
      errorCB,
      "supercollider",
      "freeSynth",
      [nodeId]);
   },
  setArgs: function(nodeId, args, successCB, errorCB) {
    if (! errorCB) errorCB = null
    if (! successCB) successCB = null
    cordova.exec(
      successCB,
      errorCB,
      "supercollider",
      "setArgs",
      [nodeId, args]);
   },
  playNote: function() {
    cordova.exec(
      null,
      null,
      "supercollider",
      "playNote",
      []);
  }
};