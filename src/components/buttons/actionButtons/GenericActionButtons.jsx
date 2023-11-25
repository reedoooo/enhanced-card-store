import React, { useContext } from 'react';
import CardActionButtons from './CardActionButtons';
import useAppContext from '../../../context/hooks/useAppContext';
import { ModalContext } from '../../../context/ModalContext/ModalContext';
import { Box } from '@mui/material';

const GenericActionButtons = ({ card, context }) => {
  const contextProps = useAppContext(); // Assuming useAppContext returns the context object
  const { closeModal, isModalOpen, setModalOpen } = useContext(ModalContext);

  if (!contextProps) {
    return (
      <Box sx={{ color: 'error.main' }}>Provider not found for {context}</Box>
    );
  }

  let modifiedContextProps = contextProps[context];

  if (!modifiedContextProps) {
    return (
      <Box sx={{ color: 'error.main' }}>
        Invalid context provided: {context}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Vertical layout on small screens, horizontal on larger
        justifyContent: 'space-between', // Spread buttons evenly
        alignItems: 'center', // Center align the buttons
        gap: 1, // Add a small gap between buttons
        flexGrow: 1,
      }}
    >
      <CardActionButtons
        card={card}
        context={context}
        contextProps={modifiedContextProps}
        closeModal={() => setModalOpen(false)}
        open={isModalOpen}
      />
    </Box>
  );
};

export default GenericActionButtons;
