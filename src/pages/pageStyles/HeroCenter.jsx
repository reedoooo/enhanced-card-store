import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMode } from '../../context';

const HeroCenter = ({ decorative, title, subtitle }) => {
  const { theme } = useMode();
  const theme2 = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around', // Distributes space evenly
        alignItems: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        background: theme.palette.success.light,
        padding: theme2.spacing(2), // Adjust padding as needed
      }}
    >
      {decorative && (
        <Typography
          component="span"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
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
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: theme2.typography.subtitle1.fontSize,
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
};

export default HeroCenter;
