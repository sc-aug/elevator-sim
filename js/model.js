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
    var ind = Util.randNum(Model.freeIdList.length);
    return Model.personList[ind];
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

}

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
    return this.getDestFloor();
  },

  this.setDestFloor = function(f) {
    this.destFloor = f;
  }

}

var ElevModel = function(floor, curDir, idLs) {

  this.floor = floor,
  
  this.curDir = curDir,
  
  this.idList = idLs,

  this.getIdList = function() {
    return this.idList;
  },

  this.addId = function(id) {
    if (! idList) { idList = []; }
    idList[idList.size()] = id;
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



