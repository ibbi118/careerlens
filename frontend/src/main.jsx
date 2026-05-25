import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#1E1E1E',
          color: '#F0EDE5',
          fontSize: '13px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          borderRadius: '10px',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '360px',
        },
        success: {
          iconTheme: { primary: '#004643', secondary: '#F0EDE5' },
        },
        error: {
          iconTheme: { primary: '#dc2626', secondary: '#fff' },
        },
      }}
    />
  </StrictMode>
);
