function handleRandReqBtn() {
  stopGenerate();
  Controller.oneRandReq();
}

function handleOneStepBtn() {
  stopGenerate();
  Controller.oneStep();
}

function handleAutoSimuBtn() {
  stopGenerate();
  var sp = 200; // 200 ms
  intv = setInterval(function() {
    Controller.oneStep()}, sp);
}

function handlePauseBtn() {
  stopGenerate();
}

function handleCleanBtn() {
  stopGenerate();
  initSimu();
}

function stopGenerate() {
  clearInterval(intv);
}

function initSimu() {
  var floor = 15;
  var people = 30;
  Controller.initSimu(floor, people);
}

function init() {
  // create world
  initSimu();

  // add request
  // var randReqBtn = document.getElementById("randReqBtn");
  // randReqBtn.onclick = handleRandReqBtn;

  // manual
  var oneStepBtn = document.getElementById("oneStepBtn");
  oneStepBtn.onclick = handleOneStepBtn;

  // auto simulation
  var simuBtn = document.getElementById("simuBtn");
  simuBtn.onclick = handleAutoSimuBtn;

  // pause btn
  var pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.onclick = handlePauseBtn;

  var cleanBtn = document.getElementById("cleanBtn");
  cleanBtn.onclick = handleCleanBtn;

}

var intv = null;

window.onload = init;
