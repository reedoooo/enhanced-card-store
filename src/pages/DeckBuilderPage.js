import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { DeckContext, useDeckStore } from '../context/DeckContext/DeckContext';
import LoadingIndicator from '../components/reusable/indicators/LoadingIndicator';
import ErrorIndicator from '../components/reusable/indicators/ErrorIndicator';
import DeckBuilderContainer from '../containers/deckBuilderPageContainers/DeckBuilderContainer';
import { Box, Grid, Typography } from '@mui/material';
import { ModalContext } from '../context/ModalContext/ModalContext';
import GenericCardModal from '../components/modals/cardModal/GenericCardModal';
import HeaderTitle from '../components/reusable/HeaderTitle';
import { useMode } from '../context/hooks/colormode';
import { DeckBuilderBanner } from './pageStyles/StyledComponents';
import useUpdateAppContext from '../context/hooks/useUpdateContext';
import UserContext, {
  useUserContext,
} from '../context/UserContext/UserContext';
import { usePageContext } from '../context/PageContext/PageContext';
import HeroCenter from './pageStyles/HeroCenter';

const DeckBuilderPage = () => {
  const [userDecks, setUserDecks] = useState([]);
  const { theme } = useMode();
  const { fetchAllDecksForUser, allDecks, loading } = useDeckStore();
  const {
    isPageLoading,
    setIsPageLoading,
    pageError,
    setPageError,
    logPageData,
  } = usePageContext();
  const { user } = useUserContext();
  const { openModalWithCard, closeModal, isModalOpen, modalContent } =
    useContext(ModalContext);
  const userId = user?.id;
  useEffect(() => {
    fetchAllDecksForUser().catch((err) =>
      console.error('Failed to get all decks:', err)
    );
  }, [fetchAllDecksForUser]);

  useEffect(() => {
    if (allDecks && userId && typeof userId === 'string') {
      const filteredDecks = allDecks?.filter((deck) => deck?.userId === userId);
      // console.log('filteredDecks', filteredDecks);
      logPageData('DeckBuilderPage', filteredDecks); // Log the cart data

      // console.log('DECK PAGE (FILTERED_DECKS):', filteredDecks);

      setUserDecks(filteredDecks);
    }
  }, [userId]);

  // useEffect(() => {
  //   setIsPageLoading(true);
  //   try {
  //     // Logic to handle deck data
  //     if (!userId) {
  //       setIsPageLoading(false); // End the loading state
  //       return;
  //     }

  //     // if theres no cartData or cartData object is empty, fetch the user's cart
  //     if (!cartData || Object.keys(cartData).length === 0) {
  //       fetchUserCart(userId);
  //       return;
  //     }
  //     // Your logic to check cart data
  //     if (userId && cartData.cart && cartData.cart.length > 0) {
  //       logPageData('CartPage', cartData); // Log the cart data
  //       console.log('CART PAGE (CART_QUANTITY):', cartCardQuantity);
  //     }
  //     logPageData('DeckBuilderPage', allDecks); // Log deck data
  //   } catch (e) {
  //     setPageError(e);
  //   } finally {
  //     setIsPageLoading(false);
  //   }
  // }, [allDecks, setIsPageLoading, setPageError, logPageData]);

  if (isPageLoading) return <LoadingIndicator />;
  if (pageError) return <ErrorIndicator error={pageError} />;

  return (
    <React.Fragment>
      <DeckBuilderBanner>
        {/* <HeroCenter2 /> */}
        <HeroCenter
          title="Welcome to Deck Builder"
          subtitle="Craft, refine, and explore your deck strategies in one place."
        />

        <Grid container>
          <Grid item xs={12}>
            <DeckBuilderContainer userDecks={userDecks} />
          </Grid>
        </Grid>
      </DeckBuilderBanner>
      {pageError && <ErrorIndicator error={pageError} />}

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

export default DeckBuilderPage;
