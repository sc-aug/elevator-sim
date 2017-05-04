var Controller = {

  initSimu: function(height) {
    var elev, indivLs, waitls;

    indivLs = null;

    //init elev
    elev = new ElevModel(1, true, indivLs);
    //init waitlist
    waitls = [];
    for (var i = 0; i < height; i ++) {
      waitls[i] = [];
    }

    Model.init(height, elev, waitls);
    
    ShaftView.genElev(height);
    WaitlistView.genWaitlist(height);

    Controller.initAppearance(height);
  },

  initAppearance: function(height) {

    var elev = Model.getElevator();

    for (var i = 1; i <= height; i ++) {
      ShaftView.elevOff(i, "elev");

    }

    ShaftView.elevOn(elev.getFloor(), "elev");

    // refresh waitlist
    // var waitls = Model.getWaitList();
    // for (var i = 0; i < waitls.size; i ++) {
    //   for (var j = 0; j < waitls[i].size; j ++)
    // }
  }

}
