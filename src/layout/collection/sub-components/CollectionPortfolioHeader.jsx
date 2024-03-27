import React, { useEffect } from 'react';
import { IconButton, Box, Grid, Grow, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CollectionsIcon from '@mui/icons-material/Collections';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../context';
import { DEFAULT_COLLECTION } from '../../../context/constants';
import uniqueTheme from '../../REUSABLE_COMPONENTS/unique/uniqueTheme';
import IconStatWrapper from '../../REUSABLE_COMPONENTS/unique/IconStatWrapper';
import DashboardBox from '../../REUSABLE_COMPONENTS/DashboardBox';
import { PageHeaderSkeleton } from '../../REUSABLE_COMPONENTS/SkeletonVariants';
import RCWrappedIcon from '../../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';

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

const CollectionPortfolioHeader = ({ onBack, collection, allCollections }) => {
  const { theme } = useMode();
  const headerIcons = [
    CollectionsIcon,
    AttachMoneyIcon,
    FormatListNumberedIcon,
    TrendingUpIcon,
  ];
  useEffect(() => {
    console.log('collection', collection);
  }, [collection]);

  if (
    !collection ||
    collection === DEFAULT_COLLECTION
    // allCollections.length === 0
  ) {
    return <PageHeaderSkeleton />;
  }
  const headerItems = [
    {
      // icon: <CollectionsIcon />,
      icon: 'collections',
      label: 'Portfolio Selected',
      value: collection?.name || 'Select a collection to view its statistics',
      delay: 0,
    },
    {
      // icon: <AttachMoneyIcon />,
      icon: 'attach_money',
      label: 'Total Value',
      value:
        collection?.totalPrice || 'Select a collection to view its statistics',
      delay: 200,
    },
    {
      // icon: <FormatListNumberedIcon />,
      icon: 'format_list_numbered',
      label: 'Number of Unique Cards',
      value:
        collection?.cards?.length ||
        'Select a collection to view its statistics',
      delay: 400,
    },
    {
      // icon: <TrendingUpIcon />,
      icon: 'trending_up',
      label: "Today's Performance",
      value:
        collection?.statistics?.percentChange ||
        'Select a collection to view its statistics',
      delay: 600,
    },
  ];

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
        {headerItems?.map((item, index) => (
          <HeaderItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            delay={index * 500} // Delay each item's animation onset progressively
          />
        ))}
        {/* </TransitionGroup> */}
      </Grid>
    </DashboardBox>
  );
};
export default CollectionPortfolioHeader;
