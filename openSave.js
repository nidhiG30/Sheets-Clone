let downloadBtn = document.querySelector('.download');
let openBtn = document.querySelector('.open');

// Download Task
downloadBtn.addEventListener('click', e => {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
  let file = new Blob([jsonData], {type: 'application/json'});

  let a = document.createElement('a');
  a.href = URL.createObjectURL(file); // method converts blob into URL
  a.download = 'SheetData.json';
  a.click();
});

// Open Task (Upload)
openBtn.addEventListener('click', e => {
  // Opens file explorer
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.addEventListener('change', e => {
    let fr = new FileReader();
    let files = input.files; // Returns a FileList object on a file type input object.
    let fileObj = files[0]; // Taking only 1 file, which is present in files[0]

    fr.readAsText(fileObj);
    fr.addEventListener('load', e => {
      let readSheetData = JSON.parse(fr.result);

      // Basic sheet with default data will be created
      addSheetBtn.click();
    })
  });
})