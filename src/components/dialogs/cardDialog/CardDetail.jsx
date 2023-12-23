import React from 'react';
import { Box, Typography } from '@mui/material';
import useResponsiveStyles from '../../../context/hooks/useResponsiveStyles';
import { useMode } from '../../../context';

const CardDetail = ({ icon, title, value, className }) => {
  const { theme } = useMode();
  const { getHeaderStyle, getButtonTypographyVariant } =
    useResponsiveStyles(theme);

  return (
    <Box
      className={className}
      display="flex"
      alignItems="center"
      gap="10px"
      marginBottom="16px"
    >
      {icon && <Box mr={1}>{icon}</Box>}
      <Typography variant={getButtonTypographyVariant()}>
        {title}: {value || 'N/A'}
      </Typography>
    </Box>
  );
};

export default CardDetail;
