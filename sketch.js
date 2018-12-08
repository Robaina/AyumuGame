/* Ayumu's game
   Semidan Robaina Estevez
*/
let nrows, ncols;
let minGridSize = 6;
let maxGridSize = 8;

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

  cells = [];
  numberedCells = getRandomSample(minInt=0, maxInt=nrows*ncols - 1, size=9);
  numberLabels = getRandomSample(minInt=1, maxInt=9, size=9);

  for (let i = 0; i < nrows * ncols; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "grid-cell");

    if (numberedCells.includes(i)) {
      let number = numberLabels.pop();
      let cellNumber = document.createTextNode(number);
      cell.appendChild(cellNumber);
      cell.setAttribute("id", "n" + number);
    } else {
      cell.style.visibility = "hidden";
    }

    gameGrid.appendChild(cell);
    cells.push(cell);
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
