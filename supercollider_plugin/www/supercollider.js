console.log('code executing')

module.exports = {
  playNote: function(frequency, duration, successCallback) {
    cordova.exec(
      successCallback,
      null,
      "supercollider",
      "playNote",
      [frequency, duration]);
  }
};