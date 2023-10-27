import React, { useEffect, useRef, useState } from 'react';
import {
  MenuItem,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  List,
  Divider,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Logout as LogoutIcon,
  Assessment as AssessmentIcon,
  Deck as DeckOfCardsIcon,
  Person as LoginIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import LoginDialog from '../../dialogs/LoginDialog';
import { useAuthContext } from '../../../context/hooks/auth';
import { AuthContext } from '../../../context/Auth/authContext';
import { StyledListItem, StyledTypography } from './styled';

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

const MenuBox = styled(Box)(({ theme }) => ({
  padding: (props) => (props.isLoggedIn ? '1em' : '2em'),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const menuItemsData = [
  { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
  { name: 'Store', icon: <StoreIcon />, to: '/store', requiresLogin: true },
  {
    name: 'Deck Builder',
    icon: <DeckOfCardsIcon />,
    to: '/deckbuilder',
    requiresLogin: false,
    // requiresLogin: true,
  },
  { name: 'Cart', icon: <CartIcon />, to: '/cart', requiresLogin: true },
  {
    name: 'Collection',
    icon: <AssessmentIcon />,
    to: '/collection',
    requiresLogin: true,
  },
];

const MenuItems = ({
  handleDrawerClose,
  variant,
  isMenuOpen,
  setIsLoginDialogOpen,
  isLoginDialogOpen,
  menuSections,
  handleItemClick,
  isMobileView,
  selectedItem,
  isOpen,
  sections,
}) => {
  const location = useLocation();
  const previousPageRef = useRef();
  const isSidebar = variant === 'sidebar';
  const isDialogOpen = isLoginDialogOpen === true ? true : false;
  const { isloggedin, logout } = useAuthContext();
  const navigate = useNavigate(); // Use the useNavigate hook to navigate programmatically

  useEffect(() => {
    if (location.pathname !== previousPageRef.current) {
      console.log('CURRENT PAGE:', location.pathname);
      previousPageRef.current = location.pathname;
    }
  }, [location.pathname]);
  // console.log('isloggedin:', isloggedin);
  // console.log('isDialogOpen:', isDialogOpen);
  // console.log('isLoginDialogOpen:', isLoginDialogOpen);
  // console.log('isMenuOpen:', isMenuOpen);
  // console.log('isSidebar:', isSidebar);
  // console.log('menuSections:', menuSections);
  // console.log('sections:', sections);
  // console.log('selectedItem:', selectedItem);
  // console.log('isOpen:', isOpen);
  // console.log('isMobileView:', isMobileView);
  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginDialogOpen(false);
    // Handle additional logic upon successful login if needed
  };
  useEffect(() => {
    if (location.pathname !== previousPageRef.current) {
      console.log('CURRENT PAGE:', location.pathname);
      previousPageRef.current = location.pathname;
    }
  }, [location.pathname]);

  const handleMenuItemClick = (to) => {
    // Use history.push to navigate to the desired route
    navigate(to);
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      // console.log('ITEM:', item);
      const { name, icon, to, requiresLogin } = item;
      // console.log('REQUIRES LOGIN:', requiresLogin);
      // console.log('IS LOGGED IN:', isloggedin);
      // console.log('NAME:', name);
      // console.log('TO:', to);

      return isloggedin || !requiresLogin ? ( // Allow non-logged in users to access items marked as not requiring login
        <StyledMenuItem
          key={name}
          component="div"
          onClick={() => handleMenuItemClick(to)}
        >
          {icon} {name}
        </StyledMenuItem>
      ) : null;
    });
  };

  return (
    <div
      style={{
        display: isMenuOpen ? (isSidebar ? 'block' : 'flex') : 'none',
        flexDirection: isSidebar ? 'column' : 'row',
      }}
    >
      <MenuBox>
        {renderMenuItems(menuItemsData)}

        {isloggedin ? (
          <StyledMenuItem onClick={logout}>
            <LogoutIcon /> Logout
          </StyledMenuItem>
        ) : (
          <StyledMenuItem onClick={handleLoginClick}>
            <LoginIcon /> Login
          </StyledMenuItem>
        )}
      </MenuBox>
      <LoginDialog
        // open={isMenuOpen}
        open={isDialogOpen}
        onClose={handleLoginDialogClose}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
};

export default MenuItems;
