// Storage -> 2D matrix (Basic needed)
let graphComponentMatrix = [];

for (let i = 0; i < rows.length; i++) {
  let row = [];
  for (let j = 0; j < cols.length; j++) {
    // Why array -> More than 1 child relation (dependencies)
    row.push([]);
  }
  graphComponentMatrix.push(row);
}

// True -> Cycle, False -> Not Cyclic
function isGraphCyclic() {
  
}