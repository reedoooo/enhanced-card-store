import React from 'react';
import { Container, Grid } from '@mui/material';
import MDBox from './MDBOX';

const GridLayout = ({ children, containerStyles }) => (
  <MDBox
    sx={{
      ...containerStyles,
      width: '100%',
      minWidth: '99%',
    }}
  >
    <Grid
      container
      spacing={1}
      sx={
        {
          // height: '99%',
          // // display: 'flex',
          // flexDirection: 'row',
          // width: '100%',
          // minWidth: '99%',
        }
      }
    >
      {children}
    </Grid>
  </MDBox>
);

export default GridLayout;
