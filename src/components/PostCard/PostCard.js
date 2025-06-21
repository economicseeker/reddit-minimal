import React from 'react';
import './PostCard.css';
import UserAvatar from './images/logos/user-avatar.svg';

function abbreviateTime(time) {
  if (window.innerWidth > 600) return time;
  // e.g. '8 hours ago' -> '8h ago', '10 minutes ago' -> '10m ago'
  const match = time.match(/(\d+)\s*(hour|minute|day|second)s? ago/);
  if (!match) return time;
  const num = match[1];
  const unit = match[2];
  const abbr = unit === 'hour' ? 'h' : unit === 'minute' ? 'm' : unit === 'day' ? 'd' : unit === 'second' ? 's' : unit;
  return `${num}${abbr} ago`;
}

const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="post-meta">
      <img 
        src={post.authorAvatar || UserAvatar} 
        alt="User" 
        className="post-user-avatar"
        onError={(e) => {
          e.target.src = UserAvatar; // Fallback to default avatar if API avatar fails to load
        }}
      />
      <span className="post-author">{post.author}</span>
      <span className="post-subreddit">to r/{post.subreddit}</span>
      <span className="post-time">{abbreviateTime(post.time)}</span>
    </div>
    <div className="post-divider" />
    <h3 className="post-title">{post.title}</h3>
    {post.body && <p className="post-body">{post.body}</p>}
    <a 
      className="post-link" 
      href={post.permalink ? `https://www.reddit.com${post.permalink}` : '#'}
      target="_blank"
      rel="noopener noreferrer"
    >
      See this post on <span className="post-link-reddit">Reddit</span> &rarr;
    </a>
  </div>
);

export default PostCard; 