var Util = {
  pi: Math.PI,

  ceil: Math.ceil,

  floor: Math.floor,

  sin: Math.sin,

  random: Math.random,
  
  randFloor: function(range, noteq) {
    var f = this.randFollowDistr(range);
    while (f == noteq) {
      var f = this.randFollowDistr(range);
    }
    return f;
  },

  randFollowDistr: function(range) {
    return this.ceil(range/2 * this.distrFunc(this.random()) + range/2);
  },

  distrFunc: function(x) {
    return this.sin((x * 1.5 + 1) * this.pi);
  },

  randNum: function(range) {
    return this.floor(range * this.random());
  },

  genName: function(id) {
    return Sha1.hash(id).substring(0,5);
  }
}