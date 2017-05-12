var Controller = {
  // 1 unit time of system movement
  oneStep: function() {
    // elevator move one step
    Controller.elevMove();
    // elevator update direction
    Controller.elevDirUpdate();
    // add req
    Controller.oneRandReq();
    // person leave
    Controller.elevPassLeave();

    Controller.elevDirUpdate();
    // person come in
    Controller.elevPassGetIn();

    Controller.elevDirUpdate();

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

  elevDirUpdate: function() {
    Model.elevDirUpdate();
  },

  elevPassLeave: function() {
    var p = Model.getPersonList();
    var arriveIdLs = Model.pIdListArrived();
    // logic
    Model.elevPassLeave(arriveIdLs);
    // view
    Controller.updateViewRmFromElev(p, arriveIdLs);
    Controller.updateViewArriveLog(p, arriveIdLs);
  },

  // when passengers get into elevator
  //  - update data 
  //  - update view
  elevPassGetIn: function() {
    var p = Model.getPersonList();
    var getInIdLs = Model.requestFilter();
    // logic
    Model.elevPassGetIn(getInIdLs);
    // view
    Controller.updateViewRmWaiting(p, getInIdLs);
    Controller.updateViewAddToElev(p, getInIdLs);
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

  updateViewRmWaiting: function(pLs, getInIdLs) {
    for (var i = 0; i < getInIdLs.length; i ++) {
      WaitView.rmPersonWaitArea(pLs[getInIdLs[i]]);
    }
  },

  updateViewAddToElev: function(pLs, getInIdLs) {
    for (var i = 0; i < getInIdLs.length; i ++) {
      ElevView.addPersonElev(pLs[getInIdLs[i]]);
    }
  },

  updateViewRmFromElev: function(pLs, arriveIdLs) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      ElevView.rmPersonElev(pLs[arriveIdLs[i]]);
    }
  },

  updateViewArriveLog: function(pLs, arriveIdLs) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      LogView.arriveLog(pLs[arriveIdLs[i]]);
    }
  }
}
