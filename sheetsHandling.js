let addSheetBtn = document.querySelector('.sheet-add-icon');
addSheetBtn.addEventListener('click', () => {
  let sheet = document.createElement('div');
  sheet.setAttribute('class', 'sheet-folder');
  
  let allSheetFolders = document.querySelectorAll('.sheet-folder');
  sheet.setAttribute('id', allSheetFolders.length);
})