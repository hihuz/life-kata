import {
  countLiveNeighbors,
  getNextCellState,
  getCurCellState,
  getNeighborsCoords
} from "../index";

describe("countLiveNeighbors", () => {
  test("should be a function", () => {
    const expected = "function";
    const actual = typeof countLiveNeighbors;
    expect(actual).toEqual(expected);
  });

  test("should count the number of 1s in the passed array", () => {
    const array = [1, 0, 1, 0, 0, 0, 1, 0, 0];
    const expected = 3;
    const actual = countLiveNeighbors(array);
    expect(actual).toEqual(expected);
  });
});

describe("getNextCellState", () => {
  test("should be a function", () => {
    const expected = "function";
    const actual = typeof getNextCellState;
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is dead and passed count is 3", () => {
    const liveNeighbors = 3;
    const cell = { state: 0 };
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed cell is dead and passed count isn't 3", () => {
    const liveNeighbors = 2;
    const cell = { state: 0 };
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed count is > 3", () => {
    const liveNeighbors = 4;
    const cell = { state: 1 };
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is alive and passed count is 2", () => {
    const liveNeighbors = 2;
    const cell = { state: 1 };
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 1 if passed cell is alive and passed count is 3", () => {
    const liveNeighbors = 3;
    const cell = { state: 1 };
    const expected = 1;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed cell is dead and passed count is 2", () => {
    const liveNeighbors = 2;
    const cell = { state: 0 };
    const expected = 0;
    const actual = getNextCellState({ cell, liveNeighbors });
    expect(actual).toEqual(expected);
  });

  test("should return 0 if passed count is less than 2", () => {
    const liveNeighbors = 1;
    const cell = { state: "boo" };
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

  test("should return 0 if coordinates are outside the board", () => {
    const x = 4;
    const y = 1;
    const expected = 0;
    const actual = getCurCellState({ board, x, y });
    expect(actual).toEqual(expected);
  });
});

describe("getNeighborsCoords", () => {
  const board = [[1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 1, 0], [1, 0, 0, 1]];

  test("should take a board and x/y coordinates and return an array of length 8", () => {
    const x = 2;
    const y = 2;
    const expected = 8;
    const actual = getNeighborsCoords({ board, x, y }).length;
    expect(actual).toEqual(expected);
  });

  test("should take a board and x/y coordinates and return an array of coordinates", () => {
    const x = 2;
    const y = 2;
    const expected = { xCount: 8, yCount: 8 };
    const actual = getNeighborsCoords({ board, x, y }).reduce(
      (acc, cur) => ({
        xCount: cur.hasOwnProperty("x") ? acc.xCount + 1 : acc.xCount,
        yCount: cur.hasOwnProperty("y") ? acc.yCount + 1 : acc.yCount
      }),
      { xCount: 0, yCount: 0 }
    );
    expect(actual).toEqual(expected);
  });
});
