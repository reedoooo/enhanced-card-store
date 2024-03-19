import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Skeleton,
} from '@mui/material';
import useSkeletonLoader from '../collection/collectionGrids/cards-datatable/useSkeletonLoader';

function LoadingCardSkeleton() {
  return (
    <Card
      className={'cardroot'}
      sx={{
        root: {
          maxWidth: 345,
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(40px)',
          backgroundImage:
            'linear-gradient(to right bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.6))',
          boxShadow: '10px 10px 10px rgba(30,30,30,.1)',
          borderRadius: 10,
        },
      }}
    >
      <CardHeader
        title={<Skeleton width="80%" height={24} />}
        subheader={<Skeleton width="60%" height={20} />}
        avatar={<Skeleton variant="circular" width={40} height={40} />}
      />
      <CardContent>
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
    </Card>
  );
}

const HeroSectionSkeleton = () => {
  // Assuming useSkeletonLoader provides a loader component that accepts type, count, and styleProps
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
          padding: '30px',
          width: 'min(1200px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SkeletonLoader
          type="title"
          count={1}
          styleProps={{ width: '60%', height: 40, marginBottom: '20px' }}
        />
        <SkeletonLoader
          type="subtitle"
          count={1}
          styleProps={{ width: '40%', height: 28, marginBottom: '40px' }}
        />
        <SkeletonLoader
          type="card"
          count={1}
          styleProps={{ width: '100%', height: '300px', marginBottom: '2rem' }}
        />
      </Box>
    </Box>
  );
};

export { LoadingCardSkeleton, HeroSectionSkeleton };
