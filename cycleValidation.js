// Storage -> 2D array (Basic needed)
let collectedGraphComponent = []; // to store graphComponentMatrix

let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//   let row = [];
//   for (let j = 0; j < cols; j++) {
//     // Why array -> More than 1 child relation (dependencies)
//     row.push([]);
//   }
//   graphComponentMatrix.push(row);
// }

// Cycle Detection Algorithm
// Check if child graph is cyclic
// True -> Cyclic, False -> Not Cyclic: Function to give response in boolean
function isGraphCyclic(graphComponentMatrix) {
  // Dependency (2D array) -> visited, dfsVisited
  let visited = []; // Node visit trace
  let dfsVisited = []; // Stack visit trace

  // create dependency
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  // check every cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
        // Found cycle, return immediately, no further exploring
        if(response) return [i, j]; 
      }
    }
  }

  return null;
}

/**
 * Function to detect the cycle, recursively checks every cell and gives response
 * Start -> vis(TRUE) dfsVis(TRUE)
 * End -> dfsVis(FALSE)
 * If vis[i][j] -> already visited path, go back & no use of exploring again
 * Cycle detection condition -> if (vis[i][j] === true && dfsVis[i][j] === true) -> cycle
 * Return -> True/False
 * True -> Cyclic, False -> Not Cyclic
 */
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
  // Start stack trace
  // srcr: source row and srcc: source column
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  // Looping over each & every children of the parent A1 -> [ [0, 1], [1, 0], [5, 10], ... ]
  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
    // nbrr: child row id / nbrc
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

    // means this node was not traversed, hence we will traverse it
    if (visited[nbrr][nbrc] === false) {
      // Recursively call the function to detect the child cells
      let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
      if (response) return true; // Found cycle, return immediately, no further exploring
    }

    // Ultimate condition: to check if the cycle exists
    else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
      // Found cycle, return immediately, no further exploring
      return true;
    }
  }
  
  // End stack trace
  dfsVisited[srcr][srcc] = false;
  return false; // If no cycle found
}