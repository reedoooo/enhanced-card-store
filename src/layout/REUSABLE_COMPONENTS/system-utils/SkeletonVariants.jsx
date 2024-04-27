import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Skeleton,
  Grid,
  Collapse,
  CardActionArea,
  Typography,
} from '@mui/material';
import useSkeletonLoader from './useSkeletonLoader';
import MDBox from '../MDBOX';
import { useMode } from '../../../context';
import {
  AspectRatioBoxSkeleton,
  StyledSkeletonCard,
} from '../../REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';

const LoadingCardSkeleton = () => {
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
};

const PageHeaderSkeleton = () => {
  const { SkeletonLoader } = useSkeletonLoader();

  return (
    <Grid container sx={{ padding: 1, alignItems: 'center' }}>
      <Grid item xs={12} sm={6}>
        <Card>
          <SkeletonLoader type="title" />
          <SkeletonLoader type="subtitle" />
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <SkeletonLoader type="button" />
      </Grid>
    </Grid>
  );
};

const HeroSectionSkeleton = () => {
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

          // '-webkit-backdrop-filter': 'blur(20px)',
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

const SkeletonCard = () => {
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

const CollectionListItemSkeleton = ({ count, index }) => (
  <Collapse key={`skeleton-${index}-${count}`} in={true}>
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
      <Card sx={{ width: '100%' }}>
        <CardActionArea sx={{ width: '100%' }} disabled={true}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
            <Skeleton variant="text" width="60%" />
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  </Collapse>
);

const DeckListItemSkeleton = ({ count, index }) => (
  <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', height: '300px' }}>
    <Card sx={{ width: '100%' }}>
      <CardActionArea sx={{ width: '100%' }} disabled={true}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
          <Skeleton variant="text" width="60%" />
        </Grid>
      </CardActionArea>
    </Card>
  </Box>
);

const DynamicSkeletonList = ({ itemType, count, gridItemProps, context }) => (
  <MDBox>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <Grid item {...gridItemProps} key={index}>
          <SkeletonCard context={context} />
        </Grid>
      ))}
  </MDBox>
);

const SkeletonCartItem = () => (
  <Box sx={{ marginBottom: '1rem', flexGrow: '1' }}>
    <Skeleton variant="rectangular" width="100%" height={118} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
  </Box>
);

const SkeletonPieChart = ({ theme }) => (
  <MDBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '270px',
      bgcolor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    }}
  >
    <Typography variant="h5" sx={{ mb: 2 }}>
      Collection Value Distribution
    </Typography>
    <Skeleton
      variant="circular"
      width={200}
      height={200}
      sx={{
        bgcolor: theme.palette.chartTheme.primary.main,
      }}
    />
  </MDBox>
);

export {
  LoadingCardSkeleton,
  HeroSectionSkeleton,
  PageHeaderSkeleton,
  DynamicSkeletonList,
  SkeletonCard,
  CollectionListItemSkeleton,
  DeckListItemSkeleton,
  SkeletonCartItem,
  SkeletonPieChart,
};
