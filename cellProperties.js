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
      fontSIze: 14,
      fontColor: '#000000',
      BGcolor: '#000000', // default color
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}