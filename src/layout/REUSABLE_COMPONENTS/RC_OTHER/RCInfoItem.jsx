import React from 'react';
import { Grid, CardContent, Skeleton } from '@mui/material';
import { useMode, useBreakpoint } from 'context';
import { RCTypography } from '..';
import PropTypes from 'prop-types';
import { InfoItemSkeleton } from '../utils/system-utils/SkeletonVariants';

const RCInfoItem = ({
  label = '',
  value = '',
  gridSizes = { xs: 12, sm: 6, md: 3 },
  externalTheme = null,
  isLoading = false,
}) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();

  return (
    <Grid item {...gridSizes}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: isMobile ? 'auto' : '100%', // Adjust height for mobile
          padding: isMobile ? '8px' : '16px', // Reduce padding on mobile for less tall items
          flexGrow: 1,
          '&:last-child': {
            paddingBottom: isMobile ? '8px' : '16px', // Ensure the last child padding is reduced on mobile
          },
        }}
      >
        {label !== undefined && value !== undefined && !isLoading ? (
          <>
            <RCTypography
              variant={isMobile ? 'body2' : 'h4'}
              fontWeight="medium"
              sx={{ color: theme.palette.grey.darkest }}
            >
              {`${label}:`}
            </RCTypography>
            <RCTypography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{ color: theme.palette.grey.light }}
            >
              {value}
            </RCTypography>
          </>
        ) : (
          InfoItemSkeleton(4)
        )}
      </CardContent>
    </Grid>
  );
};

RCInfoItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridSizes: PropTypes.object,
  externalTheme: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default RCInfoItem;
