import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  ListItem,
  ListItemIcon,
  SwipeableDrawer,
  List,
  FormControlLabel,
  FormControl,
  InputLabel,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  CardContent,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  TableBody,
  Table,
  TableHead,
} from '@mui/material';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

// ! APP CONTAINER -----------------------------
export const AppContainer = styled(Container)(({ theme }) => ({
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  justifyContent: 'center',
  minHeight: '100vh', // Ensures at least the height of the viewport
  width: '100%', // Ensures it takes the full width
  minWidth: '100vw', // Ensures at least the width of the viewport
  maxWidth: '100vw',
  overflowX: 'hidden',
  boxSizing: 'border-box' /* Ensures padding is included in width */,
  // overflow: 'hidden', // Prevents unwanted scrolling if not necessary
  // [theme.breakpoints.down('sm')]: {
  //   paddingTop: theme.spacing(6),
  //   paddingBottom: theme.spacing(6),
  // },
}));
// ! TOP BAR STYLES -----------------------------
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  minWidth: '100vw',
  maxWidth: '100vw',
  // minWidth: '100%',
  border: '2px solid white',
  // left: -20,
  // borderRadius: '30px',
  background:
    'linear-gradient(90deg, rgba(13, 93, 150, 1) 0%, rgba(160, 214, 186, 1) 100%);', // Subtle blue to green gradient
}));
export const StyledToolBarContainer = styled(AppBar)(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'space-between',
  // alignItems: 'center',
  // width: '100%',
  // Do not explicitly set the height here to allow Toolbar's default styling to take effect
  backgroundColor: theme.palette.backgroundA.darker,
  // borderRadius: '30px',
  flexGrow: 1,

  // mr: 2,
  // px: 3,
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
  height: '100%',
  // '&:hover': {
  //   backgroundColor: theme.palette.backgroundA.onHover,
  // },
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
  // width: 250,
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
// export const StyledListItem = styled(ListItem)(({ theme }) => ({
//   cursor: 'pointer',
//   height: '100%',
//   flexGrow: 1,
//   '&:hover': {
//     backgroundColor: theme.palette.backgroundA.onHover,
//   },
// }));
export const StyledListItemButton = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action,
  },
}));
// ! TOP CARDS DISPLAY
export const MainContainer = styled(Container)(({ theme }) => ({
  background: '#222', // Dark background
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxWidth: '100%',
  // maxHeight: '400px',
  // maxHeight: '100%',
  // maxWidth: '1600px',
  // width: '100%',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));
// ! CAROUSEL CARD
export const MainContainer2 = styled(Box)(({ theme }) => ({
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
export const ChartContainer = styled(Box)(({ theme, height, width }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  height: height,
  width: width,
  minHeight: '390px',
  minWidth: '390px',
  position: 'relative',
  padding: theme.spacing(2),
  background: theme.palette.backgroundB.darker,
}));
export const LinearChartContainer = styled(Box)(({ theme }) => ({
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: 'auto',
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

// ! DECK DISPLAY PAGE
export const DeckDisplayBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.backgroundB.lightest,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
  maxWidth: '800px',
}));

export const DeckDisplayPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.backgroundA.light,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
}));

export const DeckDisplayTitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const DeckStyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.backgroundA.dark,
  color: theme.palette.backgroundA.contrastTextA,
  '&:hover': {
    backgroundColor: theme.palette.backgroundA.darker,
  },
  display: 'flex',
  alignItems: 'center',
}));

export const SwitchControl = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const DeckCardsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

export const NoCardsTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
  fontStyle: 'italic',
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
  background: theme.palette.backgroundA.light,
  boxShadow: theme.shadows[5],
  transition: 'box-shadow 0.3s ease-in-out', // smooth transition for shadow
  '&:hover': {
    boxShadow: theme.shadows[15], // more prominent shadow on hover
    transform: 'translateY(-3px)', // slight upward lift
  },
}));
export const ActionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.backgroundA.dark,
  background: theme.palette.backgroundA.dark,
  '&:hover': {
    background: theme.palette.backgroundA.light, // Darken button on hover for feedback
  },
}));
export const MainContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 4, 6),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.backgroundD.dark,
  boxShadow: theme.shadows[10],
  marginTop: theme.spacing(2),
  margin: theme.spacing(4, 0), // added vertical spacing
}));
export const SecondaryContentContainer = styled(Paper)(({ theme }) => ({
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
export const TertiaryContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundD.dark,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
export const CardUnorderedList = styled(List)(({ theme }) => ({
  listStyleType: 'disc', // or 'circle' or 'square' for different bullet styles
  paddingLeft: theme.spacing(4), // Adjust based on theme spacing for indentation
  margin: 0, // Remove default margins
}));
export const CardListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(1), // Space between list items
  textAlign: 'left', // Align text to the left
  fontSize: '1rem', // Adjust font size as needed
}));

// ! PORTFOLIO CHART STYLES
export const ChartArea = styled(Container)(({ theme }) => ({
  height: '100%',
  width: '100%',
  // minHeight: '500px',
  position: 'relative',
  flexGrow: 1,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.backgroundB.contrastText,
}));
export const SquareChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%', // 100% of the parent width
  paddingTop: '100%', // Maintain aspect ratio (1:1)
  overflow: 'hidden',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
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
  // minWidth: '109px',
  minWidth: '100%',
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  // minHeight: '100%',
  minHeight: 100,
  alignItems: 'center',
  flexGrow: 1,
  // width: 'auto',
  maxHeight: '14vh',
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
export const ListItemSkeleton = styled(ListItem)(({ theme }) => ({
  // margin: theme.spacing(1, 0),
  // borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  width: '100%',
  minWidth: 200,
  minHeight: 200,
  maxHeight: 200,
  flexGrow: 1,
  transition: '0.3s',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));
export const AspectRatioBoxSkeleton = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  flexGrow: '1',
}));
// COLLLECTION LIST ITEM
export const StyledCollectionListCard = styled(Card)(({ theme }) => ({
  // margin: theme.spacing(1),
  width: '100%',
  // height: '100%',
  flexGrow: 1,
  transition: 'transform 0.3s ease-in-out',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    transform: 'scale(1.03)',
  },
}));
export const StyledCollectionListCardContent = styled(CardContent)(
  ({ theme }) => ({
    textAlign: 'center',
    alignItems: 'center',
    // padding: theme.spacing(2),
  })
);
export const StyledStatisticTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
}));

// ! FORMS / INPUTS
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.backgroundA.lightest, // Adjusted for a slight contrast
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1], // Subtle shadow for depth

  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.backgroundA.lightest,
      borderColor: theme.palette.backgroundA.dark,
    },
  },
}));
export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 'bold', // Making label text bold
  color: theme.palette.backgroundB.dark,
}));
// FORM STYLES
// export const FormWrapper = styled('form')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   flexGrow: 1,
//   gap: theme.spacing(2),
//   padding: theme.spacing(3),
//   margin: 'auto',
//   alignItems: 'center',
//   backgroundColor: theme.palette.backgroundA.light,
//   borderRadius: theme.shape.borderRadius,
// }));
export const StyledFormPaper = styled(Paper)(({ theme }) => ({
  width: '100%',

  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: 4,
  margin: 'auto',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[9],
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.backgroundA.default,
  color: theme.palette.backgroundA.contrastTextB,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.backgroundA.darkest,
    color: theme.palette.backgroundA.contrastTextA,
  },
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    transition: 'border-color 0.5s ease', // Add transition for border color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.transparent.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      color: theme.palette.backgroundA.darker,
      borderColor: theme.palette.backgroundA.darker,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.backgroundA.darker,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.backgroundA.darkest,
  width: '100%',
  backgroundColor: theme.palette.backgroundA.lightest,
  boxShadow: `0px 2px 4px -1px ${theme.palette.grey[400]}`,
  marginBottom: theme.spacing(2),
}));
export const StyledFormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3),
  minHeight: '100%',
  // backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
}));
export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.backgroundA.dark, // Or any other appropriate color
  color: theme.palette.backgroundA.contrastTextA,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`, // Only round the top corners
  '& .MuiTypography-root': {
    fontWeight: 'bold',
  },
  '& .MuiIconButton-root': {
    color: theme.palette.backgroundA.contrastTextA, // Ensure it stands out or matches
  },
}));

// ! FORM B
export const SearchSettingsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// ! PORTFOLIO TABLE STYLES
export const PortfolioTablePaper = styled(Paper)(({ theme }) => ({
  maxWidth: 'lg',
  margin: 'auto',
  overflowX: 'auto', // Ensures table doesn't overflow the paper
  background: theme.palette.backgroundB.default,
  padding: theme.spacing(2),
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(1), // Smaller padding for xs
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2), // Medium padding for sm
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2), // Larger padding for md
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2), // Extra larger padding for lg
  },
  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(2), // Maximum padding for xl
  },
}));
export const PortfolioTable = styled(Table)(({ theme }) => ({
  minWidth: 300,
  minHeight: 300,
  width: '100%',
  height: '100%',
  background: theme.palette.backgroundA.lightest,
}));
// TABLE HEADER
export const PortfolioTableHeader = styled(TableHead)(({ theme }) => ({
  background: theme.palette.backgroundA.lighter,
  color: theme.palette.backgroundA.contrastTextA,
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
}));
// TABLE BODY
export const PortfolioTableBody = styled(TableBody)(({ theme }) => ({
  background: theme.palette.backgroundA.lightest,
  border: '2px solid',
  borderColor: theme.palette.divider,
}));
export const PortfolioTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   background: theme.palette.backgroundA.light,
  // },
  // '&:nth-of-type(even)': {
  //   background: theme.palette.backgroundA.lighter,
  // },
}));
export const PortfolioTableCell = styled(TableCell)(({ theme }) => ({
  border: '2px solid',
  borderColor: theme.palette.divider,
  // background: theme.palette.backgroundA.light,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.7rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
    fontSize: '1rem',
  },
}));
// TABLE FOOTER
export const PortfolioTableFooter = styled(TableFooter)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundA.lighter,
  borderTop: `1px solid ${theme.palette.divider}`,
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
  },
}));
export const PortfolioPaginationActionsTableRow = styled(TableRow)(
  ({ theme }) => ({
    // Example styling, you can customize as needed
    backgroundColor: theme.palette.backgroundA.lighter,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTableCell-root': {
      textAlign: 'right',
      padding: theme.spacing(1),
    },
  })
);
export const PortfolioPaginationActionsTableCell = styled(TableCell)(
  ({ theme }) => ({
    // Example styling, you can customize as needed
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: theme.palette.backgroundA.contrastTextA,
    backgroundColor: theme.palette.backgroundA.lighter,

    '&:hover': {
      color: theme.palette.backgroundA.contrastTextA,
    },
    '& .MuiTableCell-root': {
      textAlign: 'right',
      padding: theme.spacing(1),
    },
  })
);
export const PortfolioPaginationActionsTableContentsContainer = styled(Box)(
  ({ theme }) => ({
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
    // ml: 2.5,
    width: '100%',
    flexDirection: 'row',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
  })
);
// TABLE PRICE BOX
export const PortfolioTablePriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  background: theme.palette.backgroundB.lighter,
}));
// ! CHART AND DATATABLES
export const StyledChartBox = styled(Box)(({ theme }) => ({
  padding: '15px',
  border: '2px solid #444',
  borderRadius: '8px',
  backgroundColor: '#222',
  color: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%', // Adjust height here
  width: '100%', // Adjust width here
}));
// ! CARD CAROUSEL
export const StyledCarousel = styled(Box)(({ theme }) => ({
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: '100%',
  height: 180,
  perspective: '1200px',
  [theme.breakpoints.up('md')]: {
    width: '50%',
    height: 250,
  },
}));
export const StyledSwiperSlide = styled(SwiperSlide)(({ theme }) => ({
  '& .swiper-slide': {
    opacity: 0.5,
    transform: 'scale(0.85)',
    transition: 'transform 0.3s, opacity 0.3s',
    '&-active': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
    '&-next, &-prev': {
      transform: 'scale(0.8)',
    },
  },
}));
// ! +++++++++ COMMON +++++++++
export const PortfolioBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100vw',
  width: '100%',
  height: '100%',
  margin: theme.spacing(0, 'auto'),
  padding: theme.spacing(1, 2, 3),
  // backgroundColor: theme.palette.backgroundE.lightest,
  color: theme.palette.text.primary,
}));
export const PortfolioBoxA = styled(Box)(({ theme }) => ({
  // flexDirection: 'column',
  flexGrow: 1,
  // height: 'auto',
  // width: '100%',
  // minHeight: '100vh', // Reducing height by 128px
  boxShadow: theme.shadows[5],
  // backgroundColor: theme.palette.backgroundE.lightestBlue,
  [theme.breakpoints.down('sm')]: {
    // padding: theme.spacing(2),
  },
}));
export const PortfolioBoxB = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  background: theme.palette.backgroundD.dark,
  padding: theme.spacing(4),
  width: '100%',
  height: '100%',
  boxShadow: theme.shadows[5],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
