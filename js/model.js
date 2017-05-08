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

  elevMove: function() {
    Model.elevator.move();
  },

  // update elevator move direction
  updateElevMove: function() {
    var e = Model.elevator;
    var ls = Model.requestFilter();
    if (e.isEmpty() && ls.length == 0) {
      e.setDir(Move.STOP);
    }
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

  // accept proper request
  requestFilter: function() {
    var elev = Model.elevator;
    var rLs = Model.reqList;
    var pLs = Model.personList;
    var floor = elev.getFloor();

    if (elev.isTop()) {
      elev.setDir(Move.DOWN);
    }

    if (elev.isBottom()) {
      elev.setDir(Move.UP);
    }

    var ls = [];

    if (elev.getDir() == Move.STOP) {
      //by default GO UP
      var lsUp, lsDown;
      lsUp = Model.requestFilterByDir(pLs, rLs, floor, Move.UP);
      lsDown = Model.requestFilterByDir(pLs, rLs, floor, Move.DOWN);
      if (lsUp.length != 0) {
        elev.setDir(Move.UP);
        return lsUp;
      }else if (ls.length != 0) {
        elev.setDir(Move.DOWN);
        return lsDown;
      } else {
        elev.setDir(Move.STOP);
        return ls;
      }

    } else {
      ls = Model.requestFilterByDir(pLs, rLs, floor, elev.getDir());
    }

    return ls;
  },

  requestFilterByDir: function(pLs, rLs, floor, dir) {
    var acceptIdLs = [];
    for (var i = 0; i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (p.getCurFloor() == floor
        && dir == p.getReqDir()) {
          acceptIdLs.push(rLs[i]);
      }
    }
    return acceptIdLs;
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
  getOneFreePerson: function() {
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

var ElevModel = function(floor, curDir, idLs, height) {

  this.floor = floor,
  
  this.curDir = curDir,
  
  this.idList = idLs,

  this.height = height,

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
  this.move = function() {
    this.floor += this.curDir;
    // log
    if (this.curDir == Move.UP) {
      console.log("move up ..");
    } else if (this.curDir == Move.DOWN) {
      console.log("move down ..");
    } else {
      console.log("stop ..");
    }
  },

  this.isEmpty = function() {
    return this.idList.length == 0;
  },

  this.isTop = function() {
    return this.curFloor == this.height ;
  },

  this.isBottom = function() {
    return this.curFloor == 1;
  },

  this.getDir = function() {
    return this.curDir;
  },

  this.setDir = function(dir) {
    this.curDir = dir;
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
    if (! this.idList) { console.log("Error: person list is empty."); }
    var ind = this.idList.indexOf(id);
    if (ind == -1) { console.log("id not exist, this person is not in elevator.");}
    else { this.idList.splice(ind, 1); }
  },

  this.getFloor = function() {
    return this.floor;
  },

  this.setFloor = function(f) {
    this.floor = f;
  }

}

