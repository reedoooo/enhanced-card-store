import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMode } from '../../context';

const HeroCenter = ({ decorative, title, subtitle }) => {
  const theme2 = useTheme(); // Using the theme for responsive breakpoints

  const { theme } = useMode();
  return (
    <Box
      sx={{
        flex: 1,
        flexGrow: 1,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: theme2.spacing(2),
        // padding: theme2.spacing(2),
        background: theme.palette.success.light,
        // my: theme.spacing(6),
        // mt: theme.spacing(12),
        // mb: theme.spacing(2),
        textAlign: 'center',
        // height: {
        //   xs: 'auto',
        //   sm: 'auto',
        //   md: 'auto',
        //   lg: 'auto',
        // },
      }}
    >
      {decorative && (
        <Typography
          component="span"
          sx={{
            color: theme2.palette.primary.main,
            fontWeight: theme2.typography.fontWeightMedium,
            fontSize: {
              xs: theme2.typography.body2.fontSize, // smaller screens
              sm: theme2.typography.body1.fontSize, // medium screens
              md: theme2.typography.body1.fontSize, // larger screens
            },
            textTransform: 'uppercase',
            letterSpacing: theme2.spacing(0.5),
          }}
        >
          {decorative}
        </Typography>
      )}
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: theme2.typography.h4.fontSize, // smaller screens
            sm: theme2.typography.h3.fontSize, // medium screens
            md: theme2.typography.h2.fontSize, // larger screens
            lg: theme2.typography.h1.fontSize, // extra large screens
          },
          fontWeight: theme2.typography.fontWeightBold,
          color: theme2.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: theme2.typography.subtitle1.fontSize,
          color: theme2.palette.text.secondary,
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
