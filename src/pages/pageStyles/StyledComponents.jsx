import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';

// export const AppContainer = styled.div`
export const AppContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  // background: '#222',
}));
// const StyledContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   // alignSelf: 'start',
//   alignItems: 'center',
//   justifyContent: 'center',
//   // marginLeft: theme.spacing(2),
//   borderRadius: theme.shape.borderRadiusLarge,
//   // marginRight: theme.spacing(2),
//   // minHeight: '250vh',
//   flexGrow: 1,
//   // minHeight: '100%',
//   background: '#333',
//   // backgroundColor: '#f1f1f1',
//   padding: {
//     xs: 0,
//     sm: theme.spacing(1),
//     md: theme.spacing(2.5),
//     lg: theme.spacing(2.5),
//   },
//   height: '100%',
//   width: '100%',
// }));

// export const AppContainer = ({ children }) => {
//   return <ContainerForApp>{children}</ContainerForApp>;
// };
const StyledContainer2 = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusLarge,
  marginRight: theme.spacing(2),
  // minHeight: '250vh',
  flexGrow: 1,
  // minHeight: '100%',
  background: '#333',
  // backgroundColor: '#f1f1f1',
  padding: theme.spacing(4),
  width: '100%',
}));

export const CollectionContainer2 = ({ children }) => {
  return <StyledContainer2>{children}</StyledContainer2>;
};
export const MainContainer = styled('div')(({ theme }) => ({
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
// extra padding | gap
export const MainContainerb = styled('div')(({ theme }) => ({
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
// extra padding + gap
export const MainContainer2b = styled('div')(({ theme }) => ({
  background: '#333', // Dark background
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  maxHeight: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));
export const MainContainer3 = styled('div')(({ theme }) => ({
  background: '#444', // Dark background
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
// export const SecondaryContainer = styled('div')(({ theme }) => ({
//   background: '#b7ebde',
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   maxHeight: '100%',
//   width: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
// }));
// export const TertiaryContainer = styled('div')(({ theme }) => ({
//   padding: 3,
//   borderRadius: 2,
//   background: theme.palette.success.main,
//   boxShadow: theme.shadows[10],
//   mb: 4,
// }));
export const MainPaperContainer = styled('div')(({ theme }) => ({
  elevation: 3,
  borderRadius: 2,
  margin: 0,
  marginBottom: theme.spacing(2),
  background: theme.palette.background.main,
  width: '100%',
  padding: theme.spacing(2),
}));

export const SecondaryPaperContainer = styled('div')(({ theme }) => ({
  elevation: 3,
  borderRadius: 2,
  margin: 0,
  marginBottom: theme.spacing(2),
  background: '#70d8bd',
  width: '100%',
  padding: theme.spacing(2),
}));

export const DeckBuilderBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  maxWidth: '1600px',
  margin: 'auto',
  padding: theme.spacing(6, 2),
  height: '100%',
  boxShadow: theme.shadows[4],
  textAlign: 'center',
}));
// export const DeckBuilderBanner = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   padding: theme.spacing(6, 2),
//   boxShadow: theme.shadows[4],
//   textAlign: 'center',
// }));
// export const DeckBuilderBanner = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #f9f9f9;
//   width: 100%;
//   margin: auto;
// `;
export const AvatarStyled = styled(Avatar)({
  width: 60,
  height: 60,
  marginBottom: 15,
});

export const TypographyStyled = styled(Typography)({
  marginBottom: 15,
});

export const IconButtonStyled = styled(IconButton)({
  marginBottom: 20,
});

export const DataBoxStyled = styled(Box)({
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
});

export const ButtonStyled = styled(Button)({
  margin: '15px 0',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

export const MiddleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.quinternary,
  boxShadow: theme.shadows[3],
  width: '100%',
}));

export const RootContainer = styled(Box)(({ theme, isXSmallScreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 'auto',
  alignItems: 'stretch',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  padding: theme.spacing(2),
}));

export const ListContainer = styled('div')(({ theme, isXSmallScreen }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.success.evenLighter,
  boxShadow: theme.shadows[3],
  width: '100%',
  height: '100%',
  padding: theme.spacing(isXSmallScreen ? 1 : 2),
}));

export const buttonStyle = (theme, buttonSize) => ({
  padding: buttonSize === 'small' ? theme.spacing(1) : theme.spacing(2),
  fontSize: buttonSize === 'small' ? 'small' : 'default',
  color: theme.palette.info.main,
});

export const DataTextStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
});

export const DataTextBoldStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
  fontWeight: 'bold',
});

export const DeckBuilderTitle = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontSize: '1.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2.5),
}));

export const CartContainer = styled(Container)(({ theme }) => ({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  margin: 'auto',
  flexWrap: 'wrap', // Ensure wrapping on smaller screens
  // overflowY: 'auto', // Enable vertical scrolling
  // overflowX: 'hidden', // Prevent horizontal scrolling
  // maxHeight: '400px',
  backgroundColor: theme.palette.background.main,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  width: '100%',
}));

export const CartBox = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap', // Ensure wrapping on smaller screens
  backgroundColor: theme.palette.background.secondary,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  height: '100%',
  width: '100%',
}));

export const CollectionTitle = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontSize: '1.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2.5),
}));

export const CollectionBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  // margin: '0 auto',
  flexDirection: 'column',
  alignItems: 'center',
  // padding: theme.spacing(2.5),
  // padding: theme.spacing(6, 2),
  // height: '100%',
  width: '100%',
  maxWith: '100%',
  // height: '100%',
  // maxWidth: '1600px',
  // maxHeight: '80%',
  // margin: 'auto',
  boxShadow: theme.shadows[4],
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  // backgroundColor: '#f7f7f7',
}));

export const CollectionContentsStyles = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  // margin: '0 auto',
  // flexDirection: 'column',
  // alignItems: 'center',
  // padding: theme.spacing(2.5),
  height: '100vh',
  width: '100%',
  // background: '#333',

  backgroundColor: theme.palette.background.main,
  // backgroundColor: '#f7f7f7',
}));

export const CollectionContents = ({ children }) => {
  return <CollectionContentsStyles>{children}</CollectionContentsStyles>;
};

export const StoreBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '100%',
  justifyContent: 'center',
  margin: '0 auto',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  backgroundColor: '#f7f7f7',
}));

export const StoreTitle = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontSize: '1.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2.5),
}));

export const CustomButton = styled(Button)({
  margin: '10px',
  width: '100%',
  padding: '10px 0',
  fontSize: '16px',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  margin: '10px 0',
});

export const ProfileFormContainer = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

// HOME PAGE STYLED COMPONENTS
export const HomePageBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.light,
  padding: theme.spacing(2, 4, 8),
  margin: theme.spacing(1, 2, 4),
  borderRadius: theme.shape.borderRadius,
  elevation: 3,
  boxShadow: theme.shadows[7],
  display: 'flex',
  flexDirection: 'column',
}));

export const CarouselContainer = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[10],
  overflow: 'hidden', // ensuring the carousel stays within bounds
  '&:hover': {
    transform: 'scale(1.02)', // slightly reduced scale for subtlety
    transition: 'transform 0.3s ease-in-out',
  },
}));

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
  background: theme.palette.success.main,
  '&:hover': {
    background: theme.palette.success.dark, // Darken button on hover for feedback
  },
}));

export const MainContentContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 4, 6),
  // minHeight: '100%',
  // minHeight: '35vh',
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
  // justifyContent: 'center',
  // // marginBottom: theme.spacing(2),
  // width: '100%',
  // height: '100%',
  // flexDirection: 'row',
  // boxShadow: theme.shadows[3],
  // borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s',
  // position: 'relative',
  // paddingTop: theme.spacing(10), // Add top padding
  // paddingBottom: theme.spacing(20), // Add bottom padding
  // // marginBottom: theme.spacing(20),
  // // paddingLeft: theme.spacing(10), // Add left padding
  // // paddingRight: theme.spacing(10), // Add right padding
  // minHeight: '70vh', // Adjust the height as needed to fit the animation
  // maxHeight: '80vh',
  // // alignItems: 'flex-start', // Center the animation vertically
  // alignContent: 'center', // Center the animation vertically
  // overflow: 'hidden', // Prevent overflow
  // display: 'flex',
  // alignItems: 'center', // Align children to the center horizontally
  // justifyContent: 'space-between', // Distribute space between children
}));

export const TertiaryContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.success.main,
  boxShadow: theme.shadows[10],
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease-in-out', // smooth all transitions
}));

// Define a styled component for the unordered list
export const CardUnorderedList = styled('ul')(({ theme }) => ({
  listStyleType: 'disc', // or 'circle' or 'square' for different bullet styles
  paddingLeft: theme.spacing(4), // Adjust based on theme spacing for indentation
  margin: 0, // Remove default margins
}));

// Define a styled component for the list item text
export const CardListItem = styled('li')(({ theme }) => ({
  // Apply your desired typography styles
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(1), // Space between list items
  textAlign: 'left', // Align text to the left
  fontSize: '1rem', // Adjust font size as needed
}));
