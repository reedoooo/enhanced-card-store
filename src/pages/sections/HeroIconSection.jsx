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
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <MDBox
      sx={{
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'row',
        padding: 1,
        width: '100%',
        height: isMobileView ? 'calc(100vh - 64px)' : '20%',
        alignItems: isMobileView ? 'flex-end' : 'center',
        position: isMobileView ? 'absolute' : 'relative',
        // borderRadius: 'none',
        mt: isMobileView ? null : '2rem',
      }}
    >
      <Zoom in={shouldShow}>
        <MDBox
          sx={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '100%',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            // border: 'none',
            // margin: 'auto',
            // display: 'flex',
            // flexDirectinon: 'row',
          }}
        >
          {heroCardData?.map((card, index) => (
            <MDBox key={card.id} sx={{ maxWidth: '33vw', border: 'none' }}>
              <SimpleCard
                isHeroDisplay={true}
                heroText={card.heroText}
                heroIcon={card.heroIcon}
                theme={uniqueTheme}
              />
            </MDBox>
          ))}
        </MDBox>
      </Zoom>
    </MDBox>
  );
};

export default HeroIconSection;
