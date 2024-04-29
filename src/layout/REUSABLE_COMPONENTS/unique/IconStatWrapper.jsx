import React from 'react';
import { Card, Icon, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMode } from 'context';

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.lenMd1} ${theme.lenMd3}`};
`;

const TextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${({ theme }) => theme.lenMd1};
  text-align: left;
  flex: 1;
`;

// Pre-calculated colors passed as props
const StyledLabel = styled(Typography)`
  font-size: ${({ theme }) => theme.lenMd3};
  color: ${({ textColor }) => textColor};
  word-wrap: break-word;
`;

const StyledValue = styled(Typography)`
  font-size: ${({ theme }) => theme.lenLg2};
  color: ${({ textColor }) => textColor};
  word-wrap: break-word;
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: ${({ iconColor }) => iconColor};
`;

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.colorPrimaryText};
`;

const IconStatWrapper = ({ label, value, icon = 'bars', isPrimary }) => {
  const { theme } = useMode();

  // Pre-calculate colors based on isPrimary
  const labelColor = isPrimary ? theme.colorForDark2 : theme.colorLabel;
  const valueColor = isPrimary ? theme.colorForDark1 : theme.colorText;
  const iconColor = isPrimary ? theme.colorPrimary : theme.colorPrimaryText;
  const backgroundColor = isPrimary ? theme.colorPrimary : 'transparent';

  return (
    <StyledCard theme={theme}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconContainer theme={theme} backgroundColor={backgroundColor}>
          <StyledIcon theme={theme} iconColor={iconColor}>
            {icon}
          </StyledIcon>
        </IconContainer>
        <TextContainer theme={theme}>
          <StyledLabel theme={theme} textColor={labelColor} variant="button">
            {label}
          </StyledLabel>
          <StyledValue theme={theme} textColor={valueColor}>
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
