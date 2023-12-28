import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import useResponsiveStyles from '../../context/hooks/useResponsiveStyles';
import { useMode } from '../../context';
import { useTheme } from '@mui/styles';

const CardDetail = ({
  title,
  values,
  value,
  className,
  onRarityClick,
  icon,
}) => {
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
    iconWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(4),
      width: theme.spacing(4),
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      marginRight: theme.spacing(1),
      '& svg': {
        fontSize: theme.typography.pxToRem(20),
      },
    },
    titleStyle: {
      fontWeight: 700,
      color: theme.palette.text.primary,
      textTransform: 'uppercase',
    },
    valuesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
    valueStyle: {
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },
    chipStyle: {
      // Additional styles for chips can go here
    },
  };
  const getChipColor = (rarity) => {
    switch (rarity) {
      case 'Common':
        return theme.palette.rarity.common;
      case 'Uncommon':
        return theme.palette.rarity.uncommon;
      case 'Rare':
        return theme.palette.rarity.rare;
      case 'Super Rare':
        return theme.palette.rarity.super;
      case 'Ultra Rare':
        return theme.palette.rarity.ultra;
      case 'Secret Rare':
        return theme.palette.rarity.secret;
      case 'Ghost Rare':
        return theme.palette.rarity.ghost;
      case 'Starlight Rare':
        return theme.palette.rarity.starlight;
      case 'Prismatic Secret Rare':
        return theme.palette.rarity.prismatic;
      case 'Collector’s Rare':
        return theme.palette.rarity.collector;
      case 'Short Print':
        return theme.palette.rarity.shortPrint;
      case 'Parallel Rare':
        return theme.palette.rarity.parallel;
      case 'Quarter Century Rare':
        return theme.palette.rarity.qcr;
      default:
        return theme.palette.grey[500];
    }
  };
  return (
    <Box className={className} sx={styles.cardDetailContainer}>
      {icon && <Box sx={styles.iconWrapper}>{icon}</Box>}
      <Typography variant="subtitle1">
        <span style={styles.titleStyle}>{title}:</span>
        <span style={styles.valueStyle}> {value || 'N/A'}</span>
      </Typography>
      {/* {value && <span style={styles.valueStyle}> {value || 'N/A'}</span>}
      {icon && <Box sx={styles.iconWrapper}>{icon}</Box>} */}

      <Box sx={styles.valuesContainer}>
        {values && Array.isArray(values)
          ? values.map((rarityvalue, index) => (
              <Chip
                key={index}
                label={rarityvalue || ''}
                onClick={() => onRarityClick(value)}
                sx={{
                  borderColor: getChipColor(value),
                  borderWidth: '5px',
                  fontWeight: 700,
                  color: getChipColor(value),
                }}
                variant="outlined"
              />
            ))
          : 'N/A'}
      </Box>
    </Box>
  );
};

export default CardDetail;
