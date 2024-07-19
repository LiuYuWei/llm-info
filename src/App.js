import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaTable } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import SnakeGamePage from './pages/SnakeGamePage';
import SadukuGamePage from './pages/SadukuGamePage';
import Game2048Page from './pages/Game2048Page';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <h2>LLM 資料</h2>
          <ul>
            <li>
              <Link to="/"><FaHome /> 個人自我介紹</Link>
            </li>
            <li>
              <Link to="/llm-comparison"><FaTable /> LLM 模型比較表</Link>
            </li>
            <li>
              <Link to="/snake-game"><FaTable /> AI 生成遊戲-貪食蛇</Link>
            </li>
            <li>
              <Link to="/saduku-game"><FaTable /> AI 生成遊戲-Saduku</Link>
            </li>
            <li>
              <Link to="/game-2048"><FaTable /> AI 生成遊戲-2048</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/llm-comparison" element={<ComparisonPage />} />
            <Route path="/snake-game" element={<SnakeGamePage />} />
            <Route path="/saduku-game" element={<SadukuGamePage />} />
            <Route path="/game-2048" element={<Game2048Page />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
