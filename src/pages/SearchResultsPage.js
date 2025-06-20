import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResults, performSearch } from '../store/features/searchSlice';
import Sidebar from '../components/Sidebar/Sidebar';
import PostCard from '../components/PostCard/PostCard';
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
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);

  // Perform search when URL query changes
  useEffect(() => {
    if (urlSearchTerm) {
      dispatch(performSearch(urlSearchTerm));
    }
  }, [dispatch, urlSearchTerm]);

  const resultsContent = (
    <div className="post-feed">
      {searchResults.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );

  if (!searchResults || searchResults.length === 0) {
    if (isTablet) {
      return (
        <div className="page-layout">
          <NoResultsBar searchTerm={urlSearchTerm} />
          <div className="feed-sidebar-row">
            <div className="feed-section"></div>
            <Sidebar />
          </div>
        </div>
      );
    }
    return (
      <div className="page-layout">
        <div className="feed-section">
          <NoResultsBar searchTerm={urlSearchTerm} />
        </div>
        <Sidebar />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="page-layout">
        <SearchBar searchTerm={urlSearchTerm} />
        <div className="feed-sidebar-row">
          <div className="feed-section">
            {resultsContent}
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
        {resultsContent}
      </div>
      <Sidebar />
    </div>
  );
};

export default SearchResultsPage; 