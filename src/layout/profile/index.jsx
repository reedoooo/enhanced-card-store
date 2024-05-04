import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Images
import DashboardLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashBoardLayout';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import Header from './sub-components/Header';
import PlatformSettings from './sub-components/Settings';
import ProfileInfoCard from './sub-components/ProfileInfoCard';
import { useMode } from 'context';

function Overview() {
  const { theme } = useMode();
  return (
    <DashboardLayout
      sx={{
        flexGrow: 1,
        width: '100%',
      }}
    >
      <Header>
        <MDBox
          mt={5}
          mb={3}
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: 'flex' }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                // eslint-disable-next-line max-len
                description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
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
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
