import { Button, Card, Grid, ListItem } from '@mui/material';
import styled from 'styled-components';

export const ListItemText = styled()(({ theme }) => ({
  flex: 1,
  textAlign: 'left',
  marginLeft: theme.spacing(3),
}));

export const LoadingContainer = styled()(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const EditButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: theme.palette.backgroundA.dark,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.backgroundA.darker,
  },
}));

export const CollectionListItem = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.backgroundA.lightest,
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: theme.shadows[1],
  },
  padding: theme.spacing(2),
}));

export const ListItemSkeleton = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
}));

export const SkeletonCard = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  // eslint-disable-next-line max-len
  background: `linear-gradient(to right, ${theme.palette.backgroundA.lightest} 40%, ${theme.palette.grey[300]} 70%, ${theme.palette.backgroundA.lightest} 100%)`,
  animation: '$shimmer 2s infinite',
}));

export const ComponentListItem = styled(ListItem)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  width: '100%',
  marginBottom: theme.spacing(1),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const GridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '50%',
  justifyContent: 'center',
  padding: theme.spacing(0.5),
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

export const GridItemText = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.8rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

export const PositivePerformance = styled('div')({
  color: 'green',
});

export const NegativePerformance = styled('div')({
  color: 'red',
});

export const MenuButton = styled(Button)({
  position: 'absolute',
  top: 0,
  right: 0,
  // Adjust padding and margin as needed
});

// import { makeStyles } from '@mui/material';

// const useSelectCollectionListStyles = () => {
//   const useStyles = makeStyles((theme) => ({
//     listItemText: {
//       flex: 1,
//       textAlign: 'left',
//       marginLeft: theme.spacing(3),
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//     },
//     editButton: {
//       marginLeft: theme.spacing(2),
//       backgroundColor: theme.palette.backgroundA.dark,
//       color: '#ffffff',
//       '&:hover': {
//         backgroundColor: theme.palette.backgroundA.darker,
//       },
//     },
//     collectionListItem: {
//       backgroundColor: theme.palette.backgroundA.lightest,
//       transition: theme.transitions.create(['background-color', 'box-shadow']),
//       '&:hover': {
//         backgroundColor: theme.palette.grey[100],
//         boxShadow: theme.shadows[1],
//       },
//       padding: theme.spacing(2),
//     },
//     listItemSkeleton: {
//       margin: theme.spacing(1, 0),
//       borderRadius: theme.shape.borderRadius,
//     },
//     skeletonCard: {
//       width: '100%',
//       borderRadius: theme.shape.borderRadius,
//       // For shimmer effect
//       // eslint-disable-next-line max-len
//       background: `linear-gradient(to right, ${theme.palette.backgroundA.lightest} 40%, ${theme.palette.grey[300]} 70%, ${theme.palette.backgroundA.lightest} 100%)`,
//       animation: '$shimmer 2s infinite',
//     },
//     '@keyframes shimmer': {
//       '0%': {
//         backgroundPosition: '-200%',
//       },
//       '100%': {
//         backgroundPosition: '200%',
//       },
//     },
//     listItem: {
//       position: 'relative', // Added to position the menu button absolutely
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: theme.spacing(1),
//       backgroundColor: '#ffffff',
//       borderRadius: '8px',
//       width: '100%',
//       marginBottom: theme.spacing(1),
//       boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//       [theme.breakpoints.up('sm')]: {
//         flexDirection: 'row',
//         padding: theme.spacing(2),
//         marginBottom: theme.spacing(2),
//       },
//     },
//     gridItem: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-start',
//       width: '50%', // Half width for xs breakpoint
//       justifyContent: 'center',
//       padding: theme.spacing(0.5), // Reduced padding
//       [theme.breakpoints.up('sm')]: {
//         width: '100%', // Full width for larger screens
//         padding: theme.spacing(1),
//       },
//     },
//     gridItemText: {
//       fontWeight: 'bold',
//       fontSize: '0.8rem', // Smaller text size
//       [theme.breakpoints.up('sm')]: {
//         fontSize: '1rem', // Larger text size for larger screens
//       },
//     },
//     positivePerformance: {
//       color: 'green',
//     },
//     negativePerformance: {
//       color: 'red',
//     },
//     menuButton: {
//       position: 'absolute',
//       top: 0,
//       right: 0,
//       // Adjust padding and margin as needed
//     },
//   }));

//   return useStyles();
// };

// export default useSelectCollectionListStyles;
