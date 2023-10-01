import { create } from 'zustand';

import { Game, UICell } from '@game/services/Game';

export type BoardNumbers = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
};

const initialNumbersMap: BoardNumbers = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

type GameStore = {
  board: UICell[][] | null;
  selectedCell: {
    i: number;
    j: number;
  };
  level: 'ease' | 'medium' | 'hard';
  animation: boolean;
  numbersMap: BoardNumbers;
  new: () => void;
  setAnimation: (animation: boolean) => void;
  selectCell: (i: number, j: number) => void;
  fillValue: (value: number) => void;
  removeValue: () => void;
  initNumbersMap: () => void;
  selectLevel: (level: 'ease' | 'medium' | 'hard') => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  board: null,
  level: 'ease',
  animation: false,
  selectedCell: {
    i: NaN,
    j: NaN,
  },
  numbersMap: initialNumbersMap,
  new: () => {
    set({
      board: Game.new(get().level),
      selectedCell: {
        i: NaN,
        j: NaN,
      },
      numbersMap: initialNumbersMap,
    });
    get().initNumbersMap();
  },
  selectCell: (i, j) => {
    set({
      selectedCell: { i, j },
    });
  },
  fillValue: (value) => {
    const { board, selectedCell, numbersMap } = get();
    const clonedBoard = structuredClone(board) as UICell[][];
    const { i, j } = selectedCell;
    if (isNaN(i) || isNaN(j)) {
      return;
    }
  
    if (clonedBoard[i][j].value !== '' && !clonedBoard[i][j].isWrong) {
      return;
    }

    clonedBoard[i][j].value = value;
    const isWrong = !Game.check(i, j, value);
    clonedBoard[i][j].isWrong = isWrong;
    set({ board: clonedBoard });

    if (!isWrong) {
      set({
        numbersMap: {
          ...numbersMap,
          [value]: numbersMap[value as keyof BoardNumbers] + 1,
        },
      });
    }
  },
  removeValue: () => {
    const { selectedCell, board } = get();
    const { i, j } = selectedCell;
    if (isNaN(i) || isNaN(j)) {
      return;
    }

    const clonedBoard = structuredClone(board) as UICell[][];
    if (clonedBoard[i][j].isWrong) {
      clonedBoard[i][j].value = '';
    }

    set({ board: clonedBoard });
  },
  initNumbersMap: () => {
    const { board, numbersMap } = get();
    const mutableNumbersMap = { ...numbersMap };
    if (!board) {
      return;
    }
    for (let i = 0; i < Game.boardSize; i++) {
      for (let j = 0; j < Game.boardSize; j++) {
        if (board[i][j].value === '') {
          continue;
        }
        const value = board[i][j].value as keyof BoardNumbers;
        mutableNumbersMap[value] = mutableNumbersMap[value] + 1;
      }
    }
    set({
      numbersMap: mutableNumbersMap,
    });
  },
  setAnimation: (animation: boolean) => {
    set({
      animation,
    });
  },
  selectLevel: (level: 'ease' | 'medium' | 'hard') => {
    set({
      level,
    });
  },
}));
