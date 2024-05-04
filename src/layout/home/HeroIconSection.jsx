import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { CardContent, Icon, IconButton, Typography, Zoom } from '@mui/material';
import { useMode } from 'context';
import { AspectRatio } from '@mui/joy';
import heroData from 'data/heroData';
import useBreakpoint from 'context/hooks/useBreakPoint';
import FlexBetween from 'layout/REUSABLE_COMPONENTS/layout-utils/FlexBetween';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
const iconStyles = {
  fontSize: '8rem', // Example size, adjust as needed
  color: '#000000', // Example color, adjust as needed
  maxWidth: '100%',
  maxHeight: '100%',
};
const String2Icon = (icon) => {
  switch (icon) {
    case 'AddIcon':
      return <AddIcon style={iconStyles} />;
    case 'SaveIcon':
      return <SaveIcon style={iconStyles} />;
    case 'CollectionsIcon':
      return <CollectionsIcon style={iconStyles} />;
    default:
      return null;
  }
};
const HeroIconSection = ({ shouldShow }) => {
  const { isMd, isMobile } = useBreakpoint();
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
                borderRadius: theme.borders.borderRadius.lg,
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
                  borderRadius: theme.borders.borderRadius.md,
                  overFlow: 'hidden',
                }}
              >
                <CardContent
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'transparent',
                    borderRadius: theme.borders.borderRadius.md,
                  }}
                >
                  <MDBox
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 'auto',
                      borderRadius: theme.borders.borderRadius.md,
                      boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <IconButton
                      disabled={false}
                      variant="outlined"
                      style={{
                        color: theme.palette.primary.main,
                        '& .MuiIconRoot': {
                          fontSize: isMobile ? '3rem' : '4rem',
                        },
                      }}
                    >
                      <Icon
                        style={{
                          fontSize: '8rem',
                          color: theme.palette.success.main,
                        }}
                      >
                        {String2Icon(card.heroIcon)}
                      </Icon>
                    </IconButton>
                  </MDBox>
                  <FlexBetween
                    sx={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: theme.spacing(2),
                    }}
                  >
                    <Typography
                      variant={isMobile ? 'subtitle1' : 'h6'}
                      sx={{
                        marginLeft: theme.spacing(4),
                        fontSize: isMobile ? '2rem' : '4rem',
                      }}
                    >
                      {card.heroText}
                    </Typography>
                  </FlexBetween>
                </CardContent>
              </MDBox>
            </AspectRatio>
          ))}
        </MDBox>
      </Zoom>
    </MDBox>
  );
};

export default HeroIconSection;
