import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import CartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Login from '../../Auth/login';

import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
// import CartModal from '../../modals/CartModal';
// import Stripe from '../../Stripe';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
} from '@mui/material';
import DeckOfCardsIcon from '../../icons/DeckOfCardsIcon';
// import TestingIcon from '../../icons/TestingIcon';
import theme from '../../../assets/styles/themes';
import AssessmentIcon from '@mui/icons-material/Assessment';
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
  justifyContent: 'right',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#000',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}));

// const StyledHomeIcon = styled(HomeIcon)({
//   fontSize: '1em', // or any other value you want
// });

const currentPage = window.location.pathname;
console.log('CURRENT PAGE:', currentPage);
console.log('theme', theme);

function MenuItems({
  isLoggedIn,
  logout,
  handleDrawerClose,
  handleCloseNavMenu,
}) {
  return (
    <>
      <StyledMenuItem component={Link} to="/home" theme={theme}>
        <HomeIcon onClick={handleCloseNavMenu} /> Home
      </StyledMenuItem>
      {isLoggedIn && (
        <>
          <StyledMenuItem component={Link} to="/store">
            <StoreIcon /> Store
          </StyledMenuItem>
          <StyledMenuItem component={Link} to="/deckbuilder">
            <DeckOfCardsIcon /> Deck Builder
          </StyledMenuItem>
        </>
      )}
      <StyledMenuItem component={Link} to="/cart">
        <CartIcon /> Cart
      </StyledMenuItem>
      <StyledMenuItem component={Link} to="/collection">
        <AssessmentIcon /> Collection
      </StyledMenuItem>
      {isLoggedIn ? (
        <Box right={0} marginRight={'-10%'}>
          <StyledMenuItem
            onClick={logout}
            component={Button}
            endIcon={<LogoutIcon />}
            marginRight={'40%'}
            // marginLeft={'40%'}
          >
            Logout
          </StyledMenuItem>
        </Box>
      ) : (
        <Dialog open={!isLoggedIn} onClose={handleDrawerClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Login />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDrawerClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDrawerClose} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default MenuItems;
