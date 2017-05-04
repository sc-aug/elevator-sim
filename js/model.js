var Model = {
  height: 0, // height of the building
  elevator: null, // list of indiv
  waitlist: null, // list of waiting indiv
  personList: null,

  init: function(h, elev, reqls, pls) {
    Model.height = h;
    Model.elevator = elev;
    Model.reqList = reqls;
    Model.personList = pls;
  },

  getHeight: function() {
    return Model.height;
  },

  setHeight: function(h) {
    Model.height = h;
  },

  getElevator: function() {
    return Model.elevator;
  },

  setElevator: function(elev) {
    Model.elevator = elev;
  },

  getReqlist: function() {
    return Model.reqList;
  },

  setReqlist: function(reqls) {
    Model.reqList = reqls;
  },

  getPersonList: function() {
    return Model.personList;
  },

  setPersonList: function(pls) {
    Model.personList = pls;
  }

}

var PersonModel = function(id, name, cur, dest) {

  this.id = id,

  this.name = name,

  this.curFloor = cur,

  this.destFloor = dest

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



