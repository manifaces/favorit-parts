import { Component } from 'react';
import { Button } from '../Button';
import { AlertCircleIcon } from '../Icon';
import s from './ErrorBoundary.module.scss';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={s.ErrorBoundary} role="alert">
          <div className={s.ErrorBoundary__content}>
            <AlertCircleIcon className={s.ErrorBoundary__icon} />

            <div className={s.ErrorBoundary__copy}>
              <h1 className={s.ErrorBoundary__title}>Не удалось отобразить приложение</h1>
              <p className={s.ErrorBoundary__description}>Перезагрузите страницу, чтобы попробовать снова.</p>
            </div>

            <Button onClick={() => window.location.reload()}>Перезагрузить страницу</Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
