import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardPortfolio from '../components/collection/CardPortfolio';
import Subheader from '../components/reusable/Subheader';
import { useCollectionStore } from '../context/CollectionContext/CollectionContext';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/GenericCardModal';
import { CollectionBanner } from './pageStyles/StyledComponents';
import useUpdateAppContext from '../context/hooks/useUpdateContext';

// Hero section with customizable props
const HeroCenter = ({ decorative, title, subtitle }) => (
  <Box
    sx={{
      flex: 1,
      height: '50vh',
      // maxWidth: '90%',
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
  const [{ user }] = useCookies(['user']);
  const { allCollections, selectedCollection, loading, error } =
    useCollectionStore();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const userId = user?.id;
  // useUpdateAppContext(); // This will set the context to 'Deck' when this page is rendered

  // Handling loading and error states upfront for better user experience
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <React.Fragment>
      <CollectionBanner>
        <Box>
          <HeroCenter />
          <Subheader text={selectedCollection?.name || 'Your Collection'} />
        </Box>
      </CollectionBanner>
      <Box
        sx={{
          // maxWidth: '100vw',
          maxHeight: '200vh',
          // overflow: 'hidden',
        }}
      >
        <CardPortfolio allCollections={allCollections} />
      </Box>{' '}
      {isModalOpen && (
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
          card={modalContent}
          // context and other props if necessary
        />
      )}
    </React.Fragment>
  );
};

export default CollectionPage;
