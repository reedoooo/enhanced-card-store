import React, { useState, useEffect } from 'react';
import ReusableCardMedia from './CardMedia';
import placeholderImage from '../../assets/placeholder.jpeg';
import { makeStyles } from '@mui/styles';

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
  imgUrl,
  card,
  openModal,
  setHovering,
  cardRef,
}) => {
  const classes = useStyles();
  const [hasLoggedCard, setHasLoggedCard] = useState(false);

  useEffect(() => {
    if (!hasLoggedCard) {
      console.log('CARD:', card);
      setHasLoggedCard(true);
    }
  }, [hasLoggedCard, card]);

  return (
    <div ref={cardRef} className={classes.mediaContainer}>
      <div
        onClick={openModal}
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
      >
        <ReusableCardMedia imgUrl={imgUrl} />
      </div>
    </div>
  );
};

export default CardMediaSection;
