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
  const { deckSearchData, savedDeckData, setSavedDeckData } = useCardStore();
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

  let filteredData;
  if (Array.isArray(savedDeckData)) {
    filteredData = savedDeckData.filter((c) => c.id === card.id);
  } else {
    filteredData = [];
  }

  const productQuantity = filteredData.length;

  const handleAddToDeck = () => {
    setSavedDeckData([...savedDeckData, card]);
  };

  const handleRemoveFromDeck = () => {
    const updatedDeck = savedDeckData.filter((c) => c.id !== card.id);
    setSavedDeckData(updatedDeck);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{card?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* ...rest of your code */}
        </Grid>
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
