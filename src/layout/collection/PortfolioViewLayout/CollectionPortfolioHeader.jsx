import React, { useEffect, useState } from 'react';
import { IconButton, Grid, Grow } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { useMode } from 'context';
import IconStatWrapper from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/IconStatWrapper';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashboardBox';
import { collectionPortfolioHeaderItems } from 'data';

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
  const [selectedCollection, setSelectedCollection] = useState(collection);
  const [portfolioItems, setPortfolioItems] = useState([]);
  useEffect(() => {
    const items = collectionPortfolioHeaderItems(selectedCollection);
    setPortfolioItems(items);
  }, [selectedCollection]);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedCollection') {
        setSelectedCollection(JSON.parse(event.newValue));
        setPortfolioItems(
          collectionPortfolioHeaderItems(JSON.parse(event.newValue))
        );
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
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
        <ArrowBackIcon color={theme.palette.text.colorPrimary} />
      </IconButton>
      <Grid container spacing={2}>
        {portfolioItems?.map((item, index) => (
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
