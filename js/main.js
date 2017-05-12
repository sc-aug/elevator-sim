function handleRandReqBtn() {
  Controller.oneRandReq();
}

function handleOneStepBtn() {
  Controller.oneStep();
}

function init() {

  // create world
  Controller.initSimu(10,10);

  // add request
  var randReqBtn = document.getElementById("randReqBtn");
  randReqBtn.onclick = handleRandReqBtn;

  // manual
  var oneStepBtn = document.getElementById("oneStepBtn");
  oneStepBtn.onclick = handleOneStepBtn;

}

window.onload = init;
