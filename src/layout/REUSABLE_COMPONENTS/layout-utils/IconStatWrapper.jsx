import React from 'react';
import { Card, Icon, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMode } from 'context';

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(6)}`};
`;

const TextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ theme }) => theme.spacing(4)};
  text-align: left;
  flex: 1;
`;

// Pre-calculated colors passed as props
const StyledLabel = styled(Typography)`
  font-size: ${({ theme }) => theme.spacing(6)};
  color: ${({ color }) => color};
  word-wrap: break-word;
`;

const StyledValue = styled(Typography)`
  font-size: ${({ theme }) => theme.spacing(16)};
  color: ${({ color }) => color};
  word-wrap: break-word;
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: ${({ color }) => color};
`;

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.palette.text.colorPrimaryText};
`;

const IconStatWrapper = ({
  label = 'Label',
  value = 'Value',
  icon = 'bars',
  isPrimary = false,
}) => {
  // Pre-calculate colors based on isPrimary
  const { theme } = useMode();
  const labelColor = isPrimary
    ? theme.palette.text.colorText
    : theme.palette.text.colorLabel;
  const valueColor = isPrimary
    ? theme.palette.text.colorText
    : theme.palette.text.colorText;
  const iconColor = isPrimary
    ? theme.palette.text.colorText
    : theme.palette.text.colorPrimaryText;
  const backgroundColor = isPrimary
    ? theme.palette.success.main
    : 'transparent';

  return (
    <StyledCard theme={theme}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconContainer theme={theme} backgroundColor={backgroundColor}>
          <StyledIcon theme={theme} color={iconColor}>
            {icon}
          </StyledIcon>
        </IconContainer>
        <TextContainer theme={theme}>
          <StyledLabel theme={theme} color={labelColor} variant="button">
            {label}
          </StyledLabel>
          <StyledValue theme={theme} color={valueColor}>
            {value}
          </StyledValue>
        </TextContainer>
      </Box>
    </StyledCard>
  );
};

IconStatWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  isPrimary: PropTypes.bool,
};

export default IconStatWrapper;
