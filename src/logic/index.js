import shuffle from "lodash/shuffle";

export const countLiveNeighbors = (neighbors = []) =>
  neighbors.reduce((acc, cur) => (cur ? acc + 1 : acc), 0);

export const getNextCellState = ({ cell = 0, liveNeighbors = 0 }) => {
  if (liveNeighbors === 2) {
    return cell;
  } else if (liveNeighbors === 3) {
    return 1;
  }
  return 0;
};

export const getCurCellState = ({ board = [[]], x = 0, y = 0 }) =>
  x >= board[0].length || x < 0 || y >= board.length || y < 0 ? undefined : board[y][x];

// :-(
export const getNeighbors = ({ board = [], x = 0, y = 0 }) => {
  const neighbors = [];
  for (let i = Math.max(0, y - 1); i <= Math.min(board.length - 1, y + 1); i++) {
    for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length - 1, x + 1); j++) {
      if (i !== y || j !== x) {
        neighbors.push(board[i][j]);
      }
    }
  }
  return neighbors;
};

export const generateBoard = ({ width = 0, height = 0 }) =>
  new Array(height).fill(new Array(width).fill(0));

export const getUniqueNumbers = ({ length = 0, amount = 0 }) => {
  const availableCodes = Array.from(new Array(length), (_, i) => i);
  return shuffle(availableCodes).slice(0, amount);
};

export const convertPosToCoords = ({ width = 0, pos = [] }) =>
  pos.map(item => ({
    x: item % width,
    y: Math.floor(item / width)
  }));

export const fillBoard = ({ board = [], coords = [] }) => {
  const filled = board.map(line => [...line]);
  coords.forEach(({ x, y }) => {
    filled[y][x] = 1;
  });
  return filled;
};

const CreateLife = ({ width = 0, height = 0, amount = 0 }) => {
  const pos = getUniqueNumbers({ length: width * height, amount });
  const coords = convertPosToCoords({ width, pos });
  const emptyBoard = generateBoard({ width, height });
  const board = fillBoard({ board: emptyBoard, coords });
  const running = false;
  let runId;

  return {
    board,
    running,
    tick() {
      const nextBoard = this.board.map((line, y) =>
        line.map((cell, x) => {
          const neighbors = getNeighbors({ board: this.board, x, y });
          const liveNeighbors = countLiveNeighbors(neighbors);
          return getNextCellState({ cell, liveNeighbors });
        })
      );
      this.board = nextBoard;
    },
    run(interval = 200) {
      if (!this.running) {
        this.running = true;
        runId = setInterval(this.tick, interval);
      }
    },
    stop() {
      if (this.running) {
        this.running = false;
        clearInterval(runId);
      }
    },
    reset() {
      this.board = board;
    }
  };
};

export default CreateLife;
