import { Box, Icon, Typography } from '@mui/material';
import React from 'react';
import FlexBetween from './FlexBetween';
import PropTypes from 'prop-types';
import { useMode } from '../../context';

const BoxHeader = ({
  icon,
  title,
  subtitle,
  sideText,
  sx,
  useSX,
  titleVariant,
  colorVariant,
  paddingVariant,
}) => {
  const { theme } = useMode();
  return (
    <FlexBetween
      color={theme.palette.backgroundB.default}
      margin={useSX ? '0 1rem 0 0rem' : '1.5rem 1rem 0 1rem'}
      paddingTop={useSX ? paddingVariant : 0}
      sx={useSX ? sx : {}}
    >
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography
            variant={useSX ? titleVariant : 'h4'}
            mb="-0.1rem"
            color={useSX ? colorVariant : theme.palette.backgroundE.dark}
          >
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography
        variant="h5"
        fontWeight="700"
        color={theme.palette.backgroundE.dark}
        sx={useSX ? sx : {}}
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
