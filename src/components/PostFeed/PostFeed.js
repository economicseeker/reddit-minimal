import React from 'react';
import PostCard from '../PostCard/PostCard';
import './PostFeed.css';

const placeholderPosts = [
  {
    id: 1,
    author: 'CryptoCactus88',
    subreddit: 'Bitcoin',
    title: 'Just explained Bitcoin to my 70-year-old dad... and he wants to buy the dip',
    body: 'Spent 45 minutes walking my dad through how Bitcoin works—he kept asking if it\'s "like PayPal but nerdier."',
    time: '8 hours ago'
  },
  {
    id: 2,
    author: 'SatoshiSnackBar',
    subreddit: 'Bitcoin',
    title: 'Why does no one talk about how boring Bitcoin is supposed to be?',
    body: 'Everyone\'s chasing the next pump, the latest altcoin, NFTs, and whatever\'s trendy. But Bitcoin? It\'s just chugging along.',
    time: '8 hours ago'
  }
];

const PostFeed = () => (
  <div className="post-feed">
    {placeholderPosts.map(post => <PostCard key={post.id} post={post} />)}
  </div>
);

export default PostFeed; 