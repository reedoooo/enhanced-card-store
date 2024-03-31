// // import React, { useState, useEffect, useMemo } from 'react';
// // import {
// //   Box,
// //   Card,
// //   CardActions,
// //   CardContent,
// //   CardHeader,
// //   IconButton,
// //   List,
// //   ListItem,
// //   Paper,
// //   Typography,
// //   useMediaQuery,
// // } from '@mui/material';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import CardLinearChart from './CardLinearChart';
// // import { ErrorBoundary, useMode, usePageContext } from '../context';
// // import useCardCronJob from './useCardCronJob';
// // import initialCardData from '../data/initialCardData';
// // import { format } from 'date-fns';
// // import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
// // import styled from 'styled-components';
// // import MDButton from './REUSABLE_COMPONENTS/MDBUTTON';
// // import { useLoading } from '../context/hooks/useLoading';

// // const ChartArea = styled(Box)(({ theme }) => ({
// //   width: '100%',
// //   height: '100%',
// //   padding: theme.spacing(2),
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   border: '1px solid #000',
// //   borderRadius: '5px',
// // }));
// // const SquareChartContainer = styled(Box)(({ theme }) => ({
// //   position: 'relative',
// //   width: '100%',
// //   paddingTop: '100%',
// //   overflow: 'hidden',
// //   '& > *': {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //   },
// // }));

// // const CardChart = ({ cardData = initialCardData }) => {
// //   // STYLING AND MEDIA QUERY HOOKS
// //   const { theme } = useMode();
// //   const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
// //   const [imageUrl, setImageUrl] = useState(null);
// //   const { startUpdates, pauseUpdates, resetData } =
// //     useCardCronJob(initialCardData);
// //   const formatTimestamp = (timestamp) =>
// //     format(new Date(timestamp), "MMM do, yyyy 'at' HH:mm");
// //   const [chartDimensions, setChartDimensions] = useState({
// //     width: 0,
// //     height: 0,
// //   });
// //   const { returnDisplay } = usePageContext();
// //   const { isLoading } = useLoading();
// //   useEffect(() => {
// //     if (cardData?.imageUrl) {
// //       console.log('Setting image url', cardData?.imageUrl);
// //       setImageUrl(cardData?.image);
// //     }
// //   }, [cardData?.imageUrl]);

// //   const nivoReadyData = useMemo(
// //     () => [
// //       {
// //         id: cardData?.name || 'default',
// //         data: cardData?.dailyPriceHistory?.map(({ timestamp, num }) => ({
// //           x: timestamp,
// //           y: num,
// //         })),
// //       },
// //     ],
// //     [cardData]
// //   );
// //   const renderLoadingAnimation = () =>
// //     isLgUp && <LoadingCardAnimation selected={true} />;
// //   useEffect(() => {
// //     if (isLoading('fetchCollections')) {
// //       console.log('Fetching collections');
// //     }
// //   }, [isLoading('fetchCollections')]);
// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       const width = window.innerWidth < 500 ? window.innerWidth : 500;
// //       const height = 300;
// //       setChartDimensions({ width, height });
// //     };

// //     window.addEventListener('resize', updateDimensions);
// //     updateDimensions();

// //     return () => {
// //       window.removeEventListener('resize', updateDimensions);
// //     };
// //   }, []);
// //   const renderHeaderWithAnimation = () => {
// //     return (
// //       <Box
// //         sx={{
// //           display: 'flex',
// //           flexDirection: 'row',
// //           alignItems: 'center',
// //         }}
// //       >
// //         <CardHeader
// //           action={
// //             <IconButton aria-label="settings">
// //               <MoreVertIcon />
// //             </IconButton>
// //           }
// //           title="Card Cron Job Simulator"
// //           subheader={cardData?.name || 'Card Name'}
// //           sx={{
// //             padding: theme.spacing(1),
// //             margin: theme.spacing(1),
// //           }}
// //         />
// //         {isLgUp && renderLoadingAnimation()}
// //       </Box>
// //     );
// //   };
// //   return (
// //     <React.Fragment>
// //       <Card
// //         variant="outlined"
// //         sx={{
// //           background: theme.palette.greenAccent.contrastText,
// //           display: 'flex',
// //           flexDirection: 'column',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           border: '1px solid #000',
// //           borderRadius: '5px',
// //           elevation: 2,
// //           boxShadow: 2,
// //           marginTop: 2,
// //         }}
// //       >
// //         <CardContent
// //           sx={{
// //             width: '100%',
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             padding: theme.spacing(1),
// //             margin: theme.spacing(1),
// //             elevation: 2,
// //             boxShadow: 2,
// //             marginTop: 2,
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: 'flex',
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               maxWidth: '100%',
// //               maxHeight: '100%',
// //               padding: theme.spacing(2),
// //             }}
// //           >
// //             {renderHeaderWithAnimation()}
// //           </Box>

// //           <SquareChartContainer>
// //             <ChartArea theme={theme}>
// //               {isLoading('fetchCollections') ? (
// //                 returnDisplay()
// //               ) : (
// //                 <ErrorBoundary>
// //                   <CardLinearChart
// //                     nivoReadyData={nivoReadyData}
// //                     dimensions={chartDimensions}
// //                   />
// //                 </ErrorBoundary>
// //               )}
// //             </ChartArea>
// //           </SquareChartContainer>
// //         </CardContent>

// //         <Card
// //           sx={{
// //             elevation: 2,
// //             boxShadow: 2,
// //           }}
// //         >
// //           <CardActions
// //             sx={{
// //               justifyContent: 'space-between',
// //               width: '100%',
// //               m: 0,
// //               p: 0,
// //             }}
// //           >
// //             {['Start Updates', 'Pause Updates', 'Reset Data'].map(
// //               (text, index) => (
// //                 <MDButton
// //                   key={index}
// //                   onClick={() => {
// //                     if (text === 'Start Updates') startUpdates();
// //                     else if (text === 'Pause Updates') pauseUpdates();
// //                     else if (text === 'Reset Data') resetData();
// //                   }}
// //                   color="primary"
// //                   variant="contained"
// //                   sx={{
// //                     color: theme.palette.backgroundA.contrastText,
// //                     background: theme.palette.backgroundF.darker,
// //                     borderColor: theme.palette.backgroundB.darkest,
// //                     borderWidth: 2,
// //                     mt: 'auto',
// //                     flexGrow: 1,
// //                     justifySelf: 'bottom',
// //                     bottom: 0,
// //                     width: '100%',
// //                     '&:hover': {
// //                       color: theme.palette.backgroundA.contrastTextC,
// //                       fontWeight: 'bold',
// //                       background: theme.palette.backgroundF.dark,
// //                       borderColor: theme.palette.backgroundB.darkest,
// //                       border: `1px solid ${theme.palette.backgroundB.darkest}`,
// //                     },
// //                   }}
// //                 >
// //                   {text}
// //                 </MDButton>
// //               )
// //             )}
// //           </CardActions>
// //           <CardContent sx={{ padding: 0, '&:last-child': { pb: 0 } }}>
// //             <Paper
// //               sx={{
// //                 background: theme.palette.backgroundA.lighter,
// //                 border: `1px solid${theme.palette.greenAccent.default}`,
// //                 borderRadius: '5px',
// //                 elevation: 2,
// //                 boxShadow: 2,
// //                 padding: theme.spacing(1),
// //                 margin: theme.spacing(1),
// //               }}
// //             >
// //               <List
// //                 dense
// //                 sx={{
// //                   maxHeight: { xs: '120px', sm: '150px', md: '200px' },
// //                   overflowY: 'auto',
// //                 }}
// //               >
// //                 {cardData?.dailyPriceHistory?.map((entry, index) => (
// //                   <ListItem
// //                     key={index}
// //                     divider
// //                     sx={{ justifyContent: 'space-between' }}
// //                   >
// //                     <Typography variant="caption">
// //                       Quantity: {cardData?.quantity}
// //                     </Typography>
// //                     <Typography variant="caption">
// //                       Price: ${entry?.num}
// //                     </Typography>
// //                     <Typography variant="caption" color="textSecondary">
// //                       {formatTimestamp(entry?.timestamp)}
// //                     </Typography>
// //                   </ListItem>
// //                 ))}
// //               </List>
// //             </Paper>
// //           </CardContent>
// //         </Card>
// //       </Card>
// //     </React.Fragment>
// //   );
// // };

// // export default CardChart;
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   IconButton,
//   List,
//   ListItem,
//   Paper,
//   Typography,
//   useTheme,
//   useMediaQuery,
//   CardActions,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CardLinearChart from './CardLinearChart';
// import { ErrorBoundary, useMode } from '../context';
// import useCardCronJob from './useCardCronJob';
// import initialCardData from '../data/initialCardData';
// import { format } from 'date-fns';
// import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
// import MDButton from './REUSABLE_COMPONENTS/MDBUTTON';
// import { useLoading } from '../context/hooks/useLoading';
// import styled from 'styled-components';
// import uniqueTheme from './REUSABLE_COMPONENTS/unique/uniqueTheme';
// import SimpleButton from './REUSABLE_COMPONENTS/unique/SimpleButton';

// const ChartArea = styled(Box)(({ theme }) => ({
//   width: '100%',
//   height: '100%',
//   padding: theme.spacing(2),
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   border: '1px solid #000',
//   borderRadius: '5px',
// }));

// const SquareChartContainer = styled(Box)({
//   position: 'relative',
//   flex: 1,
//   overflow: 'hidden',
// });

// const CardChart = () => {
//   const { theme } = useMode();
//   const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
//   const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
//   const { startUpdates, pauseUpdates, resetData } =
//     useCardCronJob(initialCardData);
//   const [cardData, setCardData] = useState(initialCardData);
//   const { isLoading } = useLoading();

//   const getResponsiveDimensions = () => {
//     return isMobileView
//       ? { width: window.innerWidth / 2, height: window.innerHeight * 0.5 }
//       : { width: 500, height: 300 };
//   };

//   const [chartDimensions, setChartDimensions] = useState(
//     getResponsiveDimensions()
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setChartDimensions(getResponsiveDimensions());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isMobileView]);

//   const nivoReadyData = useMemo(
//     () => [
//       {
//         id: cardData.name || 'default',
//         data: cardData.dailyPriceHistory.map(({ timestamp, num }) => ({
//           x: format(new Date(timestamp), 'Pp'),
//           y: num,
//         })),
//       },
//     ],
//     [cardData]
//   );

//   return (
//     <ErrorBoundary>
//       <Card
//         variant="outlined"
//         sx={{
//           background: theme.palette.greenAccent.contrastText,
//           display: isMobileView ? 'flex' : 'block',
//           // flexDirection: isMobileView ? 'row' : 'column',
//           flexDirection: 'column',

//           alignItems: 'stretch',
//           justifyContent: 'center',
//           border: '1px solid #000',
//           borderRadius: '5px',
//           boxShadow: 2,
//           // m: 2,
//           // maxHeight: '50vh',
//           maxHeight: isMobileView ? '80vh' : '50vh',

//           overflow: isMobileView ? 'hidden' : 'auto',
//         }}
//       >
//         <CardContent
//           sx={{
//             width: '100%',
//             p: theme.spacing(2),
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <CardHeader
//             action={
//               isMobileView ? null : (
//                 <IconButton aria-label="settings">
//                   <MoreVertIcon />
//                 </IconButton>
//               )
//             }
//             title="Card Cron Job Simulator"
//             subheader={cardData.name || 'Card Name'}
//           />
//           {!isMobileView && isLgUp && isLoading('fetchCollections') && (
//             <LoadingCardAnimation />
//           )}
//           <SquareChartContainer>
//             <ChartArea>
//               <CardLinearChart
//                 nivoReadyData={nivoReadyData}
//                 dimensions={chartDimensions}
//               />
//             </ChartArea>
//           </SquareChartContainer>
//         </CardContent>

//         {isMobileView ? (
//           <CardContent
//             sx={{
//               width: '100%',
//               maxHeight: 'calc(50% - 48px)', // Accounting for header space
//               overflowY: 'auto',
//             }}
//           >
//             <Paper
//               elevation={2}
//               sx={{ width: '100%', height: '100%', p: theme.spacing(2) }}
//             >
//               <List dense>
//                 {cardData.dailyPriceHistory.map((entry, index) => (
//                   <ListItem key={index} divider>
//                     <Typography variant="caption">
//                       Quantity: {cardData.quantity}
//                     </Typography>
//                     <Typography variant="caption">
//                       Price: ${entry.num}
//                     </Typography>
//                     <Typography variant="caption" color="textSecondary">
//                       {format(
//                         new Date(entry.timestamp),
//                         "MMM do, yyyy 'at' HH:mm"
//                       )}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </CardContent>
//         ) : (
//           <CardActions
//             sx={{ width: '100%', justifyContent: 'space-between', p: 0 }}
//           >
//             {['Start Updates', 'Pause Updates', 'Reset Data'].map(
//               (action, index) => (
//                 <SimpleButton
//                   key={index}
//                   variant="contained"
//                   color="primary"
//                   size="medium"
//                   customColor={theme.palette.chartTheme.greenAccent.light}
//                   customTextColor={theme.palette.chartTheme.primary.lighter}
//                   customSize={'sm'}
//                   isDisabled={false}
//                   isDefault={false}
//                   theme={uniqueTheme}
//                   onClick={() => {
//                     if (action === 'Start Updates') startUpdates();
//                     else if (action === 'Pause Updates') pauseUpdates();
//                     else resetData();
//                   }}
//                 >
//                   {action}
//                 </SimpleButton>
//               )
//             )}
//           </CardActions>
//         )}
//       </Card>
//     </ErrorBoundary>
//   );
// };

// export default CardChart;
