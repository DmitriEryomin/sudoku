import { createBem } from '@mukhindev/create-bem';

import { useGameStore } from '@game/store/GameStore';

import './NumbersPanel.css';

const numbersPanelBem = createBem('numbers-panel');

export const NumbersPanel = () => {
  const fillValue = useGameStore(state => state.fillValue);
  const numbers = useGameStore(state => state.numbersMap);

  return (
    <div className={numbersPanelBem()}>
      {Object.entries(numbers).map(([key, value]) => (
        <span
          onClick={() => fillValue(parseInt(key))}
          className={numbersPanelBem('item', [value === 9 && 'hidden'])}
          key={key}
        >
          {key}
        </span>
      ))}
    </div>
  );
};
