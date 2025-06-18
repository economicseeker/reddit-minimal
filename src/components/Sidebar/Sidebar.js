import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import subredditIcon from './images/logos/subreddit-icon.svg';

const subreddits = [
  'Bitcoin',
  'NoStupidQuestions',
  'BaldursGate3',
  'facepalm',
  'interestingasfuck',
  'Damnthatsinteresting',
  'LivestreamFail',
  'Palworld'
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Subreddits</h3>
      <ul>
        {subreddits.map(sub => (
          <li key={sub}>
            <NavLink 
              to={`/r/${sub}`}
              className={({ isActive }) => 
                `sidebar-button ${isActive ? 'active' : ''}`
              }
            >
              <img src={subredditIcon} alt={`${sub} icon`} className="sidebar-button-icon" />
              <span className="sidebar-button-text">{sub}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar; 