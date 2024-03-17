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
import useSelectedContext from '../../context/hooks/useSelectedContext';
import { useModalContext, useMode } from '../../context';
import CardMediaSection from '../cards/media/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import CloseIcon from '@mui/icons-material/Close';
import CardDetail from '../cards/CardDetail';
import { useOverlay } from '../../context/hooks/useOverlay';
import CardDetailsContainer from '../cards/CardDetailsContainer';
import { enqueueSnackbar } from 'notistack';
import { DialogPaper } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

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
  const [imageUrl, setImageUrl] = useState(card?.card_images[0]?.image_url);
  const [hasLoggedCard, setHasLoggedCard] = useState(false);
  const { setContext, setIsContextSelected } = useSelectedContext();
  const handleAction = useCallback(
    (message, severity, error) => {
      enqueueSnackbar(message, severity);
      if (error) console.error('Action failed:', error);
    },
    [enqueueSnackbar]
  );
  useEffect(() => {
    if (open && card && !hasLoggedCard) {
      enqueueSnackbar('Card details loaded successfully.', 'success');
      setHasLoggedCard(true);
    }
    return () => {
      if (!open) setHasLoggedCard(false);
    };
  }, [open, card, enqueueSnackbar, hasLoggedCard]);
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
      <DialogPaper theme={theme}>
        <DialogTitle>
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
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CardMediaSection
                  // isRequired={!isSmall}
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
                <CardDetail
                  className={'card-detail'}
                  title="Card Sets"
                  values={card?.card_sets?.map((set) => set.set_code)}
                  onRarityClick={handleRarityClick}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <CardDetailsContainer card={card} className={'card-detail'} />
                {/* </Grid> */}

                {/* these two grid items are for the related user inventory data and action buttons */}
                {/* <Grid item xs={12} sm={6} md={6} lg={6}> */}
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
                        handleAction(
                          {
                            title: 'Action successful',
                            message: `Card added to ${mappedContext} successfully.`,
                          },
                          'success'
                        )
                      }
                      onFailure={(error) =>
                        handleAction(
                          {
                            title: 'Action failed',
                            message: `Failed to add card to ${mappedContext}.`,
                          },
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
      </DialogPaper>
    </Dialog>
  );
};

export default GenericCardDialog;
