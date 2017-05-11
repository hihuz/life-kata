export const countLiveNeighbors = neighbors =>
  neighbors && typeof neighbors === "object"
    ? neighbors.reduce((acc, cur) => (cur ? acc + 1 : acc), 0)
    : 0;

export const getNextCellState = ({ cell, liveNeighbors }) => {
  if (liveNeighbors === 2) {
    return cell.state;
  } else if (liveNeighbors === 3) {
    return 1;
  }
  return 0;
};

export const getCurCellState = ({ board, x, y }) =>
  x >= board[0].length || y >= board.length ? 0 : board[y][x];

export const getNeighborsCoords = ({ board, x, y }) => {
  const coords = Array.from(new Array(8), () => ({ x: 1, y: 1 }));

  return coords;
};
