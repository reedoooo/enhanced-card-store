import React, { useState, useEffect } from 'react';
import ReusableCardMedia from './CardMedia';
import placeholderImage from '../../assets/images/placeholder.jpeg';
import { makeStyles } from '@mui/styles';
import { Popover } from '@mui/material';
import CardToolTip from '../cards/CardToolTip';

const useStyles = makeStyles({
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
});

const CardMediaSection = ({
  imgUrl = placeholderImage,
  card,
  openModal,
  cardRef,
  modalIsOpen,
  onCardHover,
  cardData,
  setIsPopoverOpen,
  isPopoverOpen,
}) => {
  const classes = useStyles();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);

  useEffect(() => {
    if (!hasLoggedCard) {
      // console.log('CARD:', card);
      setHasLoggedCard(true);
    }
  }, [hasLoggedCard, card]);

  // useEffect(() => {
  //   if (!modalIsOpen) {
  //     setIsPopoverOpen(false);
  //   }
  // }, [modalIsOpen]);

  const open = Boolean(cardData === card) && !modalIsOpen;

  const handleMouseEnter = () => {
    if (!modalIsOpen && typeof onCardHover === 'function') {
      onCardHover(card);
    }
  };

  const handleMouseLeave = () => {
    if (!modalIsOpen && typeof onCardHover === 'function') {
      onCardHover(null);
      // setIsPopoverOpen(false);
    }
  };

  // const handleClick = () => {
  //   // Close the popover and open the modal
  //   setIsPopoverOpen(false);
  //   openModal();
  // };

  return (
    <div
      ref={cardRef}
      className={classes.mediaContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => {
          openModal();
          setIsPopoverOpen(false);
        }}
      >
        <ReusableCardMedia imgUrl={imgUrl} />
      </div>

      <Popover
        id={open ? 'mouse-over-popover' : undefined}
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={cardRef?.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => onCardHover(null)}
        disableRestoreFocus
      >
        <CardToolTip card={card} />
      </Popover>
    </div>
  );
};

export default CardMediaSection;

CardMediaSection.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCardHover: () => {}, // provide a no-op function as default
};
