import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry, showRetry = true }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {showRetry && onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 