// components/reusable/HeaderTitle.jsx
import { Typography, Container } from '@mui/material';
import React from 'react';

const HeaderTitle = ({ title, size = 'extraSmall', location = 'left' }) => {
  const sizes = {
    huge: { fontSize: '2.5rem', lineHeight: '3rem' },
    large: { fontSize: '1.75rem', lineHeight: '2.25rem' },
    medium: { fontSize: '1.5rem', lineHeight: '2rem' },
    small: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    tiny: { fontSize: '1rem', lineHeight: '1.5rem' },
    extraSmall: { fontSize: '0.75rem', lineHeight: '1.25rem' },
  };

  const textAlign = {
    left: 'left',
    center: 'center',
    right: 'right',
  };

  const containerStyles = {
    backgroundColor: (theme) => theme.palette.background.default,
    padding: 2,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: (theme) => theme.palette.background.paper,
    },
  };

  const typographyStyles = {
    fontSize: sizes[size].fontSize,
    lineHeight: sizes[size].lineHeight,
    textAlign: textAlign[location],
    fontWeight: 700,
    letterSpacing: '0.05em',
    margin: '0 auto',
    color: (theme) => theme.palette.text.primary,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: (theme) => theme.palette.secondary.main,
    },
  };

  return (
    <Container sx={containerStyles}>
      <Typography variant="h4" sx={typographyStyles}>
        {title}
      </Typography>
    </Container>
  );
};

export default HeaderTitle;
