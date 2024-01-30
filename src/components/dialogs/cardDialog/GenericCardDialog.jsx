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
  Stack,
  Typography,
  Card,
  CardHeader,
  List,
  CardContent,
  ListItem,
  Backdrop,
} from '@mui/material';
import useSnackbar from '../../../context/hooks/useSnackBar';
import useSelectedContext from '../../../context/hooks/useSelectedContext';
import { useModalContext, useMode } from '../../../context';
import CardMediaSection from '../../cards/media/CardMediaSection';
import GenericActionButtons from '../../buttons/actionButtons/GenericActionButtons';
import CloseIcon from '@mui/icons-material/Close';
import CardDetail from '../../cards/CardDetail';
import CardDetailsContainer from '../../../layout/CardDetailsContainer';
import { useOverlay } from '../../../context/hooks/useOverlay';

const GenericCardDialog = (props) => {
  const { theme } = useMode();
  const { generateOverlay, handleRarityClick, openOverlay, closeOverlay } =
    useOverlay(theme);

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
    // fullScreen = false,
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { closeModal } = useModalContext();
  const { getHeaderStyle, isSmall } = theme.responsiveStyles;
  const [imageUrl, setImageUrl] = useState(card?.card_images[0]?.image_url);
  const [snackbar, handleSnackBar, handleCloseSnackbar] = useSnackbar();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const { setContext, setIsContextSelected } = useSelectedContext();
  const handleAction = useCallback(
    (message, severity, error) => {
      handleSnackBar(message, severity);
      if (error) console.error('Action failed:', error);
    },
    [handleSnackBar]
  );
  useEffect(() => {
    if (open && card && !hasLoggedCard) {
      handleSnackBar('Card details loaded successfully.', 'success');
      setHasLoggedCard(true);
    }
    return () => {
      if (!open) setHasLoggedCard(false);
    };
  }, [open, card, handleSnackBar, hasLoggedCard]);
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
      fullScreen={fullScreen}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      PaperProps={{
        sx: {
          width: '75%',
          height: 'auto',
          maxHeight: '90vh',
          borderRadius: theme.shape.borderRadius,
        },
      }}
    >
      <DialogTitle sx={getHeaderStyle(theme.breakpoints)}>
        {title}
        {closeIcon && (
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.backgroundA.contrastTextA,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* these two grid items are for the card media and card details */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {' '}
              <CardMediaSection
                isRequired={!isSmall}
                card={card}
                imgUrl={imageUrl}
              />
              {generateOverlay()}
            </Grid>

            {/* these two grid items are for the card details */}
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <CardDetail
                className={'card-detail'}
                // icon={<FaRegCopy />}
                title="Description"
                value={card?.desc}
              />
              <CardDetail
                className={'card-detail'}
                // icon={<FaRegCopy />}
                title="Price"
                value={card?.price}
              />
              <CardDetail
                className={'card-detail'}
                title="Rarity"
                values={card?.card_sets?.map((set) => set.set_rarity)}
                onRarityClick={handleRarityClick}
              />

              {/* Price History Dropdown */}
              {/* <Grid item xs={12} sm={6} md={6} lg={6}> */}
              {/* Price History Dropdown */}
              {/* </Grid> */}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <CardDetailsContainer card={card} className={'card-detail'} />
            </Grid>

            {/* these two grid items are for the related user inventory data and action buttons */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Stack>
                <Card>
                  <CardHeader>
                    <Typography variant="h6">Inventory</Typography>
                  </CardHeader>
                  <CardContent>
                    <List>
                      {/* <ListItemText primary="Deck" secondary="Deck" /> */}
                      <ListItem>{'Cart'}</ListItem>
                      <ListItem>{'Deck'}</ListItem>
                      <ListItem>{'Collection'}</ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Stack>
              <Stack>
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
              </Stack>
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
