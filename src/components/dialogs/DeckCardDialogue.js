import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Popover, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeckCardModal from '../modals/DeckCardModal';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
  media: {
    objectFit: 'contain',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    // padding: theme.spacing(0.5), // reduce padding
  },
  reducedBox: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0.5), // reduce padding
  },
  button: {
    flexGrow: 1,
    fontSize: '0.7rem', // reduce font size
    padding: theme.spacing(0.5), // reduce padding
  },
  text: {
    fontSize: '0.8rem', // reduce font size
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const DeckCardDialogue = ({
  anchorEl,
  isOpen,
  onClose,
  card,
  openCardModal,
  closeCardModal,
  isCardModalOpen,
}) => {
  const classes = useStyles();

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      onClose={onClose}
      disableRestoreFocus
    >
      <Typography>{card?.name}</Typography>
      <Box className={classes.reducedBox} container>
        <Button
          // size="xs"
          color="primary"
          onClick={openCardModal}
          className={classes.button}
        >
          View Details
        </Button>
        <DeckCardModal
          isOpen={isCardModalOpen}
          onClose={closeCardModal}
          card={card}
        />
      </Box>
    </Popover>
  );
};

export default DeckCardDialogue;
