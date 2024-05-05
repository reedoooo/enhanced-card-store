import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Grid, AppBar, Tabs, Tab, Icon } from '@mui/material';

import burceMars from 'assets/images/bg1.jpg';
import { useMode, useManageCookies } from 'context';
import { MDBox, RCTypography } from 'layout/REUSABLE_COMPONENTS';

function Header({ children }) {
  const { theme } = useMode();
  const { getCookie } = useManageCookies();
  const { authUser } = getCookie(['authUser']);
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < theme.breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }
    window.addEventListener('resize', handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener('resize', handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          overflow: 'hidden',
        }}
      />
      <Card
        sx={{
          position: 'relative',
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <RCTypography variant="h5" fontWeight="medium">
                {authUser?.username}
              </RCTypography>
              <RCTypography variant="button" color="text" fontWeight="regular">
                {authUser?.role_data?.name}
              </RCTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4} lg={4} sx={{ ml: 'auto' }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                theme={theme}
                sx={{
                  bgcolor: theme.palette.success.main,
                  color: theme.palette.text.primary,
                  borderBottom: `1px solid ${theme.palette.success.main}`,
                  '&.Mui-selected': {
                    color: theme.palette.text.primary,
                  },
                  '&.Mui-selected:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {['home', 'email', 'settings'].map((icon, index) => (
                  <Tab
                    key={icon}
                    label={
                      <span
                        style={{
                          color:
                            tabValue === index
                              ? 'black'
                              : theme.palette.text.primary,
                        }}
                      >
                        {icon.charAt(0).toUpperCase() + icon.slice(1)}
                      </span>
                    }
                    icon={
                      <Icon
                        sx={{ color: tabValue === index ? 'black' : 'inherit' }}
                      >
                        {icon}
                      </Icon>
                    }
                  />
                ))}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
