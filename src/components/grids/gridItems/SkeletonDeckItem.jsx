import React from 'react';
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import styled from 'styled-components';
const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  // Use the same styles as in StyledCard
  display: 'flex',
  flexDirection: 'column',
  minWidth: '109px',
  maxWidth: '100%',
  width: 'auto',
  maxHeight: '80vh',
  backgroundColor: theme.palette.backgroundA.lightest,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const AspectRatioBoxSkeleton = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
}));
const SkeletonDeckItem = ({ context }) => (
  <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
    {/* Adjust the width and height as per your UI design */}
    {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
    <StyledSkeletonCard>
      <AspectRatioBoxSkeleton>
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
    {/* If additional placeholders are needed for text or other elements, add them here */}
  </Box>
);

export default SkeletonDeckItem;
