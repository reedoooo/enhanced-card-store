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
        my: isMobileView ? null : 1,
        width: isMobileView ? '100%' : '100%',
        position: isMobileView ? 'absolute' : 'relative',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            background: 'transparent',
            maxWidth: '100%',
            height: isMobileView ? null : '100%',
            alignItems: isMobileView ? 'center' : 'center',
            mx: 'auto',
            my: 'auto',
            borderColor: 'transparent',
          }}
        >
          <Typography
            component="h1"
            variant={isMobileView ? 'h3' : 'h2'}
            sx={{
              fontWeight: 'bold',
              color: theme.palette.success.secondary,
              my: isMobileView ? '1rem' : 'auto',
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
