let sheetsFolderContainer = document.querySelector('.sheets-folder-cont');
let addSheetBtn = document.querySelector('.sheet-add-icon');
addSheetBtn.addEventListener('click', () => {
  let sheet = document.createElement('div');
  sheet.setAttribute('class', 'sheet-folder');

  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  sheet.setAttribute('id', allSheetFolders.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

  sheetsFolderContainer.appendChild(sheet);
  createSheetDB();
});

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