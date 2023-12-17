// CardMediaSection.js
import React, { useEffect } from 'react';
import ReusableCardMedia from './CardMedia';
import CardToolTip from '../cards/CardToolTip';
import { makeStyles } from '@mui/styles';
import { Popover } from '@mui/material';
import PropTypes from 'prop-types';
import { useModalContext, usePopoverContext } from '../../context';

const useStyles = makeStyles({
  mediaContainer: {
    cursor: 'pointer', // Change cursor to indicate it's clickable
    position: 'relative',
  },
  popover: {
    pointerEvents: 'none', // Ensure popover doesn't block mouse events
  },
});

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const CardMediaSection = React.forwardRef(
  (
    { imgUrl, card, isHovered, handleInteraction, handleClick, isRequired },
    ref
  ) => {
    const classes = useStyles();
    const { modalImgUrl, setModalImgUrl, clickedCard, setClickedCard } =
      useModalContext();
    // console.log('CardMediaSection: ', card);
    // Event handlers are now only assigned if isRequired is true
    const eventHandlers = isRequired
      ? {
          onMouseEnter: () => {
            if (typeof handleInteraction === 'function') {
              handleInteraction(true);
            }
          },
          onMouseLeave: () => {
            if (typeof handleInteraction === 'function') {
              handleInteraction(false);
            }
          },
          onClick: () => {
            if (typeof handleClick === 'function') {
              handleClick();
            }
            if (typeof setClickedCard === 'function') {
              setClickedCard(card);
            }
          },
        }
      : {};

    const onClickHandler = () => {
      if (handleClick) {
        handleClick();
      }
    };

    useEffect(() => {
      if (imgUrl && clickedCard) {
        setModalImgUrl(imgUrl);
      }
    }, [modalImgUrl, setModalImgUrl, clickedCard]);

    return (
      <div
        className={classes.mediaContainer}
        ref={ref}
        {...eventHandlers}
        onClick={onClickHandler}
      >
        <ReusableCardMedia imgUrl={imgUrl} />
        {isRequired && isHovered && (
          <Popover
            className={classes.popover}
            open={isHovered}
            anchorEl={ref?.current}
            onClose={() => handleInteraction(false)}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            disableRestoreFocus
          >
            <CardToolTip card={card} />
          </Popover>
        )}
      </div>
    );
  }
);

CardMediaSection.displayName = 'CardMediaSection';

CardMediaSection.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  handleInteraction: PropTypes.func,
  handleClick: PropTypes.func,
  setClickedCard: PropTypes.func,
  isRequired: PropTypes.bool,
};

CardMediaSection.defaultProps = {
  isHovered: false,
  handleInteraction: null,
  handleClick: null,
  setClickedCard: null,
  isRequired: true,
};

export default CardMediaSection;
