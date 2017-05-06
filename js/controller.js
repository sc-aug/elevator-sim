var Controller = {
  // 1 unit time of system movement
  oneStep: function() {
    var elev = Model.elevator;
    //var reqLs = Model.reqList;

    // elev move one stop
    elev.elevMove();
    var floor = elev.getFloor();
    // does elev need to stop ?
    if (Model.elevStop(floor)) {
      // once elevator stop, it provides 1 unit time
      // person in & out use 1 unit time.
      
      // open door
      // person leave
      Controller.elevPassLeave();
      // add req
      Controller.oneRandReq();
      // update waitlist
      // person come in
      Controller.elevPassGetIn();
      // decide direction for next step
      
      // update waitlist
      Controller.showWaitlist();
    }

    Model.updateElevMove();
  },

  oneRandReq: function() {

    if (Model.emptyFreeList()) return;

    var height = Model.getHeight();

    // person
    var freePerson = Model.getFreePerson();

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
    var p = Model.getPersonList();
    var getInIdLs = Model.pIdListGetIn();
    var f = Model.getElevatorFloor();
    // logic
    Model.elevPassGetIn();
    // view
    Model.updateViewWaiting(p, getInIdLs, f);
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
    elev = new ElevModel(1, Move.STOP, inElevIdLs);
    
    //init waitlist
    Model.init(height, elev, personLs, reqLs, freeIdLs);

    // Views
    ShaftView.genShaft(height);
    ShaftView.update(height, elev.getFloor());
    WaitView.genWaitingArea(height);
  },

  updateViewWaiting: function(p, arriveIdLs, f) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      WaitView.rmPersonFromWaiting(f, p[i].getName());
    }
  }

}
