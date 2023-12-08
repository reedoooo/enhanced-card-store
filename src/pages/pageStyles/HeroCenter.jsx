import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const HeroCenter = ({ decorative, title, subtitle }) => {
  const theme = useTheme(); // Using the theme for responsive breakpoints

  return (
    <Box
      sx={{
        flex: 1,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        // my: theme.spacing(6),
        // mt: theme.spacing(12),
        // mb: theme.spacing(2),
        textAlign: 'center',
        height: {
          xs: 'auto',
          sm: 'auto',
          md: 'auto',
          lg: 'auto',
        },
      }}
    >
      {decorative && (
        <Typography
          component="span"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: {
              xs: theme.typography.body2.fontSize, // smaller screens
              sm: theme.typography.body1.fontSize, // medium screens
              md: theme.typography.body1.fontSize, // larger screens
            },
            textTransform: 'uppercase',
            letterSpacing: theme.spacing(0.5),
          }}
        >
          {decorative}
        </Typography>
      )}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: theme.typography.h4.fontSize, // smaller screens
            sm: theme.typography.h3.fontSize, // medium screens
            md: theme.typography.h2.fontSize, // larger screens
            lg: theme.typography.h1.fontSize, // extra large screens
          },
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: theme.typography.subtitle1.fontSize,
          color: theme.palette.text.secondary,
          maxWidth: '54ch',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

HeroCenter.defaultProps = {
  decorative: '',
  title: '',
  subtitle: '',
  theme: null,
};

export default HeroCenter;
