import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Popover,
  Grid,
  ButtonGroup,
} from '@mui/material';
import CardMediaSection from '../media/CardMediaSection';
import GenericActionButtons from '../buttons/actionButtons/GenericActionButtons';
import placeholderImage from '../../assets/images/placeholder.jpeg';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import { CartContext } from '../../context/CartContext/CartContext';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '300px', // or any desired max height
    minHeight: '300px', // make sure it matches max height
    overflow: 'hidden', // ensures content doesn't spill out
    borderRadius: theme.spacing(1), // Add border radius for cards
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for cards
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.03)', // Add a slight scale effect on hover
    },
  },
  image: {
    maxHeight: '200px',
    width: '100%',
    objectFit: 'cover', // Ensure the image covers the entire space
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    // maxWidth: '200px',
    minHeight: '40px',
    maxHeight: '60px',
    width: '100%',
  },
  content: {
    transform: 'scale(0.9)', // scales down to 90% of the original size
    padding: 0,
  },
  cardActions: {
    marginTop: 'auto', // pushes the actions to the bottom
    display: 'flex',
    justifyContent: 'center', // centers the buttons
    width: '100%',
  },
}));

const GenericCard = ({
  card,
  context,
  cardInfo,
  cardRef,
  setHoveredCard,
  hoveredCard,
  setIsPopoverOpen,
  isPopoverOpen,
  // anchorEl,
  // handlePopoverOpen,
  // handlePopoverClose,
  // open,
}) => {
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  const collectionContext = useContext(CollectionContext);
  const contextProps =
    {
      Deck: deckContext,
      Cart: cartContext,
      Collection: collectionContext,
    }[context] || {};
  // const tooltipRef = useRef(null);
  // const cardRef = useRef(null);

  const [buttonVariant, setButtonVariant] = useState('contained');
  const [isModalOpen, setModalOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;
  const open = Boolean(hoveredCard === card);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openProductModal = openModal;
  // const handlePopoverOpen = () => {
  //   setHoveredCard(card);
  // };

  // const handlePopoverClose = () => {
  //   setHoveredCard(null);
  // };

  const classes = useStyles();
  const handleCardHover = (cardData) => {
    setHoveredCard(cardData);
    setIsPopoverOpen(true); // or based on other logic you might have
  };

  const CardContentByContext = ({ context }) => {
    const price = `Price: ${card?.card_prices?.[0]?.tcgplayer_price}`;
    return (
      <>
        <Typography variant="body3" color="text.secondary" noWrap>
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {/* Quantity: {contextProps?.deckCardQuantity?.quantityOfSameId || `Not in ${context?.toLowerCase()}`} */}
        </Typography>
      </>
    );
  };
  // console.log('cardRef:', cardRef.current);
  // console.log('anchorEl:', anchorEl);
  // console.log('open:', open);
  // console.log('handlePopoverClose:', handlePopoverClose);
  // console.log('handlePopoverOpen:', handlePopoverOpen);
  return (
    <Card
      className={classes.card}
      // aria-owns={open ? 'mouse-over-popover' : undefined}
      // aria-haspopup="true"
      // onMouseEnter={handlePopoverOpen}
      // onMouseLeave={handlePopoverClose}
    >
      {context === 'Deck' ? (
        <CardMediaSection
          imgUrl={imgUrl}
          card={card}
          onCardHover={handleCardHover}
          cardData={hoveredCard}
          openModal={openModal}
          closeModal={closeModal}
          setIsPopoverOpen={setIsPopoverOpen}
          isPopoverOpen={isPopoverOpen}
          cardRef={cardRef}
          // hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
          modalIsOpen={isModalOpen}
          // anchorEl={anchorEl}
        />
      ) : (
        <CardMedia
          component="img"
          alt={card?.name}
          // cardRef={ref}
          image={imgUrl}
          className={classes.image}
        />
      )}
      <Grid item xs zeroMinWidth>
        <CardContent className={classes.content}>
          <Typography variant="h6">{card?.name}</Typography>
          <CardContentByContext context={context} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          {context === 'Store' || context === 'Cart' ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <GenericActionButtons
                card={card}
                context={context}
                // handleOpenDialog={openModal}
                open={openModal}
                variant={buttonVariant}
              />
              <Button
                variant={buttonVariant}
                color="primary"
                onClick={openProductModal}
                className={classes.button}
              >
                View Details
              </Button>
            </div>
          ) : (
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              // fullWidth={true}//
              display="flex"
              // maxWidth="110px"
              margin="0"
              padding="0"
              left="0"
            >
              {/* <GenericActionButtons
                card={card}
                open={isModalOpen}
                closeModal={closeModal}
                context={context}
                variant={buttonVariant}
              /> */}
              <GenericActionButtons
                card={card}
                open={isModalOpen}
                closeModal={closeModal}
                context={'Collection'}
                variant={buttonVariant}
              />
            </ButtonGroup>
          )}
        </CardActions>
      </Grid>
    </Card>
  );
};

export default GenericCard;
