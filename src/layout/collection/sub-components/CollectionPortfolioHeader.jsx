import React from 'react';
import { IconButton, Box, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CollectionsIcon from '@mui/icons-material/Collections';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MDBox from '../../REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import MDAvatar from '../../REUSABLE_COMPONENTS/MDAVATAR';
import { useMode } from '../../../context';

const HeaderItem = ({ icon: IconComponent, label, value }) => {
  const { theme } = useMode();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <MDBox display="flex" alignItems="center" justifyContent="space-between">
        <MDBox display="flex" alignItems="center">
          <MDAvatar>
            <IconComponent sx={{ verticalAlign: 'bottom', mr: 1 }} />
          </MDAvatar>
          <MDTypography variant="h6" color="white">
            {label}:
          </MDTypography>
        </MDBox>
        <MDTypography
          variant="body2"
          sx={{ color: theme.palette.info.contrastText }}
        >
          {value}
        </MDTypography>
      </MDBox>
    </Grid>
  );
};

const CollectionPortfolioHeader = ({
  onBack,
  collectionName,
  selectedCollection,
  totalQuantity,
}) => {
  const { theme } = useMode();
  if (!selectedCollection) {
    return null;
  }
  return (
    <MDBox
      sx={{
        mx: 2,
        mt: -3,
        py: 2,
        px: 2,
        backgroundColor: theme.palette.info.main,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        onClick={onBack}
        aria-label="Back to Collections"
        color="inherit"
        sx={{ marginRight: '4px' }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={2}>
        <HeaderItem
          icon={CollectionsIcon}
          label="Portfolio Selected"
          value={collectionName}
        />
        <HeaderItem
          icon={AttachMoneyIcon}
          label="Total Value"
          value={`$${selectedCollection?.totalPrice}`}
        />
        <HeaderItem
          icon={FormatListNumberedIcon}
          label="Unique Cards"
          value={totalQuantity}
        />
        <HeaderItem
          icon={TrendingUpIcon}
          label="Today's Performance"
          value={totalQuantity}
        />
      </Grid>
    </MDBox>
  );
};
export default CollectionPortfolioHeader;
