import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <App />
);

reportWebVitals();

