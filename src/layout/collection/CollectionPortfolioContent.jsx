// PortfolioContent.jsx
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
// eslint-disable-next-line max-len
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import { useMode } from '../../context';
import DashboardLayout from '../Containers/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import collectionPortfolioData from './data/collectionPortfolioData';
import ChartGridLayout from './collectionGrids/ChartGridLayout';
import StatisticsCardGrid from './collectionGrids/StatisticsCardsGrid';
import CollectionPortfolioHeader from './sub-components/CollectionPortfolioHeader';

const CollectionPortfolioContent = ({ selectedCards, removeCard, onBack }) => {
  const { theme } = useMode();

  const { selectedCollection, totalQuantity } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name || ''
  );
  const { columns, data } = collectionPortfolioData(
    selectedCollection?.cards,
    null,
    null,
    null
  );

  return (
    <DashboardLayout>
      <Grid container spacing={1}>
        {/* HEADER */}
        <Grid item xs={12}>
          <CollectionPortfolioHeader
            onBack={onBack}
            collectionName={collectionName}
            selectedCollection={selectedCollection}
            totalQuantity={totalQuantity}
          />
        </Grid>
        {/* STATISTICS FEATURE GRID */}
        <Grid item xs={12}>
          <StatisticsCardGrid selectedCollection={selectedCollection} />
        </Grid>
        {/* CHARTS */}
        <Grid item xs={12}>
          <ChartGridLayout
            selectedCards={selectedCards}
            removeCard={removeCard}
            columns={columns}
            data={data}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CollectionPortfolioContent;
