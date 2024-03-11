import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  ButtonBase,
  Avatar,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMode, useSidebarContext } from '../../context';
import LogoSection from './LogoSection';
import MenuItemComponent from './MenuItemComponent';
import MenuIcon from '@mui/icons-material/Menu';

import {
  StyledAppBar,
  StyledMenuItem,
  StyledToolbar,
} from '../../pages/pageStyles/StyledComponents';
const TopBar = ({ isMobileView, isLoggedIn, handleDrawer }) => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { visibleItems, setVisibleItems, menuItems, baseMenuItems } =
    useSidebarContext();

  useEffect(() => {
    // Logic to set visibleItems
    setVisibleItems(Array(menuItems.length).fill(false));
    menuItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * 100);
    });
  }, [menuItems.length, setVisibleItems]);

  const renderMenuItems = () =>
    menuItems.map((item, index) => (
      <StyledMenuItem
        key={`${item.name}-topbar-item-${index}`}
        onClick={() => navigate(item.to)}
        theme={theme}
        style={{
          opacity: visibleItems[index] ? 1 : 0,
          transform: visibleItems[index]
            ? 'translateY(0)'
            : 'translateY(-20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        <MenuItemComponent item={item} />
      </StyledMenuItem>
    ));

  return (
    <StyledAppBar
      // position="relative"
      position="sticky"
      theme={theme}
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <StyledToolbar
        position="relative"
        theme={theme}
        disableGutters
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isMobileView ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '100%',
              // justifyContent: 'space-between',
            }}
          >
            {/* {renderMenuItems()} */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawer}
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{
                px: 1,
                mx: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
            <LogoSection />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              maxWidth: '99%',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {renderMenuItems()}
          </Box>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopBar;
