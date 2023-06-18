let ctrlKey;
document.addEventListener('keydown', e => {
  ctrlKey = e.ctrlKey; // the property will have a boolean value
});
document.addEventListener('keyup', e => {
  ctrlKey = e.ctrlKey; // means 'ctrl' is not pressed
});

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
    cell.style.border = '3px solid #006266';

    // Attributes of clicked cell
    let rid = Number(cell.getAttribute('rid'));
    let cid = Number(cell.getAttribute('cid'));
    rangeStorage.push([rid, cid]);
    console.log(rangeStorage);
  });
}

function defaultSelectedCellsUI() {
  // rangeStorage keeps data of two cells that were selected using CTRL+Click
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`,
    );
    cell.style.border = '1px solid #dfe4ea';
  }
}

let copyData = []; // has data between left and right selected cell
copyBtn.addEventListener('click', e => {
  if (rangeStorage.length < 2) return;
  copyData = []; // Initializing empty becoz on every new cell click, new data should get copied to clipboard rmeoving previous data

  let [startRow, startCol, endRow, endCol] = [
    rangeStorage[0][0],
    rangeStorage[0][1],
    rangeStorage[1][0],
    rangeStorage[1][1],
  ];

  for (let i = startRow; i <= endRow; i++) {
    let copyRow = [];
    for (let j = startCol; j <= endCol; j++) {
      let cellProp = sheetDB[i][j];
      let cellDataProp = copyRow.push(cellProp);
      console.log(cellDataProp);
    }
    copyData.push(copyRow);
  }

  defaultSelectedCellsUI(); // After copying, the selected cells are removed from the UI
});

cutBtn.addEventListener('click', e => {
  if (rangeStorage.length < 2) return;

  let [startRow, startCol, endRow, endCol] = [
    rangeStorage[0][0],
    rangeStorage[0][1],
    rangeStorage[1][0],
    rangeStorage[1][1],
  ];

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

      // DB
      let cellProp = sheetDB[i][j];
      cellProp.value = "";
      cellProp.bold = false;
      cellProp.italic = false;
      cellProp.underline = false;
      cellProp.fontSize = 14;
      cellProp.fontFamily = "monospace";
      cellProp.fontColor = "#000000";
      cellProp.BGcolor = "#000000";
      cellProp.alignment = "left"; 

      // UI
      cell.click();
    }
  }

  defaultSelectedCellsUI();
});

pasteBtn.addEventListener('click', e => {
  // Paste cell's data
  if (rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  // Target
  let address = addressBar.value;
  let [stRow, stCol] = decodeRidCidFromAddress(address);

  // r - refers copyData's row
  // c - refers copyData's col
  for (let i = stRow, r = 0; i <= stRow + rowDiff; i++, r++) {
    for (let j = stCol, c = 0; j <= stCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      if (!cell) continue;

      // DB : to copy paste data & properties (and not children & formula)
      let data = copyData[r][c]; // has the cell's object
      let cellProp = sheetDB[i][j]; // has cell object

      cellProp.value = data.value; // assign value to targeted cell
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underline = data.underline;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontColor = data.fontColor;
      cellProp.BGcolor = data.BGcolor;
      cellProp.alignment = data.alignment;

      // UI
      cell.click();
    }
  }
});
