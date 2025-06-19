import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import RedditLogo from './images/logos/Reddit_Icon_FullColor.svg';
import SearchIconDefault from './images/logos/search-icons/search-default.svg';
import SearchIconActive from './images/logos/search-icons/search-active.svg';
import GithubLogo from './images/logos/github-logo/Logo.svg';
import MenuIcon from './images/logos/mobile-menu-icons/menu.svg';
import CloseIcon from './images/logos/mobile-menu-icons/close.svg';
import Sidebar from '../Sidebar/Sidebar';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo" aria-label="Home">
          <div className="logo-content">
            <img src={RedditLogo} alt="Reddit Logo" className="reddit-logo" />
            <div className="logo-text">
              <span className="reddit-text">Reddit</span>
              <span className="minimal-text">Minimal</span>
            </div>
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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <a className="github-logo" href="https://github.com/economicseeker" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <div className="github-content">
            <img src={GithubLogo} alt="GitHub Logo" className="github-logo-img" />
            <span className="github-username">/economicseeker</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header; 