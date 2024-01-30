import React from 'react';
import { Container, Grid } from '@mui/material';

const GridLayout = ({ children, containerStyles }) => (
  <Container
    sx={{
      ...containerStyles,
      width: '100%',
      minWidth: '99%',
    }}
  >
    <Grid container spacing={1} sx={{}}>
      {children}
    </Grid>
  </Container>
);

export default GridLayout;
