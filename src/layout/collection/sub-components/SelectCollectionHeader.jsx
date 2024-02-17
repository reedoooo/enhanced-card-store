import React from 'react';
import { Grid, Button } from '@mui/material';
import { useAuthContext, useFormContext, useMode } from '../../../context';
import { Card, Typography } from '@mui/joy';
import MDButton from '../../REUSABLE_COMPONENTS/MDBUTTON';
import CustomButton from '../../../components/buttons/other/CustomButton';
const SelectCollectionHeader = ({ openNewDialog }) => {
  const { theme } = useMode();
  const { basicData } = useAuthContext();
  const { currentForm, setCurrentForm } = useFormContext();
  // Format the current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
              {` ${basicData?.firstName}'s Portfolio`}
            </Typography>
          </Typography>
          <Typography level="body-md">
            Last updated:
            <Typography
              level="body-md"
              textColor="var(--joy-palette-success-plainColor)"
              fontFamily="monospace"
              sx={{ opacity: '50%' }}
            >
              {` ${currentDate}`}
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
        <CustomButton
          text="Add New Collection"
          variant="outlined"
          size="large"
          onClick={() => {
            setCurrentForm('addCollectionForm');
            openNewDialog(true);
          }}
          sx={{
            backgroundColor: theme.palette.backgroundD.lighter,
            color: theme.palette.primary.main,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SelectCollectionHeader;
