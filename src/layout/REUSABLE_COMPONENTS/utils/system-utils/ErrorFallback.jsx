import React from 'react';
import { Typography, Button, Paper, Container, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RCButton from '../../RCBUTTON';
import { useMode } from 'context';

class ErrorFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCopied: false };
  }

  handleCopyErrorDetails = async () => {
    try {
      await navigator.clipboard.writeText(this.props.error.stack);
      this.setState({ hasCopied: true });
      setTimeout(() => this.setState({ hasCopied: false }), 2000); // Reset copy status after 2 seconds
    } catch (error) {
      console.error('Failed to copy error details:', error);
    }
  };
  render() {
    const { error, resetErrorBoundary } = this.props;
    const { hasCopied } = this.state;
    const { theme } = this.props;

    return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            An unexpected error has occurred. Our team has been notified.
          </Typography>
          <Box
            marginTop={2}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            border={'1px solid #f44336'}
          >
            <Typography
              variant="h6"
              color="textPrimary"
              fontWeight="bold"
              gutterBottom
            >
              Error: {error.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {error.message}
            </Typography>
          </Box>
          <Box
            marginTop={2}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            border={'1px solid #f44336'}
          >
            <Typography variant="body1" color="textSecondary">
              {error.stack}
            </Typography>
          </Box>
          <Box marginTop={2} display={'flex'} flexDirection={'row'}>
            <RCButton
              startIcon={<RefreshIcon />}
              color="success"
              size="small"
              variant="holo"
              withContainer={false}
              onClick={() => window.location.reload()}
            >
              Refresh
            </RCButton>
            <RCButton
              startIcon={<FileCopyIcon />}
              variant="holo"
              color="error"
              size="small"
              withContainer={false}
              onClick={this.handleCopyErrorDetails}
              style={{ marginLeft: '10px' }}
            >
              {hasCopied ? 'Copied' : 'Copy Error'}
            </RCButton>
          </Box>
        </Paper>
      </Container>
    );
  }
}

export default ErrorFallback;
