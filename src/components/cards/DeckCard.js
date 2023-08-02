import {
  Card,
  Button,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';

import placeholderImage from '../../assets/placholder.jpeg';
import DeckCardModal from '../modals/DeckCardModal';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import DeckActionButtons from '../buttons/DeckActionButtons';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '80%',
    margin: '2px 0', // Further reduced top and bottom margin
  },
  media: {
    // height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  content: {
    flex: '1 1 auto',
    overflow: 'auto',
    fontSize: '0.7rem', // Further reduced the font size
  },
  actionButtons: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
  },
});

const DeckCard = ({ card }) => {
  const { deckData, getCardQuantity } = useContext(DeckContext);
  const classes = useStyles();
  const { id, name } = card;
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const openCardModal = () => setCardModalOpen(true);
  const closeCardModal = () => setCardModalOpen(false);
  const deckCardQuantity = getCardQuantity(card?.id);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

  return (
    <Card key={id} className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        alt={name}
        image={imgUrl}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cost: {card.cost}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity in Deck:{' '}
          {deckCardQuantity.quantityOfSameId > 0
            ? deckCardQuantity.quantityOfSameId
            : 'Not in deck'}
        </Typography>
        <CardActions>
          <Button size="small" color="primary" onClick={openCardModal}>
            View Details
          </Button>
          <DeckCardModal
            isOpen={isCardModalOpen}
            onClose={closeCardModal}
            card={card}
          />
          <DeckActionButtons
            card={card}
            deckCardQuantity={deckCardQuantity}
            className={classes.actionButtons}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default DeckCard;
