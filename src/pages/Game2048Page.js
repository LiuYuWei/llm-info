import React from 'react';
import Game2048 from '../components/Game2048';
import '../styles/muji-styles.css'; // 確保路徑正確

function Game2048Page() {
  return (
    <div>
      <h2 className="muji-h2">Claude Artifact 生成遊戲 - 2048</h2>
      <Game2048 />
    </div>
  );
}

export default Game2048Page;
