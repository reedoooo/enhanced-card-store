import { Icon } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled(Icon)(({ theme }) => ({
  // color: theme.palette.chartTheme.primary.main,
  fontSize: 'inherit',
  // marginRight: '1rem',
  // verticalAlign: 'middle',
}));
const IconWrapper = ({ children }) => {
  return <StyledIcon className={`uil uil-${children}`}>{children}</StyledIcon>;
};

export default IconWrapper;
