import Popper from '@mui/material/Popper';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import React, { useState } from 'react';

const RCToolTip = React.forwardRef(
  ({ tooltipContent, children, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const { x, y, strategy, refs, update } = useFloating({
      open,
      onOpenChange: (isOpen) => setAnchorEl(isOpen ? anchorEl : null),
      placement: 'top',
      middleware: [offset(10), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    });
    const handleMouseEnter = (event) => {
      setAnchorEl(event.currentTarget);
      update();
    };
    const handleMouseLeave = () => {
      setAnchorEl(null);
    };
    const childWithHandlers = React.cloneElement(children, {
      'aria-describedby': id,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ref: refs.setReference,
      ...props, // Spread additional props to the cloned child
    });

    return (
      <>
        {childWithHandlers}
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="top"
          role="tooltip"
          ref={refs.setFloating}
          style={{
            zIndex: 1,
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          <div className="MuiTooltip-tooltip">{tooltipContent}</div>
        </Popper>
      </>
    );
  }
);

RCToolTip.displayName = 'RCToolTip';

export default RCToolTip;
