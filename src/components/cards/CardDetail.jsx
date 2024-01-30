import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
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

  const getChipColor = (rarity) => {
    return theme.palette.rarity[rarity] || theme.palette.grey[500];
  };

  return (
    <CardDetailContainer className={className}>
      {icon && <CardIconWrapper>{icon}</CardIconWrapper>}
      <Typography variant="subtitle1">
        <CardTitleStyle>{title}:</CardTitleStyle>
        <CardValueStyle> {value || 'N/A'}</CardValueStyle>
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Array.isArray(values) && values.length > 0
          ? values.map((rarityValue, index) => (
              <Chip
                key={index}
                label={rarityValue || ''}
                onClick={() => onRarityClick(rarityValue)}
                sx={{
                  borderColor: getChipColor(rarityValue.toString()),
                  borderWidth: '2px',
                  fontWeight: 700,
                  color: getChipColor(rarityValue),
                  margin: '5px',
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
