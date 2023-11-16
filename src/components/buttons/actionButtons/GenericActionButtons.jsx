import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import GenericCardModal from '../../modals/GenericCardModal';
import CardActionButtons from './CardActionButtons';
import useAppContext from '../../../context/hooks/useAppContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
});

const GenericActionButtons = ({
  card,
  context,
  open,
  openModal,
  closeModal,
  isModalOpen,
  setModalOpen,
}) => {
  const classes = useStyles();
  const [contextProps, isContextAvailable] = useAppContext(context);

  if (!isContextAvailable) {
    console.error(`The component isn't wrapped with the ${context}Provider`);
    return null; // Consider rendering an error boundary or user-friendly error message instead.
  }

  // Ensure contextProps is an object with the expected methods before using them
  if (
    typeof contextProps !== 'object' ||
    typeof contextProps[context] !== 'object'
  ) {
    console.error(`Invalid contextProps provided for the context: ${context}`);
    return null; // Consider rendering an error boundary or user-friendly error message instead.
  }

  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        quantity={0}
        context={context}
        contextProps={contextProps}
        openModal={openModal}
        closeModal={() => setModalOpen(false)}
        open={open}
      />
      {/* <GenericCardModal
        open={isModalOpen}
        closeModal={closeModal}
        context={context}
        card={card}
      /> */}
    </div>
  );
};

export default GenericActionButtons;
