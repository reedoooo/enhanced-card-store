import React from 'react';
import {
  Typography,
  Box,
  useTheme,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';
import { styled } from '@mui/styles';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
const StatBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: theme.spacing(1), // Adds spacing between items
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Hover effect
  },
}));
const styles = {
  container: {
    // padding: '15px',
    border: '2px solid #444',
    borderRadius: '8px',
    backgroundColor: '#222',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '100%', // Adjusted for full width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  statusBox: {
    width: '100%', // Set to full width
    // marginTop: '15px',
    padding: '3px',
    margin: '2px',
    // padding: '10px',
    background: '#333',
    borderRadius: '6px',
    border: '1px solid #555',
  },
};
const CollectionValueTracker = ({ stats }) => {
  const theme = useTheme();
  const { getTotalPrice, selectedCollection } = useCollectionStore();
  const twentyFourHourChange = stats.twentyFourHourAverage;
  const newTotal = getTotalPrice();

  console.log('newTotal:', newTotal);

  const statsArray = [
    {
      label: 'Total Collection Value',
      value: `$${newTotal}`,
    },
    {
      label: '24 Hour Change (%)',
      value: `${twentyFourHourChange?.percentageChange}`,
      isIncrease: twentyFourHourChange?.priceIncreased,
    },
    {
      label: '24 Hour Change ($)',
      value: `$${twentyFourHourChange?.priceChange}`,
      isIncrease: twentyFourHourChange?.priceIncreased,
    },
    // Additional stats
    {
      label: 'Last Price',
      value: `${selectedCollection?.lastSavedPrice?.num}`,
    },
    { label: 'Average Price', value: `${stats?.average}` },
    { label: 'Volume', value: `${stats?.volume}` },
    { label: 'Volatility', value: `${stats?.volatility}` },
    { label: 'High Point', value: `${twentyFourHourChange?.highPoint}` },
    { label: 'Low Point', value: `${twentyFourHourChange?.lowPoint}` },
    // TODO: add stats for top performing cards in certain sets
  ];

  return (
    <div style={styles.container}>
      <Container sx={{ w: 'maxContent', padding: 1, margin: 0 }}>
        <Box sx={{ width: '100%' }}>
          <div style={styles.statusBox}>
            <Typography variant="subtitle1">
              Performance:{' '}
              {twentyFourHourChange?.percentageChange > 0
                ? 'Positive'
                : 'Negative'}
            </Typography>
            {/* </div> */}
            {/* <div style={styles.statusBox}> */}
            <Typography variant="body1">
              <ChangeHistoryIcon
                sx={{ background: theme.palette.success.main }}
              />{' '}
              {twentyFourHourChange?.percentageChange}%
            </Typography>
            <Accordion sx={{ w: '100%', overflow: 'visible' }}>
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="collection-stats-content"
                id="collection-stats-header"
              >
                <Typography variant="h6">Collection Statistics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StatBox>
                  {statsArray.map((stat, index) => {
                    const IconComponent =
                      stat?.isIncrease !== undefined
                        ? stat?.isIncrease
                          ? ArrowUpwardIcon
                          : ArrowDownwardIcon
                        : null;
                    const iconColor = stat?.isIncrease
                      ? theme.palette.success.main
                      : theme.palette.error.main;

                    return (
                      <StatItem key={index}>
                        {IconComponent && (
                          <IconComponent
                            sx={{
                              color: iconColor,
                              marginRight: 2,
                              fontSize: '1.5rem',
                            }}
                          />
                        )}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            flexGrow: 1,
                            fontWeight: 'medium',
                            color: 'white',
                          }}
                        >
                          {stat?.label}:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 'bold', color: 'white' }}
                        >
                          {stat?.value}
                        </Typography>
                      </StatItem>
                    );
                  })}
                </StatBox>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default CollectionValueTracker;
