import React from 'react';
import SnakeGame from '../components/SnakeGame';
import '../styles/muji-styles.css'; // 確保路徑正確

function HomePage() {
  return (
    <div>
      <h2 className="muji-h2">Claude Artifact 生成遊戲 - 貪食蛇</h2>
      <SnakeGame />
    </div>
  );
}

export default HomePage;
