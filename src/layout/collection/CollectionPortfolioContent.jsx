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
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { PortfolioBoxB } from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode } from '../../context';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the icon for the back button

const CollectionPortfolioContent = ({ selectedCards, removeCard, onBack }) => {
  const { theme } = useMode();

  const { selectedCollection } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name || ''
  );

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
          width: { xs: '100%', md: '100%' },
          padding: theme.spacing(1),
        }}
      >
        <IconButton
          onClick={onBack}
          aria-label="Back to Collections"
          color="inherit"
          sx={{ marginRight: '4px' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            paddingLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AssessmentIcon />
          Cards in Portfolio
        </Typography>
      </Box>
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
