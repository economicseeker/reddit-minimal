import React, { useState, useEffect, useCallback } from 'react';
import PostCard from '../PostCard/PostCard';
import './PostFeed.css';
import allPosts from '../../data/posts';

const POSTS_PER_LOAD = 5;

const PostFeed = ({ subreddit }) => {
  const posts = subreddit
    ? allPosts.filter(post => post.subreddit.toLowerCase() === subreddit.toLowerCase())
    : allPosts;

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_LOAD);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      visibleCount < posts.length
    ) {
      setVisibleCount((prev) => Math.min(prev + POSTS_PER_LOAD, posts.length));
    }
  }, [visibleCount, posts.length]);

  useEffect(() => {
    setVisibleCount(POSTS_PER_LOAD);
  }, [subreddit]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="post-feed">
      {posts.slice(0, visibleCount).map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostFeed; 