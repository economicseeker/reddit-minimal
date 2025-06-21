import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectPosts, 
  selectLoading, 
  selectError, 
  selectAfter, 
  selectVisibleCount,
  selectTotalPosts,
  selectCurrentSubreddit,
  selectSearchQuery,
  loadMorePosts, 
  filterBySubreddit, 
  resetPosts,
  fetchPosts,
  searchPostsAsync
} from '../../store/features/postsSlice';
import PostCard from '../PostCard/PostCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './PostFeed.css';

const PostFeed = ({ subreddit, searchQuery }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const after = useSelector(selectAfter);
  const visibleCount = useSelector(selectVisibleCount);
  const totalPosts = useSelector(selectTotalPosts);
  const currentSubreddit = useSelector(selectCurrentSubreddit);
  const currentSearchQuery = useSelector(selectSearchQuery);

  // Fetch posts when component mounts or subreddit/search changes
  useEffect(() => {
    // Reset state when switching subreddits or search queries
    dispatch(resetPosts());
    
    if (searchQuery) {
      dispatch(searchPostsAsync({ query: searchQuery }));
    } else if (subreddit) {
      dispatch(fetchPosts({ subreddit }));
    } else {
      dispatch(fetchPosts());
    }
  }, [dispatch, subreddit, searchQuery]);

  // Retry function for error handling
  const handleRetry = () => {
    if (searchQuery) {
      dispatch(searchPostsAsync({ query: searchQuery }));
    } else if (subreddit) {
      dispatch(fetchPosts({ subreddit }));
    } else {
      dispatch(fetchPosts());
    }
  };

  // Infinite scroll - load more posts
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      posts.length > 0 &&
      !loading
    ) {
      // If we have more posts locally, show them
      if (visibleCount < totalPosts) {
        dispatch(loadMorePosts());
      }
      // If we're at the end of local posts and have more to fetch from API
      else if (after && visibleCount >= totalPosts) {
        if (searchQuery) {
          dispatch(searchPostsAsync({ query: searchQuery, after }));
        } else if (subreddit) {
          dispatch(fetchPosts({ subreddit, after }));
        } else {
          dispatch(fetchPosts({ after }));
        }
      }
    }
  }, [dispatch, posts.length, loading, after, visibleCount, totalPosts, subreddit, searchQuery]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && posts.length === 0) {
    return (
      <div className="post-feed">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-feed">
        <ErrorMessage 
          message={`Failed to load posts: ${error}`}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="post-feed">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
      {loading && posts.length > 0 && (
        <div className="loading-more-spinner">
          Loading more posts...
        </div>
      )}
    </div>
  );
};

export default PostFeed; 