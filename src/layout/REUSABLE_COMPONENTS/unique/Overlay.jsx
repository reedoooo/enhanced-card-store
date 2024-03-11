import React from 'react';

const Overlay = ({ isVisible, position = 'fixed', zIndex = 2, ...rest }) => {
  // Defining the base and conditional styles
  const baseStyle = {
    position: position,
    zIndex: zIndex,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    transitionProperty: 'visibility, opacity',
    transitionDuration: '0.5s',
    visibility: 'hidden',
    opacity: 0,
  };

  const visibleStyle = isVisible
    ? {
        visibility: 'visible',
        opacity: 1,
      }
    : {};

  // Merging the base styles with conditional styles based on `isVisible`
  const finalStyle = { ...baseStyle, ...visibleStyle };

  return <div style={finalStyle} {...rest} />;
};

export default Overlay;
