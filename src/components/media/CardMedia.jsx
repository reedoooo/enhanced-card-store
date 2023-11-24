import React, { useContext, useEffect } from 'react';
import { CardMedia } from '@mui/material';
import { useStyles } from './mediaStyles';
import { ModalContext } from '../../context/ModalContext/ModalContext';
import { PopoverContext } from '../../context/PopoverContext/PopoverContext';

const ReusableCardMedia = React.forwardRef(
  (
    {
      imgUrl,
      onMouseEnter,
      onMouseLeave,
      onClick,
      // isModalOpen,
      // setIsPopoverOpen,
    },
    ref
  ) => {
    const classes = useStyles();
    const altText = `Image for ${imgUrl || 'the card'}`;
    const {
      openModalWithCard,
      closeModal,
      isModalOpen,
      setModalOpen,
      modalContent,
    } = useContext(ModalContext);
    const { setHoveredCard, setIsPopoverOpen, hoveredCard } =
      useContext(PopoverContext);
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
