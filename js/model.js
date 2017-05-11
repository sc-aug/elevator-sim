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
    Model.elevator.rmIdsByArrive(arriveIdLs); // remove id from elevator
    Model.updateDataForArrive(arriveIdLs); // floor info & add to freelist
    // if (Model.elevator.isEmpty()) {
    //   Model.elevator.setDir(Move.STOP);
    // }
  },

  // Get in elevator
  elevPassGetIn: function(getInIdLs) {
    console.log("get-in p ID: ", getInIdLs);
    Model.addIdsToElev(getInIdLs);
    Model.rmReqIdsByGetIn(getInIdLs); // remove id from req list.
  },

  elevMove: function() {
    Model.elevator.move();
  },

  elevDirUpdate: function() {
    var e = Model.elevator;
    var pLs = Model.personList;

    if (! e.isEmpty()) {
      var inElevIds = e.getIdList();
      var dir;
      if (inElevIds.the == 0) {
        dir = 0;
      } else {
        dir = pLs[inElevIds[0]].getReqDir();
      }
      e.setDir(dir);
      return;
    } else { // elevator is empty
      
      if (Model.isReqEmpty()) { // no request
        e.setDir(Move.STOP);
        return;
      } else { // have request
        var pLs = Model.personList;
        var rLs = Model.reqList;
        var floor = e.getFloor();
        var dir = e.getDir();

        var lsUp = Model.reqFilterGFloor(pLs, rLs, floor);
        var lsDown = Model.reqFilterLFloor(pLs, rLs, floor);
        var lsCurUp = Model.reqFilterCurFloorUp(pLs, rLs, floor);
        var lsCurDown = Model.reqFilterCurFloorDown(pLs, rLs, floor);
        
        if (dir == Move.STOP) {
          e.setDir(Move.UP); // default
          dir = Move.UP;
        }

        Model.assignElevDir(lsUp, lsDown, lsCurUp, lsCurDown, dir, e);

        return;
      }
    }

  },

  assignElevDir: function(lsUp, lsDown, lsCurUp, lsCurDown, dir, elev) {
    if (dir == Move.UP) {
      if (lsUp.length == 0) {
        if (lsCurUp.length == 0) {
          elev.setDir(Move.DOWN);
        }
      }
    } else { // dir == Move.DOWN
      if (lsDown.length == 0) {
        if (lsCurDown == 0) {
          elev.setDir(Move.UP);
        }
      }
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

  addIdsToElev: function(idLs) {
    Model.elevator.addIdLs(idLs);
  },

  rmReqIdsByGetIn: function(getInIdLs) {
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

    var dir = elev.getDir();
    if (dir == Move.STOP) {
      dir = Move.UP;
    }

    var upCurFLs = Model.reqFilterCurFloorUp(pLs, rLs, floor);
    var downCurFLs = Model.reqFilterCurFloorDown(pLs, rLs, floor);
    if (dir == Move.UP) {
      if (upCurFLs.length != 0) {
        return upCurFLs;
      }
      if (downCurFLs.length != 0) {
        return downCurFLs;
      }
    }
    if (dir == Move.DOWN) {
      if (downCurFLs.length != 0) {
        return downCurFLs;
      }
      if (upCurFLs.length != 0) {
        return upCurFLs;
      }
    }

    return [];
  },

  // req at floor great than curFloor
  reqFilterGFloor: function(pLs, rLs, floor) {
    var ls = [];
    for (var i = 0;  i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (p.getCurFloor() > floor) {
        ls.push(rLs[i]);
      }
    }
    return ls;
  },

  // req at floor less than curFloor
  reqFilterLFloor: function(pLs, rLs, floor) {
    var ls = [];
    for (var i = 0;  i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (p.getCurFloor() < floor) {
        ls.push(rLs[i]);
      }
    }
    return ls;
  },

  reqFilterCurFloor: function(pLs, rLs, floor) {
    var ls = [];
    for (var i = 0;  i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (floor == p.getCurFloor()) {
        ls.push(rLs[i]);
      }
    }
    return ls;
  },

  reqFilterCurFloorUp: function(pLs, rLs, floor) {
    var ls = [];
    for (var i = 0;  i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (floor == p.getCurFloor() && p.getReqDir() == Move.UP) {
        ls.push(rLs[i]);
      }
    }
    return ls;
  },

  reqFilterCurFloorDown: function(pLs, rLs, floor) {
    var ls = [];
    for (var i = 0;  i < rLs.length; i ++) {
      var p = pLs[rLs[i]];
      if (floor == p.getCurFloor() && p.getReqDir() == Move.DOWN) {
        ls.push(rLs[i]);
      }
    }
    return ls;
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
  isReqEmpty: function() {
    return Model.reqList.length == 0;
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

  this.rmIdsByArrive = function(arriveIdLs) {
    for (var i = 0; i < arriveIdLs.length; i ++) {
      this.rmIdFromList(arriveIdLs[i]);
    }
  },

  this.rmIdFromList = function(id) {
    if (! this.idList) { console.log("Error: person list is empty."); }
    var ind = this.idList.indexOf(id);
    if (ind == -1) { console.log("id not exist, this person is not in elevator.");}
    else { this.idList.splice(ind, 1); }
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

  this.isStop = function() {
    return this.curDir == Move.STOP;
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

  this.getFloor = function() {
    return this.floor;
  },

  this.setFloor = function(f) {
    this.floor = f;
  }

}

