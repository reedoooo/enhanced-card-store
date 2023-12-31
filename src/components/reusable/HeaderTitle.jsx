// components/reusable/HeaderTitle.jsx
import { Typography, Container } from '@mui/material';
import React from 'react';
import { useMode } from '../../context/hooks/colormode';

const HeaderTitle = ({ title, size = 'extraSmall', location = 'left' }) => {
  const { theme } = useMode();
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
    backgroundColor: theme.palette.background.quaternary,
    width: '50%',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: theme.shape.borderRadius,
    padding: 2,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.text.main,
    },
  };

  const typographyStyles = {
    fontSize: sizes[size].fontSize,
    lineHeight: sizes[size].lineHeight,
    textAlign: textAlign[location],
    fontWeight: 700,
    letterSpacing: '0.05em',
    margin: '0 auto',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: (theme) => theme.palette.text.main,
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
