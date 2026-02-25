import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
