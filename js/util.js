var Util = {
  pi: Math.PI,

  round: Math.round,

  sin: Math.sin,

  random: Math.random,
  
  randFloor: function(range, noteq) {
    var f = randFollowDistr(range);
    while (f == noteq) {
      var f = randFollowDistr(range);
    }
    return f;
  },

  randFollowDistr: function(range) {
    return this.round(range/2 * this.distrFunc(this.random()) + range/2);
  },

  distrFunc: function(x) {
    return this.sin((x * 1.5 + 1) * this.pi);
  },

  randNum: function(range) {
    return this.round(range * this.random());
  },

  genName: function(id) {
    return Sha1.hash(id).substring(0,5);
  }
}