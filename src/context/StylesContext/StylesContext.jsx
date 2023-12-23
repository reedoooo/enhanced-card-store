// import { useMediaQuery } from '@mui/material';
// import DeckOfCardsIcon from '../components/reusable/icons/DeckOfCardsIcon';
// import MoneyIcon from '../components/reusable/icons/MoneyIcon';
// import ChartsIcon from '../components/reusable/icons/ChartsIcon';

// const useResponsiveStyles = (theme) => {
//   const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMedium = useMediaQuery(theme.breakpoints.down('md'));

//   const getTypographyVariant = () => {
//     if (isXSmall) return 'h4';
//     if (isSmall) return 'h3';
//     if (isMedium) return 'h2';
//     return 'h2';
//   };

//   const getIconForTitle = (title) => {
//     switch (title) {
//       case 'Deck Builder':
//         return <DeckOfCardsIcon />;
//       case 'Collection Tracker':
//         return <MoneyIcon />;
//       case 'Store':
//         return <ChartsIcon />;
//       default:
//         return null;
//     }
//   };

//   return { getTypographyVariant, getIconForTitle };
// };

// export default useResponsiveStyles;
