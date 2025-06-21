// Reddit API service for fetching posts
// Based on Reddit JSON API: https://github.com/reddit-archive/reddit/wiki/JSON

const REDDIT_API_BASE = 'https://www.reddit.com';

// Transform Reddit post data to match our app's structure
const transformRedditPost = (redditPost) => {
  const { data } = redditPost;
  
  return {
    id: data.id,
    author: data.author,
    authorAvatar: data.author ? `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.abs(data.author.charCodeAt(0) % 8)}.png` : null,
    subreddit: data.subreddit,
    title: data.title,
    body: data.selftext || '', // Reddit uses 'selftext' for post body
    time: formatTime(data.created_utc),
    url: data.url,
    permalink: data.permalink,
    isStickied: data.stickied,
    isLocked: data.locked,
    isNSFW: data.over_18,
    thumbnail: data.thumbnail,
    domain: data.domain,
    upvoteRatio: data.upvote_ratio
  };
};

// Format timestamp to relative time
const formatTime = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
};

// Format member count
const formatMemberCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M members`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K members`;
  }
  return `${count} members`;
};

// Fetch subreddit information
export const fetchSubredditInfo = async (subreddit) => {
  try {
    const url = `${REDDIT_API_BASE}/r/${subreddit}/about.json`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditMinimal/1.0 (by /u/your_username)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const subredditData = data.data;
    
    return {
      id: subredditData.id,
      name: subredditData.display_name,
      title: subredditData.title,
      description: subredditData.public_description,
      memberCount: formatMemberCount(subredditData.subscribers),
      subscribers: subredditData.subscribers,
      url: subredditData.url,
      icon: subredditData.icon_img || subredditData.community_icon,
      banner: subredditData.banner_img,
      isNSFW: subredditData.over18,
      created: subredditData.created_utc,
      activeUserCount: subredditData.active_user_count
    };
  } catch (error) {
    console.error('Error fetching subreddit info:', error);
    throw error;
  }
};

// Fetch posts from a specific subreddit
export const fetchSubredditPosts = async (subreddit, limit = 25, after = null) => {
  try {
    // Use the exact subreddit name as provided (case-sensitive)
    let url = `${REDDIT_API_BASE}/r/${subreddit}/hot.json?limit=${limit}`;
    if (after) {
      url += `&after=${after}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditMinimal/1.0 (by /u/your_username)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the posts
    const posts = data.data.children.map(transformRedditPost);
    
    return {
      posts,
      after: data.data.after,
      before: data.data.before
    };
  } catch (error) {
    console.error('Error fetching subreddit posts:', error);
    throw error;
  }
};

// Fetch posts from multiple subreddits (front page)
export const fetchFrontPagePosts = async (limit = 25, after = null) => {
  try {
    let url = `${REDDIT_API_BASE}/hot.json?limit=${limit}`;
    if (after) {
      url += `&after=${after}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditMinimal/1.0 (by /u/your_username)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the posts
    const posts = data.data.children.map(transformRedditPost);
    
    return {
      posts,
      after: data.data.after,
      before: data.data.before
    };
  } catch (error) {
    console.error('Error fetching front page posts:', error);
    throw error;
  }
};

// Search posts across subreddits
export const searchPosts = async (query, limit = 25, after = null) => {
  try {
    let url = `${REDDIT_API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&sort=hot`;
    if (after) {
      url += `&after=${after}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditMinimal/1.0 (by /u/your_username)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the posts
    const posts = data.data.children.map(transformRedditPost);
    
    return {
      posts,
      after: data.data.after,
      before: data.data.before
    };
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// Get popular subreddits
export const fetchPopularSubreddits = async (limit = 25) => {
  try {
    const url = `${REDDIT_API_BASE}/subreddits/popular.json?limit=${limit}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RedditMinimal/1.0 (by /u/your_username)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.data.children.map(subreddit => ({
      id: subreddit.data.id,
      name: subreddit.data.display_name, // This is the exact case-sensitive name
      title: subreddit.data.title,
      description: subreddit.data.public_description,
      subscribers: subreddit.data.subscribers,
      url: subreddit.data.url,
      icon: subreddit.data.icon_img || subreddit.data.community_icon
    }));
  } catch (error) {
    console.error('Error fetching popular subreddits:', error);
    throw error;
  }
};
