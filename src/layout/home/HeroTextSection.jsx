import { Typography, Zoom, useMediaQuery } from '@mui/material';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { useMode } from 'context';
import useBreakpoint from 'context/hooks/useBreakPoint';

const HeroTextSection = ({ shouldShow }) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  return (
    <MDBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        background: 'transparent',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: 1,
        my: isMobile ? null : 1,
        width: isMobile ? '100%' : '100%',
        position: isMobile ? 'absolute' : 'relative',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            background: 'transparent',
            maxWidth: '100%',
            height: isMobile ? null : '100%',
            alignItems: isMobile ? 'center' : 'center',
            mx: 'auto',
            my: 'auto',
            borderColor: 'transparent',
          }}
        >
          <Typography
            component="h1"
            variant={isMobile ? 'h3' : 'h2'}
            sx={{
              fontWeight: 'bold',
              color: theme.palette.success.secondary,
              my: isMobile ? '1rem' : 'auto',
            }}
          >
            A New Era of Trading Card Games
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mx: 'auto',
              maxWidth: '90%',
              my: isMobile ? '1rem' : 'auto',
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
