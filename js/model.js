var Move = {
  UP: 1,
  DOWN: -1,
  STOP: 0,
};

var Model = {
  height: 0, // height of the building 
  personList: null, // PersonModel list. All person store here
  elevator: null, // ElevModel. store elevator information
  freeIdList: null, // id list of free person
  reqList: null, // id list of person with request

  init: function(h, elev, pls, reqLs, freeIdLs) {
    Model.height = h;
    Model.elevator = elev;
    Model.personList = pls;
    Model.reqList = reqLs;
    Model.freeIdList = freeIdLs;
  },

  // Leave elevater
  elevPassLeave: function() {
    var arriveIdLs = Model.pIdListArrived();
    console.log("arrived p ID: ", arriveIdLs);
    Model.elevator.rmIdByArrive(arriveIdLs); // remove id from elevator
    Model.updateDataForArrive(arriveIdLs); // floor info & add to freelist
  },

  // Get in elevator
  elevPassGetIn: function() {
    var getInIdLs = Model.pIdListGetIn();
    console.log("get-in p ID: ", getInIdLs);
    Model.addIdToElev(getInIdLs);
    Model.rmReqIdByGetIn(getInIdLs); // remove id from req list.
  },

  // update elevator move direction
  updateElevMove: function() {
    // var pIdInElev = Model.elevator.getIdList();
    // var reqLs = Model.reqList;
    // if (! pIdInElev) {
    //   return;
    // }

    // if (! reqLs) {
    //   // if it's on the move
    //   if (Model.elevator.getMove() != Move.STOP) {
    //     Model.getDir();
    //   }
    //   return;
    // }

    // Model.elevator.setMove(Move.STOP);
    // return ;
  },

  pIdListArrived: function() {
    var elev = Model.elevator;
    return elev.pIdListArrived(Model.personList);
  },

  // person arrived, change object data
  updateDataForArrive: function(idLs) {
    // curFloor = destFloor
    Model.updatePersonCurFloor(idLs);
    // add PID to freelist
    Model.freeListAddIdLs(idLs);
  },

  updatePersonCurFloor: function(idLs) {
    var pLs = Model.getPersonList();
    for (var i = 0; i < idLs.length; i ++) {
      var p = pLs[idLs[i]];
      p.setCurFloor(p.getDestFloor());
    }
  },

  freeListAddIdLs: function(idLs) {
    var fLs = Model.freeIdList;
    for (var i = 0; i < idLs.length; i ++) {
      if (fLs.indexOf(idLs[i]) == -1) {
        fLs.push(idLs[i]);
      }
    }
    console.log("FreeLs: ", fLs);
  },

  pIdListGetIn: function() {
    return Model.requestFilter();
  },

  addIdToElev: function(idLs) {
    Model.elevator.addIdLs(idLs);
  },

  rmReqIdByGetIn: function(getInIdLs) {
    var req = Model.getReqlist();
    for (var i = 0; i < getInIdLs.length; i ++) {
      var ind = req.indexOf(getInIdLs[i]);
      if (ind >= 0) {
        req.splice(ind, 1);
      }
    }
  },

  elevStop: function(floor) {
    if (Model.ifHavePersonArrived()) return true;
    if (Model.ifAcceptReqCurFloor()) return true;
    return false;
  },

  // check if there is person arrived at cur floor
  ifHavePersonArrived: function() {
    var pIdLs = Model.pIdListArrived();
    return (pIdLs.length != 0) ? true : false;
  },

  // there might have request at current floor
  // but if it requesting go down, while the elev is moving upward
  // the elev won't accept the request
  ifAcceptReqCurFloor: function() {
    var accReqLs = Model.requestFilter();
    return (accReqLs.length != 0) ? true : false;
  },

  // accept proper request
  requestFilter: function() {
    var elev = Model.elevator;
    var rLs = Model.reqList;
    var pLs = Model.personList;
    var floor = elev.getFloor();

    var acceptPIdLs = [];
    if (elev.getMove() == Move.STOP) {
      // when elev is stop
      // accept all requests
      for (var i = 0; i < rLs.length; i ++) {
        if (pLs[rLs[i]].getCurFloor() == floor) {
          acceptPIdLs.push(rLs[i]);
        }
      }
    } else {
      // when elev is moving 
      // accept req with same dir
      for (var i = 0; i < rLs.length; i ++) {
        var p = pLs[rLs[i]];
        if (p.getCurFloor() == floor &&
           elev.getDir() == p.getReqDir()) {
          acceptPIdLs.push(rLs[i]);
        }
      }
    }
    return acceptPIdLs;
  },
  
  // height
  getHeight: function() {
    return Model.height;
  },
  setHeight: function(h) {
    Model.height = h;
  },

  // elevator
  getElevator: function() {
    return Model.elevator;
  },
  setElevator: function(elev) {
    Model.elevator = elev;
  },
  getElevatorFloor:function() {
    return Model.elevator.getFloor();
  },

  // req list
  getReqlist: function() {
    return Model.reqList;
  },
  addIdToReqLs: function(id) {
    Model.reqList.push(id);
    console.log("req list: ", Model.reqList);
  },

  // person list
  getPersonList: function() {
    return Model.personList;
  },
  setPersonList: function(pls) {
    Model.personList = pls;
  },
  getFreePerson: function() {
    var pls = Model.personList;
    var fls = Model.freeIdList;
    var ind = Util.randNum(Model.freeIdList.length);
    return pls[fls[ind]];
  },

  // free list
  getFreeIds: function() {
    return Model.freeIdList;
  },
  rmFromFreeLs: function(id) {
    var ind = Model.freeIdList.indexOf(id);
    Model.freeIdList.splice(ind, 1);
    console.log("free list: ", Model.freeIdList);
  },
  emptyFreeList: function() {
    return Model.freeIdList.length == 0;
  }

};

var PersonModel = function(id, name, cur, dest) {

  this.id = id,

  this.name = name,

  this.curFloor = cur,

  this.destFloor = dest,

  this.getId = function() {
    return this.id;
  },

  this.getName = function() {
    return this.name;
  },

  this.getCurFloor = function() {
    return this.curFloor;
  },

  this.setCurFloor = function(f) {
    this.curFloor = f;
  },

  this.getDestFloor = function() {
    return this.destFloor;
  },

  this.setDestFloor = function(f) {
    this.destFloor = f;
  },

  this.getReqDir = function() {
    if (this.destFloor - this.curFloor > 0) return Move.UP;
    else if (this.destFloor - this.curFloor < 0) return Move.DOWN;
    else return Move.STOP;
  }

};

var ElevModel = function(floor, curDir, idLs) {

  this.floor = floor,
  
  this.curDir = curDir,
  
  this.idList = idLs,

  this.pIdListArrived = function(pLs) {
    var idLs = [];
    for (var i = 0; i < this.idList.length; i ++) {
      var p = pLs[this.idList[i]];
      if (this.getFloor() == p.getDestFloor()) {
        idLs.push(this.idList[i]);
      }
    }
    return idLs;
  },

  this.rmIdByArrive = function(arriveIdLs) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      var ind = this.idList.indexOf(arriveIdLs[i]);
      if (ind >= 0) {
        // if the id exists
        // this.idList.splice(ind, 1);  // ????
        this.rmIdFromList(arriveIdLs[i]);// ????
      }
    }
  },

  this.passengerIn = function(pIdLs) {
    this.idList.concat(pIdLs);
  },

  // move one step
  this.elevMove = function() {
    this.floor += curDir;
    // log
    if (curDir == Move.UP) {
      console.log("move up ..");
    } else if (curDir == Move.DOWN) {
      console.log("move down ..");
    } else {
      console.log("stop ..");
    }
  },

  this.getMove = function() {
    return this.curDir;
  },

  this.setMove = function(move) {
    this.curDir = move;
  },

  this.getIdList = function() {
    return this.idList;
  },

  this.addIdLs = function(idLs) {
    for (var i = 0; i < idLs.length; i ++) {
      this.addId(idLs[i]);
    }
  },

  this.addId = function(id) {
    if (! this.idList) { this.idList = []; }
    this.idList[this.idList.length] = id;
  },

  this.rmIdFromList = function(id) {
    if (! idList) { console.log("Error: person list is empty."); }
    idList.remove(id);
  },

  this.getFloor = function() {
    return this.floor;
  },

  this.setFloor = function(f) {
    this.floor = f;
  }

}

