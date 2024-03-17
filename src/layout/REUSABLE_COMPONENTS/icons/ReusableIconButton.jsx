import React from 'react';
import { IconButton } from '@mui/material';

const ReusableIconButton = ({ icon, altText, onClick, size, hoverColor }) => {
  const defaultSize = size || 48; // Default size if not provided
  const defaultHoverColor = hoverColor || 'rgba(0, 0, 0, 0.04)'; // Default hover color

  return (
    <IconButton
      aria-label={altText}
      onClick={onClick}
      sx={{
        // width: defaultSize, // Standard icon size, adjustable via props
        // height: defaultSize, // Standard icon size, adjustable via props
        width: '40px',
        height: '40px',
        padding: '8px', // Padding to provide space around the icon
        marginRight: '8px',
        // padding: '8px', // Padding to provide some space around the icon
        // bottom: '2rem',
        // right: '2rem',
        color: 'rgba(0, 0, 0, 0.54)',
        margin: '0', // Adjust margin as needed
        // color: '#777',
        '&:hover': {
          // backgroundColor: defaultHoverColor, // Hover effect color
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        '& img': {
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}
    >
      <img src={icon} alt={altText} />
    </IconButton>
  );
};

export default ReusableIconButton;
