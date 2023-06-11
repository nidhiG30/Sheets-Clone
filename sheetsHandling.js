let sheetsFolderContainer = document.querySelector('.sheets-folder-cont');
let addSheetBtn = document.querySelector('.sheet-add-icon');
addSheetBtn.addEventListener('click', () => {
  let sheet = document.createElement('div'); // created sheet
  sheet.setAttribute('class', 'sheet-folder');

  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  sheet.setAttribute('id', allSheetFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

  sheetsFolderContainer.appendChild(sheet);
  // DB: Every sheet has different storage
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
});

function handleSheetDB(sheetIdx) {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

// when a sheet is clicked/toggled some task performed on it should be shown
function handleSheetActiveness(sheet) {
  let sheetIdx = Number(sheet.getAttribute('id'));
  handleSheetDB(sheetIdx);
}

function createSheetDB() {
  // Storage
  let sheetDB = [];

  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < cols; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: 'left',
        fontFamily: 'monospace',
        fontSize: 14,
        fontColor: '#000000',
        BGcolor: '#000000', // default color: identification purpose
        value: '',
        formula: '',
        children: [], // keeps address of child cells
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // Why array -> More than 1 child relation (dependencies)
      row.push([]);
    }
    graphComponentMatrix.push(row);
}
collectedGraphComponent.push(graphComponentMatrix);
}