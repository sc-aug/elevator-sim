var View = {
  // clean the elements and data in web page
  clean: function() {
    ShaftView.cleanShaft();
    WaitView.cleanWaitList();
    ElevView.cleanElev();
    LogView.cleanLog();
  },

  cleanDivChild: function(obj) {
    var arr = obj.getElementsByTagName("div");
    while (obj.firstChild) {
      obj.removeChild(obj.firstChild);
    }
  }
}

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
  },

  cleanShaft: function() {
    var shaft = document.getElementById("simu-shaft");
    View.cleanDivChild(shaft);
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
    p.className = "person div-row";
    p.innerHTML = person.getName();
    // p.innerHTML = person.getId() + ":" +person.getName();
    waitArea.appendChild(p);
  },

  rmPersonWaitArea: function(person) {
    var waitArea = document.getElementById("wait_f_" + person.getCurFloor());
    var elem = document.getElementById("id_" + person.getId());
    waitArea.removeChild(elem);
  },

  cleanWaitList: function() {
    var waitls = document.getElementById("simu-waitlist");
    View.cleanDivChild(waitls);
  }

}

var ElevView = {
  addPersonElev: function(person) {
    var elev = document.getElementById("simu-box");
    var p = document.createElement("div");
    p.id = "id_" + person.getId();
    p.className = "person div-row";
    p.innerHTML = person.getName();
    // p.innerHTML = person.getId() + ":" +person.getName();
    elev.appendChild(p);
  },

  rmPersonElev: function(person) {
    var elev = document.getElementById("simu-box");
    var p = document.getElementById("id_" + person.getId());
    elev.removeChild(p);
  },

  cleanElev: function() {
    var elev = document.getElementById("simu-box");
    View.cleanDivChild(elev);
  }


}

var LogView = {
  arriveLog: function(person) {
    var textarea = document.getElementById("text-arrive");
    textarea.innerHTML += "id:\t" + person.getId() + ":\t" +person.getName()
              + "\t-arrive-floor: " + person.getCurFloor() + "\n";
    textarea.scrollTop = textarea.scrollHeight;
  },

  reqLog: function(person) {
    var textarea = document.getElementById("text-req");
    textarea.innerHTML += "id:\t" + person.getId() + ":" +person.getName()
              + "\t" + person.getCurFloor() + " -> "
              + person.getDestFloor() + "\n";
    textarea.scrollTop = textarea.scrollHeight;
  },

  cleanLog: function() {
    var arriveLog = document.getElementById("text-arrive");
    var reqLog = document.getElementById("text-req");
    arriveLog.innerHTML = "";
    reqLog.innerHTML = "";
  }
}