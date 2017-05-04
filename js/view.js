var ShaftView = {
  elevOn: function(at, objName) {
    var id = objName + "_" + at;
    var elem = document.getElementById(id);
    elem.setAttribute("class", "elev-on");
  },

  elevOff: function(at, objName) {
    var id = objName + "_" + at;
    var elem = document.getElementById(id);
    elem.setAttribute("class", "elev-off");
  },

  genElev: function(height) {
    var shaft = document.getElementById("simu-shaft");
    for (var i = 1; i <= height; i ++) {
      var cell = document.createElement("div");
      cell.innerHTML = "F" + (height - i + 1);
      cell.id = "elev_" + (height - i + 1);
      shaft.appendChild(cell);
    }
  }

}

var WaitlistView = {

  genWaitlist: function(height) {
    var waitlist = document.getElementById("simu-waitlist");
    for (var i = 1; i <= height; i ++) {
      var cell = document.createElement("div");
      cell.id = "wait_f_" + (height - i + 1);
      cell.className = "wait";
      waitlist.appendChild(cell);
    }
  }

}