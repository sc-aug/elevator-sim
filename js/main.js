function handleRandReqBtn() {
  controllor.randReq();
}

function init() {

  // create world
  Controller.initSimu(10,5);

  // add request
  var randReqBtn = document.getElementById("randReqBtn");
  randReqBtn.onclick = handleRandReqBtn;

}

window.onload = init;