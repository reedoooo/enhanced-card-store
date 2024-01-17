// PortfolioContent.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
// eslint-disable-next-line max-len
import CollectionPortfolioChartContainer from '../../containers/collectionPageContainers/CollectionPortfolioChartContainer';
// eslint-disable-next-line max-len
import CollectionPortfolioListContainer from '../../containers/collectionPageContainers/CollectionPortfolioListContainer';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { PortfolioBoxB } from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode } from '../../context';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the icon for the back button

const CollectionPortfolioContent = ({ selectedCards, removeCard, onBack }) => {
  const { theme } = useMode();

  const { selectedCollection } = useCollectionStore();
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    if (selectedCollection?.name) {
      setCollectionName(selectedCollection.name);
    }
  }, [selectedCollection]);

  return (
    <PortfolioBoxB theme={theme}>
      <Box
        sx={{
          maxWidth: '100%',
          background: theme.palette.backgroundB.darker,
          borderRadius: theme.shape.borderRadius,
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          width: {
            xs: '100%', // Full width on mobile screens
            md: '100%', // Full width on mobile screens
          },
          padding: theme.spacing(1), // Reduced padding for mobile screens
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            paddingLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.backgroundA.dark,
            margin: '0',
          }}
        >
          <IconButton
            color={theme.palette.success.main}
            background={theme.palette.backgroundA.dark}
            sx={{
              color: theme.palette.backgroundA.dark,
              // background: theme.palette.backgroundA.dark,
              marginRight: '4px',
            }}
          >
            <AssessmentIcon />
          </IconButton>
          Cards in Portfolio
        </Typography>
        {/* <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ marginRight: theme.spacing(2) }}
        >
          Back
        </Button> */}
        <IconButton
          onClick={onBack}
          aria-label="Back to Collections"
          color={theme.palette.success.main}
          background={theme.palette.backgroundA.dark}
          sx={{
            color: theme.palette.backgroundA.dark,

            // background: theme.palette.backgroundA.dark,
            marginRight: '4px',
          }}
        >
          <ArrowBackIcon />
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              // fontWeight: 'bold',
              paddingLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.backgroundA.dark,
              margin: '0',
            }}
          >
            Back to Collections
          </Typography>
        </IconButton>
      </Box>
      {/* <HeaderTitle title={collectionName} size="large" location="center" /> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CollectionPortfolioChartContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CollectionPortfolioListContainer
            selectedCards={selectedCards}
            removeCard={removeCard}
          />
        </Grid>
      </Grid>
    </PortfolioBoxB>
  );
};

export default CollectionPortfolioContent;
