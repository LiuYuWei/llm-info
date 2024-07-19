import React from 'react';
import SadukuGame from '../components/SadukuGame';
import '../styles/muji-styles.css'; // 確保路徑正確

function SadukuGamePage() {
  return (
    <div>
      <h2 className="muji-h2">Claude Artifact 生成遊戲 - Saduku</h2>
      <SadukuGame />
    </div>
  );
}

export default SadukuGamePage;
