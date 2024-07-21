import React from 'react';
import PersonalInformation from '../components/PersonalInformation';
import '../styles/muji-styles.css'; // 確保路徑正確

function HomePage() {
  return (
    <div>
      <h2 className="muji-h2">個人自我介紹</h2>
      <PersonalInformation />
    </div>
  );
}

export default HomePage;
