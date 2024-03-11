import { Grid } from '@mui/material';
import TopCardsDisplay from './TopCardsDisplay';

export const TopCardsDisplayRow = ({ isSmall, theme }) => (
  <Grid
    container
    spacing={2}
    py={2}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      background: theme.palette.backgroundB.darker,
      padding: isSmall ? theme.spacing(1) : theme.spacing(2),
      color: '#fff',
      borderRadius: 4,
    }}
  >
    <Grid item xs={12}>
      <TopCardsDisplay />
    </Grid>
  </Grid>
);
