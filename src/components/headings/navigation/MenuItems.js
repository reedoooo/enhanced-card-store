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
import { useCookies } from 'react-cookie';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.2em',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

const MenuBox = styled(Box)(({ theme }) => ({
  padding: '1em',
  display: 'flex',
  flexDirection: 'row',
}));

const menuItemsData = [
  { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
  { name: 'Store', icon: <StoreIcon />, to: '/store', requiresLogin: true },
  {
    name: 'Deck Builder',
    icon: <DeckOfCardsIcon />,
    to: '/deckbuilder',
    requiresLogin: false,
  },
  { name: 'Cart', icon: <CartIcon />, to: '/cart', requiresLogin: true },
  {
    name: 'Collection',
    icon: <AssessmentIcon />,
    to: '/collection',
    requiresLogin: true,
  },
];

const MenuItems = ({ handleDrawerClose, onLogin }) => {
  const { logout } = useAuthContext();
  const [cookies] = useCookies(['isloggedin']);
  const isloggedin = cookies.isloggedin === true; // adjust the condition according to how you store the value in the cookie

  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLoginDialogClose = () => {
    setIsLoginDialogOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };

  const handleLoginSuccess = () => {
    if (isMounted.current) {
      setIsLoginDialogOpen(false);
      if (onLogin) {
        onLogin();
      }
    }
  };

  const handleMenuItemClick = (to) => {
    navigate(to);
  };

  const filteredMenuItems = menuItemsData.filter(
    (item) => !item.requiresLogin || isloggedin
  );
  return (
    <Box
      isloggedin={isloggedin ? 'true' : 'false'}
      // bgcolor={'primary.main'}
      sx={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {filteredMenuItems?.map((item) => {
        const { name, icon, to, requiresLogin } = item;
        return isloggedin || !requiresLogin ? (
          <StyledMenuItem
            key={name}
            component="div"
            onClick={() => handleMenuItemClick(to)}
          >
            {icon}
            {name}
          </StyledMenuItem>
        ) : null;
      })}
      {isloggedin ? (
        <StyledMenuItem onClick={logout}>
          <LogoutIcon /> Logout
        </StyledMenuItem>
      ) : (
        <StyledMenuItem onClick={handleLoginClick}>
          <LoginIcon /> Login
        </StyledMenuItem>
      )}
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
        onLogin={handleLoginSuccess}
      />
    </Box>
  );
};

export default MenuItems;
