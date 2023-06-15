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

let rangeStorage = []; // storage for cells to keep data of (cut, copy, paste). Has rid, cid of top-left to btm-right cell
function handleSelectedCells(cell) {
  cell.addEventListener('click', e => {
    // Select cell's range
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) return;
  
  })
}