// Cycle Detection Algorithm
function isGraphCyclicTracePath() {
  let visited = [];
  let dfsVisited = [];

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

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
        if(response) return true; 
      }
    }
  }

  return false;
}

function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

    if (visited[nbrr][nbrc] === false) {
      let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
    }

    else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
      return true;
    }
  }
  
  dfsVisited[srcr][srcc] = false;
  return false;
}