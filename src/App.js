import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import SubredditPage from './pages/SubredditPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/r/:subreddit" element={<SubredditPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
