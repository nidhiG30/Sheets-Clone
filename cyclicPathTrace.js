 // For performing delay and wait
function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
}

// Cycle Detection Algorithm
async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
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

  let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited); // boolean response
  if (response) return Promise.resolve(true);

  return Promise.resolve(false);
}

// Coloring cells for tracking
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`); // gives the cell 
  cell.style.backgroundColor = "lightblue";
  await colorPromise(); // Till 1 sec finishes

  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
    let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];

    if (visited[nbrr][nbrc] === false) {
      let response = await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
      if (response) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();

        return Promise.resolve(true);
      }
    }

    else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) { // neighbour condition provides cycle
      let cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
      
      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorPromise();
      cyclicCell.style.backgroundColor = "transparent";
      
      cell.style.backgroundColor = "transparent"; // after the cycle got detected & tracked, the last cell from where the tracking begins should also become transparent after finishing the cyclic trace.
      await colorPromise();

      return Promise.resolve(true);
    }
  }
  
  dfsVisited[srcr][srcc] = false;
  return Promise.resolve(false);
}