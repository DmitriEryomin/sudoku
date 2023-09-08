import './App.css';

import { GameBoard, NumbersPanel, GamePanel } from '@game/ui';

function App() {
  return (
    <>
      <GamePanel />
      <GameBoard />
      <NumbersPanel />
    </>
  );
}

export default App;
