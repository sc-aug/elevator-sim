var Controller = {
  randReq: function() {
    var cnt = 10;

  },

  initSimu: function(height, num) {
    // Models
    var elev, personLs, reqLs, inElevIdLs;
    // init person list
    personLs = [];
    for (var i = 0; i < num; i ++) {
      var name = Util.genName();
      personLs[i] = new PersonModel(i, name, 1, 1);
    }
    //init elev
    inElevIdLs = [];
    elev = new ElevModel(1, true, inElevIdLs);
    //init waitlist
    reqLs = [];
    Model.init(height, elev, reqLs, personLs);

    // Views
    ShaftView.genElev(height);
    WaitlistView.genWaitlist(height);
    
  },

  initAppearance: function(height) {

    var elev = Model.getElevator();

    for (var i = 1; i <= height; i ++) {
      ShaftView.elevOff(i, "elev");

    }

    ShaftView.elevOn(elev.getFloor(), "elev");
  }

}
