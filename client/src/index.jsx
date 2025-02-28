import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <App />
</BrowserRouter>
);