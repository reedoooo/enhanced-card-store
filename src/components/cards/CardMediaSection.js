import React, { useEffect, forwardRef, useState } from 'react';
import CardToolTip from './CardToolTip';
import PropTypes from 'prop-types';
import {
  Media,
  MediaContainer,
  MediaPopover,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useDialogState from '../../context/hooks/useDialogState';
import GenericCardDialog from '../dialogs/GenericCardDialog';
import { usePopover } from '../../context/hooks/usePopover';

const CardMediaSection = forwardRef(
  (
    {
      imgUrl,
      card,
      isHovered,
      handleInteraction,
      // handleClick,
      isRequired,
      isModalOpen,
      context,
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
    const { dialogState, openDialog, closeDialog } = useDialogState();
    const { setIsPopoverOpen } = usePopover();
    const handleOpenDialog = () => {
      openDialog('isCardDialogOpen');
      setIsPopoverOpen(false);
    };
    const label = { inputProps: { 'aria-label': 'Bookmark card' } };
    const handleCloseDialog = () => {
      closeDialog('isCardDialogOpen');
    };
    return (
      <MediaContainer
        ref={ref}
        onClick={handleOpenDialog}
        style={{ position: 'relative' }} // Ensure this container has relative positioning
        {...(isRequired && {
          onMouseEnter: () => handleInteraction?.(!isModalOpen ? true : false), // Use optional chaining
          onMouseLeave: () => handleInteraction?.(false), // Use optional chaining
          // onClick: () => {
          //   handleClick?.();
          // },
        })}
      >
        {dialogState.isCardDialogOpen && (
          <GenericCardDialog
            open={dialogState.isCardDialogOpen}
            context={context}
            card={card}
            onClose={handleCloseDialog}
            title={card?.name}
          />
        )}
        <Media
          component="img"
          alt={`Image for ${imgUrl || 'the card'}`}
          image={imgUrl}
          loading="lazy"
        />
        <Checkbox
          {...label}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          style={{
            position: 'absolute',
            top: 0, // Align to the top
            right: 0, // Align to the right
            margin: '8px', // Adjust spacing as needed
          }}
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
