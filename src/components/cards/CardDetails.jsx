import React from 'react';
import { Box, Typography } from '@mui/material';
import useResponsiveStyles from '../../context/hooks/style-hooks/useResponsiveStyles';
import { useTheme } from 'styled-components';
import {
  CardDetailContainer,
  CardDetailRow,
  CardIconWrapper,
  CardTitleStyle,
  CardValueStyle,
  useCardDetailStyles,
} from './styles/cardStyles';
import { useMode } from '../../context';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';

const CardDetails = ({ details, className }) => {
  // details expected to be an array of objects with { icon, title, value }
  const { theme } = useMode();
  // const theme2 = useTheme();
  // const styles = useCardDetailStyles(theme, theme2);
  // const { getHeaderStyle, getButtonTypographyVariant } =
  //   useResponsiveStyles(theme);

  return (
    <CardDetailContainer theme={theme}>
      {details.map(({ icon, title, value }, index) => (
        <CardDetailRow theme={theme} key={index}>
          {icon && <CardIconWrapper theme={theme}>{icon}</CardIconWrapper>}
          <MDTypography variant="subtitle1">
            <CardTitleStyle theme={theme}>{title}:</CardTitleStyle>
            <CardValueStyle theme={theme}> {value || ''}</CardValueStyle>
          </MDTypography>
        </CardDetailRow>
      ))}
    </CardDetailContainer>
  );
};

export default CardDetails;
