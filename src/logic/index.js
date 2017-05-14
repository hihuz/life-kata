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
  x >= board[0].length || x < 0 || y >= board.length || y < 0 ? undefined : board[y][x];

// :-(
export const getNeighbors = ({ board, x, y }) => {
  const neighbors = [];
  for (let i = Math.max(0, y - 1); i <= Math.min(board.length, y + 1); i++) {
    for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length, x + 1); j++) {
      if (i != y || j != x) {
        neighbors.push(board[i][j]);
      }
    }
  }
  return neighbors;
};

export const generateBoard = ({ width, height }) =>
  new Array(height).fill(new Array(width).fill(0));

export const getUniqueNumbers = ({ length = 0, amount = 0 }) => {
  const availableCodes = Array.from(new Array(length), (_, i) => i);
  const shuffledCodes = availableCodes.sort((a, b) =>
    Math.floor(Math.random() * availableCodes.length)
  );
  return shuffledCodes.slice(0, amount);
};

export const convertPosToCoords = ({ width = 0, pos = [] }) =>
  pos.map(item => ({
    x: item % width,
    y: Math.floor(item / width)
  }));

export const fillBoard = ({ board = [], coords = [] }) => {
  const filled = [...board];
  coords.forEach(({ x, y }) => {
    filled[y][x] = 1;
  });
  return filled;
};
