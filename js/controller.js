var Controller = {
  oneStep: function() {
    // elev move
    // open door
    // person leave
    // add req
    
    // show waitlist
    Controller.showWaitlist();
    // person come in
    
    // show waitlist
    Controller.showWaitlist();
    // close door
  },

  oneRandReq: function() {

    if (Model.emptyFreeList()) return;

    var height = Model.getHeight();

    // person
    var person = Model.getFreePerson();

    // remove person from free list
    Model.rmFromFreeLs(person.getId(), 1);
    // get destination floor
    var destFloor = Util.randFloor(height, person.getCurFloor());
    // set person destination
    person.setDestFloor(destFloor);
    // add this id to req list
    Model.addIdToReqLs(person.getId());
    // show this waiting person
    WaitView.addPersonWaitArea(person);
  },

  initSimu: function(height, num) {
    // Models
    var elev, personLs, reqLs, inElevIdLs, freeIdLs;
    
    // inits
    personLs = [];
    reqLs = [];
    inElevIdLs = [];
    freeIdLs = [];
    for (var i = 0; i < num; i ++) {
      var name = Util.genName(i);
      personLs[i] = new PersonModel(i, name, 1, 1);
      freeIdLs[i] = i;
    }

    //init elev
    elev = new ElevModel(1, true, inElevIdLs);
    
    //init waitlist
    Model.init(height, elev, personLs, reqLs, freeIdLs);

    // Views
    ShaftView.genShaft(height);
    WaitView.genWaitingArea(height);
  },

  initAppearance: function(height) {

    var elev = Model.getElevator();

    for (var i = 1; i <= height; i ++) {
      ShaftView.elevOff(i, "elev");

    }

    ShaftView.elevOn(elev.getFloor(), "elev");
  },

  showWaitlist: function() {
    var h = Model.getHeight();
    WaitView.genWaitingArea(h);
    var wlist = Model.getFreePerson();
    for (var i = 0; i < wlist.length; i ++) {

    }
  }

}
