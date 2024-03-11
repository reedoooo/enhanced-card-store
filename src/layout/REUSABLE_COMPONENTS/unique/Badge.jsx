import React from 'react';
import { Unicon } from '../'; // Presuming Unicon is a valid component

console.log('unicon', Unicon);

const Badge = ({
  size = 'md',
  fill,
  icon,
  isPrimary,
  isAccent,
  isDefault,
  theme, // Assuming theme is now passed as a prop
  ...rest
}) => {
  console.log('icon', icon);

  // Conditional badge styles based on props
  const badgeStyle = {
    fill: isPrimary
      ? theme.colorPrimary
      : isAccent
        ? theme.colorAccent
        : isDefault
          ? theme.colorDefaultBackground
          : fill || 'transparent',
  };

  const textStyle = {
    color: isPrimary
      ? theme.colorPrimaryText
      : isAccent
        ? theme.colorAccentText
        : isDefault
          ? theme.colorDefaultText
          : 'inherit',
  };

  // Size-based badge styles
  const sizeStyle = {
    width:
      size === 'sm'
        ? theme.lenSm1
        : size === 'md'
          ? theme.lenSm2
          : size === 'lg'
            ? theme.lenSm3
            : size === 'xl'
              ? theme.lenLg1
              : size === 'xxl'
                ? theme.lenXl1
                : 'auto',
    height:
      size === 'sm'
        ? theme.lenSm1
        : size === 'md'
          ? theme.lenSm2
          : size === 'lg'
            ? theme.lenSm3
            : size === 'xl'
              ? theme.lenLg1
              : size === 'xxl'
                ? theme.lenXl1
                : 'auto',
  };

  // Combining the wrapper styles
  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyle,
  };

  const svgWrapperStyle = {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const iconStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <span {...rest}>
      <span style={wrapperStyle}>
        <span style={svgWrapperStyle}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle style={badgeStyle} cx="4" cy="4" r="4" />
          </svg>
        </span>
        {icon && (
          <span style={iconStyle}>
            {/* Assuming Unicon accepts style prop if needed */}
            <Unicon style={textStyle}>{icon}</Unicon>
          </span>
        )}
      </span>
    </span>
  );
};

export default Badge;
