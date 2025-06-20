import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader/PageHeader';
import PostFeed from '../components/PostFeed/PostFeed';
import Sidebar from '../components/Sidebar/Sidebar';
import { useIsTablet } from '../helper/hooks';

// Example data for demonstration
const subredditData = {
  Bitcoin: {
    title: 'Bitcoin',
    subtitle: 'r/Bitcoin',
    memberCount: '7.9M members',
    description: 'Bitcoin is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, bitcoins are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Bitcoin. As such, it is more resistant to wild inflation and corrupt banks. With Bitcoin, you can be your own bank.',
    image: 'https://placehold.co/736x204/ff4500/fff?text=Bitcoin'
  },
  NoStupidQuestions: {
    title: 'NoStupidQuestions',
    subtitle: 'r/NoStupidQuestions',
    memberCount: '4.2M members',
    description: 'Ask any question, no matter how simple or silly. This is a place to learn without judgment.',
    image: 'https://placehold.co/736x204/888/fff?text=NoStupidQuestions'
  },
  BaldursGate3: {
    title: 'BaldursGate3',
    subtitle: 'r/BaldursGate3',
    memberCount: '312K members',
    description: 'A community for fans of Baldur\'s Gate 3. Share tips, stories, and party builds!',
    image: 'https://placehold.co/736x204/222/fff?text=BaldursGate3'
  },
  facepalm: {
    title: 'facepalm',
    subtitle: 'r/facepalm',
    memberCount: '7.1M members',
    description: 'A place for the most facepalm-worthy moments. Share your best (or worst) finds.',
    image: 'https://placehold.co/736x204/aaa/fff?text=facepalm'
  },
  interestingasfuck: {
    title: 'interestingasfuck',
    subtitle: 'r/interestingasfuck',
    memberCount: '11.2M members',
    description: 'For the most interesting things you\'ll see all day. Prepare to be amazed!',
    image: 'https://placehold.co/736x204/333/fff?text=interestingasfuck'
  },
  Damnthatsinteresting: {
    title: 'Damnthatsinteresting',
    subtitle: 'r/Damnthatsinteresting',
    memberCount: '6.3M members',
    description: 'A collection of things that make you say "damn, that\'s interesting!"',
    image: 'https://placehold.co/736x204/555/fff?text=Damnthatsinteresting'
  },
  LivestreamFail: {
    title: 'LivestreamFail',
    subtitle: 'r/LivestreamFail',
    memberCount: '2.1M members',
    description: 'The best (and worst) moments from livestreams. Clips, fails, and more.',
    image: 'https://placehold.co/736x204/007bff/fff?text=LivestreamFail'
  },
  Palworld: {
    title: 'Palworld',
    subtitle: 'r/Palworld',
    memberCount: '98K members',
    description: 'Discuss the game Palworld! Share your favorite Pals, tips, and adventures.',
    image: 'https://placehold.co/736x204/ffb700/fff?text=Palworld'
  }
};

const SubredditPage = () => {
  const { subreddit } = useParams();
  const info = subredditData[subreddit] || {
    title: subreddit,
    subtitle: `r/${subreddit}`,
    memberCount: 'N/A',
    description: 'No description available.',
    image: 'https://placehold.co/736x204'
  };
  const isTablet = useIsTablet();

  if (isTablet) {
    return (
      <div className="page-layout">
        <PageHeader
          image={info.image}
          title={info.title}
          subtitle={info.subtitle}
          memberCount={info.memberCount}
          description={info.description}
        />
        <div className="feed-sidebar-row">
          <div className="feed-section">
            <PostFeed subreddit={subreddit} />
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="feed-section">
        <PageHeader
          image={info.image}
          title={info.title}
          subtitle={info.subtitle}
          memberCount={info.memberCount}
          description={info.description}
        />
        <PostFeed subreddit={subreddit} />
      </div>
      <Sidebar />
    </div>
  );
};

export default SubredditPage; 