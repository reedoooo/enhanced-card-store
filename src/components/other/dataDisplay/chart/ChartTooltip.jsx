import React from 'react';
import { makeStyles, Tooltip, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  tooltipTarget: {
    cursor: 'pointer', // Change the cursor to indicate it's hoverable
  },
}));

const ChartTooltip = ({ point, lastData, hoveredData, latestData }) => {
  const classes = useStyles();
  if (!point) return null;
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
