import Deque from '../../node_modules/collections/deque';

// TODO: privatise methods that don't need to be public
// TODO: replace prev with prevGrid for clarity
export default class Board {
  static knightMoves(startCoords, endCoords) {
    // TODO: make sure startCoords and endCoords are in the correct format
    const prev = Board.makePrev(endCoords);
    const queue = new Deque([endCoords]);
    while (queue.length > 0) {
      const currentCoords = queue.shift();
      const moveList = Board.getMoves(currentCoords, prev);
      Object.keys(moveList).forEach((move) => {
        Board.logPrevious(move, currentCoords, prev);
      });
    }
  }

  static makePrev(endCoords) {
    const prev = [...Array(8)].map(() => Array(8).fill(null));
    Board.logPrevious(endCoords, endCoords, prev);
    return prev;
  }

  static logPrevious(coords, prevCoords, prev) {
    prev[coords[0]][coords[1]] = prevCoords;
  }

  static getMoves(coords, prev) {
    // Returns a list of unvisited spaces that can be moved to by the knight in
    // one move from coords
    const i = coords[0];
    const j = coords[1];
    const moves = [];
    for (let smallIncrement = -1; smallIncrement <= 1; smallIncrement += 2) {
      for (let largeIncrement = -2; largeIncrement <= 2; largeIncrement += 4) {
        // TODO: combine the below into one loop
        const move1 = [coords[0] + smallIncrement, coords[1] + largeIncrement];
        if (Board.checkMoveValidity(move1, prev)) {
          moves.push(move1);
        }
        const move2 = [coords[0] + largeIncrement, coords[1] + smallIncrement];
        if (Board.checkMoveValidity(move2, prev)) {
          moves.push(move2);
        }
      }
    }
    return moves;
  }

  static checkMoveValidity(coords, prev) {
    // TODO: consider splitting the below into two methods
    const i = coords[0];
    const j = coords[1];
    if (i < 0 || i > 7 || j < 0 || j > 7 || prev[i][j] !== null) {
      return false;
    }
    return true;
  }
}
