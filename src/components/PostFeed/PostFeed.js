import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, loadMorePosts, filterBySubreddit, resetPosts } from '../../store/features/postsSlice';
import PostCard from '../PostCard/PostCard';
import './PostFeed.css';

const PostFeed = ({ subreddit }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  // Filter posts by subreddit or reset
  useEffect(() => {
    if (subreddit) {
      dispatch(filterBySubreddit(subreddit));
    } else {
      dispatch(resetPosts());
    }
  }, [dispatch, subreddit]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      posts.length > 0
    ) {
      dispatch(loadMorePosts());
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="post-feed">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostFeed; 