import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Images
import DashboardLayout from '../REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import Header from './sub-components/Header';
import PlatformSettings from './sub-components/Settings';
import ProfileInfoCard from './sub-components/ProfileInfoCard';
import { useMode } from '../../context';

function Overview() {
  const { theme } = useMode();
  return (
    <DashboardLayout>
      <MDBox mb={2} mt={-2.2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: 'flex' }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                // eslint-disable-next-line max-len
                description="Hi, I’m Reed Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: 'Alec M. Thompson',
                  mobile: '(44) 123 1234 123',
                  email: 'alecthompson@mail.com',
                  location: 'USA',
                }}
                social={[
                  {
                    link: 'https://www.facebook.com',
                    icon: <FacebookIcon />,
                    color: 'facebook',
                  },
                  {
                    link: 'https://twitter.com',
                    icon: <TwitterIcon />,
                    color: 'twitter',
                  },
                  {
                    link: 'https://www.instagram.com',
                    icon: <InstagramIcon />,
                    color: 'instagram',
                  },
                ]}
                action={{ route: '', tooltip: 'Edit Profile' }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            {/* <Grid item xs={12} xl={4}>
              <ProfilesList
                title="conversations"
                profiles={profilesListData}
                shadow={false}
              />
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium" theme={theme}>
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text" theme={theme}>
              TBD TBD TBD
            </MDTypography>
          </MDBox>
        </MDBox> */}
        {/* <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}></Grid>
            <Grid item xs={12} md={6} xl={3}></Grid>
            <Grid item xs={12} md={6} xl={3}></Grid>
            <Grid item xs={12} md={6} xl={3}></Grid>
          </Grid>
        </MDBox> */}
      </Header>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
