import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import pages from '../../data/pages.json';
import placeHolder from '../../assets/images/placeholder.jpeg';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import { Zoom, useMediaQuery } from '@mui/material';
import SimpleCard from '../../layout/REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../layout/REUSABLE_COMPONENTS/unique/uniqueTheme';
import { useMode } from '../../context';
import { AspectRatio } from '@mui/joy';
const heroCardData = [
  {
    id: 'herodata-1-store-add',
    name: 'Add Cards From Store',
    description: 'Add cards to your collection from the store.',
    heroText: 'ADD',
    icon: <AddIcon />,
    heroIcon: 'AddIcon',
    image: placeHolder,
  },
  {
    id: 'herodata-2-deck-build',
    name: 'Build Decks In Deck Builder',
    description: 'Build decks using the deck builder.',
    heroText: 'BUILD',
    icon: <SaveIcon />,
    heroIcon: 'SaveIcon',
    image: placeHolder,
  },
  {
    id: 'herodata-3-collection-view',
    name: 'Track Collection Value in Portfolio',
    description:
      'View and analyze your portfolio performance using the Portfolios advanced statistics settings.',
    heroText: 'TRACK',
    icon: <CollectionsIcon />,
    heroIcon: 'CollectionsIcon',
    image: placeHolder,
  },
];

const HeroIconSection = ({ shouldShow }) => {
  const { theme } = useMode();
  const isMidView = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <MDBox
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'row',
        padding: 1,
        width: '100%',
        zIndex: 5,
        height: isMidView ? 'calc(100vh - 64px)' : null,
        maxHeight: isMidView ? 'calc(100vh - 64px)' : 200,
        overFlow: 'hidden', // Hide overflow to maintain the card's dimensions
        background: 'transparent',
        my: isMidView ? null : 1,
        borderColor: 'transparent',
        // minHeight: isMobileView ? 'calc(100vh - 64px)' : '30vh',
        alignItems: isMidView ? 'flex-end' : 'center',
        position: isMidView ? 'absolute' : 'relative',
        // borderRadius: 'none',
        // mt: isMobileView ? null : '2rem',
        // borderColor: 'transparent',
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
            // height: isMobileView ? 'calc(100vh - 64px)' : '20%',
            flexDirection: 'row',
            display: 'flex',
            borderColor: 'transparent',
            justifyContent: 'space-around',
            alignItems: 'center',
            mx: isMidView ? null : 'auto',
            py: isMidView ? '1rem' : 'auto',
            // my: isMobileView ? null : 'auto',
            // py: '1.5rem',
            background: 'transparent',
            // minHeight: '30vh',
            // position: isMobileView ? 'absolute' : 'relative',
          }}
        >
          {heroCardData?.map((card, index) => (
            <AspectRatio
              key={card.id}
              sx={{
                flex: 1, // Allow each item to grow and shrink as needed
                maxHeight: 200, // Max height for the AspectRatio container
                maxWidth: 200, // Max width for the AspectRatio container
                border: 'none',
                background: 'transparent',
                borderRadius: theme.shape.borderRadiusLarge,
                m: isMidView ? '0.5rem' : 'auto',
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

                  overFlow: 'hidden', // Hide overflow to maintain the card's dimensions
                  // maxHeight: 200,
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
