import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';

const SearchResultsPage = () => (
  <div className="page-layout">
    <div className="feed-section">
      <PageHeader
        image="https://placehold.co/736x204/eee/333?text=Search"
        title="Search results for 'Bitcoin' in all subreddits in RedditMinimal"
        description="Search results for your query are shown below. This is a placeholder for the search results page."
      />
      <PostFeed />
    </div>
    <Sidebar />
  </div>
);

export default SearchResultsPage; 