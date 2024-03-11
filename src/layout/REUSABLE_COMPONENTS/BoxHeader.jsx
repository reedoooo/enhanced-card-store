import { Box, Icon, Typography } from '@mui/material';
import React from 'react';
import FlexBetween from './FlexBetween';
import PropTypes from 'prop-types';
import { useMode } from '../../context';

const BoxHeader = ({ icon, title, subtitle, sideText }) => {
  const { theme } = useMode();
  return (
    <FlexBetween
      color={theme.palette.backgroundB.default}
      margin="1.5rem 1rem 0 1rem"
    >
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography
        variant="h5"
        fontWeight="700"
        color={theme.palette.backgroundE.dark}
      >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;

BoxHeader.defaultProps = {
  icon: <Icon />,
  title: 'Title',
  subtitle: 'Subtitle',
  sideText: 'Side Text',
};

BoxHeader.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sideText: PropTypes.string,
};
