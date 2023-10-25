import './App.css';

import { GameBoard, NumbersPanel, GamePanel, ActionsPanel, GameOverModal } from '@game/ui';
import { createPortal } from 'react-dom';

function App() {

  return (
    <>
      <GamePanel />
      <GameBoard />
      <NumbersPanel />
      <ActionsPanel />
      {createPortal(<GameOverModal />, document.body)}
    </>
  );
}

export default App;
