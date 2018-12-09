/* Ayumu's game
Sound clips:
Chimpanzee: recorded by Mike Koenig (soundbible.com)
Tick: recorded by DeepFrozenApps (soundbible.com)
   Semidan Robaina Estevez
*/
let nrows, ncols;
let minGridSize = 6;
let maxGridSize = 8;
let firstTouch, numberCounter;

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
    // cell.style["background-color"] = "rgba(255, 255, 255, 0.8)";
    cell.style["background-image"] = "url(imgs/chimp.png)";
  }
  firstTouch = true;
}

function countCells(event) {
  if (firstTouch) {
    if (event.target.id == "n" + numberCounter.toString()) {
      event.target.style.visibility = "hidden";
    } else {
      cells = document.getElementsByClassName("numbered-grid-cell");
      for (cell of cells){
        cell.style.color = "rgba(0, 0, 0, 0)";
        cell.style["background-color"] = "rgba(0, 0, 0, 0)";
      }
    }
    numberCounter ++;
  }
}
