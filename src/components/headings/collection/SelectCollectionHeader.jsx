import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useMode } from '../../../context';

const SelectCollectionHeader = ({ openNewDialog }) => {
  const { theme } = useMode();
  return (
    <Grid container sx={{ padding: 1, alignItems: 'center' }}>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: theme.palette.backgroundA.lighter }}
        >
          Choose a Collection
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          sx={{
            color: theme.palette.backgroundA.contrastTextC,
            background: theme.palette.backgroundA.dark,
            '&:hover': {
              background: theme.palette.backgroundA.darkest,
            },
          }}
          // color={theme.palette.backgroundA.default}
          onClick={openNewDialog}
        >
          Add New Collection
        </Button>
      </Grid>
    </Grid>
  );
};

export default SelectCollectionHeader;
