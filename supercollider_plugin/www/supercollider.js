console.log('Supercollider plugin initialized')

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