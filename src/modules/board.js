import Deque from '../../node_modules/collections/deque';

// TODO: privatise methods that don't need to be public
// TODO: replace prev with prevGrid for clarity
export default class Board {
  static knightMoves(startCoords, endCoords) {
    // TODO: make sure startCoords and endCoords are in the correct format
    const prevGrid = Board.makePrev(endCoords);
    const deque = new Deque([endCoords]);
    Board.doTraversal(prevGrid, deque, startCoords);
  }

  static doTraversal(prevGrid, deque, knightStartCoords) {
    while (deque.length > 0) {
      const currentCoords = deque.shift();
      const moveList = Board.getMoves(currentCoords, prevGrid);
      for (let i = 0; i < moveList.length; i += 1) {
        const move = moveList[i];
        Board.logPrevious(move, currentCoords, prevGrid);
        if (move === knightStartCoords) {
          return;
        }
      }
    }
  }

  static makePrev(endCoords) {
    const prevGrid = [...Array(8)].map(() => Array(8).fill(null));
    Board.logPrevious(endCoords, endCoords, prevGrid);
    return prevGrid;
  }

  static logPrevious(coords, prevCoords, prevGrid) {
    prevGrid[coords[0]][coords[1]] = prevCoords;
  }

  static getMoves(coords, prevGrid) {
    // Returns a list of unvisited spaces that can be moved to by the knight in
    // one move from coords
    const i = coords[0];
    const j = coords[1];
    const moves = [];
    for (let smallIncrement = -1; smallIncrement <= 1; smallIncrement += 2) {
      for (let largeIncrement = -2; largeIncrement <= 2; largeIncrement += 4) {
        // TODO: combine the below into one loop
        const move1 = [i + smallIncrement, j + largeIncrement];
        if (Board.checkMoveValidity(move1, prevGrid)) {
          moves.push(move1);
        }
        const move2 = [i + largeIncrement, j + smallIncrement];
        if (Board.checkMoveValidity(move2, prevGrid)) {
          moves.push(move2);
        }
      }
    }
    return moves;
  }

  static checkMoveValidity(coords, prevGrid) {
    // TODO: consider splitting the below into two methods
    const i = coords[0];
    const j = coords[1];
    if (i < 0 || i > 7 || j < 0 || j > 7 || prevGrid[i][j] !== null) {
      return false;
    }
    return true;
  }
}
