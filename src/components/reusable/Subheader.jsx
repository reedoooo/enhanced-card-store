// Subheader.jsx
import { Typography, Container } from '@mui/material';
import React from 'react';

const Subheader = ({ subtitle, size = 'medium', location = 'left' }) => {
  const fontSize =
    {
      large: '1.5rem',
      medium: '1.2rem',
      small: '1rem',
      extraSmall: '0.85rem',
    }[size] || '1rem'; // Default to 'medium' size

  const textAlign = {
    left: 'left',
    center: 'center',
    right: 'right',
  }[location]; // Default to 'left' justify

  return (
    <Container
      sx={{
        padding: (theme) => theme.spacing(1),
      }}
    >
      <Typography
        sx={{
          fontSize: fontSize,
          textAlign: textAlign,
          fontWeight: 500,
          letterSpacing: '0.03em',
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {subtitle}
      </Typography>
    </Container>
  );
};

export default Subheader;
