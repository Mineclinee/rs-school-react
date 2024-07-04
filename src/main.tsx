import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
