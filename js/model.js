var Model = {
  height: 0, // height of the building
  elevator: null, // list of indiv
  waitlist: null, // list of waiting indiv

  init: function(h, elev, wait) {
    Model.height = h;
    Model.elevator = elev;
    Model.waitlist = wait;
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

  getWaitlist: function() {
    return Model.waitlist;
  },

  setWaitlist: function(waitls) {
    Model.waitlist = waitls;
  }
}

var IndivModel = {
  
  name: null,

  curFloor: null,

  destFloor: null,

  getCurFloor: function() { return indivModel.curFloor; },

  getDestFloor: function() { return indivModel.destFloor; },

  setCurFloor: function(cur) { indivModel.curFloor = cur; },

  setDestFloor: function(dest) { indivModel.destFloor = dest; }

}

var ElevModel = function(floor, curDir, indivLs) {

  this.floor = floor,
  
  this.curDir = curDir,
  
  this.indivList = indivLs,

  this.getIndivList = function() {
    return elevatorModel.indivList;
  },

  this.addIndiv = function(inidv) {
    if (! indivList) { indivList = []; }
    inidvList[indivList.size()] = indiv;
  },

  this.rmIndivFromList = function(inidv) {
    if (! indivList) { console.log("Error: indiv list is empty."); }
    indivList.remove(indiv);
  },

  this.getFloor = function() {
    return this.floor;
  },

  this.setFloor = function(f) {
    this.floor = f;
  }

}



