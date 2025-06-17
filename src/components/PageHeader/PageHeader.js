import React from 'react';
import './PageHeader.css';

const PageHeader = ({ image, title, description }) => (
  <div className="page-header">
    <img className="page-header-image" src={image} alt={title} />
    <div className="page-header-content">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

export default PageHeader; 