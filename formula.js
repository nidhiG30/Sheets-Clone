// selecting the cells & store the data
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener('blur', e => {
      let address = addressBar.value;
      let [activeCell, cellProp] = getCellAndCellProp(address); // accessing the cell object
      let enteredData = activeCell.innerText; // to access modified data

      if (enteredData === cellProp.value) return; // if no change in data of cell
      cellProp.value = enteredData; // .value is taken from cellProps obj in cellProperties.js

      // If data modifies remove P-C relation, formula empty, update children with new hardcoded (modified) value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = '';
      updateChildrenCells(address);
    });
  }
}

// Evaluate formula
let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown', e => {
  let inputFormula = formulaBar.value;

  // identifying key as 'Enter' key
  if (e.key === 'Enter' && inputFormula) {
    // If change in formula, break old P-C relation, evaluate new formula, add new P-C relation
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    if (inputFormula !== cellProp.formula)
      removeChildFromParent(cellProp.formula); // cellProp.formula' has old rel-nship
      
    addChildToGraphComponent(inputFormula, address);

    // Check formula is cyclic or not, then only evaluate
    // True -> Cycle, False -> Not Cyclic
    let isCyclic = isGraphCyclic(graphComponentMatrix);
    if (isCyclic) {
      alert('Your formula is cyclic');
      removeChildFromGraphComponent(inputFormula, address); // to break the relation with previous formula if found cycle
      return;
    }

    let evaluatedValue = evaluateFormula(inputFormula); // evaluation for the current cell

    // To update UI and Cell Prop in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    console.log(sheetDB);

    updateChildrenCells(address);
  }
});

function addChildToGraphComponent(formula, childAddress) {
  // formula: to find dependency (decode parent); childAddress: decode child & add to parent
  let [crid, ccid] = decodeRidCidFromAddress(childAddress); // decoded children
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRidCidFromAddress(encodedFormula[i]); // decoded parent

      // B1: A1 + 10;
      // rid -> i, cid -> j
      graphComponentMatrix[prid][pcid].push([crid, ccid]);
    }
  }
}

function removeChildFromGraphComponent(formula, childAddress) {
  let [crid, ccid] = decodeRidCidFromAddress(childAddress); // decoded children
  let encodedFormula = formula.split(' ');
  
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRidCidFromAddress(encodedFormula[i]); // decoded parent
      graphComponentMatrix[prid][pcid].pop();
    }
  }
}

// Update children cells upon change in dependancy expression
function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let children = parentCellProp.children;

  // for all the children in the parent
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);

    // Recursively calling the function to update child addresses for every parent function in the sequence
    updateChildrenCells(childAddress);
  }
}

// Add P-C relationship
function addChildToParent(formula) {
  let childAddress = addressBar.value;
  console.log(childAddress);
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

// get old formula to break that relationship with parent
function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  console.log(childAddress);
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);

      // remove child from the parent cell's children array
      let index = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(index, 1);
    }
  }
}

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

// formula to be set in the UI
function setCellUIAndCellProp(evaluatedValue, formula, address) {
  // why 'formula': whatever formula we take, store that as well.
  let [cell, cellProp] = getCellAndCellProp(address);

  // UI update
  cell.innerText = evaluatedValue;
  // DB update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
