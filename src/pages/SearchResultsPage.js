import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import PostFeed from '../components/PostFeed/PostFeed';
import './SearchResultsPage.css';
import { useIsTablet } from '../helper/hooks';

const SearchBar = ({ searchTerm }) => (
  <div className="search-results-bar">
    <span className="search-bar-text">
      Search results for 
      <span className="search-bar-keyword"> ‘{searchTerm}’</span> in all subreddits in 
      <span className="search-bar-reddit"> Reddit</span>
      <span className="search-bar-minimal">Minimal</span>
    </span>
  </div>
);

const NoResultsBar = ({ searchTerm }) => (
  <div className="search-results-bar">
    <span className="search-bar-text">
      No results for <span className="search-bar-keyword">‘{searchTerm}’</span> in all subreddits in
      <span className="search-bar-reddit"> Reddit</span>
      <span className="search-bar-minimal">Minimal</span>
    </span>
  </div>
);

const SearchResultsPage = () => {
  const isTablet = useIsTablet();
  const [searchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get('q') || '';

  if (isTablet) {
    return (
      <div className="page-layout">
        <SearchBar searchTerm={urlSearchTerm} />
        <div className="feed-sidebar-row">
          <div className="feed-section">
            <PostFeed searchQuery={urlSearchTerm} />
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="feed-section">
        <SearchBar searchTerm={urlSearchTerm} />
        <PostFeed searchQuery={urlSearchTerm} />
      </div>
      <Sidebar />
    </div>
  );
};

export default SearchResultsPage; 