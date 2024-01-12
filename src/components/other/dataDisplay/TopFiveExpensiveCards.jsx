import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { useMode } from '../../../context';

// Define styled components
const StatisticPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
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
  color: theme.palette.primary.main,
}));

const CardDetail = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:first-of-type': {
    marginRight: theme.spacing(1),
  },
}));

const TopFiveExpensiveCards = ({ topFiveCards }) => {
  const theme2 = useTheme();
  const { theme } = useMode();

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
          {topFiveCards.map((card, index) => (
            <Box
              key={card?.cardData?.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'space-between',
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
                {card?.cardData?.name} - ${card?.cardData?.price?.toFixed(2)}
              </CardDetail>
            </Box>
          ))}
        </Box>
      </StatisticPaper>
    </Grid>
  );
};

export default TopFiveExpensiveCards;
