import { shuffleArray } from '@services/Array';

export interface Cell {
  value: number | '';
}

export class SudokuBoard {
  #board: Cell[][] = [];
  #size = 9;

  get board() {
    return this.#board;
  }

  constructor() {
    this.#generateEmptyTable();
    this.#fillDiagonalSquares();
    this.#fillRemaining(0, 3);
  }

  #generateEmptyTable() {
    for (let row = 0; row < this.#size; row++) {
      this.#board[row] = [];
      for (let column = 0; column < this.#size; column++) {
        this.#board[row].push({ value: 0 });
      }
    }
  }

  #fillDiagonalSquares() {
    for (let row_and_column = 0; row_and_column <= 6; row_and_column += 3) {
      const numbers = shuffleArray(
        Array.from({ length: this.#size }).map((_, ind) => ind + 1)
      );

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.#board[row_and_column + i][row_and_column + j] = {
            value: numbers.shift() as number,
          };
        }
      }
    }
  }

  #fillRemaining(i: number, j: number): boolean {
    // Check if we have reached the end of the matrix
    if (i === 9 - 1 && j === 9) {
      return true;
    }

    // Move to the next row if we have reached the end of the current row
    if (j === 9) {
      i += 1;
      j = 0;
    }

    // Skip cells that are already filled
    if (this.#board[i][j].value !== 0) {
      return this.#fillRemaining(i, j + 1);
    }

    // Try filling the current cell with a valid value
    for (let num = 1; num <= 9; num++) {
      if (this.#checkCell(i, j, num)) {
        this.#board[i][j].value = num;
        if (this.#fillRemaining(i, j + 1)) {
          return true;
        }
        this.#board[i][j].value = 0;
      }
    }
    return false;
  }

  #checkCell(currentRow: number, currentColumn: number, num: number) {
    for (let column = 0; column < 9; column++) {
      if (this.#board[currentRow][column].value === num) {
        return false;
      }
    }

    for (let row = 0; row < 9; row++) {
      if (this.#board[row][currentColumn].value === num) {
        return false;
      }
    }

    if (this.#getSquare(currentRow, currentColumn).includes(num)) {
      return false;
    }

    return true;
  }

  #getSquare(currentRow: number, currentColumn: number) {
    const row = Math.trunc(currentRow / 3) * 3;
    const column = Math.trunc(currentColumn / 3) * 3;

    const result = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result.push(this.#board[i + row][j + column].value);
      }
    }

    return result;
  }

  #isSafe(row: number, col: number, num: number) {
    // Check the row
    for (let i = 0; i < this.#size; i++) {
      if (this.#board[row][i].value === num) return false;
    }

    // Check the column
    for (let i = 0; i < this.#size; i++) {
      if (this.#board[i][col].value === num) return false;
    }

    // Check the 3x3 subgrid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.#board[i + startRow][j + startCol].value === num) return false;
      }
    }

    return true;
  }

  #countSolutions() {
    let solutionCount = 0;

    const solve = () => {
      for (let row = 0; row < this.#size; row++) {
        for (let col = 0; col < this.#size; col++) {
          // Find an empty cell
          if (this.#board[row][col].value === '') {
            for (let num = 1; num <= 9; num++) {
              // Try placing each number in the cell
              if (this.#isSafe(row, col, num)) {
                this.#board[row][col].value = num;

                // Recursively try to solve the rest of the this.#board
                if (solve()) {
                  // If a solution is found, increment the count
                  solutionCount++;
                  if (solutionCount > 1) return false; // If more than one solution, stop
                }

                // Backtrack
                this.#board[row][col].value = '';
              }
            }
            // If no number can be placed in this cell, backtrack
            return false;
          }
        }
      }
      // If all cells are filled, the Sudoku is solved
      return true;
    };

    solve();
    return solutionCount;
  }

  removeDigits(n: number) {
    let removedCount = 0;

    while (removedCount <= n) {
      const row = Math.floor(Math.random() * this.#size);
      const col = Math.floor(Math.random() * this.#size);

      if (this.#board[row][col].value !== 0) {
        const removedNumber = this.#board[row][col].value;
        this.#board[row][col].value = '';

        // Check the number of solutions with the number removed
        if (this.#countSolutions() !== 1) {
          // If removing the number leads to multiple solutions, revert the change
          this.#board[row][col].value = removedNumber;
          removedCount--;
        } else {
          removedCount++;
        }
      }
    }

    return this.#board;
  }
}
