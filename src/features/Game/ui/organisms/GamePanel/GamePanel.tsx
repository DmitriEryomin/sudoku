import { ChangeEvent } from 'react';
import { createBem } from '@mukhindev/create-bem';

import { useGameStore } from '@game/store/GameStore';

import './GamePanel.css';

const gamePanel = createBem('game-panel');

export const GamePanel = () => {
  const newGame = useGameStore((state) => state.new);
  const selectLevel = useGameStore((state) => state.selectLevel);
  const level = useGameStore((state) => state.level);
  const setAnimation = useGameStore((state) => state.setAnimation);

  const startNewGame = () => {
    setAnimation(true);
    setTimeout(() => {
      newGame();
      setAnimation(false);
    }, 270);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLFieldSetElement>) => {
    const value = target.value as 'ease' | 'hard' | 'medium';

    selectLevel(value);
    startNewGame();
  };

  return (
    <div className={gamePanel()}>
      <button onClick={startNewGame}>New Game</button>
      <fieldset onChange={handleChange} className={gamePanel('level-select')}>
        <label htmlFor="ease">
          Ease
          <input name="level" id="ease" type="radio" value="ease" checked={level === 'ease'} />
        </label>
        <label htmlFor="medium">
          Medium
          <input name="level" id="medium" type="radio" value="medium" checked={level === 'medium'}  />
        </label>
        <label htmlFor="hard">
          Hard
          <input name="level" id="hard" type="radio" value="hard" checked={level === 'hard'}  />
        </label>
      </fieldset>
    </div>
  );
};
