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
} from '@mui/material';
import DeckOfCardsIcon from '../../icons/DeckOfCardsIcon';
import TestingIcon from '../../icons/TestingIcon';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
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

function MenuItems({
  isLoggedIn,
  handleCartIconClick,
  handleTestingIconClick,
  isCartModalOpen,
  logout,
  handleDrawerClose,
}) {
  return (
    <>
      <StyledMenuItem key="home">
        <StyledLink to="/home">
          <HomeIcon /> Home
        </StyledLink>
      </StyledMenuItem>
      {isLoggedIn && (
        <StyledMenuItem key="store">
          <StyledLink
            to="/store"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            <StoreIcon /> Store
          </StyledLink>
        </StyledMenuItem>
      )}
      {isLoggedIn && (
        <StyledMenuItem key="deckbuilder">
          <StyledLink
            to="/deckbuilder"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            <DeckOfCardsIcon /> Deck Builder
          </StyledLink>
        </StyledMenuItem>
      )}
      <StyledMenuItem onClick={handleCartIconClick} key="cart">
        <StyledLink
          to="/cart"
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <CartIcon /> Cart
        </StyledLink>
        {/* <CartModal isOpen={isCartModalOpen} onClose={handleCartIconClick}> */}
        {/* <Stripe /> */}
        {/* </CartModal> */}
      </StyledMenuItem>
      <StyledMenuItem onClick={handleTestingIconClick} key="test">
        {/* <StyledLink
          to="/scrapertester"
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <TestingIcon /> Cart
        </StyledLink> */}
        <StyledLink
          to="/collection"
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <TestingIcon /> Collection
        </StyledLink>
        {/* <CartModal isOpen={isCartModalOpen} onClose={handleCartIconClick}> */}
        {/* <Stripe /> */}
        {/* </CartModal> */}
      </StyledMenuItem>
      {isLoggedIn && (
        <StyledMenuItem key="profile">
          <StyledLink
            to="/userprofile"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            <AccountCircleIcon /> User Profile
          </StyledLink>
        </StyledMenuItem>
      )}
      {isLoggedIn ? (
        <Button variant="outlined" onClick={logout} endIcon={<LogoutIcon />}>
          Logout
        </Button>
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
