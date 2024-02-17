import { Grid } from '@mui/material';
import UpdateStatusBox2 from '../../../components/other/InputComponents/UpdateStatusBox2';
import TimeRangeSelector from '../../../components/forms/TimeRangeSelector';
import CollectionStatisticsSelector from '../../../components/forms/CollectionStatisticsSelector';

/**
 * Renders a row of components for updating status, selecting time range,
 * and showing collection statistics. Adapts layout based on screen size.
 *
 * @param {Object} props Component props.
 * @param {boolean} props.isSmall Indicates if the screen size is small.
 * @param {Object} props.socket Socket connection for real-time updates.
 * @param {Object} props.timeRange Selected time range for statistics.
 * @param {Object} props.stats Collection statistics.
 */
export const UpdaterAndStatisticsRow = ({
  isSmall,
  socket,
  timeRange,
  stats,
}) => (
  <Grid
    container
    spacing={2}
    sx={{
      marginTop: 2,
      marginBottom: 2,
      flexDirection: isSmall ? 'column' : 'row',
    }}
  >
    {/* Update Status Box */}
    <Grid item xs={12} sm={4}>
      {/* <UpdateStatusBox2 socket={socket} /> */}
    </Grid>

    {/* Time Range Selector */}
    <Grid item xs={12} sm={4}>
      <TimeRangeSelector />
    </Grid>

    {/* Collection Statistics Selector */}
    <Grid item xs={12} sm={4}>
      <CollectionStatisticsSelector />
    </Grid>
  </Grid>
);
