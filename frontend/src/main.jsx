import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css'; // 👈 Use only this for styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
