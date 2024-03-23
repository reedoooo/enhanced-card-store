// import React, { useState, forwardRef } from 'react';
// import Popper from '@mui/material/Popper';
// import {
//   useFloating,
//   offset,
//   flip,
//   shift,
//   autoUpdate,
// } from '@floating-ui/react';

// const RCToolTip = forwardRef(({ tooltipContent, children, ...props }, ref) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popper' : undefined;

//   // Configure Floating UI
//   const { x, y, strategy, refs, update } = useFloating({
//     open,
//     onOpenChange: (isOpen) => setAnchorEl(isOpen ? anchorEl : null),
//     placement: 'top',
//     middleware: [offset(10), flip(), shift()],
//     whileElementsMounted: autoUpdate,
//   });

//   // Handle mouse enter and leave events to control the tooltip visibility
//   const handleMouseEnter = (event) => {
//     setAnchorEl(event.currentTarget);
//     update();
//   };

//   const handleMouseLeave = () => {
//     setAnchorEl(null);
//   };

//   // Clone the child element to attach event handlers for controlling tooltip visibility
//   const child = React.cloneElement(children, {
//     ...props,
//     'aria-describedby': id,
//     onMouseEnter: handleMouseEnter,
//     onMouseLeave: handleMouseLeave,
//     ref: refs.setReference,
//   });

//   return (
//     <>
//       {child}
//       <Popper
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         placement="top"
//         modifiers={[
//           {
//             name: 'offset',
//             options: {
//               offset: [0, 8],
//             },
//           },
//         ]}
//         style={{
//           zIndex: 1,
//           position: strategy,
//           top: y ?? '',
//           left: x ?? '',
//         }}
//         role="tooltip"
//         ref={refs.setFloating}
//       >
//         <div className="MuiTooltip-tooltip">{tooltipContent}</div>
//       </Popper>
//     </>
//   );
// });

// RCToolTip.displayName = 'RCToolTip';

// export default forwardRef(RCToolTip);
import React, { useState, forwardRef } from 'react';
import Popper from '@mui/material/Popper';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';

// Correctly apply forwardRef. It now accepts props and ref as arguments.
const RCToolTip = forwardRef(({ tooltipContent, children, ...props }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Configure Floating UI
  const { x, y, strategy, refs, update } = useFloating({
    open,
    onOpenChange: (isOpen) => setAnchorEl(isOpen ? anchorEl : null),
    placement: 'top',
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  // Handle mouse enter and leave events to control the tooltip visibility
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    update();
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  // Clone the child element to attach event handlers for controlling tooltip visibility
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
});

RCToolTip.displayName = 'RCToolTip';

export default RCToolTip;
