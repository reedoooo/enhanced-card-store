import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

const MyResponsiveLine = ({
  data,
  handleMouseMove,
  handleMouseLeave,
  tickValues,
  validMarkers,
  greenAccent,
  redAccent,
  grey,
  text,
  TooltipLayer,
}) => (
  <ResponsiveLine
    data={data}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    colors={{ datum: 'color' }} // This is the only change from the original code
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    yFormat="$.2f"
    axisBottom={{
      tickRotation: 0,
      legend: 'Time',
      legendOffset: 40,
      legendPosition: 'middle',
      tickSize: 5,
      tickPadding: 5,
      tickValues: tickValues,
      format: (value) => {
        const d = new Date(value);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      },
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value ($)',
      legendOffset: -50,
      legendPosition: 'middle',
      color: text,
      format: (value) => `$${value?.toFixed(2)}`,
    }}
    margin={{ top: 20, right: 40, bottom: 50, left: 55 }}
    padding={0.5}
    animate={true}
    xScale={{
      type: 'time',
      format: '%Y-%m-%dT%H:%M:%S.%LZ',
      precision: 'millisecond',
      useUTC: false,
    }}
    yScale={{
      type: 'linear',
      min: '0', // Explicitly setting minimum to 0, adjust as needed
      max: 'auto', // Consider setting an explicit max if appropriate
      stacked: false, // Changed to false unless stacking is needed
      reverse: false,
    }}
    curve="catmullRom" // This curve type can create smoother, more wavy lines
    motionConfig="wobbly" // A more dynamic motion configuration
    useMesh={true}
    stiffness={90}
    damping={15}
    enableSlices="x"
    markers={validMarkers}
    layers={[
      'grid',
      'markers',
      'areas',
      'lines',
      'slices',
      'points',
      'axes',
      'legends',
      TooltipLayer,
    ]}
    theme={{
      axis: {
        domain: {
          line: {
            stroke: grey.lightest,
          },
        },
        legend: {
          text: {
            fill: greenAccent.darkest,
            fontSize: 12,
            outlineWidth: 0.1,
            outlineColor: grey.darkest,
          },
        },
        ticks: {
          line: {
            stroke: grey.lightest,
            strokeWidth: 1,
          },
          text: {
            fill: grey.lightest,
          },
        },
      },
      legends: {
        text: {
          fill: grey.lightest,
        },
      },
      tooltip: {
        container: {
          color: grey.darkest,
          borderColor: redAccent.darkest,
        },
      },
    }}
  />
);

export default MyResponsiveLine;
