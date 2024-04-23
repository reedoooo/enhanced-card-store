import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Images
import homeDecor1 from '../../assets/images/bg1.jpg';
import homeDecor2 from '../../assets/images/bg1.jpg';
import homeDecor3 from '../../assets/images/bg1.jpg';
import homeDecor4 from '../../assets/images/bg1.jpg';
import team1 from '../../assets/images/bg1.jpg';
import team2 from '../../assets/images/bg1.jpg';
import team3 from '../../assets/images/bg1.jpg';
import team4 from '../../assets/images/bg1.jpg';
import DashboardLayout from '../REUSABLE_COMPONENTS/layout-utils/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import Header from './sub-components/Header';
import PlatformSettings from './sub-components/Settings';
import ProfileInfoCard from './sub-components/ProfileInfoCard';
import ProfilesList from './sub-components/ProfilesList';
import profilesListData from './sub-components/profilesListData';
import MDTypography from '../REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import DefaultProjectCard from './sub-components/DefaultProjectCard';
import Footer from './sub-components/Footer';

function Overview() {
  return (
    <DashboardLayout>
      <MDBox mb={2} />
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
                    link: 'https://www.facebook.com/CreativeTim/',
                    icon: <FacebookIcon />,
                    color: 'facebook',
                  },
                  {
                    link: 'https://twitter.com/creativetim',
                    icon: <TwitterIcon />,
                    color: 'twitter',
                  },
                  {
                    link: 'https://www.instagram.com/creativetimofficial/',
                    icon: <InstagramIcon />,
                    color: 'instagram',
                  },
                ]}
                action={{ route: '', tooltip: 'Edit Profile' }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList
                title="conversations"
                profiles={profilesListData}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'view project',
                }}
                authors={[
                  { image: team1, name: 'Elena Morison' },
                  { image: team2, name: 'Ryan Milly' },
                  { image: team3, name: 'Nick Daniel' },
                  { image: team4, name: 'Peterson' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'view project',
                }}
                authors={[
                  { image: team3, name: 'Nick Daniel' },
                  { image: team4, name: 'Peterson' },
                  { image: team1, name: 'Elena Morison' },
                  { image: team2, name: 'Ryan Milly' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'view project',
                }}
                authors={[
                  { image: team4, name: 'Peterson' },
                  { image: team3, name: 'Nick Daniel' },
                  { image: team2, name: 'Ryan Milly' },
                  { image: team1, name: 'Elena Morison' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: 'internal',
                  route: '/pages/profile/profile-overview',
                  color: 'info',
                  label: 'view project',
                }}
                authors={[
                  { image: team4, name: 'Peterson' },
                  { image: team3, name: 'Nick Daniel' },
                  { image: team2, name: 'Ryan Milly' },
                  { image: team1, name: 'Elena Morison' },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
