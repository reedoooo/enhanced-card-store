import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useMode } from '../context';
import PieChartIcon from '@mui/icons-material/PieChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MDBox from '../layout/REUSABLE_COMPONENTS/MDBOX';

const StatisticCard = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  background: theme.palette.backgroundA.lightest,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  '@media (max-width: 600px)': {
    padding: theme.spacing(1), // Reduced padding on mobile
  },
}));

const StatisticHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  // color: theme.palette.backgroundA.lightest,
  marginBottom: theme.spacing(1),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const DataContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'auto',
  maxHeight: 'calc(100% - 40px)', // Adjust the height based on header size
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexGrow: 1,
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.backgroundA.lighter}`,
  marginBottom: theme.spacing(2),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using Flexbox
  justifyContent: 'center', // Horizontally center the content
  alignItems: 'center', // Vertically center the content
  overflow: 'auto', // Handle overflow
  padding: theme.spacing(2),
  height: '100%', // Ensure it takes the full height of its parent
}));

const iconComponents = {
  PieChart: PieChartIcon,
  AttachMoney: AttachMoneyIcon,
  EmojiEvents: EmojiEventsIcon,
};

const StatisticsDisplaySection = ({ iconName, title, renderContent }) => {
  const { theme } = useMode();
  const IconComponent = iconComponents[iconName];
  // console.log('chartData', chartData);
  return (
    <StatisticCard theme={theme}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // height: '100%',
          // width: '100%',
          justifyContent: 'center',
        }}
      >
        <HeaderBox theme={theme}>
          {IconComponent && (
            <Box sx={{ paddingRight: theme.spacing(1) }}>
              <IconComponent />
            </Box>
          )}
          <StatisticHeader
            variant="h6"
            sx={{
              color: theme.palette.backgroundE.dark,
            }}
          >
            {title}
          </StatisticHeader>
        </HeaderBox>
        <MDBox theme={theme} sx={{ maxWidth: '100%', maxHeight: '100%' }}>
          {renderContent()}
        </MDBox>
      </CardContent>
    </StatisticCard>
  );
};

StatisticsDisplaySection.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  renderContent: PropTypes.func.isRequired,
};

export default StatisticsDisplaySection;
