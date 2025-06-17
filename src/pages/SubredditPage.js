import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';

const SubredditPage = () => (
  <div className="page-layout">
    <div className="feed-section">
      <PageHeader
        image="https://placehold.co/736x204/ff4500/fff?text=Bitcoin"
        title="Bitcoin"
        description="Bitcoin is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, bitcoins are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Bitcoin. As such, it is more resistant to wild inflation and corrupt banks. With Bitcoin, you can be your own bank."
      />
      <PostFeed />
    </div>
    <Sidebar />
  </div>
);

export default SubredditPage; 