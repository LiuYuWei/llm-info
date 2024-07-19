import React from 'react';
import { FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="container">
      <div className="avatar">
        <img src="https://i.imgur.com/9pxVdXo.jpeg" alt="Simon Liu Yu-Wei" />
      </div>
      <h1>Simon Liu Yu-Wei</h1>
      <div className="info-group">
        <div className="info-label">Email</div>
        <div className="info-value">simonliuyuwei@gmail.com</div>
      </div>
      <div className="info-group">
        <div className="info-label">Line</div>
        <div className="info-value">fetnetsimonliu</div>
      </div>
      <div className="info-group">
        <div className="info-label">Location</div>
        <div className="info-value">New Taipei City, Taiwan</div>
      </div>
      <div className="info-group">
        <div className="info-label">About Me</div>
        <div className="info-value">
          I'm Simon Liu(劉育維), an engineer specializing in AI/ML technologies, MLOps operational models, and the latest advancements in LLM. I aspire to empower every user to seamlessly leverage AI technology to achieve their desired project outcomes.
        </div>
      </div>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/simonliuyuwei/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://www.facebook.com/simonliuyuwei" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://simonliuyuwei-4ndgcf4.gamma.site/" target="_blank" rel="noopener noreferrer" aria-label="Personal Website"><FaGlobe /></a>
      </div>
    </div>
  );
};

export default HomePage;
