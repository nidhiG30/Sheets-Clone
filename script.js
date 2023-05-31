let rows = 100; // no. of rows in the grid of cells
let cols = 26; // total alphabets are 26

let addressRowCont = document.querySelector('.address-row-cont');
let addressColCont = document.querySelector('.address-col-cont');
let cellsCont = document.querySelector('.cells-cont');

for (let i = 0; i < rows; i++) {
  let addressRow = document.createElement('div');
  addressRow.setAttribute('class', 'address-row');
  addressRow.innerText = i + 1;
  addressRowCont.appendChild(addressRow);
}

for (let i = 0; i < cols; i++) {
  let addressCol = document.createElement('div');
  addressCol.setAttribute('class', 'address-col');
  addressCol.innerText = String.fromCharCode(65 + i);
  addressColCont.appendChild(addressCol);
}

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement('div');
  rowCont.setAttribute('class', 'row-cont');
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('contentEditable', 'true');
    rowCont.appendChild(cell);
  }
  cellsCont.appendChild(rowCont);
}