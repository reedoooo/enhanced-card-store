import React, { useEffect, forwardRef } from 'react';
import { CardMedia, Popover } from '@mui/material';
import CardToolTip from '../CardToolTip';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useModalContext, usePopoverContext } from '../../../context';

const useStyles = makeStyles((theme) => ({
  mediaContainer: {
    cursor: 'pointer',
    position: 'relative',
  },
  popover: {
    pointerEvents: 'none',
  },
  media: {
    width: '100%',
    height: 'auto',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(0.5),
    },
  },
}));

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const CardMediaSection = forwardRef(
  (
    { imgUrl, card, isHovered, handleInteraction, handleClick, isRequired },
    ref
  ) => {
    const classes = useStyles();
    const { setModalImgUrl, clickedCard, setClickedCard } = useModalContext();

    const eventHandlers = isRequired
      ? {
          onMouseEnter: () => handleInteraction?.(true),
          onMouseLeave: () => handleInteraction?.(false),
          onClick: () => {
            handleClick?.();
            setClickedCard?.(card);
          },
        }
      : {};

    useEffect(() => {
      if (imgUrl && clickedCard) {
        setModalImgUrl(imgUrl);
      }
    }, [imgUrl, clickedCard, setModalImgUrl]);

    return (
      <div
        className={classes.mediaContainer}
        ref={ref}
        {...eventHandlers}
        onClick={() => handleClick?.()}
      >
        <CardMedia
          className={classes.media}
          component="img"
          alt={`Image for ${imgUrl || 'the card'}`}
          image={imgUrl}
        />
        {isRequired && isHovered && (
          <Popover
            className={classes.popover}
            open={isHovered}
            anchorEl={ref?.current} // Make sure this is not undefined
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
  isRequired: PropTypes.bool,
};

CardMediaSection.defaultProps = {
  isHovered: false,
  isRequired: true,
};

export default CardMediaSection;
