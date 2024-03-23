// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Snackbar,
//   Alert,
//   Grid,
//   Container,
//   useMediaQuery,
//   Slide,
//   Fade,
//   IconButton,
//   Stack,
//   Typography,
//   Card,
//   CardHeader,
//   List,
//   CardContent,
//   ListItem,
//   Backdrop,
// } from '@mui/material';
// import useSelectedContext from '../../context/hooks/useSelectedContext';
// import { useModalContext, useMode } from '../../context';
// import CardMediaSection from '../cards/CardMediaSection';
// import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
// import CloseIcon from '@mui/icons-material/Close';
// import CardDetail from '../cards/CardDetail';
// import { useOverlay } from '../../context/hooks/useOverlay';
// import CardDetailsContainer from '../cards/CardDetailsContainer';
// import { enqueueSnackbar } from 'notistack';
// import {
//   DialogPaper,
//   StyledDialog,
// } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

// const GenericCardDialog = (props) => {
//   const { theme } = useMode();
//   const { generateOverlay, handleRarityClick, openOverlay, closeOverlay } =
//     useOverlay(theme);
//   const {
//     open = false,
//     transition = false,
//     close,
//     hideBackdrop = false,
//     title = '',
//     content = '',
//     actions = '',
//     dividers = false,
//     closeIcon = true,
//     // fullScreen = false,
//     actionPosition = 'left',
//     closeIconSx = {
//       position: 'absolute',
//       right: 8,
//       top: 8,
//       color: (theme) => theme.palette.grey[500],
//     },
//     card,
//     context,
//     ...other
//   } = props || {};
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const { closeModal } = useModalContext();
//   const [imageUrl, setImageUrl] = useState(card?.card_images[0]?.image_url);
//   const [hasLoggedCard, setHasLoggedCard] = useState(false);
//   const { setContext, setIsContextSelected } = useSelectedContext();
//   const handleAction = useCallback(
//     (message, severity, error) => {
//       enqueueSnackbar(message, severity);
//       if (error) console.error('Action failed:', error);
//     },
//     [enqueueSnackbar]
//   );
//   useEffect(() => {
//     if (open && card && !hasLoggedCard) {
//       enqueueSnackbar('Card details loaded successfully.', 'success');
//       setHasLoggedCard(true);
//     }
//     return () => {
//       if (!open) setHasLoggedCard(false);
//     };
//   }, [open, card, enqueueSnackbar, hasLoggedCard]);
//   // Context selection handling
//   const handleContextSelect = useCallback(
//     (newContext) => {
//       setContext(newContext);
//       setIsContextSelected(true);
//     },
//     [setContext, setIsContextSelected]
//   );
//   return (
//     <StyledDialog
//       open={open}
//       TransitionComponent={transition ? Slide : Fade}
//       keepMounted
//       onClose={closeModal}
//       fullScreen={fullScreen}
//       aria-describedby="alert-dialog-slide-description"
//       maxWidth="md"
//       PaperProps={{
//         sx: {
//           width: '75%',
//           height: 'auto',
//           maxHeight: '90vh',
//           borderRadius: theme.shape.borderRadius,
//         },
//       }}
//     >
//       <DialogPaper theme={theme}>
//         <DialogTitle>
//           {title}
//           {closeIcon && (
//             <IconButton
//               aria-label="close"
//               onClick={close}
//               sx={{
//                 position: 'absolute',
//                 right: 8,
//                 top: 8,
//                 color: theme.palette.backgroundA.contrastTextA,
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           )}
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             padding: 0,
//             // overflowY: 'visible', // Ensures content dictates the expansion
//           }}
//         >
//           <Container maxWidth="lg">
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} md={6} lg={6}>
//                 <CardMediaSection
//                   // isRequired={!isSmall}
//                   card={card}
//                   imgUrl={imageUrl}
//                 />
//                 {generateOverlay()}
//               </Grid>

//               {/* these two grid items are for the card details */}
//               <Grid item xs={6} sm={6} md={6} lg={6}>
//                 <CardDetailsContainer
//                   className={'card-detail'}
//                   // icon={<FaRegCopy />}
//                   title="Description"
//                   value={card?.desc}
//                   isTextSection={true}
//                   titles={['Description', 'Price', 'Rarity', 'Card Sets']}
//                 />
//               </Grid>
//               <Grid item xs={6} sm={6} md={6} lg={6}>
//                 <CardDetailsContainer
//                   card={card}
//                   className={'card-detail'}
//                   isIconSection={true}
//                   titles={['Level', 'Type', 'Race', 'Attribute', 'ATK', 'DEF']}
//                 />
//                 <Stack>
//                   <Card>
//                     <CardHeader>
//                       <Typography variant="h6">Inventory</Typography>
//                     </CardHeader>
//                     <CardContent>
//                       <List>
//                         {/* <ListItemText primary="Deck" secondary="Deck" /> */}
//                         <ListItem>{'Cart'}</ListItem>
//                         <ListItem>{'Deck'}</ListItem>
//                         <ListItem>{'Collection'}</ListItem>
//                       </List>
//                     </CardContent>
//                   </Card>
//                 </Stack>
//                 <Stack>
//                   {['Deck', 'Collection', 'Cart'].map((mappedContext) => (
//                     <GenericActionButtons
//                       key={mappedContext}
//                       card={card}
//                       context={mappedContext}
//                       originalContext={context}
//                       onClick={() => handleContextSelect(mappedContext)}
//                       onSuccess={() =>
//                         handleAction(
//                           {
//                             title: 'Action successful',
//                             message: `Card added to ${mappedContext} successfully.`,
//                           },
//                           'success'
//                         )
//                       }
//                       onFailure={(error) =>
//                         handleAction(
//                           {
//                             title: 'Action failed',
//                             message: `Failed to add card to ${mappedContext}.`,
//                           },
//                           'error',
//                           error
//                         )
//                       }
//                     />
//                   ))}
//                 </Stack>
//               </Grid>
//             </Grid>
//           </Container>
//         </DialogContent>
//       </DialogPaper>
//     </StyledDialog>
//   );
// };

// export default GenericCardDialog;
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { closeModal } = useModalContext();
  const { enqueueSnackbar } = useSnackbar(); // Assuming useOverlay has enqueueSnackbar method
  const [imageUrl, setImageUrl] = useState(card?.card_images[0]?.image_url);

  // Snackbar handlers (simplified for this example)
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
      // Context selection handling logic here
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
          <CardMediaSection card={card} imgUrl={imageUrl} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardDetailsContainer
            title="Description"
            value={card?.desc}
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
