import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Container,
  Menu,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../../context/Auth/authContext';
import MenuItems from '../navigation/MenuItems';
import theme from '../../../assets/styles/themes';
import logo from '../../../assets/navlogo.png';
import { Image } from '@mui/icons-material';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Adjusted the breakpoint to 'xs' to switch to Drawer for smaller screens
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const currentPage = window.location.pathname;
  console.log('CURRENT PAGE:', currentPage);

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{ backgroundColor: theme.palette.primary.main, padding: '0 2em' }}
      // maxWidth="lg"
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100vw',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={isXsDown ? handleDrawerOpen : handleOpenNavMenu}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              <Link
                to="/home"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: theme.palette.text.primary,
                }}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  sx={{ height: '3em', marginLeft: '1em' }}
                />
              </Link>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {isXsDown ? (
              <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
                <MenuItems
                  isLoggedIn={isLoggedIn}
                  logout={logout}
                  handleDrawerClose={handleDrawerClose}
                />
              </Drawer>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'right',
                  marginLeft: '30%',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <MenuItems
                  isLoggedIn={isLoggedIn}
                  logout={logout}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

{
  /* <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              > */
}
