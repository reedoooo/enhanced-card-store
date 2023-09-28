import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import theme from '../../assets/styles/themes';
import { themeSettings } from '../../theme';

const HeaderTitle = ({ title, size, location }) => {
  const fontSize =
    {
      huge: '2.5rem',
      large: '1.75rem',
      medium: '1.5rem',
      small: '1.25rem',
      tiny: '1rem',
      extraSmall: '0.75rem',
    }[size] || '0.75rem'; // Default to 'extraSmall' size

  const textAlign = {
    left: 'left',
    center: 'center',
    right: 'right',
  }[location]; // Default to 'left' justify

  console.log('theme', theme);
  console.log('theme', themeSettings);
  return (
    <Container
      sx={{
        backgroundColor: (theme) => theme.palette.background,
        padding: (theme) => theme.spacing(2),
      }}
      // justifyContent={justifyContent}
    >
      <Typography
        sx={{
          fontSize: fontSize,
          textAlign: textAlign,
          fontWeight: 700,
          letterSpacing: '0.05em',
          margin: '0 auto',
          // textAlign: 'center',
          color: (theme) => theme.palette.contrastText,
        }}
      >
        {title}
      </Typography>
    </Container>
  );
};

export default HeaderTitle;
