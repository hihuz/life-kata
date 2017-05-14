import CreateLife, {
  countLiveNeighbors,
  getNextCellState,
  getCurCellState,
  getNeighbors,
  generateBoard,
  convertPosToCoords,
  getUniqueNumbers,
  fillBoard
} from "../index";

jest.useFakeTimers();

describe("countLiveNeighbors", () => {
  test("should be a function", () => {
    const expected = "function";
    const actual = typeof countLiveNeighbors;
    expect(actual).toEqual(expected);
  });

  test("should default to an empty array", () => {
    const expected = 0;
    const actual = countLiveNeighbors();
    expect(actual).toEqual(expected);
  });

  test("should count the number of 1s in the passed array", () => {
    const neighbors = [1, 0, 1, 0, 0, 0, 1, 0, 0];
    const expected = 3;
    const actual = countLiveNeighbors(neighbors);
    expect(actual).toEqual(expected);
  });
});

describe("getNextCellState", () => {
  test("should be a function", () => {
    const expected = "function";
    const actual = typeof getNextCellState;
    expect(actual).toEqual(expected);
  });

  test("should default to 0 / 0", () => {
    const expected = 0;
    const actual = getNextCellState({});
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is dead and passed count is 3", () => {
    const liveNeighbors = 3;
    const cell = 0;
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed cell is dead and passed count isn't 3", () => {
    const liveNeighbors = 2;
    const cell = 0;
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed count is > 3", () => {
    const liveNeighbors = 4;
    const cell = 1;
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is alive and passed count is 2", () => {
    const liveNeighbors = 2;
    const cell = 1;
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is alive and passed count is 3", () => {
    const liveNeighbors = 3;
    const cell = 1;
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed cell is dead and passed count is 2", () => {
    const liveNeighbors = 2;
    const cell = 0;
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed count is less than 2", () => {
    const liveNeighbors = 1;
    const cell = "boo";
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });
});

describe("getCurrentCellState", () => {
  const board = [[1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 0, 0, 1]];

  test("should take a board and x/y coordinates and return the state of the cell 1", () => {
    const x = 0;
    const y = 0;
    const expected = 1;
    const actual = getCurCellState({ board, x, y });
    expect(actual).toEqual(expected);
  });

  test("should default to undefined", () => {
    const expected = undefined;
    const actual = getCurCellState({});
    expect(actual).toEqual(expected);
  });

  test("should take a board and x/y coordinates and return the state of the cell 2", () => {
    const x = 3;
    const y = 2;
    const expected = 0;
    const actual = getCurCellState({ board, x, y });
    expect(actual).toEqual(expected);
  });

  test("should take a board and x/y coordinates and return the state of the cell 3", () => {
    const x = 1;
    const y = 1;
    const expected = 1;
    const actual = getCurCellState({ board, x, y });
    expect(actual).toEqual(expected);
  });

  test("should return undefined if coordinates are outside the board", () => {
    const x = 4;
    const y = 1;
    const expected = undefined;
    const actual = getCurCellState({ board, x, y });
    expect(actual).toEqual(expected);
  });
});

describe("getNeighbors", () => {
  const board = [[1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 0, 0, 1]];

  test("should take a board and x/y coordinates and return an array of numbers", () => {
    const x = 2;
    const y = 2;
    const neighbors = getNeighbors({ board, x, y });
    const expected = neighbors.length;
    const actual = getNeighbors({ board, x, y }).reduce(
      (acc, cur) => (typeof cur === "number" ? acc + 1 : acc),
      0
    );
    expect(actual).toEqual(expected);
  });

  test("should return the actual neighbors values starting from top left", () => {
    const x = 2;
    const y = 2;
    const expected = [1, 0, 1, 0, 0, 0, 0, 1];
    const actual = getNeighbors({ board, x, y });
    expect(actual).toEqual(expected);
  });

  test("should return only neighbors that are actually inside the board", () => {
    const x = 0;
    const y = 0;
    const expected = [0, 0, 1];
    const actual = getNeighbors({ board, x, y });
    expect(actual).toEqual(expected);
  });
});

describe("generateBoard", () => {
  test("should default to []", () => {
    const expected = [];
    const actual = generateBoard({});
    expect(actual).toEqual(expected);
  });

  test("should return an array of length height", () => {
    const width = 100;
    const height = 42;
    const expected = height;
    const actual = generateBoard({ width, height }).length;
    expect(actual).toEqual(expected);
  });

  test("should return an array made of arrays of length width", () => {
    const width = 100;
    const height = 42;
    const expected = height;
    const actual = generateBoard({ width, height }).reduce(
      (acc, cur) => (cur.length === width ? acc + 1 : acc),
      0
    );
    expect(actual).toEqual(expected);
  });

  test("should return a 'dead' array filled with 0s", () => {
    const width = 100;
    const height = 42;
    const expected = width * height;
    const actual = generateBoard({ width, height })
      .reduce((acc, cur) => [...acc, ...cur], [])
      .reduce((acc, cur) => (cur === 0 ? acc + 1 : acc), 0);
    expect(actual).toEqual(expected);
  });
});

describe("getUniqueNumbers", () => {
  test("should return an array", () => {
    const expected = true;
    const actual = Array.isArray(getUniqueNumbers({}));
    expect(actual).toEqual(expected);
  });

  test("should take a length, an amount and return an array of expected length", () => {
    const amount = 10;
    const length = 100;
    const expected = amount;
    const actual = getUniqueNumbers({ length, amount }).length;
    expect(actual).toEqual(expected);
  });

  test("should return an array of numbers", () => {
    const amount = 1;
    const length = 1;
    const expected = [0];
    const actual = getUniqueNumbers({ length, amount });
    expect(actual).toEqual(expected);
  });
});

describe("convertPosToCoords", () => {
  test("should return an array", () => {
    const expected = true;
    const actual = Array.isArray(convertPosToCoords({}));
    expect(actual).toEqual(expected);
  });

  test("should convert pos array to coords based off passed width 1", () => {
    const width = 2;
    const pos = [2, 3, 6, 8];
    const expected = [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 3 }, { x: 0, y: 4 }];
    const actual = convertPosToCoords({ width, pos });
    expect(actual).toEqual(expected);
  });

  test("should convert pos array to coords based off passed width 2", () => {
    const width = 10;
    const pos = [0, 5, 42, 65];
    const expected = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 2, y: 4 }, { x: 5, y: 6 }];
    const actual = convertPosToCoords({ width, pos });
    expect(actual).toEqual(expected);
  });
});

describe("fillBoard", () => {
  const board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const coords = [{ x: 0, y: 0 }, { x: 3, y: 2 }, { x: 1, y: 3 }];

  test("should default to []", () => {
    const expected = [];
    const actual = fillBoard({});
    expect(actual).toEqual(expected);
  });

  test("should take a board and return a board of same size", () => {
    const filledBoard = fillBoard({ board, coords });
    const expected = board[0].length * board.length;
    const actual = filledBoard[0].length * filledBoard.length;
    expect(actual).toEqual(expected);
  });

  test("should take a board and an array of coords and fill the right amount of cells", () => {
    const expected = coords.length;
    const actual = fillBoard({ board, coords })
      .reduce((acc, cur) => [...acc, ...cur], [])
      .reduce((acc, cur) => (cur === 1 ? acc + 1 : acc), 0);
    expect(actual).toEqual(expected);
  });

  test("should fill the cells in the correct positions", () => {
    const expected = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1], [0, 1, 0, 0]];
    const actual = fillBoard({ board, coords });
    expect(actual).toEqual(expected);
  });
});

describe("CreateLife", () => {
  test("should return an object with a board tick, run, stop and reset prop", () => {
    const Life = CreateLife({});
    const expected = ["board", "running", "tick", "run", "stop", "reset"];
    const actual = Object.keys(Life);
    expect(actual).toEqual(expected);
  });

  test("tick, run, stop, and reset should be methods, but not board & running", () => {
    const Life = CreateLife({});
    expect(typeof Life.tick).toEqual("function");
    expect(typeof Life.run).toEqual("function");
    expect(typeof Life.stop).toEqual("function");
    expect(typeof Life.reset).toEqual("function");
    expect(typeof Life.board).not.toEqual("function");
    expect(typeof Life.running).not.toEqual("function");
  });
});

describe("CreateLife: board prop", () => {
  test("should be an array", () => {
    const Life = CreateLife({});
    const expected = true;
    const actual = Array.isArray(Life.board);
    expect(actual).toEqual(expected);
  });

  test("should be init based off passed width/height/amount", () => {
    const width = 120;
    const height = 100;
    const amount = 42;
    const Life = CreateLife({ width, height, amount });
    expect(Life.board.length).toEqual(height);
    expect(Life.board[0].length).toEqual(width);

    const actualAmount = Life.board
      .reduce((acc, cur) => [...acc, ...cur], [])
      .reduce((acc, cur) => (cur === 1 ? acc + 1 : acc), 0);

    expect(actualAmount).toEqual(amount);
  });
});

describe("CreateLife: running prop", () => {
  test("should be false at init", () => {
    const Life = CreateLife({});
    const expected = false;
    const actual = Life.running;
    expect(actual).toEqual(expected);
  });
});

describe("CreateLife: tick method", () => {
  test("should be a method", () => {
    const Life = CreateLife({});
    const expected = "function";
    const actual = typeof Life.tick;
    expect(actual).toEqual(expected);
  });

  test("should update the state of the board once", () => {
    const board = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const width = 3;
    const height = 3;
    const amount = 3;
    let Life = CreateLife({ width, height, amount });
    // override the created board to have a deterministic test
    Life.board = board;
    const expected = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
    Life.tick();
    const actual = Life.board;
    expect(actual).toEqual(expected);
  });
});

describe("CreateLife: stop method", () => {
  const width = 3;
  const height = 3;
  const amount = 3;

  test("should be a method", () => {
    const Life = CreateLife({ width, height, amount });
    const expected = "function";
    const actual = typeof Life.stop;
    expect(actual).toEqual(expected);
  });

  test("should stop the running timer (if the game is already running)", () => {
    const Life = CreateLife({ width, height, amount });
    Life.tick = jest.fn();
    const interval = 300;
    Life.run(interval);
    jest.runTimersToTime(interval * 2);
    Life.stop();
    jest.runTimersToTime(interval * 4);
    expect(Life.tick.mock.calls.length).toBe(2);
    Life.tick.mockReset();
  });

  test("should be a noop if game is not running", () => {
    const Life = CreateLife({ width, height, amount });
    const stateBefore = { ...Life };
    Life.stop();
    const stateAfter = { ...Life };
    expect(stateAfter).toEqual(stateBefore);
  });
});

describe("CreateLife: run method", () => {
  const width = 3;
  const height = 3;
  const amount = 3;

  test("should be a method", () => {
    const Life = CreateLife({ width, height, amount });
    const expected = "function";
    const actual = typeof Life.run;
    expect(actual).toEqual(expected);
  });

  test("if game is not running (init), should call tick at the given interval", () => {
    const Life = CreateLife({ width, height, amount });
    Life.tick = jest.fn();
    const interval = 500;
    Life.run(interval);
    jest.runTimersToTime(interval * 3);
    expect(Life.tick.mock.calls.length).toBe(3);
    Life.tick.mockReset();
  });

  test("should set running to true", () => {
    const Life = CreateLife({ width, height, amount });
    Life.running = false;
    Life.run();
    const expected = true;
    const actual = Life.running;
    expect(actual).toEqual(expected);
  });

  test("should be a noop if game is already running", () => {
    const Life = CreateLife({ width, height, amount });
    Life.run();
    const stateBefore = { ...Life };
    Life.run();
    const stateAfter = { ...Life };
    expect(stateAfter).toEqual(stateBefore);
  });
});

describe("CreateLife: reset method", () => {
  const width = 3;
  const height = 3;
  const amount = 3;

  test("should be a method", () => {
    const Life = CreateLife({ width, height, amount });
    const expected = "function";
    const actual = typeof Life.reset;
    expect(actual).toEqual(expected);
  });

  test("should reset the board to its initial state", () => {
    const Life = CreateLife({ width, height, amount });
    const initialBoard = Life.board.map(line => [...line]);
    Life.tick();
    Life.reset();
    const resetBoard = Life.board.map(line => [...line]);
    expect(resetBoard).toEqual(initialBoard);
  });
});
