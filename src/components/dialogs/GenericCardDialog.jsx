import React, { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  IconButton,
  Slide,
  Fade,
  Typography,
  Card,
  CardHeader,
  List,
  ListItem,
  CardContent,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardMediaSection from '../cards/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import CardDetailsContainer from '../cards/CardDetailsContainer';
import { useSelectedContext, useModalContext, useMode } from '../../context';
import { useSnackbar } from 'notistack';
import FlexBetween from '../../layout/REUSABLE_COMPONENTS/FlexBetween';
import useBreakpoint from '../../context/hooks/useBreakPoint';

const GenericCardDialog = ({
  open = false,
  transition = false,
  onClose,
  title = '',
  card,
  context,
  ...otherProps
}) => {
  const { theme } = useMode();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile } = useBreakpoint();

  const { closeModal } = useModalContext();
  const { enqueueSnackbar } = useSnackbar(); // Assuming useOverlay has enqueueSnackbar method
  const handleAction = useCallback(
    (message, variant) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (open && card) {
      handleAction('Card details loaded successfully.', 'success');
    }
  }, [open, card, handleAction]);

  const handleContextSelect = useCallback(
    (newContext) => {
      handleAction(`Card added to ${newContext} successfully.`, 'success');
    },
    [handleAction]
  );

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      TransitionComponent={transition ? Slide : Fade}
      fullScreen={fullScreen}
      aria-labelledby="card-detail-dialog-title"
      aria-describedby="card-detail-dialog-description"
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: 2,
          maxHeight: '90vh',
          alignItems: 'center',
        },
      }}
    >
      <FlexBetween
        sx={{
          position: isMobile ? 'absolute' : 'relative',
          height: isMobile ? '100%' : 'auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="2rem" />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }} id="card-detail-dialog-title">
          {title}
        </Typography>
      </FlexBetween>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardMediaSection card={card} imgUrl={card?.image} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardDetailsContainer
            className={'card-details-container-dialog'}
            card={card}
            titles={['Description', 'Price', 'Rarity', 'Card Sets']}
          />
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Inventory" />
            <CardContent>
              <List>
                <ListItem>Cart</ListItem>
                <ListItem>Deck</ListItem>
                <ListItem>Collection</ListItem>
              </List>
            </CardContent>
          </Card>
          <FlexBetween>
            {['Deck', 'Collection', 'Cart'].map((mappedContext) => (
              <GenericActionButtons
                key={mappedContext}
                card={card}
                cardClasses="base-card-no-quantity"
                context={mappedContext}
                originalContext={context}
                onClick={() => handleContextSelect(mappedContext)}
              />
            ))}
          </FlexBetween>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default GenericCardDialog;
