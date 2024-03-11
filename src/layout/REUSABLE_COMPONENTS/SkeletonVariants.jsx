import React from 'react';
import { Box } from '@mui/material';
import { useMode } from '../../context';
import useSkeletonLoader from '../collection/collectionGrids/cards-datatable/useSkeletonLoader';

const HeroSectionSkeleton = () => {
  const { theme } = useMode();
  const { SkeletonLoader } = useSkeletonLoader();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '75vh',
      }}
    >
      <Box
        sx={{
          background: 'rgba(189, 181, 181, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '25px',
          padding: '30px 0px',
          width: 'min(1200px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Title Skeleton */}
        <SkeletonLoader
          type="title"
          count={1}
          styleProps={{ width: '60%', marginBottom: '20px' }}
        />

        {/* Subtitle Skeleton */}
        <SkeletonLoader
          type="subtitle"
          count={1}
          styleProps={{ width: '40%', marginBottom: '40px' }}
        />

        {/* Image Slider Skeleton */}
        <SkeletonLoader
          type="card"
          count={1}
          styleProps={{ width: '100%', height: '300px', marginBottom: '2rem' }}
        />
      </Box>
    </Box>
  );
};

export default HeroSectionSkeleton;
