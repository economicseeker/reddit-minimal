import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubreddits, selectSubredditsLoading, selectSubredditsError, fetchSubreddits } from '../../store/features/subredditsSlice';
import './Header.css';
import RedditLogo from './images/logos/Reddit_Icon_FullColor.svg';
import SearchIconDefault from './images/logos/search-icons/search-default.svg';
import SearchIconActive from './images/logos/search-icons/search-active.svg';
import GithubLogo from './images/logos/github-logo/Logo.svg';
import MenuIcon from './images/logos/mobile-menu-icons/menu.svg';
import CloseIcon from './images/logos/mobile-menu-icons/close.svg';
import subredditIcon from '../Sidebar/images/logos/subreddit-icon.svg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offscreenMenuOpen, setOffscreenMenuOpen] = useState(false);
  const [offscreenMenuClosing, setOffscreenMenuClosing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const subreddits = useSelector(selectSubreddits);
  const subredditsLoading = useSelector(selectSubredditsLoading);
  const subredditsError = useSelector(selectSubredditsError);

  // Fetch subreddits when component mounts
  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Close menu on Escape
  useEffect(() => {
    if (!offscreenMenuOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [offscreenMenuOpen]);

  // Remove menu from DOM after slide out
  useEffect(() => {
    if (offscreenMenuClosing) {
      const timer = setTimeout(() => {
        setOffscreenMenuClosing(false);
        setOffscreenMenuOpen(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [offscreenMenuClosing]);

  const handleCloseMenu = () => {
    setOffscreenMenuClosing(true);
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
        <button className="header-menu-btn" aria-label="Open menu" onClick={() => setOffscreenMenuOpen(true)}>
          <img src={MenuIcon} alt="Menu" />
        </button>
      </div>
      {(offscreenMenuOpen || offscreenMenuClosing) && (
        <>
          <div className="offscreen-menu-backdrop" onClick={handleCloseMenu} />
          <div className={`offscreen-menu${offscreenMenuClosing ? ' slide-out' : ''}`}>
            <button className="offscreen-menu-close" onClick={handleCloseMenu} aria-label="Close menu">
              <img src={CloseIcon} alt="Close" />
            </button>
            <div className="offscreen-menu-content">
              <h3>Subreddits</h3>
              {subredditsLoading ? (
                <div className="offscreen-loading">
                  <LoadingSpinner size="small" />
                </div>
              ) : subredditsError ? (
                <div className="offscreen-error">
                  <p>Failed to load subreddits</p>
                </div>
              ) : (
                <ul>
                  {subreddits.map(subreddit => (
                    <li key={subreddit.id} style={{listStyle: 'none'}}>
                      <NavLink 
                        to={`/r/${subreddit.name}`}
                        className={({ isActive }) => 
                          `sidebar-button ${isActive ? 'active' : ''}`
                        }
                        onClick={handleCloseMenu}
                      >
                        <img 
                          src={subreddit.icon || subredditIcon} 
                          alt={`${subreddit.name} icon`} 
                          className="sidebar-button-icon"
                          onError={(e) => {
                            e.target.src = subredditIcon; // Fallback to default icon
                          }}
                        />
                        <span className="sidebar-button-text">{subreddit.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
              <div className="offscreen-github-content">
                <a href="https://github.com/economicseeker" target="_blank" rel="noopener noreferrer" className="offscreen-github-link" aria-label="GitHub">
                  <img src={GithubLogo} alt="GitHub Logo" className="github-logo-img" />
                  <span className="github-username">/economicseeker</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header; 