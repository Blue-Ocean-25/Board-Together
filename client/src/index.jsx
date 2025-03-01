import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
</BrowserRouter>
);