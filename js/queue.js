/* Priority Queue data structure */
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