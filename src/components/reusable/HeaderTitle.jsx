// components/reusable/HeaderTitle.jsx
import { Typography, Container } from '@mui/material';
import React from 'react';

const HeaderTitle = ({ title, size = 'extraSmall', location = 'left' }) => {
  const sizes = {
    huge: '2.5rem',
    large: '1.75rem',
    medium: '1.5rem',
    small: '1.25rem',
    tiny: '1rem',
    extraSmall: '0.75rem',
  };

  const textAlign = {
    left: 'left',
    center: 'center',
    right: 'right',
  };

  return (
    <Container
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: sizes[size],
          textAlign: textAlign[location],
          fontWeight: 700,
          letterSpacing: '0.05em',
          margin: '0 auto',
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
    </Container>
  );
};

export default HeaderTitle;
