import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const LinearChart = ({ options }) => {
  const { createUserCollection, collectionData, collectionValue } =
    useCollectionStore();

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveLine
        data={collectionData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'cards',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'value',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        // You can add more options here to customize the appearance
        // see https://nivo.rocks/line/
      />
    </div>
  );
};

export default LinearChart;
