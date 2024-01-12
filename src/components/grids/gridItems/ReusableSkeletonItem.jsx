// ReusableSkeletonItem.jsx
import React from 'react';
import { Grid } from '@mui/material';
import SkeletonStoreItem from './SkeletonStoreItem'; // Or your Skeleton Deck Item

const ReusableSkeletonItem = ({ itemType, count, gridItemProps }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <Grid item {...gridItemProps} key={index}>
          <SkeletonStoreItem /> {/* Use your specific skeleton item */}
        </Grid>
      ))}
  </>
);

export default ReusableSkeletonItem;
