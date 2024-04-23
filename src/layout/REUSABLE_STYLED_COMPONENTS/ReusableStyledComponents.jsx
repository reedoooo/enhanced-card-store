import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import MDButton from '../REUSABLE_COMPONENTS/MDBUTTON';
import rgba from '../../assets/themes/functions/rgba';

// COLOR PALETTE: #777 - opaque
export const StyledContainerBoxPrimary = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  minWidth: '100%',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.grey.simpleGrey,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #8ec7b6 - opaque
export const StyledContainerBoxSecondary = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.greenAccent.lighterSeaGreen,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #4cceac - transparent
export const StyledContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background:
    'linear-gradient(90deg, rgba(13, 93, 150, 0.3) 0%, rgba(160, 214, 186, 0.3) 100%)',
  // background: theme.palette.greenAccent.crystalGreen,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));
// COLOR PALETTE: #4cceac - transparent
export const StyledPaperPrimary = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.greenAccent.contrastText,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
}));
// COLOR PALETTE: #333 - transparent
export const StyledPaper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  mx: 'auto',
  padding: '1rem',
  // background: 'tra|nsparent',
  // background:
  //   'linear-gradient(90deg, rgba(13, 93, 150, 0.3) 0%, rgba(160, 214, 186, 0.3) 100%)',
  background: theme.palette.grey.clearGrey,
  // maxWidth: '1200px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));

// ! DIALOG STYLES
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  height: '100%',
  // display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // top: 64,
  // width: 240,
  width: '100%',
  padding: 0,
  background: theme.palette.grey.clearGrey,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out', // smooth all transitions
  // mx: 'auto',
  // my: 'auto',
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(8),
    display: 'flex',
    width: '100%',
    // height: '100%',
    minWidth: '380px',
    maxWidth: '600px',
    maxHeight: '90vh',
    mx: 'auto',
    my: 'auto',
    flexGrow: 1,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[5],
    '@media (min-width:380px)': {
      p: 0,
      // maxWidth: '380px',
    },
    '@media (max-width:600px)': {
      margin: theme.spacing(2),
    },
    // '& .MuiDialog-paperScrollPaper': {
    //   maxHeight: '90vh', // Slightly more space
    // },
  },
  '&.MuiDialogActions-root': {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
export const DialogPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // margin: 'auto',
  padding: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100%',
  // borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  margin: '20px auto',
  overflow: 'hidden', // Hide unwanted scrollbars
}));
export const DialogContentsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  height: '100%',
  width: '100%',
  // minWidth: '500px',
  // borderRadius: theme.shape.borderRadius,
  background: theme.palette.greenAccent.evenLighter,
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease-in-out', // smooth all transitions
  '@media (max-width:600px)': {
    padding: theme.spacing(2),
  },
}));
export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  // backgroundColor: theme.palette.greenAccent.contrastText,
}));
export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  width: '100%',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.greenAccent.contrastText,
}));
export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  mx: 'auto',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.2)', // Adjust for desired translucency
  // backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out',
  borderRadius: '20px',
  flexGrow: 1, // Make FormBox grow to fill the space
  overflow: 'hidden', // Hide unwanted scrollbars
}));
export const FormPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 8,
  flexGrow: 1,
  width: '100%',
  height: '100%',
  background: theme.palette.greenAccent.evenLighter,
  borderRadius: '16px',
}));
export const FormFieldBox = styled(Box)(({ theme }) => ({
  m: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexGrow: 1, // Ensure fields take available space
  marginBottom: theme.spacing(2),
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    transition: 'border-color 0.5s ease', // Add transition for border color
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.transparent.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      color: theme.palette.greenAccent.default,
      borderColor: theme.palette.greenAccent.default,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.greenAccent.default,
      borderWidth: '2px', // or other width as you like
    },
  },
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.greenAccent.dark,
  width: '100%',
  backgroundColor: theme.palette.greenAccent.contrastText,
  boxShadow: `0px 2px 4px -1px ${theme.palette.grey[400]}`,
  marginBottom: theme.spacing(2),
}));
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
export const CardIconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: theme.spacing(4),
  width: theme.spacing(4),
  borderRadius: '50%',
  backgroundColor: theme.palette.greenAccent.evenLighter,
  color: theme.palette.grey.black,
  '& svg': {
    fontSize: theme.typography.pxToRem(20),
  },
}));
export const CardDetailContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 4px 8px 0 ${theme.palette.shadow}`,
  backgroundColor: theme.palette.greenAccent.contrastText,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `0 6px 12px 0 ${theme.palette.shadow}`,
  },
}));
export const SearchSettingsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
export const AspectRatioBox = styled(Box)(({ theme }) => ({
  width: '100%', // Full width of the parent container
  position: 'relative',
  justifyContent: 'center',
}));
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'left',
  minHeight: '50px', // Adjust based on the size of the text
  border: `1px solid ${theme.palette.grey.lighterSimpleGrey}`,
  borderRadius: theme.shape.borderRadius,
  // Media queries for padding
  padding: theme.spacing(1), // default padding
  // [theme.breakpoints.down('xs')]: {
  //   padding: theme.spacing(1),
  // },
  // [theme.breakpoints.between('sm', 'md')]: {
  //   padding: theme.spacing(1.5),
  // },
  // [theme.breakpoints.up('lg')]: {
  //   padding: theme.spacing(2),
  // },
}));
export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100px',
  maxWidth: '100%',
  maxHeight: '100%', // Adjusted for better height management
  flexGrow: 1,
  backgroundColor: theme.palette.greenAccent.contrastText,
  borderRadius: theme.shape.borderRadius,
  justifyContent: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
export const QuantityLine = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.primary,
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
  background: theme.palette.grey.contrastText,
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
  backgroundColor: theme.palette.greenAccent.contrastText,
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
  backgroundColor: theme.palette.greenAccent.contrastText,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));
// ! FORMS / INPUTS
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.greenAccent.contrastText, // Adjusted for a slight contrast
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1], // Subtle shadow for depth

  '& .MuiFilledInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.greenAccent.contrastText,
      borderColor: theme.palette.greenAccent.light,
    },
  },
}));
export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 'bold', // Making label text bold
  color: theme.palette.grey.simpleGrey,
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
  backgroundColor: theme.palette.greenAccent.contrastText,
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
export const PortfolioBoxA = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  boxShadow: theme.shadows[5],
  [theme.breakpoints.down('sm')]: {},
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
export const FeatureCard = styled(Card)(({ theme }) => ({
  background: theme.palette.greenAccent.lightest,
  boxShadow: theme.shadows[5],
  transition: 'box-shadow 0.3s ease-in-out', // smooth transition for shadow
  '&:hover': {
    boxShadow: theme.shadows[15], // more prominent shadow on hover
    transform: 'translateY(-3px)', // slight upward lift
  },
}));
