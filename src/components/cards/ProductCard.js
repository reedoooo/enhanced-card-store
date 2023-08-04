import { Card, Button, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import placeholderImage from '../../assets/placholder.jpeg';
import CardModal from '../modals/CardModal';
import CartActionButtons from '../buttons/CartActionButtons';
import { useCartStore } from '../../context/CartContext/CartContext';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    minHeight: 300,
    margin: '16px',
    padding: '16px',
  },
  media: {
    flex: 0.75, // 3/4 of the card
  },
  content: {
    flex: 0.25, // 1/4 of the card
  },
  button: {
    margin: '0 8px',
  },
  largerButton: {
    margin: '0 8px',
    padding: '10px',
    fontSize: '20px',
  },
  actionButtons: {
    // Custom styles for CartActionButtons in ProductCard go here
    backgroundColor: '#f5f5f5',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
  },
});

const ProductCard = ({ card, page }) => {
  const { cartData, getCardQuantity } = useCartStore();
  const classes = useStyles();

  const { id, name } = card;
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const openCardModal = () => setCardModalOpen(true);
  const closeCardModal = () => setCardModalOpen(false);
  const productQuantity = getCardQuantity(card?.id);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

  return (
    <Card key={id} className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        alt={name}
        image={imgUrl}
      />
      <div className={classes.content}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {card?.card_prices?.[0]?.tcgplayer_price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity:{' '}
            {productQuantity.quantityOfSameId > 0
              ? productQuantity.quantityOfSameId
              : 'Not in cart'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={openCardModal}>
            Product Details
          </Button>
          <CardModal
            isOpen={isCardModalOpen}
            onClose={closeCardModal}
            card={card}
          />
          <CartActionButtons
            card={card}
            productQuantity={productQuantity}
            className={classes.actionButtons}
          />
        </CardActions>
      </div>
    </Card>
  );
};

export default ProductCard;
