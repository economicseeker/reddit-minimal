import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">RedditMinimal</div>
    <input className="search-bar" placeholder="Search Topic" />
    <a className="github-logo" href="#" aria-label="GitHub">
      {/* Placeholder for GitHub logo */}
      <span>GitHub</span>
    </a>
  </header>
);

export default Header; 