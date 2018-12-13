/* Ayumu's game
Sound clips:
Chimpanzee: recorded by Mike Koenig (soundbible.com)
Tick: recorded by DeepFrozenApps (soundbible.com)
Applause: recorded by Yannick Lemieux (soundbible.com)
   Semidan Robaina Estevez
*/
let nrows, ncols;
let minGridSize = 6;
let maxGridSize = 8;
let firstTouch, numberCounter, startTime, endTime;
let chimp = document.getElementById("chimpAudio");
let tick = document.getElementById("tickAudio");
let applause = document.getElementById("applauseAudio");
let playSound = true;
let fullScreen = false;

function initialize() {
  // Adjust screen to preferred orientation
  let startBox = document.getElementById("start-box");
  if (window.innerWidth > window.innerHeight) {
    nrows = minGridSize;
    ncols = maxGridSize;
    startBox.style.left = "28vmax";
    startBox.style.top = "10vmin";
  } else {
    nrows = maxGridSize;
    ncols = minGridSize;
    startBox.style.left = "15vmin";
    startBox.style.top = "22vmax";
  }
   changeCSSproperty(elements=["start-box", "github"], "display", "initial");
}

initialize();

function startGame () {
  if (playSound){
    tick.play();
  }
  changeCSSproperty(elements=["start-box", "github"], "display", "none");
  changeCSSproperty(["ringButton"], "visibility", "visible");
  displayGrid();
}

function displayGrid () {

  startTime = new Date();
  firstTouch = false;
  numberCounter = 1;

  let gameGrid = document.getElementById("game_grid");
  gameGrid.style.setProperty("grid-template-columns",
    "repeat(" + ncols + ", auto)");
  gameGrid.style.setProperty("grid-template-rows",
    "repeat(" + nrows + ", auto)");

  numberedCells = getRandomSample(minInt=0, maxInt=nrows*ncols - 1, size=9);
  numberLabels = getRandomSample(minInt=1, maxInt=9, size=9);

  for (let i = 0; i < nrows * ncols; i++) {
    let cell = document.createElement("div");

    if (numberedCells.includes(i)) {
      cell.setAttribute("class", "numbered-grid-cell");
      let number = numberLabels.pop();
      let cellNumber = document.createTextNode(number);
      cell.appendChild(cellNumber);
      cell.setAttribute("id", "n" + number);
      cell.addEventListener("click", countCells);
      cell.addEventListener("touch", countCells);
    } else {
      cell.setAttribute("class", "grid-cell");
      cell.style.visibility = "hidden";
    }
    gameGrid.appendChild(cell);
  }
}

function getRandomSample(minInt, maxInt, size) {
  let numbers = []
  for (i = minInt; i < maxInt + 1; i++) {
    numbers.push(i);
  }
  randomSample = [];
  for (let i = 0; i < size; i++) {
    let sampledNumber = numbers.splice(
      Math.floor(Math.random() * numbers.length), 1)[0];
    randomSample.push(sampledNumber);
  }
  return randomSample
}

function coverCells(event) {
  if (playSound){
    tick.play();
  }
  changeCSSproperty(["ringButton"], "visibility", "hidden");
  cells = document.getElementsByClassName("numbered-grid-cell");
  for (let i = 0; i < cells.length; i++){
    cells[i].style.color = "rgba(0, 0, 0, 0)";
    cells[i].style["background-image"] = "url(imgs/Qbutton.png)";
  }
  firstTouch = true;
}

function countCells(event) {
  if (firstTouch) {
    if (event.target.id == "n" + numberCounter.toString()) {
      event.target.style.visibility = "hidden";
      if (playSound){
        tick.play();
      }
      if (event.target.id == "n9") {
        endTime = new Date();
        if (playSound) {
          applause.play();
        }
        changeCSSproperty(elements=["win", "reset", "start-screen", "time"], "visibility",
         "visible");
        document.getElementById("time").innerHTML = "completed in " + (endTime - startTime) / 1000 +  " seconds";
      }
    } else {
      cells = document.getElementsByClassName("numbered-grid-cell");
      for (let i = 0; i < cells.length; i++){
        cells[i].style.color = "rgba(0, 0, 0, 0)";
        cells[i].style["background-image"] = "none";
      }
      if (playSound) {
        chimp.play();
      }
      changeCSSproperty(elements=["lose", "reset", "start-screen"],
       "visibility", "visible");
    }
    document.getElementById("reset").disabled= false;
    document.getElementById("start-screen").disabled= false;
    numberCounter++;
  }
}

function resetGrid() {
  if (playSound){
    tick.play();
  }
  document.getElementById("game_grid").innerHTML = "";
  changeCSSproperty(elements=["ringButton"], "visibility", "visible");
  changeCSSproperty(elements=["win", "lose", "time", "reset", "start-screen"],
   "visibility", "hidden");
  displayGrid();
}

function goToStart() {
  if (playSound){
    tick.play();
  }
  document.getElementById("game_grid").innerHTML = "";
  changeCSSproperty(elements=["win", "lose", "time", "reset", "start-screen"],
   "visibility", "hidden");
  initialize();
}

function changeCSSproperty(elements=NULL, property="visibility",
 value="visible") {
  for (id_name of elements) {
    document.getElementById(id_name).style[property] = value;
  }
}

function changeSoundState() {
  if (playSound){
    tick.play();
  }
  playSound = !playSound;
  soundButton = document.getElementById("sound");
  if (playSound) {
    soundButton.style["background-color"] = "rgb(12, 165, 170)";
  } else {
    soundButton.style["background-color"] = "rgb(159, 159, 159)";
  }
}

function openFullscreen() {
  if (playSound){
    tick.play();
  }
  fullScreen = !fullScreen;
  fullScreenButton = document.getElementById("full-screen");
  let elem = document.documentElement;

  if (fullScreen) {
    fullScreenButton.style["background-color"] = "rgb(12, 165, 170)";
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    fullScreenButton.style["background-color"] = "rgb(159, 159, 159)";
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  }
}
