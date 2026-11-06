import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from '@/app/app';
import { store } from '@/app/store';
import { ErrorBoundary } from '@/ui/error-boundary/error-boundary';
import './styles/base.css';
import './styles/fonts.css';
import './styles/global.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
