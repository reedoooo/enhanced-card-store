import React from 'react';
import { Box, Typography } from '@mui/material';
import useResponsiveStyles from '../../context/hooks/useResponsiveStyles';
import { useMode } from '../../context';
import { useTheme } from '@mui/styles';

const CardDetails = ({ details, className }) => {
  // details expected to be an array of objects with { icon, title, value }
  const { theme } = useMode();
  const theme2 = useTheme();
  const { getHeaderStyle, getButtonTypographyVariant } =
    useResponsiveStyles(theme);

  const styles = {
    cardDetailContainer: {
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0 4px 8px 0 ${theme2.palette.shadow}`,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: `0 6px 12px 0 ${theme.palette.shadow}`,
      },
    },
    detailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    iconWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(4),
      width: theme.spacing(4),
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '& svg': {
        fontSize: theme.typography.pxToRem(20),
      },
    },
    titleStyle: {
      fontWeight: 700,
      color: theme.palette.text.primary,
      textTransform: 'uppercase',
    },
    valueStyle: {
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },
  };

  return (
    <Box className={className} sx={styles.cardDetailContainer}>
      {details.map(({ icon, title, value }, index) => (
        <Box key={index} sx={styles.detailRow}>
          {icon && <Box sx={styles.iconWrapper}>{icon}</Box>}
          <Typography variant="subtitle1">
            <span style={styles.titleStyle}>{title}:</span>
            <span style={styles.valueStyle}> {value || ''}</span>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CardDetails;
