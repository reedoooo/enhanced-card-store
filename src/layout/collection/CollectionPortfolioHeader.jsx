import React, { useEffect } from 'react';
import { IconButton, Box, Grid, Grow, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../context';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import IconStatWrapper from '../REUSABLE_COMPONENTS/unique/IconStatWrapper';
import DashboardBox from '../REUSABLE_COMPONENTS/layout-utils/DashboardBox';
// import { PageHeaderSkeleton } from '../REUSABLE_COMPONENTS/system-utils/SkeletonVariants';
import { collectionPortfolioHeaderItems } from '../../data/collectionPortfolioHeaderItems';

const HeaderItem = ({ icon, label, value, delay }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grow
        in
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 + delay }}
      >
        <MDBox>
          <IconStatWrapper
            label={label}
            isPrimary={true}
            value={value}
            icon={icon}
            theme={uniqueTheme}
          />
        </MDBox>
      </Grow>
    </Grid>
  );
};
const CollectionPortfolioHeader = ({ onBack }) => {
  const { theme } = useMode();
  const selected = localStorage.getItem('selectedCollection');
  const collection = JSON.parse(selected);
  const items = collectionPortfolioHeaderItems(collection);
  return (
    <DashboardBox
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirectino: 'row',
        alignItems: 'center',
        padding: 1,
        width: '100%',
      }}
    >
      <IconButton
        onClick={onBack}
        aria-label="Back to Collections"
        color="inherit"
        sx={{
          marginRight: '6px',
          background: 'white',
        }}
      >
        <ArrowBackIcon color={theme.colorPrimary} />
      </IconButton>
      <Grid container spacing={2}>
        {items?.map((item, index) => (
          <HeaderItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            delay={index * 500}
          />
        ))}
      </Grid>
    </DashboardBox>
  );
};
export default CollectionPortfolioHeader;
