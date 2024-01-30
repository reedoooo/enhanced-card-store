import { Grid } from '@mui/material';
import UpdateStatusBox2 from '../../../components/other/InputComponents/UpdateStatusBox2';
import TimeRangeSelector from '../../../components/other/InputComponents/TimeRangeSelector';
import CollectionStatisticsSelector from '../../../components/other/InputComponents/CollectionStatisticsSelector';

export const UpdaterAndStatisticsRow = ({
  isSmall,
  socket,
  timeRange,
  stats,
}) => (
  <Grid
    container
    spacing={2}
    sx={{ marginBottom: 2, flexDirection: isSmall ? 'column' : 'row' }}
  >
    <Grid item xs={12} sm={4}>
      <UpdateStatusBox2 socket={socket} />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TimeRangeSelector />
    </Grid>
    <Grid item xs={12} sm={4}>
      <CollectionStatisticsSelector timeRange={timeRange} stats={stats} />
    </Grid>
  </Grid>
);
