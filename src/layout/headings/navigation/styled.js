import { Box, styled } from '@mui/system';
import {
  AppBar,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
// // ! TOP BAR STYLES -----------------------------
// export const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   width: '93.5%',
//   // width: '98%',
//   // width: '95vw',
//   // right: '3.2%',
//   border: '2px solid white',
//   borderRadius: '30px',
//   background:
//     'linear-gradient( 90deg, rgba(78, 78, 246, 0.647) 0%, rgba(247, 90, 216, 0.696) 100% );',
//   // background: theme.palette.backgroundB.lightest,
//   // // transform: topbarup ? 'translateY(-64px)' : 'translateY(0)',
//   // transition: 'transform 0.3s ease-in-out',
// }));
// export const StyledToolBarContainer = styled(AppBar)(({ theme }) => ({
//   // display: 'flex',
//   // flexDirection: 'row',
//   // justifyContent: 'space-between',
//   // alignItems: 'center',
//   // width: '100%',
//   // Do not explicitly set the height here to allow Toolbar's default styling to take effect
//   backgroundColor: theme.palette.backgroundA.darker,
//   borderRadius: '30px',

//   mr: 2,
//   px: 3,
//   display: { xs: 'none', md: 'flex' },
//   fontFamily: 'monospace',
//   fontWeight: 700,
//   letterSpacing: '.3rem',
//   color: 'inherit',
//   textDecoration: 'none',
// }));
// export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   // display: 'flex',
//   // flexDirection: 'row',
//   // justifyContent: 'space-between',
//   // mx: 'auto',
//   // alignItems: 'center',
//   // width: '100%',
//   // // Do not explicitly set the height here to allow Toolbar's default styling to take effect
//   // backgroundColor: theme.palette.backgroundA.darker,
//   mr: 2,
//   display: { xs: 'none', md: 'flex' },
//   fontFamily: 'monospace',
//   fontWeight: 700,
//   letterSpacing: '.3rem',
//   color: 'inherit',
//   textDecoration: 'none',
// }));
// // ! MENU ITEMS COMPONENT STYLES -----------------------------
// export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   cursor: 'pointer',
//   flexGrow: 1,
//   mx: 'auto',
//   px: '1',
//   // height: '100%',
//   // width: '100%',
//   '&:hover': {
//     // backgroundColor: theme.palette.backgroundA.hover,
//   },
//   '& .MuiListItemIcon-root': {
//     minWidth: '35px',
//   },
//   '& .MuiTypography-root': {
//     fontSize: '1.2em',
//     fontWeight: 500,
//   },
//   '& .MuiSvgIcon-root': {
//     fontSize: '1.5em',
//     marginRight: theme.spacing(1),
//   },
// }));
// export const StyledListItemText = styled(ListItem)(({ theme }) => ({
//   cursor: 'pointer',
//   '&:hover': {
//     backgroundColor: theme.palette.action,
//   },
// }));
// export const StyledListItemIcon = styled(ListItemIcon)(({ theme, item }) => ({
//   cursor: 'pointer',
//   my: 'auto',
//   minWidth: !item?.icon ? 18 : 36,
//   '&:hover': {
//     backgroundColor: theme.palette.action,
//   },
// }));
// export const StyledIconButton = styled(IconButton)(({ theme }) => ({
//   color: theme.palette.text,
// }));
// export const StyledBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'row',
//   width: 250,
// }));
// // ! SIDEBAR COMPONENT STYLES -----------------------------
// export const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
//   '.MuiPaper-root': {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     backgroundColor: theme.palette.backgroundA.default,
//     // top: 64,
//     // width: 240,
//     // position: 'absolute',
//     flexGrow: 1,
//     justifyContent: 'space-between',
//     // backgroundColor: theme.palette.backgroundA.lightest,
//     // !-----
//   },
// }));
// export const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));
// export const StyledListItem = styled(ListItem)(({ theme }) => ({
//   cursor: 'pointer',
//   height: '100%',
//   flexGrow: 1,
//   '&:hover': {
//     backgroundColor: theme.palette.backgroundA.onHover,
//   },
// }));
// export const StyledListItemButton = styled(ListItem)(({ theme }) => ({
//   cursor: 'pointer',
//   '&:hover': {
//     backgroundColor: theme.palette.action,
//   },
// }));
