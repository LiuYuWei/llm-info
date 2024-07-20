import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaBars, FaChartBar, FaGamepad, FaPuzzlePiece, FaCube, FaCaretDown, FaCaretRight, FaFolder } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import SnakeGamePage from './pages/SnakeGamePage';
import SadukuGamePage from './pages/SadukuGamePage';
import Game2048Page from './pages/Game2048Page';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGamesCollapsed, setIsGamesCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleGames = () => {
    setIsGamesCollapsed(!isGamesCollapsed);
  };

  return (
    <Router>
      <div className={`App ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
            {!isSidebarCollapsed && <h2 className="sidebar-title">LLM 資料</h2>}
          </div>
          <ul>
            <li>
              &nbsp;&nbsp;&nbsp;<Link to="/"><FaHome /><span className="link-text">個人自我介紹</span></Link>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;<Link to="/llm-comparison"><FaChartBar /><span className="link-text">LLM 模型比較表</span></Link>
            </li>
            <li className="submenu" onClick={toggleGames}>
              &nbsp;&nbsp;&nbsp;<FaFolder />
              <span className="link-text">Claude 遊戲</span>
              <span className="submenu-icon">{isGamesCollapsed ? <FaCaretRight /> : <FaCaretDown />}</span>
            </li>
            {!isGamesCollapsed && (
              <ul className="submenu-items">
                <li>
                  &nbsp;&nbsp;&nbsp;<Link to="/snake-game"><FaGamepad /><span className="link-text">AI 生成遊戲-貪食蛇</span></Link>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;<Link to="/saduku-game"><FaPuzzlePiece /><span className="link-text">AI 生成遊戲-Saduku</span></Link>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;<Link to="/game-2048"><FaCube /><span className="link-text">AI 生成遊戲-2048</span></Link>
                </li>
              </ul>
            )}
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
