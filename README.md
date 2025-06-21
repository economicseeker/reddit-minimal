# Reddit Minimal

A modern, responsive Reddit client built with React and Redux that provides a clean, minimal interface for browsing Reddit content. This project integrates with the Reddit API to deliver real-time posts, subreddits, and search functionality.

[Live Demo](https://reddit-minimal-420.netlify.app/)

## Preview

### Desktop
<table>
  <tr>
    <td><img src="mockups/desktop/Web%20-%20Home.png" alt="Desktop Homepage" width="300"></td>
    <td><img src="mockups/desktop/Web%20-%20Subreddit.png" alt="Desktop Subreddit" width="300"></td>
  </tr>
  <tr>
    <td><img src="mockups/desktop/Web%20-%20Results.png" alt="Desktop Search Results" width="300"></td>
    <td><img src="mockups/desktop/Web%20-%20Error%20Page.png" alt="Desktop Error Page" width="300"></td>
  </tr>
</table>

### Tablet
<table>
  <tr>
    <td><img src="mockups/tablet/Tablet%20-%20Home.png" alt="Tablet Homepage" width="300"></td>
    <td><img src="mockups/tablet/Tablet%20-%20Subreddit.png" alt="Tablet Subreddit" width="300"></td>
  </tr>
  <tr>
    <td><img src="mockups/tablet/Tablet%20-%20Results.png" alt="Tablet Search Results" width="300"></td>
    <td><img src="mockups/tablet/Tablet%20-%20Error%20Page.png" alt="Tablet Error Page" width="300"></td>
  </tr>
</table>

### Mobile
<table>
  <tr>
    <td><img src="mockups/mobile/Mobile%20-%20Homepage.png" alt="Mobile Homepage" width="300"></td>
    <td><img src="mockups/mobile/Mobile%20-%20Subreddit.png" alt="Mobile Subreddit" width="300"></td>
  </tr>
  <tr>
    <td><img src="mockups/mobile/Mobile%20-%20Results.png" alt="Mobile Search Results" width="300"></td>
    <td><img src="mockups/mobile/Mobile%20-%20Menu.png" alt="Mobile Menu" width="300"></td>
  </tr>
  <tr>
    <td colspan="2"><img src="mockups/mobile/Mobile%20-%20Error%20Page.png" alt="Mobile Error Page" width="300"></td>
  </tr>
</table>

## Technologies

- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with async thunks
- **React Router** - Client-side routing
- **CSS3** - Custom styling with CSS variables and responsive design
- **Reddit JSON API** - Real-time data from Reddit

## Features

### 🏠 **Homepage**
- Combined feed of posts from popular subreddits
- Real-time data from Reddit API
- Infinite scrolling with pagination
- Loading states and error handling

### 🔍 **Search Functionality**
- Search posts across all subreddits
- Real-time search results
- Search history and suggestions

### 📱 **Subreddit Pages**
- Individual subreddit feeds
- Subreddit information (member count, description)
- Dynamic subreddit banners and icons
- Real-time post updates

### 🎨 **Responsive Design**
- **Desktop**: Full layout with sidebar
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Mobile-first design with offscreen menu
- Touch-friendly interactions

### 🎯 **User Experience**
- Smooth animations and transitions
- Loading spinners and error states
- Retry functionality for failed requests
- Keyboard navigation support
- Accessible design patterns

### 🔧 **Technical Features**
- Redux state management with async thunks
- Error boundaries and fallback UI
- Optimized performance with React.memo
- Clean component architecture
- Type-safe Redux selectors

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/economicseeker/reddit-minimal.git
cd reddit-minimal
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage/   # Error display component
│   ├── Header/         # Navigation header
│   ├── LoadingSpinner/ # Loading indicator
│   ├── PageHeader/     # Page title and info
│   ├── PostCard/       # Individual post display
│   ├── PostFeed/       # Post list container
│   └── Sidebar/        # Subreddit navigation
├── pages/              # Page components
│   ├── ErrorPage/      # 404 and error pages
│   ├── HomePage.js     # Homepage
│   ├── SearchResultsPage.js
│   └── SubredditPage.js
├── services/           # API services
│   └── redditApi.js    # Reddit API integration
├── store/              # Redux store
│   ├── features/       # Redux slices
│   └── store.js        # Store configuration
└── helper/             # Utility functions
    └── hooks.js        # Custom React hooks
```

## API Integration

The app integrates with Reddit's JSON API to fetch:
- **Posts**: Hot posts from subreddits and front page
- **Subreddits**: Popular subreddits with metadata
- **Search**: Cross-subreddit search functionality
- **Subreddit Info**: Detailed subreddit information

### API Endpoints Used
- `/hot.json` - Hot posts from subreddits
- `/subreddits/popular.json` - Popular subreddits
- `/r/{subreddit}/about.json` - Subreddit information
- `/search.json` - Search functionality

## Responsive Design

The app is built with a mobile-first approach:

- **Mobile (< 600px)**: Stacked layout with offscreen menu
- **Tablet (600px - 1024px)**: Hybrid layout with conditional sidebar
- **Desktop (> 1024px)**: Full layout with persistent sidebar

## Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Infinite Scrolling**: Efficient post loading
- **Memoization**: React.memo for expensive components
- **Optimized Images**: Proper image sizing and fallbacks
- **Redux Optimization**: Selective state updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Reddit API](https://github.com/reddit-archive/reddit/wiki/JSON) for providing the data
- [React](https://reactjs.org/) for the amazing framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Router](https://reactrouter.com/) for routing

---

Built with ❤️ by [@economicseeker](https://github.com/economicseeker)
