// PortfolioContent.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the icon for the back button
import DashboardLayout from './DashBoard/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import ComplexStatisticsCard from '../../components/other/dataDisplay/ComplexStatisticsCard';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import CollectionsIcon from '@mui/icons-material/Collections';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DataTable from '../../components/grids/collectionGrids';
import collectionPortfolioData from './data/collectionPortfolioData';
const commonMDBoxStyles = {
  py: 3,
  px: { xs: 2, sm: 3, md: 4 },
  variant: 'gradient',
  borderRadius: 'lg',
  coloredShadow: 'info',
  background: 'linear-gradient(60deg, #26c6da, #00acc1)',
  boxShadow:
    '0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 172, 193, 0.4)',
};

const commonInnerMDBoxStyles = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  gap: theme.spacing(2),
  background: '#333',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: 2,
});
// Material Dashboard 2 React example components
const SectionHeader = ({ title }) => (
  <MDBox sx={commonMDBoxStyles}>
    <MDTypography
      variant="h6"
      color="white"
      sx={{
        fontWeight: 500,
        userSelect: 'none',
        px: { xs: 1, sm: 2 },
      }}
    >
      {title}
    </MDTypography>
  </MDBox>
);
const CollectionPortfolioContent = ({ selectedCards, removeCard, onBack }) => {
  const { theme } = useMode();

  const { selectedCollection, totalQuantity } = useCollectionStore();
  const [collectionName, setCollectionName] = useState(
    selectedCollection?.name || ''
  );
  const { columns, data } = collectionPortfolioData(selectedCollection?.cards);

  return (
    <React.Fragment>
      <DashboardLayout>
        <MDBox py={3}>
          <PortfolioBoxB theme={theme}>
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
                <AttachMoneyIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />{' '}
                Total Value: ${selectedCollection?.totalPrice}
              </MDTypography>
              <MDTypography variant="h6" color="white">
                <FormatListNumberedIcon
                  sx={{ verticalAlign: 'bottom', mr: 1 }}
                />{' '}
                Unique Cards: {totalQuantity}
              </MDTypography>
              <MDTypography variant="h6" color="white">
                <TrendingUpIcon sx={{ verticalAlign: 'bottom', mr: 1 }} />{' '}
                Today&apos;s Performance: {totalQuantity}
              </MDTypography>
            </MDBox>
            {/* STATISTICS CARDS */}
            <MDBox pt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                  <MDBox mb={1.5}>
                    <ComplexStatisticsCard
                      color="dark"
                      icon="weekend"
                      title="Cards Added"
                      count={selectedCollection.cards.reduce(
                        (acc, card) => acc + card.quantity,
                        0
                      )}
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
                      title="Today's Total Value"
                      count={`$${selectedCollection.totalPrice}`}
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
            {/* END STATISTICS CARDS */}
            {/* CHARTS AND TABLES */}
            <MDBox mt={4.5}>
              {/* PORTFOLIO CHARTS */}
              <Grid container spacing={1}>
                <Grid item sm={12} md={12} lg={7}>
                  <Card>
                    <SectionHeader title="Collection Portfolio Chart" />
                    {/* </MDBox> */}
                    <MDBox maxWidth="lg" sx={commonInnerMDBoxStyles(theme)}>
                      <CollectionPortfolioChartContainer
                        selectedCards={selectedCards}
                        removeCard={removeCard}
                      />
                    </MDBox>
                  </Card>
                </Grid>
                {/* PORTFOLIO CARD LIST TABLE */}
                <Grid item sm={12} md={12} lg={5}>
                  {/* <CardListContainerBox> */}
                  {/* <CardListContainerGrid> */}
                  <Grid item xs={12}>
                    <Card>
                      <SectionHeader title="Collection Card List" />
                      <MDBox maxWidth="lg" sx={commonInnerMDBoxStyles(theme)}>
                        <DataTable
                          table={{ columns, data }}
                          isSorted={true}
                          entriesPerPage={{
                            defaultValue: 10,
                            entries: [5, 10, 15, 20, 25],
                          }}
                          entriesPerPageOptions={{
                            defaultValue: 10,
                            options: [5, 10, 15, 20, 25],
                          }}
                          canSearch={true}
                          showTotalEntries={true}
                          noEndBorder
                        />
                      </MDBox>
                    </Card>
                  </Grid>
                  {/* </CardListContainerGrid> */}
                  {/* </CardListContainerBox> */}
                </Grid>
              </Grid>
            </MDBox>
          </PortfolioBoxB>
        </MDBox>
      </DashboardLayout>
    </React.Fragment>
  );
};

export default CollectionPortfolioContent;
