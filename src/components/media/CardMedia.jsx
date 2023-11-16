import React, { useEffect } from 'react';
import { CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  media: {
    width: '100%',
  },
});

const ReusableCardMedia = React.forwardRef(
  (
    {
      imgUrl,
      onMouseEnter,
      onMouseLeave,
      onClick,
      isModalOpen,
      setIsPopoverOpen,
    },
    ref
  ) => {
    const classes = useStyles();
    const altText = `Image for ${imgUrl || 'the card'}`;

    useEffect(() => {
      if (isModalOpen) {
        setIsPopoverOpen(false);
      }
    }, [isModalOpen, setIsPopoverOpen]);

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

export default ReusableCardMedia;
