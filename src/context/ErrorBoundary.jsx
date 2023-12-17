import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error page
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Oops! Something went wrong.</h1>
          <p>
            We&apos;re sorry for the inconvenience. Please try reloading the
            page.
          </p>
          <button
            onClick={this.handleReload}
            style={{ padding: '10px 20px', cursor: 'pointer' }}
          >
            Reload
          </button>
          <details
            style={{
              whiteSpace: 'pre-wrap',
              marginTop: '20px',
              textAlign: 'left',
            }}
          >
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
