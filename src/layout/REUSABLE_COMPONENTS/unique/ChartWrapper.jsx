import React from 'react';

const ChartWrapper = ({ theme, children, ...rest }) => {
  const chartStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.lenLg1,
    height: theme.heightChartMd,
    width: '100%',
  };

  return (
    <div style={chartStyle} {...rest}>
      {children}
    </div>
  );
};

export default ChartWrapper;
