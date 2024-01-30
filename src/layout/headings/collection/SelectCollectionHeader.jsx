import React from 'react';
import { Grid, Button } from '@mui/material';
import { useAuthContext, useMode } from '../../../context';
import { Card, Typography } from '@mui/joy';

const SelectCollectionHeader = ({ openNewDialog }) => {
  const { theme } = useMode();
  const { basicData } = useAuthContext();
  return (
    <Grid container sx={{ padding: 1, alignItems: 'center' }}>
      <Grid item xs={12} sm={6}>
        <Card>
          <Typography level="title-lg">
            Collection Portfolio
            <Typography
              level="title-lg"
              textColor="var(--joy-palette-success-plainColor)"
              fontFamily="monospace"
              sx={{ opacity: '50%' }}
            >
              {`${basicData?.firstName}'s Portfolio`}
            </Typography>
          </Typography>
          <Typography level="body-md">
            TEXT TEXT TEXT
            <Typography
              level="body-md"
              textColor="var(--joy-palette-success-plainColor)"
              fontFamily="monospace"
              sx={{ opacity: '50%' }}
            >
              body-md
            </Typography>
          </Typography>
        </Card>
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
