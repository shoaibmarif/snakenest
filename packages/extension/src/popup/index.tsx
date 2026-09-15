import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './Popup.js';
import '../index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found in popup.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
