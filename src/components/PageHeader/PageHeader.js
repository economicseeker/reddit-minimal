import React from 'react';
import './PageHeader.css';

const PageHeader = ({ image, title, subtitle, memberCount, description }) => (
  <div className="page-header">
    <div className="page-header-image-container">
      <div className="page-header-image-overlay"></div>
      <img className="page-header-image" src={image} alt={title} />
      <h1 className="page-header-image-title">{title}</h1>
      <div className="page-header-subtitle">
        <span className="minimal">{subtitle}</span>
      </div>
      <div className="page-header-member-count">{memberCount}</div>
    </div>
    <div className="page-header-content">
      <h2>About:</h2>
      <p>{description}</p>
    </div>
  </div>
);

export default PageHeader;