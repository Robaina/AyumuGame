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
  startBox.style.left = "18vmin";
  startBox.style.top = "22vmax";
}

function startGame () {
  displayGrid();
  changeCSSproperty(elements=["start-box", "github"], "opacity", 0);
  changeCSSproperty(elements=["start-box", "github"], "display",
   "none");
}

function displayGrid () {

  startTime = new Date();
  firstTouch = false;
  numberCounter = 1;
  for (let id_name of ["start", "sound", "reset"]) {
    document.getElementById(id_name).disabled= true;
  }

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
      if (number == 1) {
        cell.addEventListener("click", coverCells);
        cell.addEventListener("touch", coverCells);
      }
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
  cells = document.getElementsByClassName("numbered-grid-cell");
  for (cell of cells){
    cell.style.color = "rgba(0, 0, 0, 0)";
    cell.style["background-image"] = "url(imgs/chimp.png)";
  }
  firstTouch = true;
}

function countCells(event) {
  if (firstTouch) {
    if (event.target.id == "n" + numberCounter.toString()) {
      event.target.style.visibility = "hidden";
      if (playSound === true){
        tick.play();
      }
      if (event.target.id == "n9") {
        endTime = new Date();
        if (playSound === true) {
          applause.play();
        }
        changeCSSproperty(elements=["win", "reset", "time"], "visibility",
         "visible");
        document.getElementById("time").innerHTML = "completed in " + (endTime - startTime) / 1000 +  " seconds";
      }
    } else {
      cells = document.getElementsByClassName("numbered-grid-cell");
      for (cell of cells){
        cell.style.color = "rgba(0, 0, 0, 0)";
        cell.style["background-image"] = "none";
      }
      if (playSound === true) {
        chimp.play();
      }
      changeCSSproperty(elements=["loose", "reset"], "visibility",
       "visible");
    }
    document.getElementById("reset").disabled= false;
    numberCounter++;
  }
}

function resetGrid() {
  document.getElementById("game_grid").innerHTML = "";
  changeCSSproperty(elements=["win", "loose", "time", "reset"],
   "visibility", "hidden");
  displayGrid();
}

function changeCSSproperty(elements=NULL, property="visibility",
 value="visible") {
  for (id_name of elements) {
    document.getElementById(id_name).style[property] = value;
  }
}

function changeSoundState() {
  playSound = !playSound;
  soundButton = document.getElementById("sound");
  if (playSound) {
    soundButton.style["background-color"] = "rgb(12, 165, 170)";
    soundButton.innerHTML = "Sound: On";
  } else {
    soundButton.style["background-color"] = "rgb(159, 159, 159)";
    soundButton.innerHTML = "Sound: Off";
  }
}
