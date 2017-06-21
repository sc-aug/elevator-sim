var ReqModel = {
  
  initQueue: function() {
    UpQueue.initQueue();
    DownQueue.initQueue();
    ReqUpQueue.initQueue();
    ReqDownQueue.initQueue();
  },

  // param: p = person
  addReq: function(p) {
    var dir = p.getReqDir();
    if (dir == Move.UP) UpQueue.add(p.getDestFloor());
    else if (dir == Move.DOWN) DownQueue.add(p.getDestFloor());
    else console.log("error");
  },

  // rm Req from queue
  rmReq: function(e) {
    var dir = e.getDir();
    if (dir == Move.UP) UpQueue.remove(e.getFloor());
    if (dir == Move.DOWN) DownQueue.remove(e.getFloor());
  },

  addIdToReqLs: function(p) {
    Model.addIdToReqLs(p);
  },

  addToReqQueue: function(p) {
    var dir = p.getReqDir();
    if (dir == Move.UP)
      ReqUpQueue.add([p.getCurFloor(), p.getDestFloor()]);
    else if (dir == Move.DOWN)
      ReqDownQueue.add([p.getCurFloor(), p.getDestFloor()]);
    else console.log("error");
  },
  //
  getInFilter: function() {
    var e = Model.getElevator();
    var dir = e.getDir();
    var floor = e.getFloor();
    var reqLs = Model.getReqLs();
    var pLs = Model.getPersonLs();
    var getInLs = [];

    for (var i = 0; i < reqLs.length; i ++) {
      
      var p = pLs[reqLs[i]];
      if (p.getReqDir() == dir && p.getCurFloor() == floor) {
        getInLs.push(reqLs[i]);
      }
    }

    return getInLs;
  },

  waitQueueToElevQueue: function(getInIdLs) {
    var pLs = Model.getPersonLs();
    var e = Model.getElevator();
    var dir = e.getDir();
    for (var i = 0; i < getInIdLs.length; i ++) {
      var p = pLs[getInIdLs[i]];
      if (dir == Move.UP) {
        ReqUpQueue.remove([p.getCurFloor(), p.getDestFloor()]);
        UpQueue.add(p.getDestFloor());
      }
      if (dir == Move.DOWN) {
        ReqDownQueue.remove([p.getCurFloor(), p.getDestFloor()]);
        DownQueue.add(p.getDestFloor());
      }
    }
  }
  
};

/***************** Queue *****************/
var UpQueue = {
  q: null,
  initQueue: function() {
    UpQueue.q = new PriorityQueue();
  },
  add: function(value) {
    if (UpQueue.contains(value)) return;
    UpQueue.q.add(value);
  },
  remove: function(value) {
    if (UpQueue.empty()) return -1;
    UpQueue.q.remove(value);
  },
  poll: function() {
    if (UpQueue.empty()) return -1;
    return UpQueue.q.poll();
  },
  peek: function() {
    if (UpQueue.empty()) return -1;
    return UpQueue.q.peek();
  },
  size: function() {
    return UpQueue.q.size();
  },
  empty:function() {
    return UpQueue.q.empty()
  },
  contains: function(value) {
    return UpQueue.q.includes(value);
  }
};

var DownQueue = {
  q: null,
  initQueue: function() {
    DownQueue.q = new PriorityQueue();
  },
  add: function(value) {
    if (DownQueue.contains(-value)) return;
    DownQueue.q.add(-value);
  },
  remove: function(value) {
    if (DownQueue.empty()) return -1;
    DownQueue.q.remove(-value);
  },
  poll: function() {
    if (DownQueue.empty()) return -1;
    return -DownQueue.q.poll();
  },
  peek: function() {
    if (DownQueue.empty()) return -1;
    return -DownQueue.q.peek();
  },
  size: function() {
    return DownQueue.q.size();
  },
  empty:function() {
    return DownQueue.q.empty()
  },
  contains: function(value) {
    return DownQueue.q.includes(value);
  }
};

var ReqUpQueue = {
  q: null,
  initQueue: function() {
    ReqUpQueue.q = new ReqPriorityQueue();
  },
  add: function(req) {
    ReqUpQueue.q.add(req);
  },
  remove: function(req) {
    if (ReqUpQueue.empty()) return;
    ReqUpQueue.q.remove(req);
  },
  poll: function() {
    if (ReqUpQueue.empty()) return [-1, -1];
    return ReqUpQueue.q.poll();
  },
  peek: function() {
    if (ReqUpQueue.empty()) return [-1, -1];
    return ReqUpQueue.q.first();
  },
  size: function() {
    return ReqUpQueue.q.size();
  },
  empty:function() {
    return ReqUpQueue.q.empty()
  }
};

var ReqDownQueue = {
  q: null,
  initQueue: function() {
    ReqDownQueue.q = new ReqPriorityQueue();
  },
  add: function(req) {
    ReqDownQueue.q.add([-req[0],-req[1]]);
  },
  remove: function(req) {
    if (ReqDownQueue.empty()) return;
    ReqDownQueue.q.remove([-req[0],-req[1]]);
  },
  poll: function() {
    if (ReqDownQueue.empty()) return [-1, -1];
    var req = ReqDownQueue.q.poll();
    return [-req[0],-req[1]];
  },
  peek: function() {
    if (ReqDownQueue.empty()) return [-1, -1];
    var req = ReqDownQueue.q.peek();
    return [-req[0],-req[1]];
  },
  size: function() {
    return ReqDownQueue.q.size();
  },
  empty:function() {
    return ReqDownQueue.q.empty()
  }
};