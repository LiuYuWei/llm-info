import React from 'react';
import AIModelsComparisonTable from '../components/AIModelsComparisonTable';
import '../styles/muji-styles.css'; // 確保路徑正確

function ComparisonPage() {
  return (
    <div>
      <h2 className="muji-h2">LLM 模型比較表</h2>
      <AIModelsComparisonTable />
    </div>
  );
}

export default ComparisonPage;
