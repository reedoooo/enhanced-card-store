import React, { useContext } from 'react';
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegCopy,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import { makeStyles } from '@mui/styles';
import placeholderImage from '../../assets/placholder.jpeg';
import { useCardStore } from '../../context/CardContext/CardStore';
import DeckActionButtons from '../buttons/DeckActionButtons';

const useStyles = makeStyles({
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  media: {
    objectFit: 'cover',
    borderRadius: '4px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
});

const DeckCardModal = ({ isOpen, onClose, card }) => {
  const classes = useStyles();
  if (!card) return null; // or some other placeholder
  const { savedDeckData, setSavedDeckData } = useCardStore();
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  let filteredData;
  if (Array.isArray(savedDeckData)) {
    filteredData = savedDeckData.filter((c) => c.id === card.id);
  } else {
    filteredData = [];
  }

  const productQuantity = filteredData.length;
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      onClose();
    }
  };
  // const handleRemoveFromDeck = () => {
  //   const updatedDeck = savedDeckData.filter((c) => c.id !== card.id);
  //   setSavedDeckData(updatedDeck);
  // };
  return (
    <Dialog
      open={isOpen} // use isOpen instead of open
      onClose={handleClose} // this is now used
      fullWidth
      maxWidth="md"
    >
      <DialogTitle style={{ backgroundColor: 'blue', color: 'white' }}>
        {card?.name}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="column"
            justifyContent="space-between"
          >
            <CardMedia
              component="img"
              alt={card?.name}
              className={classes.media}
              image={imgUrl}
            />
            <DeckActionButtons
              card={card}
              deckCardQuantity={productQuantity}
              className={classes.actionButtons}
            />
          </Grid>
          <Grid item xs={12} sm={6} container direction="column">
            {/* Use classes.details for the styling of CardDetail */}
            <CardDetail
              icon={<FaLevelUpAlt />}
              title="Level"
              value={card?.level}
              className={classes.details}
            />
            <CardDetail
              icon={<FaVenusMars />}
              title="Type"
              value={card?.type}
            />
            <CardDetail icon={<FaDragon />} title="Race" value={card?.race} />
            <CardDetail
              icon={<FaRegLightbulb />}
              title="Attribute"
              value={card?.attribute}
            />
            <CardDetail title="ATK" value={card?.atk} />
            <CardDetail icon={<FaShieldAlt />} title="DEF" value={card?.def} />
            <CardDetail
              icon={<FaRegCopy />}
              title="Description"
              value={card?.desc}
            />{' '}
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="primary"                 onClick={() => addOneToDeck(card)}>
          Add To Deck
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};

const CardDetailComponent = ({ icon, title, value, className }) => (
  <Box className={className}>
    {icon && <Box mr={1}>{icon}</Box>}
    <Typography variant="h6">
      {title}: {value || 'N/A'}
    </Typography>
  </Box>
);

const CardDetail = React.memo(CardDetailComponent);

export default DeckCardModal;
