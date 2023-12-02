import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroCenter = ({ decorative, title, subtitle, theme }) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      my: 6,
      textAlign: 'center',
      height: decorative ? '50vh' : 'auto', // Adjust height based on the presence of decorative text
    }}
  >
    {decorative && (
      <Typography
        component="span"
        sx={{
          color: theme?.palette.primary.main || 'primary.main',
          fontWeight: 600,
          fontSize: 'sm',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {decorative}
      </Typography>
    )}
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '4xl', sm: '5xl', md: '6xl' },
        fontWeight: 800,
        color: theme?.palette.text.primary || 'black',
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: 'lg',
        color: 'text.secondary',
        maxWidth: '54ch',
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

HeroCenter.defaultProps = {
  decorative: '',
  title: '',
  subtitle: '',
  theme: null,
};

export default HeroCenter;
