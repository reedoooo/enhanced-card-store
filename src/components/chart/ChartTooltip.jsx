import React from 'react';
import { makeStyles, Tooltip, Typography } from '@mui/material';

// Define your styles here
const useStyles = makeStyles((theme) => ({
  // ... your other styles
  tooltipTarget: {
    cursor: 'pointer', // Change the cursor to indicate it's hoverable
  },
}));

const ChartTooltip = ({ point, lastData, hoveredData, latestData }) => {
  const classes = useStyles();

  if (!point) return null;

  // Formatting the date just once to be used in multiple places
  const formattedTime = hoveredData
    ? new Date(hoveredData.x).toLocaleString()
    : new Date((latestData || lastData).x).toLocaleString();

  const formattedValue = `$${
    hoveredData ? hoveredData.y : (latestData || lastData)?.y
  }`;

  return (
    <>
      <Tooltip title={`Time: ${formattedTime}`} arrow>
        <Typography className={classes.tooltipTarget}>
          {formattedTime}
        </Typography>
      </Tooltip>
      <Tooltip title={`Value: ${formattedValue}`} arrow>
        <Typography className={classes.tooltipTarget}>
          {formattedValue}
        </Typography>
      </Tooltip>
    </>
  );
};

export default ChartTooltip;
