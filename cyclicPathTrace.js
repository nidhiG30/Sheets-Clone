// Cycle Detection Algorithm
function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srcr, srcc] = cycleResponse;
  let visited = []; // Node visit trace
  let dfsVisited = []; // Stack visit trace

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

  // for (let i = 0; i < rows; i++) {
  //   for (let j = 0; j < cols; j++) {
  //     if (visited[i][j] === false) {
  //       let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
  //       if(response) return true; 
  //     }
  //   }
  // }

  let response = dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited); // boolean response
  if (response) return true;

  return false;
}

// Coloring cells for tracking
function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`); // gives the cell
  
  setTimeout(() => {
    cell.style.backgroundColor = "lightblue";
  }, 1000);

  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

    if (visited[nbrr][nbrc] === false) {
      let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
      if (response) {
        setTimeout(() => {
          cell.style.backgroundColor = "transparent";
        }, 1000);
        return true;
      }
    }

    else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) { // neighbour condition provides cycle
      let cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
      setTimeout(() => {
        // cell.style.backgroundColor = "lightblue";
        cyclicCell.style.backgroundColor = "lightsalmon";
      }, 1000);
      cyclicCell.style.backgroundColor = "transparent";
      return true;
    }
  }
  
  dfsVisited[srcr][srcc] = false;
  return false;
}