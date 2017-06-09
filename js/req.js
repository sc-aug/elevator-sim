var ReqModel = {
  
  initQueue: function() {
    UpQueue.initQueue();
    DownQueue.initQueue();
  },

  // param: p = person
  addReq: function(p) {
    var dir = p.getReqDir();
    if (dir == Move.UP) UpQueue.add(p.getDestFloor());
    else if (dir == Move.DOWN) DownQueue.add(p.getDestFloor());
    else console.log("error");
  },

  addIdToReqList: function(p) {
    var reqLs = Model.getReqLs();
    reqLs.push(p.getId());
    console.log("req list: ", reqLs);
  },

  // rm Req from queue
  rmReq: function(e) {
    var dir = e.getDir();
    if (dir == Move.UP) UpQueue.remove(e.getFloor());
    if (dir == Move.DOWN) DownQueue.remove(e.getFloor());
  },

  //
  getInFilter: function() {
    var e = Model.getElevator();
    var dir = e.getDir();
    var floor = e.getFloor();
    var reqLs = Model.getReqLs();
    var pLs = Model.getPersonLs();
    var resLs = [];

    for (var i = 0; i < reqLs.length; i ++) {
      
      var p = pLs[reqLs[i]];
      if (p.getReqDir() == dir && p.getCurFloor() == floor) {
        resLs.push(reqLs[i]);
      }
    }

    return resLs;
  }
  
};

/***************** Queue *****************/
var UpQueue = {
  q: null,
  initQueue: function() {
    UpQueue.q = new PriorityQueue();
  },
  add: function(value) {
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
  }
};

var DownQueue = {
  q: null,
  initQueue: function() {
    DownQueue.q = new PriorityQueue();
  },
  add: function(value) {
    DownQueue.q.add(-value);
  },
  remove: function(value) {
    if (DownQueue.empty()) return -1;
    q.remove(-value);
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
  }
};

var ReqUpQueue = {
  q: null,
  initQueue: function() {
    UpQueue.q = new PriorityQueue();
  },
  add: function(value) {
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
  }
};

var ReqDownQueue = {
  q: null,
  initQueue: function() {
    DownQueue.q = new PriorityQueue();
  },
  add: function(value) {
    DownQueue.q.add(-value);
  },
  remove: function(value) {
    if (DownQueue.empty()) return -1;
    q.remove(-value);
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
  }
};