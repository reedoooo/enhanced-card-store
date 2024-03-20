import { Typography, Zoom, useMediaQuery } from '@mui/material';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../context';

const HeroTextSection = ({ shouldShow }) => {
  const { theme } = useMode();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(shouldShow);

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
        // borderRadius: 'none',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            background: 'transparent',

            maxWidth: '100%',
            height: isMobileView ? '20vh' : null,
            alignItems: isMobileView ? 'center' : 'center',
            mt: isMobileView ? '0.5rem' : 'auto',
            mx: 'auto',
          }}
        >
          <Typography
            component="h1"
            variant={isMobileView ? 'h4' : 'h2'}
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              // marginBottom: 2,
              mt: isMobileView ? '10%' : 'auto',
            }}
          >
            A New Era of Trading Card Games
          </Typography>
          <Typography
            variant={isMobileView ? 'subtitle1' : 'h5'}
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
