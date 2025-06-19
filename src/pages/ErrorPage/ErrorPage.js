import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">Oops!</h1>
      <p className="error-page-message">
        Something went wrong or the page you are looking for does not exist.
      </p>
      <button
        className="error-page-btn"
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage; 