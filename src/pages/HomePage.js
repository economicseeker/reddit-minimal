import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';
import { useIsTablet } from '../helper/hooks';

const HomePage = () => {
  const isTablet = useIsTablet();

  if (isTablet) {
    return (
      <div className="page-layout">
        <PageHeader
          image="https://placehold.co/736x204"
          title="Home"
          subtitle="RedditMinimal"
          memberCount="420M members"
          description="The homepage displays a combined feed of posts from all subreddits included in the website. Each post card shows the title, subreddit name, and author. Posts are listed in the order they are received from the API, with no additional sorting or filtering. A button on each card lets users open the post directly on Reddit. Clicking the subreddit name takes users to its individual feed page."
        />
        <div className="feed-sidebar-row">
          <div className="feed-section">
            <PostFeed />
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
          image="https://placehold.co/736x204"
          title="Home"
          subtitle="RedditMinimal"
          memberCount="420M members"
          description="The homepage displays a combined feed of posts from all subreddits included in the website. Each post card shows the title, subreddit name, and author. Posts are listed in the order they are received from the API, with no additional sorting or filtering. A button on each card lets users open the post directly on Reddit. Clicking the subreddit name takes users to its individual feed page."
        />
        <PostFeed />
      </div>
      <Sidebar />
    </div>
  );
};

export default HomePage; 