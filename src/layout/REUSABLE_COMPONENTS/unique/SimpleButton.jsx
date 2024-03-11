import React from 'react';
import { rgba } from 'polished';

const SimpleButton = ({
  theme,
  children,
  isPrimary,
  isAccent,
  isDefault,
  isDisabled,
  ...rest
}) => {
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minWidth: '140px',
    padding: `1.035rem ${theme.lenMd1}`,
    borderRadius: theme.borderRadius,
    transitionProperty: 'color, background, box-shadow',
    transitionDuration: '0.35s',
    background: theme.colorDefaultBackground,
    color: theme.colorDefaultText,
    boxShadow: isDefault
      ? `0 0 0 4px ${rgba(theme.colorDefaultBackground || 'white', 0.74)}`
      : 'none',
    ...(isPrimary && {
      background: theme.colorPrimary,
      color: theme.colorPrimaryText,
      boxShadow: `0 0 0 4px ${rgba(theme.colorPrimary || 'white', 0.4)}`,
    }),
    ...(isAccent && {
      background: theme.colorAccent,
      color: theme.colorAccentText,
      boxShadow: `0 0 0 4px ${rgba(theme.colorAccent || 'white', 0.4)}`,
    }),
    ...(isDisabled && {
      background: theme.colorDisabledBackground,
      color: theme.colorDisabledText,
      cursor: 'not-allowed',
    }),
  };

  const buttonHoverStyle = {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius,
    background: 'rgba(0, 0, 0, 0.075)',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.35s',
  };

  const buttonTextStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <button style={baseStyle} {...rest} disabled={isDisabled}>
      <span style={buttonHoverStyle} />
      <span style={buttonTextStyle}>{children}</span>
    </button>
  );
};

export default SimpleButton;
