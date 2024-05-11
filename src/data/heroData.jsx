import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import placeholder from 'assets/images/placeholder.jpeg';
const heroData = [
  {
    id: 'herodata-1-store-add',
    name: 'Add Cards From Store',
    description: 'Add cards to your collection from the store.',
    heroText: 'ADD',
    icon: <AddIcon />,
    heroIcon: 'AddIcon',
    image: placeholder,
  },
  {
    id: 'herodata-2-deck-build',
    name: 'Build Decks In Deck Builder',
    description: 'Build decks using the deck builder.',
    heroText: 'BUILD',
    icon: <SaveIcon />,
    heroIcon: 'SaveIcon',
    image: placeholder,
  },
  {
    id: 'herodata-3-collection-view',
    name: 'Track Collection Value in Portfolio',
    description:
      'View and analyze your portfolio performance using the Portfolios advanced statistics settings.',
    heroText: 'TRACK',
    icon: <CollectionsIcon />,
    heroIcon: 'CollectionsIcon',
    image: placeholder,
  },
];

export default heroData;
