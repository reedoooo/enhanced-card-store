// import {
//   Box,
//   Button,
//   ButtonGroup,
//   CardMedia,
//   Container,
//   Grid,
//   Paper,
//   Popper,
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableRow,
//   Typography,
//   TablePagination,
// } from '@mui/material';
// // import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
// import styled from 'styled-components';

import { CardMedia, Popper } from '@mui/material';
import styled from 'styled-components';
export const MediaContainer = styled('div')({
  cursor: 'pointer',
  position: 'relative',
});

export const MediaPopover = styled(Popper)({
  pointerEvents: 'none',
  height: 'auto',
  width: 'auto',
  maxWidth: '300px',
  maxHeight: 'auto',
});

export const Media = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  flexGrow: 1,
  alignItems: 'flex-end',
  padding: theme.spacing(0.5),
}));
// export const StatisticPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   margin: 'auto',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   flexGrow: 1,
//   justifyContent: 'center',
//   minHeight: '100%',
//   height: '100%',
//   width: '100%',
//   boxShadow: theme.shadows[3],
// }));

// // export const PortfolioBox = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   flexDirection: 'column',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   maxWidth: '100vw',
// //   width: '100%',
// //   height: '100%',
// //   margin: theme.spacing(0, 'auto'),
// //   padding: theme.spacing(1, 2, 3),
// //   backgroundColor: theme.palette.backgroundA.lightest,
// //   color: theme.palette.text.primary,
// // }));

// // export const PortfolioBoxA = styled(Box)(({ theme }) => ({
// //   flexDirection: 'column',
// //   flexGrow: 1,
// //   height: 'auto',
// //   width: '100%',
// //   minHeight: '100vh', // Reducing height by 128px
// //   boxShadow: theme.shadows[5],
// //   [theme.breakpoints.down('sm')]: {
// //     padding: theme.spacing(2),
// //   },
// // }));

// // export const PortfolioBoxB = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: theme.spacing(4),
// //   borderRadius: theme.shape.borderRadius,
// //   flexGrow: 1,
// //   background: theme.palette.backgroundD.dark,
// //   padding: theme.spacing(4),
// //   width: '100%',
// //   height: '100%',
// //   boxShadow: theme.shadows[5],
// //   [theme.breakpoints.down('sm')]: {
// //     padding: theme.spacing(2),
// //   },
// // }));

// // export const StatisticHeader = styled('div')(({ theme }) => ({
// //   marginBottom: theme.spacing(1),
// //   fontWeight: 'bold',
// //   color: theme.palette.backgroundA.lighter,
// // }));
// export const StatisticHeader = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   color: theme.palette.backgroundA.dark,
//   marginBottom: theme.spacing(1),
// }));
// export const StatisticsContent = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexGrow: 1,
//   height: '100%',
//   width: '100%',
// }));

// export const PortfolioPaper = styled(Paper)(({ theme }) => ({
//   background: theme.palette.backgroundD.darkest,
//   color: theme.palette.text.primary,
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   margin: 'auto',
//   width: '100%',
//   padding: theme.spacing(2),
//   borderRadius: theme.shape.borderRadius,
// }));

// export const ComponentGridContainer = styled('div')(({ theme }) => ({
//   width: '100%',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: theme.spacing(2),
//   backgroundColor: theme.palette.backgroundB.lighter,
//   borderRadius: theme.shape.borderRadius,
//   border: '3px solid',
//   borderColor: theme.palette.backgroundB.lightest,
// }));

// export const ComponentGridItem = styled(Grid)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'flex-end',
//   background: theme.palette.backgroundA.main,
//   borderRadius: theme.shape.borderRadius,
// }));

// export const DialogButton = styled(Button)({
//   textTransform: 'none',
// });

// export const SelectCollectionListContainer = styled(Container)(({ theme }) => ({
//   // maxHeight: '60vh',
//   overflowY: 'auto',
//   padding: theme.spacing(2),
//   height: '100%',
//   width: '100%',
// }));

// export const DialogContent = styled('div')(({ theme }) => ({
//   padding: theme.spacing(2),
//   background: theme.palette.backgroundA.lightest,
// }));

// export const BoxStyle = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   justifyContent: 'center',
//   margin: 'auto',
// }));

// export const CardStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: 'auto',
//   padding: theme.spacing(2),
//   maxWidth: '100%',
//   maxHeight: '100%',
// }));

// export const CardContentStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: 'auto',
//   padding: theme.spacing(2),
//   maxWidth: '100%',
//   maxHeight: '100%',
// }));

// export const CardMediaStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: 'auto',
//   padding: theme.spacing(2),
//   maxWidth: '100%',
//   maxHeight: '100%',
// }));

// export const CardListContainerBox = styled(Box)(({ theme }) => ({
//   maxWidth: '100%',
//   background: theme.palette.backgroundB.dark,
//   borderRadius: theme.shape.borderRadius,
//   width: {
//     xs: '100%', // Full width on mobile screens
//     md: '100%',
//   },
//   padding: theme.spacing(4),
// }));

// export const CardListContainerGrid = styled(Grid)(({ theme }) => ({
//   // background: theme.palette.backgroundB.default,
//   maxHeight: '100%',
//   width: '100%',
// }));

// export const TablePaper = styled(Paper)(({ theme }) => ({
//   maxWidth: 'lg',
//   margin: 'auto',
//   overflowX: 'auto', // Ensures table doesn't overflow the paper
//   background: theme.palette.backgroundB.default,
//   padding: theme.spacing(2),
//   [theme.breakpoints.up('xs')]: {
//     padding: theme.spacing(1), // Smaller padding for xs
//   },
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(2), // Medium padding for sm
//   },
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(2), // Larger padding for md
//   },
//   [theme.breakpoints.up('lg')]: {
//     padding: theme.spacing(2), // Extra larger padding for lg
//   },
//   [theme.breakpoints.up('xl')]: {
//     padding: theme.spacing(2), // Maximum padding for xl
//   },
// }));

// export const PortfolioTableContainer = styled(Container)(({ theme }) => ({
//   // maxHeight: '60vh',
//   maxWidth: 'lg',
//   overflowY: 'auto', // Allows table to scroll vertically
//   padding: theme.spacing(2),
//   margin: theme.spacing(1),
//   background: theme.palette.backgroundB.light,
//   borderRadius: theme.shape.borderRadius,
// }));
// export const PortfolioButtonGroup = styled(ButtonGroup)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
// }));
// export const PortfolioButton = styled(Button)(({ theme }) => ({
//   padding: '10px 20px',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   width: '100%',
//   color: theme.palette.getContrastText(theme.palette.backgroundA.dark),
//   backgroundColor: theme.palette.backgroundA.dark,
//   '&:hover': {
//     backgroundColor: theme.palette.backgroundA.darker,
//   },
// }));
// // // ! PORTFOLIO TABLE STYLES
// // export const PortfolioTablePaper = styled(Paper)(({ theme }) => ({
// //   maxWidth: 'lg',
// //   margin: 'auto',
// //   overflowX: 'auto', // Ensures table doesn't overflow the paper
// //   background: theme.palette.backgroundB.default,
// //   padding: theme.spacing(2),
// //   [theme.breakpoints.up('xs')]: {
// //     padding: theme.spacing(1), // Smaller padding for xs
// //   },
// //   [theme.breakpoints.up('sm')]: {
// //     padding: theme.spacing(2), // Medium padding for sm
// //   },
// //   [theme.breakpoints.up('md')]: {
// //     padding: theme.spacing(2), // Larger padding for md
// //   },
// //   [theme.breakpoints.up('lg')]: {
// //     padding: theme.spacing(2), // Extra larger padding for lg
// //   },
// //   [theme.breakpoints.up('xl')]: {
// //     padding: theme.spacing(2), // Maximum padding for xl
// //   },
// // }));
// // export const PortfolioTable = styled(Table)(({ theme }) => ({
// //   minWidth: 300,
// //   minHeight: 300,
// //   width: '100%',
// //   height: '100%',
// //   background: theme.palette.backgroundA.lightest,
// // }));
// // // TABLE HEADER
// // export const PortfolioTableHeader = styled(TableHead)(({ theme }) => ({
// //   background: theme.palette.backgroundA.lighter,
// //   color: theme.palette.backgroundA.contrastTextA,
// //   [theme.breakpoints.up('md')]: {
// //     fontSize: '1rem',
// //   },
// // }));
// // // TABLE BODY
// // export const PortfolioTableBody = styled(TableBody)(({ theme }) => ({
// //   background: theme.palette.backgroundA.lightest,
// //   border: '2px solid',
// //   borderColor: theme.palette.divider,
// // }));
// // export const PortfolioTableRow = styled(TableRow)(({ theme }) => ({
// //   // '&:nth-of-type(odd)': {
// //   //   background: theme.palette.backgroundA.light,
// //   // },
// //   // '&:nth-of-type(even)': {
// //   //   background: theme.palette.backgroundA.lighter,
// //   // },
// // }));
// // export const PortfolioTableCell = styled(TableCell)(({ theme }) => ({
// //   border: '2px solid',
// //   borderColor: theme.palette.divider,
// //   // background: theme.palette.backgroundA.light,

// //   [theme.breakpoints.down('sm')]: {
// //     padding: theme.spacing(1),
// //     fontSize: '0.7rem',
// //   },
// //   [theme.breakpoints.up('md')]: {
// //     padding: theme.spacing(2),
// //     fontSize: '1rem',
// //   },
// // }));
// // // TABLE FOOTER
// // export const PortfolioTableFooter = styled(TableFooter)(({ theme }) => ({
// //   backgroundColor: theme.palette.backgroundA.lighter,
// //   borderTop: `1px solid ${theme.palette.divider}`,
// //   '& .MuiTableCell-root': {
// //     padding: theme.spacing(2),
// //   },
// // }));
// // export const PortfolioPaginationActionsTableRow = styled(TableRow)(
// //   ({ theme }) => ({
// //     // Example styling, you can customize as needed
// //     backgroundColor: theme.palette.backgroundA.lighter,
// //     '&:hover': {
// //       backgroundColor: theme.palette.action.hover,
// //     },
// //     '& .MuiTableCell-root': {
// //       textAlign: 'right',
// //       padding: theme.spacing(1),
// //     },
// //   })
// // );
// // export const PortfolioPaginationActionsTableCell = styled(TableCell)(
// //   ({ theme }) => ({
// //     // Example styling, you can customize as needed
// //     fontSize: '0.9rem',
// //     fontWeight: 'bold',
// //     color: theme.palette.backgroundA.contrastTextA,
// //     backgroundColor: theme.palette.backgroundA.lighter,

// //     '&:hover': {
// //       color: theme.palette.backgroundA.contrastTextA,
// //     },
// //     '& .MuiTableCell-root': {
// //       textAlign: 'right',
// //       padding: theme.spacing(1),
// //     },
// //   })
// // );
// // export const PortfolioPaginationActionsTableContentsContainer = styled(Box)(
// //   ({ theme }) => ({
// //     // '.MuiIconButton-root': {
// //     //   padding: theme.spacing(1),
// //     //   margin: '0 4px',
// //     //   '&:hover': {
// //     //     backgroundColor: theme.palette.action.hover,
// //     //   },
// //     // },
// //     display: 'flex',
// //     flexShrink: 0,
// //     justifyContent: 'flex-end',
// //     // ml: 2.5,
// //     width: '100%',
// //     flexDirection: 'row',
// //     borderRadius: '5px',
// //     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// //     '&:hover': {
// //       boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
// //     },
// //   })
// // );
// // // TABLE PRICE BOX
// // export const PortfolioTablePriceBox = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   justifyContent: 'flex-end',
// //   alignItems: 'center',
// //   width: '100%',
// //   padding: theme.spacing(2),
// //   background: theme.palette.backgroundB.lighter,
// // }));
// // ! OVERLAY STYLES
// export const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: '0',
//   left: '0',
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 9999,
// }));

// // ... more styles

// // import { makeStyles } from '@mui/material';

// // export const usePortfolioStyles = makeStyles((theme) => ({
// //   // portfolioBox: {
// //   //   display: 'flex',
// //   //   flexDirection: 'column',
// //   //   justifyContent: 'center',
// //   //   alignItems: 'center',
// //   //   maxWidth: '100vw',
// //   //   width: '100%',
// //   //   height: '100%',
// //   //   margin: theme.spacing(0, 'auto'),
// //   //   padding: theme.spacing(1, 2, 3),
// //   //   backgroundColor: theme.palette.backgroundA.lightest,
// //   //   color: theme.palette.text.primary,
// //   // },
// //   statisticPaper: {
// //     padding: theme.spacing(2),
// //     margin: 'auto',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     flexGrow: 1,
// //     justifyContent: 'center',
// //     minHeight: '100%',
// //     height: '100%',
// //     width: '100%',
// //     boxShadow: theme.shadows[3],
// //   },
// //   statisticHeader: {
// //     marginBottom: theme.spacing(1),
// //     fontWeight: 'bold',
// //     color: theme.palette.backgroundA.lighter,
// //   },
// //   statisticsContent: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     flexGrow: 1,
// //     height: '100%',
// //     width: '100%',
// //   },
// //   paper: {
// //     background: theme.palette.backgroundD.darkest,
// //     color: theme.palette.text.primary,
// //     display: 'flex',
// //     justifyContent: 'center',
// //     flexDirection: 'column',
// //     margin: 'auto',
// //     width: '100%',
// //     padding: {
// //       xs: theme.spacing(1),
// //       sm: theme.spacing(1),
// //       md: theme.spacing(2),
// //       lg: theme.spacing(2),
// //     },
// //     borderRadius: theme.shape.borderRadius,
// //   },

// //   gridContainer: {
// //     width: '100%',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: theme.spacing(2),
// //     backgroundColor: theme.palette.backgroundB.lighter,
// //     borderRadius: theme.shape.borderRadius,
// //     border: '3px solid',
// //     borderColor: theme.palette.backgroundB.lightest,

// //     // color: theme.palette.text.primary,
// //     // background: theme.palette.backgroundB.lighter,
// //   },
// //   gridItem: {
// //     display: 'flex',
// //     justifyContent: 'flex-end',
// //     background: theme.palette.success.main,
// //     borderRadius: theme.shape.borderRadius,
// //   },
// //   portfolioBoxA: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: theme.spacing(4),
// //     borderRadius: theme.shape.borderRadius,
// //     flexGrow: 1,
// //     background: theme.palette.backgroundC.dark,
// //     padding: theme.spacing(4),
// //     height: 'auto',
// //     width: '100%',
// //     // Adjusting minHeight and maxHeight to take into account the header and additional space
// //     minHeight: 'calc(100vh - 64px)', // Reducing height by 128px
// //     maxHeight: 'calc(100vh - 128px)', // Adjusting maxHeight similarly
// //     boxShadow: theme.shadows[5],
// //     [theme.breakpoints.down('sm')]: {
// //       padding: theme.spacing(2),
// //     },
// //     // Using margin to push the content upwards from the bottom by 64px
// //     // marginBottom: '64px', // Pushing upwards from the bottom
// //   },

// //   portfolioBoxB: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: theme.spacing(4),
// //     borderRadius: theme.shape.borderRadius,
// //     flexGrow: 1,
// //     // background: theme.palette.success.main,
// //     background: theme.palette.backgroundD.dark,
// //     padding: theme.spacing(4),
// //     // height: 'auto',
// //     width: '100%',
// //     height: '100%',

// //     // 100vh
// //     // minHeight: '90vh',
// //     boxShadow: theme.shadows[5],
// //     [theme.breakpoints.down('sm')]: {
// //       padding: theme.spacing(2),
// //     },
// //   },
// //   typography: {
// //     fontWeight: 700,
// //     color: theme.palette.backgroundC.contrastText,
// //     fontSize: '1.5rem',
// //     textAlign: 'left',
// //     paddingLeft: theme.spacing(2),
// //     [theme.breakpoints.down('sm')]: {
// //       fontSize: '1.25rem',
// //     },
// //   },

// //   // Add more custom styles as needed
// //   // gridContainer: {
// //   //   width: '100%',
// //   //   alignItems: 'center',
// //   //   justifyContent: 'space-between',
// //   //   padding: theme.spacing(1),
// //   // },
// //   // Additional styles
// //   dialogButton: {
// //     textTransform: 'none', // or other style adjustments for dialog buttons
// //   },
// //   listContainer: {
// //     // marginTop: theme.spacing(2),
// //     maxHeight: '60vh', // or other appropriate height
// //     overflowY: 'auto',
// //     padding: theme.spacing(2),
// //     // background: theme.palette.backgroundC.lighter,
// //   },
// //   dialogContent: {
// //     padding: theme.spacing(2),
// //     background: theme.palette.backgroundA.lightest,
// //     // height: '100%',
// //   },
// //   boxStyle: {
// //     padding: theme.spacing(2),
// //     justifyContent: 'center',
// //     margin: 'auto',
// //   },
// //   cardStyle: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     margin: 'auto',
// //     padding: theme.spacing(2),
// //     maxWidth: '100%',
// //     maxHeight: '100%',
// //   },
// //   cardContentStyle: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     margin: 'auto',
// //     padding: theme.spacing(2),
// //     maxWidth: '100%',
// //     maxHeight: '100%',
// //   },
// //   cardMediaStyle: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     margin: 'auto',
// //     padding: theme.spacing(2),
// //     maxWidth: '100%',
// //     maxHeight: '100%',
// //   },

// //   // CARD MEDIA SECTION
// //   mediaContainer: {
// //     cursor: 'pointer',
// //     position: 'relative',
// //   },
// //   popover: {
// //     pointerEvents: 'none',
// //     height: 'auto',
// //     width: 'auto',
// //     maxWidth: '300px',
// //     maxHeight: 'auto',
// //   },
// //   media: {
// //     width: '100%',
// //     height: 'auto',
// //     flexGrow: 1,
// //     alignItems: 'flex-end',
// //     [theme.breakpoints.down('xs')]: {
// //       padding: theme.spacing(1),
// //     },
// //     [theme.breakpoints.down('sm')]: {
// //       padding: theme.spacing(1),
// //     },
// //     [theme.breakpoints.down('md')]: {
// //       padding: theme.spacing(1),
// //     },
// //     [theme.breakpoints.down('lg')]: {
// //       padding: theme.spacing(0.5),
// //     },
// //     [theme.breakpoints.down('xl')]: {
// //       padding: theme.spacing(0.5),
// //     },
// //   },

// //   // OFFICIAL UPDATED STYLES
// //   cardListContainerBox: {
// //     maxWidth: '100%',
// //     background: theme.palette.backgroundB.dark,
// //     borderRadius: theme.shape.borderRadius,
// //     width: {
// //       xs: '100%', // Full width on mobile screens
// //       md: '100%',
// //     },
// //     padding: theme.spacing(4),
// //   },
// //   cardListContainerGrid: {
// //     // background: theme.palette.backgroundB.default,
// //     maxHeight: '100%',
// //     width: '100%',
// //   },
// //   tablePaper: {
// //     maxWidth: 'lg',
// //     margin: 'auto',
// //     overflowX: 'auto', // Ensures table doesn't overflow the paper
// //     background: theme.palette.backgroundB.default,
// //     padding: theme.spacing(2),
// //     [theme.breakpoints.up('xs')]: {
// //       padding: theme.spacing(1), // Smaller padding for xs
// //     },
// //     [theme.breakpoints.up('sm')]: {
// //       padding: theme.spacing(2), // Medium padding for sm
// //     },
// //     [theme.breakpoints.up('md')]: {
// //       padding: theme.spacing(2), // Larger padding for md
// //     },
// //     [theme.breakpoints.up('lg')]: {
// //       padding: theme.spacing(2), // Extra larger padding for lg
// //     },
// //     [theme.breakpoints.up('xl')]: {
// //       padding: theme.spacing(2), // Maximum padding for xl
// //     },
// //   },
// //   tableContainer: {
// //     // maxHeight: '60vh',
// //     maxWidth: 'lg',
// //     overflowY: 'auto', // Allows table to scroll vertically
// //     padding: theme.spacing(2),
// //     margin: theme.spacing(1),
// //     background: theme.palette.backgroundB.light,
// //     borderRadius: theme.shape.borderRadius,
// //   },
// //   table: {
// //     minWidth: 300,
// //     width: '100%',
// //     background: theme.palette.backgroundA.lightest,
// //   },
// //   tableRow: {
// //     // '&:nth-of-type(odd)': {
// //     //   background: theme.palette.backgroundA.light,
// //     // },
// //     // '&:nth-of-type(even)': {
// //     //   background: theme.palette.backgroundA.lighter,
// //     // },
// //   },
// //   tableCell: {
// //     border: '2px solid',
// //     borderColor: theme.palette.divider,
// //     // background: theme.palette.backgroundA.light,

// //     [theme.breakpoints.down('sm')]: {
// //       padding: theme.spacing(1),
// //       fontSize: '0.7rem',
// //     },
// //     [theme.breakpoints.up('md')]: {
// //       padding: theme.spacing(2),
// //       fontSize: '1rem',
// //     },
// //   },
// //   tableHeader: {
// //     background: theme.palette.backgroundA.lighter,
// //     color: theme.palette.backgroundA.contrastTextA,
// //     [theme.breakpoints.up('md')]: {
// //       fontSize: '1rem',
// //     },
// //   },
// //   tableBody: {
// //     background: theme.palette.backgroundA.lightest,
// //     border: '2px solid',
// //     borderColor: theme.palette.divider,
// //   },
// //   tableFooter: {
// //     background: theme.palette.backgroundA.lighter,
// //   },
// //   tablePriceBox: {
// //     display: 'flex',
// //     justifyContent: 'flex-end',
// //     alignItems: 'center',
// //     width: '100%',
// //     padding: theme.spacing(2),
// //     background: theme.palette.backgroundB.lighter,
// //   },
// //   buttonGroup: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
// //   },
// //   button: {
// //     padding: '10px 20px',
// //     border: 'none',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     width: '100%',
// //     color: theme.palette.getContrastText(theme.palette.backgroundA.dark),
// //     backgroundColor: theme.palette.backgroundA.dark,
// //     '&:hover': {
// //       backgroundColor: theme.palette.backgroundA.darker,
// //     },
// //     [theme.breakpoints.down('sm')]: {
// //       fontSize: '0.8rem',
// //     },
// //     [theme.breakpoints.up('md')]: {
// //       fontSize: '1rem',
// //     },
// //   },
// //   // Add any other styles from CardPortfolio, PortfolioContent, and SelectCollection components
// // }));

// // export default usePortfolioStyles;
