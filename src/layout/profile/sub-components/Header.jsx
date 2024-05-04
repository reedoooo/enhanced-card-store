import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '@mui/material/Icon';
import burceMars from 'assets/images/bg1.jpg';
import { useMode } from 'context';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import { Avatar } from '@mui/material';
import useManageCookies from 'context/hooks/useManageCookies';

function Header({ children }) {
  const { theme } = useMode();
  const { getCookie } = useManageCookies();
  const { authUser } = getCookie(['authUser']);
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < theme.breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener('resize', handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
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
                    // label={icon.charAt(0).toUpperCase() + icon.slice(1)}
                    icon={
                      <Icon
                        sx={{ color: tabValue === index ? 'black' : 'inherit' }}
                      >
                        {icon}
                      </Icon>
                    }
                    sx={
                      {
                        // color: tabValue === index ? 'black' : 'inherit', // Conditional styling for text color
                      }
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

// Setting default props for the Header
Header.defaultProps = {
  children: '',
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
