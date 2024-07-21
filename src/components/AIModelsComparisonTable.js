import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import './AIModelsComparisonTable.css';

export default function AIModelsComparisonTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSourceFilter, setOpenSourceFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/LLM_model_comparison.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        console.log("Parsed CSV data:", results.data);
        setData(results.data);
      } catch (error) {
        console.error("Failed to load CSV file", error);
      }
    };
  
    fetchData();
  }, []);  

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig, data]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      const nameMatch = item['LLM Model Name']?.toLowerCase().includes(searchTerm.toLowerCase());
      const openSourceMatch = 
        openSourceFilter === 'all' || 
        (openSourceFilter === 'open' && item['Open Source / Close Source'] === 'Open Source') ||
        (openSourceFilter === 'close' && item['Open Source / Close Source'] === 'Close Source');
      return nameMatch && openSourceMatch;
    });
  }, [sortedData, searchTerm, openSourceFilter]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="mujiStyle">
      <h1 className="titleStyle">AI LLM Model 評估比較表</h1>
      
      <div className="headerContainerStyle">
        <p className="authorStyle">Made by Simon Liu 2024.07</p>
        <div className="searchContainerStyle">
          <input
            type="text"
            placeholder="搜尋模型名稱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="inputStyle"
          />
          <select
            value={openSourceFilter}
            onChange={(e) => setOpenSourceFilter(e.target.value)}
            className="selectStyle"
          >
            <option value="all">全部</option>
            <option value="open">開源</option>
            <option value="close">閉源</option>
          </select>
        </div>
      </div>
      
      <div className="tableContainerStyle">
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="thStyle" onClick={() => requestSort('LLM Model Name')}>
                模型名稱{getSortIndicator('LLM Model Name')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Open Source / Close Source')}>
                開源/閉源{getSortIndicator('Open Source / Close Source')}
              </th>
              <th className="thStyle" onClick={() => requestSort('MMLU \n (5-shot)')}>
                MMLU (5-shot){getSortIndicator('MMLU \n (5-shot)')}
              </th>
              <th className="thStyle" onClick={() => requestSort('GPQA \n (0-shot)')}>
                GPQA (0-shot){getSortIndicator('GPQA \n (0-shot)')}
              </th>
              <th className="thStyle" onClick={() => requestSort('HumanEval \n (0-shot)')}>
                HumanEval (0-shot){getSortIndicator('HumanEval \n (0-shot)')}
              </th>
              <th className="thStyle" onClick={() => requestSort('GSM-8K \n (8-shot, CoT)')}>
                GSM-8K (8-shot, CoT){getSortIndicator('GSM-8K \n (8-shot, CoT)')}
              </th>
              <th className="thStyle" onClick={() => requestSort('MATH \n (4-shot, CoT)')}>
                MATH (4-shot, CoT){getSortIndicator('MATH \n (4-shot, CoT)')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="tdStyle" style={{ fontWeight: 'bold' }}>{item['LLM Model Name']}</td>
                <td className="tdStyle">{item['Open Source / Close Source']}</td>
                <td className="tdStyle">{item['MMLU \n (5-shot)']}</td>
                <td className="tdStyle">{item['GPQA \n (0-shot)']}</td>
                <td className="tdStyle">{item['HumanEval \n (0-shot)']}</td>
                <td className="tdStyle">{item['GSM-8K \n (8-shot, CoT)']}</td>
                <td className="tdStyle">{item['MATH \n (4-shot, CoT)']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="referenceStyle">
        <p>Reference：</p>
        <ul>
          <li>Llama benchmark: <a href="https://llama.meta.com/llama3/">https://llama.meta.com/llama3/</a></li>
          <li>Anthropic Claude 3 benchmark: <a href="https://www.anthropic.com/news/claude-3-family">https://www.anthropic.com/news/claude-3-family</a></li>
          <li>Introducing Meta Llama 3: <a href="https://ai.meta.com/blog/meta-llama-3/">https://ai.meta.com/blog/meta-llama-3/</a></li>
        </ul>
      </div>
    </div>
  );
}