import React from 'react';
import { Box, Paper } from '@mui/material';
import { useCommonStyles } from './commonStyles';

const PageLayout = ({ children }) => {
  const classes = useCommonStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paperBackground} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

export default PageLayout;
