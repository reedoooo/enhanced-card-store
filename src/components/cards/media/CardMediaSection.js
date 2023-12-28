import React, { useEffect, forwardRef } from 'react';
import { CardMedia, Popover, Popper } from '@mui/material';
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
    height: 'auto',
    width: 'auto',
    maxWidth: '300px',
    maxHeight: 'auto',
  },
  media: {
    width: '100%',
    height: 'auto',
    flexGrow: 1,
    alignItems: 'flex-end',
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
  vertical: 'top',
  horizontal: 'right',
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
    const { isPopoverOpen } = usePopoverContext();
    const [anchorEl, setAnchorEl] = React.useState(ref?.current || null);
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

    useEffect(() => {
      if (isHovered && ref?.current) {
        setAnchorEl(ref?.current);
      } else {
        setAnchorEl(null);
      }
    }, [isHovered, ref]);

    return (
      <div
        className={classes.mediaContainer}
        ref={ref}
        {...eventHandlers}
        // onClick={() => handleClick?.()}
      >
        <CardMedia
          className={classes.media}
          component="img"
          alt={`Image for ${imgUrl || 'the card'}`}
          image={imgUrl}
        />
        {anchorEl && isHovered && (
          <Popper
            className={classes.popover}
            open={isHovered || isPopoverOpen}
            anchorEl={anchorEl} // Make sure this is not undefined
            onClose={() => handleInteraction(false)}
            // anchorOrigin={anchorOrigin}
            // transformOrigin={transformOrigin}
            placement="right-start"
            // disableRestoreFocus
          >
            <CardToolTip card={card} />
          </Popper>
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
