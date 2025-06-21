import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectSubreddits, selectSubredditsLoading, selectSubredditsError, fetchSubreddits } from '../../store/features/subredditsSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Sidebar.css';
import subredditIcon from './images/logos/subreddit-icon.svg';

const Sidebar = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const loading = useSelector(selectSubredditsLoading);
  const error = useSelector(selectSubredditsError);

  // Fetch subreddits when component mounts
  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  // Show spinner for both loading and error states
  if (loading || error) {
    return (
      <aside className="sidebar">
        <h3>Subreddits</h3>
        <LoadingSpinner size="small" />
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <h3>Subreddits</h3>
      <ul>
        {subreddits.map(subreddit => (
          <li key={subreddit.id}>
            <NavLink 
              to={`/r/${subreddit.name}`}
              className={({ isActive }) => 
                `sidebar-button ${isActive ? 'active' : ''}`
              }
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
    </aside>
  );
};

export default Sidebar; 