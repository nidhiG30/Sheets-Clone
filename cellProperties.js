// Storage
let collectedSheetDB = []; // Contains all sheetDB
let sheetDB = [];

{
  let addSheetBtn = document.querySelector('.sheet-add-icon');
  addSheetBtn.click();
}

// for (let i = 0; i < rows; i++) {
//   // rows & cols are fetched from 'grid.js', bcz it is loaded before this file in the DOM
//   let sheetRow = []; // containes 1-100 cell's collected data
//   for (let j = 0; j < cols; j++) {
//     let cellProp = {
//       bold: false,
//       italic: false,
//       underline: false,
//       alignment: 'left',
//       fontFamily: 'monospace',
//       fontSize: 14,
//       fontColor: '#000000',
//       BGcolor: '#000000', // default color: identification purpose
//       value: '',
//       formula: '',
//       children: [], // keeps address of child cells
//     };
//     sheetRow.push(cellProp);
//   }
//   sheetDB.push(sheetRow);
// }

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
let inactiveColorProp = '#ecf0f1';

// Application of two-way binding
// Attach property listeners
bold.addEventListener('click', e => {
  // Access the cell
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // Modifictaion
  cellProp.bold = !cellProp.bold; // Data Change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal'; // UI change (1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI change (2)
});

italic.addEventListener('click', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener('click', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener('change', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + 'px';
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener('change', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener('change', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

BGcolor.addEventListener('change', e => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.BGcolor = BGcolor.value;
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

alignment.forEach(alignElem => {
  alignElem.addEventListener('click', e => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    let alignValue = e.target.classList[0]; // whichever alignElem was clicked, we accessed its class value. The left/center/right property is set on the 0th index of the classList, that's why mentioned the 0th index.

    cellProp.alignment = alignValue; // Data change
    cell.style.textAlign = cellProp.alignment; // UI change (1)

    switch (
      alignValue // UI change (2)
    ) {
      case 'left':
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case 'center':
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case 'right':
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll('.cell');
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

// Whenever a user clicks on a cell, the cursor starts to point there
function addListenerToAttachCellProperties(cell) {
  cell.addEventListener('click', e => {
    let address = addressBar.value;
    let [rid, cid] = decodeRidCidFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    // Apply cell properties
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none';
    cell.style.fontSize = cellProp.fontSize + 'px';
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGcolor === '#000000' ? 'transparent' : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;

    // Apply UI Properties on Container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;

    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;

    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;

    fontColor.value = cellProp.fontColor;

    BGcolor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;

    switch (cellProp.alignment) {
      case 'left':
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case 'center':
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case 'right':
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }

    let formulaBar = document.querySelector('.formula-bar');
    formulaBar.value = cellProp.formula;
    cell.innerText = cellProp.value; // cell is a div element, that's why innerText
  });
}

function getCellAndCellProp(address) {
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
  