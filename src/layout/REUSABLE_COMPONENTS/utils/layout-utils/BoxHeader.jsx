import { Box, Icon, Typography } from '@mui/material';
import React from 'react';
import FlexBetween from './FlexBetween';
import PropTypes from 'prop-types';
import { useMode } from 'context';

const BoxHeader = ({
  icon = <Icon />,
  title = 'Title',
  subtitle = 'Subtitle',
  sideText = 'Side Text',
  sx = {},
  useSX = false,
  titleVariant = 'h4',
  subtitleVariant = 'body1',
  colorVariant = 'text.main',
  paddingVariant = '1.5rem 1rem 0 1rem',
}) => {
  const { theme } = useMode();
  return (
    <FlexBetween
      color={theme.palette.grey.simpleGrey}
      paddingTop={useSX ? paddingVariant : 0}
      sx={useSX ? sx : {}}
    >
      <FlexBetween>
        {icon}
        <Box
          width="100%"
          justifyContent={'flex-start'}
          flexGrow={1}
          flexDirection={'column'}
        >
          <Typography
            theme={theme}
            variant={useSX ? titleVariant : 'h4'}
            mb="-0.1rem"
            ml="0.5rem"
            p="0.5rem"
            color={useSX ? colorVariant : theme.palette.text.main}
          >
            {title}
          </Typography>
          {subtitle !== 'none' && (
            <Typography
              variant={useSX ? subtitleVariant : 'body1'}
              theme={theme}
              sx={{ ml: '1rem' }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </FlexBetween>
      {sideText !== 'none' && (
        <Typography
          theme={theme}
          variant="h5"
          fontWeight="700"
          color={theme.palette.success.secondary}
          sx={useSX ? sx : {}}
        >
          {sideText}
        </Typography>
      )}
    </FlexBetween>
  );
};

export default BoxHeader;

BoxHeader.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sideText: PropTypes.string,
};
