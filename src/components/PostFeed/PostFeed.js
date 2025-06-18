import React from 'react';
import PostCard from '../PostCard/PostCard';
import './PostFeed.css';

const allPosts = [
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
  },
  {
    id: 3,
    author: 'CuriousCat',
    subreddit: 'NoStupidQuestions',
    title: 'Why is the sky blue?',
    body: 'I know it has something to do with the atmosphere, but can someone explain it simply?',
    time: '1 day ago'
  },
  {
    id: 4,
    author: 'GameMaster42',
    subreddit: 'BaldursGate3',
    title: 'Best party composition for Honour Mode?',
    body: 'What party did you use to beat Honour Mode? Any tips for Act 3?',
    time: '2 days ago'
  },
  {
    id: 5,
    author: 'FacepalmFan',
    subreddit: 'facepalm',
    title: 'Saw this at the grocery store today...',
    body: 'Someone tried to scan a banana as a PS5 controller. Cashier was not amused.',
    time: '3 hours ago'
  },
  {
    id: 6,
    author: 'WowThatIsInteresting',
    subreddit: 'interestingasfuck',
    title: 'This tree grew around a stop sign',
    body: 'Nature always finds a way!',
    time: '5 hours ago'
  },
  {
    id: 7,
    author: 'DamnThatIsCool',
    subreddit: 'Damnthatsinteresting',
    title: 'A perfectly preserved ancient mosaic',
    body: 'Found during a recent excavation in Turkey.',
    time: '6 hours ago'
  },
  {
    id: 8,
    author: 'StreamerGuy',
    subreddit: 'LivestreamFail',
    title: 'Streamer falls out of chair live',
    body: 'Clip of the year. The chat went wild!',
    time: '10 minutes ago'
  },
  {
    id: 9,
    author: 'PalworldFan',
    subreddit: 'Palworld',
    title: 'Best Pal for early game?',
    body: 'What\'s your go-to Pal for the first few hours? I\'m loving the sheep one.',
    time: '4 hours ago'
  }
];

const PostFeed = ({ subreddit }) => {
  const posts = subreddit
    ? allPosts.filter(post => post.subreddit.toLowerCase() === subreddit.toLowerCase())
    : allPosts;

  return (
    <div className="post-feed">
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostFeed; 