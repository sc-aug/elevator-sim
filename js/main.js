function handleNextSecBtn() {
  controllor.nextSec();
}

function init() {

  // create world
  Controller.initSimu(10);

  // Generate next state of world
  // var nextSecBtn = document.getElementById("nextSecBtn");
  // nextSecBtn.onclick = handleNextSecBtn;

}

window.onload = init;