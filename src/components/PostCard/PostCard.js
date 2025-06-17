import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="post-meta">
      <span className="post-author">{post.author}</span>
      <span className="post-subreddit">to r/{post.subreddit}</span>
      <span className="post-time">{post.time}</span>
    </div>
    <h3 className="post-title">{post.title}</h3>
    <p className="post-body">{post.body}</p>
    <a className="post-link" href="#">See this post on Reddit →</a>
  </div>
);

export default PostCard; 