import React from 'react';
import { CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  media: {
    width: '100%', // Make it responsive
    // minHeight: '50%', // Set minimum height
    // '@media (min-width:600px)': {
    //   minHeight: '400px',
    // },
  },
});

const ReusableCardMedia = ({ imgUrl }) => {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.media}
      component="img"
      alt="Card Name"
      image={imgUrl}
    />
  );
};

export default ReusableCardMedia;
