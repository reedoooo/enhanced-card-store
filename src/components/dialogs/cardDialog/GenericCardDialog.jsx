import React, { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  Grid,
  Container,
  useMediaQuery,
  Slide,
  Fade,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import axios from 'axios';
import useSnackbar from '../../../context/hooks/useSnackBar';
import useSelectedContext from '../../../context/hooks/useSelectedContext';
import {
  useModalContext,
  useCollectionStore,
  useUserContext,
} from '../../../context';
import CardMediaSection from '../../cards/media/CardMediaSection';
import CardCarousel from './CardCarousel';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
import CardDetailsContainer from '../../../containers/CardDetailsContainer';
import CloseIcon from '@mui/icons-material/Close';
import useResponsiveStyles from '../../../context/hooks/useResponsiveStyles';
import CardDetail from './CardDetail';
import { FaRegCopy } from 'react-icons/fa';

const GenericCardDialog = (props) => {
  const theme = useTheme();

  const {
    open = false,
    transition = false,
    close,
    hideBackdrop = false,
    title = '',
    content = '',
    actions = '',
    dividers = false,
    closeIcon = true,
    fullScreen = false,
    actionPosition = 'left',
    closeIconSx = {
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500],
    },
    card,
    context,
    ...other
  } = props || {};
  const { closeModal } = useModalContext();
  const { user } = useUserContext();
  // const { updateCollection, selectedCollection } = useCollectionStore();
  const { getHeaderStyle, isMobile } = useResponsiveStyles(theme);
  // const [updatedCard, setUpdatedCard] = useState(card);
  const [imageUrl, setImageUrl] = useState(card?.card_images[0]?.image_url);
  const [snackbar, handleSnackbar, handleCloseSnackbar] = useSnackbar();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const { setContext, setIsContextSelected } = useSelectedContext();
  // Helper function to handle successful and failed actions
  const handleAction = useCallback(
    (message, severity, error) => {
      handleSnackbar(message, severity);
      if (error) console.error('Action failed:', error);
    },
    [handleSnackbar]
  );
  // Update card data from the server if necessary
  // useEffect(() => {
  //   async function updateCardData() {
  //     if (card.card_images.length === 0) {
  //       try {
  //         const response = await axios.patch(
  //           `${process.env.REACT_APP_SERVER}/api/cards/ygopro/${card.id}`,
  //           { id: card.id, name: card.name, card, user }
  //         );
  //         if (response.data && response.data.data) {
  //           setUpdatedCard(response.data.data);
  //           setImageUrl(response.data.data.card_images[0]?.image_url);
  //           updateCollection(response.data.data, 'update', selectedCollection);
  //         }
  //       } catch (err) {
  //         console.error('Error fetching card images:', err);
  //       }
  //     }
  //   }

  //   if (open) {
  //     updateCardData();
  //   }
  // }, [card, user, updateCollection, selectedCollection, open]);
  // Snackbar handling for loading card details
  useEffect(() => {
    if (open && card && !hasLoggedCard) {
      handleSnackbar('Card details loaded successfully.', 'success');
      setHasLoggedCard(true);
    }
    return () => {
      if (!open) setHasLoggedCard(false);
    };
  }, [open, card, handleSnackbar, hasLoggedCard]);
  // Context selection handling
  const handleContextSelect = useCallback(
    (newContext) => {
      setContext(newContext);
      setIsContextSelected(true);
    },
    [setContext, setIsContextSelected]
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={transition ? Slide : Fade}
      keepMounted
      onClose={closeModal}
      hideBackdrop={hideBackdrop}
      fullScreen={fullScreen}
      aria-describedby="alert-dialog-slide-description"
      {...other}
    >
      <DialogTitle sx={getHeaderStyle(theme)}>
        {title}
        {closeIcon && (
          <IconButton aria-label="close" onClick={close} sx={closeIconSx}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>{' '}
      <DialogContent>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {/* these two grid items are for the card media and card details */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CardMediaSection
                isRequired={!isMobile}
                card={card}
                imgUrl={imageUrl}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <CardDetail
                className={'card-detail'}
                icon={<FaRegCopy />}
                title="Description"
                value={card?.desc}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <CardDetailsContainer card={card} className={'card-detail'} />
            </Grid>

            {/* these two grid items are for the card carousel and action buttons */}

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {['Deck', 'Collection', 'Cart'].map((mappedContext) => (
                <GenericActionButtons
                  key={mappedContext}
                  card={card}
                  context={mappedContext}
                  originalContext={context}
                  onClick={() => handleContextSelect(mappedContext)}
                  onSuccess={() =>
                    handleAction('Action was successful!', 'success')
                  }
                  onFailure={(error) =>
                    handleAction(
                      'Action failed. Please try again.',
                      'error',
                      error
                    )
                  }
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default GenericCardDialog;
