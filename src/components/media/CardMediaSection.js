// CardMediaSection.js
import React from 'react';
import ReusableCardMedia from './CardMedia';
import CardToolTip from '../cards/CardToolTip';
import { makeStyles } from '@mui/styles';
import { Popover } from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  mediaContainer: {
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
    {
      imgUrl,
      card,
      isHovered,
      handleInteraction,
      handleClick,
      setClickedCard,
      isRequired,
    },
    ref
  ) => {
    const classes = useStyles();

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
    return (
      <div className={classes.mediaContainer} ref={ref} {...eventHandlers}>
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
//     return (
//       <div className={classes.mediaContainer} ref={ref}>
//         <ReusableCardMedia
//           imgUrl={imgUrl}
//           {...eventHandlers} // Spread event handlers conditionally
//         />
//         {isRequired && isHovered && ref.current && (
//           <Popover
//             open={isHovered}
//             anchorEl={ref?.current}
//             anchorOrigin={anchorOrigin}
//             transformOrigin={transformOrigin}
//             onClose={() => {
//               if (typeof handleInteraction === 'function') {
//                 handleInteraction(false);
//               }
//             }}
//             disableRestoreFocus
//           >
//             <CardToolTip card={card} />
//           </Popover>
//         )}
//       </div>
//     );
//   }
// );

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
