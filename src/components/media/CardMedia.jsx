import React from 'react';
import { CardMedia } from '@mui/material';
import { useStyles } from './mediaStyles';
import PropTypes from 'prop-types';

const ReusableCardMedia = React.forwardRef(
  ({ imgUrl, onMouseEnter, onMouseLeave, onClick }, ref) => {
    const classes = useStyles();
    const altText = `Image for ${imgUrl || 'the card'}`;

    return (
      <CardMedia
        ref={ref}
        className={classes.media}
        component="img"
        alt={altText}
        image={imgUrl}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    );
  }
);

ReusableCardMedia.displayName = 'ReusableCardMedia';

ReusableCardMedia.propTypes = {
  imgUrl: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};

export default ReusableCardMedia;
