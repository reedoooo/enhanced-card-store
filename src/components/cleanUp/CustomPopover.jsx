import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import CardToolTip from '../cards/CardToolTip';
import { makeStyles } from '@mui/styles';
import GenericCard from '../cards/GenericCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

const CustomPopover = ({
  card,
  children,
  isHovering,
  cardRef,
  anchorEl,
  open,
  setAnchorEl,
  // handleMouseEnter,
  // handleMouseLeave,
  handlePopoverClose,
}) => {
  const classes = useStyles();

  const id = open ? 'mouse-over-popover' : undefined;
  // console.log('card:', card);
  // console.log('cardRef:', cardRef);
  // console.log('anchorEl:', anchorEl);
  // console.log('open:', open);
  // console.log('handlePopoverClose:', handlePopoverClose);
  return (
    <div>
      {children}
      {/* <Popover
        id={id}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <CardToolTip card={card} />
      </Popover> */}
      {/* <div style={{ position: 'absolute', top: '-9999px' }} ref={cardRef}>
        <GenericCard card={card} />
      </div> */}
    </div>
  );
};

CustomPopover.propTypes = {
  card: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomPopover;
