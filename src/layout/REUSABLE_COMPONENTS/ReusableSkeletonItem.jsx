// ReusableSkeletonItem.jsx
import React from 'react';
import { Grid } from '@mui/material';

import SkeletonCard from './SkeletonCard';
const ReusableSkeletonItem = ({ itemType, count, gridItemProps, context }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <Grid item {...gridItemProps} key={index}>
          <SkeletonCard context={context} />
        </Grid>
      ))}
  </>
);

export default ReusableSkeletonItem;
