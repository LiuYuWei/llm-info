import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
              <Link to="/" onClick={() => isMobile && toggleSidebar()}><FaHome /><span className="link-text">個人自我介紹</span></Link>
            </li>
            <li>
              <Link to="/llm-comparison" onClick={() => isMobile && toggleSidebar()}><FaChartBar /><span className="link-text">LLM 模型比較表</span></Link>
            </li>
            <li>
              <Link to="/zhtw-llm-comparison" onClick={() => isMobile && toggleSidebar()}><FaChartBar /><span className="link-text">繁中 LLM 模型比較表</span></Link>
            </li>
            <li className="submenu" onClick={toggleGames}>
              <FaFolder />
              <span className="link-text">Claude 遊戲</span>
              <span className="submenu-icon">{isGamesCollapsed ? <FaCaretRight /> : <FaCaretDown />}</span>
            </li>
            {!isGamesCollapsed && (
              <ul className="submenu-items">
                <li>
                  <Link to="/snake-game" onClick={() => isMobile && toggleSidebar()}><FaGamepad /><span className="link-text">AI 生成遊戲-貪食蛇</span></Link>
                </li>
                <li>
                  <Link to="/saduku-game" onClick={() => isMobile && toggleSidebar()}><FaPuzzlePiece /><span className="link-text">AI 生成遊戲-Saduku</span></Link>
                </li>
                <li>
                  <Link to="/game-2048" onClick={() => isMobile && toggleSidebar()}><FaCube /><span className="link-text">AI 生成遊戲-2048</span></Link>
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
            <Route path="/" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - 個人自我介紹</title>
                </Helmet>
                <HomePage />
              </>
            } />
            <Route path="/llm-comparison" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - LLM 模型比較表</title>
                </Helmet>
                <ComparisonPage />
              </>
            } />
            <Route path="/zhtw-llm-comparison" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - 繁中 LLM 模型比較表</title>
                </Helmet>
                <ZhtwComparisonPage />
              </>
            } />
            <Route path="/snake-game" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - AI 生成遊戲-貪食蛇</title>
                </Helmet>
                <SnakeGamePage />
              </>
            } />
            <Route path="/saduku-game" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - AI 生成遊戲-Saduku</title>
                </Helmet>
                <SadukuGamePage />
              </>
            } />
            <Route path="/game-2048" element={
              <>
                <Helmet>
                  <title>LLM Info - Simon Liu - AI 生成遊戲-2048</title>
                </Helmet>
                <Game2048Page />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;