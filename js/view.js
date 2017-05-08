var ShaftView = {

  elevOn: function(at) {
    var id = "elev_" + at;
    var elem = document.getElementById(id);
    elem.setAttribute("class", "elev-on");
  },

  elevOff: function(at) {
    var id = "elev_" + at;
    var elem = document.getElementById(id);
    elem.setAttribute("class", "elev-off");
  },

  update: function(height, elevAt) {
    var shaft = document.getElementById("simu-shaft");
    var cell = null;
    for (var i = 1; i <= height; i ++) {
      cell = document.getElementById("elev_" + i);
      if (i == elevAt) {
        ShaftView.elevOn(i);
      } else {
        ShaftView.elevOff(i);
      }
    }
  },

  genShaft: function(height) {
    var shaft = document.getElementById("simu-shaft");
    for (var i = 1; i <= height; i ++) {
      var cell = document.createElement("div");
      cell.innerHTML = "F" + (height - i + 1);
      cell.id = "elev_" + (height - i + 1);
      cell.className = "elev-off";
      shaft.appendChild(cell);
    }
  }

}

var WaitView = {

  genWaitingArea: function(height) {
    var waitlist = document.getElementById("simu-waitlist");
    for (var i = 1; i <= height; i ++) {
      var cell = document.createElement("div");
      cell.id = "wait_f_" + (height - i + 1);
      cell.className = "wait";
      waitlist.appendChild(cell);
    }
  },

  addPersonWaitArea: function(person) {
    var waitArea = document.getElementById("wait_f_" + person.getCurFloor());
    var p = document.createElement("div");
    p.id = "id_" + person.getId();
    p.className = "wait-person div-row";
    p.innerHTML = person.getName();
    waitArea.appendChild(p);
  },

  rmPersonFromWaiting: function(person) {
    var waitArea = document.getElementById("wait_f_" + person.getCurFloor());
    var elem = document.getElementById("id_" + person.getId());
    waitArea.removeChild(elem);
  }

}