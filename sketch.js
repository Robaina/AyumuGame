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

function displayGrid () {

  firstTouch = false;
  numberCounter = 1;
  let gameGrid = document.getElementById("game_grid");
  if (window.innerWidth > window.innerHeight) {
    nrows = minGridSize;
    ncols = maxGridSize;
  } else {
    nrows = maxGridSize;
    ncols = minGridSize;
  }

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
      }
      cell.addEventListener("click", countCells);
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
  startTime = new Date();
}

function countCells(event) {
  if (firstTouch) {
    if (event.target.id == "n" + numberCounter.toString()) {
      event.target.style.visibility = "hidden";
      tick.play();
      if (event.target.id == "n9") {
        endTime = new Date();
        applause.play();
        document.getElementById("win").style.visibility = "visible";
        document.getElementById("reset").style.visibility = "visible";
        document.getElementById("time").innerHTML = "completed in " + (endTime - startTime) / 1000 +  " seconds";
      }
    } else {
      cells = document.getElementsByClassName("numbered-grid-cell");
      for (cell of cells){
        cell.style.color = "rgba(0, 0, 0, 0)";
        cell.style["background-image"] = "none";
      }
      chimp.play();
      document.getElementById("loose").style.visibility = "visible";
      document.getElementById("reset").style.visibility = "visible";
    }
    numberCounter++;
  }
}

function resetGrid() {
  for (id_name of ["win", "loose", "time", "reset"]) {
    document.getElementById(id_name).style.visibility = "hidden";
  }
  document.getElementById("game_grid").innerHTML = "";
  displayGrid();
}
