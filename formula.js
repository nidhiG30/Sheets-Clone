// selecting the cells & store the data
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener('blur', e => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getCellAndCellProp(address); // accessing the cell object
      let enteredData = activeCell.innerText; // to access modified data

      cellProp.value = enteredData; // .value is taken from cellProps obj in cellProperties.js
    });
  }
}

// Evaluate formula
let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown', e => {
  let inputFormula = formulaBar.value;
  if (e.key === 'Enter' && inputFormula) {
    // identifying key as 'Enter' key
    let evaluatedValue = evaluateFormula(inputFormula);

    // To update UI and Cell Prop in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula);
  }
});

function evaluateFormula(formula) {
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    // check if the value is normal or dependent on some other cell
    let asciiValue = encodedFormula[i].charCodeAt(0); // this contains a string (A1) from which 1st char is taken (A)
    if (asciiValue >= 65 && asciiValue <= 90) {
      // decoding the ASCII value to access its value, only ASCII values will be fetched, rest symbols will be ignored
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]); // gets access to the cell and cell prop
      // gets access to the cell's value
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(' '); // converts array into string
  return eval(decodedFormula); // eval takes value in string format
}

function setCellUIAndCellProp(evaluatedValue, formula) { // why 'formula': whatever formula we take, store that as well. 
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  // UI update
  cell.innerText = evaluatedValue;
  // DB update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}