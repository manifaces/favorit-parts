import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert">
          <h1>Не удалось отобразить приложение</h1>
          <p>Перезагрузите страницу, чтобы попробовать снова.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
