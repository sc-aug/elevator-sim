var Move = {
  UP: 1,
  DOWN: -1,
  STOP: 0,
};

var Model = {
  height: 0, // height of the building 
  personList: null, // PersonModel list. All person store here
  elevator: null, // ElevModel. store elevator information
  idleIdList: null, // id list of free person
  reqList: null, // id list of person with request

  init: function(h, elev, pls, reqLs, idleIdList) {
    Model.height = h;
    Model.elevator = elev;
    Model.personList = pls;
    Model.reqList = reqLs;
    Model.idleIdList = idleIdList;
  },

  // Leave elevater
  elevPassLeave: function(arriveIdLs) {
    console.log("arrived p ID: ", arriveIdLs);
    // remove id from elevator
    Model.elevator.rmIdsByArrive(arriveIdLs);
    // curFloor = destFloor
    Model.updatePersonCurFloor(arriveIdLs);
    // add PID to freekdlist
    Model.idleListAddIdLs(arriveIdLs);
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
    var e = Model.getElevator();
    var dir = e.getDir();
    var floor = e.getFloor();

    if (dir == Move.UP) {
      if (floor > UpQueue.peek()) {
        if (UpQueue.empty() && DownQueue.empty()) {
          e.setDir(Move.STOP);
        } else {
          e.setDir(Move.DOWN);
        }
      }
    } else if (dir == Move.Down) {
      if (floor < DownQueue.peek()) {
        if (UpQueue.empty() && DownQueue.empty()) {
          e.setDir(Move.STOP);
        } else {
          e.setDir(Move.UP);
        }
      }
    } else {
      if (!UpQueue.empty() && DownQueue.empty()) {
        if (floor > UpQueue.peek()) e.setDir(Move.DOWN);
        else e.setDir(Move.UP);
      }
      if (UpQueue.empty() && !DownQueue.empty()) {
        if (floor < DownQueue.peek()) e.setDir(Move.UP);
        else e.setDir(Move.DOWN);
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

  pIdLsArrived: function() {
    var elev = Model.getElevator();
    return elev.pIdLsArrived(Model.personList);
  },

  updatePersonCurFloor: function(idLs) {
    var pLs = Model.getPersonLs();
    for (var i = 0; i < idLs.length; i ++) {
      var p = pLs[idLs[i]];
      p.setCurFloor(p.getDestFloor());
    }
  },

  idleListAddIdLs: function(idLs) {
    var idleLs = Model.idleIdList;
    for (var i = 0; i < idLs.length; i ++) {
      if (idleLs.indexOf(idLs[i]) == -1) {
        idleLs.push(idLs[i]);
      }
    }
    console.log("FreeLs: ", idleLs);
  },

  addIdsToElev: function(idLs) {
    Model.elevator.addIdLs(idLs);
  },

  rmReqIdsByGetIn: function(getInIdLs) {
    var req = Model.getReqLs();
    for (var i = 0; i < getInIdLs.length; i ++) {
      var ind = req.indexOf(getInIdLs[i]);
      if (ind >= 0) {
        req.splice(ind, 1);
      }
    }
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
  getReqLs: function() {
    return Model.reqList;
  },
  isReqEmpty: function() {
    return Model.reqList.length == 0;
  },
  addIdToReqQueue: function(id, dir) {
    Model.reqList.push(id);
    console.log("req list: ", Model.reqList);
  },

  // person list
  getPersonLs: function() {
    return Model.personList;
  },
  setPersonLs: function(pls) {
    Model.personList = pls;
  },
  getOneIdlePerson: function() {
    var pLs = Model.personList;
    var idleLs = Model.idleIdList;
    var i = Util.randNum(idleLs.length);
    return pLs[idleLs[i]];
  },

  // free list
  getIdleIds: function() {
    return Model.idleIdList;
  },

  rmFromIdleLs: function(id) {
    var ind = Model.idleIdList.indexOf(id);
    Model.idleIdList.splice(ind, 1);
    console.log("free list: ", Model.idleIdList);
  },

  isIdleLsEmpty: function() {
    return Model.idleIdList.length == 0;
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
  // passengerlist
  this.passIdList = idLs,

  this.height = height,

  this.pIdLsArrived = function(pLs) {
    var idLs = [];
    for (var i = 0; i < this.passIdList.length; i ++) {
      var p = pLs[this.passIdList[i]];
      if (this.getFloor() == p.getDestFloor()) {
        idLs.push(this.passIdList[i]);
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
    if (! this.passIdList) { console.log("Error: person list is empty."); }
    var ind = this.passIdList.indexOf(id);
    if (ind == -1) { console.log("id not exist, this person is not in elevator.");}
    else { this.passIdList.splice(ind, 1); }
  },

  this.passengerIn = function(pIdLs) {
    this.passIdList.concat(pIdLs);
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
    return this.passIdList.length == 0;
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

  this.getPassIdList = function() {
    return this.passIdList;
  },

  this.addIdLs = function(idLs) {
    for (var i = 0; i < idLs.length; i ++) {
      this.addId(idLs[i]);
    }
  },

  this.addId = function(id) {
    if (! this.passIdList) { this.passIdList = []; }
    this.passIdList[this.passIdList.length] = id;
  },

  this.getFloor = function() {
    return this.floor;
  },

  this.setFloor = function(f) {
    this.floor = f;
  }

}

