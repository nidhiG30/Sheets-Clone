let ctrlKey;
document.addEventListener('keydown', e => {
  ctrlKey = e.ctrlKey; // the property will have a boolean value
})
document.addEventListener('keyup', e => {
  ctrlKey = e.ctrlKey; // means 'ctrl' is not pressed
})