import React, { useState } from 'react';
import './Header.css';
import RedditLogo from './images/logos/Reddit_Icon_FullColor.svg';
import SearchIconDefault from './images/logos/search-icons/search-default.svg';
import SearchIconActive from './images/logos/search-icons/search-active.svg';
import GithubLogo from './images/logos/github-logo/Logo.svg';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo" aria-label="Home">
          <img src={RedditLogo} alt="Reddit Logo" className="reddit-logo" />
          <div className="logo-text">
            <span className="reddit-text">Reddit</span>
            <span className="minimal-text">Minimal</span>
          </div>
        </a>
        <div className="search-container">
          <img 
            src={isSearchFocused ? SearchIconActive : SearchIconDefault} 
            alt="Search" 
            className="search-icon" 
          />
          <input 
            className="search-bar" 
            placeholder="Search Topic" 
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
        <a className="github-logo" href="https://github.com/economicseeker" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={GithubLogo} alt="GitHub Logo" className="github-logo-img" />
          <span className="github-username">/economicseeker</span>
        </a>
      </div>
    </header>
  );
};

export default Header; 