import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Box, Skeleton } from '@mui/material';
import StatisticsDisplaySection from './StatisticsDisplaySection';
import styled from 'styled-components';
import shortid from 'shortid'; // shortid is a simple library to generate unique ids

const ChartWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PieChartStats = ({ chartData, iconName, title }) => {
  console.log('chartData', chartData);

  // Function to add unique IDs to each chart data entry
  const processDataWithIds = (data) => {
    return data.map((item) => ({
      ...item,
      id: shortid.generate(), // Assigning a unique id
    }));
  };

  const renderPieChart = () => {
    const processedChartData = chartData ? processDataWithIds(chartData) : [];

    return chartData ? (
      <PieChart
        series={[{ data: processedChartData }]}
        minHeight={150}
        minWidth={150}
        width={'100%'}
        height={'100%'}
      />
    ) : (
      <Skeleton variant="rectangular" width={'100%'} height={150} />
    );
  };

  return (
    <StatisticsDisplaySection
      iconName={iconName}
      title={title}
      renderContent={renderPieChart}
    />
  );
};

export default PieChartStats;

// import React, { useMemo } from 'react';
// import {
//   Box,
//   Card,
//   Grid,
//   Icon,
//   Paper,
//   Skeleton,
//   Typography,
// } from '@mui/material';
// // import { styled } from '@mui/system';
// import { useMode } from '../../../../context';
// import { PieChart } from '@mui/x-charts';
// // import { StatisticHeader } from '../../../../context/hooks/style-hooks/usePortfolioStyles';
// import MDBox from '../../../../layout/collection/MDBOX';
// import MDTypography from '../../../../layout/collection/MDTypography';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// const StatisticPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   flexGrow: 1,
//   color: theme.palette.text.secondary,
//   background: theme.palette.backgroundA.lightest,
//   boxShadow: theme.shadows[2],
//   borderRadius: theme.shape.borderRadius,
//   transition: 'box-shadow 0.3s',
//   '&:hover': {
//     boxShadow: theme.shadows[4],
//   },
// }));

// const StatisticHeader = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   color: theme.palette.backgroundA.dark,
//   marginBottom: theme.spacing(1),
// }));

// const PieChartStats = ({ chartData, date, description, title, icon }) => {
//   const { theme } = useMode();
//   const isChartDataValid =
//     chartData && chartData.some((entry) => entry.value != null);

//   const renderChartContent = useMemo(
//     () => (
//       <Card
//         sx={{
//           height: '100%',
//           width: '100%',
//           display: 'flex',
//           flexGrow: 1,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}
//       >
//         <StatisticPaper theme={theme}>
//           <StatisticHeader variant="h6" theme={theme}>
//             Top Collections
//           </StatisticHeader>
//           <Box
//             sx={{
//               width: '100%',
//               height: '150px',
//               overflow: 'auto',
//             }}
//           >
//             {description && (
//               <MDTypography component="div" variant="button" color="text">
//                 {description}
//               </MDTypography>
//             )}
//             {!isChartDataValid ? (
//               <Skeleton variant="rectangular" width={'100%'} height={150} />
//             ) : (
//               <PieChart
//                 series={[{ data: chartData }]}
//                 width={200}
//                 height={150}
//                 theme={theme}
//               />
//             )}
//             {date && (
//               <MDTypography
//                 component="div"
//                 variant="caption"
//                 color="text"
//                 sx={{ textAlign: 'right' }}
//               >
//                 {date}
//               </MDTypography>
//             )}
//           </Box>
//         </StatisticPaper>
//       </Card>
//     ),
//     [chartData, theme, icon.component, title, description]
//   );

//   return (
//     <Card
//       sx={{
//         height: '100%',
//         width: '100%',
//         display: 'flex',
//         flexGrow: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//       }}
//     >
//       {' '}
//       {/* <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}> */}
//       {/* <MDBox display="flex" justifyContent="space-between" pt={1} px={2}> */}
//       {icon.component && (
//         // Icon JSX
//         <MDBox
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           width={icon.component ? '4rem' : 'auto'}
//           height={icon.component ? '4rem' : 'auto'}
//           bgcolor={icon.color}
//         >
//           <Icon>{icon.component}</Icon>
//         </MDBox>
//       )}
//       {renderChartContent}
//     </Card>
//   );
// };
// // Setting default values for the props of PieChart
// PieChart.defaultProps = {
//   icon: { color: 'info', component: '' },
//   title: '',
//   description: '',
//   height: '19.125rem',
// };

// // Typechecking props for the PieChart
// PieChart.propTypes = {
//   icon: PropTypes.shape({
//     color: PropTypes.oneOf([
//       'primary',
//       'secondary',
//       'info',
//       'success',
//       'warning',
//       'error',
//       'light',
//       'dark',
//     ]),
//     component: PropTypes.node,
//   }),
//   title: PropTypes.string,
//   description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   // chartData: PropTypes.array.isRequired,
// };

// export default PieChartStats;
