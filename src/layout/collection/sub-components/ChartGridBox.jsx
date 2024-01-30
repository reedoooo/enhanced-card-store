import { Grid } from '@mui/material';

export const ChartGridBox = ({ children }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
);

export default ChartGridBox;
