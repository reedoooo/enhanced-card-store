import { Typography, Zoom, useMediaQuery } from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../context';

const HeroTextSection = ({ shouldShow }) => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <MDBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        background: 'transparent',
        alignItems: isMobileView ? 'flex-start' : 'center',
        padding: 1,
        width: isMobileView ? '100%' : '100%',
        height: isMobileView ? 'calc(100vh - 64px)' : '30%',
        position: isMobileView ? 'absolute' : 'relative',
        mt: isMobileView ? null : '25%',
        // borderRadius: 'none',
        // my: isMobileView ? null : '30%',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            background: 'transparent',
            maxWidth: '100%',
            height: isMobileView ? '20vh' : '100%',
            alignItems: isMobileView ? 'center' : 'center',
            // mt: isMobileView ? '0.5rem' : 'auto',
            mx: 'auto',
          }}
        >
          <Typography
            component="h1"
            variant={isMobileView ? 'h3' : 'h2'}
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              // marginBottom: 2,
              mt: isMobileView ? '5%' : '10%',
            }}
          >
            A New Era of Trading Card Games
          </Typography>
          <Typography
            variant={isMobileView ? 'h6' : 'h5'}
            sx={{
              mx: 'auto',
              maxWidth: '90%',
              my: isMobileView ? '1rem' : 'auto',
            }}
          >
            Discover a revolutionary way to collect, play, and compete in your
            favorite trading card games. Embrace a world where strategy and
            creativity transcend boundaries.
          </Typography>
        </MDBox>
      </Zoom>
    </MDBox>
  );
};

export default HeroTextSection;
