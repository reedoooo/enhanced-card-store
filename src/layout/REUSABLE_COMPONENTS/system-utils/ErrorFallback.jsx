import React from 'react';
import { Typography, Button, Paper, Container, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileCopyIcon from '@mui/icons-material/FileCopy';

class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCopied: false };
  }

  handleCopyErrorDetails = () => {
    navigator.clipboard.writeText(this.props.error.stack).then(
      () => this.setState({ hasCopied: true }),
      () => this.setState({ hasCopied: false })
    );
  };

  render() {
    const { error, resetErrorBoundary } = this.props;
    const { hasCopied } = this.state;

    return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            An unexpected error has occurred. Our team has been notified.
          </Typography>
          <Box marginTop={2}>
            <Typography variant="body2" color="textSecondary">
              {error.toString()}
            </Typography>
          </Box>
          <Box marginTop={2}>
            <Button
              startIcon={<RefreshIcon />}
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button
              startIcon={<FileCopyIcon />}
              variant="outlined"
              color="secondary"
              onClick={this.handleCopyErrorDetails}
              style={{ marginLeft: '10px' }}
            >
              {hasCopied ? 'Copied' : 'Copy Error'}
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }
}

export default ErrorFallback;
