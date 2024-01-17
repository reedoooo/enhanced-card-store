import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  Drawer,
  ListItem,
  ListItemIcon,
  SwipeableDrawer,
} from '@mui/material';
import styled from 'styled-components';

// ! APP CONTAINER -----------------------------
export const AppContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // height: '100vh',
  justifyContent: 'center',
  minHeight: '100vh', // Ensures at least the height of the viewport
  width: '100%', // Ensures it takes the full width
  // overflow: 'hidden', // Prevents unwanted scrolling if not necessary
  // [theme.breakpoints.down('sm')]: {
  //   paddingTop: theme.spacing(6),
  //   paddingBottom: theme.spacing(6),
  // },
}));
// ! TOP BAR STYLES -----------------------------
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  // mx: '1',
  // width: '98%',
  // width: '95vw',
  // right: '3.2%',
  border: '2px solid white',
  borderRadius: '30px',
  background:
    'linear-gradient( 90deg, rgba(78, 78, 246, 0.647) 0%, rgba(247, 90, 216, 0.696) 100% );',
  // background: theme.palette.backgroundB.lightest,
  // // transform: topbarup ? 'translateY(-64px)' : 'translateY(0)',
  // transition: 'transform 0.3s ease-in-out',
}));
export const StyledToolBarContainer = styled(AppBar)(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'space-between',
  // alignItems: 'center',
  // width: '100%',
  // Do not explicitly set the height here to allow Toolbar's default styling to take effect
  backgroundColor: theme.palette.backgroundA.darker,
  borderRadius: '30px',
  flexGrow: 1,

  mr: 2,
  px: 3,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}));
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'space-between',
  // mx: 'auto',
  // alignItems: 'center',
  // width: '100%',
  // // Do not explicitly set the height here to allow Toolbar's default styling to take effect
  // backgroundColor: theme.palette.backgroundA.darker,
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}));
// ! MENU ITEMS COMPONENT STYLES -----------------------------
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  cursor: 'pointer',
  flexGrow: 1,
  mx: 'auto',
  px: '2',
  py: '1',
  borderRadius: '30px',
  // height: '100%',
  // width: '100%',
  '&:hover': {
    backgroundColor:
      'linear-gradient( 90deg, rgba(78, 78, 246, 0.647) 0%, rgba(247, 90, 216, 0.696) 100% );',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '35px',
  },
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5em',
    marginRight: theme.spacing(1),
  },
}));
export const StyledListItemText = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '30px',
  '&:hover': {
    backgroundColor:
      'linear-gradient( 90deg, rgba(78, 78, 246, 0.647) 0%, rgba(247, 90, 216, 0.696) 100% );',
  },
}));
export const StyledListItemIcon = styled(ListItemIcon)(({ theme, item }) => ({
  cursor: 'pointer',
  my: 'auto',
  minWidth: !item?.icon ? 18 : 36,
  borderRadius: '30px',
  '&:hover': {
    backgroundColor:
      'linear-gradient( 90deg, rgba(78, 78, 246, 0.647) 0%, rgba(247, 90, 216, 0.696) 100% );',
  },
}));
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text,
}));
export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  width: 250,
}));
// ! SIDEBAR COMPONENT STYLES -----------------------------
export const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '.MuiPaper-root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.palette.backgroundA.default,
    // top: 64,
    // width: 240,
    // position: 'absolute',
    flexGrow: 1,
    justifyContent: 'space-between',
    // backgroundColor: theme.palette.backgroundA.lightest,
    // !-----
  },
}));
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  flexGrow: 1,
  '&:hover': {
    backgroundColor: theme.palette.backgroundA.onHover,
  },
}));
export const StyledListItemButton = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action,
  },
}));
// ! TOP CARDS DISPLAY
export const MainContainer = styled(Box)(({ theme }) => ({
  background: '#222', // Dark background
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxHeight: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));
// ! CAROUSEL CARD
export const MainContainer2 = styled('div')(({ theme }) => ({
  background: '#333', // Dark background
  padding: theme.spacing(4),
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
  maxHeight: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));
export const CardDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  border: `1px solid ${theme.palette.backgroundB.lighter}`,
  borderRadius: theme.shape.borderRadius,
}));
export const ChartContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  background: theme.palette.backgroundB.darker,
}));
export const LinearChartContainer = styled(Box)(({ theme }) => ({
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    '@media (max-width: 600px)': {
      width: '150%', // Adjust width for mobile screens
      height: '300px', // Adjust height for mobile screens
      transform: 'translateX(10%)', // Shift the chart to the right by 50%
    },
  },
}));
export const CardMobile = styled(Grid)(({ theme }) => ({
  '@media (max-width: 600px)': {
    width: '100%', // Full width on mobile screens
  },
}));
export const ChartContainerMobile = styled(Box)(({ theme }) => ({
  '@media (max-width: 600px)': {
    width: '100%', // Full width on mobile screens
    padding: theme.spacing(1), // Reduced padding on mobile
  },
}));
// TODO FIX HEIGHT AND RESPONSIVENESS
// ! DECK BUILDER PAGE
export const DeckBuilderBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  backgroundColor: theme.palette.backgroundA.lightest,
  width: '100%',
  maxWidth: '1600px',
  // margin: 'auto',
  padding: theme.spacing(6, 2),
  height: '100%',
  // height: 'auto',
  boxShadow: theme.shadows[4],
  textAlign: 'center',
}));
export const SearchGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  alignItems: 'center',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));
export const DisplayGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  alignItems: 'center',
  height: '100%',

  [theme.breakpoints.down('md')]: {
    width: '50%', // Half width on small and medium screens
  },
}));
export const RootGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: theme.spacing(3),

  justifyContent: 'center',
  alignItems: 'center',

  flexWrap: 'wrap', // Ensure wrapping on smaller screens
  overflow: 'auto',
  backgroundColor: theme.palette.backgroundB.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));
export const GridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexdirection: 'column',
  height: '100%',
}));
// ! HOME PAGE STYLED COMPONENTS
export const HomePageBox = styled(Box)(({ theme }) => ({
  background: theme.palette.backgroundA.lighter,
  padding: theme.spacing(2, 4, 8),
  margin: theme.spacing(1, 2, 4),
  borderRadius: theme.shape.borderRadius,
  elevation: 3,
  boxShadow: theme.shadows[7],
  display: 'flex',
  flexDirection: 'column',
}));
// export const CarouselContainer = styled(Paper)(({ theme }) => ({
//   boxShadow: theme.shadows[10],
//   overflow: 'hidden', // ensuring the carousel stays within bounds
//   '&:hover': {
//     transform: 'scale(1.02)', // slightly reduced scale for subtlety
//     transition: 'transform 0.3s ease-in-out',
//   },
// }));
export const FeatureCard = styled(Card)(({ theme }) => ({
  background: theme.palette.success.light,
  boxShadow: theme.shadows[5],
  transition: 'box-shadow 0.3s ease-in-out', // smooth transition for shadow
  '&:hover': {
    boxShadow: theme.shadows[15], // more prominent shadow on hover
    transform: 'translateY(-3px)', // slight upward lift
  },
}));
export const ActionButton = styled(Button)(({ theme }) => ({
  color: 'white', // Ensuring text is white for better contrast
  backgroundColor: theme.palette.backgroundA.dark,
  '&:hover': {
    background: theme.palette.success.dark, // Darken button on hover for feedback
  },
}));
export const MainContentContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 4, 6),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.backgroundD.dark,
  boxShadow: theme.shadows[10],
  marginTop: theme.spacing(2),
  margin: theme.spacing(4, 0), // added vertical spacing
}));
export const SecondaryContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  background: theme.palette.backgroundD.dark,
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s',
}));
export const TertiaryContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.success.main,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
export const CardUnorderedList = styled('ul')(({ theme }) => ({
  listStyleType: 'disc', // or 'circle' or 'square' for different bullet styles
  paddingLeft: theme.spacing(4), // Adjust based on theme spacing for indentation
  margin: 0, // Remove default margins
}));
export const CardListItem = styled('li')(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(1), // Space between list items
  textAlign: 'left', // Align text to the left
  fontSize: '1rem', // Adjust font size as needed
}));
// ! PORTFOLIO CHART STYLES
export const ChartPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.backgroundA.lightest,
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '400px',
  overflow: 'hidden',
  margin: theme.spacing(2, 0),
  flexGrow: 1,
}));
export const ResponsiveSquare = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: '100%',
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));
// ! SELECT COLLECTION LIST

export const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  // Use the same styles as in StyledCard
  display: 'flex',
  flexDirection: 'column',
  minWidth: '109px',
  maxWidth: '100%',
  width: 'auto',
  maxHeight: '80vh',
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

export const AspectRatioBoxSkeleton = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
}));
