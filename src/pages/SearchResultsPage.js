import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import PostCard from '../components/PostCard/PostCard';
import './SearchResultsPage.css';
import allPosts from '../data/posts';

function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth <= 1024);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isTablet;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredPosts.length === 0) {
    if (isTablet) {
      return (
        <div className="page-layout">
          <NoResultsBar searchTerm={searchTerm} />
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
          <NoResultsBar searchTerm={searchTerm} />
        </div>
        <Sidebar />
      </div>
    );
  }

  const resultsContent = (
    <div className="post-feed">
      {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );

  if (isTablet) {
    return (
      <div className="page-layout">
        <SearchBar searchTerm={searchTerm} />
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
        <SearchBar searchTerm={searchTerm} />
        {resultsContent}
      </div>
      <Sidebar />
    </div>
  );
};

export default SearchResultsPage; 