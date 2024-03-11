import React from 'react';
import { Box, CardContent, Skeleton } from '@mui/material';
import {
  AspectRatioBoxSkeleton,
  StyledSkeletonCard,
} from '../../../pages/pageStyles/StyledComponents';
import { useMode } from '../../../context';

const SkeletonDeckItem = ({ context }) => {
  const { theme } = useMode();
  return (
    <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
      <StyledSkeletonCard theme={theme}>
        <AspectRatioBoxSkeleton theme={theme}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        </AspectRatioBoxSkeleton>
        <CardContent>
          <Skeleton variant="text" animation="wave" height={20} />
          <Skeleton variant="text" animation="wave" height={20} width="80%" />
          <Skeleton variant="text" animation="wave" height={20} width="60%" />
        </CardContent>
        <Skeleton variant="rectangular" animation="wave" height={48} />
      </StyledSkeletonCard>
    </Box>
  );
};

export default SkeletonDeckItem;
