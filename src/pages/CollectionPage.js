import React from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/indicators/LoadingIndicator';
import ErrorIndicator from '../components/indicators/ErrorIndicator';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CollectionBanner from './pageStyles/CollectionBanner';
import CardPortfolio from '../components/collection/CardPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';

// Hero section with customizable props
const HeroCenter = ({ decorative, title, subtitle }) => (
  <Box
    sx={{
      flex: 1,
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      my: 6,
      textAlign: 'center',
    }}
  >
    <Typography
      component="span"
      sx={{
        color: 'primary.main',
        fontWeight: 600,
        fontSize: 'sm',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}
    >
      {decorative}
    </Typography>
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
        fontWeight: 800,
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: 'lg',
        color: 'text.secondary',
        maxWidth: '54ch',
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

// Default props for the HeroCenter component for ease of use and maintainability
HeroCenter.defaultProps = {
  decorative: 'All-in-One',
  title: "Your Collection's Home",
  subtitle:
    // eslint-disable-next-line max-len
    'Welcome to your collection! Here you can view all of your cards, add new cards, and remove cards from your collection.',
};

// Main collection page component
const CollectionPage = () => {
  // Destructuring the first element directly from the useCookies hook for cleaner code
  const [{ userCookie }] = useCookies(['userCookie']);
  const { allCollections, selectedCollection, loading, error } =
    useCollectionStore();

  const userId = userCookie?.id;

  // Handling loading and error states upfront for better user experience
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <CollectionBanner>
      <HeroCenter />
      <Subheader text={selectedCollection?.name || 'Your Collection'} />
      <CardPortfolio allCollections={allCollections} />
    </CollectionBanner>
  );
};

export default CollectionPage;
