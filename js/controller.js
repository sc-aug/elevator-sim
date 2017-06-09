var Controller = {
  // 1 unit time of system movement
  oneStep: function() {
    // elevator move one step
    Controller.elevMove(); // ok
    // queue - remove req in queue
    Controller.reqDequeue(); // ok
    // add req
    Controller.oneRandReq(); // 
    // update elev direction
    Controller.elevDirUpdate();
    // person leave
    Controller.elevPassLeave(); // 
    // person come in
    Controller.elevPassGetIn(); // 
  },

  oneRandReq: function() {
    // no people left for requesting
    if (Model.isIdleLsEmpty()) return;
    var height = Model.getHeight();

    // person
    var idlePerson = Model.getOneIdlePerson();
    // get destination floor
    var destFloor = Util.randFloor(height, idlePerson.getCurFloor());
    // set person destination
    idlePerson.setDestFloor(destFloor);
    
    // remove person from free list
    Model.rmFromIdleLs(idlePerson.getId());
    // update request queue
    ReqModel.addReq(idlePerson);
    // add this id to request queue
    ReqModel.addIdToReqList(idlePerson);
    // show this waiting person
    WaitView.addPersonWaitArea(idlePerson);

    LogView.reqLog(idlePerson);
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
    var pLs = Model.getPersonLs();
    var arriveIdLs = Model.pIdLsArrived();
    // logic - model
    Model.elevPassLeave(arriveIdLs);
    // view
    Controller.updateViewRmFromElev(pLs, arriveIdLs);
    Controller.updateViewArriveLog(pLs, arriveIdLs);
  },

  reqDequeue: function() {
    var e = Model.getElevator();
    ReqModel.rmReq(e);
  },

  // when passengers get into elevator
  //  - update data 
  //  - update view
  elevPassGetIn: function() {
    var pLs = Model.getPersonLs();
    var getInIdLs = ReqModel.getInFilter();
    // logic
    Model.elevPassGetIn(getInIdLs);
    // view
    Controller.updateViewRmWaiting(pLs, getInIdLs);
    Controller.updateViewAddToElev(pLs, getInIdLs);
  },

  updateElevMove: function() {
    Model.updateElevMove();
  },

  // init simulation
  //  - prepare data
  //  - init view
  initSimu: function(height, num) {
    // Models
    var elev, personLs, reqLs, inElevIdLs, idleIdLs;
    
    // inits
    personLs = [];
    reqLs = [];
    inElevIdLs = [];
    idleIdLs = [];
    for (var i = 0; i < num; i ++) {
      var name = Util.genName(i);
      personLs[i] = new PersonModel(i, name, 1, 1);
      idleIdLs[i] = i;
    }

    //init elev
    elev = new ElevModel(1, Move.STOP, inElevIdLs, height);

    //init Queue
    ReqModel.initQueue();
    
    //init waitlist
    Model.init(height, elev, personLs, reqLs, idleIdLs);

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
