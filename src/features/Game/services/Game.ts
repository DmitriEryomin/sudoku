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
        digitsCount = 50;
        break;
      case 'medium':
        digitsCount = 65;
        break;
      case 'hard':
        digitsCount = 75;
        break;
    }

    return sudokuBoard
      .removeDigits(digitsCount)
      .map((row) => row.map(({ value }) => ({ value, isGenerated: !!value, isWrong: false })));
  }
  check(i: number, j: number, value: number) {
    return this.#filledBoard[i][j].value === value;
  }
})();
