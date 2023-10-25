import { useMemo } from "react";
import { createBem } from "@mukhindev/create-bem";

import { useGameStore } from "@game/store/GameStore";

import './GameOverModal.css';

const gameOverModalBem = createBem('game-over-modal');

export const GameOverModal = () => {
  const numbersMap = useGameStore(state => state.numbersMap)
  const level = useGameStore(state => state.level);
  const newGame = useGameStore(state => state.new);

  const isGameOver = useMemo(() => Object.values(numbersMap).every(numbers => numbers === 9), [numbersMap])

  if (!isGameOver) {
    return null;
  }

  return (
    <div className={gameOverModalBem('container')}>
      <div className={gameOverModalBem('content')}>
        <h2>Congratulations!</h2>
        <p>You solve {level} level puzzle!</p>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  );
};
