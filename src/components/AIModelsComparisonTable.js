import React, { useState, useMemo } from 'react';

const data = [
  {
    "name": "Meta Llama 3 8B",
    "openSource": "開源",
    "mmlu": "68.4",
    "gpqa": "34.2",
    "humanEval": "62.2",
    "gsm8k": "79.6",
    "math": "30.0"
  },
  {
    "name": "Meta Llama 3 70B",
    "openSource": "開源",
    "mmlu": "82.0",
    "gpqa": "39.5",
    "humanEval": "81.7",
    "gsm8k": "93.0",
    "math": "50.4"
  },
  {
    "name": "Meta Llama 3 400B+",
    "openSource": "-",
    "mmlu": "86.1",
    "gpqa": "48.0",
    "humanEval": "84.1",
    "gsm8k": "94.1",
    "math": "57.8"
  },
  {
    "name": "Meta Llama 2 7B",
    "openSource": "開源",
    "mmlu": "34.1",
    "gpqa": "21.7",
    "humanEval": "7.9",
    "gsm8k": "25.7",
    "math": "3.8"
  },
  {
    "name": "Meta Llama 2 70B",
    "openSource": "開源",
    "mmlu": "52.9",
    "gpqa": "21.0",
    "humanEval": "25.6",
    "gsm8k": "57.5",
    "math": "11.6"
  },
  {
    "name": "Anthropic Claude 3 Opus",
    "openSource": "閉源",
    "mmlu": "86.8",
    "gpqa": "50.4 (0-shot CoT)",
    "humanEval": "84.9",
    "gsm8k": "95.0",
    "math": "60.1 (0-shot CoT)"
  },
  {
    "name": "Anthropic Claude 3 Sonnet",
    "openSource": "閉源",
    "mmlu": "79.0",
    "gpqa": "40.4 (0-shot CoT)",
    "humanEval": "73.0",
    "gsm8k": "92.3",
    "math": "43.1 (0-shot CoT)"
  },
  {
    "name": "Anthropic Claude 3 Haiku",
    "openSource": "閉源",
    "mmlu": "75.2",
    "gpqa": "33.3 (0-shot CoT)",
    "humanEval": "75.9",
    "gsm8k": "88.9",
    "math": "38.9 (0-shot CoT)"
  },
  {
    "name": "OpenAI GPT-4",
    "openSource": "閉源",
    "mmlu": "86.4",
    "gpqa": "35.7 (0-shot CoT)",
    "humanEval": "67.0",
    "gsm8k": "92.0 (5-shot CoT)",
    "math": "52.9"
  },
  {
    "name": "OpenAI GPT-3.5",
    "openSource": "閉源",
    "mmlu": "70.0",
    "gpqa": "28.1 (0-shot CoT)",
    "humanEval": "48.1",
    "gsm8k": "57.1 (5-shot)",
    "math": "34.1"
  },
  {
    "name": "Google Gemma 7B-it",
    "openSource": "開源",
    "mmlu": "53.3",
    "gpqa": "21.4",
    "humanEval": "30.5",
    "gsm8k": "30.6",
    "math": "12.2"
  },
  {
    "name": "Google Gemini 1.0 Ultra",
    "openSource": "閉源",
    "mmlu": "83.7",
    "gpqa": "-",
    "humanEval": "74.4",
    "gsm8k": "94.4 (Maj1@32)",
    "math": "53.2"
  },
  {
    "name": "Google Gemini 1.0 Pro",
    "openSource": "閉源",
    "mmlu": "71.8",
    "gpqa": "-",
    "humanEval": "67.7",
    "gsm8k": "86.5 (Maj1@32)",
    "math": "32.6"
  },
  {
    "name": "Google Gemini 1.5 Pro",
    "openSource": "閉源",
    "mmlu": "81.9",
    "gpqa": "41.5 (0-shot CoT)",
    "humanEval": "71.9",
    "gsm8k": "91.7",
    "math": "58.5"
  },
  {
    "name": "MistralAI Mistral 7B Instruct",
    "openSource": "開源",
    "mmlu": "58.4",
    "gpqa": "26.3",
    "humanEval": "36.6",
    "gsm8k": "39.9",
    "math": "11.0"
  },
  {
    "name": "MistralAI Mistral large",
    "openSource": "閉源",
    "mmlu": "81.2",
    "gpqa": "-",
    "humanEval": "45.1",
    "gsm8k": "-",
    "math": "-"
  }
];
export default function AIModelsComparisonTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSourceFilter, setOpenSourceFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
  }, [sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const openSourceMatch = 
        openSourceFilter === 'all' || 
        (openSourceFilter === 'open' && item.openSource === '開源') ||
        (openSourceFilter === 'close' && item.openSource === '閉源');
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

  const mujiStyle = {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    color: '#333',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'normal',
    marginBottom: '20px',
    letterSpacing: '1px',
    textAlign: 'center',
  };

  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const authorStyle = {
    fontSize: '14px',
    color: '#666',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const inputStyle = {
    width: '200px',
    padding: '8px 15px',
    border: '2px solid #ddd',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
  };

  const selectStyle = {
    padding: '8px 15px',
    border: '2px solid #ddd',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 1px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const thStyle = {
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: '14px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  };

  const tdStyle = {
    padding: '15px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  };

  const referenceStyle = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div style={mujiStyle}>
      <h1 style={titleStyle}>AI LLM Model 評估比較表</h1>
      
      <div style={headerContainerStyle}>
        <p style={authorStyle}>Made by Simon Liu 2024.07</p>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="搜尋模型名稱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
          <select
            value={openSourceFilter}
            onChange={(e) => setOpenSourceFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="all">全部</option>
            <option value="open">開源</option>
            <option value="close">閉源</option>
          </select>
        </div>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => requestSort('name')}>
              模型名稱{getSortIndicator('name')}
            </th>
            <th style={thStyle} onClick={() => requestSort('openSource')}>
              開源/閉源{getSortIndicator('openSource')}
            </th>
            <th style={thStyle} onClick={() => requestSort('mmlu')}>
              MMLU (5-shot){getSortIndicator('mmlu')}
            </th>
            <th style={thStyle} onClick={() => requestSort('gpqa')}>
              GPQA (0-shot){getSortIndicator('gpqa')}
            </th>
            <th style={thStyle} onClick={() => requestSort('humanEval')}>
              HumanEval (0-shot){getSortIndicator('humanEval')}
            </th>
            <th style={thStyle} onClick={() => requestSort('gsm8k')}>
              GSM-8K (8-shot, CoT){getSortIndicator('gsm8k')}
            </th>
            <th style={thStyle} onClick={() => requestSort('math')}>
              MATH (4-shot, CoT){getSortIndicator('math')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td style={{...tdStyle, fontWeight: 'bold'}}>{item.name}</td>
              <td style={tdStyle}>{item.openSource}</td>
              <td style={tdStyle}>{!isNaN(parseFloat(item.mmlu)) ? parseFloat(item.mmlu).toFixed(1) : '-'}</td>
              <td style={tdStyle}>{!isNaN(parseFloat(item.gpqa)) ? parseFloat(item.gpqa).toFixed(1) : '-'}</td>
              <td style={tdStyle}>{!isNaN(parseFloat(item.humanEval)) ? parseFloat(item.humanEval).toFixed(1) : '-'}</td>
              <td style={tdStyle}>{!isNaN(parseFloat(item.gsm8k)) ? parseFloat(item.gsm8k).toFixed(1) : '-'}</td>
              <td style={tdStyle}>{!isNaN(parseFloat(item.math)) ? parseFloat(item.math).toFixed(1) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={referenceStyle}>
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