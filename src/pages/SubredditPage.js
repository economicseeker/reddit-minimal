import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubredditInfoAsync, selectSubredditInfo, selectSubredditInfoLoading, selectSubredditInfoError, clearSubredditInfo } from '../store/features/subredditInfoSlice';
import PageHeader from '../components/PageHeader/PageHeader';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { useIsTablet } from '../helper/hooks';

// Array of colors for random selection
const headerColors = [
  '#ff4500', // Reddit orange
  '#0079d3', // Reddit blue
  '#7193ff', // Light blue
  '#ff6b6b', // Coral red
  '#4ecdc4', // Turquoise
  '#45b7d1', // Sky blue
  '#96ceb4', // Mint green
  '#feca57', // Yellow
  '#ff9ff3', // Pink
  '#54a0ff', // Blue
  '#5f27cd', // Purple
  '#00d2d3', // Cyan
  '#ff9f43', // Orange
  '#10ac84', // Green
  '#ee5253'  // Red
];

// Function to get random color
const getRandomColor = () => {
  return headerColors[Math.floor(Math.random() * headerColors.length)];
};

// Function to generate header title based on subreddit name
const generateHeaderTitle = (subredditName) => {
  // Convert subreddit name to title case and add some variety
  const title = subredditName
    .split(/(?=[A-Z])|_|-/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return title;
};

const SubredditPage = () => {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const isTablet = useIsTablet();
  const subredditInfo = useSelector(selectSubredditInfo);
  const loading = useSelector(selectSubredditInfoLoading);
  const error = useSelector(selectSubredditInfoError);

  // Generate random color and title for this subreddit
  const randomColor = getRandomColor();
  const headerTitle = generateHeaderTitle(subreddit);

  useEffect(() => {
    if (subreddit) {
      dispatch(fetchSubredditInfoAsync(subreddit));
    }
    return () => {
      dispatch(clearSubredditInfo());
    };
  }, [dispatch, subreddit]);

  // Retry function for error handling
  const handleRetry = () => {
    if (subreddit) {
      dispatch(fetchSubredditInfoAsync(subreddit));
    }
  };

  // Fallback info if API data is not available
  const fallbackInfo = {
    title: headerTitle,
    subtitle: `r/${subreddit}`,
    memberCount: 'Loading...',
    description: `Welcome to r/${subreddit}! Explore posts and discussions from this community.`,
    image: `https://placehold.co/736x204/${randomColor.replace('#', '')}/fff?text=${encodeURIComponent(headerTitle)}`
  };

  // Use API data if available, otherwise fallback
  const info = subredditInfo
    ? {
        title: subredditInfo.title || headerTitle,
        subtitle: `r/${subredditInfo.name || subreddit}`,
        memberCount: subredditInfo.memberCount || fallbackInfo.memberCount,
        description: subredditInfo.description || fallbackInfo.description,
        image: subredditInfo.banner || fallbackInfo.image
      }
    : fallbackInfo;

  if (loading && !subredditInfo) {
    if (isTablet) {
      return (
        <div className="page-layout">
          <div className="feed-sidebar-row">
            <div className="feed-section">
              <LoadingSpinner size="large" />
            </div>
            <Sidebar />
          </div>
        </div>
      );
    }
    return (
      <div className="page-layout">
        <div className="feed-section">
          <LoadingSpinner size="large" />
        </div>
        <Sidebar />
      </div>
    );
  }

  if (error && !subredditInfo) {
    if (isTablet) {
      return (
        <div className="page-layout">
          <div className="feed-sidebar-row">
            <div className="feed-section">
              <ErrorMessage 
                message={`Failed to load subreddit info: ${error}`}
                onRetry={handleRetry}
              />
            </div>
            <Sidebar />
          </div>
        </div>
      );
    }
    return (
      <div className="page-layout">
        <div className="feed-section">
          <ErrorMessage 
            message={`Failed to load subreddit info: ${error}`}
            onRetry={handleRetry}
          />
        </div>
        <Sidebar />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="page-layout">
        <PageHeader
          image={info.image}
          title={info.title}
          subtitle={info.subtitle}
          memberCount={info.memberCount}
          description={info.description}
        />
        <div className="feed-sidebar-row">
          <div className="feed-section">
            <PostFeed subreddit={subreddit} />
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="feed-section">
        <PageHeader
          image={info.image}
          title={info.title}
          subtitle={info.subtitle}
          memberCount={info.memberCount}
          description={info.description}
        />
        <PostFeed subreddit={subreddit} />
      </div>
      <Sidebar />
    </div>
  );
};

export default SubredditPage; 