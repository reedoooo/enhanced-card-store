import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import useResponsiveStyles from '../../context/hooks/style-hooks/useResponsiveStyles';
import { useTheme } from 'styled-components';

import { useMode } from '../../context';
import {
  CardDetailContainer,
  CardIconWrapper,
  CardTitleStyle,
  CardValueStyle,
} from './styles/cardStyles';

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
    <CardDetailContainer theme={theme}>
      {icon && <CardIconWrapper theme={theme}>{icon}</CardIconWrapper>}
      <Typography variant="subtitle1">
        <CardTitleStyle theme={theme}>{title}:</CardTitleStyle>
        <CardValueStyle theme={theme}> {value || 'N/A'}</CardValueStyle>
      </Typography>
      {/* {value && <span style={styles.valueStyle}> {value || 'N/A'}</span>}
      {icon && <Box sx={styles.iconWrapper}>{icon}</Box>} */}

      <Box>
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
    </CardDetailContainer>
  );
};

export default CardDetail;
