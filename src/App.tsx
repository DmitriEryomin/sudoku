import './App.css';

import { GameBoard, NumbersPanel, GamePanel, ActionsPanel } from '@game/ui';

function App() {
  return (
    <>
      <GamePanel />
      <GameBoard />
      <NumbersPanel />
      <ActionsPanel />
    </>
  );
}

export default App;
