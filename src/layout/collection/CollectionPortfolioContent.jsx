// PortfolioContent.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
// eslint-disable-next-line max-len
import CollectionPortfolioChartContainer from './CollectionPortfolioChartContainer';
// eslint-disable-next-line max-len
import { useCollectionStore } from '../../context/MAIN_CONTEXT/CollectionContext/CollectionContext';
import {
  CardListContainerBox,
  CardListContainerGrid,
  PortfolioBoxB,
} from '../../context/hooks/style-hooks/usePortfolioStyles';
import { useMode } from '../../context';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the icon for the back button
import CardList from '../../components/grids/collectionGrids/CardList';
import DashboardLayout from './DashBoard/DashBoardLayout';
import MDBox from './MDBOX';
import ComplexStatisticsCard from './ComplexStatisticsCard';
import MDTypography from './MDTypography';
import CollectionsIcon from '@mui/icons-material/Collections';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const CollectionPortfolioContent = ({ selectedCards, removeCard, onBack }) => {
  const { theme } = useMode();

  const { selectedCollection, totalQuantity } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name || ''
  );

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <PortfolioBoxB theme={theme}>
          {/* <Box
            sx={{
              maxWidth: '100%',
              background: theme.palette.backgroundB.darker,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              flexDirection: 'row',
              margin: 'auto',
              width: { xs: '100%', md: '100%' },
              padding: theme.spacing(1),
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
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                paddingLeft: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AssessmentIcon />
              Cards in Portfolio
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                paddingLeft: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Total Cards: {totalQuantity}
            </Typography>
          </Box> */}
          <MDBox
            mx={2}
            mt={-3}
            py={2}
            px={2}
            variant="gradient"
            bgColor="info"
            coloredShadow="info"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            borderRadius="xl"
          >
            <IconButton
              onClick={onBack}
              aria-label="Back to Collections"
              color="inherit"
              sx={{ marginRight: '4px' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <MDTypography variant="h6" color="white">
              <CollectionsIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />{' '}
              Portfolio Selected: {collectionName}
            </MDTypography>
            <MDTypography variant="h6" color="white">
              <AttachMoneyIcon sx={{ verticalAlign: 'bottom', mr: 1 }} /> Total
              Value: ${selectedCollection?.totalPrice}
            </MDTypography>
            <MDTypography variant="h6" color="white">
              <FormatListNumberedIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />{' '}
              Total Cards: {totalQuantity}
            </MDTypography>
            <MDTypography variant="h6" color="white">
              <TrendingUpIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />{' '}
              Today&apos;s Performance: {totalQuantity}
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="weekend"
                    title="Bookings"
                    count={281}
                    percentage={{
                      color: 'success',
                      amount: '+55%',
                      label: 'than lask week',
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title="Today's Users"
                    count="2,300"
                    percentage={{
                      color: 'success',
                      amount: '+3%',
                      label: 'than last month',
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon="store"
                    title="Revenue"
                    count="34k"
                    percentage={{
                      color: 'success',
                      amount: '+1%',
                      label: 'than yesterday',
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="person_add"
                    title="Followers"
                    count="+91"
                    percentage={{
                      color: 'success',
                      amount: '',
                      label: 'Just updated',
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item sm={12} md={7}>
                <CollectionPortfolioChartContainer
                  selectedCards={selectedCards}
                  removeCard={removeCard}
                />
              </Grid>

              <Grid item sm={12} md={5}>
                <CardListContainerBox>
                  <CardListContainerGrid>
                    <MDBox pt={3}>
                      <CardList
                        selectedCards={selectedCards}
                        removeCard={removeCard}
                      />
                    </MDBox>
                  </CardListContainerGrid>
                </CardListContainerBox>
              </Grid>
            </Grid>
          </MDBox>
        </PortfolioBoxB>
      </MDBox>
    </DashboardLayout>
  );
};

export default CollectionPortfolioContent;
