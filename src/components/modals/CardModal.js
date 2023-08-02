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
import CartActionButtons from '../buttons/CartActionButtons';
import { CartContext } from '../../context/CartContext/CartContext';

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

const CardModal = ({ isOpen, onClose, card }) => {
  const classes = useStyles();
  const { getCardQuantity } = useContext(CartContext);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const productQuantity = getCardQuantity(card?.id);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{card?.name}</DialogTitle>
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
            <CartActionButtons
              card={card}
              productQuantity={productQuantity}
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

export default CardModal;
