import React from 'react';
import { Grid, CardContent, Skeleton } from '@mui/material';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import useBreakpoint from 'context/hooks/useBreakPoint';
import { useMode } from 'context';

const RCInfoItem = ({
  label,
  value,
  gridSizes = { xs: 12, sm: 6, md: 3 },
  externalTheme = null,
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
        {label !== undefined && value !== undefined ? (
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
          <>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={30} />
          </>
        )}
      </CardContent>
    </Grid>
  );
};

export default RCInfoItem;
