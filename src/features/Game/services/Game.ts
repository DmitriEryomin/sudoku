import { Cell, SudokuBoard } from '../entities/SudokuBoard';

export interface UICell extends Cell {
  isGenerated: boolean;
  isWrong: boolean;
}

export const Game = new (class {
  boardSize = 9;
  #filledBoard: Cell[][] = [];
  new(level: 'ease' | 'medium' | 'hard'): UICell[][] {
    const sudokuBoard = new SudokuBoard();

    const [puzzle, solvedPuzzle] = sudokuBoard.generatePuzzle(level);
    this.#filledBoard = solvedPuzzle;

    return puzzle.map((row) =>
      row.map(({ value }) => ({
        value,
        isGenerated: !!value,
        isWrong: false,
      }))
    );
  }
  check(i: number, j: number, value: number) {
    return this.#filledBoard[i][j].value === value;
  }
})();
