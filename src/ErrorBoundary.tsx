import React, { Component, ErrorInfo } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="app__fault">
          Something went wrong ❌
          <button
            className="btn-reset primary-btn"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
