/* Ayumu's game
   Semidan Robaina Estevez
*/
let nrows, ncols;
let minGridSize = 6;
let maxGridSize = 8;
let numberCounter = 1;

function displayGrid () {

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
      cell.addEventListener("click", countCells);
      // cell.addEventListener("click", hideCells);
    } else if (i == nrows * ncols - 1){
      cell.setAttribute("id", "start-cell");
      cell.addEventListener("click", hideCells);
    } else {
      cell.setAttribute("class", "grid-cell");
      cell.style.visibility = "hidden";
    }

    gameGrid.appendChild(cell);
  }

}

// document.addEventListener("click", hideCells);

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

function hideCells(event) {
  cells = document.getElementsByClassName("numbered-grid-cell");
  for (cell of cells){
    cell.style.color = "rgba(0, 0, 0, 0)";
    cell.style["background-color"] = "rgba(255, 255, 255, 0.8)";
  }
  document.getElementById("start-cell").style.visibility = "hidden";
}

function countCells(event) {
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
