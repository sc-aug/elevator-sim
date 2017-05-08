var Controller = {
  // 1 unit time of system movement
  oneStep: function() {
    
    Controller.elevMove();
    // open door
    // person leave
    Controller.elevPassLeave();
    // add req
    // update waitlist
    Controller.oneRandReq();
    // person come in
    // update waitlist
    Controller.elevPassGetIn();

    // update move direction
    Controller.updateElevMove();
  },

  oneRandReq: function() {

    // no people left for requesting
    if (Model.emptyFreeList()) return;

    var height = Model.getHeight();

    // person
    var freePerson = Model.getOneFreePerson();

    // remove person from free list
    Model.rmFromFreeLs(freePerson.getId(), 1);
    // get destination floor
    var destFloor = Util.randFloor(height, freePerson.getCurFloor());
    // set person destination
    freePerson.setDestFloor(destFloor);
    // add this id to req list
    Model.addIdToReqLs(freePerson.getId());
    // show this waiting person
    WaitView.addPersonWaitArea(freePerson);
  },

  elevMove: function() {
    // logic
    Model.elevMove();
    // view update
    Controller.updateViewMoveElev(Model.getElevator());
  },

  elevPassLeave: function() {
    // logic
    Model.elevPassLeave();
    // view
    // [next]
  },

  // when passengers get into elevator
  //  - update data 
  //  - update view
  elevPassGetIn: function() {
    // logic
    Model.elevPassGetIn();
    // view
    var p = Model.getPersonList();
    var getInIdLs = Model.pIdListGetIn();
    // var f = Model.getElevatorFloor();
    Controller.updateViewRmWaiting(p, getInIdLs);
  },

  updateElevMove: function() {
    Model.updateElevMove();
  },

  // init simulation
  //  - prepare data
  //  - init view
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
    elev = new ElevModel(1, Move.STOP, inElevIdLs, height);
    
    //init waitlist
    Model.init(height, elev, personLs, reqLs, freeIdLs);

    // Views
    ShaftView.genShaft(height);
    ShaftView.update(height, elev.getFloor());
    WaitView.genWaitingArea(height);
  },

  updateViewMoveElev: function(elev) {
    var dir = elev.getDir();
    if (dir == Move.STOP) {
      return;
    } else {
      var curF = elev.getFloor();
      ShaftView.elevOn(curF)
      ShaftView.elevOff(curF-dir);
    }
  },

  updateViewRmWaiting: function(pLs, arriveIdLs) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      WaitView.rmPersonFromWaiting(pLs[arriveIdLs[i]]);
    }
  }

}
