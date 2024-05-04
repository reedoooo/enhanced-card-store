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
import CardDetailsContainer from '../cards/CardDetailsContainer';
import { useMode } from 'context';
import { useSnackbar } from 'notistack';
import FlexBetween from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/FlexBetween';
import useBreakpoint from 'context/hooks/useBreakPoint';
import GenericActionButtons from 'layout/REUSABLE_COMPONENTS/GenericActionButtons';
import useDialogState from 'context/hooks/useDialogState';

const GenericCardDialog = ({
  open = false,
  transition = false,
  title = '',
  card,
  context,
  onClose,
  ...otherProps
}) => {
  const { theme } = useMode();
  const { closeDialog, dialogState } = useDialogState();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile } = useBreakpoint();
  console.log('GENERIC CARD DIALOG OPEN', open);
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
      onClose={(e) => {
        if (onClose) {
          onClose(e);
        }
      }}
      TransitionComponent={transition ? Slide : Fade}
      fullScreen={fullScreen}
      aria-labelledby="card-detail-dialog-title"
      aria-describedby="card-detail-dialog-description"
      maxWidth="md"
      fullWidth
      sx={{
        // position: 'relative', // Ensure the relative positioning for the close button's absolute positioning

        '& .MuiDialog-paper': {
          borderRadius: 2,
          p: 2,
          maxHeight: '90vh',
          alignItems: 'center',
          // position: 'relative', // Ensure the relative positioning for the close button's absolute positioning
        },
      }}
      slotProps={{
        Backdrop: {
          onClick: (e) => {
            e.stopPropagation();
            if (onClose) {
              onClose();
            }
          },
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={(e) => {
          e.stopPropagation(); // Ensure the click doesn't propagate
          if (onClose) {
            onClose(e);
          }
        }}
        sx={{
          position: 'absolute', // Ensure the button is absolutely positioned
          right: 10, // Right aligned
          top: 8, // Top aligned
          color: theme.palette.grey[500], // Color from the theme
          zIndex: 2, // Ensure it's above other elements
        }}
      >
        <CloseIcon fontSize="15rem" />
      </IconButton>
      <FlexBetween
        sx={{
          position: isMobile ? 'absolute' : 'relative',
          height: isMobile ? '100%' : 'auto',
        }}
      >
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
                selectedEntity={context}
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
