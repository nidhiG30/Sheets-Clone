let sheetsFolderContainer = document.querySelector('.sheets-folder-cont');
let addSheetBtn = document.querySelector('.sheet-add-icon');
let activeSheetColor = '#c8d6e5';

addSheetBtn.addEventListener('click', (e) => {
  let sheet = document.createElement('div'); // created sheet
  sheet.setAttribute('class', 'sheet-folder');

  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  sheet.setAttribute('id', allSheetFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

  sheetsFolderContainer.appendChild(sheet);
  sheet.scrollIntoView(); // Page scrolls to right when sheet count increases beyond initial limit on viewport

  // DB: Every sheet has different storage
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener('mousedown', e => {
    // Returns a number: 0 - Left click, 1 - scroll button; 2 - right click button
    if (e.button !== 2) return;

    // For min 1 sheet folder
    let allSheetFolders = document.querySelectorAll('.sheet-folder');
    if (allSheetFolders.length === 1) {
      alert("You need to have at least one sheet!");
      return;
    }

    let response = confirm('Heads up!!! Are you sure you want to delete this sheet?');
    if (response === false) return;

    let sheetIdx = Number(sheet.getAttribute('id'));
    // Sheet Removal from DB
    collectedSheetDB.splice(sheetIdx, 1); // on the given index, removes 1 sheet from the DB
    collectedGraphComponent.splice(sheetIdx, 1);
    // UI
    handleSheetUIRemoval(sheet);

    // By default assign DB to sheet 1 (active)
    sheetDB = collectedSheetDB[0];
    createGraphComponentMatrix = collectedGraphComponent[0];
    handleSheetProperties();
  })
}

function handleSheetUIRemoval(sheet) {
  // Sheet Removal from UI
  sheet.remove();

  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute('id', i);
    let sheetContent = allSheetFolders[i].querySelector('.sheet-content');
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  allSheetFolders[0].style.backgroundColor = activeSheetColor;
}

function handleSheetDB(sheetIdx) {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

// Handling cell properties on every cell
function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }

  // By default click on first cell via DOM on every sheet toggle
  let firstCell = document.querySelector('.cell');
  firstCell.click();
}

// Takes the active sheet and applies BG-color to it
function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = 'transparent';
  }
  sheet.style.backgroundColor = activeSheetColor;
}

// when a sheet is clicked/toggled some task performed on it should be shown
function handleSheetActiveness(sheet) {
  sheet.addEventListener('click', e => {
    let sheetIdx = Number(sheet.getAttribute('id'));
    handleSheetDB(sheetIdx);
    handleSheetProperties();
    handleSheetUI(sheet);
  })
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