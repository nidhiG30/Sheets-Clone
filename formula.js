// selecting the cells
for (let i = 0; i< rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener('blur', e => {
      let address = addressBar.value;
      let [activeCell, cellProp] = activecell(address)  ; // accessing the cell object
      let enteredData = activeCell.innerText;

      cellProp.value = enteredData; // .value is taken from cellProps obj in cellProperties.js
      console.log(cellProp);
    })
  }
}

let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown', e => {
  let inputFormula = formula.value;
  if (e.key === 'Enter' && inputFormula) {
    let evaluatedValue = evaluateFormula(inputFormula);
  }
});

function evaluateFormula (formula) {
  return eval(formula);
}