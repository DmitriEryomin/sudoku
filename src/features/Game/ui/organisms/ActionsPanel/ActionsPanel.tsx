import { BsEraserFill } from 'react-icons/bs';
import { createBem } from '@mukhindev/create-bem';

const actionsPanelBem = createBem('actions-panel');

import './ActionsPanel.css';
import { useGameStore } from '@game/store/GameStore';

export const ActionsPanel = () => {
  const removeValue = useGameStore(state => state.removeValue);

  return (
    <div className={actionsPanelBem()}>
      <button className={actionsPanelBem('erase')} onClick={removeValue}>
        <BsEraserFill size={32} />
        <div className={actionsPanelBem('erase-label')}>Erase</div>
      </button>
    </div>
  );
};
