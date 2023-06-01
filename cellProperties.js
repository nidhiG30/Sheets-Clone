// Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) { // rows & cols are fetched from 'grid.js', bcz it is loaded before this file in the DOM
  let sheetRow = []; // containes 1-100 cell's collected data
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: 'screenLeft',
      fontFamily: 'monospace',
      fontSize: 14,
      fontColor: '#000000',
      BGcolor: '#000000', // default color: identification purpose
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let BGcolor = document.querySelector('.BGcolor-prop');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColorProp = '#d1d8e0';
let inactiveColorProp = "#ecf0f1";

// Application of two-way binding
// Attach property listeners
bold.addEventListener('click', e => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modifictaion
  cellProp.bold = !cellProp.bold; // Data Change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; // UI change (1)
  bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)
})

italic.addEventListener('click', e => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modifictaion
  cellProp.italic = !cellProp.italic; // Data Change
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal'; // UI change (1)
  italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2)
})

underline.addEventListener('click', e => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  // Modifictaion
  cellProp.underline = !cellProp.underline; // Data Change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'none'; // UI change (1)
  underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2)
})

function activeCell(address) {
  let [rid, cid] = decodeRidCidFromAddress(address);

  // Access cell & storgae object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp]; // UI change: cell; data change: cellProp <- achieve two-way binding
}

// to decode the value of row id & col id
function decodeRidCidFromAddress(address) {
  // address => "A1": A = col; 1 = row
  let rid = Number(address.slice(1) - 1); // -1' bcz the row indexing starts from 0
  let cid = Number(address.charCodeAt(0)) - 65; // -65' to decode the numeric value

  return [rid, cid];
}