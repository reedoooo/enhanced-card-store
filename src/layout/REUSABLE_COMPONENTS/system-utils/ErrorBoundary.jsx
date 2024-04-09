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
    // Log the error to an error reporting service
    // logErrorToService(error, errorInfo);
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
          <p>Were sorry for the inconvenience. Here are a few options:</p>
          <div>
            <button
              onClick={this.handleReload}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Try Again
            </button>
            <button
              onClick={() =>
                this.props.onReport && this.props.onReport(this.state)
              }
              style={{ padding: '10px 20px', cursor: 'pointer' }}
            >
              Report Problem
            </button>
          </div>
          {/* Additional navigation options can be added here */}
          <details
            style={{
              whiteSpace: 'pre-wrap',
              marginTop: '20px',
              textAlign: 'left',
            }}
          >
            <summary>Details</summary>
            {this.state.error && this.state.error?.toString()}
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
