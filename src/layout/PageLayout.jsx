import React from 'react';
import { Box, Paper } from '@mui/material';
import { useCommonStyles } from './commonStyles';
import { Skeleton } from '@mui/joy';
import { usePageContext } from '../context';

const PageLayout = ({ children }) => {
  const classes = useCommonStyles();
  const { isLoading } = usePageContext();
  return (
    <React.Fragment>
      <Skeleton loading={isLoading} variant="overlay">
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
      </Skeleton>
    </React.Fragment>
  );
};

export default PageLayout;
