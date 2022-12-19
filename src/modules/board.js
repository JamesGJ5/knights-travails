import Deque from '../../node_modules/collections/deque';

export default class Board {
  static knightMoves(startCoords, endCoords) {
    // TODO: make sure startCoords and endCoords are in the correct format
    const prev = Board.makePrev(endCoords);
    const queue = new Deque([endCoords]);
  }

  static makePrev(endCoords) {
    const prev = [...Array(8)].map(() => Array(8).fill(0));
    prev[endCoords[0]][endCoords[1]] = endCoords;
    return prev;
  }
}
