import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { Zoom, useMediaQuery } from '@mui/material';
import SimpleCard from '../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useMode } from '../../context';
import { AspectRatio } from '@mui/joy';
import heroData from '../../data/heroData';
import useBreakpoint from '../../context/hooks/useBreakPoint';
const HeroIconSection = ({ shouldShow }) => {
  const { isMd } = useBreakpoint();
  const { theme } = useMode();
  return (
    <MDBox
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 1,
        width: '100%',
        zIndex: 5,
        height: isMd ? 'calc(100vh - 64px)' : null,
        maxHeight: isMd ? 'calc(100vh - 64px)' : 200,
        overFlow: 'hidden', // Hide overflow to maintain the card's dimensions
        background: 'transparent',
        my: isMd ? null : 1,
        borderColor: 'transparent',
        alignItems: isMd ? 'flex-end' : 'center',
        position: isMd ? 'absolute' : 'relative',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '100%',
            maxHeight: 200,
            overFlow: 'hidden', // Hide overflow to maintain the card's dimensions
            flexDirection: 'row',
            display: 'flex',
            borderColor: 'transparent',
            justifyContent: 'space-around',
            alignItems: 'center',
            mx: isMd ? null : 'auto',
            py: isMd ? '1rem' : 'auto',
            background: 'transparent',
          }}
        >
          {heroData?.map((card, index) => (
            <AspectRatio
              key={card.id}
              sx={{
                flex: 1,
                maxHeight: 200, // Max height for the AspectRatio container
                maxWidth: 200, // Max width for the AspectRatio container
                border: 'none',
                background: 'transparent',
                borderRadius: theme.shape.borderRadiusLarge,
                m: isMd ? '0.5rem' : 'auto',
              }}
              ratio="1" // Maintain a 1:1 aspect ratio
            >
              <MDBox
                key={card.id}
                sx={{
                  border: 'none',
                  background: 'transparent',
                  borderColor: 'transparent',
                  borderRadius: theme.shape.borderRadius,
                  overFlow: 'hidden',
                }}
              >
                <SimpleCard
                  isHeroDisplay={true}
                  heroText={card.heroText}
                  heroIcon={card.heroIcon}
                  theme={uniqueTheme}
                  noBottomMargin={true}
                />
              </MDBox>
            </AspectRatio>
          ))}
        </MDBox>
      </Zoom>
    </MDBox>
  );
};

export default HeroIconSection;
