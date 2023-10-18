import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  List,
  Divider,
  ListItemIcon,
  useTheme,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/navlogo.png';
// import theme from '../../../assets/styles/themes';
import MenuItems from './MenuItems';
import { Image } from '@mui/icons-material';
import {
  StyledAppBar,
  StyledBox,
  StyledIconButton,
  StyledListItem,
  StyledToolbar,
  StyledTypography,
} from './styled';
import ThemeToggleButton from '../../buttons/ThemeToggleButton';

const TopBar = ({
  handleDrawerOpen,
  handleDrawerClose,
  logout,
  isOpen,
  isMobileView,
  menuSections,
}) => {
  const [selected, setSelected] = useState('Dashboard');
  // const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const theme = useTheme();
  // console.log('theme', theme);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
  };

  const handleItemClick = (name) => {
    setSelected(name);
    handleDrawerClose();
  };
  if (!isMobileView) {
    handleDrawerClose();
  }
  return (
    <StyledAppBar
      position="sticky"
      elevation={4}
      sx={{
        padding: '0 2em',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar>
          <StyledBox>
            {isMobileView && (
              <StyledIconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </StyledIconButton>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/home"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                marginLeft: '1em',
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                sx={{ height: '3em', marginRight: '0.5em' }}
              />
              SiteName
            </Typography>
          </StyledBox>
          {!isMobileView && (
            <MenuItems
              handleDrawerClose={handleDrawerClose}
              variant="topbar"
              isMenuOpen={!isMobileView}
              setIsLoginDialogOpen={setIsLoginDialogOpen}
              isLoginDialogOpen={isLoginDialogOpen}
              menuSections={menuSections}
              handleItemClick={handleItemClick}
              isMobileView={isMobileView}
              selectedItem={selected}
              isOpen={isOpen}
            />
          )}
          <ThemeToggleButton />
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default TopBar;
