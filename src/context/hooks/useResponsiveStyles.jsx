import { useMediaQuery } from '@mui/material';
import DeckOfCardsIcon from '../../components/reusable/icons/DeckOfCardsIcon';
import MoneyIcon from '../../components/reusable/icons/MoneyIcon';
import ChartsIcon from '../../components/reusable/icons/ChartsIcon';

const useResponsiveStyles = (theme) => {
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMedium = useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isMediumLarge = useMediaQuery(theme.breakpoints.up('md'));
  const isMediumExtraLarge = useMediaQuery(theme.breakpoints.up('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const getTypographyVariant = () => {
    if (isXSmall) return 'h4';
    if (isSmall) return 'h3';
    if (isMedium) return 'h2';
    return 'h2';
  };
  const getButtonTypographyVariant = () => {
    if (isXSmall) return 'body1';
    if (isSmall) return 'body2';
    if (isMedium) return 'body3';
    if (isLarge) return 'body3';
    return 'body1';
  };
  const getButtonTypographyVariant2 = () => {
    if (isXSmall) return 'h6';
    if (isSmall) return 'h6';
    if (isMedium) return 'h6';
    if (isLarge) return 'body1';
    return 'body1';
  };
  const getIconForTitle = (title) => {
    switch (title) {
      case 'Deck Builder':
        return <DeckOfCardsIcon />;
      case 'Collection Tracker':
        return <MoneyIcon />;
      case 'Store':
        return <ChartsIcon />;
      default:
        return null;
    }
  };

  const getProductGridContainerStyle = () => ({
    maxWidth: 'lg',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
  });

  const getHeaderStyle = (theme) => ({
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    // Correct media query syntax in JS object
    '@media (maxWidth:599.95px)': {
      fontSize: '1.25rem',
    },
    '@media (minWidth:600px) and (maxWidth:899.95px)': {
      fontSize: '1.5rem',
    },
    '@media (minWidth:900px)': {
      fontSize: '1.75rem',
    },
  });

  const getStyledGridStyle = (theme) => ({
    '@media (maxWidth:599.95px)': {
      margin: theme.spacing(0.5),
    },
    '@media (minWidth:600px) and (maxWidth:1199.95px)': {
      margin: theme.spacing(1),
    },
    '@media (minWidth:1200px)': {
      margin: theme.spacing(2),
    },
    '@media (minWidth:1800px)': {
      margin: theme.spacing(2),
    },
  });

  const getStyledGridItemStyle = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    // Correct media query syntax in JS object
    '@media (maxWidth:599.95px)': {
      padding: theme.spacing(1),
    },
    '@media (minWidth:600px)': {
      padding: theme.spacing(0.25),
    },
    '@media (minWidth:1200px)': {
      padding: theme.spacing(1),
    },
    '@media (minWidth:1800px)': {
      padding: theme.spacing(2),
    },
  });

  return {
    isMobile: isSmall,
    isXSmall,
    isSmall,
    isSmallMedium,
    isMedium,
    isMediumLarge,
    isMediumExtraLarge,
    isLarge,
    getTypographyVariant,
    getButtonTypographyVariant,
    getButtonTypographyVariant2,
    getIconForTitle,
    getProductGridContainerStyle,
    getHeaderStyle,
    getStyledGridStyle,
    getStyledGridItemStyle,
  };
};

export default useResponsiveStyles;
