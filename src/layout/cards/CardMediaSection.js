/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMode, usePopover, useDialogState } from 'context';
import CardToolTip from './CardToolTip';
import { CardMedia, Popper } from '@mui/material';
import GenericCardDialog from 'layout/dialogs/GenericCardDialog';

const CardMediaSection = React.forwardRef(
  (
    {
      imgUrl = '',
      card = {},
      isHovered = false,
      handleInteraction = () => {},
      isRequired = false,
      isModalOpen = false,
      context = '',
    },
    ref
  ) => {
    const { theme } = useMode();
    const [anchorEl, setAnchorEl] = useState(null);
    const { dialogState, openDialog, closeDialog } = useDialogState();
    const { setIsPopoverOpen } = usePopover();
    useEffect(() => {
      if (isHovered && ref?.current) {
        setAnchorEl(ref.current);
      } else {
        setAnchorEl(null);
      }
    }, [isHovered, ref]);
    const handleOpenDialog = () => {
      openDialog('isCardDialogOpen');
      setIsPopoverOpen(false);
    };
    const handleCloseDialog = () => {
      closeDialog('isCardDialogOpen');
    };
    return (
      <div
        ref={ref}
        onClick={() => {
          openDialog('isCardDialogOpen');
          setIsPopoverOpen(false);
        }}
        style={{
          position: 'relative',
          cursor: 'pointer',
        }}
        {...(isRequired && {
          onMouseEnter: () => handleInteraction?.(!isModalOpen ? true : false), // Use optional chaining
          onMouseLeave: () => handleInteraction?.(false), // Use optional chaining
        })}
      >
        {dialogState.isCardDialogOpen && (
          <GenericCardDialog
            open={dialogState.isCardDialogOpen}
            context={context}
            card={card}
            onClose={() => closeDialog('isCardDialogOpen')}
            title={card?.name}
          />
        )}
        <CardMedia
          component="img"
          alt={`Image for ${imgUrl || 'the card'}`}
          image={imgUrl}
          loading="lazy"
          sx={{
            width: '100%',
            height: 'auto',
            flexGrow: 1,
            alignItems: 'flex-end',
            padding: theme.spacing(0.5),
          }}
        />
        {anchorEl && isHovered && (
          <Popper
            open={isHovered}
            anchorEl={anchorEl}
            placement="right-start"
            loading="lazy"
            sx={{
              pointerEvents: 'none',
              height: 'auto',
              width: 'auto',
              maxWidth: '300px',
              maxHeight: 'auto',
            }}
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

export default CardMediaSection;
