import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useMode } from '../../context';
import {
  CardDetailContainer,
  CardIconWrapper,
  CardTitleStyle,
  CardValueStyle,
} from './styles/cardStyles';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

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
      <Box
        className={className}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
      >
        {icon && <CardIconWrapper>{icon}</CardIconWrapper>}
        {/* {icon && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>
        )} */}

        <MDTypography variant="h5" sx={{ mr: 1 }}>
          {title}:
        </MDTypography>

        {value && <MDTypography variant="body1">{value}</MDTypography>}
        {Array.isArray(values) &&
          values.length > 0 &&
          values.map((rarityValue, index) => (
            <Chip
              key={index}
              label={rarityValue || ''}
              onClick={() => onRarityClick(rarityValue?.toString())}
              sx={{
                borderColor: getChipColor(rarityValue?.toString()),
                borderWidth: '2px',
                fontWeight: 700,
                color: getChipColor(rarityValue?.toString()),
                margin: '5px',
              }}
              variant="outlined"
            />
          ))}
        {/* <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {Array.isArray(values) && values.length > 0
            ? values.map((rarityValue, index) => (
                <Chip
                  key={index}
                  label={rarityValue || ''}
                  onClick={() => onRarityClick(rarityValue?.toString())}
                  sx={{
                    borderColor: getChipColor(rarityValue?.toString()),
                    borderWidth: '2px',
                    fontWeight: 700,
                    color: getChipColor(rarityValue?.toString()),
                    margin: '5px',
                  }}
                  variant="outlined"
                />
              ))
            : null}
        </Box> */}
      </Box>
    </CardDetailContainer>
  );
};

export default CardDetail;
