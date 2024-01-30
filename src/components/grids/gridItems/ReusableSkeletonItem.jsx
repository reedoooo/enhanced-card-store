// ReusableSkeletonItem.jsx
import React from 'react';
import { Grid } from '@mui/material';
import SkeletonStoreItem from './SkeletonStoreItem';
import SkeletonDeckItem from './SkeletonDeckItem';

const ReusableSkeletonItem = ({ itemType, count, gridItemProps, context }) =>
  context === 'Cart' ? (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Grid item {...gridItemProps} key={index}>
            <SkeletonStoreItem context={context} />
          </Grid>
        ))}
    </>
  ) : (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Grid item {...gridItemProps} key={index}>
            <SkeletonDeckItem context={context} />
          </Grid>
        ))}
    </>
  );

export default ReusableSkeletonItem;
