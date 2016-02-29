module.exports = {
  playNote: function(frequency, duration) {
    cordova.exec(
      successCallback,
      null,
      "SuperCollider",
      "playNote"
      [frequency, duration]);
  }
};
