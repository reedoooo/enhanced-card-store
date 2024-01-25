import React, { useEffect, forwardRef, useState } from 'react';
import { CardMedia, Popover, Popper } from '@mui/material';
import CardToolTip from '../CardToolTip';
import PropTypes from 'prop-types';
import { useModalContext, useMode, usePopoverContext } from '../../../context';
import {
  MediaContainer,
  Media,
  MediaPopover,
  Overlay,
} from '../../../context/hooks/style-hooks/usePortfolioStyles';

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
    {
      imgUrl,
      card,
      isHovered,
      handleInteraction,
      handleClick,
      isRequired,
      isModalOpen,
    },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { theme } = useMode();
    // Handle overlay state and interaction
    const [overlay, setOverlay] = useState(null);

    const handleOverlayChange = (newOverlay) => {
      // Logic to change overlay based on rarity or other property
      setOverlay(newOverlay);
    };

    useEffect(() => {
      if (isHovered && ref?.current) {
        setAnchorEl(ref.current);
      } else {
        setAnchorEl(null);
      }
    }, [isHovered, ref]);

    return (
      <MediaContainer
        ref={ref}
        {...(isRequired && {
          onMouseEnter: () => handleInteraction?.(!isModalOpen ? true : false), // Use optional chaining
          onMouseLeave: () => handleInteraction?.(false), // Use optional chaining
          onClick: () => {
            handleClick?.();
            // handleOverlayChange('newOverlayValue'); // Your existing logic
          },
        })}
      >
        <Media
          component="img"
          alt={`Image for ${imgUrl || 'the card'}`}
          image={imgUrl}
        />

        {anchorEl && isHovered && (
          <MediaPopover
            open={isHovered}
            anchorEl={anchorEl}
            placement="right-start"
          >
            <CardToolTip card={card} />
          </MediaPopover>
        )}
      </MediaContainer>
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
