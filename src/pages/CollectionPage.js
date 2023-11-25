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
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import {
  CollectionBanner,
  CollectionContents,
} from './pageStyles/StyledComponents';
import { useMode } from '../context/hooks/colormode';

const HeroCenter = ({ decorative, title, subtitle }) => (
  <Box
    sx={{
      flex: 1,
      // height: '50vh',
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
  const { theme } = useMode();
  const { allCollections, selectedCollection, loading, error } =
    useCollectionStore();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);

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
      <CollectionContents theme={theme}>
        {/* <Box
          sx={{
            maxHeight: '200vh',
            overflow: 'auto',
          }}
        > */}
        <CardPortfolio allCollections={allCollections} />
        {/* </Box> */}
      </CollectionContents>
      {isModalOpen && (
        <GenericCardModal
          open={isModalOpen}
          closeModal={closeModal}
          card={modalContent}
        />
      )}
    </React.Fragment>
  );
};

export default CollectionPage;
