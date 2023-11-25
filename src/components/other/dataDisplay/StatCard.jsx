import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value }) => (
  <Card sx={{ minWidth: 275, marginBottom: 2 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;
