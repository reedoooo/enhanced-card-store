import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Divider,
  AppBar,
  Container,
  Toolbar,
  Box,
} from '@mui/material';
import MenuItems from './MenuItems';
import { useSidebarContext } from '../../../context/SideBarProvider';
import { useAuthContext } from '../../../context/hooks/auth';
import { StyledDrawer, StyledListItem, StyledTypography } from './styled'; // Import styled components
import LoginDialog from '../../dialogs/LoginDialog';
// import theme from '../../../assets/styles/themes';
import { Home as HomeIcon, Map as MapIcon } from '@mui/icons-material';
const SideBar = ({
  handleDrawerClose,
  isMobileView,
  isOpen,
  toggleSidebar,
  menuSections,
}) => {
  const { sidebarBackgroundColor, sidebarImage } = useSidebarContext();
  const [selected, setSelected] = useState('Dashboard');
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
    // <AppBar
    //   position="sticky"
    //   elevation={4}
    //   sx={{ backgroundColor: theme.palette.primary.main, padding: '0 2em' }}
    // >
    //   <Container maxWidth="lg">
    //     <Toolbar
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //         maxWidth: '100vw',
    //       }}
    //     >
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <StyledDrawer
      anchor="right"
      open={isOpen}
      onClose={toggleSidebar}
      bgColor={sidebarBackgroundColor} // pass bgColor as prop
    >
      {/* <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <MenuItems
          // logout={logout}
          variant="topbar"
          isMenuOpen={isOpen}
          onLoginClick={handleLoginClick}
          menuSections={menuSections}
          sections={menuSections?.section}
          selectedItem={selected}
          isMobileView={isMobileView}
        />
        {menuSections.map((section, index) => (
          <div key={index}>
            <Divider />
            <StyledTypography variant="h6">{section.title}</StyledTypography>
            {section.items.map((item) => (
              <StyledListItem
                key={item.name}
                selectedItem={selected === item.name}
                onClick={() => handleItemClick(item.name)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: theme?.palette?.primary?.main || 'defaultColor',
                  padding: '0 2em',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="body1">{item.name}</Typography>
              </StyledListItem>
            ))}
          </div>
        ))}
      </List> */}
      <List>
        <MenuItems
          setIsLoginDialogOpen={setIsLoginDialogOpen}
          isLoginDialogOpen={isLoginDialogOpen}
          isMenuOpen={isOpen}
          onLoginClick={handleLoginClick}
          handleDrawerClose={handleDrawerClose}
          variant="sidebar"
          selectedItem={selected}
          sections={menuSections?.section}
          menuSections={menuSections}
          isMobileView={isMobileView}
        />
        {menuSections?.map((section, index) => (
          <div key={index}>
            <Divider />
            <StyledTypography variant="h6">{section?.title}</StyledTypography>
            {section?.items?.map((item) => (
              <StyledListItem
                key={item.index}
                selectedItem={selected === item.name}
                onClick={() => handleItemClick(item.name)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="body1">{item.name}</Typography>
              </StyledListItem>
            ))}
          </div>
        ))}
      </List>
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        onLogin={() => setIsLoginDialogOpen(false)}
      />
    </StyledDrawer>
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
};

export default SideBar;
