import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useMode } from '../../../context';

// Define styled components
const StatisticPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.backgroundA.lightest,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StatisticHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 'bold',
  color: theme.palette.backgroundA.dark,
}));

const CardDetail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:first-of-type': {
    marginRight: theme.spacing(1),
  },
}));

const TopFiveExpensiveCards = ({ topFiveCards, isLoading }) => {
  const theme2 = useTheme();
  const { theme } = useMode();

  // Function to render skeleton loaders
  const renderSkeletons = () => {
    return Array.from(new Array(5)).map((_, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing(0.5),
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&:last-child': {
            borderBottom: 'none',
          },
        }}
      >
        <Skeleton variant="text" width={40} />
        <Skeleton variant="text" width="80%" />
      </Box>
    ));
  };

  return (
    <Grid item xs={12} sm={4}>
      <StatisticPaper theme={theme}>
        <StatisticHeader variant="h6" theme={theme}>
          Top Five Most Expensive Cards
        </StatisticHeader>
        <Box
          sx={{
            width: '100%',
            height: '150px',
            overflow: 'auto',
          }}
        >
          {!topFiveCards || isLoading
            ? renderSkeletons()
            : topFiveCards.map((card, index) => (
                <Box
                  key={card.id || index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: theme.spacing(0.5),
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <CardDetail variant="body2" theme={theme}>
                    {index + 1}.
                  </CardDetail>
                  <CardDetail variant="body2" theme={theme}>
                    {card?.name} - ${card?.price?.toFixed(2)}
                  </CardDetail>
                </Box>
              ))}
        </Box>
      </StatisticPaper>
    </Grid>
  );
};

export default TopFiveExpensiveCards;
