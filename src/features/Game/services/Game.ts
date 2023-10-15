import { randomNumber } from '@services/Number';

import { Cell, SudokuBoard } from '../entities/SudokuBoard';

export interface UICell extends Cell {
  isGenerated: boolean;
  isWrong: boolean;
}

export const Game = new (class {
  boardSize = 9;
  #filledBoard: Cell[][] = [];
  #board: Cell[][] = [];
  get board() {
    return this.#board;
  }
  new(level: 'ease' | 'medium' | 'hard'): UICell[][] {
    const sudokuBoard = new SudokuBoard();
    this.#filledBoard = structuredClone(sudokuBoard.board);

    let digitsCount: number;
    switch (level) {
      case 'ease':
        digitsCount = randomNumber(36, 45);
        break;
      case 'medium':
        digitsCount = randomNumber(46, 55);
        break;
      case 'hard':
        digitsCount = randomNumber(56, 60);
        break;
    }

    return sudokuBoard
      .removeDigits(digitsCount, level)
      .map((row) => row.map(({ value }) => ({ value, isGenerated: !!value, isWrong: false })));
  }
  check(i: number, j: number, value: number) {
    return this.#filledBoard[i][j].value === value;
  }
})();
