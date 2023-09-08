import { useEffect } from 'react';
import { createBem } from '@mukhindev/create-bem';
import { useSpring, animated } from '@react-spring/web';

import { useGameStore } from '@game/store/GameStore';

import './GameBoard.css';

const boardBem = createBem('game-board');

export const GameBoard = () => {
  const selectCell = useGameStore((state) => state.selectCell);
  const selectedCell = useGameStore((state) => state.selectedCell);
  const newGame = useGameStore((state) => state.new);
  const animation = useGameStore((state) => state.animation);
  const board = useGameStore((state) => state.board);

  const [props, api] = useSpring(
    () => ({
      from: {
        scale: 1,
        opacity: 1,
      },
    }),
    []
  );

  useEffect(() => {
    if (!animation) {
      return;
    }
    api.start({
      from: {
        scale: 1,
        opacity: 1,
      },
      to: {
        scale: 0,
        opacity: 0,
      },
      config: {
        duration: 270,
      },
      onResolve: () => {
        api.start({
          from: {
            opacity: 0,
            scale: 0,
          },
          to: {
            scale: 1,
            opacity: 1,
          },
        });
      },
    });
  }, [animation, api]);

  useEffect(() => {
    newGame();
  }, [newGame]);

  console.log(board);
  

  return (
    <div className={boardBem()}>
      {board === null
        ? 'Loading'
        : board.map((cell, row) => (
            <div
              key={`row-${row}`}
              className={boardBem('row')}
              style={{ margin: '0', display: 'flex' }}
            >
              {cell.map(({ value, isGenerated, isWrong }, column) => (
                <div
                  onClick={() =>
                    isGenerated ? void 0 : selectCell(row, column)
                  }
                  className={boardBem('cell', [
                    isWrong ? 'wrong' : '',
                    isGenerated ? 'generated' : '',
                    selectedCell.i === row && selectedCell.j === column
                      ? 'selected'
                      : '',
                  ])}
                  key={`col-${column}`}
                >
                  <animated.div style={props}>{value}</animated.div>
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};
