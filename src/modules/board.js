export default class Board {
  static knightMoves(startCoords, endCoords) {
    const prev = Board.makePrev(endCoords);
  }

  static makePrev(endCoords) {
    const prev = [...Array(8)].map(() => Array(8).fill(0));
    prev[endCoords[0]][endCoords[1]] = endCoords;
    return prev;
  }
}
