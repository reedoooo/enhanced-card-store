import React, { useEffect, forwardRef, useState } from 'react';
import CardToolTip from './CardToolTip';
import PropTypes from 'prop-types';
import {
  Media,
  MediaContainer,
  MediaPopover,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
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
          loading="lazy"
        />

        {anchorEl && isHovered && (
          <MediaPopover
            open={isHovered}
            anchorEl={anchorEl}
            placement="right-start"
            loading="lazy"
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
