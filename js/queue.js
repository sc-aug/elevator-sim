/* Priority Queue data structure */
/********************** queue1 ********************/
function PriorityQueue() {
  this.data = [];
}

PriorityQueue.prototype.add = function(value) {
  for (var i = this.data.length-1; i >=0 && value < this.data[i]; i --);
  this.data.splice(i+1, 0, value);
}

PriorityQueue.prototype.remove = function(value) {
  if (!this.data.includes(value)) return;
  var i = this.data.indexOf(value);
  this.data.splice(i, 1);
}

PriorityQueue.prototype.poll = function() {
  return this.data.pop();
}

PriorityQueue.prototype.peek = function() {
  return this.data[this.data.length-1];
}

PriorityQueue.prototype.size = function() {
  return this.data.length;
}

PriorityQueue.prototype.empty = function() {
  return this.data.length == 0;
}

PriorityQueue.prototype.includes = function(value) {
  return this.data.includes(value);
}

/* Priority Queue data structure */
/********************** queue2 ********************/
function ReqPriorityQueue() {
  this.req = [];
}

ReqPriorityQueue.prototype.add = function(r) { // r = [start, destination]
  for (var i = this.req.length-1; i >=0 && r[0] < this.req[i][0]; i --);
  this.req.splice(i+1, 0, r);
}

ReqPriorityQueue.prototype.remove = function(r) {
  for (var i = 0; i < this.req.length-1; i ++) {
    if (this.req[i][0] == r[0] && this.req[i][1] == r[1]) {
      this.req.splice(i, 1);
      break;
    }
  } 
}

ReqPriorityQueue.prototype.poll = function() {
  return this.req.pop();
}

ReqPriorityQueue.prototype.peek = function() {
  return this.req[this.req.length-1];
}

ReqPriorityQueue.prototype.size = function() {
  return this.req.length;
}

ReqPriorityQueue.prototype.empty = function() {
  return this.req.length == 0;
}

ReqPriorityQueue.prototype.includes = function(r) {
  return this.req.includes(r);
}