import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import './AIModelsComparisonTable.css';

export default function ZhTWAIModelsComparisonTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSourceFilter, setOpenSourceFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/zh_tw_llm_model_comparison.csv');
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
      const nameMatch = item['Model Name']?.toLowerCase().includes(searchTerm.toLowerCase());
      const openSourceMatch = 
        openSourceFilter === 'all' || 
        (openSourceFilter === 'llama 2' && item['Original Architecture'] === 'Llama 2') ||
        (openSourceFilter === 'llama 3' && item['Original Architecture'] === 'Llama 3') ||
        (openSourceFilter === 'Mistral-8x7B' && item['Original Architecture'] === 'Mistral-8x7B');
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
      <h1 className="titleStyle">繁體中文 LLM Model 評估比較表</h1>
      
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
            <option value="all">全部架構</option>
            <option value="llama 2">Llama 2</option>
            <option value="llama 3">Llama 3</option>
            <option value="Mistral-8x7B">Mistral-8x7B</option>
          </select>
        </div>
      </div>
      
      <div className="tableContainerStyle">
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="thStyle" onClick={() => requestSort('Model Name')}>
                模型名稱{getSortIndicator('Model Name')}
              </th>
              <th className="thStyle" onClick={() => requestSort('開源單位')}>
                開源單位{getSortIndicator('開源單位')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Original Architecture')}>
                原始模型架構{getSortIndicator('Original Architecture')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Size')}>
                模型大小{getSortIndicator('Size')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Max Context Window')}>
                最大輸入長度{getSortIndicator('Max Context Window')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Function Calling')}>
                Function Calling{getSortIndicator('Function Calling')}
              </th>
              <th className="thStyle" onClick={() => requestSort('TMLU')}>
                TMLU{getSortIndicator('TMLU')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Taiwan Truthful QA Evaluation')}>
                Taiwan Truthful QA Evaluation{getSortIndicator('Taiwan Truthful QA Evaluation')}
              </th>
              <th className="thStyle" onClick={() => requestSort('Legal Eval')}>
                Legal Eval{getSortIndicator('Legal Eval')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="tdStyle" style={{ fontWeight: 'bold' }}>{item['Model Name']}</td>
                <td className="tdStyle">{item['開源單位']}</td>
                <td className="tdStyle">{item['Original Architecture']}</td>
                <td className="tdStyle">{item['Size']}</td>
                <td className="tdStyle">{item['Max Context Window']}</td>
                <td className="tdStyle">{item['Function Calling']}</td>
                <td className="tdStyle">{item['TMLU']}</td>
                <td className="tdStyle">{item['Taiwan Truthful QA Evaluation']}</td>
                <td className="tdStyle">{item['Legal Eval']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="referenceStyle">
        <p>Reference：</p>
        <ul>
          <li>Yen-Ting Lin: <a href="https://huggingface.co/yentinglin">https://huggingface.co/yentinglin</a></li>
          <li>MediaTek Research: <a href="https://huggingface.co/MediaTek-Research">https://huggingface.co/MediaTek-Research</a></li>
          <li>TAIDE: <a href="https://huggingface.co/taide">https://huggingface.co/taide</a></li>
          <li>INX-TEXT: <a href="https://huggingface.co/INX-TEXT">https://huggingface.co/INX-TEXT</a></li>
        </ul>
      </div>
    </div>
  );
}
