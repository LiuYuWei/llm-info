import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaTable } from 'react-icons/fa';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <h2>Simon Liu - LLM 資料</h2>
          <ul>
            <li>
              <Link to="/"><FaHome /> 首頁</Link>
            </li>
            <li>
              <Link to="/comparison"><FaTable /> LLM 模型比較表</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
