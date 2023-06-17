let ctrlKey;
document.addEventListener('keydown', e => {
  ctrlKey = e.ctrlKey; // the property will have a boolean value
})
document.addEventListener('keyup', e => {
  ctrlKey = e.ctrlKey; // means 'ctrl' is not pressed
})

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    handleSelectedCells(cell);
  }
}

let copyBtn = document.querySelector('.copy');
let cutBtn = document.querySelector('.cut');
let pasteBtn = document.querySelector('.paste');

let rangeStorage = []; // storage for cells to keep data of (cut, copy, paste). Has rid, cid of top-left to btm-right cell
function handleSelectedCells(cell) {
  cell.addEventListener('click', e => {
    // Select cell's range
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectedCellsUI();
      rangeStorage = [];
    }

    // UI
    cell.style.border = "3px solid #006266";
  
    // Attributes of clicked cell
    let rid = Number(cell.getAttribute('rid'));
    let cid = Number(cell.getAttribute('cid'));
    rangeStorage.push([rid, cid]);
    console.log(rangeStorage);
  })
}

function defaultSelectedCellsUI() {
  // rangeStorage keeps data of two cells that were selected using CTRL+Click
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
    cell.style.border = '1px solid lightgrey';
  }
}

let copyData = [];
copyBtn.addEventListener('click', e => {
  let startRow = rangeStorage[0][0];
  let startCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];
  for (let i = startRow; i < endRow; i++) {
    let copyRow = [];
    for (let  j = startCol; j < endCol; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  
  defaultSelectedCellsUI(); // After copying, the selected cells are removed from the UI
})