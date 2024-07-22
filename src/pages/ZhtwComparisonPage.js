import React from 'react';
import ZhTWAIModelsComparisonTable from '../components/ZhTWAIModelsComparisonTable';
import '../styles/muji-styles.css'; // 確保路徑正確

function ZhtwComparisonPage() {
  return (
    <div>
      <h2 className="muji-h2">繁體中文 LLM 模型比較表</h2>
      <ZhTWAIModelsComparisonTable />
    </div>
  );
}

export default ZhtwComparisonPage;
