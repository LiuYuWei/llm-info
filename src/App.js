import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaBars, FaChartBar, FaGamepad, FaPuzzlePiece, FaCube, FaCaretDown, FaCaretRight, FaFolder } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import ZhtwComparisonPage from './pages/ZhtwComparisonPage';
import SnakeGamePage from './pages/SnakeGamePage';
import SadukuGamePage from './pages/SadukuGamePage';
import Game2048Page from './pages/Game2048Page';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGamesCollapsed, setIsGamesCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleGames = () => {
    setIsGamesCollapsed(!isGamesCollapsed);
  };

  return (
    <Router>
      <div className={`App ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className={`sidebar ${isMobile && isSidebarCollapsed ? 'hidden' : ''}`}>
          <div className="sidebar-header">
            <button className="toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h2 className="sidebar-title">LLM 資料</h2>
          </div>
          <ul>
            <li>
              &nbsp;&nbsp;<Link to="/" onClick={() => isMobile && toggleSidebar()}><FaHome /><span className="link-text">個人自我介紹</span></Link>
            </li>
            <li>
              &nbsp;&nbsp;<Link to="/llm-comparison" onClick={() => isMobile && toggleSidebar()}><FaChartBar /><span className="link-text">LLM 模型比較表</span></Link>
            </li>
            <li>
              &nbsp;&nbsp;<Link to="/zhtw-llm-comparison" onClick={() => isMobile && toggleSidebar()}><FaChartBar /><span className="link-text">繁中 LLM 模型比較表</span></Link>
            </li>
            <li className="submenu" onClick={toggleGames}>
              &nbsp;&nbsp;<FaFolder />
              <span className="link-text">Claude 遊戲</span>
              <span className="submenu-icon">{isGamesCollapsed ? <FaCaretRight /> : <FaCaretDown />}</span>
            </li>
            {!isGamesCollapsed && (
              <ul className="submenu-items">
                <li>
                  &nbsp;&nbsp;<Link to="/snake-game" onClick={() => isMobile && toggleSidebar()}><FaGamepad /><span className="link-text">AI 生成遊戲-貪食蛇</span></Link>
                </li>
                <li>
                  &nbsp;&nbsp;<Link to="/saduku-game" onClick={() => isMobile && toggleSidebar()}><FaPuzzlePiece /><span className="link-text">AI 生成遊戲-Saduku</span></Link>
                </li>
                <li>
                  &nbsp;&nbsp;<Link to="/game-2048" onClick={() => isMobile && toggleSidebar()}><FaCube /><span className="link-text">AI 生成遊戲-2048</span></Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
        <div className="content">
          {isMobile && (
            <button className="mobile-menu-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/llm-comparison" element={<ComparisonPage />} />
            <Route path="/zhtw-llm-comparison" element={<ZhtwComparisonPage />} />
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
