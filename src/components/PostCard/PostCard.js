import React from 'react';
import './PostCard.css';
import UserAvatar from './images/logos/user-avatar.svg';

const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="post-meta">
      <img src={UserAvatar} alt="User" className="post-user-avatar" />
      <span className="post-author">{post.author}</span>
      <span className="post-subreddit">to r/{post.subreddit}</span>
      <span className="post-time">{post.time}</span>
    </div>
    <div className="post-divider" />
    <h3 className="post-title">{post.title}</h3>
    <p className="post-body">{post.body}</p>
    <a className="post-link" href="#">
      See this post on <span className="post-link-reddit">Reddit</span> &rarr;
    </a>
  </div>
);

export default PostCard; 